# AI Analytics Platform

A full-stack analytics assistant that helps teams query business data with natural language, reuse trusted answers through intelligent caching, and build guided analytics reports with a no-code interface.

## Overview

This project combines:

- A **FastAPI backend** for authentication, query orchestration, SQL execution, and role-based controls.
- A **React frontend** for chat-based analytics, walkthrough analytics builder, and admin user management.
- A **SQLite analytics database** with sales, products, stores, category, and warranty datasets.
- A **Gemini-powered NL-to-SQL + insight layer** with schema retrieval and SQL safety checks.

The result is a practical analytics workspace for internal teams where users can ask questions, visualize results, and stay within department-level data boundaries.

## Core Features

- **Natural language analytics chat**
- **Role-aware data access** (admin, user + department context)
- **Smart query-answer cache** with top/recent query replay
- **Dynamic cache adaptation** for `top N` and city-based query variants
- **Auto chart recommendation** (bar, line, pie) from result shape + intent
- **Guided Walkthrough analytics builder** with filters, grouping, aggregation, ranking
- **Admin panel** to create/delete users and view all accounts
- **Query registry** to improve NL-to-SQL generation from prior successful query patterns

## Architecture

```text
Frontend (React)
  |- Login
  |- Chat Assistant
  |- Walkthrough Builder
  |- Admin Panel
       |
       v
Backend (FastAPI)
  |- Auth + Session Cookie
  |- Query Service (cache -> registry -> LLM -> SQL validator -> execution)
  |- Walkthrough Analytics Engine
  |- Admin APIs
       |
       v
SQLite (analytics.db)
  |- users
  |- sales
  |- products
  |- stores
  |- category
  |- warranty
  |- query_answer_cache
  |- query_registry
```

## Tech Stack

- **Frontend:** React, Axios, Chart.js, react-chartjs-2
- **Backend:** FastAPI, Uvicorn, Pydantic
- **LLM + Retrieval:** Google Gemini, Transformers, FAISS
- **Database:** SQLite
- **Data:** CSV seed files for sales domain entities

## Repository Structure

```text
.
|- backend/
|  |- app/
|  |  |- api/          # auth, query, admin, walkthrough, health routes
|  |  |- services/     # orchestration logic
|  |  |- agents/       # NL->SQL, validation, execution, insight helpers
|  |  |- db/           # sqlite connection, models, cache/registry logic
|  |  |- rag/          # schema embeddings + FAISS retriever
|  |- scripts/         # csv loading scripts
|  |- requirements.txt
|  |- run.py
|- frontend/
|  |- src/components/  # Login, Chat, AdminPanel, WalkThrough
|  |- src/pages/
|  |- src/services/
|  |- package.json
|- data/               # source CSV files
|- README.md
```

## Quick Start

### 1) Prerequisites

- Python 3.11+ (3.12 recommended)
- Node.js 18+ and npm
- Gemini API key

### 2) Backend Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run backend:

```powershell
python run.py
```

Backend will run at `http://localhost:8000`.

### 3) Frontend Setup

Open a second terminal:

```powershell
cd frontend
npm install
npm start
```

Frontend will run at `http://localhost:3000`.

## Authentication and Access Model

- Login creates an **HTTP-only session cookie** (`session_id`).
- `/me` returns current user profile from session.
- Admin-only endpoints are protected through admin dependency checks.
- Query permissions are constrained by **role + department rules**.

### Seed Users

If you initialize users via `backend/app/db/seed.py`, default demo users are:

- `sales_user / 123`
- `product_user / 123`
- `store_user / 123`
- `admin / 123`

## API Summary

### Auth

- `POST /login` - login and set session cookie
- `GET /me` - get current logged-in user

### Chat Query

- `POST /query` - ask a natural language analytics question
- `GET /queries/top?limit=20` - get recent/top cached query patterns
- `DELETE /queries/top` - clear cached recent query patterns for current scope

### Walkthrough Builder

- `GET /walkthrough/cities`
- `GET /walkthrough/countries`
- `GET /walkthrough/categories`
- `GET /walkthrough/products?categories=...`
- `GET /walkthrough/date-bounds`
- `GET /walkthrough/fields?role=...&agg_function=...`
- `POST /walkthrough/analytics`

### Admin

- `GET /admin/users`
- `POST /admin/create-user`
- `DELETE /admin/delete-user/{username}`

### Health/Debug

- `GET /check-data`
- `GET /debug-join`

## Example Requests

### Login

```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```

### Natural Language Query

```http
POST /query
Content-Type: application/json

{
  "query": "Top 5 products by revenue in 2024"
}
```

## Query Processing Flow

For each chat query, backend follows this path:

1. Check department/role permission for query intent.
2. Try exact cached answer.
3. Try dynamic cache rewrite for `top N` variation.
4. Try dynamic cache rewrite for city variation.
5. Retrieve similar historical NL-to-SQL examples from query registry.
6. Generate SQL with Gemini + schema retrieval context.
7. Validate SQL safety (SELECT-only policy, no destructive statements).
8. Execute SQL on SQLite.
9. Generate concise business insight text.
10. Persist result in cache + registry for future acceleration.

## Notes and Current Limitations

- Sessions are currently kept in an **in-memory store** (session resets on backend restart).
- Passwords are stored in plain text for demo usage (replace with hashing for production).
- Uncached NL queries require a valid Gemini API key.
- `docker-compose.yml` is currently a placeholder.

## Troubleshooting

- **CORS issues:** keep frontend at `http://localhost:3000` and backend at `http://localhost:8000`.
- **`/me` returns not logged in:** ensure browser accepts cookies and Axios uses `withCredentials: true`.
- **LLM response issues:** verify `GEMINI_API_KEY` in `backend/.env`.
- **No data returned:** test `GET /check-data` and validate DB file exists at `backend/app/db/analytics.db`.

## Roadmap

- Migrate from in-memory session storage to persistent store (Redis/DB).
- Add secure password hashing and token/session hardening.
- Add tests for API routes and query orchestration.
- Add Dockerized local development and deployment workflow.
- Add CI with lint + backend/frontend test gates.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Open a pull request

## License

No license is currently declared in this repository. Add a `LICENSE` file before public/commercial reuse.


