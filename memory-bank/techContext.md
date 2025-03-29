# Technical Context (foh-pro)

*Derived from `package.json`, `README.md`, and `docs/Project Brief v2.md`.*

## 1. Core Technologies

*   **Backend-as-a-Service (BaaS)**: Firebase
    *   *Services*: Firestore (Database), Authentication, Cloud Storage, Cloud Functions (for serverless logic), Hosting, Cloud Messaging (Push Notifications), Analytics, etc. (See Project Brief for full list).
*   **Frontend Framework**: Next.js (v15.2.4+)
    *   *Language*: React (v19.1.0+)
    *   *Rendering*: Hybrid (SSG/SSR for public pages, SPA for portals)
*   **Language**: TypeScript (v5.8.2+)
*   **Styling**: Tailwind CSS (v4.0.17+)
    *   *Configuration*: `tailwind.config.js`, `postcss.config.js` (implied by `autoprefixer`)
*   **UI Animation**: Framer Motion (v12.6.2+)
*   **State Management**: Zustand (v5.0.3+)

## 2. Branding (from docs/branding/brand-guidelines.md)

*   **Company Name**: Front of House Productions (foh-pro)
*   **Primary Domain**: foh-pro.com
*   **Colors**:
    *   Black: `#000000`
    *   White: `#ffffff`
    *   Lime Green: `#9aea00`
    *   Dark Gray: `#333333`
*   **Typography**:
    *   Primary: Owners (Specifically Owners Bold)
    *   Secondary/Body: Inter (Specifically Inter Bold mentioned, likely need regular too)
*   **Logo Variants**: Primary (big), Secondary (small), Tertiary (icon) - see `docs/branding/`

## 3. Development & Tooling

*   **Package Manager**: npm (implied by `package-lock.json`)
*   **Version Control**: Git / GitHub
*   **Testing**:
    *   *Framework*: Jest (v29.7.0+)
    *   *Utilities*: React Testing Library (v16.2.0+), `@testing-library/jest-dom` (v6.6.3+)
    *   *E2E*: Cypress (v14.2.1+)
    *   *Component Library/Docs*: Storybook (v8.6.11+)
*   **Linting/Formatting**: ESLint (v9.23.0+) configured via `eslint-config-next` (likely integrates Prettier implicitly or requires separate setup).
*   **Build Tool**: Next.js CLI (`next build`)
*   **Development Server**: Next.js CLI (`next dev`)

## 4. Integrations (Technical Perspective)

*   **Payments**: Stripe (`@stripe/stripe-js`, `stripe` server-side SDK), PayPal, QuickBooks API, Cash App, Venmo, Zelle, ACH, Apple/Google Pay, Crypto (APIs/SDKs required).
*   **CRM/Inventory**: Current RMS (Requires API integration).
*   **Accounting**: QuickBooks/Xero (Requires API integration).
*   **Productivity**: Google Workspace (Requires Google APIs - Calendar, Drive, Tasks, etc.).
*   **E-Signature**: DocuSign/Adobe Sign (Requires API integration).
*   **Mapping**: Google Maps/Earth (Requires Google Maps Platform APIs).
*   **Social Media**: APIs for Facebook, Instagram, X, TikTok, YouTube, etc.

## 5. Environment & Deployment

*   **Environment Variables**: Managed via `.env.local` (see `README.md` for examples). Prefixed with `NEXT_PUBLIC_` for client-side access.
*   **Deployment Target**: Firebase Hosting (configured in `firebase.json`, deploy script in `package.json`).
*   **CI/CD**: GitHub Actions (implied by `.github/` folder mention in README, though folder doesn't exist yet).
*   **Node.js Version**: >=14.0.0 (specified in `package.json`).

## 6. Project Structure (Key Directories)

*   `src/pages`: Next.js routing, API routes.
*   `src/features`: Domain-specific modules/portals.
*   `src/components`: Shared UI components.
*   `src/hooks`: Custom React hooks.
*   `src/contexts`: React Context providers.
*   `src/store`: Zustand state management stores.
*   `src/lib`: Low-level utilities, Firebase config.
*   `src/services`: External API integration logic.
*   `src/styles`: Global styles, Tailwind base.
*   `src/utils`: General helper functions.
*   `public/`: Static assets.
*   `tests/`: Unit, integration, E2E tests.
*   `storybook/`: Storybook configuration and stories.
*   `docs/`: Project documentation, assets.
*   `scripts/`: Utility scripts.
