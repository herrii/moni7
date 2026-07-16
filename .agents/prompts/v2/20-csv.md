# V2 - Sprint 20 — CSV Enhancement

## Objective

Enhance the existing CSV Import and Export functionality implemented in Version 1.

This sprint focuses on improving usability, validation, preview, duplicate detection, error reporting, and overall user experience.

Do NOT rewrite the existing CSV implementation.

Reuse the existing CSV Service whenever possible.

CSV remains the only supported import/export format.

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

- Existing CSV Service
- Import Page
- Export Page
- CSV Parser
- CSV Generator
- Validation Helpers

Identify

- duplicated validation
- duplicated parsing
- reusable helpers
- possible UI improvements

Do not begin implementation before completing this review.

---

# Scope

Included

- CSV Preview
- Better Validation
- Duplicate Detection
- Import Summary
- Export Options
- Error Report
- CSV Performance
- Better User Experience

Excluded

- Excel (.xlsx)
- PDF
- JSON
- Cloud Backup
- Online Sync

CSV remains the only supported format.

---

# CSV Philosophy

Import and Export must be

- Safe
- Predictable
- Reversible
- User Friendly

The application must never silently overwrite user data.

Every import should be transparent.

---

# Import Enhancement

Improve existing Import flow.

New workflow

Select CSV

↓

Validate File

↓

Preview Data

↓

Show Summary

↓

Confirm Import

↓

Import

↓

Display Result

Never import immediately after selecting a file.

---

# CSV Preview

Before importing

Display

- Total Rows
- Valid Rows
- Invalid Rows
- Duplicate Rows

Preview

Maximum

20 rows.

Do not render the entire file.

---

# Validation

Validate

- Required Columns
- Missing Values
- Invalid Numbers
- Invalid Dates
- Invalid Categories
- Invalid Accounts
- Invalid User
- Unsupported Format

Rows containing errors should not stop the entire import process.

---

# Duplicate Detection

Detect duplicate records.

Compare

- Date
- Amount
- Description
- Category
- Account

Duplicates should be

Skipped

by default.

Display duplicate count.

Do not automatically overwrite existing records.

---

# Import Summary

After import

Display summary

Imported

Skipped

Duplicate

Failed

Provide detailed information.

---

# Error Report

Generate readable error report.

Display

- Row Number
- Error Type
- Error Message

Allow users to review problems before retrying.

---

# Export Enhancement

Improve export workflow.

Allow exporting

- Transactions
- Accounts
- Categories
- Goals
- Loans

Each module generates an independent CSV file.

---

# Export Options

Support

- Current Month
- Selected Period
- All Data

Allow exporting only the selected module.

---

# File Naming

Use consistent naming.

Example

Transactions-2026-07.csv

Accounts-2026-07.csv

Goals-2026-07.csv

Loans-2026-07.csv

---

# Components

Reuse existing components whenever possible.

Possible additions

```
components/

scaffold/

csv/

ImportPreview.vue

ImportSummary.vue

ImportErrorTable.vue

ExportOptions.vue
```

Avoid duplicate implementations.

---

# CSV Service

Continue using

csv.service.ts

If additional functionality is required

extend the existing service.

Do not create another CSV service.

---

# Helper

Create or extend reusable helpers.

Possible helper functions

```
utils/

csv.helper.ts
```

Responsibilities

- validateCsv()

- detectDuplicates()

- parseAmount()

- parseDate()

- generateCsv()

Avoid placing these functions inside Vue Components.

---

# Performance

Support importing

Large CSV files.

Do not load unnecessary objects into memory.

Avoid repeated parsing.

Reuse parsed results.

---

# Responsive Design

Support

- Small Phones
- Large Phones
- Tablets

CSV workflow should remain comfortable on mobile devices.

---

# UI Direction

Maintain Moni-inspired design.

Improve

- Import Dialog
- Preview Table
- Export Options
- Empty State
- Success Summary
- Error Summary

Keep visual consistency.

---

# Service Layer

All Import and Export logic belongs inside

CSV Service.

Components should only display UI.

Never access IndexedDB directly.

---

# Validation

Verify

- Empty CSV
- Invalid CSV
- Missing Columns
- Large CSV
- Duplicate Records
- Mixed Valid/Invalid Data

---

# Error Handling

Handle

- Invalid File
- Corrupted CSV
- Missing Columns
- Parsing Error
- Database Error

Display

BaseToast

or

BaseDialog.

---

# Deliverables

After this sprint

CSV should provide

- Preview Before Import
- Better Validation
- Duplicate Detection
- Import Summary
- Error Report
- Better Export Options
- Improved Performance

---

# Verification

Verify

Preview works.

Validation works.

Duplicate detection works.

Import summary is correct.

Export generates correct CSV.

Large CSV works correctly.

Responsive layout works.

No duplicate parsing logic.

No TypeScript errors.

No ESLint errors.

Production build succeeds.

---

# Output

Provide

1.

Existing CSV review summary

2.

Components reused

3.

New components created

4.

CSV Service improvements

5.

Validation improvements

6.

Performance optimizations

7.

Refactoring summary

---

# Do NOT

Do NOT

Rewrite the CSV implementation.

Do NOT overwrite existing data automatically.

Do NOT stop importing because one row is invalid.

Do NOT duplicate parsing logic.

Do NOT place CSV parsing inside Vue Components.

Do NOT access IndexedDB directly.

Always extend the existing Version 1 implementation while preserving the established architecture.