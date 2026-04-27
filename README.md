# todo-prep

A full-stack monorepo built to demonstrate proficiency with modern JavaScript/TypeScript tooling, monorepo architecture, and production-style development practices.

Built with **pnpm workspaces** and **Turborepo**, featuring two implementations of the same todo application — one in **Next.js (App Router)** and one in **Remix (React Router v7)** — sharing types and components through internal packages.

---

## Structure

```
todo-prep/
├── apps/
│   ├── todo-next/        # Next.js 14 App Router implementation
│   └── todo-remix/       # Remix / React Router v7 implementation
├── packages/
│   ├── proto/            # Shared TypeScript type definitions
│   └── ui/               # Shared React components
├── pnpm-workspace.yaml
└── turbo.json
```

### `packages/proto`

The single source of truth for all data shapes across the monorepo. Both apps import types from here — mimicking a protobuf/gRPC contract layer used in production systems. No app defines its own data types independently.

### `packages/ui`

Shared React components consumed by both apps as a workspace dependency via `@todo-prep/ui`.

---

## Apps

### `todo-next` — Next.js App Router

- Server components read data directly — no API routes needed
- Mutations via **server actions** (`"use server"`)
- `revalidatePath` for cache invalidation after mutations
- `"use client"` boundary only where interactivity is required
- Unit tests with **Vitest** + **Testing Library**
- E2E tests with **Playwright**

### `todo-remix` — Remix / React Router v7

- Data loading via **`loader`** functions (server-side, per route)
- Mutations via **`action`** functions (plain HTML form POST)
- `intent` pattern for multiple actions on a single route
- Progressive enhancement — works without JavaScript
- E2E tests with **Playwright**

---

## Key Concepts Demonstrated

**Monorepo architecture**

- `pnpm workspaces` for dependency management and cross-package linking
- `workspace:*` protocol for internal package references — no publishing required
- Turborepo for build orchestration, caching, and task pipelines
- Shared `tsconfig.base.json` extended by all packages and apps
  **TypeScript strict mode**
- `strict: true` throughout
- `noUncheckedIndexedAccess` — array access is always potentially undefined
- `exactOptionalPropertyTypes` — optional properties are treated precisely
- No `any` usage across the codebase
  **Testing strategy**
- Unit tests cover business logic in isolation (store functions)
- E2E tests cover critical user flows in the browser (add, toggle, delete)
- Tests are independent — each creates its own data with unique titles via `Date.now()`
- `beforeEach` resets page state between tests
  **Server-first data patterns**
- Next.js: server components + server actions — no client-side fetch for mutations
- Remix: loaders + actions — form submissions handled entirely on the server
- In-memory store with stubbed functions — mirrors how you'd stub server functions when an API doesn't exist yet

---

## Getting Started

### Prerequisites

- Node.js v22+
- pnpm v9+

```bash
node --version  # should be v22+
pnpm --version  # should be v9+
```

### Install

```bash
git clone https://github.com/YOUR_USERNAME/todo-prep.git
cd todo-prep
pnpm install
```

### Run both apps

```bash
pnpm dev
```

- Next.js → [http://localhost:3000](http://localhost:3000)
- Remix → [http://localhost:5173](http://localhost:5173)

### Run a single app

```bash
pnpm --filter todo-next dev
pnpm --filter todo-remix dev
```

---

## Testing

### Unit tests (both apps)

```bash
pnpm test
```

### E2E tests (per app)

```bash
# Next.js
pnpm --filter todo-next test:e2e

# Remix
pnpm --filter todo-remix test:e2e
```

### Typecheck everything

```bash
pnpm typecheck
```

---

## Why Two Frameworks?

Next.js and Remix solve the same problems differently. Building both side by side makes the tradeoffs concrete:

|                     | Next.js                                  | Remix                           |
| ------------------- | ---------------------------------------- | ------------------------------- |
| Data loading        | Server component reads directly          | `loader` function per route     |
| Mutations           | `"use server"` action + `revalidatePath` | `action` function via form POST |
| Client JS required? | For interactive components               | No — progressive enhancement    |
| Mental model        | Component tree is the router             | URL is the source of truth      |

Both share the same `@todo-prep/proto` types and `@todo-prep/ui` components — demonstrating how a shared package layer abstracts framework differences.

---

## Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Run all apps in development mode                 |
| `pnpm build`     | Build all apps and packages                      |
| `pnpm test`      | Run unit tests across all apps                   |
| `pnpm typecheck` | Run TypeScript type checking across all packages |
| `pnpm lint`      | Lint all apps and packages                       |
| `pnpm clean`     | Remove all build artifacts and node_modules      |
