# Moni7 Engineering Handbook (SKILLS.md)

> Primary instruction file for AI coding agents.

---

# Before You Start

Always read the following documents in order:

1. AI_CONTEXT.md
2. PROJECT_RULES.md
3. ARCHITECTURE.md
4. DATABASE.md

Never skip them.

---

# Tech Stack

| Item | Technology |
|------|------------|
| Framework | Nuxt 4 |
| Language | TypeScript |
| Styling | TailwindCSS |
| Database | Native IndexedDB |
| Icons | FontAwesome |
| Charts | Chart.js |
| Date | Moment.js |
| PWA | @vite-pwa/nuxt |
| Package Manager | Yarn |

---

# Architecture

Always follow this layer.

```

Pages

↓

Scaffold Components

↓

Services

↓

Models

↓

Database Helper

↓

IndexedDB

```

Never bypass this layer.

---

# Folder Rules

| Folder | Responsibility |
|----------|----------------|
| pages | Route only |
| components/base | Generic reusable UI |
| components/scaffold | Feature-specific UI |
| services | Business logic |
| models | Database schema |
| helpers | Pure utility functions |
| composables | UI logic |
| database | IndexedDB implementation |
| config | Application configuration |
| constants | Constant values |

---

# Component Rules

Always prefer:

Base Component

↓

Scaffold Component

↓

Page

Never place business logic inside components.

---

# Service Rules

Every business domain has one service.

Example

```

transaction.service.ts

loan.service.ts

account.service.ts

```

Services are responsible for:

- CRUD
- Validation
- Business Rules
- Balance Update
- Data Transformation

---

# Model Rules

One Model = One Object Store.

Models only define:

- Interface
- Default Values
- Metadata

Never write business logic inside Models.

---

# Database Rules

- Native IndexedDB only
- Auto Increment ID
- snake_case fields
- Integer currency
- Unix Timestamp
- Hard Delete
- Version Migration

Never access IndexedDB directly outside Database Helper.

---

# Naming Convention

| Item | Convention |
|------|------------|
| Folder | kebab-case |
| File | kebab-case |
| Store | snake_case |
| Field | snake_case |
| Model | PascalCase |
| Component | PascalCase |
| Function | camelCase |
| Helper | camelCase |
| Composable | useXxx |

---

# UI Rules

UI direction is inspired by Moni.

Requirements:

- Mobile First
- Rounded Corner
- Soft Shadow
- Smooth Animation
- Bottom Navigation
- Center FAB
- Bottom Sheet
- Consistent Spacing

---

# Reuse Rules

Before creating anything new:

1. Check Base Components
2. Check Scaffold Components
3. Check Helpers
4. Check Services

Only create new code if none exists.

---

# Do ✅

- Keep files small
- Keep functions focused
- Prefer explicit code
- Use configuration
- Use helper functions
- Reuse components
- Keep naming consistent

---

# Don't ❌

- Don't over engineer
- Don't duplicate code
- Don't access IndexedDB directly
- Don't add unnecessary packages
- Don't mix UI with business logic
- Don't create generic "utils" folder
- Don't rename existing folders

---

# Definition of Done

A feature is complete when:

- UI implemented
- Mobile responsive
- Uses Base Components
- Uses Scaffold Components
- Uses Service Layer
- No direct IndexedDB access
- Uses helper functions
- TypeScript passes
- Linter passes
- Naming convention followed

---

# Final Rule

If there are multiple possible implementations:

Choose the simplest.

Prefer consistency over cleverness.

Never change the project architecture without explicit instruction.