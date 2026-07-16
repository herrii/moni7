# Moni7 Project Rules

> Engineering principles and non-negotiable rules for the Moni7 project.

---

# Purpose

This document defines the engineering philosophy and development rules of Moni7.

All contributors and AI coding agents **must follow these rules** before implementing any feature.

If a new implementation conflicts with this document, this document takes precedence.

---

# Core Principles

## Offline First

Moni7 is designed to work completely offline.

The application must never depend on an internet connection to function.

---

## Mobile First

Every UI must be designed for mobile devices first.

Desktop support is secondary.

---

## AI First Architecture

The project is optimized for AI-assisted development.

Prefer implementations that are:

- Simple
- Explicit
- Easy to understand
- Easy to maintain

Avoid unnecessary abstractions.

---

## Keep It Simple

Never over engineer.

Choose the simplest solution that satisfies the requirement.

---

## One Responsibility Per File

Each file should have only one clear responsibility.

Examples:

- One Service = One Business Domain
- One Model = One Object Store
- One Scaffold = One Feature
- One Prompt = One Implementation Step

---

## Reusable First

Always reuse existing code before creating new code.

Priority:

1. Existing Base Component
2. Existing Scaffold Component
3. Existing Helper
4. Existing Service
5. Create new implementation

---

# Architecture Rules

## Service Layer Pattern

Business logic must always go through Services.

Flow:

Page

↓

Scaffold Component

↓

Service

↓

Database Helper

↓

IndexedDB

---

## Models

Models only define:

- Database fields
- Interfaces
- Default values
- Schema metadata

Models must never contain:

- Business logic
- CRUD logic
- UI logic

---

## Database

Only Database Helper may access IndexedDB directly.

Pages, Components and Services must never call IndexedDB APIs directly.

---

## Base Components

Reusable UI belongs inside:

components/base/

Feature-specific UI belongs inside:

components/scaffold/

---

# Database Rules

- IndexedDB only
- Native Browser API only
- No third-party IndexedDB library
- Hard Delete
- Auto Increment ID
- snake_case fields
- Integer money values
- Unix Timestamp for storage
- Moment.js for formatting
- Database version controls migration

---

# Coding Rules

- Prefer explicit code
- Avoid magic values
- Use configuration files
- Reuse helper functions
- Keep functions small
- Prefer readability over optimization

---

# Naming Convention

Database Fields

snake_case

Example:

user_id

created_at

transaction_date

---

Model

PascalCase

Example:

TransactionModel

---

Function

camelCase

Example:

createTransaction()

---

Component

PascalCase

Example:

<TransactionForm />

---

File Name

kebab-case

Example:

transaction.service.ts

---

# UI Rules

- Mobile First
- Moni Inspired
- Smooth Animation
- Soft Shadow
- Rounded Corner
- Consistent Spacing
- Bottom Navigation
- Center FAB
- Bottom Sheet

---

# Dependency Rules

Allowed:

Page

↓

Scaffold

↓

Service

↓

Database Helper

↓

IndexedDB

Forbidden:

Page → IndexedDB

Component → IndexedDB

Model → Service

Database → Component

---

# Error Handling

Throw errors from Service.

UI decides how to display errors.

Never silently ignore errors.

---

# Definition of Done

A feature is considered complete only if:

- UI implemented
- Mobile responsive
- Uses Base Components
- Uses Scaffold Components
- Business logic inside Service
- No direct IndexedDB access
- Uses existing helpers
- TypeScript passes
- Linter passes
- Follows naming convention

---

# Non Goals

The following are intentionally NOT part of Moni7:

- Cloud Synchronization
- Online API
- Native Android Wrapper
- ORM
- Soft Delete
- Complex Global State
- Multi-device Sync
- Authentication Server

---

# Final Rule

When in doubt:

Choose consistency over cleverness.

Choose simplicity over complexity.

Choose maintainability over optimization.