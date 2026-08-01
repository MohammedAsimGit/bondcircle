# BondCircle — Book 11: API Blueprint

---

## Document Information

| Field | Value |
|-------|-------|
| **Document Name** | BondCircle API Blueprint |
| **Document Version** | v1.0 |
| **Creation Date** | 01 August 2026 |
| **Last Updated Date** | 01 August 2026 |
| **Author** | API Architecture Team, Principal Backend Engineer, Security Architect |
| **Document Status** | Active |
| **Phase** | Phase 11 — API Architecture |
| **Purpose** | Define complete API contracts for BondCircle |
| **Scope** | All API endpoints, request/response formats, validation, security |
| **Audience** | Backend Engineers, Frontend Engineers, Mobile Engineers, QA |
| **Dependencies** | Book 0 — Founder Knowledge Base (v1.0), Book 1 — Product Foundation (v1.0), Book 3 — PRD (v1.0), Book 3.5 — Feature Blueprint (v1.0), Book 7 — Technology Blueprint (v1.0), Book 8 — Database Blueprint (v1.0), Book 9 — Backend Architecture (v1.0), Book 10 — Frontend Architecture (v1.0) |
| **Documents Using This** | Book 12 — Real-Time Architecture Blueprint, Book 13 — Deployment Guide |
| **Estimated Reading Time** | 60–80 minutes per volume |

---

## Document Purpose

This document defines every API contract in BondCircle. It specifies endpoints, request/response formats, authentication, permissions, validation, errors, pagination, filtering, sorting, and versioning.

This document does not repeat Book 0, Book 1, Book 3, Book 3.5, Book 7, Book 8, Book 9, or Book 10. It provides the API-specific implementation of decisions made in those documents.

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1.0 | 01 August 2026 | API Architecture Team | Initial creation — Complete API Blueprint |

---

## Location

```
BondCircle/
  docs/
    pre-development/
      Book-11-API-Blueprint-v1.0.md
```

---

# Table of Contents

**Volume 1: Authentication APIs**
- 1. API Philosophy
- 2. Authentication APIs

**Volume 2: Friends & Workspace APIs**
- 3. Friend APIs
- 4. Workspace APIs

**Volume 3: Chat APIs**
- 5. Chat APIs

**Volume 4: Media APIs**
- 6. Media APIs

**Volume 5: Timeline APIs**
- 7. Timeline APIs

**Volume 6: Search APIs**
- 8. Search APIs

**Volume 7: Settings, Premium, Analytics**
- 9. Settings APIs
- 10. Premium APIs
- 11. Analytics APIs

**Volume 8: Security, Versioning, Validation**
- 12. Validation Standards
- 13. Error Standards
- 14. Pagination Standards
- 15. Filtering Standards
- 16. API Security
- 17. API Versioning

---

# VOLUME 1: Authentication APIs

---

# 1. API Philosophy

---

## 1.1 REST Standards

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Resource-oriented** | Resources are nouns, not verbs |
| **HTTP methods** | GET, POST, PUT, PATCH, DELETE |
| **Status codes** | Meaningful HTTP status codes |
| **Stateless** | No server-side session state |
| **Cacheable** | Responses include cache headers |

**URL Structure**:

```
https://api.bondcircle.com/v1/{resource}
https://api.bondcircle.com/v1/{resource}/{id}
https://api.bondcircle.com/v1/{resource}/{id}/{sub-resource}
```

---

## 1.2 Naming Standards

**Resource Naming**:

| Rule | Example |
|------|---------|
| **Plural nouns** | /users, /workspaces |
| **Lowercase** | /users, not /Users |
| **Hyphens for multi-word** | /friend-requests |
| **No verbs** | /users/{id}, not /getUser |

**HTTP Methods**:

| Method | Purpose | Idempotent |
|--------|---------|------------|
| **GET** | Read resource | Yes |
| **POST** | Create resource | No |
| **PUT** | Replace resource | Yes |
| **PATCH** | Update resource | No |
| **DELETE** | Delete resource | Yes |

---

## 1.3 Consistency Rules

**Request Headers**:

| Header | Required | Description |
|--------|----------|-------------|
| **Authorization** | Yes (except auth endpoints) | Bearer token |
| **Content-Type** | Yes (POST/PUT/PATCH) | application/json |
| **Accept** | No | application/json |
| **X-Request-ID** | No | Request tracking |

**Response Headers**:

| Header | Description |
|--------|-------------|
| **Content-Type** | application/json |
| **X-Request-ID** | Request tracking |
| **X-RateLimit-Limit** | Rate limit |
| **X-RateLimit-Remaining** | Remaining requests |
| **X-RateLimit-Reset** | Reset timestamp |

---

## 1.4 Security Rules

| Rule | Description |
|------|-------------|
| **HTTPS only** | All endpoints require HTTPS |
| **Authentication** | All endpoints require auth (except login/register) |
| **Authorization** | Check permissions per endpoint |
| **Rate limiting** | Rate limit all endpoints |
| **Input validation** | Validate all inputs |
| **Output sanitization** | Sanitize all outputs |

---

## 1.5 Performance Rules

| Rule | Description |
|------|-------------|
| **Pagination** | Paginate list endpoints |
| **Field selection** | Allow field filtering |
| **Compression** | Enable gzip/brotli |
| **Caching** | Cache GET responses |
| **CDN** | Use CDN for static assets |

---

## 1.6 Versioning Philosophy

**Strategy**: URL-based versioning

**Version Format**: `/v1/`, `/v2/`

**Deprecation Policy**:

| Phase | Duration | Action |
|-------|----------|--------|
| **Active** | Ongoing | Supported |
| **Deprecated** | 6 months | Warning header |
| **Sunset** | After deprecation | Removed |

---

# 2. Authentication APIs

---

## 2.1 POST /v1/auth/register

**Purpose**: Register a new user account.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 3 requests per hour

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "John Doe",
  "username": "johndoe"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **email** | Required, valid email format |
| **password** | Required, min 8 characters |
| **displayName** | Required, 1-100 characters |
| **username** | Required, 3-50 characters, alphanumeric and hyphens |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "username": "johndoe",
      "avatarUrl": null,
      "createdAt": "2026-08-01T12:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "abc123...",
      "expiresIn": 900
    }
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **409** | EMAIL_EXISTS | Email already registered |
| **409** | USERNAME_EXISTS | Username already taken |
| **429** | RATE_LIMITED | Too many requests |

---

## 2.2 POST /v1/auth/login

**Purpose**: Authenticate a user.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 5 requests per 15 minutes

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **email** | Required, valid email format |
| **password** | Required |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "username": "johndoe",
      "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "abc123...",
      "expiresIn": 900
    }
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **401** | INVALID_CREDENTIALS | Wrong email or password |
| **403** | ACCOUNT_DISABLED | Account is disabled |
| **429** | RATE_LIMITED | Too many attempts |

---

## 2.3 POST /v1/auth/logout

**Purpose**: Invalidate the current session.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Request Headers**:

| Header | Value |
|--------|-------|
| **Authorization** | Bearer {accessToken} |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

## 2.4 POST /v1/auth/refresh

**Purpose**: Refresh access token.

**Authentication**: Not required (uses refresh token)

**Permissions**: None

**Rate Limit**: 100 requests per minute

**Request Body**:

```json
{
  "refreshToken": "abc123..."
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **refreshToken** | Required, valid refresh token |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "def456...",
      "expiresIn": 900
    }
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **401** | INVALID_REFRESH_TOKEN | Invalid or expired refresh token |
| **401** | TOKEN_REVOKED | Refresh token has been revoked |

---

## 2.5 POST /v1/auth/forgot-password

**Purpose**: Send password reset email.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 3 requests per hour

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **email** | Required, valid email format |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "If the email exists, a reset link has been sent"
  }
}
```

---

## 2.6 POST /v1/auth/reset-password

**Purpose**: Reset password with token.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 3 requests per hour

**Request Body**:

```json
{
  "token": "reset-token-abc123",
  "password": "newSecurePassword123"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **token** | Required, valid reset token |
| **password** | Required, min 8 characters |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully"
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **401** | INVALID_TOKEN | Invalid or expired token |

---

## 2.7 POST /v1/auth/verify-email

**Purpose**: Verify email address.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "token": "verify-token-abc123"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Email verified successfully"
  }
}
```

---

## 2.8 POST /v1/auth/resend-verification

**Purpose**: Resend verification email.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 3 requests per hour

**Request Headers**:

| Header | Value |
|--------|-------|
| **Authorization** | Bearer {accessToken} |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Verification email sent"
  }
}
```

---

## 2.9 POST /v1/auth/oauth/apple

**Purpose**: Apple OAuth login/register.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "identityToken": "apple-identity-token",
  "authorizationCode": "apple-auth-code"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "abc123...",
      "expiresIn": 900
    },
    "isNewUser": false
  }
}
```

---

## 2.10 POST /v1/auth/oauth/google

**Purpose**: Google OAuth login/register.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "idToken": "google-id-token"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "avatarUrl": "https://lh3.googleusercontent.com/..."
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "abc123...",
      "expiresIn": 900
    },
    "isNewUser": false
  }
}
```

---

## 2.11 POST /v1/auth/biometric/register

**Purpose**: Register biometric authentication.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "deviceName": "iPhone 15 Pro",
  "deviceType": "ios",
  "publicKey": "base64-encoded-public-key"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "deviceId": "uuid",
    "deviceName": "iPhone 15 Pro",
    "registeredAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 2.12 POST /v1/auth/biometric/login

**Purpose**: Login with biometric.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "deviceId": "uuid",
  "signature": "base64-encoded-signature",
  "challenge": "base64-encoded-challenge"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "abc123...",
      "expiresIn": 900
    }
  }
}
```

---

## 2.13 GET /v1/auth/sessions

**Purpose**: Get user's active sessions.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "uuid",
        "deviceName": "iPhone 15 Pro",
        "deviceType": "ios",
        "ipAddress": "192.168.1.1",
        "lastActiveAt": "2026-08-01T12:00:00Z",
        "createdAt": "2026-07-01T12:00:00Z",
        "isCurrent": true
      }
    ]
  }
}
```

---

## 2.14 DELETE /v1/auth/sessions/{sessionId}

**Purpose**: Revoke a session.

**Authentication**: Required

**Permissions**: Authenticated user (own sessions only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Session revoked"
  }
}
```

---

## 2.15 DELETE /v1/auth/sessions

**Purpose**: Revoke all sessions except current.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "All other sessions revoked",
    "revokedCount": 3
  }
}
```

---

**END OF VOLUME 1**

---

# VOLUME 2: Friends & Workspace APIs

---

# 3. Friend APIs

---

## 3.1 POST /v1/friends/invite

**Purpose**: Send a friend invite.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "recipientId": "uuid",
  "message": "Let's be friends on BondCircle!"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **recipientId** | Required, valid UUID, must be a real user |
| **message** | Optional, 0-500 characters |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "inviteId": "uuid",
    "status": "pending",
    "createdAt": "2026-08-01T12:00:00Z"
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **404** | USER_NOT_FOUND | Recipient not found |
| **409** | ALREADY_FRIENDS | Already friends |
| **409** | INVITE_PENDING | Invite already pending |
| **409** | SELF_INVITE | Cannot invite yourself |
| **429** | RATE_LIMITED | Too many requests |

---

## 3.2 GET /v1/friends/invites

**Purpose**: Get pending friend invites.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **direction** | string | No | "sent" or "received" (default: both) |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "invites": [
      {
        "id": "uuid",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "username": "janesmith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "recipient": {
          "id": "uuid",
          "displayName": "John Doe",
          "username": "johndoe"
        },
        "message": "Let's be friends!",
        "status": "pending",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 5
    }
  }
}
```

---

## 3.3 POST /v1/friends/invites/{inviteId}/accept

**Purpose**: Accept a friend invite.

**Authentication**: Required

**Permissions**: Authenticated user (recipient only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "friend": {
        "id": "uuid",
        "displayName": "Jane Smith",
        "username": "janesmith",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
      },
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **404** | INVITE_NOT_FOUND | Invite not found |
| **403** | NOT_RECIPIENT | You can only accept invites sent to you |
| **409** | ALREADY_FRIENDS | Already friends |

---

## 3.4 POST /v1/friends/invites/{inviteId}/reject

**Purpose**: Reject a friend invite.

**Authentication**: Required

**Permissions**: Authenticated user (recipient only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Invite rejected"
  }
}
```

---

## 3.5 DELETE /v1/friends/invites/{inviteId}

**Purpose**: Cancel a sent invite.

**Authentication**: Required

**Permissions**: Authenticated user (sender only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Invite cancelled"
  }
}
```

---

## 3.6 GET /v1/friends

**Purpose**: Get user's friends list.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **search** | string | No | Search by name or username |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |
| **sort** | string | No | "name", "recent" (default: "name") |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friends": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "username": "janesmith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "status": "active",
        "isMuted": false,
        "isBlocked": false,
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 50
    }
  }
}
```

---

## 3.7 GET /v1/friends/{friendId}

**Purpose**: Get friend details.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "displayName": "Jane Smith",
        "username": "janesmith",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp",
        "bio": "Love to travel!",
        "location": "San Francisco, CA"
      },
      "status": "active",
      "isMuted": false,
      "isBlocked": false,
      "sharedWorkspaces": [
        {
          "id": "uuid",
          "name": "Travel Buddies"
        }
      ],
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 3.8 DELETE /v1/friends/{friendId}

**Purpose**: Remove a friend.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Friend removed"
  }
}
```

---

## 3.9 POST /v1/friends/{friendId}/block

**Purpose**: Block a friend.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "isBlocked": true,
      "blockedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 3.10 DELETE /v1/friends/{friendId}/block

**Purpose**: Unblock a friend.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "isBlocked": false
    }
  }
}
```

---

## 3.11 POST /v1/friends/{friendId}/mute

**Purpose**: Mute a friend.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Request Body**:

```json
{
  "duration": "24h"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **duration** | Optional: "1h", "24h", "7d", "30d", "forever" (default: "24h") |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "isMuted": true,
      "mutedUntil": "2026-08-02T12:00:00Z"
    }
  }
}
```

---

## 3.12 DELETE /v1/friends/{friendId}/mute

**Purpose**: Unmute a friend.

**Authentication**: Required

**Permissions**: Authenticated user (friend only)

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friendship": {
      "id": "uuid",
      "isMuted": false
    }
  }
}
```

---

## 3.13 GET /v1/friends/blocked

**Purpose**: Get blocked users list.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "blocked": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "displayName": "Blocked User",
          "username": "blockeduser",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "blockedAt": "2026-08-01T12:00:00Z"
      }
    ]
  }
}
```

---

# 4. Workspace APIs

---

## 4.1 POST /v1/workspaces

**Purpose**: Create a new workspace.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "name": "Travel Buddies",
  "description": "Our travel memories together",
  "type": "friends",
  "icon": "travel",
  "color": "#3B82F6"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **name** | Required, 1-100 characters |
| **description** | Optional, 0-500 characters |
| **type** | Required: "friends", "couples", "families", "communities" |
| **icon** | Optional, valid icon name |
| **color** | Optional, valid hex color |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "workspace": {
      "id": "uuid",
      "name": "Travel Buddies",
      "description": "Our travel memories together",
      "type": "friends",
      "icon": "travel",
      "color": "#3B82F6",
      "ownerId": "uuid",
      "memberCount": 1,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 4.2 GET /v1/workspaces

**Purpose**: Get user's workspaces.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **type** | string | No | Filter by type |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "workspaces": [
      {
        "id": "uuid",
        "name": "Travel Buddies",
        "description": "Our travel memories together",
        "type": "friends",
        "icon": "travel",
        "color": "#3B82F6",
        "memberCount": 5,
        "unreadCount": 2,
        "lastActivityAt": "2026-08-01T12:00:00Z",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 10
    }
  }
}
```

---

## 4.3 GET /v1/workspaces/{workspaceId}

**Purpose**: Get workspace details.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "workspace": {
      "id": "uuid",
      "name": "Travel Buddies",
      "description": "Our travel memories together",
      "type": "friends",
      "icon": "travel",
      "color": "#3B82F6",
      "ownerId": "uuid",
      "memberCount": 5,
      "memoryCount": 120,
      "mediaCount": 450,
      "createdAt": "2026-08-01T12:00:00Z",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 4.4 PATCH /v1/workspaces/{workspaceId}

**Purpose**: Update workspace details.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "icon": "updated-icon",
  "color": "#10B981"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "workspace": {
      "id": "uuid",
      "name": "Updated Name",
      "description": "Updated description",
      "icon": "updated-icon",
      "color": "#10B981",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 4.5 DELETE /v1/workspaces/{workspaceId}

**Purpose**: Delete a workspace.

**Authentication**: Required

**Permissions**: Workspace owner only

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Workspace deleted"
  }
}
```

---

## 4.6 GET /v1/workspaces/{workspaceId}/members

**Purpose**: Get workspace members.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **role** | string | No | Filter by role: "owner", "admin", "member" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "username": "janesmith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "role": "owner",
        "joinedAt": "2026-08-01T12:00:00Z",
        "lastActiveAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 5
    }
  }
}
```

---

## 4.7 POST /v1/workspaces/{workspaceId}/members

**Purpose**: Add member to workspace.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "userId": "uuid",
  "role": "member"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **userId** | Required, valid UUID, must be a friend |
| **role** | Required: "admin", "member" |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "member": {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "displayName": "Jane Smith",
        "username": "janesmith",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
      },
      "role": "member",
      "joinedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

**Error Responses**:

| Status | Code | Description |
|--------|------|-------------|
| **400** | VALIDATION_ERROR | Invalid input |
| **403** | NOT_ADMIN | Not a workspace admin |
| **404** | USER_NOT_FOUND | User not found |
| **409** | ALREADY_MEMBER | User is already a member |

---

## 4.8 PATCH /v1/workspaces/{workspaceId}/members/{memberId}

**Purpose**: Update member role.

**Authentication**: Required

**Permissions**: Workspace owner only

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "role": "admin"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "member": {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "displayName": "Jane Smith"
      },
      "role": "admin",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 4.9 DELETE /v1/workspaces/{workspaceId}/members/{memberId}

**Purpose**: Remove member from workspace.

**Authentication**: Required

**Permissions**: Workspace admin or owner (cannot remove owner)

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Member removed"
  }
}
```

---

## 4.10 POST /v1/workspaces/{workspaceId}/leave

**Purpose**: Leave a workspace.

**Authentication**: Required

**Permissions**: Workspace member (not owner)

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Left workspace"
  }
}
```

---

## 4.11 POST /v1/workspaces/{workspaceId}/invite

**Purpose**: Invite user to workspace.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "email": "user@example.com",
  "role": "member"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "inviteId": "uuid",
    "email": "user@example.com",
    "status": "pending",
    "createdAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 4.12 GET /v1/workspaces/{workspaceId}/invites

**Purpose**: Get workspace invites.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "invites": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "role": "member",
        "status": "pending",
        "createdAt": "2026-08-01T12:00:00Z",
        "expiresAt": "2026-08-08T12:00:00Z"
      }
    ]
  }
}
```

---

## 4.13 DELETE /v1/workspaces/{workspaceId}/invites/{inviteId}

**Purpose**: Cancel workspace invite.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Invite cancelled"
  }
}
```

---

## 4.14 GET /v1/workspaces/{workspaceId}/permissions

**Purpose**: Get workspace permissions.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "permissions": {
      "canEditWorkspace": true,
      "canManageMembers": true,
      "canDeleteWorkspace": false,
      "canPostMessages": true,
      "canUploadMedia": true,
      "canCreateEvents": true,
      "canDeleteMessages": true
    }
  }
}
```

---

**END OF VOLUME 2**

---

# VOLUME 3: Chat APIs

---

# 5. Chat APIs

---

## 5.1 GET /v1/conversations

**Purpose**: Get user's conversations.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **workspaceId** | string | No | Filter by workspace |
| **type** | string | No | "direct", "group" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "uuid",
        "type": "group",
        "workspace": {
          "id": "uuid",
          "name": "Travel Buddies",
          "icon": "travel"
        },
        "lastMessage": {
          "id": "uuid",
          "content": "Great trip yesterday!",
          "senderId": "uuid",
          "createdAt": "2026-08-01T12:00:00Z"
        },
        "unreadCount": 3,
        "isPinned": false,
        "isMuted": false,
        "members": [
          {
            "id": "uuid",
            "displayName": "Jane Smith",
            "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp",
            "isOnline": true
          }
        ],
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 25
    }
  }
}
```

---

## 5.2 GET /v1/conversations/{conversationId}

**Purpose**: Get conversation details.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "uuid",
      "type": "group",
      "workspace": {
        "id": "uuid",
        "name": "Travel Buddies",
        "icon": "travel"
      },
      "members": [
        {
          "id": "uuid",
          "user": {
            "id": "uuid",
            "displayName": "Jane Smith",
            "username": "janesmith",
            "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
          },
          "role": "admin",
          "joinedAt": "2026-08-01T12:00:00Z",
          "isOnline": true,
          "lastSeenAt": "2026-08-01T12:00:00Z"
        }
      ],
      "unreadCount": 3,
      "isPinned": false,
      "isMuted": false,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.3 POST /v1/conversations

**Purpose**: Create a direct conversation.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "recipientId": "uuid"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "uuid",
      "type": "direct",
      "recipient": {
        "id": "uuid",
        "displayName": "Jane Smith",
        "username": "janesmith",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
      },
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.4 POST /v1/conversations/{conversationId}/messages

**Purpose**: Send a message.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 60 requests per minute

**Request Body**:

```json
{
  "content": "Hello, everyone!",
  "type": "text",
  "replyTo": "uuid",
  "attachments": [
    {
      "type": "image",
      "url": "https://cdn.bondcircle.com/media/uuid.webp",
      "width": 800,
      "height": 600,
      "mimeType": "image/webp"
    }
  ]
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **content** | Required if no attachments, max 10,000 characters |
| **type** | Required: "text", "image", "file", "location", "event" |
| **replyTo** | Optional, valid message ID in conversation |
| **attachments** | Optional, max 10 attachments |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "conversationId": "uuid",
      "sender": {
        "id": "uuid",
        "displayName": "John Doe",
        "username": "johndoe",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
      },
      "content": "Hello, everyone!",
      "type": "text",
      "replyTo": null,
      "attachments": [],
      "reactions": [],
      "readBy": [],
      "isEdited": false,
      "isDeleted": false,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.5 GET /v1/conversations/{conversationId}/messages

**Purpose**: Get conversation messages.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 50, max: 100) |
| **before** | string | No | Message ID to get messages before |
| **after** | string | No | Message ID to get messages after |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "username": "janesmith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "content": "Hello, everyone!",
        "type": "text",
        "replyTo": null,
        "attachments": [],
        "reactions": [
          {
            "emoji": "❤️",
            "count": 3,
            "users": [
              {
                "id": "uuid",
                "displayName": "John Doe"
              }
            ]
          }
        ],
        "isEdited": false,
        "isDeleted": false,
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 150
    }
  }
}
```

---

## 5.6 PATCH /v1/conversations/{conversationId}/messages/{messageId}

**Purpose**: Edit a message.

**Authentication**: Required

**Permissions**: Message sender only

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "content": "Updated message content"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "content": "Updated message content",
      "isEdited": true,
      "editedAt": "2026-08-01T12:05:00Z"
    }
  }
}
```

---

## 5.7 DELETE /v1/conversations/{conversationId}/messages/{messageId}

**Purpose**: Delete a message.

**Authentication**: Required

**Permissions**: Message sender or workspace admin

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "isDeleted": true,
      "deletedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.8 POST /v1/conversations/{conversationId}/messages/{messageId}/reactions

**Purpose**: Add reaction to message.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 60 requests per minute

**Request Body**:

```json
{
  "emoji": "❤️"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "reaction": {
      "emoji": "❤️",
      "count": 4,
      "users": [
        {
          "id": "uuid",
          "displayName": "John Doe"
        }
      ]
    }
  }
}
```

---

## 5.9 DELETE /v1/conversations/{conversationId}/messages/{messageId}/reactions/{emoji}

**Purpose**: Remove reaction from message.

**Authentication**: Required

**Permissions**: Authenticated user (own reaction)

**Rate Limit**: 60 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Reaction removed"
  }
}
```

---

## 5.10 POST /v1/conversations/{conversationId}/messages/{messageId}/pin

**Purpose**: Pin a message.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "isPinned": true,
      "pinnedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.11 DELETE /v1/conversations/{conversationId}/messages/{messageId}/pin

**Purpose**: Unpin a message.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "isPinned": false
    }
  }
}
```

---

## 5.12 POST /v1/conversations/{conversationId}/messages/{messageId}/bookmark

**Purpose**: Bookmark a message.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 60 requests per minute

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "bookmark": {
      "id": "uuid",
      "messageId": "uuid",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.13 DELETE /v1/conversations/{conversationId}/messages/{messageId}/bookmark

**Purpose**: Remove bookmark.

**Authentication**: Required

**Permissions**: Authenticated user (own bookmark)

**Rate Limit**: 60 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Bookmark removed"
  }
}
```

---

## 5.14 POST /v1/conversations/{conversationId}/messages/{messageId}/forward

**Purpose**: Forward message to another conversation.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "targetConversationId": "uuid"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "uuid",
      "forwardedFrom": {
        "id": "uuid",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith"
        },
        "content": "Original message"
      },
      "content": "Original message",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.15 POST /v1/conversations/{conversationId}/read

**Purpose**: Mark conversation as read.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Request Body**:

```json
{
  "messageId": "uuid"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "unreadCount": 0
  }
}
```

---

## 5.16 POST /v1/conversations/{conversationId}/typing

**Purpose**: Send typing indicator.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Request Body**:

```json
{
  "isTyping": true
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "typing": {
      "userId": "uuid",
      "isTyping": true,
      "timestamp": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.17 GET /v1/conversations/{conversationId}/typing

**Purpose**: Get typing indicators.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "typingUsers": [
      {
        "userId": "uuid",
        "displayName": "Jane Smith",
        "isTyping": true,
        "startedAt": "2026-08-01T12:00:00Z"
      }
    ]
  }
}
```

---

## 5.18 GET /v1/conversations/{conversationId}/presence

**Purpose**: Get online status of members.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "presence": [
      {
        "userId": "uuid",
        "displayName": "Jane Smith",
        "isOnline": true,
        "lastSeenAt": "2026-08-01T12:00:00Z"
      },
      {
        "userId": "uuid",
        "displayName": "John Doe",
        "isOnline": false,
        "lastSeenAt": "2026-08-01T11:00:00Z"
      }
    ]
  }
}
```

---

## 5.19 POST /v1/conversations/{conversationId}/attachments

**Purpose**: Upload attachment.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 30 requests per minute

**Request Body**:

```
Content-Type: multipart/form-data

file: (binary data)
description: "Photo from trip"
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "attachment": {
      "id": "uuid",
      "url": "https://cdn.bondcircle.com/media/uuid.webp",
      "type": "image",
      "mimeType": "image/webp",
      "size": 1024000,
      "width": 800,
      "height": 600,
      "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
      "description": "Photo from trip",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.20 GET /v1/conversations/{conversationId}/attachments

**Purpose**: Get conversation attachments.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **type** | string | No | Filter by type: "image", "file", "video" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "attachments": [
      {
        "id": "uuid",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "type": "image",
        "mimeType": "image/webp",
        "size": 1024000,
        "width": 800,
        "height": 600,
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith"
        },
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 50
    }
  }
}
```

---

## 5.21 PATCH /v1/conversations/{conversationId}

**Purpose**: Update conversation settings.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "isPinned": true,
  "isMuted": false,
  "mutedUntil": null
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "uuid",
      "isPinned": true,
      "isMuted": false,
      "mutedUntil": null,
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 5.22 POST /v1/conversations/{conversationId}/leave

**Purpose**: Leave a conversation.

**Authentication**: Required

**Permissions**: Conversation member (not owner)

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Left conversation"
  }
}
```

---

## 5.23 GET /v1/conversations/{conversationId}/search

**Purpose**: Search messages in conversation.

**Authentication**: Required

**Permissions**: Conversation member

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Search query |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith"
        },
        "content": "Great trip yesterday!",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 10
    }
  }
}
```

---

**END OF VOLUME 3**

---

# VOLUME 4: Media APIs

---

# 6. Media APIs

---

## 6.1 POST /v1/media/upload

**Purpose**: Upload a media file.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```
Content-Type: multipart/form-data

file: (binary data)
type: "photo" | "video" | "document"
workspaceId: "uuid" (optional)
conversationId: "uuid" (optional)
description: "Description" (optional)
```

**File Validation Rules**:

| Type | Max Size | Allowed Formats |
|------|----------|-----------------|
| **photo** | 20MB | jpg, jpeg, png, webp, heic |
| **video** | 500MB | mp4, mov, quicktime |
| **document** | 50MB | pdf, doc, docx, txt |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "media": {
      "id": "uuid",
      "type": "photo",
      "url": "https://cdn.bondcircle.com/media/uuid.webp",
      "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
      "mimeType": "image/webp",
      "size": 2048000,
      "width": 1920,
      "height": 1080,
      "duration": null,
      "filename": "photo.webp",
      "description": "Beach sunset",
      "workspaceId": "uuid",
      "conversationId": null,
      "uploadedBy": {
        "id": "uuid",
        "displayName": "John Doe"
      },
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.2 POST /v1/media/upload-multiple

**Purpose**: Upload multiple media files.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per minute

**Request Body**:

```
Content-Type: multipart/form-data

files: (binary data, multiple)
type: "photo"
workspaceId: "uuid"
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "uuid",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
      }
    ],
    "uploadCount": 5,
    "failedCount": 0
  }
}
```

---

## 6.3 GET /v1/media/{mediaId}

**Purpose**: Get media details.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "media": {
      "id": "uuid",
      "type": "photo",
      "url": "https://cdn.bondcircle.com/media/uuid.webp",
      "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
      "mimeType": "image/webp",
      "size": 2048000,
      "width": 1920,
      "height": 1080,
      "duration": null,
      "filename": "photo.webp",
      "description": "Beach sunset",
      "metadata": {
        "camera": "iPhone 15 Pro",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194,
          "name": "San Francisco, CA"
        },
        "takenAt": "2026-07-15T18:30:00Z"
      },
      "workspace": {
        "id": "uuid",
        "name": "Travel Buddies"
      },
      "uploadedBy": {
        "id": "uuid",
        "displayName": "John Doe"
      },
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.4 GET /v1/media

**Purpose**: Get user's media.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **type** | string | No | "photo", "video", "document" |
| **workspaceId** | string | No | Filter by workspace |
| **conversationId** | string | No | Filter by conversation |
| **startDate** | string | No | ISO 8601 date |
| **endDate** | string | No | ISO 8601 date |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "uuid",
        "type": "photo",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
        "mimeType": "image/webp",
        "size": 2048000,
        "width": 1920,
        "height": 1080,
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 500
    }
  }
}
```

---

## 6.5 DELETE /v1/media/{mediaId}

**Purpose**: Delete media.

**Authentication**: Required

**Permissions**: Media owner or workspace admin

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Media deleted"
  }
}
```

---

## 6.6 POST /v1/media/{mediaId}/compress

**Purpose**: Compress media.

**Authentication**: Required

**Permissions**: Media owner

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "quality": "high",
  "format": "webp"
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **quality** | "low", "medium", "high" |
| **format** | "webp", "jpg", "png" |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "compression": {
      "originalSize": 2048000,
      "compressedSize": 512000,
      "compressionRatio": 0.25,
      "url": "https://cdn.bondcircle.com/media/uuid-compressed.webp",
      "format": "webp",
      "quality": "high"
    }
  }
}
```

---

## 6.7 GET /v1/media/{mediaId}/thumbnail

**Purpose**: Get media thumbnail.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **width** | integer | No | Thumbnail width (default: 200) |
| **height** | integer | No | Thumbnail height (default: 200) |
| **format** | string | No | "webp", "jpg" (default: "webp") |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "thumbnail": {
      "url": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
      "width": 200,
      "height": 200,
      "format": "webp",
      "size": 51200
    }
  }
}
```

---

## 6.8 GET /v1/media/{mediaId}/stream

**Purpose**: Stream media (for video/audio).

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **quality** | string | No | "low", "medium", "high" |
| **range** | string | No | Byte range for resumable download |

**Success Response (200 OK)**:

```
Content-Type: video/mp4
Content-Length: 524288000
Content-Range: bytes 0-524287999/524288000

(binary data)
```

---

## 6.9 POST /v1/media/{mediaId}/download

**Purpose**: Generate download link.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 10 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "download": {
      "url": "https://cdn.bondcircle.com/downloads/uuid?token=abc123",
      "expiresAt": "2026-08-01T12:30:00Z",
      "filename": "photo.webp",
      "size": 2048000
    }
  }
}
```

---

## 6.10 PATCH /v1/media/{mediaId}

**Purpose**: Update media metadata.

**Authentication**: Required

**Permissions**: Media owner

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "description": "Updated description",
  "tags": ["vacation", "beach"]
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "media": {
      "id": "uuid",
      "description": "Updated description",
      "tags": ["vacation", "beach"],
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.11 POST /v1/media/{mediaId}/move

**Purpose**: Move media to another workspace.

**Authentication**: Required

**Permissions**: Media owner or workspace admin

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "targetWorkspaceId": "uuid"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "media": {
      "id": "uuid",
      "workspace": {
        "id": "uuid",
        "name": "New Workspace"
      },
      "movedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.12 POST /v1/media/{mediaId}/copy

**Purpose**: Copy media to another workspace.

**Authentication**: Required

**Permissions**: Media owner or workspace admin

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "targetWorkspaceId": "uuid"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "media": {
      "id": "uuid-new",
      "url": "https://cdn.bondcircle.com/media/uuid-new.webp",
      "workspace": {
        "id": "uuid",
        "name": "New Workspace"
      },
      "copiedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.13 GET /v1/media/{mediaId}/metadata

**Purpose**: Get media metadata.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "metadata": {
      "exif": {
        "camera": "iPhone 15 Pro",
        "lens": "Wide",
        "iso": 100,
        "aperture": "f/1.8",
        "shutterSpeed": "1/125"
      },
      "location": {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "altitude": 16,
        "name": "San Francisco, CA"
      },
      "timestamps": {
        "takenAt": "2026-07-15T18:30:00Z",
        "uploadedAt": "2026-08-01T12:00:00Z"
      }
    }
  }
}
```

---

## 6.14 POST /v1/media/{mediaId}/share

**Purpose**: Generate share link.

**Authentication**: Required

**Permissions**: Media owner

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "expiresIn": "7d",
  "password": null,
  "allowDownload": true
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "share": {
      "id": "uuid",
      "url": "https://share.bondcircle.com/abc123",
      "expiresAt": "2026-08-08T12:00:00Z",
      "password": null,
      "allowDownload": true,
      "viewCount": 0,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.15 GET /v1/media/{mediaId}/shares

**Purpose**: Get media share links.

**Authentication**: Required

**Permissions**: Media owner

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "shares": [
      {
        "id": "uuid",
        "url": "https://share.bondcircle.com/abc123",
        "expiresAt": "2026-08-08T12:00:00Z",
        "viewCount": 5,
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ]
  }
}
```

---

## 6.16 DELETE /v1/media/shares/{shareId}

**Purpose**: Delete share link.

**Authentication**: Required

**Permissions**: Media owner

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Share link deleted"
  }
}
```

---

## 6.17 GET /v1/media/{mediaId}/comments

**Purpose**: Get media comments.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "content": "Great photo!",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 10
    }
  }
}
```

---

## 6.18 POST /v1/media/{mediaId}/comments

**Purpose**: Add comment to media.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "content": "Great photo!"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "displayName": "John Doe",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
      },
      "content": "Great photo!",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 6.19 DELETE /v1/media/{mediaId}/comments/{commentId}

**Purpose**: Delete comment.

**Authentication**: Required

**Permissions**: Comment author or media owner

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Comment deleted"
  }
}
```

---

## 6.20 POST /v1/media/{mediaId}/reactions

**Purpose**: React to media.

**Authentication**: Required

**Permissions**: Media owner or workspace member

**Rate Limit**: 60 requests per minute

**Request Body**:

```json
{
  "emoji": "❤️"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "reaction": {
      "emoji": "❤️",
      "count": 5,
      "users": [
        {
          "id": "uuid",
          "displayName": "John Doe"
        }
      ]
    }
  }
}
```

---

## 6.21 DELETE /v1/media/{mediaId}/reactions/{emoji}

**Purpose**: Remove reaction from media.

**Authentication**: Required

**Permissions**: Authenticated user (own reaction)

**Rate Limit**: 60 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Reaction removed"
  }
}
```

---

**END OF VOLUME 4**

---

# VOLUME 5: Timeline APIs

---

# 7. Timeline APIs

---

## 7.1 GET /v1/timelines

**Purpose**: Get user's timelines.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **workspaceId** | string | No | Filter by workspace |
| **type** | string | No | "trip", "event", "memory" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "timelines": [
      {
        "id": "uuid",
        "type": "trip",
        "title": "Summer Vacation 2026",
        "description": "Our trip to Hawaii",
        "coverImage": {
          "id": "uuid",
          "url": "https://cdn.bondcircle.com/media/uuid.webp",
          "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
        },
        "startDate": "2026-07-01",
        "endDate": "2026-07-15",
        "location": {
          "name": "Honolulu, Hawaii",
          "latitude": 21.3069,
          "longitude": -157.8583
        },
        "memoryCount": 150,
        "mediaCount": 450,
        "memberCount": 4,
        "workspace": {
          "id": "uuid",
          "name": "Travel Buddies"
        },
        "createdAt": "2026-07-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 25
    }
  }
}
```

---

## 7.2 POST /v1/timelines

**Purpose**: Create a timeline.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "workspaceId": "uuid",
  "type": "trip",
  "title": "Summer Vacation 2026",
  "description": "Our trip to Hawaii",
  "startDate": "2026-07-01",
  "endDate": "2026-07-15",
  "location": {
    "name": "Honolulu, Hawaii",
    "latitude": 21.3069,
    "longitude": -157.8583
  }
}
```

**Validation Rules**:

| Field | Rules |
|-------|-------|
| **workspaceId** | Required, valid UUID |
| **type** | Required: "trip", "event", "memory" |
| **title** | Required, 1-200 characters |
| **description** | Optional, 0-2000 characters |
| **startDate** | Required, ISO 8601 date |
| **endDate** | Optional, ISO 8601 date |
| **location** | Optional, valid location object |

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "timeline": {
      "id": "uuid",
      "type": "trip",
      "title": "Summer Vacation 2026",
      "description": "Our trip to Hawaii",
      "startDate": "2026-07-01",
      "endDate": "2026-07-15",
      "location": {
        "name": "Honolulu, Hawaii",
        "latitude": 21.3069,
        "longitude": -157.8583
      },
      "workspace": {
        "id": "uuid",
        "name": "Travel Buddies"
      },
      "memoryCount": 0,
      "mediaCount": 0,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.3 GET /v1/timelines/{timelineId}

**Purpose**: Get timeline details.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "timeline": {
      "id": "uuid",
      "type": "trip",
      "title": "Summer Vacation 2026",
      "description": "Our trip to Hawaii",
      "coverImage": {
        "id": "uuid",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
      },
      "startDate": "2026-07-01",
      "endDate": "2026-07-15",
      "location": {
        "name": "Honolulu, Hawaii",
        "latitude": 21.3069,
        "longitude": -157.8583
      },
      "memoryCount": 150,
      "mediaCount": 450,
      "memberCount": 4,
      "workspace": {
        "id": "uuid",
        "name": "Travel Buddies"
      },
      "createdAt": "2026-07-01T12:00:00Z",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.4 PATCH /v1/timelines/{timelineId}

**Purpose**: Update timeline.

**Authentication**: Required

**Permissions**: Workspace admin or owner

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "coverImageId": "uuid",
  "endDate": "2026-07-20"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "timeline": {
      "id": "uuid",
      "title": "Updated Title",
      "description": "Updated description",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.5 DELETE /v1/timelines/{timelineId}

**Purpose**: Delete timeline.

**Authentication**: Required

**Permissions**: Workspace owner only

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Timeline deleted"
  }
}
```

---

## 7.6 GET /v1/timelines/{timelineId}/memories

**Purpose**: Get timeline memories.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **date** | string | No | Filter by date (ISO 8601) |
| **type** | string | No | "photo", "video", "note", "location" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "memories": [
      {
        "id": "uuid",
        "type": "photo",
        "content": "Beautiful sunset at Waikiki",
        "media": [
          {
            "id": "uuid",
            "url": "https://cdn.bondcircle.com/media/uuid.webp",
            "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
            "type": "photo"
          }
        ],
        "location": {
          "name": "Waikiki Beach",
          "latitude": 21.2765,
          "longitude": -157.8273
        },
        "date": "2026-07-05",
        "time": "18:30:00",
        "author": {
          "id": "uuid",
          "displayName": "John Doe"
        },
        "createdAt": "2026-07-05T18:30:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 150
    }
  }
}
```

---

## 7.7 POST /v1/timelines/{timelineId}/memories

**Purpose**: Add memory to timeline.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "type": "photo",
  "content": "Beautiful sunset at Waikiki",
  "mediaIds": ["uuid1", "uuid2"],
  "location": {
    "name": "Waikiki Beach",
    "latitude": 21.2765,
    "longitude": -157.8273
  },
  "date": "2026-07-05",
  "time": "18:30:00"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "memory": {
      "id": "uuid",
      "type": "photo",
      "content": "Beautiful sunset at Waikiki",
      "media": [
        {
          "id": "uuid",
          "url": "https://cdn.bondcircle.com/media/uuid.webp",
          "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
        }
      ],
      "location": {
        "name": "Waikiki Beach",
        "latitude": 21.2765,
        "longitude": -157.8273
      },
      "date": "2026-07-05",
      "time": "18:30:00",
      "author": {
        "id": "uuid",
        "displayName": "John Doe"
      },
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.8 PATCH /v1/timelines/{timelineId}/memories/{memoryId}

**Purpose**: Update memory.

**Authentication**: Required

**Permissions**: Memory author or workspace admin

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "content": "Updated memory content",
  "date": "2026-07-06"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "memory": {
      "id": "uuid",
      "content": "Updated memory content",
      "date": "2026-07-06",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.9 DELETE /v1/timelines/{timelineId}/memories/{memoryId}

**Purpose**: Delete memory.

**Authentication**: Required

**Permissions**: Memory author or workspace admin

**Rate Limit**: 30 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Memory deleted"
  }
}
```

---

## 7.10 POST /v1/timelines/{timelineId}/memories/{memoryId}/reactions

**Purpose**: React to memory.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 60 requests per minute

**Request Body**:

```json
{
  "emoji": "❤️"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "reaction": {
      "emoji": "❤️",
      "count": 3,
      "users": [
        {
          "id": "uuid",
          "displayName": "John Doe"
        }
      ]
    }
  }
}
```

---

## 7.11 DELETE /v1/timelines/{timelineId}/memories/{memoryId}/reactions/{emoji}

**Purpose**: Remove reaction from memory.

**Authentication**: Required

**Permissions**: Authenticated user (own reaction)

**Rate Limit**: 60 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Reaction removed"
  }
}
```

---

## 7.12 GET /v1/timelines/{timelineId}/albums

**Purpose**: Get timeline albums.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "albums": [
      {
        "id": "uuid",
        "name": "Beach Day",
        "description": "Photos from our beach day",
        "coverImage": {
          "id": "uuid",
          "url": "https://cdn.bondcircle.com/media/uuid.webp",
          "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
        },
        "mediaCount": 45,
        "createdAt": "2026-07-05T12:00:00Z"
      }
    ]
  }
}
```

---

## 7.13 POST /v1/timelines/{timelineId}/albums

**Purpose**: Create album.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "name": "Beach Day",
  "description": "Photos from our beach day"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "album": {
      "id": "uuid",
      "name": "Beach Day",
      "description": "Photos from our beach day",
      "mediaCount": 0,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.14 POST /v1/timelines/{timelineId}/albums/{albumId}/media

**Purpose**: Add media to album.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "mediaIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "album": {
      "id": "uuid",
      "mediaCount": 3,
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.15 DELETE /v1/timelines/{timelineId}/albums/{albumId}

**Purpose**: Delete album.

**Authentication**: Required

**Permissions**: Album creator or workspace admin

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Album deleted"
  }
}
```

---

## 7.16 GET /v1/timelines/{timelineId}/highlights

**Purpose**: Get timeline highlights.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "highlights": [
      {
        "id": "uuid",
        "title": "Best Moment",
        "description": "The highlight of our trip",
        "media": {
          "id": "uuid",
          "url": "https://cdn.bondcircle.com/media/uuid.webp",
          "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
        },
        "date": "2026-07-10",
        "score": 95,
        "createdAt": "2026-07-10T12:00:00Z"
      }
    ]
  }
}
```

---

## 7.17 POST /v1/timelines/{timelineId}/highlights

**Purpose**: Create highlight.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "title": "Best Moment",
  "description": "The highlight of our trip",
  "mediaId": "uuid",
  "date": "2026-07-10"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "highlight": {
      "id": "uuid",
      "title": "Best Moment",
      "description": "The highlight of our trip",
      "media": {
        "id": "uuid",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
      },
      "date": "2026-07-10",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.18 DELETE /v1/timelines/{timelineId}/highlights/{highlightId}

**Purpose**: Delete highlight.

**Authentication**: Required

**Permissions**: Highlight creator or workspace admin

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Highlight deleted"
  }
}
```

---

## 7.19 POST /v1/timelines/{timelineId}/share

**Purpose**: Share timeline.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 10 requests per minute

**Request Body**:

```json
{
  "expiresIn": "30d",
  "allowComments": true
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "share": {
      "id": "uuid",
      "url": "https://share.bondcircle.com/timeline/abc123",
      "expiresAt": "2026-08-31T12:00:00Z",
      "allowComments": true,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 7.20 GET /v1/timelines/{timelineId}/stats

**Purpose**: Get timeline statistics.

**Authentication**: Required

**Permissions**: Workspace member

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalDays": 15,
      "totalMemories": 150,
      "totalMedia": 450,
      "totalPhotos": 300,
      "totalVideos": 100,
      "totalDocuments": 50,
      "locations": 25,
      "topContributor": {
        "id": "uuid",
        "displayName": "John Doe",
        "memoryCount": 75
      }
    }
  }
}
```

---

**END OF VOLUME 5**

---

# VOLUME 6: Search APIs

---

# 8. Search APIs

---

## 8.1 GET /v1/search

**Purpose**: Global search across all content.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Search query |
| **type** | string | No | "messages", "media", "friends", "timelines" |
| **workspaceId** | string | No | Filter by workspace |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "type": "message",
        "id": "uuid",
        "title": "Message from Jane Smith",
        "snippet": "Great trip yesterday!",
        "conversation": {
          "id": "uuid",
          "name": "Travel Buddies"
        },
        "createdAt": "2026-08-01T12:00:00Z"
      },
      {
        "type": "media",
        "id": "uuid",
        "title": "Photo",
        "snippet": "Beach sunset",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 50
    }
  }
}
```

---

## 8.2 GET /v1/search/messages

**Purpose**: Search messages.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Search query |
| **conversationId** | string | No | Filter by conversation |
| **workspaceId** | string | No | Filter by workspace |
| **senderId** | string | No | Filter by sender |
| **startDate** | string | No | ISO 8601 date |
| **endDate** | string | No | ISO 8601 date |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "content": "Great trip yesterday!",
        "sender": {
          "id": "uuid",
          "displayName": "Jane Smith",
          "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
        },
        "conversation": {
          "id": "uuid",
          "name": "Travel Buddies"
        },
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 25
    }
  }
}
```

---

## 8.3 GET /v1/search/media

**Purpose**: Search media.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | No | Search query |
| **type** | string | No | "photo", "video", "document" |
| **workspaceId** | string | No | Filter by workspace |
| **startDate** | string | No | ISO 8601 date |
| **endDate** | string | No | ISO 8601 date |
| **tags** | string | No | Comma-separated tags |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "uuid",
        "type": "photo",
        "url": "https://cdn.bondcircle.com/media/uuid.webp",
        "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
        "description": "Beach sunset",
        "tags": ["vacation", "beach"],
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 100
    }
  }
}
```

---

## 8.4 GET /v1/search/friends

**Purpose**: Search friends.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Search query |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "friends": [
      {
        "id": "uuid",
        "displayName": "Jane Smith",
        "username": "janesmith",
        "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp",
        "isOnline": true
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 10
    }
  }
}
```

---

## 8.5 GET /v1/search/timelines

**Purpose**: Search timelines.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Search query |
| **workspaceId** | string | No | Filter by workspace |
| **type** | string | No | "trip", "event", "memory" |
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "timelines": [
      {
        "id": "uuid",
        "type": "trip",
        "title": "Summer Vacation 2026",
        "description": "Our trip to Hawaii",
        "coverImage": {
          "id": "uuid",
          "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
        },
        "memoryCount": 150,
        "createdAt": "2026-07-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 5
    }
  }
}
```

---

## 8.6 GET /v1/search/ai

**Purpose**: AI-powered semantic search.

**Authentication**: Required

**Permissions**: Premium users only

**Rate Limit**: 10 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Natural language query |
| **context** | string | No | "memories", "conversations", "all" |
| **workspaceId** | string | No | Filter by workspace |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "type": "memory",
        "id": "uuid",
        "title": "Beach Day in Hawaii",
        "snippet": "Photos and memories from our beach day",
        "relevance": 0.95,
        "media": [
          {
            "id": "uuid",
            "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp"
          }
        ],
        "date": "2026-07-05"
      }
    ],
    "query": "beach photos from Hawaii",
    "totalResults": 25
  }
}
```

---

## 8.7 GET /v1/search/suggestions

**Purpose**: Get search suggestions.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **q** | string | Yes | Partial query |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "text": "beach photos",
        "type": "recent"
      },
      {
        "text": "Hawaii trip",
        "type": "trending"
      }
    ]
  }
}
```

---

## 8.8 GET /v1/search/recent

**Purpose**: Get recent searches.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "recent": [
      {
        "query": "beach photos",
        "searchedAt": "2026-08-01T12:00:00Z"
      }
    ]
  }
}
```

---

## 8.9 DELETE /v1/search/recent

**Purpose**: Clear recent searches.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Recent searches cleared"
  }
}
```

---

## 8.10 POST /v1/search/index

**Purpose**: Trigger reindexing (admin only).

**Authentication**: Required

**Permissions**: Admin only

**Rate Limit**: 1 request per hour

**Request Body**:

```json
{
  "type": "messages",
  "workspaceId": "uuid"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Reindexing started",
    "jobId": "uuid"
  }
}
```

---

**END OF VOLUME 6**

---

# VOLUME 7: Settings, Premium, Analytics

---

# 9. Settings APIs

---

## 9.1 GET /v1/settings/theme

**Purpose**: Get theme settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "theme": {
      "mode": "dark",
      "primaryColor": "#3B82F6",
      "accentColor": "#10B981",
      "fontScale": 1.0,
      "reduceMotion": false
    }
  }
}
```

---

## 9.2 PATCH /v1/settings/theme

**Purpose**: Update theme settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "mode": "dark",
  "primaryColor": "#3B82F6",
  "accentColor": "#10B981",
  "fontScale": 1.0,
  "reduceMotion": false
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "theme": {
      "mode": "dark",
      "primaryColor": "#3B82F6",
      "accentColor": "#10B981",
      "fontScale": 1.0,
      "reduceMotion": false,
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.3 GET /v1/settings/profile

**Purpose**: Get profile settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "username": "johndoe",
      "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp",
      "bio": "Love to travel!",
      "location": "San Francisco, CA",
      "website": "https://example.com",
      "isPublic": true,
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.4 PATCH /v1/settings/profile

**Purpose**: Update profile settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "displayName": "John Doe",
  "bio": "Updated bio",
  "location": "New York, NY",
  "website": "https://example.com",
  "isPublic": true
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "uuid",
      "displayName": "John Doe",
      "bio": "Updated bio",
      "location": "New York, NY",
      "website": "https://example.com",
      "isPublic": true,
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.5 POST /v1/settings/profile/avatar

**Purpose**: Upload avatar.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per minute

**Request Body**:

```
Content-Type: multipart/form-data

avatar: (binary data)
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "avatar": {
      "url": "https://cdn.bondcircle.com/avatars/uuid.webp",
      "thumbnailUrl": "https://cdn.bondcircle.com/thumbnails/uuid.webp",
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.6 GET /v1/settings/security

**Purpose**: Get security settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "security": {
      "twoFactorEnabled": true,
      "twoFactorMethod": "authenticator",
      "biometricEnabled": false,
      "passkeyEnabled": false,
      "lastPasswordChange": "2026-07-01T12:00:00Z",
      "activeSessions": 2
    }
  }
}
```

---

## 9.7 POST /v1/settings/security/2fa/enable

**Purpose**: Enable two-factor authentication.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "method": "authenticator",
  "code": "123456"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "twoFactor": {
      "enabled": true,
      "method": "authenticator",
      "backupCodes": ["abc123", "def456", "ghi789"]
    }
  }
}
```

---

## 9.8 POST /v1/settings/security/2fa/disable

**Purpose**: Disable two-factor authentication.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "password": "currentPassword",
  "code": "123456"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Two-factor authentication disabled"
  }
}
```

---

## 9.9 GET /v1/settings/notifications

**Purpose**: Get notification settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "notifications": {
      "push": {
        "enabled": true,
        "messages": true,
        "friendRequests": true,
        "workspaceActivity": true,
        "mentions": true
      },
      "email": {
        "enabled": true,
        "weeklyDigest": true,
        "marketing": false
      }
    }
  }
}
```

---

## 9.10 PATCH /v1/settings/notifications

**Purpose**: Update notification settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "push": {
    "enabled": true,
    "messages": true,
    "friendRequests": true,
    "workspaceActivity": false,
    "mentions": true
  },
  "email": {
    "enabled": true,
    "weeklyDigest": true,
    "marketing": false
  }
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "notifications": {
      "push": {
        "enabled": true,
        "messages": true,
        "friendRequests": true,
        "workspaceActivity": false,
        "mentions": true
      },
      "email": {
        "enabled": true,
        "weeklyDigest": true,
        "marketing": false
      },
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.11 GET /v1/settings/privacy

**Purpose**: Get privacy settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "privacy": {
      "profileVisibility": "friends",
      "showOnlineStatus": true,
      "showReadReceipts": true,
      "allowFriendRequests": true,
      "showInSearch": true,
      "dataSharing": {
        "analytics": true,
        "personalization": true
      }
    }
  }
}
```

---

## 9.12 PATCH /v1/settings/privacy

**Purpose**: Update privacy settings.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 30 requests per minute

**Request Body**:

```json
{
  "profileVisibility": "friends",
  "showOnlineStatus": true,
  "showReadReceipts": true,
  "allowFriendRequests": true,
  "showInSearch": true,
  "dataSharing": {
    "analytics": true,
    "personalization": true
  }
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "privacy": {
      "profileVisibility": "friends",
      "showOnlineStatus": true,
      "showReadReceipts": true,
      "allowFriendRequests": true,
      "showInSearch": true,
      "dataSharing": {
        "analytics": true,
        "personalization": true
      },
      "updatedAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.13 POST /v1/settings/backup

**Purpose**: Create backup.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 1 request per day

**Request Body**:

```json
{
  "includeMedia": true,
  "includeMessages": true,
  "includeSettings": true
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "backup": {
      "id": "uuid",
      "status": "processing",
      "includeMedia": true,
      "includeMessages": true,
      "includeSettings": true,
      "createdAt": "2026-08-01T12:00:00Z",
      "estimatedCompletion": "2026-08-01T13:00:00Z"
    }
  }
}
```

---

## 9.14 GET /v1/settings/backup

**Purpose**: Get backup status.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "backups": [
      {
        "id": "uuid",
        "status": "completed",
        "size": 1024000000,
        "downloadUrl": "https://cdn.bondcircle.com/backups/uuid.zip",
        "expiresAt": "2026-08-15T12:00:00Z",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ]
  }
}
```

---

## 9.15 POST /v1/settings/backup/restore

**Purpose**: Restore from backup.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 1 request per day

**Request Body**:

```json
{
  "backupId": "uuid",
  "restoreMedia": true,
  "restoreMessages": true,
  "restoreSettings": true
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "restore": {
      "id": "uuid",
      "status": "processing",
      "createdAt": "2026-08-01T12:00:00Z"
    }
  }
}
```

---

## 9.16 DELETE /v1/settings/account

**Purpose**: Delete account.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 1 request per month

**Request Body**:

```json
{
  "password": "currentPassword",
  "reason": "No longer using the app"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Account scheduled for deletion",
    "deletionDate": "2026-08-31T12:00:00Z"
  }
}
```

---

# 10. Premium APIs

---

## 10.1 GET /v1/premium/plans

**Purpose**: Get available plans.

**Authentication**: Not required

**Permissions**: None

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "free",
        "name": "Free",
        "price": 0,
        "currency": "USD",
        "interval": "month",
        "features": [
          "5 workspaces",
          "1GB storage",
          "Basic search"
        ]
      },
      {
        "id": "premium",
        "name": "Premium",
        "price": 9.99,
        "currency": "USD",
        "interval": "month",
        "features": [
          "Unlimited workspaces",
          "100GB storage",
          "AI search",
          "Priority support"
        ]
      }
    ]
  }
}
```

---

## 10.2 GET /v1/premium/subscription

**Purpose**: Get current subscription.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": "premium",
      "status": "active",
      "currentPeriodStart": "2026-08-01",
      "currentPeriodEnd": "2026-09-01",
      "cancelAt": null,
      "paymentMethod": {
        "type": "card",
        "last4": "4242",
        "brand": "visa"
      }
    }
  }
}
```

---

## 10.3 POST /v1/premium/subscribe

**Purpose**: Subscribe to a plan.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "planId": "premium",
  "paymentMethodId": "pm_abc123"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": "premium",
      "status": "active",
      "currentPeriodStart": "2026-08-01",
      "currentPeriodEnd": "2026-09-01"
    }
  }
}
```

---

## 10.4 PATCH /v1/premium/subscription

**Purpose**: Update subscription.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "planId": "premium-annual"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": "premium-annual",
      "status": "active",
      "currentPeriodStart": "2026-08-01",
      "currentPeriodEnd": "2027-08-01"
    }
  }
}
```

---

## 10.5 DELETE /v1/premium/subscription

**Purpose**: Cancel subscription.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "reason": "Too expensive"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "status": "cancelled",
      "cancelAt": "2026-09-01",
      "endsAt": "2026-09-01"
    }
  }
}
```

---

## 10.6 POST /v1/premium/payment-methods

**Purpose**: Add payment method.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "token": "pm_abc123"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "data": {
    "paymentMethod": {
      "id": "uuid",
      "type": "card",
      "last4": "4242",
      "brand": "visa",
      "expMonth": 12,
      "expYear": 2028,
      "isDefault": true
    }
  }
}
```

---

## 10.7 GET /v1/premium/payment-methods

**Purpose**: Get payment methods.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "uuid",
        "type": "card",
        "last4": "4242",
        "brand": "visa",
        "expMonth": 12,
        "expYear": 2028,
        "isDefault": true
      }
    ]
  }
}
```

---

## 10.8 DELETE /v1/premium/payment-methods/{paymentMethodId}

**Purpose**: Remove payment method.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "message": "Payment method removed"
  }
}
```

---

## 10.9 GET /v1/premium/invoices

**Purpose**: Get invoices.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **cursor** | string | No | Cursor for pagination |
| **limit** | integer | No | Items per page (default: 20, max: 50) |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "invoices": [
      {
        "id": "uuid",
        "amount": 9.99,
        "currency": "USD",
        "status": "paid",
        "description": "Premium Subscription",
        "invoiceUrl": "https://cdn.bondcircle.com/invoices/uuid.pdf",
        "createdAt": "2026-08-01T12:00:00Z"
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "cursor-string",
      "totalCount": 12
    }
  }
}
```

---

## 10.10 POST /v1/premium/restore

**Purpose**: Restore purchase (iOS/Android).

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 10 requests per hour

**Request Body**:

```json
{
  "platform": "ios",
  "receipt": "base64-encoded-receipt"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": "premium",
      "status": "active",
      "currentPeriodEnd": "2026-09-01"
    },
    "restored": true
  }
}
```

---

## 10.11 GET /v1/premium/features

**Purpose**: Get feature flags.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "features": {
      "aiSearch": true,
      "unlimitedWorkspaces": true,
      "advancedAnalytics": true,
      "prioritySupport": true,
      "customThemes": true,
      "exportData": true
    }
  }
}
```

---

# 11. Analytics APIs

---

## 11.1 GET /v1/analytics/usage

**Purpose**: Get usage statistics.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **period** | string | No | "7d", "30d", "90d" (default: "30d") |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "usage": {
      "period": "30d",
      "messages": {
        "sent": 1500,
        "received": 1200
      },
      "media": {
        "uploaded": 100,
        "storageUsed": 512000000
      },
      "workspaces": {
        "active": 5,
        "created": 2
      },
      "timeline": {
        "memories": 50,
        "trips": 3
      }
    }
  }
}
```

---

## 11.2 GET /v1/analytics/growth

**Purpose**: Get growth metrics.

**Authentication**: Required

**Permissions**: Admin only

**Rate Limit**: 100 requests per minute

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **period** | string | No | "7d", "30d", "90d" (default: "30d") |

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "growth": {
      "period": "30d",
      "newUsers": 1000,
      "activeUsers": 5000,
      "retention": 0.75,
      "churnRate": 0.05
    }
  }
}
```

---

## 11.3 POST /v1/analytics/events

**Purpose**: Track custom event.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Request Body**:

```json
{
  "event": "memory_created",
  "properties": {
    "type": "photo",
    "workspaceId": "uuid"
  }
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "tracked": true
  }
}
```

---

## 11.4 GET /v1/analytics/diagnostics

**Purpose**: Get app diagnostics.

**Authentication**: Required

**Permissions**: Authenticated user

**Rate Limit**: 100 requests per minute

**Success Response (200 OK)**:

```json
{
  "success": true,
  "data": {
    "diagnostics": {
      "appVersion": "1.0.0",
      "osVersion": "iOS 17.0",
      "deviceModel": "iPhone 15 Pro",
      "networkType": "wifi",
      "batteryLevel": 0.85,
      "storageAvailable": 102400000000
    }
  }
}
```

---

**END OF VOLUME 7**

---

# VOLUME 8: Security, Versioning, Validation

---

# 12. Validation Standards

---

## 12.1 Request Validation

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Validate early** | Validate at API gateway |
| **Validate often** | Validate at service layer |
| **Fail fast** | Return errors immediately |
| **Be specific** | Provide detailed error messages |

**Validation Types**:

| Type | Description | Example |
|------|-------------|---------|
| **Required** | Field must be present | `"email": required` |
| **Type** | Field must be correct type | `"age": integer` |
| **Format** | Field must match format | `"email": email` |
| **Length** | Field must be within length | `"name": 1-100` |
| **Range** | Field must be within range | `"age": 0-150` |
| **Pattern** | Field must match pattern | `"username": alphanumeric` |
| **Enum** | Field must be in list | `"status": active/inactive` |

---

## 12.2 Response Validation

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Consistent format** | All responses use same format |
| **Type safety** | Response types match schema |
| **No leakage** | Don't expose internal details |
| **Versioned** | Response format tied to version |

**Standard Response Format**:

```json
{
  "success": true,
  "data": { },
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-08-01T12:00:00Z"
  }
}
```

---

## 12.3 Input Sanitization

**Rules**:

| Input | Sanitization |
|-------|--------------|
| **HTML** | Strip all HTML tags |
| **SQL** | Use parameterized queries |
| **XSS** | Escape special characters |
| **Paths** | Prevent directory traversal |
| **Email** | Normalize to lowercase |

---

## 12.4 File Validation

**Rules**:

| File Type | Max Size | Allowed Formats |
|-----------|----------|-----------------|
| **Photo** | 20MB | jpg, jpeg, png, webp, heic |
| **Video** | 500MB | mp4, mov, quicktime |
| **Document** | 50MB | pdf, doc, docx, txt |
| **Avatar** | 5MB | jpg, jpeg, png, webp |

**Validation Checks**:

| Check | Description |
|-------|-------------|
| **MIME type** | Verify file MIME type |
| **Extension** | Verify file extension |
| **Magic bytes** | Verify file signature |
| **Dimensions** | Verify image dimensions |
| **Duration** | Verify video/audio duration |

---

# 13. Error Standards

---

## 13.1 HTTP Status Codes

| Code | Description | When to Use |
|------|-------------|-------------|
| **200** | OK | Successful GET, PATCH |
| **201** | Created | Successful POST |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid input |
| **401** | Unauthorized | Missing or invalid auth |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource not found |
| **409** | Conflict | Resource already exists |
| **422** | Unprocessable Entity | Validation error |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server error |
| **503** | Service Unavailable | Service down |

---

## 13.2 Business Errors

| Code | Description | HTTP Status |
|------|-------------|-------------|
| **EMAIL_EXISTS** | Email already registered | 409 |
| **USERNAME_EXISTS** | Username already taken | 409 |
| **INVALID_CREDENTIALS** | Wrong email or password | 401 |
| **ACCOUNT_DISABLED** | Account is disabled | 403 |
| **ALREADY_FRIENDS** | Already friends | 409 |
| **INVITE_PENDING** | Invite already pending | 409 |
| **SELF_INVITE** | Cannot invite yourself | 409 |
| **NOT_FRIENDS** | Not friends | 403 |
| **ALREADY_MEMBER** | Already workspace member | 409 |
| **NOT_MEMBER** | Not workspace member | 403 |
| **OWNER_CANNOT_LEAVE** | Owner cannot leave workspace | 403 |
| **CANNOT_DELETE_OWNER** | Cannot remove owner | 403 |
| **STORAGE_EXCEEDED** | Storage limit exceeded | 403 |
| **PREMIUM_REQUIRED** | Premium feature required | 403 |

---

## 13.3 Validation Errors

**Format**:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "code": "INVALID_FORMAT"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters",
        "code": "MIN_LENGTH"
      }
    ]
  }
}
```

---

## 13.4 Security Errors

| Code | Description | HTTP Status |
|------|-------------|-------------|
| **INVALID_TOKEN** | Invalid or expired token | 401 |
| **TOKEN_REVOKED** | Token has been revoked | 401 |
| **INSUFFICIENT_PERMISSIONS** | Not enough permissions | 403 |
| **RATE_LIMITED** | Too many requests | 429 |
| **INVALID_API_KEY** | Invalid API key | 401 |
| **IP_BLOCKED** | IP address blocked | 403 |
| **CSRF_TOKEN_INVALID** | Invalid CSRF token | 403 |

---

# 14. Pagination Standards

---

## 14.1 Cursor Pagination

**Recommended for**: Infinite scroll, real-time feeds

**Request**:

```
GET /v1/messages?limit=20&cursor=abc123
```

**Response**:

```json
{
  "success": true,
  "data": {
    "messages": [],
    "pagination": {
      "hasMore": true,
      "nextCursor": "def456",
      "previousCursor": "abc123",
      "totalCount": 150
    }
  }
}
```

**Rules**:

| Rule | Description |
|------|-------------|
| **Opaque cursors** | Cursors are opaque strings |
| **Stable ordering** | Same cursor returns same results |
| **No offset** | Don't use offset with cursors |
| **Time-based** | Use timestamp-based cursors for time-series data |

---

## 14.2 Offset Pagination

**Recommended for**: Admin panels, traditional pagination

**Request**:

```
GET /v1/users?page=2&limit=20
```

**Response**:

```json
{
  "success": true,
  "data": {
    "users": [],
    "pagination": {
      "page": 2,
      "limit": 20,
      "totalCount": 100,
      "totalPages": 5
    }
  }
}
```

---

## 14.3 Infinite Scroll

**Implementation**:

| Step | Description |
|------|-------------|
| **Initial load** | Fetch first page |
| **Scroll trigger** | Load more when near bottom |
| **Cursor update** | Use nextCursor for next page |
| **Loading state** | Show loading indicator |
| **Empty state** | Show "No more items" |

---

# 15. Filtering Standards

---

## 15.1 Sorting

**Format**:

```
GET /v1/messages?sort=createdAt&order=desc
```

**Parameters**:

| Parameter | Values | Default |
|-----------|--------|---------|
| **sort** | Field name | createdAt |
| **order** | asc, desc | desc |

---

## 15.2 Search

**Format**:

```
GET /v1/messages?q=search+term
```

**Rules**:

| Rule | Description |
|------|-------------|
| **Full-text** | Support full-text search |
| **Fuzzy** | Allow fuzzy matching |
| **Highlight** | Highlight matches in results |
| **Suggestions** | Provide search suggestions |

---

## 15.3 Date Filters

**Format**:

```
GET /v1/media?startDate=2026-07-01&endDate=2026-07-31
```

**Parameters**:

| Parameter | Format | Description |
|-----------|--------|-------------|
| **startDate** | ISO 8601 | Start date |
| **endDate** | ISO 8601 | End date |
| **date** | ISO 8601 | Exact date |

---

## 15.4 Media Filters

**Format**:

```
GET /v1/media?type=photo&workspaceId=uuid
```

**Parameters**:

| Parameter | Values | Description |
|-----------|--------|-------------|
| **type** | photo, video, document | Media type |
| **workspaceId** | uuid | Workspace filter |
| **tags** | comma-separated | Tag filter |

---

# 16. API Security

---

## 16.1 JWT

**Structure**:

| Part | Content |
|------|---------|
| **Header** | Algorithm, token type |
| **Payload** | User ID, expiration, claims |
| **Signature** | HMAC-SHA256 |

**Token Types**:

| Type | Lifetime | Purpose |
|------|----------|---------|
| **Access** | 15 minutes | API access |
| **Refresh** | 30 days | Token refresh |
| **Reset** | 1 hour | Password reset |
| **Verify** | 24 hours | Email verification |

---

## 16.2 Permissions

**Hierarchy**:

| Level | Description |
|-------|-------------|
| **Admin** | Full system access |
| **Owner** | Full workspace access |
| **Admin** | Workspace management |
| **Member** | Basic workspace access |
| **Guest** | Limited access |

**Permission Matrix**:

| Action | Owner | Admin | Member | Guest |
|--------|-------|-------|--------|-------|
| Create workspace | ✓ | ✓ | ✗ | ✗ |
| Delete workspace | ✓ | ✗ | ✗ | ✗ |
| Manage members | ✓ | ✓ | ✗ | ✗ |
| Post messages | ✓ | ✓ | ✓ | ✗ |
| Upload media | ✓ | ✓ | ✓ | ✗ |
| View content | ✓ | ✓ | ✓ | ✓ |

---

## 16.3 Rate Limiting

**Limits**:

| Endpoint | Limit | Window |
|----------|-------|--------|
| **Auth** | 5 requests | 15 minutes |
| **Register** | 3 requests | 1 hour |
| **Search** | 30 requests | 1 minute |
| **Upload** | 30 requests | 1 minute |
| **Messages** | 60 requests | 1 minute |
| **General** | 100 requests | 1 minute |

**Headers**:

| Header | Description |
|--------|-------------|
| **X-RateLimit-Limit** | Maximum requests |
| **X-RateLimit-Remaining** | Remaining requests |
| **X-RateLimit-Reset** | Reset timestamp |

---

## 16.4 CSRF

**Implementation**:

| Step | Description |
|------|-------------|
| **Token generation** | Generate CSRF token |
| **Token storage** | Store in cookie |
| **Token validation** | Validate on each request |
| **Token rotation** | Rotate periodically |

---

## 16.5 Replay Protection

**Implementation**:

| Step | Description |
|------|-------------|
| **Nonce** | Include unique nonce |
| **Timestamp** | Include timestamp |
| **Validation** | Validate nonce + timestamp |
| **Rejection** | Reject duplicate requests |

---

# 17. API Versioning

---

## 17.1 Versioning Strategy

**Format**: URL-based versioning

```
https://api.bondcircle.com/v1/{resource}
https://api.bondcircle.com/v2/{resource}
```

---

## 17.2 Version Lifecycle

| Phase | Duration | Action |
|-------|----------|--------|
| **Active** | Ongoing | Supported |
| **Deprecated** | 6 months | Warning header |
| **Sunset** | After deprecation | Removed |

---

## 17.3 Deprecation Headers

| Header | Description |
|--------|-------------|
| **Deprecation** | Deprecation date |
| **Sunset** | Sunset date |
| **Link** | Migration guide |

---

## 17.4 Migration Guide

**Steps**:

| Step | Description |
|------|-------------|
| **1** | Review API changes |
| **2** | Update client code |
| **3** | Test in staging |
| **4** | Deploy to production |
| **5** | Monitor for errors |

---

# 18. Complete API Inventory

---

## 18.1 Endpoint Summary

| Category | Endpoints | Authentication |
|----------|-----------|----------------|
| **Auth** | 15 | Optional/Required |
| **Friends** | 13 | Required |
| **Workspaces** | 14 | Required |
| **Chat** | 23 | Required |
| **Media** | 21 | Required |
| **Timeline** | 20 | Required |
| **Search** | 10 | Required |
| **Settings** | 16 | Required |
| **Premium** | 11 | Required |
| **Analytics** | 4 | Required |
| **Total** | 147 | - |

---

## 18.2 Authentication Matrix

| Endpoint | Auth Required | Token Type |
|----------|---------------|------------|
| POST /v1/auth/register | No | - |
| POST /v1/auth/login | No | - |
| POST /v1/auth/logout | Yes | Access |
| POST /v1/auth/refresh | No | Refresh |
| POST /v1/auth/forgot-password | No | - |
| POST /v1/auth/reset-password | No | - |
| POST /v1/auth/verify-email | No | - |
| POST /v1/auth/resend-verification | Yes | Access |
| POST /v1/auth/oauth/apple | No | - |
| POST /v1/auth/oauth/google | No | - |
| POST /v1/auth/biometric/register | Yes | Access |
| POST /v1/auth/biometric/login | No | - |
| GET /v1/auth/sessions | Yes | Access |
| DELETE /v1/auth/sessions/{sessionId} | Yes | Access |
| DELETE /v1/auth/sessions | Yes | Access |

---

## 18.3 Permissions Matrix

| Action | Auth | Friends | Workspace | Chat | Media | Timeline |
|--------|------|---------|-----------|------|-------|----------|
| **Create** | User | Owner/Admin | Member | Member | Owner | Member |
| **Read** | User | Member | Member | Member | Owner | Member |
| **Update** | User | Owner/Admin | Admin | Sender | Owner | Admin |
| **Delete** | User | Owner/Admin | Owner | Sender/Admin | Owner | Admin |

---

## 18.4 Validation Matrix

| Field | Type | Required | Format | Length |
|-------|------|----------|--------|--------|
| **email** | string | Yes | email | max 255 |
| **password** | string | Yes | - | min 8 |
| **username** | string | Yes | alphanumeric | 3-50 |
| **displayName** | string | Yes | - | 1-100 |
| **bio** | string | No | - | max 500 |
| **content** | string | Yes | - | max 10000 |
| **emoji** | string | Yes | emoji | 1-2 |

---

## 18.5 Error Matrix

| Code | HTTP Status | Category |
|------|-------------|----------|
| **VALIDATION_ERROR** | 400 | Validation |
| **INVALID_CREDENTIALS** | 401 | Auth |
| **TOKEN_EXPIRED** | 401 | Auth |
| **FORBIDDEN** | 403 | Auth |
| **NOT_FOUND** | 404 | Resource |
| **CONFLICT** | 409 | Business |
| **RATE_LIMITED** | 429 | Security |
| **SERVER_ERROR** | 500 | System |

---

## 18.6 Pagination Matrix

| Resource | Default Limit | Max Limit | Strategy |
|----------|---------------|-----------|----------|
| **Users** | 20 | 50 | Cursor |
| **Messages** | 50 | 100 | Cursor |
| **Media** | 20 | 50 | Cursor |
| **Timelines** | 20 | 50 | Cursor |
| **Search** | 20 | 50 | Cursor |

---

## 18.7 Future API Roadmap

| Version | Features | Timeline |
|---------|----------|----------|
| **v1.1** | Enhanced search, batch operations | Q4 2026 |
| **v1.2** | Real-time subscriptions, webhooks | Q1 2027 |
| **v2.0** | GraphQL support, API keys | Q2 2027 |
| **v2.1** | Marketplace APIs | Q3 2027 |
| **v2.2** | Organizations APIs | Q4 2027 |

---

## 18.8 API Readiness Score

| Category | Score | Status |
|----------|-------|--------|
| **Authentication** | 100% | Complete |
| **Friends** | 100% | Complete |
| **Workspaces** | 100% | Complete |
| **Chat** | 100% | Complete |
| **Media** | 100% | Complete |
| **Timeline** | 100% | Complete |
| **Search** | 100% | Complete |
| **Settings** | 100% | Complete |
| **Premium** | 100% | Complete |
| **Analytics** | 100% | Complete |
| **Security** | 100% | Complete |
| **Versioning** | 100% | Complete |
| **Total** | 100% | Complete |

---

# 19. Recommended Next Book

**Book 12 — Real-Time Architecture Blueprint**

This book defines:
- WebSocket architecture
- Real-time subscriptions
- Event system
- Push notifications
- Online presence
- Typing indicators

---

**END OF BOOK 11: API BLUEPRINT v1.0**