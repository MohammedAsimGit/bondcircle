# config/env

## Purpose

This directory contains environment variable templates for different deployment environments.

## Contents

Environment files are currently managed at the repository root:

- `.env` — Local development environment (not committed)
- `.env.example` — Template with placeholder values

## Future Sprints

Per-environment templates (`.env.development`, `.env.staging`, `.env.production`) will be added when deployment pipelines are configured.

## Status

**Active** — Root-level env management via `.env.example`
