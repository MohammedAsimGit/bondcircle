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

- Node.js 20.11.0 or higher (`cat .nvmrc` to confirm)
- npm 10.0.0 or higher
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/MohammedAsimGit/bondcircle.git

# Navigate to the project
cd bondcircle

# Install dependencies
npm install

# Start the development server
npm run dev
```

The web application will be available at [http://localhost:3000](http://localhost:3000).

### Developer Onboarding

**Step 1 — Clone and install**

```bash
git clone https://github.com/MohammedAsimGit/bondcircle.git
cd bondcircle
npm install
```

**Step 2 — Start developing**

```bash
npm run dev      # Start Next.js dev server at localhost:3000
```

**Step 3 — Before committing**

```bash
npm run lint     # Check for lint errors
npm run build    # Verify production build succeeds
```

The pre-commit hook runs `lint-staged` automatically, formatting and linting staged files.

### Available Scripts

| Script              | Description               |
| ------------------- | ------------------------- |
| `npm run dev`       | Start development servers |
| `npm run build`     | Build all packages        |
| `npm run lint`      | Lint all packages         |
| `npm run typecheck` | Type check all packages   |
| `npm run test`      | Run all tests             |
| `npm run format`    | Format code with Prettier |
| `npm run clean`     | Remove build artifacts    |

## Project Status

BondCircle is currently in the **Foundation** phase. Development environment is fully configured.

### Current Progress

- ✅ Documentation (Books 0-19)
- ✅ Architecture Design
- ✅ Sprint Planning (Book 20)
- ✅ Engineering Operations (Book 20 Part E)
- ✅ Engineering Control Center (ECC)
- ✅ Repository Initialization (Sprint 01)
- ✅ Development Environment (Sprint 02)
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
