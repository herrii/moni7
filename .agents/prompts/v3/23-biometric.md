# V3 - Sprint 23 — Biometric Authentication

## Objective

Enhance the application's local security by adding biometric authentication.

Biometric Authentication is an extension of the PIN security implemented in Version 3 Sprint 22.

The application must continue working as an Offline-first PWA.

Biometric authentication should only be used to unlock the application.

It must NOT replace the existing PIN mechanism.

PIN remains the primary authentication method.

Biometric Authentication acts as a convenience feature.

---

# Project Context

Before making any changes, carefully read the following project documents.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

Also review every reference image inside

.agents/reference/

Maintain the same design language.

---

# Existing Code Review

Before implementation

Review

- Security Service
- Security Settings
- Lock Screen
- PIN Workflow
- Settings Components
- User Preferences

Identify

- reusable services
- reusable dialogs
- reusable helpers
- reusable settings items

Do not begin implementation before completing this review.

---

# Scope

Included

- Biometric Enable
- Biometric Disable
- Unlock with Biometrics
- PIN Fallback
- Device Capability Detection
- Security Settings
- User Feedback

Excluded

- Cloud Authentication
- Face Registration
- Fingerprint Registration
- Remote Authentication
- Multi-factor Authentication

---

# Biometric Philosophy

Biometric authentication is optional.

Users should always be able to unlock the application using their PIN.

Biometric authentication must never become the only unlocking method.

---

# Device Capability

Before enabling biometrics

Verify

- Device supports biometric authentication.
- Browser supports Web Authentication APIs.
- Secure Context (HTTPS or localhost).
- User verification is available.

If unsupported

Disable the option.

Explain clearly why.

---

# Enable Biometrics

Workflow

Enable Biometrics

↓

Verify PIN

↓

Request Device Authentication

↓

Save User Preference

↓

Show Success

Biometric should never be enabled without PIN verification.

---

# Disable Biometrics

Workflow

Disable Biometrics

↓

Verify PIN

↓

Disable Preference

↓

Show Success

---

# Unlock Flow

When application starts

If

PIN Enabled

AND

Biometric Enabled

Display

Unlock Screen

↓

Try Biometric

↓

Success

↓

Unlock

If biometric fails

↓

Allow PIN Input

Never lock the user out.

PIN must always remain available.

---

# Authentication Failure

Handle

- User Cancelled
- Authentication Failed
- Unsupported Device
- Timeout

Display friendly messages.

Never crash the application.

---

# Security Settings

Inside Profile

Security

Add

- Enable Biometrics
- Biometric Status
- Device Support Information

Reuse existing Settings components.

---

# Components

Reuse existing components whenever possible.

Possible additions

```
components/

scaffold/

security/

BiometricSettings.vue

BiometricStatus.vue

BiometricDialog.vue
```

Avoid duplicate implementations.

---

# Service Layer

Extend

security.service.ts

Possible functions

- isBiometricSupported()

- enableBiometric()

- disableBiometric()

- authenticateBiometric()

- biometricStatus()

Business logic belongs inside the Service Layer.

---

# Helper

Create

```
utils/

biometric.helper.ts
```

Possible helper functions

- checkSupport()

- requestAuthentication()

- normalizeError()

Keep helper functions independent.

---

# Storage

Store only

- biometric_enabled

inside user settings.

Never store biometric information.

Biometric data always remains managed by the operating system.

---

# Responsive Design

Support

- Android
- iOS
- Desktop Browsers (where supported)

Maintain Mobile First.

---

# UI Direction

Follow the Moni-inspired design.

Security UI should remain

- Clean
- Minimal
- Simple

Avoid unnecessary dialogs.

---

# Accessibility

Verify

- Large touch targets
- Clear status messages
- Proper focus handling

---

# Performance

Authentication should be fast.

Avoid repeated capability detection.

Cache capability checks when appropriate.

---

# Validation

Verify

- Device Supported
- Device Unsupported
- Enable
- Disable
- Successful Authentication
- Failed Authentication
- PIN Fallback

---

# Error Handling

Handle

- Unsupported Browser
- Unsupported Device
- User Cancelled
- Authentication Failed
- Service Error

Display

BaseToast

or

BaseDialog.

---

# Deliverables

After this sprint

The application should provide

- Biometric Unlock
- PIN Fallback
- Device Capability Detection
- Security Settings
- Better Unlock Experience

---

# Verification

Verify

Biometric authentication works.

PIN fallback always works.

Unsupported devices are handled gracefully.

Security settings update correctly.

Responsive layout works.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Output

Provide

1.

Existing security review summary

2.

New components created

3.

Security Service enhancements

4.

Biometric helper implementation

5.

Authentication workflow summary

6.

Compatibility notes

7.

Known limitations

---

# Do NOT

Do NOT

Remove the existing PIN authentication.

Do NOT store biometric information.

Do NOT bypass the operating system's authentication mechanism.

Do NOT introduce online authentication.

Do NOT access IndexedDB directly from Components.

Do NOT modify existing business logic.

Always extend the existing Version 3 security architecture.