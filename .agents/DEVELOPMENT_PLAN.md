# Moni7 Development Plan

> Master implementation roadmap for Moni7.

---

# Purpose

This document defines the implementation roadmap of Moni7.

Each version is divided into multiple small implementation steps to optimize AI-assisted development and reduce context window usage.

Each step should be completed independently before continuing to the next step.

---

# Development Strategy

Moni7 follows an incremental development strategy.

Principles:

- Small implementation scope
- One feature at a time
- One prompt = One objective
- Every step must produce a working application
- Never implement multiple major features in one prompt

---

# Version Roadmap

| Version | Status | Description |
|----------|--------|-------------|
| V1 | Planned | Core Finance Tracker |
| V2 | Planned | UX & Productivity Improvements |
| V3 | Planned | Security & Personalization |

---

# Version 1 — Core Finance Tracker

## Objective

Build a complete offline-first personal finance tracker inspired by Moni.

### Target Features

- Dashboard
- Transactions
- Reports
- Goals
- Hutang Piutang
- Profile
- CSV Import / Export
- PWA

---

# Sprint 01 — Project Foundation

## Objective

Initialize the project foundation.

### Deliverables

- Initialize Nuxt 4
- TypeScript
- TailwindCSS
- FontAwesome
- Moment.js
- Chart.js
- @vite-pwa/nuxt
- Alias Import
- Folder Structure
- ESLint
- Prettier

### Acceptance Criteria

- Project runs successfully
- No TypeScript errors
- No ESLint errors
- PWA builds successfully
- Application can be installed

### Prompt

```
prompts/v1/01-project-foundation.md
```

---

# Sprint 02 — Application Layout

## Objective

Create the application shell and global layout.

### Deliverables

- Default Layout
- Status Bar Safe Area
- Bottom Navigation
- Center Floating Action Button
- Bottom Sheet
- Global Header
- Theme Configuration
- Responsive Layout

### Acceptance Criteria

- Mobile layout completed
- Bottom Navigation works
- FAB opens Bottom Sheet
- Bottom Sheet animation works

### Prompt

```
prompts/v1/02-layout.md
```

---

# Sprint 03 — Base Components

## Objective

Build reusable UI components.

### Deliverables

Buttons

- BaseButton

Inputs

- BaseInput
- BaseTextarea
- BaseSelect

Display

- BaseCard
- BaseBadge
- BaseAvatar
- BaseIcon

Feedback

- BaseLoading
- BaseToast
- BaseDialog

Navigation

- BaseBottomSheet

### Acceptance Criteria

- Components reusable
- No duplicated UI implementation
- Components documented

### Prompt

```
prompts/v1/03-base-components.md
```

---

# Sprint 04 — Database Foundation

## Objective

Implement IndexedDB architecture.

### Deliverables

- Database Helper
- Database Initialization
- Migration System
- Seeder System
- Generic CRUD Helper
- Object Store Registration
- Models

### Acceptance Criteria

- Database initializes successfully
- Migration works
- Seeder works
- CRUD helper works

### Prompt

```
prompts/v1/04-database.md
```

---

# Sprint 05 — Service Layer

## Objective

Implement all business services.

### Deliverables

- User Service
- Account Service
- Category Service
- Transaction Service
- Goal Service
- Loan Service
- CSV Service

### Acceptance Criteria

- CRUD available for every service
- Validation implemented
- No direct IndexedDB access outside Database Helper

### Prompt

```
prompts/v1/05-services.md
```

---

# Sprint 06 — User Management

## Objective

Implement multi-user management.

### Deliverables

- User CRUD
- Active User Switching
- Default User
- User Selector
- User Settings

### Acceptance Criteria

- Multiple users supported
- Data isolation works
- Active user persists

### Prompt

```
prompts/v1/06-users.md
```

---

# Sprint 07 — Account Management

## Objective

Implement account management.

### Deliverables

- Account CRUD
- Default Cash Account
- Balance Management
- Account Color
- Account Icon
- Default Account Selection

### Acceptance Criteria

- Multiple accounts supported
- Balance updates correctly
- Default account works

### Prompt

```
prompts/v1/07-accounts.md
```

---

# Sprint 08 — Category Management

## Objective

Implement category management for income and expense transactions.

### Deliverables

- Category CRUD
- Default Category Seeder
- Category Color
- Category Icon
- Category Sorting
- Category Picker Component

### Acceptance Criteria

- Categories can be created
- Categories can be edited
- Categories can be deleted
- Income and Expense separated
- Category picker reusable

### Prompt

```
prompts/v1/08-categories.md
```

---

# Sprint 09 — Transaction Management

## Objective

Implement complete transaction management.

### Deliverables

- Create Transaction
- Update Transaction
- Delete Transaction
- Transaction Detail
- Transaction List
- Search Transaction
- Filter Transaction
- Balance Auto Update

### Acceptance Criteria

- CRUD complete
- Balance updates correctly
- Search works
- Filter works
- Offline support

### Prompt

```
prompts/v1/09-transactions.md
```

---

# Sprint 10 — Dashboard

## Objective

Build the main dashboard.

### Deliverables

- Total Balance Card
- Income Summary
- Expense Summary
- Recent Transactions
- Monthly Summary
- Empty State

### Acceptance Criteria

- Dashboard loads correctly
- Data updates automatically
- Responsive layout
- Smooth animation

### Prompt

```
prompts/v1/10-dashboard.md
```

---

# Sprint 11 — Reports

## Objective

Implement financial reporting.

### Deliverables

- Monthly Report
- Income vs Expense Chart
- Category Breakdown
- Chart.js Integration
- Date Filter
- Report Summary

### Acceptance Criteria

- Charts render correctly
- Statistics accurate
- Filtering works
- Responsive layout

### Prompt

```
prompts/v1/11-reports.md
```

---

# Sprint 12 — Goals

## Objective

Implement financial goals.

### Deliverables

- Goal CRUD
- Goal Progress
- Goal Detail
- Progress Indicator
- Goal Completion

### Acceptance Criteria

- Goal progress updates
- Goal completion works
- Responsive layout

### Prompt

```
prompts/v1/12-goals.md
```

---

# Sprint 13 — Hutang Piutang

## Objective

Implement debt and receivable management.

### Deliverables

- Loan CRUD
- Debt
- Receivable
- Payment History
- Installment Payment
- Full Payment ("Lunas")
- Remaining Amount
- Status Update

### Acceptance Criteria

- Remaining amount calculated correctly
- Loan automatically marked as paid
- Payment history stored
- Does not affect account balance

### Prompt

```
prompts/v1/13-loans.md
```

---

# Sprint 14 — Profile & Settings

## Objective

Implement profile page and application settings.

### Deliverables

Profile

- User Information
- Active User

Settings

- Account Management
- Category Management
- User Management
- Database Initialization
- Database Reset
- Theme Configuration (future ready)

### Acceptance Criteria

- Settings accessible
- CRUD management complete
- Seeder executable manually

### Prompt

```
prompts/v1/14-profile.md
```

---

# Sprint 15 — CSV & Final Polish

## Objective

Complete Version 1.

### Deliverables

CSV

- Export Transactions
- Import Transactions
- Export Accounts

Polish

- Empty State
- Loading State
- Error State
- Toast Notification
- Animation Improvement
- Performance Optimization
- Responsive Verification
- Offline Verification
- PWA Verification

### Acceptance Criteria

- CSV Import works
- CSV Export works
- Offline verified
- PWA installable
- No TypeScript errors
- No ESLint errors

### Prompt

```
prompts/v1/15-polish.md
```

---

# Version 2 — UX & Productivity

## Objective

Improve usability, productivity, and user experience without changing the core architecture.

### Planned Features

- Advanced Search
- Advanced Filters
- Dashboard Customization
- More Report Types
- Goal Improvements
- Better Statistics
- Better CSV Experience
- UI/UX Refinements

---

# Sprint 16 — Advanced Dashboard

## Deliverables

- Dashboard Customization
- Quick Actions
- Better Summary Cards
- Monthly Comparison

Prompt

```
prompts/v2/16-dashboard.md
```

---

# Sprint 17 — Advanced Reports

## Deliverables

- More Charts
- Better Statistics
- Comparison Report
- Trend Analysis

Prompt

```
prompts/v2/17-reports.md
```

---

# Sprint 18 — Advanced Search & Filter

## Deliverables

- Keyword Search
- Date Range Filter
- Multi Category Filter
- Multi Account Filter

Prompt

```
prompts/v2/18-search.md
```

---

# Sprint 19 — Goal Improvements

## Deliverables

- Better Goal Progress
- Goal Statistics
- Goal Reminder (Offline)
- Goal History

Prompt

```
prompts/v2/19-goals.md
```

---

# Sprint 20 — CSV Improvements

## Deliverables

- Better CSV Import Validation
- Import Preview
- Duplicate Detection
- Export Options

Prompt

```
prompts/v2/20-csv.md
```

---

# Sprint 21 — UI Polish

## Deliverables

- Animation Improvements
- Better Empty State
- Better Loading
- Better Error Screen
- Accessibility Improvements

Prompt

```
prompts/v2/21-ui-polish.md
```

---

# Version 3 — Security & Personalization

## Objective

Improve application security, privacy, personalization, and overall user experience while maintaining an offline-first architecture.

### Target Features

- PIN Lock
- Biometric Authentication
- Application Preferences
- UI Personalization
- Better PWA Experience

---

# Sprint 22 — Application Security

## Objective

Protect user data before entering the application.

### Deliverables

- PIN Lock
- Change PIN
- PIN Verification
- Auto Lock Configuration

### Acceptance Criteria

- PIN can be enabled/disabled
- PIN verification works
- Auto lock functions correctly

### Prompt

```
prompts/v3/22-security.md
```

---

# Sprint 23 — Biometric Authentication

## Objective

Support biometric authentication on compatible devices.

### Deliverables

- Biometric Authentication
- Biometric Settings
- PIN Fallback
- Authentication Flow

### Acceptance Criteria

- Biometric authentication works
- PIN fallback available
- Unsupported devices handled gracefully

### Prompt

```
prompts/v3/23-biometric.md
```

---

# Sprint 24 — Personalization

## Objective

Allow users to personalize their application experience.

### Deliverables

- Theme Settings
- Currency Display Settings
- Date Format Settings
- Dashboard Preferences

### Acceptance Criteria

- Settings persist correctly
- UI updates immediately
- Preferences stored locally

### Prompt

```
prompts/v3/24-personalization.md
```

---

# Sprint 25 — Performance Optimization

## Objective

Optimize performance for long-term usage.

### Deliverables

- Database Optimization
- Better Infinite Scroll
- Lazy Loading
- Component Optimization
- Service Optimization

### Acceptance Criteria

- Faster page loading
- Smooth scrolling
- No unnecessary re-render
- Stable performance with large datasets

### Prompt

```
prompts/v3/25-performance.md
```

---

# Sprint 26 — Production Release

## Objective

Prepare the application for stable production release.

### Deliverables

- Final UI Review
- Final Database Review
- Final Service Review
- PWA Audit
- Responsive Audit
- Accessibility Audit
- Code Cleanup
- Dead Code Removal
- Documentation Review

### Acceptance Criteria

- All features completed
- No TypeScript errors
- No ESLint errors
- Offline fully functional
- PWA installable
- Stable production build

### Prompt

```
prompts/v3/26-production.md
```

---

# Project Milestones

| Milestone | Description |
|-----------|-------------|
| M1 | Project Foundation Complete |
| M2 | Database & Service Layer Complete |
| M3 | Core Finance Features Complete |
| M4 | Version 1 Released |
| M5 | UX Improvements Complete |
| M6 | Version 2 Released |
| M7 | Security Complete |
| M8 | Version 3 Released |

---

# Prompt Folder Structure

```
.agents/

└── prompts/
    ├── v1/
    │   ├── 01-project-foundation.md
    │   ├── 02-layout.md
    │   ├── 03-base-components.md
    │   ├── 04-database.md
    │   ├── 05-services.md
    │   ├── 06-users.md
    │   ├── 07-accounts.md
    │   ├── 08-categories.md
    │   ├── 09-transactions.md
    │   ├── 10-dashboard.md
    │   ├── 11-reports.md
    │   ├── 12-goals.md
    │   ├── 13-loans.md
    │   ├── 14-profile.md
    │   └── 15-polish.md
    │
    ├── v2/
    │   ├── 16-dashboard.md
    │   ├── 17-reports.md
    │   ├── 18-search.md
    │   ├── 19-goals.md
    │   ├── 20-csv.md
    │   └── 21-ui-polish.md
    │
    └── v3/
        ├── 22-security.md
        ├── 23-biometric.md
        ├── 24-personalization.md
        ├── 25-performance.md
        └── 26-production.md
```

---

# Versioning Strategy

Each version must satisfy the following requirements before continuing to the next version.

## Version 1

Focus on core functionality.

Requirements

- Offline First
- Complete CRUD
- IndexedDB
- Service Layer
- Responsive Mobile UI
- Installable PWA

---

## Version 2

Focus on usability.

Requirements

- Better User Experience
- Better Reports
- Better Dashboard
- Better Search
- Better Performance

---

## Version 3

Focus on production readiness.

Requirements

- Security
- Personalization
- Performance
- Production Quality
- Documentation Complete

---

# Engineering Rules

Every sprint must produce a working application.

Never leave the application in a broken state.

If a sprint depends on another sprint, complete the dependency first.

Do not skip sprint order.

Never implement features outside the current sprint scope.

Keep every prompt focused on a single implementation objective.

---

# Completion Checklist

Before marking a sprint as completed, verify:

- Feature implemented
- Mobile responsive
- Offline functional
- TypeScript passes
- ESLint passes
- Uses Service Layer
- Uses Base Components
- Uses Scaffold Components
- Uses Models
- Uses Database Helper
- Follows naming convention
- Documentation updated (if required)

---

# Definition of Complete

A version is considered complete when:

- All planned sprints are completed
- Acceptance criteria are satisfied
- No known critical issues remain
- Documentation is up to date
- Production build succeeds
- PWA can be installed and used fully offline

---

# References

Read these documents before implementing any sprint:

1. AI_CONTEXT.md
2. PROJECT_RULES.md
3. ARCHITECTURE.md
4. DATABASE.md
5. SKILLS.md

These documents are the source of truth for the project.

---

End of Document