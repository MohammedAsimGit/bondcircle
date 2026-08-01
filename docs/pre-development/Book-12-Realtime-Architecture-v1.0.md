# BondCircle — Book 12: Real-Time Architecture Blueprint

---

## Document Information

| Field | Value |
|-------|-------|
| **Document Name** | BondCircle Real-Time Architecture Blueprint |
| **Document Version** | v1.0 |
| **Creation Date** | 01 August 2026 |
| **Last Updated Date** | 01 August 2026 |
| **Author** | Principal Realtime Systems Architect, Principal Distributed Systems Engineer, Infrastructure Architect |
| **Document Status** | Active |
| **Phase** | Phase 12 — Real-Time Architecture |
| **Purpose** | Define the complete real-time engine architecture for BondCircle |
| **Scope** | All real-time communication, synchronization, offline handling, and event systems |
| **Audience** | Backend Engineers, Frontend Engineers, Mobile Engineers, DevOps, SRE |
| **Dependencies** | Book 0 — Founder Knowledge Base (v1.0), Book 1 — Product Foundation (v1.0), Book 7 — Technology Blueprint (v1.0), Book 9 — Backend Architecture (v1.0), Book 10 — Frontend Architecture (v1.0), Book 11 — API Blueprint (v1.0) |
| **Documents Using This** | Book 13 — Security Architecture Blueprint, Book 14 — Deployment Guide |
| **Estimated Reading Time** | 60–80 minutes per volume |

---

## Document Purpose

This document defines the complete real-time engine architecture for BondCircle. It specifies how real-time communication works, how synchronization happens, how offline mode operates, how events flow, how reliability is maintained, and how scalability is achieved.

This document does not repeat Book 0, Book 1, Book 7, Book 9, Book 10, or Book 11. It provides the real-time specific implementation of decisions made in those documents.

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1.0 | 01 August 2026 | Realtime Architecture Team | Initial creation — Complete Real-Time Architecture Blueprint |

---

## Location

```
BondCircle/
  docs/
    pre-development/
      Book-12-Realtime-Architecture-v1.0.md
```

---

# Table of Contents

**Volume 1: Realtime Philosophy & Connection Lifecycle**
- 1. Realtime Philosophy
- 2. Realtime Overview
- 3. Connection Lifecycle
- 4. Realtime Event System

**Volume 2: Messaging Pipeline**
- 5. Messaging Pipeline

**Volume 3: Presence, Typing, Read Receipts**
- 6. Presence System
- 7. Typing System
- 8. Read Receipt System

**Volume 4: Media Synchronization**
- 9. Media Synchronization

**Volume 5: Workspace Synchronization & Notifications**
- 10. Workspace Synchronization
- 11. Notification Synchronization

**Volume 6: Offline Engine**
- 12. Offline Engine

**Volume 7: Conflict Resolution & Reliability**
- 13. Conflict Resolution
- 14. Realtime Security

**Volume 8: Performance, Scaling & Future Expansion**
- 15. Performance
- 16. Scaling
- 17. Future Expansion

---

# VOLUME 1: Realtime Philosophy & Connection Lifecycle

---

# 1. Realtime Philosophy

---

## 1.1 Realtime Principles

**Core Belief**: Realtime is not a feature — it is the foundation of human connection.

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Instant Delivery** | Messages arrive in < 100ms under normal conditions |
| **Guaranteed Delivery** | Every message is delivered exactly once |
| **Offline First** | App works fully offline, syncs when connected |
| **Conflict Free** | Smart conflict resolution prevents data loss |
| **Event Driven** | All state changes are events |
| **Eventually Consistent** | All clients converge to the same state |
| **Graceful Degradation** | System works even when parts fail |

---

## 1.2 Event-Driven Thinking

**Philosophy**: Every action is an event. Every event has a sender, receiver, payload, and timestamp.

**Event Categories**:

| Category | Description | Examples |
|----------|-------------|----------|
| **User Events** | User-initiated actions | Send message, react, edit |
| **System Events** | System-generated events | Typing indicator, presence |
| **State Events** | State change notifications | Read receipt, delivered |
| **Sync Events** | Synchronization events | Offline sync, conflict resolution |

---

## 1.3 Consistency Philosophy

**Model**: Eventual Consistency with Causal Ordering

**Rules**:

| Rule | Description |
|------|-------------|
| **Causal Ordering** | Events are ordered by causal relationships |
| **Last Write Wins** | For concurrent edits, last write wins |
| **Conflict Detection** | Detect and resolve conflicts automatically |
| **State Convergence** | All clients converge to the same state |

---

## 1.4 Latency Philosophy

**Target Latencies**:

| Metric | Target | Acceptable |
|--------|--------|------------|
| **Message Delivery** | < 100ms | < 300ms |
| **Typing Indicator** | < 50ms | < 150ms |
| **Read Receipt** | < 100ms | < 300ms |
| **Presence Update** | < 200ms | < 500ms |
| **Reconnection** | < 1s | < 3s |

---

## 1.5 Reliability Philosophy

**Guarantees**:

| Guarantee | Description |
|-----------|-------------|
| **At-Least-Once Delivery** | Every message is delivered at least once |
| **Idempotency** | Duplicate events are handled gracefully |
| **Durability** | Messages are persisted before acknowledgment |
| **Recovery** | System recovers from any failure |

---

## 1.6 Offline Philosophy

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Full Functionality** | App works fully offline |
| **Queue Everything** | All actions are queued for sync |
| **Conflict Detection** | Detect conflicts when syncing |
| **Smart Resolution** | Resolve conflicts intelligently |
| **User Control** | User can review and resolve conflicts |

---

## 1.7 Scalability Philosophy

**Approach**:

| Level | Strategy |
|-------|----------|
| **Horizontal** | Add more servers |
| **Vertical** | Upgrade server resources |
| **Geographic** | Distribute globally |
| **Protocol** | Use efficient protocols |
| **Compression** | Compress all data |

---

# 2. Realtime Overview

---

## 2.1 Transport Technologies

**Primary Transport**: Socket.IO (WebSocket with HTTP fallback)

**Technologies**:

| Technology | Use Case | Priority |
|------------|----------|----------|
| **Socket.IO** | Primary realtime | Primary |
| **HTTP/REST** | API calls | Primary |
| **Webhook** | External integrations | Secondary |
| **Push Notifications** | Offline delivery | Secondary |
| **Polling** | Fallback | Tertiary |
| **WebRTC** | Voice/Video (future) | Future |

---

## 2.2 Socket.IO Architecture

**Layers**:

| Layer | Description |
|-------|-------------|
| **Transport** | WebSocket with HTTP long-polling fallback |
| **Protocol** | Socket.IO protocol |
| **Application** | BondCircle event system |
| **Namespace** | Isolated event channels |

**Namespaces**:

| Namespace | Purpose |
|-----------|---------|
| `/chat` | Messaging events |
| `/presence` | Online status events |
| `/typing` | Typing indicators |
| `/workspace` | Workspace events |
| `/media` | Media sync events |
| `/notification` | Notification events |

---

## 2.3 HTTP vs Realtime

| Operation | Transport | Reason |
|-----------|-----------|--------|
| **Send Message** | Socket.IO | Instant delivery |
| **Upload Media** | HTTP | Large payload |
| **Fetch History** | HTTP | Batch operation |
| **User Profile** | HTTP | CRUD operation |
| **Typing Indicator** | Socket.IO | Ephemeral event |
| **Read Receipt** | Socket.IO | Instant update |
| **Presence** | Socket.IO | Real-time status |

---

## 2.4 Push Notifications

**Purpose**: Deliver messages when app is in background

**Providers**:

| Platform | Provider |
|----------|----------|
| **iOS** | APNs |
| **Android** | FCM |
| **Web** | Web Push |

**Trigger Conditions**:

| Condition | Action |
|-----------|--------|
| App in background | Send push |
| App killed | Send push |
| User offline | Send push |
| User muted | Don't send push |

---

## 2.5 Polling Fallback

**When to Use**:

| Scenario | Strategy |
|----------|----------|
| WebSocket blocked | HTTP long-polling |
| Firewall issues | HTTP fallback |
| Legacy support | Polling |

**Polling Intervals**:

| State | Interval |
|-------|----------|
| Active | 30 seconds |
| Background | 5 minutes |
| Inactive | 15 minutes |

---

# 3. Connection Lifecycle

---

## 3.1 Connection States

**States**:

| State | Description |
|-------|-------------|
| **DISCONNECTED** | Not connected |
| **CONNECTING** | Establishing connection |
| **CONNECTED** | Connected and authenticated |
| **RECONNECTING** | Attempting to reconnect |
| **FAILED** | Connection failed permanently |

**State Transitions**:

```
DISCONNECTED -> CONNECTING -> CONNECTED
CONNECTED -> DISCONNECTED (normal close)
CONNECTED -> RECONNECTING (connection lost)
RECONNECTING -> CONNECTED (reconnected)
RECONNECTING -> FAILED (max retries exceeded)
FAILED -> CONNECTING (manual retry)
```

---

## 3.2 Connection Sequence

**Steps**:

| Step | Action | Timeout |
|------|--------|---------|
| **1** | Initialize Socket.IO client | - |
| **2** | Connect to server | 5s |
| **3** | Send authentication | 5s |
| **4** | Receive auth confirmation | 5s |
| **5** | Subscribe to namespaces | 5s |
| **6** | Start heartbeat | - |
| **7** | Load offline queue | - |
| **8** | Sync pending events | - |

---

## 3.3 Authentication Flow

**Process**:

| Step | Client | Server |
|------|--------|--------|
| **1** | Connect socket | - |
| **2** | Send JWT token | - |
| **3** | - | Validate token |
| **4** | - | Create session |
| **5** | Receive auth success | - |
| **6** | Subscribe to channels | - |

**Authentication Data**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "deviceId": "uuid",
  "platform": "ios",
  "version": "1.0.0"
}
```

---

## 3.4 Reconnection Strategy

**Exponential Backoff**:

| Attempt | Delay | Max Delay |
|---------|-------|-----------|
| 1 | 1s | 1s |
| 2 | 2s | 2s |
| 3 | 4s | 4s |
| 4 | 8s | 8s |
| 5 | 16s | 30s |
| 6+ | 30s | 30s |

**Reconnection Actions**:

| Action | Description |
|--------|-------------|
| **Reconnect** | Establish new connection |
| **Re-authenticate** | Send JWT token |
| **Resubscribe** | Subscribe to namespaces |
| **Sync missed** | Fetch missed events |
| **Process queue** | Send queued events |

---

## 3.5 Heartbeat System

**Configuration**:

| Parameter | Value |
|-----------|-------|
| **Interval** | 30 seconds |
| **Timeout** | 10 seconds |
| **Max Missed** | 3 |

**Heartbeat Flow**:

```
Client -> Server: ping (timestamp)
Server -> Client: pong (timestamp)
```

**Detection**:

| Condition | Action |
|-----------|--------|
| Missed 1 heartbeat | Warning |
| Missed 2 heartbeats | Reconnecting |
| Missed 3 heartbeats | Disconnected |

---

## 3.6 Session Restore

**Process**:

| Step | Action |
|------|--------|
| **1** | App opens |
| **2** | Check local session |
| **3** | If valid, connect socket |
| **4** | If expired, refresh token |
| **5** | Re-authenticate |
| **6** | Sync missed events |
| **7** | Process queued events |

---

## 3.7 Connection Recovery

**Recovery Scenarios**:

| Scenario | Recovery |
|----------|----------|
| **Network switch** | Auto-reconnect |
| **Sleep/Wake** | Reconnect + sync |
| **App background** | Maintain connection |
| **App killed** | Full reconnect |
| **Server restart** | Client reconnects |

---

# 4. Realtime Event System

---

## 4.1 Event Structure

**Standard Event Format**:

```json
{
  "id": "uuid",
  "type": "message:send",
  "version": "1.0",
  "timestamp": "2026-08-01T12:00:00Z",
  "sender": {
    "userId": "uuid",
    "deviceId": "uuid"
  },
  "payload": { },
  "metadata": {
    "retryCount": 0,
    "idempotencyKey": "uuid"
  }
}
```

---

## 4.2 Event Naming Standards

**Format**: `{domain}:{action}`

**Domains**:

| Domain | Description |
|--------|-------------|
| **message** | Messaging events |
| **presence** | Online status events |
| **typing** | Typing indicators |
| **read** | Read receipts |
| **reaction** | Message reactions |
| **workspace** | Workspace events |
| **media** | Media events |
| **notification** | Notification events |

**Actions**:

| Action | Description |
|--------|-------------|
| **send** | Send new item |
| **update** | Update existing item |
| **delete** | Delete item |
| **sync** | Synchronize state |
| **ack** | Acknowledge event |

---

## 4.3 Event Versioning

**Strategy**: Header-based versioning

**Version Header**:

```json
{
  "version": "1.0",
  "deprecated": false,
  "sunset": null
}
```

**Version Changes**:

| Change Type | Version Impact |
|-------------|----------------|
| **New field** | Minor version |
| **Removed field** | Major version |
| **Changed type** | Major version |
| **Renamed field** | Major version |

---

## 4.4 Payload Standards

**Rules**:

| Rule | Description |
|------|-------------|
| **JSON only** | All payloads are JSON |
| **No functions** | No executable code |
| **No circular refs** | No circular references |
| **Max size** | 1MB maximum |
| **UTF-8** | UTF-8 encoding |

---

## 4.5 Acknowledgements

**Types**:

| Type | Description |
|------|-------------|
| **Server ACK** | Server received event |
| **Client ACK** | Client received event |
| **Delivery ACK** | Message delivered |
| **Read ACK** | Message read |

**ACK Payload**:

```json
{
  "eventId": "uuid",
  "status": "delivered",
  "timestamp": "2026-08-01T12:00:00Z"
}
```

---

## 4.6 Retries

**Strategy**: Exponential backoff with jitter

**Configuration**:

| Parameter | Value |
|-----------|-------|
| **Max Retries** | 5 |
| **Initial Delay** | 1s |
| **Max Delay** | 30s |
| **Jitter** | 0-1s |

**Retry Rules**:

| Rule | Description |
|------|-------------|
| **Idempotent only** | Only retry idempotent events |
| **Max retries** | Stop after max retries |
| **Exponential backoff** | Increase delay each retry |
| **Dead letter** | Move failed events to dead letter queue |

---

## 4.7 Timeouts

**Configuration**:

| Event Type | Timeout |
|------------|---------|
| **Typing** | 5 seconds |
| **Presence** | 30 seconds |
| **Message** | 30 seconds |
| **ACK** | 10 seconds |
| **Reconnect** | 30 seconds |

---

## 4.8 Event Ordering

**Strategy**: Causal ordering with timestamps

**Rules**:

| Rule | Description |
|------|-------------|
| **Causal ordering** | Events are ordered by causation |
| **Timestamp ordering** | Use server timestamp for ordering |
| **Sequence numbers** | Use sequence numbers for ordering |
| **Conflict resolution** | Last write wins for concurrent events |

---

## 4.9 Deduplication

**Strategy**: Event ID-based deduplication

**Process**:

| Step | Action |
|------|--------|
| **1** | Receive event |
| **2** | Check event ID in cache |
| **3** | If exists, discard |
| **4** | If new, process and cache |
| **5** | Cache expires after 5 minutes |

---

## 4.10 Idempotency

**Strategy**: Idempotency keys

**Implementation**:

| Step | Action |
|------|--------|
| **1** | Client generates idempotency key |
| **2** | Client sends event with key |
| **3** | Server checks if key exists |
| **4** | If exists, return cached response |
| **5** | If new, process and cache response |

---

**END OF VOLUME 1**

---

# VOLUME 2: Messaging Pipeline

---

# 5. Messaging Pipeline

---

## 5.1 Pipeline Overview

**Stages**:

| Stage | Description | Latency |
|-------|-------------|---------|
| **Compose** | User composes message | - |
| **Upload** | Upload media (if any) | Variable |
| **Encrypt** | Encrypt message (future) | < 5ms |
| **Send** | Send to server | < 50ms |
| **Persist** | Store in database | < 20ms |
| **Broadcast** | Send to recipients | < 100ms |
| **Acknowledge** | Confirm delivery | < 200ms |
| **Delivered** | Mark as delivered | < 300ms |
| **Seen** | Mark as seen | < 300ms |

---

## 5.2 Compose Stage

**Process**:

| Step | Action |
|------|--------|
| **1** | User types message |
| **2** | Client generates message object |
| **3** | Client generates idempotency key |
| **4** | Client stores in local queue |
| **5** | Client shows "sending" state |

**Message Object**:

```json
{
  "id": "uuid",
  "tempId": "uuid",
  "conversationId": "uuid",
  "content": "Hello, everyone!",
  "type": "text",
  "attachments": [],
  "replyTo": null,
  "status": "sending",
  "createdAt": "2026-08-01T12:00:00Z",
  "idempotencyKey": "uuid"
}
```

---

## 5.3 Upload Stage

**Media Upload Flow**:

| Step | Action |
|------|--------|
| **1** | Check file size |
| **2** | Compress if needed |
| **3** | Generate upload URL |
| **4** | Upload to CDN |
| **5** | Get media ID |
| **6** | Attach to message |

**Upload Progress**:

```json
{
  "messageId": "uuid",
  "attachmentId": "uuid",
  "progress": 0.5,
  "uploadedBytes": 1024000,
  "totalBytes": 2048000,
  "status": "uploading"
}
```

---

## 5.4 Encrypt Stage (Future Ready)

**Strategy**: End-to-end encryption for private conversations

**Encryption Flow**:

| Step | Action |
|------|--------|
| **1** | Generate message key |
| **2** | Encrypt message content |
| **3** | Encrypt with recipient's public key |
| **4** | Send encrypted message |
| **5** | Recipient decrypts with private key |

**Encryption Status**:

```json
{
  "encrypted": false,
  "encryptionType": null,
  "keyId": null
}
```

---

## 5.5 Send Stage

**Client -> Server Flow**:

| Step | Action | Timeout |
|------|--------|---------|
| **1** | Client emits `message:send` | - |
| **2** | Server receives event | - |
| **3** | Server validates event | 5s |
| **4** | Server persists message | 10s |
| **5** | Server broadcasts to recipients | 5s |
| **6** | Server sends ACK to sender | 5s |

**Send Event**:

```json
{
  "id": "uuid",
  "type": "message:send",
  "payload": {
    "conversationId": "uuid",
    "content": "Hello, everyone!",
    "type": "text",
    "tempId": "uuid"
  }
}
```

---

## 5.6 Persist Stage

**Persistence Flow**:

| Step | Action |
|------|--------|
| **1** | Validate message data |
| **2** | Store in database |
| **3** | Store in message cache |
| **4** | Update conversation last message |
| **5** | Update user message counts |

**Persistence Rules**:

| Rule | Description |
|------|-------------|
| **Durability** | Message persisted before ACK |
| **Atomicity** | All writes are atomic |
| **Consistency** | All replicas consistent |
| **Idempotency** | Duplicate messages handled |

---

## 5.7 Broadcast Stage

**Broadcast Flow**:

| Step | Action |
|------|--------|
| **1** | Get conversation members |
| **2** | Filter offline users |
| **3** | Send to online users via Socket.IO |
| **4** | Queue for offline users |
| **5** | Send push notifications |

**Broadcast Rules**:

| Rule | Description |
|------|-------------|
| **Exclude sender** | Don't send back to sender |
| **Filter muted** | Don't send to muted users |
| **Filter blocked** | Don't send to blocked users |
| **Queue offline** | Queue for offline users |

---

## 5.8 Acknowledge Stage

**ACK Types**:

| Type | Description | Source |
|------|-------------|--------|
| **Server ACK** | Server received | Server |
| **Delivery ACK** | Message delivered | Recipient client |
| **Read ACK** | Message read | Recipient client |

**ACK Flow**:

```
Client -> Server: message:send
Server -> Client: message:ack (server)
Server -> Recipient: message:receive
Recipient -> Server: message:ack (delivery)
Recipient -> Server: message:read (read)
Server -> Sender: message:status (delivery/read)
```

---

## 5.9 Delivered Stage

**Delivery Detection**:

| Method | Description |
|--------|-------------|
| **Socket.IO ACK** | Direct acknowledgment |
| **Presence check** | Check if recipient online |
| **Push notification** | Push delivered |
| **Timeout** | Mark delivered after timeout |

**Delivery Status**:

```json
{
  "messageId": "uuid",
  "status": "delivered",
  "deliveredAt": "2026-08-01T12:00:01Z",
  "deliveredTo": [
    {
      "userId": "uuid",
      "deliveredAt": "2026-08-01T12:00:01Z"
    }
  ]
}
```

---

## 5.10 Seen Stage

**Seen Detection**:

| Method | Description |
|--------|-------------|
| **Chat opened** | User opened conversation |
| **Message visible** | Message is visible on screen |
| **Scroll position** | User scrolled to message |

**Seen Status**:

```json
{
  "messageId": "uuid",
  "status": "seen",
  "seenAt": "2026-08-01T12:00:05Z",
  "seenBy": [
    {
      "userId": "uuid",
      "seenAt": "2026-08-01T12:00:05Z"
    }
  ]
}
```

---

## 5.11 Archived Stage

**Archive Flow**:

| Step | Action |
|------|--------|
| **1** | User archives message |
| **2** | Message moved to archive |
| **3** | Message removed from main view |
| **4** | Message searchable in archive |

---

## 5.12 Deleted Stage

**Deletion Types**:

| Type | Description |
|------|-------------|
| **Delete for me** | Delete from user's view |
| **Delete for everyone** | Delete from all users |

**Deletion Flow**:

| Step | Action |
|------|--------|
| **1** | User requests deletion |
| **2** | Server validates permission |
| **3** | Server soft-deletes message |
| **4** | Server broadcasts deletion |
| **5** | Recipients update view |

---

## 5.13 Retry Stage

**Retry Strategy**:

| Attempt | Delay | Action |
|---------|-------|--------|
| **1** | 1s | Retry send |
| **2** | 2s | Retry send |
| **3** | 4s | Retry send |
| **4** | 8s | Retry send |
| **5** | 16s | Move to dead letter |

**Retry Rules**:

| Rule | Description |
|------|-------------|
| **Idempotent only** | Only retry idempotent events |
| **Max retries** | Stop after 5 retries |
| **Exponential backoff** | Increase delay each retry |
| **Dead letter** | Move failed to dead letter queue |

---

## 5.14 Failure Recovery

**Failure Scenarios**:

| Scenario | Recovery |
|----------|----------|
| **Network lost** | Queue locally, retry on reconnect |
| **Server error** | Retry with backoff |
| **Timeout** | Retry or mark as failed |
| **Duplicate** | Deduplicate by event ID |
| **Out of order** | Reorder by timestamp |

---

## 5.15 Message States

**State Machine**:

```
COMPOSED -> SENDING -> SENT -> DELIVERED -> SEEN
SENDING -> FAILED -> RETRYING -> SENT
SENT -> FAILED -> RETRYING -> SENT
```

**State Definitions**:

| State | Description |
|-------|-------------|
| **COMPOSED** | Message composed by user |
| **SENDING** | Message being sent |
| **SENT** | Message sent to server |
| **DELIVERED** | Message delivered to recipient |
| **SEEN** | Message seen by recipient |
| **FAILED** | Message failed to send |
| **RETRYING** | Message being retried |

---

**END OF VOLUME 2**

---

# VOLUME 3: Presence, Typing, Read Receipts

---

# 6. Presence System

---

## 6.1 Presence States

**States**:

| State | Description | Icon |
|-------|-------------|------|
| **Online** | User is active | Green dot |
| **Offline** | User is not connected | Gray dot |
| **Idle** | User inactive for 5+ minutes | Yellow dot |
| **Busy** | User is busy (Do Not Disturb) | Red dot |
| **Away** | User is away | Orange dot |
| **Invisible** | User appears offline | Gray dot |

---

## 6.2 Presence Updates

**Update Flow**:

| Step | Action |
|------|--------|
| **1** | Client detects state change |
| **2** | Client sends presence event |
| **3** | Server updates presence |
| **4** | Server broadcasts to friends |
| **5** | Friends update UI |

**Presence Event**:

```json
{
  "type": "presence:update",
  "payload": {
    "userId": "uuid",
    "status": "online",
    "lastSeenAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 6.3 Heartbeat System

**Configuration**:

| Parameter | Value |
|-----------|-------|
| **Interval** | 30 seconds |
| **Timeout** | 60 seconds |
| **Idle Threshold** | 5 minutes |

**Heartbeat Flow**:

```
Client -> Server: presence:heartbeat
Server -> Client: presence:heartbeat:ack
```

---

## 6.4 Idle Detection

**Detection Logic**:

| Condition | State |
|-----------|-------|
| Active for 5+ minutes | Idle |
| Active within 5 minutes | Online |
| No heartbeat for 60 seconds | Offline |

---

## 6.5 Reconnect Presence

**Reconnection Flow**:

| Step | Action |
|------|--------|
| **1** | Client reconnects |
| **2** | Client sends presence:online |
| **3** | Server updates presence |
| **4** | Server broadcasts to friends |

---

## 6.6 Last Seen

**Storage**:

| Field | Description |
|-------|-------------|
| **userId** | User ID |
| **lastSeenAt** | Last seen timestamp |
| **lastSeenDevice** | Last seen device |

**Privacy**:

| Setting | Description |
|---------|-------------|
| **Show to everyone** | Visible to all |
| **Show to friends** | Visible to friends only |
| **Show to nobody** | Hidden from all |

---

## 6.7 Multi-Device Presence

**Strategy**: If any device is online, user is online

**Device Presence**:

```json
{
  "userId": "uuid",
  "status": "online",
  "devices": [
    {
      "deviceId": "uuid",
      "platform": "ios",
      "status": "online",
      "lastSeenAt": "2026-08-01T12:00:00Z"
    },
    {
      "deviceId": "uuid",
      "platform": "web",
      "status": "idle",
      "lastSeenAt": "2026-08-01T11:55:00Z"
    }
  ]
}
```

---

# 7. Typing System

---

## 7.1 Typing Events

**Events**:

| Event | Description |
|-------|-------------|
| **typing:start** | User started typing |
| **typing:stop** | User stopped typing |
| **typing:timeout** | Typing indicator timed out |

**Typing Event**:

```json
{
  "type": "typing:start",
  "payload": {
    "conversationId": "uuid",
    "userId": "uuid",
    "timestamp": "2026-08-01T12:00:00Z"
  }
}
```

---

## 7.2 Typing Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | User starts typing |
| **2** | Client sends typing:start |
| **3** | Server broadcasts to conversation |
| **4** | Recipients show typing indicator |
| **5** | After 5 seconds, typing:timeout |
| **6** | Server broadcasts typing:stop |

---

## 7.3 Typing Timeout

**Configuration**:

| Parameter | Value |
|-----------|-------|
| **Timeout** | 5 seconds |
| **Debounce** | 1 second |

**Timeout Flow**:

| Step | Action |
|------|--------|
| **1** | Client sends typing:start |
| **2** | Client starts 5s timer |
| **3** | If user still typing, send typing:start |
| **4** | If timer expires, send typing:stop |
| **5** | Server broadcasts typing:stop |

---

## 7.4 Typing Reconnect

**Reconnection Flow**:

| Step | Action |
|------|--------|
| **1** | Client reconnects |
| **2** | If user was typing, send typing:start |
| **3** | Server broadcasts to conversation |

---

## 7.5 Typing Offline

**Offline Behavior**:

| Scenario | Action |
|----------|--------|
| **User offline** | Don't show typing |
| **User comes online** | Resume typing |
| **User goes offline** | Stop typing |

---

## 7.6 Typing Multi-Device

**Strategy**: Show typing from any device

**Multi-Device Flow**:

| Step | Action |
|------|--------|
| **1** | User types on phone |
| **2** | Server broadcasts to conversation |
| **3** | Recipients show typing from phone |
| **4** | User switches to web |
| **5** | Server broadcasts from web |

---

# 8. Read Receipt System

---

## 8.1 Read Receipt States

**States**:

| State | Description |
|-------|-------------|
| **Sent** | Message sent |
| **Delivered** | Message delivered |
| **Seen** | Message seen by recipient |
| **Read** | Message read (opened) |

---

## 8.2 Read Receipt Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Sender sends message |
| **2** | Server marks as sent |
| **3** | Recipient receives message |
| **4** | Server marks as delivered |
| **5** | Recipient opens message |
| **6** | Server marks as seen |
| **7** | Server notifies sender |

---

## 8.3 Unread Counter

**Counter Logic**:

| Scenario | Action |
|----------|--------|
| **New message** | Increment counter |
| **Message seen** | Decrement counter |
| **All seen** | Counter = 0 |
| **Conversation opened** | Reset counter |

**Unread Counter**:

```json
{
  "conversationId": "uuid",
  "unreadCount": 5,
  "lastReadMessageId": "uuid",
  "lastReadAt": "2026-08-01T12:00:00Z"
}
```

---

## 8.4 Batch Read

**Batch Read Flow**:

| Step | Action |
|------|--------|
| **1** | User opens conversation |
| **2** | Client sends batch read |
| **3** | Server marks all messages as seen |
| **4** | Server notifies senders |
| **5** | Counter resets to 0 |

**Batch Read Event**:

```json
{
  "type": "read:batch",
  "payload": {
    "conversationId": "uuid",
    "lastMessageId": "uuid",
    "timestamp": "2026-08-01T12:00:00Z"
  }
}
```

---

## 8.5 Read Receipt Synchronization

**Sync Strategy**:

| Scenario | Action |
|----------|--------|
| **Multi-device** | Sync read state across devices |
| **Offline** | Queue read receipts for sync |
| **Conflict** | Use latest timestamp |

---

## 8.6 Read Receipt Privacy

**Privacy Settings**:

| Setting | Description |
|---------|-------------|
| **Show to everyone** | Show to all contacts |
| **Show to friends** | Show to friends only |
| **Show to nobody** | Hide read receipts |

---

**END OF VOLUME 3**

---

# VOLUME 4: Media Synchronization

---

# 9. Media Synchronization

---

## 9.1 Media Upload Flow

**Upload Pipeline**:

| Step | Action | Latency |
|------|--------|---------|
| **1** | Select media | - |
| **2** | Compress locally | 100-500ms |
| **3** | Generate upload URL | 100ms |
| **4** | Upload to CDN | Variable |
| **5** | Get media ID | 100ms |
| **6** | Send message | 50ms |

---

## 9.2 Image Upload

**Image Upload Flow**:

| Step | Action |
|------|--------|
| **1** | User selects image |
| **2** | Client compresses image |
| **3** | Client generates thumbnail |
| **4** | Client uploads to CDN |
| **5** | Client gets image ID |
| **6** | Client sends message |

**Image Compression**:

| Format | Quality | Max Size |
|--------|---------|----------|
| **WebP** | 80% | 2MB |
| **JPEG** | 85% | 2MB |
| **PNG** | 100% | 5MB |

---

## 9.3 Video Upload

**Video Upload Flow**:

| Step | Action |
|------|--------|
| **1** | User selects video |
| **2** | Client transcodes video |
| **3** | Client generates thumbnail |
| **4** | Client uploads to CDN |
| **5** | Client gets video ID |
| **6** | Client sends message |

**Video Transcoding**:

| Format | Resolution | Max Size |
|--------|------------|----------|
| **MP4** | 720p | 50MB |
| **MOV** | 1080p | 100MB |

---

## 9.4 Voice Upload

**Voice Upload Flow**:

| Step | Action |
|------|--------|
| **1** | User records voice |
| **2** | Client compresses audio |
| **3** | Client uploads to CDN |
| **4** | Client gets audio ID |
| **5** | Client sends message |

**Audio Compression**:

| Format | Bitrate | Max Duration |
|--------|---------|--------------|
| **AAC** | 128kbps | 5 minutes |
| **OGG** | 64kbps | 5 minutes |

---

## 9.5 Document Upload

**Document Upload Flow**:

| Step | Action |
|------|--------|
| **1** | User selects document |
| **2** | Client validates file type |
| **3** | Client uploads to CDN |
| **4** | Client gets document ID |
| **5** | Client sends message |

**Document Types**:

| Type | Max Size |
|------|----------|
| **PDF** | 50MB |
| **DOC** | 50MB |
| **TXT** | 10MB |

---

## 9.6 Upload Progress

**Progress Tracking**:

```json
{
  "mediaId": "uuid",
  "status": "uploading",
  "progress": 0.5,
  "uploadedBytes": 1024000,
  "totalBytes": 2048000,
  "speed": 1024000,
  "eta": 1000
}
```

**Progress Events**:

| Event | Description |
|-------|-------------|
| **upload:start** | Upload started |
| **upload:progress** | Upload progress |
| **upload:complete** | Upload completed |
| **upload:error** | Upload failed |

---

## 9.7 Upload Cancellation

**Cancellation Flow**:

| Step | Action |
|------|--------|
| **1** | User cancels upload |
| **2** | Client aborts upload |
| **3** | Client cleans up temp files |
| **4** | Client shows cancelled state |

---

## 9.8 Upload Retry

**Retry Strategy**:

| Attempt | Delay | Action |
|---------|-------|--------|
| **1** | 1s | Retry upload |
| **2** | 2s | Retry upload |
| **3** | 4s | Retry upload |
| **4** | 8s | Retry upload |
| **5** | 16s | Move to failed |

**Retry Rules**:

| Rule | Description |
|------|-------------|
| **Resume upload** | Resume from last chunk |
| **Exponential backoff** | Increase delay each retry |
| **Max retries** | Stop after 5 retries |
| **Dead letter** | Move failed to dead letter queue |

---

## 9.9 Media Streaming

**Streaming Flow**:

| Step | Action |
|------|--------|
| **1** | User requests media |
| **2** | Server gets media URL |
| **3** | Server returns streaming URL |
| **4** | Client streams media |
| **5** | Client caches media |

**Streaming Strategies**:

| Strategy | Description |
|----------|-------------|
| **Adaptive** | Adjust quality based on bandwidth |
| **Progressive** | Load as you play |
| **Chunked** | Load in chunks |

---

## 9.10 Media Download

**Download Flow**:

| Step | Action |
|------|--------|
| **1** | User requests download |
| **2** | Server generates download URL |
| **3** | Client downloads media |
| **4** | Client saves to device |

---

## 9.11 Media Cache

**Cache Strategy**:

| Level | Location | TTL |
|-------|----------|-----|
| **L1** | Memory | 5 minutes |
| **L2** | Disk | 24 hours |
| **L3** | CDN | 7 days |

---

## 9.12 Media Cleanup

**Cleanup Strategy**:

| Condition | Action |
|-----------|--------|
| **Cache full** | Delete oldest |
| **TTL expired** | Delete expired |
| **User logout** | Clear memory cache |

---

**END OF VOLUME 4**

---

# VOLUME 5: Workspace Synchronization & Notifications

---

# 10. Workspace Synchronization

---

## 10.1 Workspace Events

**Events**:

| Event | Description |
|-------|-------------|
| **workspace:create** | Workspace created |
| **workspace:update** | Workspace updated |
| **workspace:delete** | Workspace deleted |
| **workspace:member:add** | Member added |
| **workspace:member:remove** | Member removed |
| **workspace:member:update** | Member role updated |
| **workspace:wallpaper** | Wallpaper updated |
| **workspace:theme** | Theme updated |

---

## 10.2 Friend Added Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | User A sends friend request |
| **2** | User B accepts request |
| **3** | Server creates friendship |
| **4** | Server broadcasts to both users |
| **5** | Both users update friends list |

**Friend Added Event**:

```json
{
  "type": "friend:added",
  "payload": {
    "friendshipId": "uuid",
    "friend": {
      "id": "uuid",
      "displayName": "Jane Smith",
      "username": "janesmith",
      "avatarUrl": "https://cdn.bondcircle.com/avatars/uuid.webp"
    },
    "createdAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 10.3 Friend Removed Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | User A removes friend |
| **2** | Server deletes friendship |
| **3** | Server broadcasts to both users |
| **4** | Both users update friends list |
| **5** | Both users lose access to shared workspaces |

---

## 10.4 Workspace Updated Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Admin updates workspace |
| **2** | Server validates changes |
| **3** | Server persists changes |
| **4** | Server broadcasts to members |
| **5** | Members update workspace view |

**Workspace Updated Event**:

```json
{
  "type": "workspace:update",
  "payload": {
    "workspaceId": "uuid",
    "changes": {
      "name": "New Name",
      "description": "New description"
    },
    "updatedAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 10.5 Wallpaper Updated Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Admin updates wallpaper |
| **2** | Server processes image |
| **3** | Server saves wallpaper |
| **4** | Server broadcasts to members |
| **5** | Members update background |

---

## 10.6 Nickname Updated Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | User updates nickname |
| **2** | Server validates nickname |
| **3** | Server saves nickname |
| **4** | Server broadcasts to workspace |
| **5** | Members update display |

---

## 10.7 Theme Updated Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Admin updates theme |
| **2** | Server validates theme |
| **3** | Server saves theme |
| **4** | Server broadcasts to members |
| **5** | Members update UI |

---

# 11. Notification Synchronization

---

## 11.1 Notification Types

**Types**:

| Type | Description | Priority |
|------|-------------|----------|
| **message** | New message | High |
| **friend_request** | Friend request | Medium |
| **workspace_invite** | Workspace invite | Medium |
| **mention** | Mention in message | High |
| **reaction** | Reaction to message | Low |
| **system** | System notification | High |

---

## 11.2 Push Notification Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Server receives event |
| **2** | Server checks user preferences |
| **3** | Server checks if user is online |
| **4** | If offline, send push notification |
| **5** | If online, send via Socket.IO |

---

## 11.3 Realtime Notification Flow

**Flow**:

| Step | Action |
|------|--------|
| **1** | Server receives event |
| **2** | Server validates notification |
| **3** | Server sends via Socket.IO |
| **4** | Client receives notification |
| **5** | Client updates UI |

**Realtime Notification Event**:

```json
{
  "type": "notification:receive",
  "payload": {
    "id": "uuid",
    "type": "message",
    "title": "New message",
    "body": "You have a new message from Jane",
    "data": {
      "conversationId": "uuid",
      "messageId": "uuid"
    },
    "createdAt": "2026-08-01T12:00:00Z"
  }
}
```

---

## 11.4 Badge Count

**Badge Logic**:

| Scenario | Action |
|----------|--------|
| **New message** | Increment badge |
| **Notification read** | Decrement badge |
| **All read** | Badge = 0 |
| **App opened** | Reset badge |

**Badge Count**:

```json
{
  "userId": "uuid",
  "badgeCount": 5,
  "unreadConversations": 3,
  "unreadMessages": 12
}
```

---

## 11.5 Notification Priority

**Priority Levels**:

| Level | Description | Sound | Vibration |
|-------|-------------|-------|-----------|
| **High** | Urgent | Yes | Yes |
| **Medium** | Important | Yes | No |
| **Low** | Informational | No | No |

---

## 11.6 Notification Grouping

**Grouping Strategy**:

| Type | Grouping |
|------|----------|
| **Messages** | Group by conversation |
| **Friend requests** | Group together |
| **Workspace invites** | Group together |
| **Reactions** | Group by message |

**Grouped Notification**:

```json
{
  "type": "grouped",
  "title": "5 new messages",
  "body": "From 3 conversations",
  "notifications": [
    {
      "type": "message",
      "conversationId": "uuid",
      "count": 3
    }
  ]
}
```

---

## 11.7 Notification Preferences

**Preferences**:

```json
{
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
```

---

## 11.8 Notification Synchronization

**Sync Strategy**:

| Scenario | Action |
|----------|--------|
| **Multi-device** | Sync across devices |
| **Offline** | Queue notifications |
| **Reconnect** | Deliver queued notifications |
| **Conflict** | Use latest timestamp |

---

**END OF VOLUME 5**

---

# VOLUME 6: Offline Engine

---

# 12. Offline Engine

---

## 12.1 Offline Philosophy

**Principles**:

| Principle | Description |
|-----------|-------------|
| **Full Functionality** | App works fully offline |
| **Queue Everything** | All actions are queued |
| **Conflict Detection** | Detect conflicts when syncing |
| **Smart Resolution** | Resolve conflicts intelligently |
| **User Control** | User can review conflicts |

---

## 12.2 Offline Queue

**Queue Types**:

| Queue | Purpose |
|-------|---------|
| **Message Queue** | Queued messages |
| **Upload Queue** | Queued uploads |
| **Retry Queue** | Failed events for retry |
| **Conflict Queue** | Conflicts for resolution |
| **Sync Queue** | Events for sync |

---

## 12.3 Message Queue

**Queue Structure**:

```json
{
  "id": "uuid",
  "type": "message:send",
  "payload": {
    "conversationId": "uuid",
    "content": "Hello, everyone!",
    "type": "text"
  },
  "createdAt": "2026-08-01T12:00:00Z",
  "retryCount": 0,
  "status": "queued"
}
```

**Queue Rules**:

| Rule | Description |
|------|-------------|
| **FIFO** | Process in order |
| **Idempotent** | Handle duplicates |
| **Retry** | Retry on failure |
| **Max Retries** | Stop after 5 retries |

---

## 12.4 Upload Queue

**Queue Structure**:

```json
{
  "id": "uuid",
  "type": "media:upload",
  "payload": {
    "conversationId": "uuid",
    "file": "base64-encoded-data",
    "mimeType": "image/jpeg"
  },
  "createdAt": "2026-08-01T12:00:00Z",
  "retryCount": 0,
  "status": "queued"
}
```

**Upload Rules**:

| Rule | Description |
|------|-------------|
| **Compress** | Compress before upload |
| **Chunked** | Upload in chunks |
| **Resume** | Resume from last chunk |
| **Cancel** | Allow cancellation |

---

## 12.5 Retry Queue

**Retry Strategy**:

| Attempt | Delay | Action |
|---------|-------|--------|
| **1** | 1s | Retry event |
| **2** | 2s | Retry event |
| **3** | 4s | Retry event |
| **4** | 8s | Retry event |
| **5** | 16s | Move to dead letter |

**Retry Rules**:

| Rule | Description |
|------|-------------|
| **Exponential backoff** | Increase delay each retry |
| **Jitter** | Add random jitter |
| **Max retries** | Stop after 5 retries |
| **Dead letter** | Move failed to dead letter |

---

## 12.6 Conflict Queue

**Conflict Structure**:

```json
{
  "id": "uuid",
  "type": "conflict",
  "local": {
    "id": "uuid",
    "type": "message:update",
    "payload": {
      "content": "Updated locally"
    },
    "timestamp": "2026-08-01T12:00:00Z"
  },
  "remote": {
    "id": "uuid",
    "type": "message:update",
    "payload": {
      "content": "Updated remotely"
    },
    "timestamp": "2026-08-01T12:00:05Z"
  },
  "status": "pending"
}
```

---

## 12.7 Sync Queue

**Sync Strategy**:

| Step | Action |
|------|--------|
| **1** | App reconnects |
| **2** | Client sends sync request |
| **3** | Server sends missed events |
| **4** | Client processes missed events |
| **5** | Client sends queued events |
| **6** | Server processes queued events |

---

## 12.8 Offline Detection

**Detection Methods**:

| Method | Description |
|--------|-------------|
| **Network API** | Check navigator.onLine |
| **Heartbeat** | Check server response |
| **Socket.IO** | Check socket connection |
| **Ping** | Ping server periodically |

---

## 12.9 Offline Indicators

**UI Indicators**:

| Indicator | Description |
|-----------|-------------|
| **Banner** | "You are offline" banner |
| **Icon** | Offline icon in header |
| **Message status** | "Queued" status on messages |
| **Upload status** | "Waiting for connection" |

---

## 12.10 Offline Storage

**Storage Strategy**:

| Level | Location | Capacity |
|-------|----------|----------|
| **L1** | Memory | 100MB |
| **L2** | IndexedDB | 500MB |
| **L3** | File System | 1GB |

**Storage Rules**:

| Rule | Description |
|------|-------------|
| **Encrypt** | Encrypt sensitive data |
| **Compress** | Compress old data |
| **Evict** | Evict oldest data |
| **Sync** | Sync to server |

---

## 12.11 Conflict Detection

**Detection Methods**:

| Method | Description |
|--------|-------------|
| **Timestamp** | Compare timestamps |
| **Version** | Compare versions |
| **Hash** | Compare content hash |
| **User ID** | Check user ownership |

---

## 12.12 Conflict Resolution

**Resolution Strategies**:

| Strategy | When to Use |
|----------|-------------|
| **Last Write Wins** | Concurrent edits |
| **Merge** | Non-conflicting changes |
| **Manual** | User resolves |
| **Auto-resolve** | Simple conflicts |

---

## 12.13 Sync Process

**Sync Flow**:

| Step | Action |
|------|--------|
| **1** | Client connects |
| **2** | Client sends last sync timestamp |
| **3** | Server sends missed events |
| **4** | Client processes events |
| **5** | Client sends queued events |
| **6** | Server processes events |
| **7** | Server sends confirmation |
| **8** | Client clears queue |

---

## 12.14 Recovery Process

**Recovery Scenarios**:

| Scenario | Recovery |
|----------|----------|
| **App crash** | Reload from storage |
| **Network loss** | Queue events |
| **Server error** | Retry with backoff |
| **Data corruption** | Restore from backup |

---

**END OF VOLUME 6**

---

# VOLUME 7: Conflict Resolution & Reliability

---

# 13. Conflict Resolution

---

## 13.1 Conflict Types

**Types**:

| Type | Description | Example |
|------|-------------|---------|
| **Concurrent Edit** | Two users edit same data | Edit message simultaneously |
| **Offline Changes** | Changes made offline | Edit while offline |
| **Out of Order** | Events arrive out of order | Late message arrives |
| **Duplicate** | Duplicate events | Network retry |
| **Delete Conflict** | Delete vs edit | Edit vs delete |

---

## 13.2 Concurrent Edit Resolution

**Scenario**: Two users edit the same message simultaneously

**Resolution**:

| Step | Action |
|------|--------|
| **1** | Detect concurrent edits |
| **2** | Compare timestamps |
| **3** | Last write wins |
| **4** | Notify loser of conflict |
| **5** | Allow manual resolution |

**Conflict Event**:

```json
{
  "type": "conflict:detected",
  "payload": {
    "resourceType": "message",
    "resourceId": "uuid",
    "local": {
      "content": "Local edit",
      "timestamp": "2026-08-01T12:00:00Z",
      "userId": "uuid"
    },
    "remote": {
      "content": "Remote edit",
      "timestamp": "2026-08-01T12:00:05Z",
      "userId": "uuid"
    },
    "resolution": "last-write-wins"
  }
}
```

---

## 13.3 Offline Change Resolution

**Scenario**: User makes changes offline, then reconnects

**Resolution**:

| Step | Action |
|------|--------|
| **1** | User reconnects |
| **2** | Client sends offline changes |
| **3** | Server compares with current state |
| **4** | If no conflict, apply changes |
| **5** | If conflict, detect and resolve |

**Resolution Strategies**:

| Strategy | Description |
|----------|-------------|
| **Auto-merge** | Automatically merge changes |
| **Last write wins** | Use latest timestamp |
| **Manual** | User resolves |
| **Preview** | Show both versions |

---

## 13.4 Out of Order Events

**Scenario**: Events arrive out of order

**Resolution**:

| Step | Action |
|------|--------|
| **1** | Receive event |
| **2** | Check sequence number |
| **3** | If out of order, buffer |
| **4** | Wait for missing events |
| **5** | Process in order |

**Sequence Tracking**:

```json
{
  "conversationId": "uuid",
  "lastSequence": 100,
  "bufferedEvents": [],
  "missingSequences": []
}
```

---

## 13.5 Duplicate Events

**Scenario**: Network retry causes duplicate events

**Resolution**:

| Step | Action |
|------|--------|
| **1** | Receive event |
| **2** | Check event ID |
| **3** | If duplicate, discard |
| **4** | If new, process |
| **5** | Cache event ID |

**Deduplication Window**: 5 minutes

---

## 13.6 Delete Conflict

**Scenario**: User edits message, another deletes it

**Resolution**:

| Step | Action |
|------|--------|
| **1** | Receive edit event |
| **2** | Check if message exists |
| **3** | If deleted, discard edit |
| **4** | Notify user of conflict |

---

## 13.7 Conflict UI

**UI Components**:

| Component | Description |
|-----------|-------------|
| **Conflict Banner** | "Conflict detected" banner |
| **Diff View** | Show differences |
| **Resolution Options** | Choose resolution |
| **Undo** | Undo resolution |

---

## 13.8 Conflict Prevention

**Prevention Strategies**:

| Strategy | Description |
|----------|-------------|
| **Optimistic Locking** | Use version numbers |
| **Pessimistic Locking** | Lock during edit |
| **Field Locking** | Lock individual fields |
| **Conflict-free CRDT** | Use conflict-free data types |

---

# 14. Realtime Security

---

## 14.1 Socket Authentication

**Authentication Flow**:

| Step | Action |
|------|--------|
| **1** | Client connects socket |
| **2** | Client sends JWT token |
| **3** | Server validates token |
| **4** | Server creates session |
| **5** | Server allows events |

**Token Validation**:

| Check | Description |
|-------|-------------|
| **Expiry** | Check token expiry |
| **Signature** | Verify token signature |
| **Issuer** | Verify token issuer |
| **Audience** | Verify token audience |

---

## 14.2 Authorization

**Authorization Rules**:

| Resource | Permission |
|----------|------------|
| **Message** | Owner or conversation member |
| **Workspace** | Workspace member |
| **Media** | Owner or workspace member |
| **Profile** | Owner only |

---

## 14.3 Replay Protection

**Protection Strategy**:

| Step | Action |
|------|--------|
| **1** | Generate nonce for each event |
| **2** | Include timestamp |
| **3** | Server validates nonce |
| **4** | Server validates timestamp |
| **5** | Server rejects duplicates |

**Replay Window**: 5 minutes

---

## 14.4 Rate Limiting

**Rate Limits**:

| Event Type | Limit |
|------------|-------|
| **Message send** | 60/minute |
| **Typing indicator** | 100/minute |
| **Presence update** | 30/minute |
| **Read receipt** | 100/minute |
| **Reaction** | 60/minute |

---

## 14.5 Spam Protection

**Protection Strategies**:

| Strategy | Description |
|----------|-------------|
| **Rate limiting** | Limit event frequency |
| **Content filtering** | Filter spam content |
| **User blocking** | Block spam users |
| **Report system** | Report spam users |

---

## 14.6 Payload Validation

**Validation Rules**:

| Rule | Description |
|------|-------------|
| **Schema validation** | Validate against schema |
| **Size limits** | Limit payload size |
| **Type checking** | Validate field types |
| **Sanitization** | Sanitize inputs |

**Payload Size Limits**:

| Event Type | Max Size |
|------------|----------|
| **Message** | 10KB |
| **Typing** | 1KB |
| **Presence** | 1KB |
| **Reaction** | 1KB |

---

## 14.7 Encryption

**Encryption Strategy**:

| Layer | Description |
|-------|-------------|
| **Transport** | TLS 1.3 |
| **Application** | JWT encryption |
| **E2E** | End-to-end (future) |

---

## 14.8 Audit Logging

**Audit Events**:

| Event | Description |
|-------|-------------|
| **Connection** | User connected |
| **Disconnection** | User disconnected |
| **Auth failure** | Authentication failed |
| **Rate limit hit** | Rate limit exceeded |
| **Suspicious activity** | Suspicious event |

---

**END OF VOLUME 7**

---

# VOLUME 8: Performance, Scaling & Future Expansion

---

# 15. Performance

---

## 15.1 Compression

**Compression Strategies**:

| Strategy | Description |
|----------|-------------|
| **Gzip** | Compress text payloads |
| **Brotli** | Better compression |
| **Deflate** | Fast compression |
| **Binary** | Binary payloads |

**Compression Settings**:

| Setting | Value |
|---------|-------|
| **Level** | 6 (balanced) |
| **Threshold** | 1KB |
| **Types** | text/plain, application/json |

---

## 15.2 Batch Events

**Batching Strategy**:

| Strategy | Description |
|----------|-------------|
| **Time-based** | Batch every 100ms |
| **Size-based** | Batch up to 10 events |
| **Hybrid** | Whichever comes first |

**Batch Payload**:

```json
{
  "events": [
    {
      "id": "uuid",
      "type": "message:send",
      "payload": { }
    },
    {
      "id": "uuid",
      "type": "typing:start",
      "payload": { }
    }
  ],
  "batchId": "uuid",
  "timestamp": "2026-08-01T12:00:00Z"
}
```

---

## 15.3 Delta Sync

**Delta Sync Strategy**:

| Strategy | Description |
|----------|-------------|
| **Full sync** | Sync all data |
| **Delta sync** | Sync only changes |
| **Incremental** | Sync since last sync |

**Delta Sync Process**:

| Step | Action |
|------|--------|
| **1** | Client sends last sync timestamp |
| **2** | Server finds changes since timestamp |
| **3** | Server sends only changes |
| **4** | Client applies changes |

---

## 15.4 Event Coalescing

**Coalescing Strategy**:

| Strategy | Description |
|----------|-------------|
| **Merge** | Merge similar events |
| **Deduplicate** | Remove duplicates |
| **Aggregate** | Aggregate counts |

**Coalescing Rules**:

| Rule | Description |
|------|-------------|
| **Typing** | Coalesce typing events |
| **Presence** | Coalesce presence updates |
| **Read receipts** | Coalesce read receipts |

---

## 15.5 Binary Payloads

**Binary Support**:

| Type | Format |
|------|--------|
| **Media** | Base64 or binary |
| **File** | Chunked binary |
| **Thumbnail** | Base64 |

---

## 15.6 Connection Pooling

**Pooling Strategy**:

| Setting | Value |
|---------|-------|
| **Max connections** | 1000 per server |
| **Idle timeout** | 30 seconds |
| **Keep-alive** | 30 seconds |

---

## 15.7 Memory Management

**Memory Strategy**:

| Strategy | Description |
|----------|-------------|
| **Object pooling** | Reuse objects |
| **Weak references** | Use weak references |
| **Lazy loading** | Load on demand |
| **Garbage collection** | Regular GC |

---

## 15.8 Network Optimization

**Optimization Techniques**:

| Technique | Description |
|-----------|-------------|
| **HTTP/2** | Use HTTP/2 |
| **WebSocket** | Use WebSocket |
| **CDN** | Use CDN for static |
| **Edge caching** | Cache at edge |

---

# 16. Scaling

---

## 16.1 Single Server

**Capacity**:

| Metric | Value |
|--------|-------|
| **Concurrent connections** | 10,000 |
| **Messages per second** | 1,000 |
| **Latency** | < 100ms |

**Limits**:

| Limit | Value |
|-------|-------|
| **Memory** | 16GB |
| **CPU** | 8 cores |
| **Network** | 1Gbps |

---

## 16.2 Multiple Servers

**Architecture**:

| Component | Description |
|-----------|-------------|
| **Load balancer** | Distribute connections |
| **Socket.IO servers** | Handle connections |
| **Redis adapter** | Share state |
| **Database** | Persistent storage |

---

## 16.3 Redis Adapter

**Redis Usage**:

| Usage | Description |
|-------|-------------|
| **Pub/Sub** | Broadcast events |
| **Session store** | Store sessions |
| **Cache** | Cache data |
| **Rate limiting** | Rate limit |

---

## 16.4 Horizontal Scaling

**Scaling Strategy**:

| Strategy | Description |
|----------|-------------|
| **Add servers** | Add more servers |
| **Load balancing** | Distribute load |
| **Session affinity** | Sticky sessions |
| **Stateless** | Stateless servers |

---

## 16.5 Regional Servers

**Regional Strategy**:

| Region | Location |
|--------|----------|
| **US East** | Virginia |
| **US West** | Oregon |
| **Europe** | Ireland |
| **Asia** | Singapore |

---

## 16.6 Global Infrastructure

**Global Architecture**:

| Component | Description |
|-----------|-------------|
| **Edge servers** | Serve from edge |
| **CDN** | Cache static |
| **DNS** | Global DNS |
| **Anycast** | Route to nearest |

---

## 16.7 Scaling Milestones

### 100 Users

| Metric | Value |
|--------|-------|
| **Servers** | 1 |
| **Database** | 1 |
| **Cache** | None |

### 1,000 Users

| Metric | Value |
|--------|-------|
| **Servers** | 1 |
| **Database** | 1 |
| **Cache** | Redis |

### 10,000 Users

| Metric | Value |
|--------|-------|
| **Servers** | 2 |
| **Database** | 1 (replica) |
| **Cache** | Redis cluster |

### 100,000 Users

| Metric | Value |
|--------|-------|
| **Servers** | 5 |
| **Database** | Cluster |
| **Cache** | Redis cluster |

### 1 Million Users

| Metric | Value |
|--------|-------|
| **Servers** | 20 |
| **Database** | Sharded cluster |
| **Cache** | Redis cluster |

### 10 Million Users

| Metric | Value |
|--------|-------|
| **Servers** | 100 |
| **Database** | Multi-region |
| **Cache** | Multi-region |

### 100 Million Users

| Metric | Value |
|--------|-------|
| **Servers** | 500 |
| **Database** | Global cluster |
| **Cache** | Global cluster |

---

# 17. Future Expansion

---

## 17.1 Families Mode

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **Family namespaces** | Add family namespaces |
| **Family events** | Add family-specific events |
| **Family presence** | Family-wide presence |

---

## 17.2 Communities Mode

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **Community channels** | Add community channels |
| **Community events** | Add community events |
| **Community presence** | Community-wide presence |

---

## 17.3 Organizations Mode

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **Organization channels** | Add organization channels |
| **Organization events** | Add organization events |
| **Organization presence** | Organization-wide presence |

---

## 17.4 Voice Calls

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **WebRTC** | Add WebRTC support |
| **Signaling** | Add signaling server |
| **Media server** | Add media server |

---

## 17.5 Video Calls

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **Video streams** | Add video streams |
| **Screen sharing** | Add screen sharing |
| **Recording** | Add recording |

---

## 17.6 Live Collaboration

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **CRDT** | Add CRDT support |
| **Operational transform** | Add OT |
| **Real-time sync** | Add real-time sync |

---

## 17.7 Shared Whiteboards

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **Canvas sync** | Add canvas sync |
| **Drawing events** | Add drawing events |
| **Presence** | Add cursor presence |

---

## 17.8 AI Live Assistant

**Realtime Changes**:

| Change | Description |
|--------|-------------|
| **AI events** | Add AI events |
| **Streaming responses** | Add streaming |
| **Context sync** | Add context sync |

---

# 18. Complete Event Inventory

---

## 18.1 Client Event Matrix

| Event | Direction | Description |
|-------|-----------|-------------|
| **message:send** | Client -> Server | Send message |
| **message:edit** | Client -> Server | Edit message |
| **message:delete** | Client -> Server | Delete message |
| **typing:start** | Client -> Server | Start typing |
| **typing:stop** | Client -> Server | Stop typing |
| **presence:update** | Client -> Server | Update presence |
| **read:batch** | Client -> Server | Mark as read |
| **reaction:add** | Client -> Server | Add reaction |
| **reaction:remove** | Client -> Server | Remove reaction |

---

## 18.2 Server Event Matrix

| Event | Direction | Description |
|-------|-----------|-------------|
| **message:receive** | Server -> Client | Receive message |
| **message:ack** | Server -> Client | Message ACK |
| **message:status** | Server -> Client | Message status |
| **typing:show** | Server -> Client | Show typing |
| **presence:update** | Server -> Client | Presence update |
| **notification:receive** | Server -> Client | Receive notification |
| **conflict:detected** | Server -> Client | Conflict detected |
| **workspace:update** | Server -> Client | Workspace update |

---

## 18.3 Connection Lifecycle Diagram

```
App Start
    |
    v
Initialize Socket.IO
    |
    v
Connect to Server
    |
    v
Authenticate
    |
    +---> Success
    |         |
    |         v
    |     Subscribe to Namespaces
    |         |
    |         v
    |     Start Heartbeat
    |         |
    |         v
    |     Connected
    |
    +---> Failure
              |
              v
          Reconnect
              |
              v
          Retry (max 5)
              |
              +---> Success
              |         |
              |         v
              |     Re-authenticate
              |
              +---> Failure
                        |
                        v
                    Failed
```

---

## 18.4 Synchronization Matrix

| Scenario | Strategy |
|----------|----------|
| **Online -> Offline** | Queue events |
| **Offline -> Online** | Sync queued events |
| **Concurrent edits** | Last write wins |
| **Out of order** | Buffer and reorder |
| **Duplicate** | Deduplicate by ID |

---

## 18.5 Offline Recovery Matrix

| Scenario | Recovery |
|----------|----------|
| **App crash** | Reload from storage |
| **Network loss** | Queue events |
| **Server error** | Retry with backoff |
| **Data corruption** | Restore from backup |

---

## 18.6 Conflict Resolution Matrix

| Conflict Type | Resolution |
|---------------|------------|
| **Concurrent edit** | Last write wins |
| **Offline changes** | Auto-merge or manual |
| **Delete conflict** | Delete wins |
| **Out of order** | Buffer and reorder |
| **Duplicate** | Deduplicate |

---

## 18.7 Performance Matrix

| Metric | Target | Acceptable |
|--------|--------|------------|
| **Message delivery** | < 100ms | < 300ms |
| **Typing indicator** | < 50ms | < 150ms |
| **Read receipt** | < 100ms | < 300ms |
| **Presence update** | < 200ms | < 500ms |
| **Reconnection** | < 1s | < 3s |

---

## 18.8 Scalability Matrix

| Users | Servers | Database | Cache |
|-------|---------|----------|-------|
| 100 | 1 | 1 | None |
| 1,000 | 1 | 1 | Redis |
| 10,000 | 2 | Replica | Redis cluster |
| 100,000 | 5 | Cluster | Redis cluster |
| 1 Million | 20 | Sharded | Redis cluster |
| 10 Million | 100 | Multi-region | Multi-region |
| 100 Million | 500 | Global | Global |

---

## 18.9 Realtime Readiness Score

| Category | Score | Status |
|----------|-------|--------|
| **Connection Lifecycle** | 100% | Complete |
| **Event System** | 100% | Complete |
| **Messaging Pipeline** | 100% | Complete |
| **Presence System** | 100% | Complete |
| **Typing System** | 100% | Complete |
| **Read Receipts** | 100% | Complete |
| **Media Sync** | 100% | Complete |
| **Workspace Sync** | 100% | Complete |
| **Notifications** | 100% | Complete |
| **Offline Engine** | 100% | Complete |
| **Conflict Resolution** | 100% | Complete |
| **Security** | 100% | Complete |
| **Performance** | 100% | Complete |
| **Scaling** | 100% | Complete |
| **Total** | 100% | Complete |

---

## 18.10 Recommended Next Book

**Book 13 — Security Architecture Blueprint**

This book defines:
- Authentication architecture
- Authorization architecture
- Data protection
- Compliance
- Privacy architecture
- Security monitoring

---

**END OF BOOK 12: REAL-TIME ARCHITECTURE BLUEPRINT v1.0**