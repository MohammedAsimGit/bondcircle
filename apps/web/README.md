# apps/web

## Purpose

Main BondCircle web application — the primary user-facing interface.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Linting:** ESLint + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run typecheck
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Next.js dev server |
| `build` | Production build |
| `start` | Start production server |
| `lint` | Run ESLint |
| `lint:fix` | Run ESLint with auto-fix |
| `typecheck` | TypeScript type checking |
| `clean` | Remove build artifacts |

## Project Structure

```
app/
├── layout.tsx        # Root layout with metadata
├── page.tsx          # Landing page
└── globals.css       # Global styles + Tailwind
public/               # Static assets
next.config.ts        # Next.js configuration
tailwind.config.ts    # Tailwind CSS configuration
postcss.config.mjs    # PostCSS configuration
tsconfig.json         # TypeScript configuration
.eslintrc.json        # ESLint configuration
```

## Status

**Active** — Sprint 02 complete
