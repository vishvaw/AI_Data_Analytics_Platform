import re

from app.llm.gemini_client import generate_sql
from app.rag.retriever import retrieve_schema


def clean_sql(sql: str) -> str:
    """
    Clean LLM output to extract pure SQL.
    """
    if not sql:
        return ""

    sql = re.sub(r"```sql", "", sql, flags=re.IGNORECASE)
    sql = re.sub(r"```", "", sql)
    return sql.strip()


def _format_registry_examples(similar_examples: list[dict] | None) -> str:
    if not similar_examples:
        return "No similar registry examples found."

    lines = []
    for i, example in enumerate(similar_examples, start=1):
        tables = ", ".join(example.get("tables") or []) or "unknown"
        score = example.get("score", 0.0)
        lines.append(
            (
                f"Example {i} (similarity={score}):\n"
                f"- Natural language: {example.get('query', '').strip()}\n"
                f"- SQL: {example.get('sql', '').strip()}\n"
                f"- Tables used: {tables}"
            )
        )
    return "\n\n".join(lines)


def generate_sql_query(user_query: str, similar_examples: list[dict] | None = None):
    schema_context = retrieve_schema(user_query)
    example_context = _format_registry_examples(similar_examples)

    prompt = f"""
You are an expert SQL generator.

Relevant Schema:
{schema_context}

Similar Query Registry Examples (top historical NL->SQL pairs):
{example_context}

Rules:
- Use only given schema
- Generate valid SQL
- Return only SQL
- If a similar registry example exists, reuse its join/filter structure and adapt only
  what is needed for this new question
- Never copy constants blindly; update conditions to match the new user question
- `sales.sale_date` is stored as TEXT in DD-MM-YYYY format, so year filters must use:
  `substr(sale_date, 7, 4) = 'YYYY'` (not strftime on raw text)
- If query asks by product name, always join `sales` with `products` and use
  `products.product_name` (or an alias like `p.product_name`)

User Query:
{user_query}
"""
    sql = generate_sql(prompt)
    return clean_sql(sql)
