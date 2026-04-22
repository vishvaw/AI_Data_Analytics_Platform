# app/rag/vectorstore.py
import faiss
import numpy as np
from typing import List

from app.rag.embeddings import fit_vectorizer, get_embedding

# -------------------------------
# Schema knowledge base
# -------------------------------
schema_chunks: List[str] = [
    "products table: product_id, product_name, category_id, launch_date, price",
    "sales table: sale_id, sale_date, store_id, product_id, quantity",
    "stores table: store_id, store_name, city, country",
    "category table: category_id, category_name",
    "warranty table: claim_id, claim_date, sale_id, repair_status",
]

# -------------------------------
# Initialization (call once)
# -------------------------------
def build_index() -> faiss.Index:
    """
    Builds and returns a FAISS index for schema retrieval.
    """
    # Fit TF-IDF
    fit_vectorizer(schema_chunks)

    # Create embeddings
    embeddings = np.vstack([
        get_embedding(text) for text in schema_chunks
    ])

    # Normalize for cosine similarity
    faiss.normalize_L2(embeddings)

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatIP(dimension)  # Inner Product = cosine similarity
    index.add(embeddings)

    return index


# Build index ONCE (explicit, predictable)
index: faiss.Index = build_index()
