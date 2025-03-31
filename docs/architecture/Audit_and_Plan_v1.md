# FOH-PRO Architecture Audit & Implementation Plan (v1)

**Date:** March 31, 2025

## 1. Audit Summary

This document summarizes the initial architecture audit of the foh-pro web application based on the existing codebase and the `Project Brief v2.md`.

**Project:** foh-pro Web Application (Customer, Employee, Admin Portals)

**Technology Stack:**
*   **Frontend:** Next.js 15+ (React 19+), Tailwind CSS v4+, Zustand v5+, Framer Motion
*   **Backend (BaaS):** Firebase (Auth, Firestore, Functions, Hosting, Storage, Messaging, etc.)
*   **Payments:** Stripe (Primary), others mentioned in brief.
*   **Integrations (Planned):** Current RMS, QuickBooks/Xero, Google Workspace, DocuSign, Social Media APIs, Google Maps/Earth.
*   **Development:** TypeScript, Storybook, Jest, React Testing Library, Cypress.

**Current State:**
*   The project is in the **early planning phase**, with a basic skeleton structure set up.
*   Configuration files (`package.json`, `next.config.js`, `firebase.json`, `tsconfig.json`) are present.
*   Basic page structure (`src/pages`) and layout components (`src/components/layout`) exist.

**Key Findings & Discrepancies:**

1.  **Ambitious Scope:** The `Project Brief v2.md` outlines a comprehensive application with extensive features, integrations, and advanced development philosophies (Offline-First, Real-Time, AI, etc.).
2.  **Rendering Strategy Mismatch (CRITICAL):** The brief requires a hybrid rendering approach (SSG, SSR, SPA). However, `next.config.js` is currently configured for static-only export (`output: 'export'`), which **cannot** fulfill the SSR/SPA requirements. This needs immediate correction.
3.  **Insecure Firestore Rules:** `firestore.rules` uses the default temporary open-access rules, posing a significant security risk.
4.  **Restrictive Storage Rules:** `storage.rules` uses the default rules denying all read/write access.
5.  **Missing Implementation:** Core application logic is largely absent:
    *   No Firebase Functions defined (`functions/src/index.ts` is empty).
    *   UI component directories (`src/components/ui`, `src/components/forms`) are empty.
    *   State management (`src/store`) is not set up.
    *   Authentication flows are not implemented.
    *   Integrations (Stripe, etc.) are not implemented.

## 2. Intended Architecture Diagram

```mermaid
graph TD
    subgraph "User Browser"
        A[Next.js Frontend (Hybrid: SSG/SSR/SPA)] --> B{Zustand Store};
        A --> C[React Components (UI, Forms, Features)];
        C --> B;
        A -- API Calls --> D[Firebase Functions];
        A -- Direct SDK Calls --> E[Firebase Auth];
        A -- Direct SDK Calls --> F[Firestore];
        A -- Direct SDK Calls --> G[Firebase Storage];
        A -- API Calls/SDK --> H[Stripe API];
    end

    subgraph "Firebase Cloud"
        D -- CRUD --> F;
        D -- Access --> G;
        D -- Interact --> E;
        D -- Interact --> H;
        E[(Firebase Auth)]; F[(Firestore)]; G[(Firebase Storage)];
    end

    subgraph "External Services"
        H[(Stripe)];
        J[(Current RMS, QuickBooks, etc.)];
        D --> J;
    end

    I[Firebase Hosting] -- Serves --> A;

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style I fill:#ccf,stroke:#333,stroke-width:2px
    style D fill:#ff9,stroke:#333,stroke-width:2px
    style H fill:#9cf,stroke:#333,stroke-width:2px
    style F fill:#fcc,stroke:#333,stroke-width:1px
    style G fill:#fcc,stroke:#333,stroke-width:1px
    style E fill:#fcc,stroke:#333,stroke-width:1px
    style J fill:#ccc,stroke:#333,stroke-width:1px
```
*(Note: Components requiring significant implementation are highlighted)*

## 3. Implementation Plan

Based on the audit and the project brief, the following high-level implementation plan is proposed:

1.  **Resolve Rendering Strategy (Immediate Priority):**
    *   Modify `next.config.js` to remove `output: 'export'`. This enables the required hybrid rendering (SSG/SSR/SPA) capabilities.
2.  **Secure Firebase (High Priority):**
    *   Define and implement secure `firestore.rules` based on user roles (Customer, Employee, Admin) and data access requirements.
    *   Define and implement secure `storage.rules` based on user roles and file access needs.
3.  **Implement Authentication:**
    *   Set up Firebase Authentication (e.g., Email/Password, Google Sign-in).
    *   Integrate auth state into the frontend application.
4.  **Prioritize Vertical Slice:**
    *   Focus on implementing a core end-to-end feature set to establish patterns. Suggested initial slice:
        *   Customer Login/Signup flow.
        *   Basic Customer Dashboard (SPA).
        *   Simple Product/Service Listing page (SSR).
        *   Associated Firestore data models and secure rules.
5.  **Establish Core Structure:**
    *   Set up Zustand store structure and initial stores (`src/store/`).
    *   Create foundational UI components (`src/components/ui/`, `src/components/forms/`) using Storybook.
    *   Define basic API structure/patterns in Firebase Functions (`functions/src/`).
6.  **Iteratively Build Features & Integrations:**
    *   Incrementally develop features outlined in the brief (Rental Wishlist, Event Timeline, Employee Tools, Admin Dashboards, etc.).
    *   Implement key integrations (Stripe, Current RMS, Google Workspace) as needed for features.
    *   Continuously apply development philosophies (Offline-First, Real-Time, API-First, TDD, Accessibility).
7.  **Testing:**
    *   Write unit, integration, and E2E tests concurrently with feature development.

This plan prioritizes correcting the foundational configuration and security before building out application features.