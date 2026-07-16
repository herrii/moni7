# Sprint 11 — Reports

## Objective

Implement the Reports feature.

This sprint provides financial insights based on existing Transactions.

Reports are read-only.

Users cannot edit Transactions from this page.

All calculations must come from the Service Layer.

Use Chart.js for visualization.

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

- Monthly Summary
- Income vs Expense
- Expense by Category
- Cash Flow Trend
- Period Filter
- Report Cards
- Charts
- Empty State

Excluded

- Dashboard
- Goals
- Budget
- Hutang Piutang
- Transaction CRUD

---

# Report Philosophy

Reports are generated entirely from existing Transactions.

Never duplicate transaction data.

Never store report data inside IndexedDB.

Reports should always be generated from Services.

---

# Pages

Create

```
pages/

reports/

index.vue
```

This page is opened from the Bottom Navigation.

---

# Layout

Recommended layout

```
Header

↓

Period Selector

↓

Summary Cards

↓

Income vs Expense Chart

↓

Expense by Category Chart

↓

Cash Flow Chart

↓

Top Categories

```

Follow the Moni visual style.

---

# Period Filter

Provide period selector.

Options

- This Month
- Last Month
- Last 3 Months
- Last 6 Months
- This Year
- Custom Range

Changing period should refresh every chart.

---

# Summary Cards

Display

- Total Income
- Total Expense
- Net Balance
- Total Transactions

All values must come from Transaction Service.

---

# Income vs Expense Chart

Use

Chart.js

Type

Doughnut Chart

Display

Income

Expense

Use application theme colors.

---

# Expense by Category

Use

Chart.js

Type

Pie Chart

Display

Expense grouped by Category.

Sort by highest amount.

Maximum

8 categories.

Group remaining into

"Others"

---

# Cash Flow Trend

Use

Chart.js

Type

Line Chart

Display

Daily cash flow for selected period.

X Axis

Date

Y Axis

Amount

---

# Top Categories

Display

Top spending categories.

Show

- Category Icon
- Category Name
- Total Amount
- Percentage

Maximum

5 items.

---

# Empty State

If no Transactions exist

Display

BaseEmptyState

Message

"No report data available."

Action

Create Transaction

---

# Components

Create

```
components/

scaffold/

reports/

ReportSummaryCard.vue

IncomeExpenseChart.vue

ExpenseCategoryChart.vue

CashFlowChart.vue

TopCategoryList.vue

ReportFilter.vue

ReportEmptyState.vue
```

---

# Chart Rules

Use

Chart.js

Requirements

- Responsive
- Mobile Friendly
- Smooth Resize
- Destroy old chart before creating a new one
- Do not leak memory

Wrap Chart.js inside reusable Vue components.

---

# Colors

Use theme colors only.

Do not hardcode colors inside charts.

Centralize chart palette configuration.

---

# Service Layer

Retrieve data only from

Transaction Service

Account Service

User Service

Never access IndexedDB directly.

If report aggregation is missing,

extend the Service Layer.

---

# Performance

Avoid recalculating identical reports.

Reuse helper functions.

Generate only data needed for the selected period.

---

# Validation

Verify

- No Transactions
- One Transaction
- Large Dataset
- Multiple Accounts
- Multiple Users

Reports should always reflect the active User.

---

# Error Handling

Handle

- Database Error
- Service Error
- Empty Data

Display feedback using

BaseToast

or

BaseEmptyState.

---

# Deliverables

After this sprint

The application should provide

- Financial Summary
- Income vs Expense Chart
- Expense Category Chart
- Cash Flow Trend
- Period Filter
- Top Categories
- Empty State

---

# Verification

Verify

Period Filter works.

Charts update correctly.

Summary matches Transaction data.

Reports refresh after Transaction changes.

Responsive layout works.

Charts render correctly on mobile.

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

Charts implemented

4.

Services used

5.

Report calculation flow

6.

Performance considerations

7.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Transaction CRUD
- Implement Dashboard
- Implement Goals
- Implement Budget
- Implement Hutang Piutang
- Store report results inside IndexedDB

Reports must always be generated dynamically from the existing Service Layer.

Keep the implementation lightweight, responsive, and visually close to the Moni application.