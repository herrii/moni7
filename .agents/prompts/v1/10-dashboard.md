# Sprint 10 — Dashboard

## Objective

Implement the Dashboard page as the application's home screen.

The Dashboard should provide a quick overview of the user's financial condition.

The Dashboard must only display information.

Do NOT move business logic into the Dashboard.

All calculations must come from the Service Layer.

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

- Dashboard
- Total Balance
- Income Summary
- Expense Summary
- Monthly Summary
- Recent Transactions
- Empty State
- Pull to Refresh (optional if supported)

Excluded

- Reports
- Goals
- Budget
- Hutang Piutang
- Charts
- Account Management
- Category Management

---

# Dashboard Overview

The Dashboard is the first page users see after opening the application.

It should provide a concise summary of their financial condition.

Do not overload the screen.

Follow the Moni application layout as closely as possible.

---

# Dashboard Layout

Recommended layout

```

Header

↓

Greeting

↓

Total Balance Card

↓

Income & Expense Summary

↓

Recent Transactions

↓

Bottom Navigation

```

Keep generous spacing between sections.

---

# Header

Display

- Greeting
- Active User Name
- Current Date

Example

```

Good Morning,

Yogi

08-Jul-2026

```

Use Moment.js for formatting.

---

# Total Balance Card

Display

Combined balance from all Accounts belonging to the active User.

Example

```

Total Balance

Rp12.500.000

```

Do not calculate manually.

Retrieve from

Account Service.

---

# Income Summary

Display

Current Month Income

Example

```

Income

Rp5.200.000

```

Use

Transaction Service.

---

# Expense Summary

Display

Current Month Expense

Example

```

Expense

Rp3.100.000

```

Use

Transaction Service.

---

# Monthly Summary

Display

Current Month

Income

Expense

Remaining Balance

Simple information only.

No charts in this sprint.

---

# Recent Transactions

Display

Latest Transactions.

Maximum

5 items.

Each item displays

- Category Icon
- Category Name
- Description
- Date
- Amount

Income

Green

Expense

Red

If more than 5 exist

Provide

"View All"

button.

Navigate to

Transaction List.

---

# Empty State

If there are no transactions

Display

BaseEmptyState

Message

"No transactions yet."

Action

Create Transaction

Pressing the action should open the existing Bottom Sheet.

---

# Refresh

Dashboard should refresh automatically after

- Creating Transaction
- Editing Transaction
- Deleting Transaction
- Switching Active User

If supported

Implement Pull To Refresh.

Otherwise

Provide a refresh mechanism through the Service Layer.

---

# Data Source

Dashboard must retrieve data only from Services.

Allowed

Account Service

Transaction Service

User Service

Forbidden

Direct IndexedDB access.

---

# UI Direction

Follow the Moni application.

Requirements

- Mobile First
- Rounded Cards
- Soft Shadow
- Comfortable Spacing
- Large Balance Card
- Clean Typography

The Dashboard should feel clean and lightweight.

---

# Responsive Design

Support

Phone

Tablet

Desktop adaptation is not required.

---

# Performance

Dashboard should load efficiently.

Avoid unnecessary Service calls.

Reuse existing helper functions whenever possible.

---

# Components

Create

```

components/

scaffold/

dashboard/

DashboardBalanceCard.vue

DashboardIncomeCard.vue

DashboardExpenseCard.vue

DashboardSummary.vue

DashboardRecentTransactions.vue

DashboardTransactionItem.vue

DashboardEmptyState.vue

```

These components belong only to Dashboard.

---

# Validation

Verify

Dashboard behaves correctly when

- No Accounts
- No Transactions
- Multiple Accounts
- Multiple Users

Never crash when data is empty.

---

# Error Handling

Handle

Database Error

Service Error

Missing Data

Display user-friendly feedback using

BaseToast

or

BaseEmptyState.

---

# Deliverables

After this sprint

Dashboard should display

- Greeting
- Active User
- Total Balance
- Monthly Income
- Monthly Expense
- Remaining Balance
- Recent Transactions
- Empty State

---

# Verification

Verify

Dashboard loads correctly.

Balance matches Account data.

Income summary is correct.

Expense summary is correct.

Recent Transactions display correctly.

Switching User refreshes Dashboard.

Responsive layout works.

No TypeScript errors.

No ESLint errors.

Project builds successfully.

---

# Output

At the end of implementation provide

1.

Pages created

2.

Scaffold Components created

3.

Services used

4.

Dashboard data flow

5.

Performance considerations

6.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Reports
- Implement Charts
- Implement Goals
- Implement Budget
- Implement Hutang Piutang
- Create new business logic
- Access IndexedDB directly

The Dashboard must only consume existing Services.

Keep all calculations inside the Service Layer.

The Dashboard should remain lightweight, responsive, and visually close to the Moni application.
