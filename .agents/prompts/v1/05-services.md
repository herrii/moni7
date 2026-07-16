# Sprint 05 — Service Layer

## Objective

Implement the complete Service Layer for Moni7.

This sprint is responsible for implementing all business services that communicate with the IndexedDB Helper created in Sprint 04.

Services are the only layer allowed to access the Database Helper.

No Page, Component, or other layer should communicate directly with IndexedDB.

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

Only implement the Service Layer.

Included

- User Service
- Account Service
- Category Service
- Transaction Service
- Goal Service
- Loan Service
- Loan Payment Service
- CSV Service

Excluded

- Pages
- Components
- Dashboard
- Reports
- Forms
- Charts
- Navigation
- UI

---

# Architecture Rules

The architecture must follow this flow.

```

Page

↓

Scaffold Component

↓

Service

↓

IndexedDB Helper

↓

IndexedDB

```

Never bypass the Service Layer.

Forbidden

```

Page

↓

IndexedDB Helper

```

Forbidden

```

Component

↓

IndexedDB

```

Only Services may communicate with the Database Helper.

---

# Folder Structure

Create the following structure.

```

services/

user.service.ts

account.service.ts

category.service.ts

transaction.service.ts

goal.service.ts

loan.service.ts

loan-payment.service.ts

csv.service.ts

```

One file for each service.

---

# Service Philosophy

Each Service is responsible for one domain only.

Example

```

TransactionService

↓

Create Transaction

Update Transaction

Delete Transaction

Find Transaction

Search Transaction

Filter Transaction

```

Do not mix responsibilities.

Bad Example

```

TransactionService

↓

Transaction

↓

Category

↓

Goal

↓

Loan

```

Good Example

Each domain has its own Service.

---

# Function Style

Use function-based services.

Example

```ts
export async function createTransaction()

export async function updateTransaction()

export async function deleteTransaction()

export async function findTransactionById()

export async function getTransactions()
```

Do not use Class-based Services.

---

# CRUD Functions

Every Service should implement the complete CRUD operations.

Minimum functions

Create

Read

Update

Delete

Find By ID

List

Search

Filter (if applicable)

Count (if applicable)

Exists (if applicable)

Keep function names simple and descriptive.

---

# User Service

Responsibilities

- Create User
- Update User
- Delete User
- Find User
- Get Active User
- Set Active User
- List Users

Do not implement authentication.

---

# Account Service

Responsibilities

- CRUD Account
- Update Balance
- Get Total Balance
- Default Account
- Find Account

Balance calculation belongs here.

---

# Category Service

Responsibilities

- CRUD Category
- Income Categories
- Expense Categories
- Seeder Support

---

# Transaction Service

Responsibilities

- CRUD Transaction
- Search
- Filter
- Pagination
- Infinite Scroll Support
- Update Account Balance

Transaction Service is responsible for updating Account balances.

No UI code.

---

# Goal Service

Responsibilities

- CRUD Goal
- Goal Progress
- Goal Completion

---

# Loan Service

Responsibilities

- CRUD Loan
- Remaining Amount
- Loan Status
- Installment Support

Loan does NOT affect Account Balance.

---

# Loan Payment Service

Responsibilities

- Add Payment
- Delete Payment
- Update Payment
- Get Payment History
- Mark Loan as Paid ("Lunas")

Automatically update

- Remaining Amount
- Loan Status

Do not modify Account Balance.

---

# CSV Service

Responsibilities

Export

- Transactions
- Accounts

Import

- Transactions

Requirements

Use CSV only.

No Excel library.

No external dependency.

---

# Validation

Basic validation belongs inside the Service.

Examples

- Required Field
- Positive Amount
- Existing Account
- Existing Category
- Existing User

Do not perform UI validation here.

---

# Error Handling

Every Service should throw meaningful errors.

Avoid silent failures.

Handle

- Database Error
- Validation Error
- Missing Record
- Duplicate Data

---

# Return Values

Use consistent return values.

Avoid returning different structures for similar operations.

Prefer explicit objects over primitive values when additional metadata may be needed.

---

# TypeScript

Everything must be strongly typed.

Avoid

```
any
```

Use the Models created in Sprint 04.

---

# Coding Rules

Follow

- Single Responsibility Principle
- Explicit Functions
- Small Functions
- Readable Code
- No Duplicate Logic

Move reusable logic into helper functions when appropriate.

---

# Deliverables

After this sprint the project should contain

Services

- User Service
- Account Service
- Category Service
- Transaction Service
- Goal Service
- Loan Service
- Loan Payment Service
- CSV Service

CRUD operations

Validation

Error handling

Database communication

---

# Verification

Verify

All Services compile successfully.

CRUD operations work.

Database Helper is used correctly.

No direct IndexedDB access outside Services.

No duplicated business logic.

No TypeScript errors.

No ESLint errors.

Project builds successfully.

---

# Output

At the end of implementation provide

1. Services created

2. Public functions of each Service

3. Shared helper functions used

4. Validation summary

5. Error handling summary

6. CSV capabilities

7. Important implementation notes

---

# Do NOT

Do NOT

- Create Pages
- Create Components
- Create Dashboard
- Create Reports
- Create Charts
- Create Forms
- Create Navigation
- Create Profile UI

Do NOT access IndexedDB outside the Service Layer.

Do NOT implement feature-specific UI.

This sprint is complete when the entire Service Layer is ready to be consumed by future UI and Scaffold Components.