# V1 backlog and completion checklist

## Chunk 0 — Foundation (starter delivered)
- [x] Establish mono-repository layout.
- [x] Create Spring Boot health endpoint.
- [x] Create React shell with backend connectivity indicator.
- [x] Add PostgreSQL/pgvector local Compose service.
- [x] Add first Flyway schema migration.
- [x] Document product scope, architecture, API contract and schema.

## Chunk 1 — Identity and tenancy
- [ ] Decide session-cookie vs OIDC authentication and record the decision.
- [ ] Implement current-user principal and logout/login flow.
- [ ] Add role-based organization membership checks.
- [ ] Add organization-scoped repository/query patterns.
- [ ] Add negative tests that attempt cross-tenant access.
- [ ] Add secret-safe error handling and request IDs.

## Chunk 2 — Knowledge-base CRUD and uploads
- [ ] CRUD endpoints and UI for knowledge bases.
- [ ] Role permissions: ADMIN/EDITOR can manage; VIEWER is read-only.
- [ ] Validate content type and file signature, not only extension.
- [ ] Enforce size limits; calculate SHA-256; deduplicate within a knowledge base.
- [ ] Store files outside the public web root using private local storage in dev.
- [ ] Persist state and present clear processing/error status.
- [ ] Test unauthorized, oversized, invalid and duplicate uploads.

## Chunk 3 — Ingestion and embeddings
- [ ] Extract PDF/TXT text with page metadata where supported.
- [ ] Normalize extraction output and detect empty/scanned PDFs.
- [ ] Chunk with recorded chunk indices and source metadata.
- [ ] Add an embedding-provider interface and external provider implementation.
- [ ] Retry transient failures; make ingestion idempotent.
- [ ] Choose embedding model, vector dimensions, and index strategy.

## Chunk 4 — Retrieval and answers
- [ ] Implement organization/knowledge-base/document-scoped retrieval.
- [ ] Establish a baseline with semantic search.
- [ ] Evaluate whether keyword + semantic hybrid search improves recall.
- [ ] Assemble prompts from retrieved evidence, never raw user-controlled instructions alone.
- [ ] Generate answers and map citations to stored chunk IDs.
- [ ] Abstain when retrieval evidence is insufficient.
- [ ] Persist conversations, messages, exact source IDs, latency and token/cost metadata.

## Chunk 5 — Quality and hardening
- [ ] Commit 30–50 synthetic questions with expected source documents.
- [ ] Measure Recall@k / source hit rate, citation correctness and answer faithfulness.
- [ ] Test prompt injection in document text and user questions.
- [ ] Add rate limits, provider timeouts and bounded retries.
- [ ] Add metrics and dashboards for error rate, p95 latency and cost.
- [ ] Test deletion propagation to chunks and stored files.

## Chunk 6 — Release
- [ ] Add Dockerfiles and deployment manifests.
- [ ] Set up CI for backend tests, frontend build and migration checks.
- [ ] Configure TLS, secrets, backups, firewall and least-privilege DB access.
- [ ] Seed non-sensitive demo documents and a demo organization.
- [ ] Write deployment instructions, trade-offs and known limitations.
- [ ] Record a short demo showing a supported answer and an abstention case.
