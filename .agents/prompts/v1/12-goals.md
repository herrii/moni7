# Sprint 12 — Goal Management

## Objective

Implement the Goal Management feature.

A Goal represents a financial target that the User wants to achieve.

Examples

- Buy a Laptop
- Emergency Fund
- Vacation
- New Motorcycle
- House Down Payment

Goals are informational.

They do NOT automatically reserve money.

They do NOT affect Account Balance.

They do NOT modify Transactions.

Progress is calculated from Goal Contributions.

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

- Goal List
- Goal Detail
- Create Goal
- Edit Goal
- Delete Goal
- Goal Contribution
- Goal Progress
- Goal Completion
- Search
- Empty State

Excluded

- Budget
- Reports
- Hutang Piutang
- Dashboard
- Transaction CRUD

---

# Goal Philosophy

Goals are personal financial targets.

A Goal only stores

- Target Amount
- Current Progress
- Target Date (Optional)

Money is not automatically moved.

Users manually record Goal Contributions.

Goal Contributions do NOT create Transactions.

Goal Contributions do NOT modify Account Balance.

---

# Pages

Create

```
pages/

goals/

index.vue

create.vue

[id].vue
```

This page is opened from Bottom Navigation.

---

# Layout

Recommended

```
Header

↓

Goal Summary

↓

Goal List

↓

FAB

↓

Create Goal
```

Follow Moni UI.

---

# Scaffold Components

Create

```
components/

scaffold/

goal/

GoalCard.vue

GoalForm.vue

GoalList.vue

GoalProgress.vue

GoalContributionDialog.vue

GoalDetail.vue

GoalEmptyState.vue
```

---

# Goal List

Display

- Goal Icon
- Goal Name
- Target Amount
- Current Progress
- Progress Bar
- Percentage
- Remaining Amount

Sort

Nearest completion first.

---

# Create Goal

Fields

- Name
- Target Amount
- Target Date (Optional)
- Icon
- Color

Default Progress

0

---

# Edit Goal

Allow updating

- Name
- Target Amount
- Target Date
- Icon
- Color

Progress is not edited directly.

---

# Goal Contribution

Users increase progress manually.

Provide

"Add Contribution"

Dialog

Fields

- Amount
- Note (Optional)

Buttons

Save

Cancel

Also provide

"Complete Goal"

Button

When pressed

Progress becomes Target Amount immediately.

---

# Goal Progress

Display

Progress

Example

```
Target

Rp10.000.000

Current

Rp4.000.000

Remaining

Rp6.000.000

40%
```

Display using

Progress Bar.

---

# Goal Completion

When

Progress >= Target

Automatically

Status

Completed

Show

Success Badge.

---

# Search

Search by

Goal Name

Case insensitive.

---

# Empty State

If no Goal exists

Display

BaseEmptyState

Action

Create Goal

---

# Validation

Validate

Required

- Name
- Target Amount

Validate

Target Amount

Must be

> 0

Contribution

Must be

> 0

Contribution cannot exceed Remaining Amount.

When using

"Complete Goal"

Ignore this validation and directly complete the Goal.

---

# Icons

Use FontAwesome.

Examples

- Piggy Bank
- House
- Car
- Laptop
- Plane
- Graduation Cap
- Gift

Store icon name only.

---

# Colors

Allow predefined colors.

Store selected color in Goal.

---

# Service Layer

Use only

Goal Service

Never access IndexedDB directly.

If necessary

Extend Goal Service.

---

# Performance

Goal calculations should be lightweight.

Percentage should be calculated by Goal Service.

Do not calculate inside Components.

---

# Error Handling

Handle

- Validation Error
- Database Error
- Missing Goal

Display using

BaseToast.

---

# Deliverables

After this sprint

The application should support

- Goal CRUD
- Goal Progress
- Goal Contribution
- Goal Completion
- Search
- Empty State
- Validation

---

# Verification

Verify

Create Goal

Edit Goal

Delete Goal

Add Contribution

Complete Goal

Search Goal

Progress Bar updates correctly

Responsive Layout

No TypeScript errors

No ESLint errors

Build succeeds

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

Goal calculation flow

5.

Validation summary

6.

Progress implementation

7.

Important implementation notes

---

# Do NOT

Do NOT

- Modify Account Balance
- Create Transactions
- Implement Budget
- Implement Hutang Piutang
- Access IndexedDB directly

Goal Management is an independent feature.

Progress is tracked manually and must not affect the user's financial balance.

Keep the implementation consistent with the existing Moni7 architecture.