# app/rag/embeddings.py
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from typing import List, Optional

_vectorizer: Optional[TfidfVectorizer] = None


def fit_vectorizer(corpus: List[str]) -> None:
    """
    Initialize and fit the TF-IDF vectorizer.
    Must be called exactly once at app startup.
    """
    global _vectorizer

    _vectorizer = TfidfVectorizer(
        stop_words=None,                      # better for schema text
        ngram_range=(1, 2),
        max_features=512,
        token_pattern=r"(?u)\b[a-zA-Z_][a-zA-Z0-9_]+\b"
    )
    _vectorizer.fit(corpus)


def get_embedding(text: str) -> np.ndarray:
    """
    Convert text to a TF-IDF embedding.
    """
    if _vectorizer is None:
        raise RuntimeError("Vectorizer not initialized. Call fit_vectorizer().")

    vec = _vectorizer.transform([text])
    return vec.toarray()[0].astype("float32")
