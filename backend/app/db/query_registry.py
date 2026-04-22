import json
import re
from datetime import datetime
from typing import Optional

from app.db.database import get_connection


TOKEN_PATTERN = re.compile(r"[a-z0-9]+")
STOP_WORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "show",
    "the",
    "to",
    "what",
    "which",
    "with",
}
TABLE_PATTERN = re.compile(r"\b(?:from|join)\s+([a-zA-Z_][a-zA-Z0-9_]*)", re.IGNORECASE)


def ensure_query_registry_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS query_registry (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            access_scope TEXT NOT NULL,
            query_template TEXT NOT NULL,
            query_text TEXT NOT NULL,
            sql_query TEXT NOT NULL,
            tables_json TEXT NOT NULL,
            use_count INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            last_used_at TEXT NOT NULL,
            UNIQUE(access_scope, query_template)
        )
        """
    )
    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_query_registry_top
        ON query_registry (access_scope, use_count DESC, last_used_at DESC)
        """
    )

    conn.commit()
    conn.close()


def get_access_scope(user: dict) -> str:
    role = (user.get("role") or "").lower()
    if role == "admin":
        return "admin"
    return (user.get("department") or "general").lower()


def normalize_query_template(query: str) -> str:
    normalized = (query or "").lower()
    normalized = re.sub(r"[^a-z0-9]+", " ", normalized)
    return re.sub(r"\s+", " ", normalized).strip()


def tokenize(text: str) -> set[str]:
    tokens = {t for t in TOKEN_PATTERN.findall((text or "").lower()) if t not in STOP_WORDS}
    return tokens


def calculate_similarity(query_a: str, query_b: str) -> float:
    a_tokens = tokenize(query_a)
    b_tokens = tokenize(query_b)
    if not a_tokens or not b_tokens:
        return 0.0

    overlap = a_tokens.intersection(b_tokens)
    base_score = len(overlap) / max(len(a_tokens), len(b_tokens))

    # Reward phrase containment for stronger "related query" matching.
    a_text = (query_a or "").lower().strip()
    b_text = (query_b or "").lower().strip()
    if a_text and b_text and (a_text in b_text or b_text in a_text):
        base_score += 0.25

    return min(base_score, 1.0)


def extract_tables_from_sql(sql: str) -> list[str]:
    seen = []
    for match in TABLE_PATTERN.finditer(sql or ""):
        table = match.group(1).lower()
        if table not in seen:
            seen.append(table)
    return seen


def save_registry_query(query: str, user: dict, sql: str):
    normalized_query = normalize_query_template(query)
    normalized_sql = (sql or "").strip()
    if not normalized_query or not normalized_sql:
        return

    ensure_query_registry_table()

    scope = get_access_scope(user)
    now = datetime.utcnow().isoformat()
    tables = extract_tables_from_sql(normalized_sql)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id
        FROM query_registry
        WHERE access_scope = ?
          AND query_template = ?
        """,
        (scope, normalized_query),
    )
    row = cursor.fetchone()

    if row:
        cursor.execute(
            """
            UPDATE query_registry
            SET query_text = ?,
                sql_query = ?,
                tables_json = ?,
                use_count = use_count + 1,
                updated_at = ?,
                last_used_at = ?
            WHERE id = ?
            """,
            (
                query.strip(),
                normalized_sql,
                json.dumps(tables),
                now,
                now,
                row["id"],
            ),
        )
    else:
        cursor.execute(
            """
            INSERT INTO query_registry (
                access_scope,
                query_template,
                query_text,
                sql_query,
                tables_json,
                use_count,
                created_at,
                updated_at,
                last_used_at
            )
            VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?)
            """,
            (
                scope,
                normalized_query,
                query.strip(),
                normalized_sql,
                json.dumps(tables),
                now,
                now,
                now,
            ),
        )

    # Keep only top 20 per access scope so retrieval always works on "top queries".
    cursor.execute(
        """
        DELETE FROM query_registry
        WHERE access_scope = ?
          AND id NOT IN (
              SELECT id
              FROM query_registry
              WHERE access_scope = ?
              ORDER BY use_count DESC, last_used_at DESC
              LIMIT 20
          )
        """,
        (scope, scope),
    )

    conn.commit()
    conn.close()


def _decode_json(raw_value: Optional[str]) -> list[str]:
    if not raw_value:
        return []
    try:
        value = json.loads(raw_value)
        if isinstance(value, list):
            return [str(v) for v in value]
        return []
    except json.JSONDecodeError:
        return []


def get_top_registry_queries(user: dict, limit: int = 20) -> list[dict]:
    ensure_query_registry_table()

    scope = get_access_scope(user)
    safe_limit = max(1, min(limit, 20))

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT query_text, sql_query, tables_json, use_count, last_used_at
        FROM query_registry
        WHERE access_scope = ?
        ORDER BY use_count DESC, last_used_at DESC
        LIMIT ?
        """,
        (scope, safe_limit),
    )
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "query": row["query_text"],
            "sql": row["sql_query"],
            "tables": _decode_json(row["tables_json"]),
            "use_count": row["use_count"],
            "last_used_at": row["last_used_at"],
        }
        for row in rows
    ]


def find_similar_registry_queries(
    user_query: str,
    user: dict,
    limit: int = 3,
    pool_size: int = 20,
    min_score: float = 0.2,
) -> list[dict]:
    candidates = get_top_registry_queries(user, limit=pool_size)
    scored: list[dict] = []

    for item in candidates:
        score = calculate_similarity(user_query, item["query"])
        if score >= min_score:
            scored.append(
                {
                    "query": item["query"],
                    "sql": item["sql"],
                    "tables": item["tables"],
                    "score": round(score, 4),
                }
            )

    scored.sort(key=lambda x: x["score"], reverse=True)
    safe_limit = max(1, min(limit, 5))
    return scored[:safe_limit]
