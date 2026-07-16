# V2 - Sprint 21 — UI Refinement (Moni Design Alignment)

## Objective

Refine the entire user interface to closely resemble the design language, layout, spacing, and interaction patterns of the Moni application.

The purpose of this sprint is NOT to redesign the application.

The purpose is to improve consistency and make the UI feel polished while preserving all existing functionality.

All business logic has already been implemented.

This sprint focuses only on presentation.

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

---

# UI Reference

The project contains visual references.

Review every image inside

.agents/reference/

These screenshots represent the desired visual direction.

Study carefully

- spacing
- typography
- colors
- shadows
- radius
- layout
- navigation
- bottom sheet
- cards
- forms
- animations

Do NOT copy assets.

Do NOT copy branding.

Only reproduce the overall design language.

---

# Existing UI Review

Before implementation

Review

- Every Page
- Every Base Component
- Every Scaffold Component

Identify

- inconsistent spacing
- inconsistent typography
- duplicated styles
- inconsistent button size
- inconsistent icon usage
- inconsistent margins
- inconsistent paddings

Prepare a refactoring plan before coding.

---

# Scope

Included

- Design Consistency
- Typography
- Spacing
- Radius
- Shadows
- Icons
- Card Layout
- Bottom Navigation
- FAB
- Bottom Sheet
- Forms
- Empty State
- Loading State
- Animation
- Transition

Excluded

- Business Logic
- Database
- Services
- New Features

---

# Design Philosophy

The application should feel

- clean
- modern
- lightweight
- mobile-first

The UI should closely resemble Moni while maintaining its own identity.

Avoid unnecessary visual complexity.

---

# Color System

Review existing colors.

Ensure

- Primary Color
- Secondary Color
- Success
- Warning
- Error
- Surface
- Background

Maintain strong visual consistency.

---

# Typography

Review

- Font Size
- Font Weight
- Line Height
- Letter Spacing

Ensure hierarchy is consistent across every page.

---

# Spacing

Normalize spacing.

Review

- Page Padding
- Card Padding
- Section Margin
- Grid Gap
- List Spacing

Avoid inconsistent spacing.

---

# Border Radius

Normalize radius.

Examples

Buttons

Cards

Inputs

Dialogs

Bottom Sheets

Avoid multiple radius styles unless necessary.

---

# Shadow

Review elevation.

Keep

Subtle

Soft

Consistent

Avoid heavy shadows.

---

# Buttons

Review

- Height
- Width
- Radius
- Icon Position
- Disabled State
- Loading State

Reuse BaseButton.

---

# Inputs

Review

- Height
- Placeholder
- Focus State
- Error State
- Helper Text

Reuse BaseInput.

---

# Cards

Review

- Header
- Body
- Footer
- Padding
- Shadow
- Radius

Cards should visually resemble Moni.

---

# Bottom Navigation

Review

- Height
- Active State
- Inactive State
- Icon Size
- Label
- Safe Area

Maintain the centered FAB.

---

# Floating Action Button

Review

- Position
- Size
- Shadow
- Animation
- Touch Area

FAB should remain centered.

---

# Bottom Sheet

Review

- Opening Animation
- Closing Animation
- Radius
- Padding
- Handle Bar

Reuse BaseBottomSheet.

---

# Empty State

Review every empty state.

Ensure

- Illustration Placeholder
- Friendly Message
- Call To Action

Reuse BaseEmptyState.

---

# Loading

Review loading states.

Use

- Skeleton Loading
- Loading Spinner

Avoid layout jumping.

---

# Animation

Keep animations subtle.

Apply to

- Bottom Sheet
- Dialog
- FAB
- Navigation
- Cards

Avoid excessive animation.

---

# Icon Consistency

Review

FontAwesome usage.

Ensure

- Same icon size
- Same icon weight
- Same alignment

Replace inconsistent icons if necessary.

---

# Responsive Design

Verify

- Small Phones
- Large Phones
- Tablets

Maintain Mobile First.

---

# Accessibility

Verify

- Touch Target ≥44px
- Color Contrast
- Focus State
- Semantic HTML

---

# Components

Refactor existing Base Components if necessary.

Do not duplicate UI components.

Only improve existing implementations.

---

# Performance

Do not introduce unnecessary animations.

Avoid layout reflow.

Avoid unnecessary repaint.

---

# Validation

Review every page

- Dashboard
- Reports
- Transactions
- Accounts
- Categories
- Goals
- Hutang Piutang
- Profile
- Settings

Ensure visual consistency.

---

# Deliverables

After this sprint

The application should provide

- Consistent Design Language
- Moni-inspired UI
- Better Typography
- Better Spacing
- Better Components
- Better Navigation
- Better Forms
- Better Animations

---

# Verification

Verify

UI consistency across every page.

Responsive layout works.

Dark and light appearance (if implemented) remain consistent.

Bottom Navigation behaves correctly.

Bottom Sheet animation is smooth.

No duplicated styles.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Output

Provide

1.

UI review summary

2.

Components refactored

3.

Design consistency improvements

4.

Animation improvements

5.

Accessibility improvements

6.

Responsive improvements

7.

Final UI refinement summary

---

# Do NOT

Do NOT

Rewrite business logic.

Do NOT modify database structure.

Do NOT change Service Layer.

Do NOT redesign the application.

Do NOT copy Moni assets or branding.

Only refine the UI to closely follow the design language demonstrated in

.agents/reference/

while preserving the existing architecture and functionality.