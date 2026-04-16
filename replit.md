# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### Ras Veda Masala Website (`artifacts/ras-veda-masala`)
- Premium ecommerce/brand site for Ras Veda Masala Indian spice brand
- React + Vite, frontend-only (no backend), served at `/`
- 4 main pages: Home, Our Story, Products, Contact Us
- 3 legal pages: Privacy Policy, Terms & Conditions, Refund Policy
- Uses Playfair Display + Lato fonts, brand colors (#1A6B2E green, #B5651D amber, #D4A017 gold)
- Logo from `attached_assets/` via `@assets` alias
- framer-motion for scroll animations
- WhatsApp floating button, sticky navbar

### API Server (`artifacts/api-server`)
- Express 5 backend served at `/api`
- No active routes beyond healthcheck for this project

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
