# Evidence by Commission (EBC) Transcript Service

This is a prototype web application designed for Justiciary teams to upload video and audio recordings of Evidence by Commission (EBC) hearings, facilitating the automated generation of transcripts.

## Overview
The application is built using React, TypeScript, and Vite. It heavily focuses on a streamlined user experience, implementing the look and feel of the Scottish Courts design system while ensuring all interactive elements are strictly accessible (validated via `jest-axe`).

## Multi-Page Workflow
The local version implements a rigid 4-step wizard interface. Users navigate through the following flow:

### 1. Start Page (`StartPage.tsx`)
*   **Function:** Explains the purpose of the application (AI-powered transcription for EBC hearings).
*   **Actions:** Users click "Start now" to begin the upload process.

### 2. File Upload (`UploadPage.tsx`)
*   **Function:** Provides a natively accessible file input.
*   **Features:**
    *   Dynamic allowed extensions (driven by centralized config `src/config/fileTypes.ts`): `.mp4, .mov, .avi, .mkv, .mp3, .wav, .aac, .m4a`.
    *   State lifting: Validates that a file is selected before enabling the user to proceed.
*   **Navigation:** Contains "Back" and "Cancel" buttons to safely return to the start.

### 3. Metadata Collection (`MetadataPage.tsx`)
*   **Function:** Gathers context about the EBC hearing to pair with the recording.
*   **Fields required:**
    *   Commissioner name (Text)
    *   Interview location (Dropdown, automatically alphabetized)
    *   Witness name (Text)
    *   Interview date (Date picker)
    *   Case reference (Text)
*   **Navigation:** Form validates all fields are populated before enabling the "Submit" action. Contains "Back" and "Cancel".

### 4. Confirmation (`ConfirmationPage.tsx`)
*   **Function:** Provides success feedback using a high-contrast banner. 
*   **Features:** In a real deployment, this is triggered when the combined payload (File + Metadata) is successfully posted to the backend API. Currently, the local app logs the combined payload to the console (`console.log`) instead to simulate completion.
*   **Navigation:** Allows the user to select "Submit another file" which loops them cleanly back to the Upload phase.

## Technical Architecture & Design System

*   **Styling:** Custom CSS based on the `scotcourts.gov.uk` styling, primarily relying on Vanilla CSS (`index.css` and local component CSS files). It strictly unifies variables like `--color-primary-blue` and `--color-success` to prevent "spaghetti code."
*   **Routing:** React component state in `App.tsx` routes users seamlessly between steps without reloading the DOM.
*   **Accessibility:**
    *   Semantic labels paired with `htmlFor`.
    *   Visually hidden help text announced safely via screen readers (`.visually-hidden`).
    *   Automated regression scanning during tests (`vitest` + `jest-axe`).

## Running the Project
1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev` (Access via `http://localhost:5173`)
3. Run the automated test suite: `npm run test`
