# Sprint 04 — Database Foundation

## Objective

Implement the complete IndexedDB foundation for Moni7.

This sprint only builds the database infrastructure.

Do NOT implement any business logic, CRUD operations, or application features.

The goal of this sprint is to prepare a reusable database layer that will be used by all Services in later sprints.

---

## Project Context

Before writing any code, carefully read the following documents.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents are the source of truth.

---

## Scope

Only implement the database foundation.

Included

- Database Initialization
- IndexedDB Helper
- Database Configuration
- Database Version Management
- Migration System
- Seeder System
- Model Declaration
- Generic Database Utilities

Excluded

- Services
- CRUD Business Logic
- Dashboard
- Transactions
- Reports
- Goals
- Hutang Piutang
- User Interface

---

# Database Requirements

Use

Native IndexedDB

Do NOT install any IndexedDB library.

Examples of forbidden libraries

- Dexie
- idb
- localForage

Everything must be implemented using the browser native IndexedDB API.

---

# Folder Structure

Create the following structure.

```

database/

core/

database.ts
connection.ts
migration.ts

migrations/

v1.ts

seeders/

default-user.ts
default-account.ts
default-category.ts

helpers/

indexed-db.helper.ts

models/

user.model.ts
account.model.ts
category.model.ts
transaction.model.ts
goal.model.ts
loan.model.ts
loan-payment.model.ts

```

Follow the architecture exactly.

---

# Database Helper

Create a reusable helper.

Responsibilities

- Open database
- Close database
- Database versioning
- Create object stores
- Create indexes

The helper should not contain business logic.

---

# Database Configuration

Create one configuration file.

Example responsibilities

- Database Name
- Database Version
- Store Names

Avoid magic strings throughout the project.

---

# Migration System

Implement a migration mechanism.

Requirements

- Version based
- Easy to extend
- One migration per version

Example

```

Version 1

↓

Create Object Stores

Version 2

↓

Add New Store

Version 3

↓

Add New Index

```

Never modify previous migrations.

Always create a new migration.

---

# Object Stores

Create Object Stores according to DATABASE.md.

Stores

- users
- accounts
- categories
- transactions
- goals
- loans
- loan_payments

Primary Key

- Auto Increment Integer

---

# Indexes

Create indexes according to DATABASE.md.

Do not invent new indexes.

Follow the database specification exactly.

---

# Models

Each Object Store must have exactly one Model.

Models only declare

- Interface
- Default Values
- Store Metadata

Do NOT implement

- CRUD
- Validation
- Business Logic

---

# Seeder

Prepare Seeder infrastructure.

Seeders should not run automatically.

Create

- Default User Seeder
- Default Account Seeder
- Default Category Seeder

Seeder execution will be implemented later.

---

# Database Helper Functions

Prepare generic helper functions.

Suggested functions

```

openDatabase()

closeDatabase()

deleteDatabase()

createStore()

createIndexes()

runMigration()

runSeeder()

```

Only infrastructure.

No CRUD functions yet.

---

# Error Handling

Database helper should

- Handle database open failure
- Handle upgrade failure
- Handle migration failure

Provide meaningful error messages.

---

# TypeScript

All database-related code must be fully typed.

Avoid using

```

any

```

whenever possible.

---

# Coding Rules

Follow

- Service Layer Pattern
- Single Responsibility Principle
- Explicit Code
- Reusable Helper

Keep functions focused.

---

# Deliverables

After this sprint the project should contain

Database

- Initialization
- Connection
- Migration
- Seeder

Models

- User
- Account
- Category
- Transaction
- Goal
- Loan
- Loan Payment

Helper

- IndexedDB Helper

Configuration

- Database Config

---

# Verification

Verify

Database opens successfully.

Database version upgrades successfully.

All Object Stores created.

Indexes created.

Migration executes correctly.

Seeder infrastructure ready.

No TypeScript errors.

No ESLint errors.

Project builds successfully.

---

# Output

At the end of implementation provide

1.

Database folder structure

2.

Object Stores created

3.

Indexes created

4.

Models created

5.

Migration summary

6.

Seeder summary

7.

Helper functions created

8.

Important implementation notes

---

# Do NOT

Do NOT

- Create Services
- Create CRUD
- Create Transaction Logic
- Create Dashboard
- Create Report
- Create Goal Logic
- Create Hutang Piutang Logic
- Create UI Components
- Create Pages

This sprint only prepares the database infrastructure.

All CRUD operations will be implemented in Sprint 05 using the Service Layer.

The architecture must remain exactly as defined in ARCHITECTURE.md.