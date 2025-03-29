# Project Brief Summary (foh-pro)

*Derived from [docs/Project Brief v2.md](../docs/Project%20Brief%20v2.md)*

## 1. Project Overview & Goal

*   **Project**: foh-pro Web Application for Front of House Productions.
*   **Goal**: Streamline event production rental, organization, and operations via integrated Customer, Employee, and Admin portals for a seamless experience.

## 2. Core Components & Rendering

*   **Public/Marketing Pages**: Home, Services, etc. (SSG/SSR for SEO & performance).
*   **Customer Portal (SPA)**: Booking, event planning tools, tracking, communication.
*   **Employee Portal (SPA)**: Logistics, task management, time tracking, on-site tools, inventory (RFID).
*   **Admin Portal (SPA)**: Financial insights, scheduling, risk analysis, monitoring, inventory management.

## 3. Key Features (High-Level)

*   **Customer**: Event forms, wishlists, quotes, sales pipeline, venue specs, timeline tracking, live chat, planning tools (mapping, budgeting, AI recommendations), media uploads, feedback.
*   **Employee**: Clock-in/out, task lists, inventory tracking (RFID), checklists, navigation, troubleshooting (AI chatbot), reporting, reimbursements.
*   **Admin**: Role-based views, AI scheduling, financial dashboards, risk analysis, live monitoring, inventory alerts, approval systems.

## 4. Key Integrations

*   **Core Operations**: Current RMS (CRM/Inventory/RFID)
*   **Financial**: QuickBooks/Xero, Stripe, PayPal, various payment methods.
*   **Productivity**: Google Workspace (Calendar, Drive, Tasks, etc.)
*   **Legal**: DocuSign/Adobe Sign
*   **Mapping/Location**: Google Maps/Earth
*   **Social Media**: Facebook, Instagram, X, TikTok, YouTube, etc.

## 5. Technology Stack Summary

*   **BaaS**: Firebase (Extensive usage across services)
*   **Frontend**: Next.js (v15+), React (v19+), TypeScript
*   **UI**: Tailwind CSS (v4+), Framer Motion (v12+)
*   **State**: Zustand (v5+)
*   **Testing**: Jest, RTL, Cypress, Storybook
*   **VC**: Git/GitHub

## 6. Core Development Philosophies

*   Mobile-First, Progressive Enhancement, Offline-First, Component-Driven, Role-Based UX, AI/Automation First, Real-Time, API-First, Accessibility-First, TDD. (See `.clinerules.md` or full brief for complete list).

## 7. User Roles

*   **Customer**: Manages their events and rentals.
*   **Employee**: Executes event logistics and uses on-site tools.
*   **Admin**: Oversees operations, finances, scheduling, and has full system access.
