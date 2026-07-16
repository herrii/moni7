# V3 - Sprint 22 — Security Enhancement

## Objective

Enhance the application's security and privacy without changing the existing business logic or architecture.

This sprint introduces local security features for protecting user data stored on the device.

All security features must work completely offline.

The application remains an Offline-first PWA.

Do NOT introduce any cloud authentication.

Do NOT introduce any online dependency.

---

# Project Context

Before making any changes, carefully read the following project documents.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents remain the single source of truth.

Also review every reference image inside

.agents/reference/

The security UI must follow the same visual language as the rest of the application.

---

# Existing Code Review

Before implementation

Review

- Profile Page
- Settings Page
- User Service
- IndexedDB Helper
- BaseDialog
- BaseBottomSheet
- BaseToast

Identify

- reusable components
- reusable dialogs
- reusable settings items
- reusable helpers

Do not begin implementation before completing this review.

---

# Scope

Included

- Application PIN
- Auto Lock
- Privacy Mode
- Hide Balance
- Failed Attempt Protection
- Security Settings
- PIN Management
- Security Validation

Excluded

- Biometric Authentication
- Cloud Authentication
- Account Login
- Remote Lock
- Online Security

---

# Security Philosophy

Security should protect local user data without making the application difficult to use.

Everything must continue working completely offline.

The security layer should be transparent after successful authentication.

---

# PIN Lock

Allow users to secure the application with a PIN.

Requirements

- 4-digit PIN
- Numeric keypad
- PIN confirmation
- Change PIN
- Remove PIN

PIN should never be stored as plain text.

Hash the PIN before saving.

---

# Lock Screen

When PIN Lock is enabled

Display

- Application Logo
- User Name
- PIN Input
- Unlock Button

Do not display financial information before unlocking.

---

# Auto Lock

Support

- Immediately
- 30 Seconds
- 1 Minute
- 5 Minutes
- 15 Minutes

Automatically lock when

- App resumes
- App becomes inactive
- Screen timeout expires

---

# Privacy Mode

Allow users to hide sensitive financial information.

Hide

- Total Balance
- Account Balance
- Goal Amount
- Loan Amount
- Report Summary

Display placeholder

Rp •••••••

Privacy Mode should not affect calculations.

Only hide the displayed value.

---

# Hide Balance

Provide quick toggle

inside Dashboard.

The toggle should instantly hide or show balances.

Remember the user's preference.

---

# Failed Attempt Protection

After

5 failed PIN attempts

Temporarily disable PIN input for

30 seconds.

Display friendly warning.

Do not erase user data.

---

# Change PIN

Allow

Current PIN

↓

New PIN

↓

Confirm PIN

Validate every step.

---

# Remove PIN

Require PIN verification before removing security.

---

# Security Settings

Inside Profile

Create

Security

section.

Include

- Enable PIN
- Change PIN
- Auto Lock
- Privacy Mode
- Hide Balance

Reuse existing Settings components.

---

# Components

Reuse existing Base Components.

Possible additions

```

components/

scaffold/

security/

PinLockScreen.vue

PinKeyboard.vue

SecuritySettings.vue

PrivacyToggle.vue

```

Avoid duplicate implementations.

---

# Service Layer

Create

security.service.ts

Responsibilities

- hashPin()

- verifyPin()

- updatePin()

- enablePin()

- disablePin()

- lockApplication()

- unlockApplication()

Business logic belongs inside the Service Layer.

---

# Helper

Create

```

utils/

security.helper.ts

```

Possible helper functions

- generateHash()

- compareHash()

- formatPin()

- validatePin()

Do not place security logic inside Vue Components.

---

# Storage

Security preferences should be stored inside IndexedDB.

Sensitive values

must never be stored as plain text.

---

# Responsive Design

Support

- Small Phones
- Large Phones
- Tablets

PIN keypad should remain comfortable on mobile devices.

---

# UI Direction

Follow Moni-inspired design.

Security screens should feel

- Clean
- Minimal
- Fast

Avoid excessive decoration.

---

# Accessibility

Verify

- Large touch targets
- Numeric keypad accessibility
- Focus state
- High contrast

---

# Performance

Security checks should be lightweight.

Do not repeatedly verify PIN unnecessarily.

Avoid blocking the UI.

---

# Validation

Verify

- Enable PIN
- Disable PIN
- Change PIN
- Wrong PIN
- Correct PIN
- Auto Lock
- Privacy Mode
- Hide Balance

---

# Error Handling

Handle

- Invalid PIN
- Incorrect Confirmation
- Too Many Attempts
- Database Error

Display

BaseToast

or

BaseDialog.

---

# Deliverables

After this sprint

The application should provide

- PIN Lock
- Auto Lock
- Privacy Mode
- Hide Balance
- Failed Attempt Protection
- Security Settings

---

# Verification

Verify

PIN works correctly.

Hash verification works.

Privacy Mode hides all sensitive values.

Auto Lock functions correctly.

Hide Balance updates immediately.

No financial data is visible before unlocking.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Output

Provide

1.

Security review summary

2.

New components created

3.

Service implementation summary

4.

Helper implementation summary

5.

Security workflow summary

6.

Accessibility improvements

7.

Known limitations

---

# Do NOT

Do NOT

Introduce cloud authentication.

Do NOT require an internet connection.

Do NOT store PIN as plain text.

Do NOT bypass the Service Layer.

Do NOT access IndexedDB directly from Components.

Do NOT modify existing business logic.

Always extend the existing architecture established in Version 1 and Version 2.