# Contributing to MyGuy Logistics

Thanks for your interest in contributing! This project is a React + TypeScript admin dashboard for a vendor-and-rider delivery operation, and contributions of all sizes — bug fixes, new features, docs, refactors — are welcome.

## Before You Start

- **Small fixes** (typos, small bugs, minor styling issues): feel free to open a pull request directly.
- **Larger changes** (new features, architectural changes, dependency upgrades): please open an issue first to discuss the approach before investing time in a PR. This avoids duplicate work and mismatched expectations.

## Getting Started

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/myguyproject.git
   cd myguyproject
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a branch** for your change:
   ```bash
   git checkout -b feature/short-description
   ```
   Use a prefix that describes the change type: `feature/`, `fix/`, `docs/`, `refactor/`.

4. **Run the dev server** while you work:
   ```bash
   npm run dev
   ```

## Making Changes

- Keep pull requests focused — one feature or fix per PR is easier to review than a bundle of unrelated changes.
- Follow the existing project structure: page-level components live in `src/Pages/`, shared UI in `src/Pages/Component/`.
- Match the existing TypeScript conventions already used in the codebase (explicit prop types, typed data models for records like vendors/riders/orders).
- If you add a new route, wire it up in both `src/App.tsx` and `src/Pages/Component/navigation.ts` so it appears in navigation consistently.

## Before Submitting a Pull Request

Run the linter and make sure the project still builds:

```bash
npm run lint
npm run build
```

Please also:
- Test your change manually in the browser (`npm run dev`) across at least one desktop and one mobile viewport width, since the dashboard is designed mobile-first.
- Update the `README.md` if your change affects setup, scripts, routes, or features.

## Submitting Your Pull Request

1. Push your branch to your fork.
2. Open a pull request against the `main` branch of this repository.
3. Fill in a clear description: what the change does, why it's needed, and how you tested it. Link any related issue.
4. Be responsive to review feedback — small follow-up commits are totally fine.

## Reporting Bugs

When filing an issue, please include:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS and screen size, if UI-related
- Screenshots, if helpful

## Code of Conduct

Be respectful and constructive. This project welcomes contributors of all experience levels — questions and first-time PRs are encouraged.

## Questions?

Open an issue with the `question` label, or check the [README](./README.md) for project context first.
