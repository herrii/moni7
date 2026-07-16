# Moni7 Architecture

> Defines the project architecture, folder responsibilities, dependency flow, and implementation standards.

---

# Purpose

This document describes the complete software architecture of Moni7.

All source code must follow this architecture.

If a new implementation conflicts with this document, this document takes precedence.

---

# Architecture Philosophy

Moni7 follows a layered architecture designed specifically for:

- Offline-first applications
- AI-assisted development
- High maintainability
- Reusable UI components
- Simple business logic
- Clear separation of responsibilities

Architecture decisions prioritize readability and consistency over unnecessary abstraction.

---

# High-Level Architecture

```
┌──────────────────────────────┐
│           Pages              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Scaffold Components      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Services             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Models              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Database Helper          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        IndexedDB             │
└──────────────────────────────┘
```

---

# Layer Responsibilities

## Pages

Responsibilities

- Route entry point
- Compose Scaffold Components
- Handle page lifecycle
- Minimal UI state

Must NOT

- Access IndexedDB
- Contain business logic
- Perform CRUD operations

---

## Scaffold Components

Responsibilities

- Feature-specific UI
- User interaction
- Emit events
- Receive props

Must NOT

- Access IndexedDB
- Contain business logic

---

## Base Components

Responsibilities

Reusable UI components.

Examples

- BaseButton
- BaseInput
- BaseSelect
- BaseCard
- BaseBottomSheet
- BaseDialog

Base Components must never contain business logic.

---

## Services

Responsibilities

- Business logic
- Validation
- CRUD orchestration
- Data transformation
- Balance calculation

Services are the only layer allowed to communicate with the database helper.

---

## Models

Responsibilities

Each Model represents one IndexedDB Object Store.

A Model defines:

- Interface
- Default values
- Schema metadata

A Model must NOT contain:

- Business logic
- CRUD logic
- UI logic

---

## Database Helper

Responsibilities

- Generic CRUD
- Database initialization
- Object Store creation
- Migration
- Index management

Database Helper must not know business rules.

---

## IndexedDB

Persistent offline storage.

Only Database Helper may access IndexedDB directly.

---

# Dependency Rules

Allowed

```
Pages
    ↓
Scaffold
    ↓
Services
    ↓
Database Helper
    ↓
IndexedDB
```

Forbidden

```
Page
 ↓
IndexedDB

Component
 ↓
IndexedDB

Model
 ↓
Service

Database
 ↓
Component
```

---

# Folder Structure

```
app/

├── assets/
│
├── components/
│   ├── base/
│   └── scaffold/
│
├── composables/
│
├── config/
│
├── constants/
│
├── database/
│   ├── core/
│   ├── migrations/
│   └── seeders/
│
├── helpers/
│
├── layouts/
│
├── middleware/
│
├── models/
│
├── pages/
│
├── plugins/
│
├── public/
│
├── services/
│
├── types/
│
└── app.vue
```

---

# Folder Responsibilities

## components/base

Reusable UI components.

Never place feature-specific code here.

---

## components/scaffold

Feature-specific components.

Example

```
transaction/

goal/

loan/

profile/
```

---

## services

Business logic.

One service per domain.

Examples

```
transaction.service.ts

account.service.ts

loan.service.ts
```

---

## models

One model per object store.

Examples

```
transaction.model.ts

loan.model.ts
```

---

## helpers

Pure helper functions.

Examples

```
currency.helper.ts

date.helper.ts

csv.helper.ts
```

Helpers should never know business rules.

---

## composables

Reusable UI behavior.

Examples

```
useDialog()

useBottomSheet()

useToast()

useLoading()
```

Composables should never replace Services.

---

## config

Application configuration.

No magic values should exist outside config.

---

## constants

Enums and constant values.

No duplicated strings.

---

## database

Generic database implementation.

Contains:

- schema
- migration
- seeder
- generic CRUD

---

# Naming Convention

| Item | Convention |
|--------|------------|
| Folder | kebab-case |
| File | kebab-case |
| Database Store | snake_case |
| Database Field | snake_case |
| Model | PascalCase |
| Component | PascalCase |
| Function | camelCase |
| Helper | camelCase |
| Composable | useXxx |
| Enum | PascalCase |

---

# Import Alias

Always use alias imports.

```
@/components

@/services

@/models

@/database

@/helpers

@/constants

@/config

@/composables

@/types
```

Avoid deep relative imports whenever possible.

---

# Data Flow

```
User

↓

Page

↓

Scaffold Component

↓

Service

↓

Database Helper

↓

IndexedDB

↓

Service

↓

Component

↓

UI
```

Business logic always lives inside Service.

---

# UI Component Hierarchy

```
Page

↓

Scaffold Component

↓

Base Component
```

Example

```
pages/index.vue

↓

DashboardSummary.vue

↓

BaseCard.vue
```

---

# Business Logic Flow

```
Button Click

↓

Scaffold Component

↓

TransactionService

↓

Database Helper

↓

IndexedDB

↓

Update Account Balance

↓

Return Result

↓

Show Toast
```

---

# Error Flow

```
Database Error

↓

Service

↓

Throw Error

↓

Component

↓

Toast
```

Services throw.

UI displays.

---

# Reusability Rules

Before creating new code always check:

1. Base Component
2. Scaffold Component
3. Helper
4. Service
5. Create new implementation

---

# Architecture Principles

- Offline First
- Mobile First
- AI First
- One Responsibility Per File
- Service Layer Pattern
- Reusable Components
- Explicit Code
- Simple Architecture

---

# Architecture Checklist

Before merging a feature verify:

- Uses correct layer
- Uses Service
- Uses Base Components
- Uses Scaffold Components
- No direct IndexedDB access
- Naming convention followed
- No duplicated logic
- No unnecessary abstraction

---

# References

- AI_CONTEXT.md
- PROJECT_RULES.md
- DATABASE.md