# Sprint 13 — Hutang Piutang

## Objective

Implement the Hutang Piutang feature.

This feature is a standalone financial record.

It is NOT integrated with Transactions.

It does NOT affect Account Balance.

It does NOT affect Reports.

It does NOT affect Dashboard calculations.

The purpose of this feature is to help Users record debts and receivables, monitor installments, and mark them as fully paid.

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

- Loan List
- Loan Detail
- Create Loan
- Edit Loan
- Delete Loan
- Installment History
- Add Installment
- Mark as Paid (Lunas)
- Search
- Filter
- Empty State

Excluded

- Transaction
- Dashboard
- Reports
- Goals
- Budget

---

# Feature Philosophy

Hutang Piutang is a bookkeeping feature only.

It records obligations and receivables.

It never modifies

- Account Balance
- Transaction History
- Reports

It exists independently.

---

# Loan Types

Support two types

- Hutang
- Piutang

Display each type with a different badge color.

---

# Pages

Create

```
pages/

loans/

index.vue

create.vue

[id].vue
```

Navigation

```
Bottom Navigation

↓

FAB

↓

Hutang Piutang

↓

Loan Form
```

---

# Scaffold Components

Create

```
components/

scaffold/

loan/

LoanCard.vue

LoanForm.vue

LoanList.vue

LoanDetail.vue

LoanInstallmentList.vue

LoanPaymentDialog.vue

LoanStatusBadge.vue

LoanEmptyState.vue
```

---

# Loan List

Display

- Type
- Person Name
- Remaining Amount
- Due Date
- Status

Sort

Nearest Due Date first.

---

# Create Loan

Fields

- Type
- Person Name
- Amount
- Date
- Due Date (Optional)
- Description
- Notes (Optional)

Default Status

Active

---

# Edit Loan

Allow editing

- Person Name
- Due Date
- Description
- Notes

Do not allow editing the original amount after installments exist.

---

# Loan Detail

Display

- Original Amount
- Paid Amount
- Remaining Amount
- Installment History
- Status

---

# Installment

Provide button

Add Payment

Dialog fields

- Amount
- Payment Date
- Notes (Optional)

Save

Cancel

Each payment creates one Loan Payment record.

---

# Remaining Amount

Calculate

Original Amount

minus

Total Installments

Remaining amount may never become negative.

Calculation belongs inside Loan Service.

---

# Mark as Paid

Provide button

"Lunas"

When pressed

Automatically

Remaining Amount

↓

0

Status

↓

Paid

Create one final Loan Payment automatically for the remaining amount.

Ask confirmation before executing.

---

# Status

Supported statuses

- Active
- Paid
- Overdue

Rules

Paid

Remaining Amount = 0

Overdue

Due Date passed

Remaining Amount > 0

Otherwise

Active

---

# Search

Search by

- Person Name
- Description

Case insensitive.

---

# Filter

Support filtering by

- Hutang
- Piutang
- Active
- Paid
- Overdue

Filters may be combined.

---

# Empty State

If no records exist

Display

BaseEmptyState

Action

Create Loan

---

# Validation

Required

- Type
- Person Name
- Amount

Amount

Must be

> 0

Installment

Must be

> 0

Installment cannot exceed Remaining Amount.

"Lunas"

Bypasses this validation and automatically completes the remaining amount.

---

# Service Layer

Use

Loan Service

Loan Payment Service

Never access IndexedDB directly.

All calculations belong inside Services.

---

# UI Direction

Follow Moni UI.

Requirements

- Rounded Cards
- Soft Shadow
- Mobile First
- Clean Typography
- Comfortable Touch Area

Status colors

Active

Blue

Paid

Green

Overdue

Red

---

# Error Handling

Handle

- Validation Error
- Database Error
- Missing Record

Display using

BaseToast.

---

# Deliverables

After this sprint

The application should support

- Hutang
- Piutang
- CRUD Loan
- Installments
- Remaining Amount
- Mark as Paid
- Search
- Filter
- Empty State

---

# Verification

Verify

Create Loan

Edit Loan

Delete Loan

Add Installment

Mark as Paid

Remaining Amount updates correctly

Status updates correctly

Search works

Filter works

Responsive Layout

No TypeScript errors

No ESLint errors

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

Installment flow

5.

Remaining amount calculation

6.

Validation summary

7.

Important implementation notes

---

# Do NOT

Do NOT

- Create Transactions automatically
- Modify Account Balance
- Affect Dashboard totals
- Affect Reports
- Access IndexedDB directly

Hutang Piutang is a standalone bookkeeping feature.

All business logic must remain inside the Loan Service and Loan Payment Service.

Keep the implementation consistent with the Moni7 architecture.