# tools/linting

## Purpose

This directory contains shared linting configuration and custom rules.

## Current State

Linting configuration is managed at two levels:

- **Root:** `.eslintrc.js`, `.prettierrc`, `.eslintignore`, `.prettierignore` — TypeScript + Prettier baseline
- **Per-workspace:** `apps/web/.eslintrc.json` — React + Hooks + TypeScript + Prettier

## Future Sprints

Custom ESLint rules, shared linting presets, and stylelint configuration will be added as the codebase grows.

## Status

**Active** — Root + workspace linting configured; shared presets deferred
