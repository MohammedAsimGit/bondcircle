# Repository Core Document 06

## README — Version 1.0

| Field | Value |
|-------|-------|
| **Document Title** | Repository README |
| **Version** | 1.0 |
| **Date Created** | August 1, 2026 |
| **Date Last Updated** | August 1, 2026 |
| **Author** | BondCircle Team |
| **Status** | Complete |
| **Classification** | Repository Core Document |
| **Repository** | [github.com/MohammedAsimGit/bondcircle](https://github.com/MohammedAsimGit/bondcircle) |

---

<!-- This document serves as both the RCD-06 and the actual README.md for the repository -->

<div align="center">

# BondCircle

**Preserve Every Connection. Cherish Every Memory.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/MohammedAsimGit/bondcircle)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/MohammedAsimGit/bondcircle)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen.svg)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/next.js-14.x-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://typescriptlang.org)
[![Documentation](https://img.shields.io/badge/docs-complete-brightgreen.svg)](docs/)
[![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen.svg)](tests/)

---

**BondCircle** is a Relationship Memory Platform that helps people preserve and celebrate their friendships through intelligent memory management, meaningful interactions, and shared experiences.

[Get Started](#getting-started) · [Documentation](#documentation) · [Contributing](#contributing) · [Roadmap](#roadmap)

</div>

---

## About BondCircle

### Vision

**Become the world's most trusted platform for preserving human connections.**

In a world of shallow social interactions, BondCircle exists to help people maintain meaningful relationships by preserving the moments, conversations, and experiences that define each connection.

### Mission

**Preserve and celebrate every human connection through intelligent memory management.**

We believe friendships deserve the same care as any precious memory. BondCircle is built to help people store, celebrate, and strengthen their most important relationships.

### Why BondCircle Exists

Social media promised to connect us, but instead created shallow interactions that fade. Friendships erode in group chats and forgotten threads. BondCircle changes this by:

- **Preserving memories** that define friendships
- **Celebrating milestones** that matter
- **Deepening connections** through shared experiences
- **Respecting privacy** with a privacy-first approach

### Current Stage

**Friends Mode** — Our first product, validating core concepts and building technical foundations.

### Long-Term Vision

A global platform spanning Friends → Couples → Families → Communities → Organizations, becoming the definitive platform for preserving human connections.

---

## Core Features

### Friends Mode

| Feature | Description |
|---------|-------------|
| **Profiles** | Express your identity and connect with friends |
| **Friend System** | Build and manage friendship connections |
| **Workspaces** | Dedicated space for each friendship |
| **Real-time Chat** | Instant messaging with media sharing |
| **Media Sharing** | Photos, videos, and files in conversations |
| **Timeline** | Visualize friendship history and milestones |
| **Albums** | Organize and share collections of media |
| **Notifications** | Stay informed of important events |
| **Search** | Find content, friends, and memories quickly |
| **AI Search** | Natural language search across all content |
| **Premium** | Enhanced features for power users |

### Future Expansion

| Phase | Mode | Timeline |
|-------|------|----------|
| Phase 1 | **Friends** | Current |
| Phase 2 | **Couples** | Year 2 |
| Phase 3 | **Families** | Year 3 |
| Phase 4 | **Communities** | Year 4 |
| Phase 5 | **Organizations** | Year 5 |

---

## Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | React Framework | 14.x |
| [React](https://react.dev) | UI Library | 18.x |
| [TypeScript](https://typescriptlang.org) | Type Safety | 5.x |
| [Tailwind CSS](https://tailwindcss.com) | Styling | 3.x |
| [React Query](https://tanstack.com/query) | Server State | 5.x |
| [Zustand](https://zustand-demo.pmnd.rs) | Client State | 4.x |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| [Node.js](https://nodejs.org) | Runtime | 18.x LTS |
| [Express](https://expressjs.com) | Web Framework | 4.x |
| [TypeScript](https://typescriptlang.org) | Type Safety | 5.x |
| [Socket.IO](https://socket.io) | Real-time | 4.x |

### Database

| Technology | Purpose | Version |
|------------|---------|---------|
| [MongoDB](https://mongodb.com) | Primary Database | 7.x |
| [Mongoose](https://mongoosejs.com) | ODM | 8.x |
| [MongoDB Atlas](https://cloud.mongodb.com) | Managed Hosting | — |

### Cloud & Services

| Technology | Purpose |
|------------|---------|
| [Vercel](https://vercel.com) | Frontend Deployment |
| [Cloudinary](https://cloudinary.com) | Media Management |
| [Stripe](https://stripe.com) | Payment Processing |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |

### DevOps & Testing

| Technology | Purpose |
|------------|---------|
| [Jest](https://jestjs.io) | Unit Testing |
| [React Testing Library](https://testing-library.com) | Component Testing |
| [Cypress](https://cypress.io) | E2E Testing |
| [ESLint](https://eslint.org) | Code Linting |
| [Prettier](https://prettier.io) | Code Formatting |

---

## Repository Structure

```
bondcircle/
├── apps/
│   ├── web/                         # Next.js Frontend
│   │   ├── app/                     # App Router Pages
│   │   ├── components/              # Shared Components
│   │   ├── features/                # Feature Modules
│   │   │   ├── auth/                # Authentication
│   │   │   ├── chat/                # Real-time Chat
│   │   │   ├── friends/             # Friend System
│   │   │   ├── memories/            # Memory Management
│   │   │   ├── notifications/       # Notification System
│   │   │   ├── profile/             # User Profiles
│   │   │   ├── search/              # Search (incl. AI)
│   │   │   ├── settings/            # User Settings
│   │   │   ├── timeline/            # Timeline Feature
│   │   │   └── workspace/           # Workspace Management
│   │   ├── hooks/                   # Custom React Hooks
│   │   ├── lib/                     # Utilities & Helpers
│   │   ├── styles/                  # Global Styles
│   │   └── types/                   # TypeScript Types
│   │
│   └── api/                         # Backend API
│       ├── src/
│       │   ├── features/            # Feature Modules
│       │   │   ├── auth/            # Authentication Logic
│       │   │   ├── chat/            # Chat Services
│       │   │   ├── friends/         # Friend Logic
│       │   │   ├── memories/        # Memory Services
│       │   │   ├── media/           # Media Handling
│       │   │   ├── notifications/   # Notification Services
│       │   │   ├── search/          # Search Services
│       │   │   ├── timeline/        # Timeline Logic
│       │   │   └── users/           # User Management
│       │   ├── shared/              # Shared Utilities
│       │   │   ├── middleware/       # Express Middleware
│       │   │   ├── models/          # Mongoose Models
│       │   │   ├── services/        # Shared Services
│       │   │   └── utils/           # Utility Functions
│       │   └── config/              # Configuration
│       └── tests/                   # Backend Tests
│
├── packages/
│   ├── shared/                      # Shared Utilities
│   │   ├── src/
│   │   │   ├── constants/           # Constants
│   │   │   ├── types/               # Shared Types
│   │   │   └── utils/               # Utility Functions
│   │   └── package.json
│   ├── ui/                          # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/          # Reusable Components
│   │   │   └── styles/              # Component Styles
│   │   └── package.json
│   └── types/                       # Shared Type Definitions
│       ├── src/
│       │   ├── api/                 # API Types
│       │   ├── models/              # Model Types
│       │   └── responses/           # Response Types
│       └── package.json
│
├── docs/                            # Documentation
│   ├── books/                       # Book Documents (00-19)
│   │   ├── Book-00-Founder-Knowledge-Base/
│   │   ├── Book-01-Product-Foundation/
│   │   ├── Book-02-Market-Research/
│   │   ├── Book-03-Product-Requirements/
│   │   ├── Book-03.5-Feature-Blueprint/
│   │   ├── Book-04-UI-Blueprint/
│   │   ├── Book-05-Design-System/
│   │   ├── Book-06-UX-Blueprint/
│   │   ├── Book-07-Technology-Blueprint/
│   │   ├── Book-08-Database-Blueprint/
│   │   ├── Book-09-Backend-Architecture/
│   │   ├── Book-10-Frontend-Architecture/
│   │   ├── Book-11-API-Blueprint/
│   │   ├── Book-12-Realtime-Architecture/
│   │   ├── Book-13-Security-Architecture/
│   │   ├── Book-14-DevOps-Infrastructure/
│   │   ├── Book-15-Development-Standards/
│   │   ├── Book-16-Testing-QA/
│   │   ├── Book-17-AI-Architecture/
│   │   ├── Book-18-Analytics-Observability/
│   │   └── Book-19-Scalability/
│   └── repository-core/             # Repository Core Documents
│       ├── RCD-01-Master-Index/
│       ├── RCD-02-Architecture-ADRs/
│       ├── RCD-03-Changelog/
│       ├── RCD-04-Roadmap/
│       ├── RCD-05-Contributing/
│       └── RCD-06-README/
│
├── assets/                          # Static Assets
│   ├── images/                      # Images
│   ├── icons/                       # Icons
│   └── fonts/                       # Fonts
│
├── scripts/                         # Development Scripts
│   ├── setup.sh                     # Initial Setup
│   ├── dev.sh                       # Development Server
│   ├── build.sh                     # Production Build
│   └── test.sh                      # Run Tests
│
├── .github/                         # GitHub Configuration
│   ├── workflows/                   # GitHub Actions
│   ├── ISSUE_TEMPLATE/              # Issue Templates
│   └── PULL_REQUEST_TEMPLATE.md     # PR Template
│
├── .env.example                     # Environment Variables Template
├── .eslintrc.js                     # ESLint Configuration
├── .prettierrc                      # Prettier Configuration
├── .gitignore                       # Git Ignore Rules
├── docker-compose.yml               # Docker Development
├── package.json                     # Root Package
├── turbo.json                       # Turborepo Configuration
├── tsconfig.json                    # TypeScript Configuration
├── README.md                        # This File
├── CONTRIBUTING.md                  # Contributing Guide
├── CHANGELOG.md                     # Changelog
├── LICENSE                          # License
└── ROADMAP.md                       # Product Roadmap
```

---

## Documentation

### Books (00-19)

| Book | Title | Purpose |
|------|-------|---------|
| **Book 00** | Founder Knowledge Base | Vision, mission, core values |
| **Book 01** | Product Foundation | Product definition, features, scope |
| **Book 02** | Market Research | Market analysis, competition, positioning |
| **Book 03** | Product Requirements | Detailed PRD, MVP features |
| **Book 03.5** | Feature Blueprint | Feature specifications |
| **Book 04** | UI Blueprint | User interface design |
| **Book 05** | Design System | Design tokens, components, patterns |
| **Book 06** | UX Blueprint | User experience flows |
| **Book 07** | Technology Blueprint | Tech stack, architecture decisions |
| **Book 08** | Database Blueprint | Database design, schemas |
| **Book 09** | Backend Architecture | Backend systems, services |
| **Book 10** | Frontend Architecture | Frontend structure, patterns |
| **Book 11** | API Blueprint | API design, endpoints |
| **Book 12** | Realtime Architecture | WebSocket, real-time features |
| **Book 13** | Security Architecture | Security measures, compliance |
| **Book 14** | DevOps & Infrastructure | Deployment, CI/CD, monitoring |
| **Book 15** | Development Standards | Coding standards, conventions |
| **Book 16** | Testing & QA | Testing strategy, quality assurance |
| **Book 17** | AI Architecture | AI features, ML pipeline |
| **Book 18** | Analytics & Observability | Metrics, monitoring, analytics |
| **Book 19** | Scalability | Scaling strategy, performance |

### Repository Core Documents

| RCD | Title | Purpose |
|-----|-------|---------|
| **RCD-01** | Master Documentation Index | Central navigation for all docs |
| **RCD-02** | Architecture Decision Records | Technical decision history |
| **RCD-03** | Changelog | Release history |
| **RCD-04** | Product Roadmap | 5-year product evolution |
| **RCD-05** | Contributing Guide | How to contribute |
| **RCD-06** | README | This document |

---

## Architecture Overview

```
+------------------------------------------------------------------+
|                         CLIENTS                                   |
+------------------------------------------------------------------+
|  Web App (Next.js)  |  Mobile (PWA)  |  Future: Native Apps      |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      API LAYER                                    |
+------------------------------------------------------------------+
|  REST API  |  WebSocket (Socket.IO)  |  Future: GraphQL           |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    APPLICATION LAYER                               |
+------------------------------------------------------------------+
|  Auth  |  Friends  |  Chat  |  Media  |  Timeline  |  Search      |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      DATA LAYER                                   |
+------------------------------------------------------------------+
|  MongoDB (Primary)  |  Redis (Cache)  |  Cloudinary (Media)       |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                   INTELLIGENCE LAYER                              |
+------------------------------------------------------------------+
|  AI Search  |  Recommendations  |  Smart Memories  |  Voice AI    |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                   INFRASTRUCTURE                                  |
+------------------------------------------------------------------+
|  Vercel  |  MongoDB Atlas  |  Cloudinary  |  GitHub Actions       |
+------------------------------------------------------------------+
```

### Frontend

- **Next.js 14** with App Router for server-side rendering
- **React 18** with Server Components for performance
- **TypeScript 5** for type safety
- **Tailwind CSS 3** for styling
- **React Query 5** for server state
- **Zustand 4** for client state

### Backend

- **Node.js 18** LTS runtime
- **Express 4** web framework
- **TypeScript 5** for type safety
- **Socket.IO 4** for real-time

### Database

- **MongoDB 7** for flexible document storage
- **Mongoose 8** for schema validation
- **MongoDB Atlas** for managed hosting

### Real-time

- **Socket.IO 4** for WebSocket communication
- **Redis** for adapter (horizontal scaling)
- **Presence system** for online status

### Media

- **Cloudinary** for image/video optimization
- **CDN** for global delivery
- **Transformations** for on-the-fly optimization

### AI

- **Vector embeddings** for semantic search
- **OpenAI** for natural language processing
- **Custom models** for recommendations

---

## Getting Started

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | 18.x LTS | Runtime |
| npm | 9.x+ | Package manager |
| Git | 2.40+ | Version control |
| Docker | 24.x+ | Optional: Containers |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MohammedAsimGit/bondcircle.git
cd bondcircle

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bondcircle

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (for Premium)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# AI (Optional)
OPENAI_API_KEY=sk-xxx
```

### Running Development

```bash
# Start all services
npm run dev

# Start frontend only
npm run dev:web

# Start backend only
npm run dev:api
```

### Running Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Development Workflow

### Branching Strategy

```
main          ← Production-ready code
  │
  ├── develop ← Integration branch
  │     │
  │     ├── feature/*  ← New features
  │     ├── bugfix/*   ← Bug fixes
  │     └── docs/*     ← Documentation
  │
  └── release/* ← Release preparation
```

### Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(search): add AI-powered semantic search
fix(auth): resolve login crash on Safari
docs(api): update authentication endpoints
refactor(chat): extract message service
```

### Pull Requests

1. Create branch from `develop`
2. Make changes
3. Write tests
4. Update documentation
5. Open pull request
6. Address review feedback
7. Merge when approved

### Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Check coverage
npm run test:coverage
```

### Code Review

All pull requests require:
- At least 1 approval from core team
- All CI checks passing
- Documentation updated
- Tests written and passing

---

## Roadmap

### Current Stage

**Friends Mode MVP** — Building core features and validating product-market fit.

### Next Milestones

| Milestone | Timeline | Status |
|-----------|----------|--------|
| Friends Mode MVP | Q4 2026 | In Progress |
| Beta Launch | Q1 2027 | Planned |
| Stable Release | Q2 2027 | Planned |
| AI Search | Q3 2027 | Planned |
| Couples Mode | Q4 2027 | Planned |

### Long-Term Vision

```
Year 1: Friends Mode → Validate concept
Year 2: Couples Mode → Prove multi-mode
Year 3: Families Mode → Complex permissions
Year 4: Communities Mode → Network effects
Year 5: Organizations Mode → Enterprise
```

See [ROADMAP.md](ROADMAP.md) for complete details.

---

## Contributing

We welcome contributions from everyone! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

### How to Contribute

1. **Read the Contributing Guide** — See [CONTRIBUTING.md](CONTRIBUTING.md)
2. **Find an Issue** — Look for `good-first-issue` or `help-wanted` labels
3. **Fork the Repository** — Create your own copy
4. **Create a Branch** — Follow naming conventions
5. **Make Changes** — Follow coding standards
6. **Write Tests** — Ensure your changes work
7. **Open a Pull Request** — Follow PR template

### Quick Links

- [Contributing Guide](CONTRIBUTING.md)
- [Coding Standards](docs/books/Book-15-Development-Standards/)
- [Architecture Decisions](docs/repository-core/RCD-02-Architecture-ADRs/)
- [Changelog](CHANGELOG.md)

### Contribution Types

| Type | Difficulty | Impact |
|------|------------|--------|
| Documentation | Easy | Medium |
| Bug Fix | Easy-Medium | Medium-High |
| Feature | Medium-Hard | High |
| Architecture | Hard | Very High |

---

## Security

### Reporting Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

**Instead**, please email security@bondcircle.com with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Responsible Disclosure

We follow responsible disclosure practices:

1. Report vulnerability privately
2. Allow 48 hours for initial response
3. Work with us on fix
4. Do not disclose publicly until fix is released
5. Credit will be given in changelog

### Security Measures

- JWT authentication with refresh tokens
- CSRF protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS prevention
- Regular dependency audits

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

### Open Source Technologies

Built with love using:

- [Next.js](https://nextjs.org) — The React Framework
- [React](https://react.dev) — A JavaScript library for building user interfaces
- [TypeScript](https://typescriptlang.org) — JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com) — A utility-first CSS framework
- [MongoDB](https://mongodb.com) — The database for modern applications
- [Socket.IO](https://socket.io) — Realtime bidirectional event-based communication
- [Cloudinary](https://cloudinary.com) — Image and video management
- [Vercel](https://vercel.com) — Develop. Preview. Ship.

### Inspiration

- [Notion](https://notion.so) — For workspace organization patterns
- [Discord](https://discord.com) — For real-time communication UX
- [Spotify](https://spotify.com) — For recommendation algorithms
- [GitHub](https://github.com) — For developer experience

---

## Future Vision

```
                    +-----------------+
                    |     2026        |
                    |  Friends Mode   |
                    |  (Foundation)   |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |     2027        |
                    |  Couples Mode   |
                    |  + AI Search    |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |     2028        |
                    |  Families Mode  |
                    |  + Enterprise   |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |     2029        |
                    | Communities Mode|
                    |  + Global       |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |     2030        |
                    | Organizations   |
                    |  + Platform     |
                    +-----------------+
```

**BondCircle's journey**: From a simple friendship app to a global platform preserving every human connection.

---

## Repository Badges

| Badge | Description |
|-------|-------------|
| ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) | Current version |
| ![Build](https://img.shields.io/badge/build-passing-brightgreen.svg) | Build status |
| ![License](https://img.shields.io/badge/license-MIT-green.svg) | License type |
| ![Node](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen.svg) | Node.js version |
| ![Next.js](https://img.shields.io/badge/next.js-14.x-black.svg) | Next.js version |
| ![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg) | TypeScript version |
| ![Documentation](https://img.shields.io/badge/docs-complete-brightgreen.svg) | Documentation status |
| ![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen.svg) | Test coverage |

---

<div align="center">

**Built with care by the BondCircle Team**

[Website](https://bondcircle.com) · [Documentation](docs/) · [Twitter](https://twitter.com/bondcircle) · [Discord](https://discord.gg/bondcircle)

</div>
