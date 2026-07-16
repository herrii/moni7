# Sprint 07 — Account Management

## Objective

Implement the complete Account Management feature.

This sprint is responsible for managing all financial accounts owned by a User.

Each User can have multiple Accounts.

Examples

- Cash
- Mandiri
- Blu BCA
- BCA
- BNI
- BRI
- DANA
- GoPay
- OVO
- ShopeePay

Every Account stores its own balance.

Transactions will update the balance automatically in a future sprint.

This sprint only implements Account Management.

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

- Account List
- Create Account
- Edit Account
- Delete Account
- Account Detail
- Initial Balance
- Account Color
- Account Icon
- Search Account

Excluded

- Transfer Between Accounts
- Transaction
- Category
- Reports
- Goals
- Hutang Piutang

---

# Feature Overview

An Account represents one source of money.

Examples

Cash

Mandiri

Blu BCA

GoPay

DANA

OVO

Every account belongs to exactly one User.

Every account maintains its own balance.

The dashboard total balance will be calculated from all active accounts in a later sprint.

---

# Pages

Create the following pages.

```

pages/

profile/

settings/

accounts/

index.vue

create.vue

[id].vue

```

Navigation

Profile

↓

Settings

↓

Account Management

---

# Scaffold Components

Create

```

components/

scaffold/

account/

AccountCard.vue

AccountForm.vue

AccountList.vue

AccountBalance.vue

AccountEmptyState.vue

```

These components belong only to the Account feature.

---

# Account List

Display

- Icon
- Name
- Current Balance
- Color Indicator
- Edit Button
- Delete Button

Sort by

Account Name

(Default)

---

# Create Account

Allow creating a new account.

Fields

- Name
- Initial Balance
- Icon
- Color

Default

Balance

0

Icon

Wallet

Color

Primary Theme

---

# Edit Account

Allow updating

- Name
- Icon
- Color

Initial Balance may only be edited if no transaction exists.

Otherwise

Display information explaining that balance is managed automatically by transactions.

---

# Delete Account

Before deleting

Show confirmation dialog.

Prevent deleting

- Last remaining Account

Prevent deleting

- Account that still has Transactions

(Transaction validation will be implemented later.)

Prepare the validation flow.

---

# Current Balance

Display

Current Balance

Format

Indonesian Rupiah

Example

Rp 125.000

Use helper functions.

Do not format currency manually.

---

# Icons

Use FontAwesome.

Allow selecting predefined icons.

Example

Wallet

University

Building

Credit Card

Money Bill

Coins

Piggy Bank

Mobile

Do not allow custom icon upload.

---

# Colors

Allow selecting predefined colors.

Store color value inside Account.

Avoid hardcoded styling.

---

# Search

Support searching Account by Name.

Case insensitive.

---

# Empty State

If no Account exists

Show

BaseEmptyState

Action

Create Account

---

# Validation

Validate

Required

- Name

Required

- Initial Balance

Validate

Initial Balance

Must be

>= 0

Prevent duplicate Account names for the same User.

---

# Error Handling

Handle

- Database Error
- Validation Error
- Delete Error

Display using

BaseToast

---

# UI Direction

Follow Moni UI style.

Requirements

- Rounded Card
- Soft Shadow
- Clean Layout
- Comfortable Spacing
- Mobile First

Do not over-design.

---

# Service Layer

Use only

Account Service

Do not access Database Helper directly.

Use existing functions.

If a function is missing

Extend the Service.

Never bypass the Service Layer.

---

# Deliverables

After this sprint

The application should support

- Account CRUD
- Initial Balance
- Icon Selection
- Color Selection
- Search
- Empty State
- Validation
- Error Handling

---

# Verification

Verify

Create Account

Edit Account

Delete Account

Search

Validation

Currency Formatting

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

Validation implemented

5.

Currency helper usage

6.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Transactions
- Implement Balance Calculation
- Implement Dashboard
- Implement Reports
- Implement Goals
- Implement Hutang Piutang
- Implement Transfer Between Accounts

Only implement Account Management.

Balance updates from transactions will be implemented in Sprint 09.

This sprint must remain focused on Account Management only.