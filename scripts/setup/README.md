# scripts/setup

## Purpose

This directory contains setup automation scripts for development environment initialization.

## Current State

Development setup is currently handled via standard npm workflows:

```bash
git clone https://github.com/MohammedAsimGit/bondcircle.git
cd bondcircle
npm install
npm run dev
```

## Future Sprints

Automated setup scripts will be added when the project requires environment-specific provisioning (database seeding, service initialization, etc.).

## Status

**Active** — Manual setup via npm; scripts deferred to future sprints
