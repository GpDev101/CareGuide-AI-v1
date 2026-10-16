# API contract (planned V1)

All application endpoints use the `/api/v1` prefix. Use consistent JSON errors, request IDs and pagination for collection endpoints.

## Implemented now

### `GET /api/v1/health`

Returns service status for local startup verification. This is not an authentication or database-readiness check.

Example:

```json
{
  "status": "UP",
  "service": "careguide-api",
  "version": "0.1.0-SNAPSHOT",
  "timestamp": "2026-10-16T00:00:00Z"
}
```

## Planned endpoints

### Identity

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Authentication mechanism will be finalized before implementation. Do not expose data endpoints without server-side authentication and authorization.

### Knowledge bases

- `POST /api/v1/knowledge-bases`
- `GET /api/v1/knowledge-bases`
- `GET /api/v1/knowledge-bases/{knowledgeBaseId}`
- `PATCH /api/v1/knowledge-bases/{knowledgeBaseId}`
- `DELETE /api/v1/knowledge-bases/{knowledgeBaseId}`

### Documents

- `POST /api/v1/knowledge-bases/{knowledgeBaseId}/documents` — multipart upload, PDF/TXT, initial max 10 MB.
- `GET /api/v1/knowledge-bases/{knowledgeBaseId}/documents` — paginated list.
- `GET /api/v1/documents/{documentId}` — metadata and processing status.
- `DELETE /api/v1/documents/{documentId}` — remove document and associated chunks, subject to role checks.

Expected document states: `RECEIVED`, `PROCESSING`, `READY`, `FAILED`.

### Query

- `POST /api/v1/knowledge-bases/{knowledgeBaseId}/query`

Proposed request:

```json
{
  "question": "What does the approved guideline say about documenting a session?",
  "conversationId": null
}
```

Proposed response:

```json
{
  "answer": "The approved procedure says ...",
  "evidenceStatus": "SUPPORTED",
  "sources": [
    {
      "citationIndex": 1,
      "documentId": "00000000-0000-0000-0000-000000000000",
      "filename": "documentation-guideline.pdf",
      "pageNumber": 3,
      "excerpt": "Relevant source excerpt..."
    }
  ],
  "requestId": "request-id"
}
```

`evidenceStatus` should distinguish `SUPPORTED` from `INSUFFICIENT_EVIDENCE`. A citation may only reference a chunk the retrieval process actually supplied to the model.

## Error shape

```json
{
  "code": "DOCUMENT_TYPE_NOT_SUPPORTED",
  "message": "Upload a PDF or TXT file.",
  "requestId": "request-id"
}
```

Do not expose stack traces, internal storage paths, secret values or sensitive content in error responses.
