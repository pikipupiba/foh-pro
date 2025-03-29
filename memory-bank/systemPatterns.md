# System Patterns (foh-pro)

*Inferred from file structure, project brief, and tech context.*

## 1. Overall Architecture

*   **Monorepo/Polyrepo**: Currently appears to be a single repository (Monolith Frontend).
*   **Frontend Architecture**: Feature-Sliced Design (or similar concept) suggested by `src/features` directory, promoting modularity and separation of concerns by business domain (Customer Portal, Employee Portal, Admin Portal).
*   **Backend Architecture**: Backend-as-a-Service (BaaS) using Firebase. Logic distributed between client-side (Next.js/React), Firebase services (Firestore rules, Auth), and serverless Cloud Functions for specific backend tasks or secure operations.
*   **API Layer**: Primarily interacts with Firebase SDKs directly on the client/server (Next.js API routes). A dedicated `src/services` layer likely abstracts third-party API integrations. Potential for Next.js API routes (`src/pages/api`) to act as backend-for-frontend (BFF) or for Cloud Functions.

## 2. Rendering Strategy

*   **Hybrid Rendering**: Leverages Next.js capabilities:
    *   **SSG (Static Site Generation)**: For public, marketing-focused pages (Home, About). Uses `getStaticProps`. Incremental Static Regeneration (ISR) likely for updates.
    *   **SSR (Server-Side Rendering)**: For dynamic public pages needing SEO and fresh data (Product Listings, Event Showcases). Uses `getServerSideProps`.
    *   **SPA (Single-Page Application)**: For authenticated user portals (Customer, Employee, Admin) requiring high interactivity and real-time updates. Client-side rendering dominates after initial load.

## 3. UI & Component Design

*   **Component-Driven Development**: Emphasized by the use of Storybook and a dedicated `src/components` directory for shared, reusable UI elements.
*   **Atomic Design (Implied)**: Likely follows principles where smaller components (`atoms`) build up larger ones (`molecules`, `organisms`), potentially organized within `src/components/ui` vs. `src/components/forms`, etc. Feature-specific components reside within `src/features/*/components`.
*   **Styling**: Utility-first approach using Tailwind CSS. Global styles and Tailwind configuration in `src/styles`.
*   **Layout**: Likely managed via components in `src/components/layout` applied within `src/pages/_app.tsx` (or equivalent).

## 4. State Management

*   **Global State**: Zustand (`src/store`) for managing application-wide state accessible across features.
*   **Local/Component State**: Standard React state (`useState`, `useReducer`).
*   **Context API**: `src/contexts` suggests usage for sharing state within specific component subtrees (e.g., Auth state, Theme).
*   **Server Cache/Data Fetching**: Next.js built-in data fetching methods (`getServerSideProps`, `getStaticProps`). React Query or SWR might be considered later for client-side caching and data synchronization, although initial reliance might be on Firebase real-time listeners.

## 5. Data Flow & Management

*   **Primary Database**: Firestore (NoSQL, document-based). Data modeling will be crucial.
*   **Real-time Updates**: Leveraging Firebase Realtime Database or Firestore listeners for live data synchronization in portals.
*   **Authentication**: Firebase Authentication handles user sign-up, login, sessions. Auth state likely managed via `src/contexts/AuthContext`.
*   **File Storage**: Firebase Cloud Storage for user uploads (venue specs, event photos).
*   **API Interactions**: Abstracted within `src/services` for third-party APIs (Stripe, QuickBooks, Google, etc.). Next.js API routes (`src/pages/api`) may serve as proxies or handle specific backend logic.

## 6. Key Architectural Patterns & Philosophies Applied

*   **Feature-Sliced Design**: Organizing code by business domain/feature.
*   **Mobile-First**: Design and implementation prioritize smaller screens.
*   **API-First**: Designing internal and external interactions around APIs (even if initially internal via services layer).
*   **Real-Time**: Core to the user experience, enabled by Firebase.
*   **Serverless**: Utilizing Cloud Functions for backend logic where appropriate.
*   **Component-Based Architecture**: Building the UI from reusable pieces.
*   **Test-Driven Development (TDD)**: Guiding implementation with tests.

## 7. Potential Future Patterns

*   **Microservices**: If backend complexity grows significantly beyond Firebase/Cloud Functions.
*   **Event-Driven Architecture**: For handling complex workflows and inter-service communication (e.g., using Firebase triggers or Pub/Sub).
*   **Advanced Caching**: Implementing client-side caching libraries (React Query, SWR) if Firebase listeners become insufficient or costly.
