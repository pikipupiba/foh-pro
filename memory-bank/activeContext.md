# Active Context (foh-pro)

**Date:** 2025-03-31 (Updated Again)

## Current Focus

*   Finalizing Tailwind CSS v4 CSS-first configuration.

## Recent Changes

*   Initialized Memory Bank and incorporated branding guidelines.
*   **Verified Scaffold**: Listed contents of `src/` directory using `list_files` to confirm scaffold structure exists.
*   Updated `memory-bank/progress.md` to reflect the scaffolded state.
*   **Verified Development Workflow**: Successfully ran `npm run dev`, `npm run lint`, `npm test` (after installing `ts-jest` and `jest-environment-jsdom`), and `npm run storybook` (after updating script in `package.json`, creating `.storybook/main.ts`, and installing `@storybook/addon-interactions`).
*   Updated `memory-bank/progress.md` again to note successful workflow verification.
*   Updated `memory-bank/activeContext.md` (this file).
*   **Firebase Setup**: User created Firebase project, installed CLI, ran `firebase init`, and provided config.
*   **Firebase Integration**: Created `src/lib/firebase/firebaseConfig.ts` with provided credentials and initialized SDK exports (app, auth, db, storage, analytics).
*   **Firebase Hosting Deployment**:
    *   Configured Next.js for static export (`output: 'export'` in `next.config.js`) to align with Firebase Hosting's `public` directory setting (`out`).
    *   Added `cleanUrls: true` to `firebase.json` to handle extensionless URLs correctly.
    *   Successfully built and deployed the application and configuration changes, resolving the 404 error on `/firebase-test`. Tested basic Firestore connectivity via the deployed page.
*   **Tailwind CSS v4 Setup**:
    *   Installed `@tailwindcss/postcss`, removed `autoprefixer`.
    *   Created `postcss.config.js` using `@tailwindcss/postcss`.
    *   Created `src/styles/globals.css` with `@import "tailwindcss";` and `@theme` definitions for brand colors.
    *   Created `src/pages/_app.tsx` to import `globals.css`.
*   **Firebase Test Page Enhancement**:
    *   Expanded `src/pages/firebase-test.tsx` to include tests for Authentication (Anonymous Sign-in/out), Firestore (Update, Delete, Real-time Subscription), and Cloud Storage (File Upload).
    *   Restyled the page using Tailwind v4 classes and CSS theme variables for a cleaner UI.
    *   Successfully built and redeployed the enhanced test page.
*   **Storybook Simplification**:
    *   Moved stories from `storybook/stories/` to `src/stories/`.
    *   Removed old `storybook/` directory.
    *   Simplified `.storybook/main.ts` by removing initial custom `webpackFinal` config.
    *   Diagnosed and fixed TypeScript parsing errors by restoring Babel config in `webpackFinal` (relying on `.babelrc`).
    *   Fixed CSS syntax errors (missing semicolons) in `src/styles/globals.css`.
    *   Installed `@storybook/nextjs` addon and added it to `.storybook/main.ts`.
    *   Removed incompatible `next-router-mock` (`MemoryRouterProvider`) from story files.
    *   Fixed Tailwind v4 `@theme` syntax error in `src/styles/globals.css`.
    *   Created `tailwind.config.js` with correct theme mappings.
    *   Fixed Tailwind v4 `@utility` syntax error in `src/styles/globals.css` by using `@layer components`.
    *   Successfully ran `npm run storybook` with the simplified and corrected configuration.
*   **Babel Removal**:
    *   Removed `webpackFinal` section from `.storybook/main.ts`.
    *   Deleted `.babelrc` file.
    *   Uninstalled Babel dependencies (`@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`, `@storybook/addon-webpack5-compiler-babel`).
    *   Confirmed `npm run storybook` works correctly without Babel, relying on SWC via `@storybook/nextjs`.
*   **Tailwind CSS v4 CSS-First Config**:
    *   Attempted removing `tailwind.config.js` and consolidating config into `src/styles/globals.css` using `@config` and `@theme`.
    *   Diagnosed build failures related to incorrect `@theme` syntax (mixing variable definitions and mappings).
    *   Removed `tailwind.config.js`.
    *   Corrected `src/styles/globals.css` to use proper CSS-first approach: defined custom fonts with `@font-face`, defined CSS variables (colors, fonts) in `@theme`, removed explicit theme mappings (relying on automatic generation), and applied default body font.
    *   Confirmed `npm run dev` works with CSS-only configuration.

## Next Steps

*   Storybook configuration is simplified, functional, and uses SWC.
*   Tailwind CSS v4 is correctly configured using the CSS-first approach in `globals.css`.
*   Firebase setup is complete and tested.
*   Project tooling (Storybook, Tailwind, Next.js) is standardized and functional.
*   Await user direction for the next task (e.g., implementing auth, building components/pages).

## Active Decisions & Considerations

*   Successfully removed Babel configuration (`.babelrc`, `webpackFinal`) and dependencies. Storybook now uses SWC via the `@storybook/nextjs` addon for transpilation.
*   Used `@storybook/nextjs` addon for Next.js integration instead of `next-router-mock`.
*   Successfully removed `tailwind.config.js` and implemented Tailwind v4 CSS-first configuration in `src/styles/globals.css` using `@font-face` and `@theme` correctly.
