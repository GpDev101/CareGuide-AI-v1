# CareGuide AI V1 — Product scope

## Product statement

CareGuide AI helps authorized staff retrieve verifiable answers from an organization's approved operational knowledge. It is a knowledge retrieval tool, not a clinical decision support system.

## V1 target users

- Organization administrator: manages members and knowledge bases.
- Editor: uploads, removes and manages approved documents.
- Viewer: searches and reads content they are authorized to access.

## In scope for V1

1. Authentication and server-side organization membership/role checks.
2. Create and manage knowledge bases within an organization.
3. Upload PDF and TXT files with size/type validation, SHA-256 digest, duplicate detection and processing status.
4. Extract and normalize text; preserve page/source metadata where available.
5. Chunk documents, create embeddings and store chunks in PostgreSQL/pgvector.
6. Retrieve evidence using semantic search; add keyword search after baseline is measurable.
7. Generate answers from retrieved evidence with source citations.
8. Abstain when evidence is missing or below a measured retrieval threshold.
9. Record audit events and operational metrics without logging document bodies or secrets.
10. Test retrieval quality, citation correctness, authorization boundaries, latency and cost.
11. Deploy a controlled demo using synthetic or openly licensed documents only.

## Explicitly out of scope for V1

- Diagnosis, treatment recommendations, risk scoring or clinical decision-making.
- Storing real patient records or session notes in the public portfolio demo.
- Integrations with EHR/EMR systems, messaging platforms or production healthcare systems.
- Autonomous tool actions or agent workflows.
- Model fine-tuning or hosting a foundation model.
- Multi-region infrastructure or microservices.

## V1 acceptance criteria

- A user cannot access another organization's knowledge base, documents, chunks or conversations by guessing IDs or modifying requests.
- A supported file upload produces a clear processing status and a usable error if parsing fails.
- Every answer citation points to a source chunk actually retrieved and used for that answer.
- The API can return an evidence-insufficient response rather than inventing an answer.
- An evaluation set is committed to the repository and can be rerun after retrieval/prompt changes.
- The app has automated tests for core workflows and tenant isolation.
- A live demo is clearly labeled as a portfolio demonstration and uses non-sensitive documents.

## V1 release slices

- **V1.0 Foundation:** build, local database, migration, health endpoint and frontend shell. This starter implements this slice.
- **V1.1 Identity and tenancy:** authentication, membership roles, request identity and organization-scoped authorization.
- **V1.2 Knowledge management:** knowledge-base CRUD, secure file upload, document metadata and status.
- **V1.3 Ingestion:** extraction, chunking, ingestion retries and embeddings.
- **V1.4 Retrieval and RAG:** retrieval, grounded answers, source citations and abstention.
- **V1.5 Quality and hardening:** evaluation suite, audit trail, rate limits, prompt-injection handling and observability.
- **V1.6 Release:** deployment, seeded demo data, CI/CD, architecture diagram and technical write-up.
