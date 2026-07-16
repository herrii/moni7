# Sprint 01 — Project Foundation

## Objective

Initialize the Moni7 project foundation.

This sprint only focuses on project initialization and development environment setup.

Do NOT implement any application features yet.

---

## Project Context

You are working on **Moni7**, an offline-first personal finance tracker inspired by the Moni mobile application.

This project targets mobile devices using a Progressive Web App (PWA).

The application must work completely offline after installation.

The architecture, coding rules, and database specification have already been defined.

Before writing any code, read the following documents carefully.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents are the source of truth.

Do not ignore them.

---

## Scope

Only initialize the project.

This sprint must NOT implement:

- Dashboard
- Transaction
- Report
- Goal
- Hutang Piutang
- Profile
- Database CRUD
- Service Layer
- Business Logic

---

## Tech Stack

Use exactly these technologies.

Framework

- Nuxt 4

Language

- TypeScript

Package Manager

- Yarn

CSS

- TailwindCSS

Icons

- FontAwesome

Chart

- Chart.js

Date

- Moment.js

PWA

- @vite-pwa/nuxt

Database

- Native IndexedDB

Do not install additional libraries unless required by Nuxt.

---

## Project Structure

Create the project folder structure according to ARCHITECTURE.md.

Do not implement the file contents yet.

Only prepare the folders.

Required folders include:

```

app/

components/

base/

scaffold/

composables/

config/

constants/

database/

core/

migrations/

seeders/

helpers/

layouts/

middleware/

models/

pages/

plugins/

services/

types/

public/

assets/

```

---

## Configure

Configure the following.

- TypeScript
- TailwindCSS
- ESLint
- Prettier
- FontAwesome
- Chart.js
- Moment.js
- Alias Import
- PWA
- Nuxt Config

Use clean configuration.

Avoid unnecessary complexity.

---

## PWA Requirements

Configure the application as installable PWA.

Minimum requirements:

- Manifest
- Icons placeholder
- Theme Color
- Background Color
- Offline capability
- Service Worker

Do not implement offline caching strategy yet.

Only initialize the PWA plugin correctly.

---

## Coding Rules

Follow all rules from SKILLS.md.

Especially:

- Mobile First
- Service Layer Pattern
- Base Components
- Scaffold Components
- No direct IndexedDB access
- Reusable architecture

---

## Deliverables

After this sprint, the project should have:

- Working Nuxt project
- Tailwind configured
- FontAwesome configured
- Chart.js installed
- Moment.js installed
- PWA configured
- Folder structure ready
- TypeScript ready
- ESLint ready
- Prettier ready

---

## Verification

Before finishing:

Verify that

- Project starts successfully

```
yarn dev
```

works.

Verify

```
yarn lint
```

passes.

Verify

```
yarn build
```

passes.

Verify PWA plugin builds correctly.

---

## Output

At the end of your implementation, provide:

1. Installed packages

2. Folder structure created

3. Configuration files created

4. Files modified

5. Important implementation notes

---

## Do NOT

Do NOT

- Create pages
- Create components
- Create services
- Create models
- Create database schema
- Create transactions
- Create reports
- Create goals
- Create profile page

Only initialize the project foundation.

This sprint ends once the development environment is fully ready.