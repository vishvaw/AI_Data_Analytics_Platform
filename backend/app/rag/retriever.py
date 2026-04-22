
import numpy as np
import faiss
from typing import List

from app.rag.embeddings import get_embedding
from app.rag.vectorstore import index, schema_chunks


def retrieve_schema(query: str, top_k: int = 2) -> str:
    """
    Retrieve the most relevant schema chunks for a query.
    """
    if not query.strip():
        return ""

    top_k = min(top_k, len(schema_chunks))

    query_vec = np.array([get_embedding(query)])
    faiss.normalize_L2(query_vec)

    scores, indices = index.search(query_vec, top_k)

    results: List[str] = []
    for score, idx in zip(scores[0], indices[0]):
        if idx == -1:
            continue
        results.append(schema_chunks[idx])

    return "\n".join(results)