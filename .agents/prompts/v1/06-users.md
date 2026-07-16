# Sprint 06 — User Management

## Objective

Implement the complete User Management feature.

This sprint is responsible for allowing the application to manage multiple users.

Each user has their own independent financial data.

Every Account, Category, Transaction, Goal, and Loan belongs to exactly one User.

This sprint only implements User Management.

Do NOT implement Account Management or other features.

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

- User List
- Create User
- Edit User
- Delete User
- Active User
- User Switch
- Default User
- Manual Seeder

Excluded

- Account CRUD
- Category CRUD
- Transaction CRUD
- Goal
- Hutang Piutang
- Reports

---

# Feature Overview

Moni7 supports multiple users.

Each user owns completely independent data.

Example

```

User A

├── Cash

├── Mandiri

├── Blu BCA

├── Categories

├── Transactions

├── Goals

└── Loans

User B

├── Cash

├── Gopay

├── Categories

├── Transactions

└── Goals

```

Switching active user should automatically switch every related data.

---

# User Model

Use the User model created in Sprint 04.

Do not modify the database schema.

Follow DATABASE.md.

---

# Pages

Create the following pages.

```

pages/

profile/

users/

index.vue

create.vue

[id].vue

```

The Profile page should provide entry to User Management.

---

# Scaffold Components

Create reusable scaffold components.

```

components/

scaffold/

user/

UserCard.vue

UserForm.vue

UserList.vue

UserSwitcher.vue

UserEmptyState.vue

```

These components belong only to the User feature.

Do not place them inside Base Components.

---

# User List

Display every available user.

Each item should display

- Avatar (placeholder)
- Name
- Active Badge
- Edit Button
- Delete Button

The active user should be visually highlighted.

---

# Create User

Allow users to create a new profile.

Minimum fields

- Name

Future fields such as avatar may be added later.

Do not implement image upload.

---

# Edit User

Allow updating

- Name

Keep the UI simple.

---

# Delete User

Before deleting

Show confirmation dialog.

Prevent deleting the last remaining user.

If the active user is deleted

Automatically switch to another available user.

---

# Active User

Only one active user may exist.

Changing the active user should

- Update active_user_id configuration
- Refresh application state
- Reload all user-related data

Do not use Pinia.

Use the existing Service Layer.

---

# Default User

When the application is initialized for the first time

Automatically create

```

Default User

Name

"My Account"

```

The Seeder already exists.

This sprint should expose a way to execute it.

---

# Manual Seeder

Inside Profile → Settings

Create

Initialize Database

When pressed

Run

- Migration
- Seeder

If the database already exists

Show confirmation dialog.

---

# Search

Allow searching users by name.

Search should be case-insensitive.

---

# Empty State

If no users exist

Show BaseEmptyState.

Provide

Create User

button.

---

# Navigation

Profile

↓

User Management

↓

User List

↓

Create

↓

Edit

---

# UI Direction

Follow the Moni style.

Requirements

- Rounded Cards
- Soft Shadow
- Mobile First
- Comfortable Touch Area
- Consistent Spacing

---

# Validation

Validate

- Required Name
- Duplicate Name (optional warning)
- Maximum length

Display validation errors using Base Components.

---

# Error Handling

Handle

- Database Error
- Delete Error
- Seeder Error

Display user-friendly messages using BaseToast.

---

# Deliverables

After this sprint the application should support

- Multiple Users
- User CRUD
- Active User
- User Switch
- Manual Seeder
- Search User
- Empty State

---

# Verification

Verify

User can be created.

User can be edited.

User can be deleted.

Cannot delete the last user.

User switching works.

Database initialization works.

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

Service functions used

4.

Validation summary

5.

Navigation flow

6.

Important implementation notes

---

# Do NOT

Do NOT

- Implement Account Management
- Implement Categories
- Implement Transactions
- Implement Reports
- Implement Goals
- Implement Hutang Piutang
- Modify Database Schema
- Modify Base Components

Only implement the User Management feature.

All user-related data must use the existing Service Layer and Database Foundation created in previous sprints.