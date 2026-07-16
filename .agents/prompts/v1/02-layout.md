# Sprint 02 — Application Layout

## Objective

Build the main application layout and navigation for Moni7.

This sprint focuses only on the application shell and global navigation.

Do NOT implement any business logic or feature-specific functionality.

---

## Project Context

Before writing any code, read the following documents carefully.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents are the source of truth.

---

## Scope

Only implement the application layout.

Included:

- Default Layout
- Mobile-first Layout
- App Header
- Bottom Navigation
- Center Floating Action Button (FAB)
- Bottom Sheet
- Theme Color
- Navigation Routing
- Page Placeholder

Excluded:

- Database
- Service Layer
- Models
- CRUD
- Transaction
- Dashboard Logic
- Reports
- Goals
- Hutang Piutang
- Profile Logic

---

## UI Direction

The UI should closely resemble the Moni application.

Use the screenshots inside:

```
.agents/reference/
```

as the primary visual reference.

Design principles:

- Mobile First
- Clean Interface
- Rounded Corners
- Soft Shadow
- Consistent Spacing
- Large Touch Targets
- Smooth Animation

Do not copy assets directly.

Only follow the visual style.

---

## Layout Structure

Create the default application layout.

Example hierarchy:

```
DefaultLayout

├── Safe Area
│
├── Header
│
├── Main Content
│
├── Bottom Navigation
│
└── Floating Action Button
```

The Bottom Navigation must always stay fixed.

The FAB must float above the Bottom Navigation.

---

## Header

Create a reusable application header.

Requirements:

- Page title
- Optional subtitle
- Optional action button
- Consistent spacing

The header should be reusable by all pages.

---

## Bottom Navigation

Create a reusable Bottom Navigation component.

Navigation items:

- Beranda
- Laporan
- FAB (Center)
- Goal
- Profile

Requirements:

- Active state
- Icon + Label
- Responsive
- Fixed position
- Rounded top corners
- Smooth active transition

Icons must use FontAwesome.

---

## Floating Action Button

The FAB must be positioned exactly in the center of the Bottom Navigation.

Requirements:

- Circular button
- Elevated shadow
- Primary theme color
- FontAwesome Plus icon
- Floating animation

Clicking the FAB should open a Bottom Sheet.

No transaction logic yet.

---

## Bottom Sheet

Create a reusable Bottom Sheet component.

The Bottom Sheet opens when the FAB is pressed.

Menu items:

- Pemasukan
- Pengeluaran
- Hutang Piutang

Requirements:

- Slide from bottom
- Close by tapping backdrop
- Close by swipe (optional if simple)
- Smooth animation

Clicking any menu should only navigate to placeholder pages.

Do not implement forms yet.

---

## Placeholder Pages

Create placeholder pages only.

Pages:

```
/

/reports

/goals

/profile

/transaction/income

/transaction/expense

/loan
```

Each page should contain:

- Page title
- Simple placeholder content

No feature implementation.

---

## Theme

Create a centralized theme configuration.

Requirements:

- Primary Color
- Secondary Color
- Background Color
- Surface Color
- Border Radius
- Shadow Presets
- Font Size Scale
- Spacing Scale

Avoid hardcoded values throughout the application.

---

## Responsive Design

Target screen width:

- Mobile First

Layout should also remain usable on tablets.

Desktop optimization is not required.

---

## Components

Only create layout-related components.

Suggested components:

```
components/base/

BaseBottomNavigation.vue

BaseBottomSheet.vue

BaseHeader.vue

BaseFab.vue

components/scaffold/layout/

AppLayout.vue

AppNavigation.vue

AppHeader.vue
```

Do not create feature components yet.

---

## Routing

Use Nuxt File-System Routing.

Do not install Vue Router manually.

Navigation must work using Nuxt routing.

---

## Animation

Use simple CSS transitions.

Keep animations lightweight.

Examples:

- Bottom Sheet
- FAB
- Navigation Active State

Avoid animation libraries.

---

## Accessibility

Ensure:

- Buttons are clickable
- Touch targets are large enough
- Icons have labels
- Navigation is keyboard accessible where applicable

---

## Deliverables

After this sprint the project should have:

- Default Layout
- Header
- Bottom Navigation
- Center FAB
- Bottom Sheet
- Placeholder Pages
- Theme Configuration
- Responsive Layout

---

## Verification

Before finishing:

Verify:

- Navigation works
- FAB opens Bottom Sheet
- Bottom Sheet closes correctly
- Placeholder pages are accessible
- Responsive layout works
- No TypeScript errors
- No ESLint errors
- Project builds successfully

---

## Output

At the end of the implementation provide:

1. New folders created
2. Components created
3. Pages created
4. Layout files created
5. Theme configuration summary
6. Any implementation notes

---

## Do NOT

Do NOT:

- Create services
- Create models
- Access IndexedDB
- Create CRUD
- Implement transactions
- Implement dashboard data
- Implement reports
- Implement goals
- Implement profile features

Only build the application layout and navigation.

The application should visually resemble Moni while remaining clean, modular, and fully reusable.