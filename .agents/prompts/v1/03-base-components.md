# Sprint 03 — Base Components

## Objective

Build the reusable Base Components that will be used throughout the entire application.

This sprint focuses only on generic UI components.

Do NOT implement any feature-specific components or business logic.

---

## Project Context

Before writing any code, carefully read the following documents.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents define the project architecture and coding standards.

---

## Scope

Only implement reusable Base Components.

Included

- Button
- Input
- Textarea
- Select
- Card
- Badge
- Icon
- Dialog
- Bottom Sheet
- Toast
- Loading
- Empty State

Excluded

- Dashboard Components
- Transaction Components
- Goal Components
- Loan Components
- Report Components
- Profile Components

Those belong in Scaffold Components and will be implemented in later sprints.

---

# Component Philosophy

Every Base Component must be:

- Generic
- Reusable
- Stateless whenever possible
- Easy to customize
- Mobile First
- Accessible

Never create Base Components that are tied to a specific feature.

Bad Example

```
TransactionCard
```

Good Example

```
BaseCard
```

---

# Folder Structure

Create the following folder structure.

```
components/

base/

button/
BaseButton.vue

input/
BaseInput.vue
BaseTextarea.vue
BaseSelect.vue

card/
BaseCard.vue

feedback/
BaseDialog.vue
BaseToast.vue
BaseLoading.vue
BaseEmptyState.vue

navigation/
BaseBottomSheet.vue

display/
BaseBadge.vue
BaseIcon.vue
```

Keep folders organized.

---

# BaseButton

Requirements

Support:

- Primary
- Secondary
- Outline
- Ghost
- Danger

Sizes

- Small
- Medium
- Large

States

- Loading
- Disabled

Props

- variant
- size
- loading
- disabled
- fullWidth

Slots

- default
- leftIcon
- rightIcon

---

# BaseInput

Requirements

Support

- Label
- Placeholder
- Helper Text
- Error Text
- Disabled
- Required

Props

- modelValue
- label
- placeholder
- error
- disabled
- required

Emit

- update:modelValue

---

# BaseTextarea

Requirements

Support

- Auto Resize
- Error State
- Label
- Placeholder

Use same API style as BaseInput.

---

# BaseSelect

Requirements

Support

- Label
- Placeholder
- Options
- Disabled
- Error

Options should be passed via props.

Do not hardcode options.

---

# BaseCard

Requirements

Support

- Padding
- Shadow
- Rounded
- Header Slot
- Footer Slot

Slots

- header
- default
- footer

---

# BaseBadge

Requirements

Variants

- Primary
- Success
- Warning
- Danger
- Neutral

Small and Medium size.

---

# BaseIcon

Requirements

Use FontAwesome.

Support

- Size
- Color
- Rotation
- Spin

Do not use inline SVG.

---

# BaseDialog

Requirements

Reusable modal.

Support

- Title
- Description
- Confirm Button
- Cancel Button

Emit

- confirm
- cancel

---

# BaseBottomSheet

Requirements

Reusable.

Support

- Dynamic Content
- Header Slot
- Footer Slot
- Close on Backdrop
- Close Button

Animation

Slide Up

Use CSS transition only.

---

# BaseToast

Requirements

Support

- Success
- Error
- Warning
- Info

Position

Bottom

Animation

Fade

Slide

Should be reusable globally.

---

# BaseLoading

Requirements

Support

- Spinner
- Skeleton Placeholder

Keep implementation lightweight.

---

# BaseEmptyState

Requirements

Support

- Icon
- Title
- Description
- Optional Action Button

Should be reusable for all empty pages.

---

# Styling Rules

Use TailwindCSS.

Do not write duplicated utility classes repeatedly.

If necessary, create reusable helper classes.

Use the theme configuration created in Sprint 02.

Avoid hardcoded colors.

---

# Accessibility

All components should:

- Support keyboard navigation
- Have visible focus state
- Use semantic HTML
- Be screen-reader friendly where possible

---

# Mobile First

Every component must be designed for mobile devices first.

Touch target minimum:

44px × 44px

---

# Reusability

Before creating a component ask yourself:

Can this component be reused by another feature?

If yes,

it belongs in Base Components.

---

# Deliverables

After this sprint the project should contain:

- BaseButton
- BaseInput
- BaseTextarea
- BaseSelect
- BaseCard
- BaseBadge
- BaseIcon
- BaseDialog
- BaseBottomSheet
- BaseToast
- BaseLoading
- BaseEmptyState

No feature-specific components.

---

# Verification

Verify

- Components render correctly
- Props work
- Slots work
- Emits work
- Responsive
- Mobile friendly
- No TypeScript errors
- No ESLint errors

---

# Output

Provide:

1. Folder structure created

2. Components created

3. Shared props summary

4. Shared slots summary

5. Shared emits summary

6. Reusability notes

---

# Do NOT

Do NOT

- Create Scaffold Components
- Create Services
- Create Models
- Create Database
- Create CRUD
- Create Transactions
- Create Dashboard
- Create Reports
- Create Goals
- Create Hutang Piutang
- Create Profile Components

Only implement reusable Base Components.

Every component should be generic enough to be reused by every feature in Moni7.