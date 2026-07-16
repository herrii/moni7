# Sprint 14 — Settings, Import/Export & Production Ready

## Objective

Prepare Moni7 for production release.

This sprint focuses on application settings, data backup, restore, PWA improvements, performance optimization, and final polishing.

No new business features should be introduced.

The goal is to make Moni7 stable, installable, and ready for daily use.

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

- Settings Page
- Import CSV
- Export CSV
- Database Reset
- Manual Seeder
- PWA Optimization
- Offline Verification
- Performance Optimization
- Error Handling Improvements
- Final UI Polish

Excluded

- New Business Features
- Budget
- Recurring Transactions
- Attachments
- Cloud Sync

---

# Settings

The Profile page already exists.

Complete the Settings section.

Include

- User Management
- Account Management
- Category Management
- Database
- Import
- Export
- About

Use reusable Setting List components.

---

# Import CSV

Support importing

Transactions

Requirements

- CSV only
- Validate columns
- Ignore invalid rows
- Report import summary

Do not overwrite existing data automatically.

Ask confirmation before importing.

---

# Export CSV

Support exporting

- Transactions
- Accounts
- Categories
- Goals
- Hutang Piutang

Generate one CSV per module.

Use UTF-8 encoding.

File names should contain

Module Name

Current Date

Example

Transactions-2026-07-08.csv

---

# Database Reset

Provide

Reset Database

Before execution

Show confirmation dialog.

Reset should

- Delete IndexedDB
- Recreate Database
- Run Migration
- Execute Seeder

Display success message after completion.

---

# Manual Seeder

Provide button

Restore Default Data

Should restore

- Default Categories
- Default Account (Cash)
- Default User (if missing)

Do not duplicate existing data.

---

# PWA

Verify

- Installable
- Offline Ready
- Splash Screen
- Manifest
- Icons
- Theme Color

Ensure application works completely offline after installation.

---

# Offline Verification

Verify

- Open without Internet
- CRUD works offline
- Charts work offline
- Navigation works offline
- Import works offline
- Export works offline

No online dependency is allowed.

---

# Performance

Review

- Duplicate Service calls
- Duplicate Rendering
- Large Component re-renders
- IndexedDB Queries
- Infinite Scroll

Optimize where appropriate.

---

# Error Handling

Review every feature.

Ensure

- Friendly messages
- Consistent Toast
- No silent failures
- Graceful empty states

---

# UI Polish

Review the entire application.

Ensure consistency

- Border Radius
- Shadows
- Typography
- Icon Sizes
- Button Heights
- Input Heights
- Bottom Navigation
- FAB
- Bottom Sheet

Make the UI visually close to the Moni application.

---

# Accessibility

Verify

- Touch targets ≥ 44px
- Keyboard accessibility
- Focus state
- Semantic HTML
- Color contrast

---

# Service Layer

Do not introduce new database access.

Continue using existing Services only.

If fixes are needed,

refactor inside the Service Layer.

---

# Deliverables

After this sprint

The application should provide

- Complete Settings
- CSV Import
- CSV Export
- Database Reset
- Seeder Restore
- Offline PWA
- Production-ready UI
- Performance Improvements

---

# Verification

Verify

Import works.

Export works.

Reset Database works.

Seeder Restore works.

Offline installation works.

Offline CRUD works.

No data corruption.

Responsive layout works.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Final Checklist

Verify

✓ User Management

✓ Account Management

✓ Category Management

✓ Transactions

✓ Dashboard

✓ Reports

✓ Goals

✓ Hutang Piutang

✓ Import

✓ Export

✓ Offline

✓ PWA

✓ IndexedDB

✓ Service Layer

✓ Mobile First

✓ Responsive

✓ Theme Consistency

✓ Build Success

---

# Output

At the end of implementation provide

1.

Features completed

2.

Pages completed

3.

PWA verification summary

4.

Offline verification summary

5.

Import/Export summary

6.

Performance improvements

7.

Final project structure

8.

Known limitations (if any)

---

# Do NOT

Do NOT

- Add new business features
- Modify database schema without migration
- Break the Service Layer architecture
- Introduce online dependencies

This sprint is dedicated to stabilization, optimization, and production readiness.

Moni7 should be fully functional as an offline-first PWA after completing this sprint.