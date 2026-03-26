# Test Plan & Tracking

This document outlines the testing strategy for the Audio/Video Upload application and serves as a log for all tests created during feature development.

## Testing Strategy
1. **Test-Driven or Test-First Approach**: A test will be written for every new feature added to the application.
2. **Accessibility Testing**: Every component handling user input (forms, uploads) will be automatically tested for accessibility violations using `axe-core`, and manually designed for screen reader (ARIA) and keyboard operability.
3. **Tools**: Vitest, React Testing Library, jest-dom, jest-axe.
4. **Continuous Tracking**: Every time a feature is completed, the corresponding test(s) will be documented below.

## Test Log

| Feature / Component | Test File | Description | Status |
| :--- | :--- | :--- | :--- |
| Initial Setup | `setupTests.ts` | Base configuration for DOM testing | ✅ Done |
| App Setup | `App.test.tsx` | Base application renders correctly | ✅ Done |
| Header Component | `Header.test.tsx` | Ensure Header structure and design system elements function | ✅ Done |
| Button Component | `Button.test.tsx` | Ensure generic primary/secondary buttons from the design system function | ✅ Done |
| Start Page | `StartPage.test.tsx` | Ensure introductory page text matches requirements and is accessible (axe-core) | ✅ Done |
| Upload Page | `UploadPage.test.tsx` | Test accessible native file input, dynamic instructions from file-types config, and axe testing | ✅ Done |
| Metadata Form | `MetadataPage.test.tsx` | Test form fields for commissioner, location, witness, date, case ref, axe-core testing | ✅ Done |
| Confirmation Page | `ConfirmationPage.test.tsx` | Test completion page text and navigation back to upload page | ✅ Done |

### Process Checklist for AI Assistant
- [ ] Understand the feature requirements.
- [ ] Write the test implementation before or alongside the feature.
- [ ] Ensure the test passes.
- [ ] Log the test in this `TEST_PLAN.md` file.
- [ ] Explicitly confirm to the user that the feature is fully tested.
