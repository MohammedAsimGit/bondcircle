# Contributing to BondCircle

Thank you for your interest in contributing to BondCircle! This document provides guidelines and information for contributors.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We expect all contributors to follow it.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, please include:

1. **Clear title** — A descriptive title for the issue
2. **Steps to reproduce** — Detailed steps to reproduce the behavior
3. **Expected behavior** — What you expected to happen
4. **Actual behavior** — What actually happened
5. **Environment** — OS, browser, version, etc.
6. **Screenshots** — If applicable

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:

1. **Clear title** — A descriptive title for the feature
2. **Problem description** — What problem does this feature solve?
3. **Proposed solution** — How should this feature work?
4. **Alternatives considered** — Any alternative solutions considered
5. **Additional context** — Any other context or screenshots

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/BC-123-amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/BC-123-amazing-feature`)
5. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 20.11.0 or higher
- npm 10.0.0 or higher
- PostgreSQL 15+ (for database)
- Redis 7+ (for caching)

### Setup

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

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Follow the existing code style
- Use strict mode
- Add types for all functions
- Avoid `any` type

### React

- Use functional components
- Use hooks for state and side effects
- Follow the existing component structure
- Add props types
- Use meaningful component names

### Git

- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Use meaningful commit messages
- Keep commits atomic
- Reference issues in commits

### Commit Messages

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
perf: performance improvement
test: add tests
build: build changes
ci: CI/CD changes
chore: maintenance
revert: revert commit
```

## Pull Request Process

1. **Create a PR** — Fill out the PR template completely
2. **Self-review** — Review your own code before requesting review
3. **Address feedback** — Respond to all review comments
4. **Get approval** — At least 1 approval required
5. **Merge** — Squash and merge after approval

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Code is commented (if needed)
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Dependent changes merged

## Documentation

- Update documentation for any feature changes
- Add comments for complex logic
- Update the README if needed
- Update the CHANGELOG

## Questions?

If you have questions about contributing, please:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with the `question` label

## Thank You!

Thank you for contributing to BondCircle! Your help is appreciated.
