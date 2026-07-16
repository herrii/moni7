# Moni7 Database

> Defines the complete IndexedDB architecture, object stores, data models, relationships, and database conventions used by Moni7.

---

# Purpose

This document defines the complete database specification of Moni7.

Every business entity must be represented by a Model.

Every Model maps directly to one IndexedDB Object Store.

Business logic must never be implemented inside Models.

---

# Database Philosophy

Moni7 uses the browser's native IndexedDB as the only persistent storage.

Design principles:

- Offline First
- Simple Schema
- Explicit Relationships
- Native IndexedDB Only
- Auto Increment Primary Key
- Hard Delete
- Integer Currency
- Database Version Migration

---

# Database Engine

Storage

Native IndexedDB

Library

None

Primary Key

Auto Increment Integer

Migration

IndexedDB Version

Seeder

Manual Seeder

Money

Integer (IDR)

Date Storage

Unix Timestamp (milliseconds)

Date Display

Moment.js

---

# Object Stores

Moni7 contains the following Object Stores.

| Store | Purpose |
|--------|----------|
| users | Application users |
| accounts | User accounts (Cash, Bank, E-Wallet, etc.) |
| categories | Income & Expense categories |
| transactions | Income & Expense records |
| goals | Financial goals |
| loans | Debt / Receivable records |
| loan_payments | Installment history |

---

# Store Relationship

```
User
│
├── Accounts
│
├── Categories
│
├── Transactions
│
├── Goals
│
└── Loans
      │
      └── Loan Payments
```

---

# Model Convention

Each Object Store must have exactly one Model.

Example

```
users
↓

UserModel
```

Models define:

- Interface
- Default Values
- Field Metadata

Models never contain:

- CRUD
- Validation
- Business Logic
- UI Logic

---

# Common Fields

Every Object Store should contain the following fields whenever applicable.

| Field | Type |
|--------|------|
| id | number |
| created_at | number |
| updated_at | number |

Timestamp uses Unix milliseconds.

---

# users

## Purpose

Represents an application user.

Each user owns their own accounts, categories, transactions, goals and loans.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| name | string |
| created_at | number |
| updated_at | number |

---

### Relationships

```
User

↓

Accounts

↓

Transactions

↓

Goals

↓

Loans
```

---

# accounts

## Purpose

Represents a financial account.

Examples:

- Cash
- Mandiri
- Blu BCA
- DANA
- GoPay

Balance is stored here.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| user_id | number |
| name | string |
| icon | string |
| color | string |
| balance | number |
| is_default | boolean |
| created_at | number |
| updated_at | number |

---

### Business Rules

- Balance stored as integer.
- Default account created during seeding.
- First account is "Cash".

---

# categories

## Purpose

Transaction category.

Each user owns their own categories.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| user_id | number |
| type | income / expense |
| name | string |
| icon | string |
| color | string |
| created_at | number |
| updated_at | number |

---

### Seeder

Default categories may be created manually from Settings.

---

# transactions

## Purpose

Represents income or expense.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| user_id | number |
| account_id | number |
| category_id | number |
| type | income / expense |
| amount | number |
| description | string |
| transaction_date | number |
| created_at | number |
| updated_at | number |

---

### Business Rules

Income

```
balance += amount
```

Expense

```
balance -= amount
```

Updating a transaction must rollback previous balance before applying the new value.

Deleting a transaction must rollback account balance.

---

# goals

## Purpose

Financial target.

Example

Buy Laptop

Rp15.000.000

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| user_id | number |
| title | string |
| target_amount | number |
| current_amount | number |
| target_date | number |
| completed | boolean |
| created_at | number |
| updated_at | number |

---

### Business Rules

Goal never changes account balance.

Goal is only a target tracker.

---

# loans

## Purpose

Debt and receivable records.

Loans are NOT integrated into transactions.

Loans do NOT affect account balance.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| user_id | number |
| type | debt / receivable |
| name | string |
| total_amount | number |
| paid_amount | number |
| remaining_amount | number |
| description | string |
| loan_date | number |
| due_date | number |
| status | active / paid |
| created_at | number |
| updated_at | number |

---

### Business Rules

Loan balance calculated as

```
remaining = total - paid
```

---

# loan_payments

## Purpose

Installment history.

---

### Fields

| Field | Type |
|--------|------|
| id | number |
| loan_id | number |
| amount | number |
| payment_date | number |
| note | string |
| created_at | number |

---

### Business Rules

Adding payment

```
paid += payment

remaining -= payment
```

"Lunas"

```
payment = remaining
status = paid
```

---

# Index Strategy

Recommended indexes

Users

- name

Accounts

- user_id

Categories

- user_id
- type

Transactions

- user_id
- account_id
- category_id
- transaction_date

Goals

- user_id

Loans

- user_id
- status

Loan Payments

- loan_id

---

# CRUD Convention

Only Services may perform CRUD.

Flow

```
Page

↓

Service

↓

Database Helper

↓

IndexedDB
```

---

# Balance Calculation

Only Account stores balance.

Balance is updated immediately after:

- Create Transaction
- Update Transaction
- Delete Transaction

Dashboard balance is calculated from Accounts.

Never calculate balance from transactions during page load.

---

# Seeder

Seeder execution is manual.

Accessible from

Profile

↓

Settings

↓

Initialize Default Data

Seeder creates

- Cash Account
- Default Categories

Seeder never overwrites existing user data.

---

# CSV

Supported

Export

- Accounts
- Transactions

Import

- Transactions

CSV uses UTF-8.

Currency exported as integer.

---

# Migration

Migration uses IndexedDB Version.

Every schema change requires

- Database version increment
- Migration file

Never modify existing schema directly.

---

# Database Checklist

Before adding a new Object Store:

- Has corresponding Model
- Has Service
- Has Migration
- Has CRUD
- Has Index
- Has Seeder (if necessary)

---

# References

- AI_CONTEXT.md
- PROJECT_RULES.md
- ARCHITECTURE.md