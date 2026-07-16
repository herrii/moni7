# V2 - Sprint 18 — Search Enhancement

## Objective

Enhance the application's search capabilities by creating a reusable search system that can be shared across multiple modules.

Version 1 already provides basic searching inside several modules.

This sprint focuses on improving usability, consistency, filtering, and performance without changing the existing architecture.

Do NOT rewrite existing modules.

Extend the existing implementation.

---

# Project Context

Before making any changes, carefully read the following project documents.

1. .agents/AI_CONTEXT.md
2. .agents/PROJECT_RULES.md
3. .agents/ARCHITECTURE.md
4. .agents/DATABASE.md
5. .agents/SKILLS.md
6. .agents/DEVELOPMENT_PLAN.md

These documents are the single source of truth.

---

# Existing Code Review

Before implementation

Review

- Existing Search Components
- Existing Search Helpers
- Existing Services
- Existing Filters

Identify

- duplicated search logic
- duplicated filtering logic
- repeated UI
- reusable helper functions

Do not start implementation before completing this review.

---

# Scope

Included

- Global Search Component
- Search History
- Search Suggestions
- Advanced Filter
- Search Highlight
- Search Helper
- Search Performance
- Empty State

Excluded

- AI Search
- Cloud Search
- Online Search
- OCR
- Voice Search

---

# Search Philosophy

Searching should feel fast, simple, and consistent.

Every searchable page should behave the same.

Users should never need to learn different search interfaces.

---

# Search Modules

Support searching in

- Transactions
- Accounts
- Categories
- Goals
- Hutang Piutang

Future modules should be able to reuse the same search system.

---

# Global Search Component

Create reusable component

```
components/

base/

BaseSearch.vue
```

Responsibilities

- Search Input
- Clear Button
- Search Icon
- Loading Indicator

This component must not contain business logic.

---

# Search Panel

Create reusable scaffold component

```
components/

scaffold/

search/

SearchFilterPanel.vue

SearchSuggestionList.vue

SearchHistoryList.vue
```

These components are reusable across multiple features.

---

# Search History

Store recent searches.

Maximum

10 items.

Duplicate keywords should not be stored.

Newest keyword appears first.

Provide

Clear History

button.

Store history inside IndexedDB.

One history per active User.

---

# Search Suggestions

Display suggestions while typing.

Suggestions come from

- Recent Searches
- Existing Data

Suggestions should update dynamically.

---

# Search Highlight

Highlight matching text.

Apply to

- Description
- Category
- Account
- Goal Name
- Loan Name

Highlight should be subtle.

Do not modify original text.

---

# Advanced Filter

Support reusable filters.

Possible filters

- Date Range
- Amount Range
- Category
- Account
- Status

Modules should only enable filters they need.

---

# Search Performance

Implement

Debounce

300 ms

Avoid unnecessary rendering.

Avoid repeated database queries.

Reuse cached results when appropriate.

---

# Empty State

If no results exist

Display

BaseEmptyState

Message

"No matching results found."

Provide action

Clear Search

---

# Components

Create

```
components/

base/

BaseSearch.vue

components/

scaffold/

search/

SearchHistoryList.vue

SearchSuggestionList.vue

SearchFilterPanel.vue
```

Reuse these components everywhere.

---

# Helper

Create

```
utils/

search.helper.ts
```

Responsibilities

- normalizeKeyword()

- debounceSearch()

- highlightKeyword()

- compareKeyword()

Avoid placing these utilities inside Services.

---

# Service Layer

If additional search functionality is needed

Extend existing Services.

Example

Transaction Service

↓

searchTransactions()

Account Service

↓

searchAccounts()

Never access IndexedDB directly from Components.

---

# Responsive Design

Support

- Small Phones
- Large Phones
- Tablets

Search interactions should remain comfortable on mobile.

---

# UI Direction

Follow Moni visual style.

Improve

- Search Bar
- Filter Panel
- Result List
- Empty State
- Suggestion List

Maintain consistent spacing.

---

# Validation

Verify

Search works correctly when

- Empty Keyword
- Very Long Keyword
- No Results
- Large Dataset
- Multiple Users

---

# Error Handling

Handle

- Database Error
- Search Error
- Missing Data

Display using

BaseToast

or

BaseEmptyState.

---

# Deliverables

After this sprint

The application should provide

- Global Search Component
- Search History
- Search Suggestions
- Search Highlight
- Advanced Filter
- Shared Search Helper
- Better Search Performance

---

# Verification

Verify

Search works across every module.

Search History works.

Suggestions update correctly.

Highlight works.

Filters work.

Debounce works.

Responsive layout works.

No duplicated search logic.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Output

Provide

1.

Existing search review summary

2.

Components reused

3.

New reusable components

4.

Search helper implementation

5.

Performance improvements

6.

Service enhancements

7.

Refactoring summary

---

# Do NOT

Do NOT

Rewrite existing modules.

Do NOT duplicate search implementations.

Do NOT place business logic inside BaseSearch.

Do NOT access IndexedDB directly from Components.

Do NOT create module-specific search components if the BaseSearch component can be reused.

Always extend the Version 1 architecture and maximize code reuse.