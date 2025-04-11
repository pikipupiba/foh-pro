Below is a **sample `README.md`** you can use as a starting point for your **foh-pro** project. Feel free to adapt it to your team’s standards and update any sections as the project evolves.

---

# foh-pro

**Front of House Productions (foh-pro)** is an event production rental company that requires a **web application** to serve as a **customer and employee portal**. The goal of this application is to **streamline event organization**, rental management, and employee operations for a seamless client/staff experience.

---

## Table of Contents

- [foh-pro](#foh-pro)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Key Features](#key-features)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Setup \& Installation](#setup--installation)
  - [Scripts](#scripts)
  - [Environment Variables](#environment-variables)
  - [Testing](#testing)
  - [Test Accounts](#test-accounts)
  - [Contributing](#contributing)
  - [License](#license)
    - [Contact](#contact)

---

## Project Overview

The **foh-pro** web application includes:

1. **Marketing & Public-Facing Pages**
   - Static/Server-Side Generated routes for SEO (Home, About, Contact, Services, Product Listings).
2. **Customer Dashboard (Client Components)**
   - Booking tools, event planning, live chat, social media integration, and more.
3. **Employee Portal (Client Components)**
   - Task assignments, equipment checklists, time tracking, and on-site support tools.
4. **Admin Portal (Client Components)**
   - Financial insights, employee scheduling, risk analysis, live event monitoring, and inventory restocking.

All portals integrate with third-party services like **Current RMS**, **QuickBooks/Xero**, **DocuSign**, **Google Workspace**, and **social media platforms** for a holistic event production workflow.

---

## Key Features

- **Intuitive Event Planning**: Rental wishlists, venue mapping, AI-powered equipment recommendations.
- **Real-Time Tracking**: RFID-enabled inventory, live updates for delivery/setup, push notifications.
- **Role-Based Dashboards**: Different views for Customers, Employees, and Admins.
- **Mobile-First Design**: Optimized for smartphones and tablets for on-site usage.
- **Automation & AI**: Employee scheduling, equipment suggestions, safety plans, and more.

---

## Technology Stack

| Layer                       | Technology                                                                                                          |
| --------------------------: | :------------------------------------------------------------------------------------------------------------------ |
| **BaaS**                    | Firebase (Firestore, Auth, Storage, Cloud Functions, etc.)                                                          |
| **Frontend**                | Next.js 15+ (App Router), React.js 19+, Tailwind CSS v4, Zustand v5.0.3 (state management), Framer Motion v12.6.2  |
| **Payments**                | Stripe, PayPal, QuickBooks API, Cash App, Venmo, Zelle, ACH, Apple Pay, Google Pay, Cryptocurrency                   |
| **Version Control**         | GitHub (with GitHub Actions for CI/CD)                                                                              |

**Note**: You can swap or integrate other services/tools depending on your requirements.

> **App Router Migration**: This project has been migrated from Next.js Pages Router to App Router structure for improved performance, better code organization, and access to React Server Components.

---

## Project Structure

A quick reference to the folder structure (see detailed subfolders in [`create_fohpro_structure.sh`](./scripts/create_fohpro_structure.sh)):

```
foh-pro/
├── .github/workflows/          # CI/CD workflows
├── docs/                       # Architecture diagrams, design assets, requirements
├── public/                     # Static assets (images, favicon, etc.)
├── src/
│   ├── app/                    # Next.js App Router (routes, layouts, pages)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── login/              # Login page
│   │   ├── dashboard/          # Dashboard (client component)
│   │   ├── admin/              # Admin portal (client component)
│   │   └── employee/           # Employee portal (client component)
│   ├── features/               # Domain-specific portals/features
│   ├── components/             # Shared, reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── contexts/               # React context providers
│   ├── store/                  # Global state management (Zustand, etc.)
│   ├── lib/                    # Firebase config, analytics, low-level utils
│   ├── services/               # External API integrations (QuickBooks, Social Media, etc.)
│   ├── styles/                 # Tailwind/global styling
│   └── utils/                  # General-purpose helper functions
├── tests/                      # Unit, integration, and e2e tests
├── storybook/                  # Storybook config and component stories
├── scripts/                    # Utility scripts (deployment, seeding)
├── .gitignore
├── package.json
├── tailwind.config.js
├── next.config.js
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
└── README.md
```

---

## Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YourOrg/foh-pro.git
   cd foh-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

3. **Initialize Firebase** (If you’re using Firebase CLI)
   ```bash
   firebase init
   ```
   Make sure to link your project to the correct Firebase environment.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Firebase Emulators

This project uses Firebase emulators for local development and testing. The emulators provide local versions of Firebase services (Authentication, Firestore, Functions, Storage) that run on your development machine.

### Starting Emulators with Persistence

To start the Firebase emulators with data persistence (recommended for development):

```bash
npm run emulators:persist
```

This will:
- Start all configured Firebase emulators
- Import existing data from the `firebase-emulator-data` directory (if available)
- Export data to the `firebase-emulator-data` directory when the emulators are stopped

### Test Accounts

The following test accounts are automatically created in the Auth emulator:

- **Manager**: manager@google.com / password123
- **Employee**: employee@google.com / password123
- **Customer**: customer@google.com / password123

These accounts are created with the appropriate roles in Firestore when you first attempt to log in with them using the dev bar at the bottom of the screen.

### Emulator UI

The Emulator UI is available at [http://localhost:4000](http://localhost:4000) when the emulators are running. This provides a visual interface to:

- View and manage Firestore data
- Monitor authentication state and users
- Test Cloud Functions
- View Storage files
- Monitor logs and requests

For more detailed information about the Firebase emulators, see the [EMULATORS.md](EMULATORS.md) file.

---

## Scripts

| Script         | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| **dev**        | Runs the app in development mode at `localhost:3000`.                          |
| **build**      | Builds the production-optimized bundle.                                         |
| **start**      | Starts the production server (after `build`).                                   |
| **lint**       | Runs ESLint checks to maintain code quality.                                    |
| **test**       | Runs all tests (unit/integration/E2E if configured).                           |
| **test:unit**  | Runs only unit tests.                                                         |
| **test:rendering** | Runs tests for page rendering modes (SSG, SSR, CSR).                      |
| **storybook**  | Starts Storybook locally for UI component development.                         |
| **build-storybook** | Builds a static version of Storybook for deployment.                      |
| **deploy**     | Custom script that can deploy the Next.js build to Firebase Hosting or Vercel. |
| **setup-test-accounts** | Creates test accounts in Firebase for development and testing.        |
| **emulators**  | Starts Firebase emulators (Auth, Firestore, Functions, Storage).       |
| **emulators:persist** | Starts Firebase emulators with data persistence between sessions.      |

Add or customize scripts in **`package.json`** as needed.

---

## Environment Variables

Create a **`.env.local`** file in your project root (excluded by `.gitignore`) to store sensitive credentials (e.g., Firebase keys, API tokens). Example:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""

# QuickBooks/Xero
QB_CLIENT_ID=""
QB_CLIENT_SECRET=""
```

> **Note**: Never commit `.env.local` or any files containing secrets to version control.

---

## Testing

This project follows a **Test-Driven Development (TDD)** approach. You’ll find tests in the `tests/` directory:

- **Unit Tests**: `tests/unit/`
- **Integration Tests**: `tests/integration/`
- **End-to-End (E2E)**: `tests/e2e/cypress/` (if using Cypress)

Running tests:

```bash
npm test
```
Or specify a particular suite:

```bash
npm run test:unit
npm run test:e2e
```

---

## Test Accounts

The application includes pre-configured test accounts for development and testing purposes:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `manager@google.com` | `password123` | Admin | Full access to all features |
| `employee@google.com` | `password123` | Employee | Access to employee portal |
| `customer@google.com` | `password123` | Customer | Access to customer portal |

To set up these test accounts in your Firebase project, run:

```bash
npm run setup-test-accounts
```

For more details, see [Test Accounts Documentation](docs/test-accounts.md).

---

## Contributing

1. **Fork** the repo and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **Commit** your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
3. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
4. Open a **Pull Request** in GitHub.

We welcome contributions that align with our project’s vision — from bug reports to feature improvements.

---

## License

[MIT License](LICENSE) © 2025 foh-pro

> **Note**: Replace with the actual license you intend to use (MIT, Apache, etc.).

---

### Contact

For questions, suggestions, or support, please reach out to:
- **Project Lead**: Cosmo
- **Official Site**: [www.foh-pro.com](#)
- **Email**: [contact@foh-pro.com](mailto:contact@foh-pro.com)

Thanks for checking out **foh-pro**! We look forward to simplifying event production together.