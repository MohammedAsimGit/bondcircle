# tools/build

## Purpose

This directory contains shared build configuration and tooling.

## Current State

Build configuration is managed within each workspace:

- `apps/web/next.config.ts` — Next.js build configuration
- `apps/web/postcss.config.mjs` — PostCSS/Tailwind configuration
- Root `turbo.json` — TurboRepo pipeline orchestration

## Future Sprints

Shared build tooling (custom webpack plugins, environment-specific build scripts) will be added as additional workspaces are created.

## Status

**Active** — Per-workspace build configs; shared tooling deferred
