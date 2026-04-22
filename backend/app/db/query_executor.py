import re
import sqlite3

from app.db.database import get_connection


FROM_SALES_PATTERN = re.compile(
    r"\bfrom\s+sales(?:\s+(?:as\s+)?"
    r"(?!where\b|group\b|order\b|limit\b|join\b|inner\b|left\b|right\b|full\b)"
    r"([a-zA-Z_][a-zA-Z0-9_]*))?",
    re.IGNORECASE,
)
MISSING_PRODUCT_NAME_PATTERN = re.compile(r"no such column:\s*product_name", re.IGNORECASE)
TABLE_COLUMN_PRODUCT_NAME_PATTERN = re.compile(
    r"\b[a-zA-Z_][a-zA-Z0-9_]*\.product_name\b", re.IGNORECASE
)
BARE_PRODUCT_NAME_PATTERN = re.compile(r"(?<!\.)\bproduct_name\b", re.IGNORECASE)


def _repair_missing_product_name_sql(sql: str) -> str:
    candidate = (sql or "").strip()
    lowered = candidate.lower()

    if "product_name" not in lowered:
        return candidate
    if "from sales" not in lowered:
        return candidate
    if "join products" in lowered:
        return candidate

    from_match = FROM_SALES_PATTERN.search(candidate)
    if not from_match:
        return candidate

    sales_alias = from_match.group(1) or "sales"
    from_clause = from_match.group(0)
    join_clause = f"{from_clause} JOIN products p_fix ON p_fix.product_id = {sales_alias}.product_id"
    repaired = f"{candidate[:from_match.start()]}{join_clause}{candidate[from_match.end():]}"

    repaired = TABLE_COLUMN_PRODUCT_NAME_PATTERN.sub("p_fix.product_name", repaired)
    repaired = BARE_PRODUCT_NAME_PATTERN.sub("p_fix.product_name", repaired)
    return repaired


def execute_sql(sql: str):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        try:
            cursor.execute(sql)
        except sqlite3.OperationalError as exc:
            if not MISSING_PRODUCT_NAME_PATTERN.search(str(exc)):
                raise

            repaired_sql = _repair_missing_product_name_sql(sql)
            if repaired_sql == (sql or "").strip():
                raise

            cursor.execute(repaired_sql)

        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()
