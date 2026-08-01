# BondCircle

**Relationship Memory Platform** — Preserving friendships through intelligent memory management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.11.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)

## About

BondCircle is a Relationship Memory Platform that helps people preserve and nurture their friendships through intelligent memory management. We capture, organize, and intelligently surface memories with friends — from casual conversations to life milestones — ensuring no meaningful moment is lost to time.

## Our Vision

We believe friendships deserve the same care and attention we give to our most important work. BondCircle is built to help people maintain deep, meaningful connections across distance and time.

## Technology Stack

- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Node.js + TypeScript + Express
- **Database:** PostgreSQL + Redis
- **AI:** OpenAI + Custom ML models
- **Realtime:** WebSockets
- **Infrastructure:** AWS + Docker
- **Monorepo:** Turborepo

## Repository Structure

```
bondcircle/
├── apps/                    # Runnable applications
│   ├── web/                 # Web application
│   ├── mobile/              # Mobile application (Future)
│   └── admin/               # Admin dashboard (Future)
├── packages/                # Shared packages
│   ├── ui/                  # UI component library
│   ├── utils/               # Shared utilities
│   ├── types/               # TypeScript types
│   ├── config/              # Shared configuration
│   └── database/            # Database client
├── docs/                    # Documentation
│   ├── pre-development/     # Books 0-19
│   ├── repository-core/     # RCD documents
│   ├── books/               # Book 20
│   └── engineering-control-center/ # ECC
├── config/                  # Configuration files
├── scripts/                 # Automation scripts
├── assets/                  # Static assets
├── shared/                  # Shared resources
└── tools/                   # Development tools
```

## Documentation

All project documentation is available in the `docs/` directory:

- **[Books 0-19](docs/pre-development/)** — Product, architecture, and design documentation
- **[Repository Core](docs/repository-core/)** — RCD documents, changelog, roadmap
- **[Book 20](docs/books/)** — Implementation roadmap and sprint guides
- **[Engineering Control Center](docs/engineering-control-center/)** — Master operational dashboard

## Getting Started

### Prerequisites

- Node.js 20.11.0 or higher
- npm 10.0.0 or higher
- PostgreSQL 15+ (for database)
- Redis 7+ (for caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/MohammedAsimGit/bondcircle.git

# Navigate to the project
cd bondcircle

# Install dependencies
npm install

# Start development
npm run dev
```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development servers |
| `npm run build` | Build all packages |
| `npm run lint` | Lint all packages |
| `npm run typecheck` | Type check all packages |
| `npm run test` | Run all tests |
| `npm run format` | Format code with Prettier |

## Project Status

BondCircle is currently in the **Pre-Development** phase. All documentation and architecture are complete. Implementation begins with Sprint 01.

### Current Progress

- ✅ Documentation (Books 0-19)
- ✅ Architecture Design
- ✅ Sprint Planning (Book 20)
- ✅ Engineering Operations (Book 20 Part E)
- 🔄 Repository Initialization (Sprint 01)
- ⏳ Development Environment (Sprint 02)
- ⏳ Database Foundation (Sprint 03)
- ⏳ Backend Foundation (Sprint 04)
- ⏳ Frontend Foundation (Sprint 05)

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the complete project roadmap.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

Please read [SECURITY.md](SECURITY.md) for details on reporting security vulnerabilities.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Contact

- **Website:** [bondcircle.com](https://bondcircle.com)
- **Email:** hello@bondcircle.com
- **Twitter:** [@bondcircle](https://twitter.com/bondcircle)
- **GitHub:** [github.com/MohammedAsimGit/bondcircle](https://github.com/MohammedAsimGit/bondcircle)
