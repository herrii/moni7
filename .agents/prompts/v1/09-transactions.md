# Sprint 09 — Transaction Management

## Objective

Implement the complete Transaction Management feature.

This sprint is responsible for recording all financial transactions.

Transactions are the heart of the Moni7 application.

All Account balances must always remain synchronized with Transactions.

Every Transaction belongs to exactly one User.

Every Transaction belongs to one Account.

Every Transaction belongs to one Category.

Do NOT implement Reports or Dashboard calculations in this sprint.

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

Included

- Transaction List
- Transaction Detail
- Create Transaction
- Edit Transaction
- Delete Transaction
- Income
- Expense
- Search
- Filter
- Infinite Scroll
- Balance Synchronization

Excluded

- Dashboard
- Reports
- Budget
- Goals
- Hutang Piutang

---

# Business Rules

Transaction Types

- Income
- Expense

Every Transaction must have

- User
- Account
- Category
- Amount
- Date
- Description

Optional

- Notes

Amount must always be stored as Integer (Rupiah).

Never store Decimal.

---

# Balance Rules

This is the most important rule.

Income

Increase Account Balance.

Expense

Decrease Account Balance.

Example

Cash

Rp100.000

↓

Expense

Rp25.000

↓

Cash

Rp75.000

Editing Transaction

Old Value

↓

Reverse Balance

↓

Apply New Value

Deleting Transaction

↓

Reverse Balance

Balance must always remain consistent.

Never calculate balance from Transaction history every time.

Balance is stored inside Account and updated by Transaction Service.

---

# Pages

Create

```

pages/

transactions/

index.vue

create.vue

[id].vue

```

Navigation

Bottom Navigation

↓

FAB

↓

Income

↓

Transaction Form

Bottom Navigation

↓

FAB

↓

Expense

↓

Transaction Form

---

# Scaffold Components

Create

```

components/

scaffold/

transaction/

TransactionCard.vue

TransactionForm.vue

TransactionList.vue

TransactionFilter.vue

TransactionSearch.vue

TransactionDetail.vue

TransactionEmptyState.vue

TransactionAmount.vue

TransactionDatePicker.vue

```

Keep components reusable within the Transaction module.

---

# Transaction List

Display

- Icon
- Category
- Description
- Date
- Amount
- Account

Income

Green

Expense

Red

Sort

Newest First

---

# Transaction Form

Fields

Transaction Type

Account

Category

Amount

Date

Description

Notes (Optional)

Buttons

Save

Cancel

Use Base Components.

---

# Category Selection

Only show

Income Categories

when Transaction Type

Income

Only show

Expense Categories

when Transaction Type

Expense

Never mix them.

---

# Amount

Store

Integer

Example

125000

Display

Rp125.000

Use Currency Helper.

Never store formatted text.

---

# Date

Default

Today

Use

Moment.js

Display format

08-Jul-2026

Store format

Timestamp

---

# Description

Required

Maximum

100 characters

---

# Notes

Optional

Maximum

500 characters

---

# Search

Search by

- Description
- Notes

Case insensitive.

---

# Filter

Provide

Account

Category

Type

Date Range

Filters should be combinable.

---

# Infinite Scroll

Transaction List must support

Infinite Scroll.

Do not use Pagination.

Load data gradually.

---

# Delete Transaction

Before deleting

Show confirmation dialog.

Deleting must automatically update

Account Balance.

---

# Edit Transaction

Editing must

Reverse old balance

↓

Apply new balance

This logic belongs inside

Transaction Service.

Never implement balance calculation inside Components.

---

# Empty State

If no Transaction exists

Show

BaseEmptyState

Action

Create Transaction

---

# Validation

Validate

Required

Transaction Type

Account

Category

Amount

Date

Description

Validate

Amount

Must be

> 0

Category must match

Transaction Type.

---

# Error Handling

Handle

Validation Error

Database Error

Balance Update Error

Display using

BaseToast.

---

# UI Direction

Follow Moni application.

Requirements

- Rounded Cards
- Soft Shadow
- Mobile First
- Clean Typography
- Comfortable Touch Area

Income

Green Accent

Expense

Red Accent

---

# Service Layer

Use only

Transaction Service

Account Service

Category Service

Never access IndexedDB directly.

---

# Deliverables

After this sprint

The application should support

- Income
- Expense
- CRUD Transaction
- Search
- Filter
- Infinite Scroll
- Balance Synchronization
- Empty State
- Validation
- Error Handling

---

# Verification

Verify

Income increases balance.

Expense decreases balance.

Edit Transaction updates balance correctly.

Delete Transaction updates balance correctly.

Search works.

Filter works.

Infinite Scroll works.

Responsive Layout works.

No TypeScript errors.

No ESLint errors.

Build succeeds.

---

# Output

At the end of implementation provide

1.

Pages created

2.

Scaffold Components created

3.

Service functions used

4.

Balance synchronization flow

5.

Validation summary

6.

Filter implementation

7.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Dashboard
- Implement Reports
- Implement Goals
- Implement Budget
- Implement Hutang Piutang

Do NOT calculate total balance inside Components.

Balance updates must always happen inside the Transaction Service.

Keep the architecture consistent with previous sprints.

This sprint is complete when Transaction Management is fully functional and Account balances remain synchronized.