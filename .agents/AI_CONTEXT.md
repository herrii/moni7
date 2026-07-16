# AI Context

## Purpose

This document provides the overall context of the Moni7 project.

Every AI agent should read this document before making any implementation decisions.

---

# Project Overview

Moni7 is an offline-first mobile personal finance tracker inspired by the Moni application.

The project is optimized for AI-assisted development.

Architecture consistency is more important than writing clever code.

---

# Vision

Build a clean, beautiful and maintainable finance tracker that works completely offline.

---

# Design Direction

UI Inspiration:

Moni Mobile App

Design Principles:

- Minimal
- Modern
- Clean
- Soft Color
- Rounded Corner
- Smooth Animation
- Mobile First

---

# Technology

Framework

- Nuxt 4

Language

- TypeScript

Storage

- Native IndexedDB

CSS

- TailwindCSS

Chart

- Chart.js

Icons

- FontAwesome

Date

- Moment.js

PWA

- @vite-pwa/nuxt

Package Manager

- Yarn

---

# Core Philosophy

Offline First

Never require internet connection.

Everything should continue working without network access.

---

Service Layer Pattern

Pages never access IndexedDB directly.

Pages

↓

Services

↓

Database Helper

↓

IndexedDB

---

Reusable Components

Always reuse Base Components whenever possible.

---

One Responsibility Per File

Every file should have a single responsibility.

---

AI First Architecture

Choose implementations that are:

- Easy to understand
- Easy to modify
- Easy to review

Avoid unnecessary abstractions.

---

# Naming Convention

Database

snake_case

Model

PascalCase

Function

camelCase

Helper

camelCase

Component

PascalCase

---

# Current Project Status

Project Phase

Architecture Completed

Implementation

Not Started

Database

Designed

Documentation

In Progress

Coding

Not Started

---

# Documentation Order

Always read documentation in this order:

1. AI_CONTEXT.md

2. PROJECT_RULES.md

3. ARCHITECTURE.md

4. DATABASE.md

5. UI_REFERENCE.md

6. SKILLS.md

---

# Important Notes

Do not change the architecture without explicit instruction.

Follow existing project conventions.

Prefer consistency over cleverness.

When in doubt, choose the simpler implementation.