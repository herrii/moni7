# Sprint 08 — Category Management

## Objective

Implement the complete Category Management feature.

This sprint is responsible for managing Income and Expense categories for each User.

Each User has their own Categories.

Default Categories should be available through Seeder.

This sprint only implements Category Management.

Do NOT implement Transactions or Reports.

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

- Category List
- Create Category
- Edit Category
- Delete Category
- Category Detail
- Category Type
- Category Icon
- Category Color
- Search Category
- Manual Seeder

Excluded

- Transactions
- Reports
- Goals
- Hutang Piutang
- Dashboard

---

# Feature Overview

Each Category belongs to exactly one User.

Categories are divided into two groups.

Income

Examples

- Salary
- Bonus
- Gift
- Investment
- Cashback

Expense

Examples

- Food
- Drink
- Transportation
- Shopping
- Bills
- Health
- Education
- Entertainment

Users may create unlimited categories.

---

# Pages

Create the following pages.

```
pages/

profile/

settings/

categories/

index.vue

create.vue

[id].vue
```

Navigation

```
Profile

↓

Settings

↓

Category Management
```

---

# Scaffold Components

Create

```
components/

scaffold/

category/

CategoryCard.vue

CategoryForm.vue

CategoryList.vue

CategoryTypeBadge.vue

CategoryIconPicker.vue

CategoryColorPicker.vue

CategoryEmptyState.vue
```

These components belong only to Category Management.

---

# Category List

Display

- Icon
- Category Name
- Type
- Color
- Edit Button
- Delete Button

Group categories by

Income

Expense

Sort alphabetically.

---

# Create Category

Allow creating a new category.

Fields

- Name
- Type
- Icon
- Color

Type

- Income
- Expense

Default

Type

Expense

Icon

Tag

Color

Primary Theme

---

# Edit Category

Allow updating

- Name
- Type
- Icon
- Color

Changes should update immediately.

---

# Delete Category

Before deleting

Show confirmation dialog.

Prevent deleting categories currently used by Transactions.

(Transaction validation will be implemented in Sprint 09.)

Prepare the validation flow.

---

# Default Categories

Seeder should provide default categories.

Income

- Salary
- Bonus
- Gift
- Cashback
- Investment

Expense

- Food
- Drink
- Transportation
- Shopping
- Bills
- Health
- Education
- Entertainment

Seeder should run only when requested.

Do not automatically overwrite existing categories.

---

# Manual Seeder

Inside

Profile

↓

Settings

↓

Category Management

Provide

"Restore Default Categories"

Before executing

Show confirmation dialog.

Only add missing default categories.

Do not duplicate existing categories.

---

# Icons

Use FontAwesome only.

Provide a predefined icon list.

Examples

Income

- Wallet
- Money Bill
- Hand Holding Dollar
- Gift

Expense

- Cart Shopping
- Utensils
- Car
- House
- Heart Pulse
- Graduation Cap
- Film
- Shirt

Do not allow custom icons.

---

# Colors

Allow selecting predefined colors.

Store the selected color in the database.

Avoid hardcoded colors throughout the UI.

---

# Search

Support searching Category by Name.

Requirements

- Case insensitive
- Instant filtering
- Works for both Income and Expense

---

# Empty State

If no Category exists

Display

BaseEmptyState

Provide

Create Category

button.

---

# Validation

Validate

Required

- Name
- Type

Prevent duplicate Category names within the same Type for the same User.

Example

Allowed

Food (Expense)

Food (Income)

Not Allowed

Food (Expense)

Food (Expense)

---

# Error Handling

Handle

- Database Error
- Validation Error
- Seeder Error
- Delete Error

Display using

BaseToast.

---

# UI Direction

Follow the Moni application style.

Requirements

- Rounded Card
- Soft Shadow
- Mobile First
- Clean Layout
- Consistent Spacing
- Comfortable Touch Area

---

# Service Layer

Use only

Category Service

Never access IndexedDB directly.

If additional functions are required

Extend the Service Layer.

Do not bypass the Service Layer.

---

# Deliverables

After this sprint

The application should support

- Category CRUD
- Income Categories
- Expense Categories
- Search
- Icon Picker
- Color Picker
- Manual Seeder
- Empty State
- Validation
- Error Handling

---

# Verification

Verify

Create Category

Edit Category

Delete Category

Search Category

Restore Default Categories

Duplicate Validation

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

Seeder implementation

5.

Validation summary

6.

Icon list

7.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Transactions
- Implement Dashboard
- Implement Reports
- Implement Goals
- Implement Hutang Piutang
- Modify Database Schema
- Modify Service Architecture

Only implement Category Management.

Transactions will consume these Categories in Sprint 09.

Keep the implementation modular, reusable, and consistent with the existing Moni7 architecture.