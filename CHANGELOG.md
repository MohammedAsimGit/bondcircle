# Changelog

All notable changes to BondCircle will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- (features to be added)

### Changed

- (changes to be made)

### Deprecated

- (features to be deprecated)

### Removed

- (features to be removed)

### Fixed

- (bugs to be fixed)

### Security

- (security fixes)

---

## [0.3.0] - 2026-08-02

### Added

- Database foundation (Sprint 03)
- `packages/database` shared package with Prisma ORM
- Prisma schema with 7 models: User, Profile, Friendship, Memory, MemoryParticipant, Reminder, Session
- 5 enum types: UserStatus, FriendshipStatus, Visibility, ParticipantRole, ReminderStatus
- Database client singleton with connection management
- Seed script with development test data
- Docker Compose for local PostgreSQL 16
- Database scripts: db:generate, db:push, db:migrate, db:seed, db:studio, db:reset
- UUID v4 primary keys on all models
- Strategic indexing on foreign keys and query fields

### Changed

- Updated `turbo.json` with database pipeline tasks
- Updated root `package.json` with database convenience scripts
- Updated `.env.example` with `DATABASE_URL` and `DATABASE_DIRECT_URL`

---

## [0.2.0] - 2026-08-01

### Added

- Development environment setup (Sprint 02)
- Next.js 15 web application in `apps/web` (App Router)
- TypeScript strict mode configuration
- Tailwind CSS 3.4 with custom brand palette
- ESLint + Prettier integration
- TurboRepo pipeline configuration (build, dev, lint, typecheck, test, clean)
- Placeholder landing page: "BondCircle — Sprint 02 — Development Environment Ready"
- `outputFileTracingRoot` configured for monorepo compatibility

### Changed

- Updated `turbo.json` outputs for Next.js (`.next/**`)
- Simplified root `.eslintrc.js` to TypeScript + Prettier (React linting handled per-workspace)
- Updated `apps/web/README.md` with development instructions
- Removed React ESLint plugins from root devDependencies (moved to workspace)

---

## [0.1.0] - 2026-08-01

### Added

- Initial repository setup
- Documentation (Books 0-19)
- Repository Core Documents (RCD)
- Book 20 (Parts A-E)
- Engineering Control Center (ECC)

---

## Version History

| Version | Date       | Description                   |
| ------- | ---------- | ----------------------------- |
| 0.1.0   | 2026-08-01 | Initial repository setup      |
| 0.2.0   | 2026-08-01 | Development environment setup |
| 0.3.0   | 2026-08-02 | Database foundation           |
| 1.0.0   | TBD        | Foundation release            |
| 1.1.0   | TBD        | Friends MVP                   |
| 2.0.0   | TBD        | Friends Enhanced              |
| 3.0.0   | TBD        | Couples Mode                  |
| 4.0.0   | TBD        | Families Mode                 |
| 5.0.0   | TBD        | Platform Complete             |
