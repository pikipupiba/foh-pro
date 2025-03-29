**Project Brief: Front of House Productions (foh-pro) Web Application**

## **1. Project Overview**

**Front of House Productions (foh-pro)** is an event production rental company that requires a **web application** to serve as a **customer and employee portal**. The goal of this application is to **streamline event organization**, rental management, and employee operations to provide a **seamless experience** for clients and staff.

## **2. Objectives**

- Provide an **intuitive customer portal** for booking event production rentals and managing events.
- Enable **employees to efficiently coordinate**, track, and manage event logistics.
- Offer **management tools** for inventory tracking, scheduling, and financial insights.
- Integrate with **third-party tools** to enhance automation and data accuracy.
- Optimize for **speed and accessibility** across desktop and mobile devices.

## **3. Key Features**

### **Home** - SSG

- Brief introduction to foh-pro and its value proposition.
- Website feature overview.
	- Advantages of making an account.
	- Streamlined / efficient / automated.
- Send us a message!
	- Short e-mail form
- Clear calls-to-action for:
	- “Customer Login”
	- “Team Member Login” (employee / admin)
	- “Continue as guest.”

### **Product/Service Listings** - SSR

- SEO Optimized product / service listing

### **Global Navigation & Support**

- **Main Navigation Menu** (Clearly visible header/menu with sections for Dashboard, Customer Portal, Employee Tools, and Management.)
- **Search & Notifications** (A global search bar to quickly locate functions, and a notifications center for all user types.)
- **Profile & Settings** (Easy access to personal settings, support resources, and help/FAQ.)
- **Footer** (Company information, legal and privacy links, contact details, and social media connections.)

### **Customer Portal** - SPA

#### **Pre-Rental**

- **Tell Us About Your Event Form** (Type, Location, Budget, Contacts, Date/Time)
- **Rental Wishlist & Quotation Tool**
- **Sales Pipeline** (View/Edit Rentals, Submit Documents, Sign Contracts)
- **Venue Specs Submission** (Power, Parking, Contacts, Site Plans)
- **Event Timeline Tracker** (Inquiry → Sales → Delivery → Event → Load Out)
- **Push Notifications & Live Updates**
- **Live Chat Support with foh-pro Representatives**

#### **Event Planning & Tools**

- **Google Earth Venue Mapping** (Stage Placement, Load In/Out, Electrical Access)
- **Promotional Material Generator**
- **Data Storage for Stage Plots, Event Photos/Videos** (Rewards for Uploads)
- **Real-Time Rental Tracking** (Status, Delivery, foh-pro Team Assignments)
- **Social Media Sharing Widget** (Easy content uploads to Facebook, Instagram, X, Snapchat, TikTok, Reddit, YouTube, Discord, Yelp, Google Business Page)
- **Interactive Event Budgeting Tool** (Customers input budgets to receive suggested equipment packages.)
- **AI-Powered Equipment Recommender** (Suggests the best setups based on event details.)
- **Venue Compatibility Checker** (Ensures rental equipment fits the venue's size and power availability.)
- **Guest List & RSVP Manager** (Send invites and track responses.)
- **Weather & Environmental Risk Alerts** (Real-time weather tracking with event risk warnings.)
- **Real-Time Event Dashboard** (Live updates on event setup, foh-pro staff progress, and issue reports.)
- **Customizable Stage & Lighting Designer** (Drag-and-drop tool for stage and lighting setups.)
- **Digital Event Checklist Generator** (Automated event checklist based on event type.)
- **Multi-User Event Collaboration** (Role-based access for team members and vendors.)
- **Emergency Contact & Support Line** (Quick-access emergency contacts and foh-pro support requests.)
- **Digital Business Card & Networking Feature** (Shareable QR code for rental history and networking.)
- **Social Media Auto-Posting Tool** (Schedule and share event updates directly.)
- **Loyalty Rewards & VIP Discounts** (Earn reward points for repeat rentals.)

#### **Post-Event & Follow-Up**

- **Media & Reporting** (Event photo/video gallery with watermarks, automated summary reports, and loyalty rewards.)
- **Feedback & Analysis** (Option for feedback submissions and insights for future event improvements.)
- **Automated Event Summary Report** (Generates a post-event report with rental history, feedback requests, and analytics.)
- **Event Photo & Video Gallery** (Upload event media with branded watermarks for social sharing.)
- **Customer Referral Program** (Discounts for Referrals)

### **Employee Portal** - SPA

#### **Logistics & Workflow**

- **Clock In/Out & Time Tracking**
- **Google Workspace Integration** (Calendar, Drive, Tasks, Voice)
- **RFID-Enabled Inventory Tracking** (Scan Equipment, Monitor Condition & Location)
- **Job Assignments & Task Lists** (With Comments & Status Updates)
- **Loading Lists & Equipment Checklists**
- **Google Maps Integration for Venue Navigation**
- **SOS Button for Emergencies** (Severity-Based Push Notifications)

#### **Technical Support & On-Site Tools**

- **Live Equipment Status Dashboard** (RFID-Based Tracking)
- **AI Chatbot for Troubleshooting** (Instant Access to Manuals & FAQs)
- **Production Power Calculator** (Stage Load & Power Estimations)
- **Incident Report Submission Tool** (Safety & Equipment Damage Reporting)
- **Training Library** (Videos, Documents, Quizzes for Employees)
- **Mileage Tracking for Expense Reimbursements**
- **Automated Reimbursement System** (Integrates with Cash App, Venmo, PayPal, Zelle, and ACH transfers for fast employee payments.)

### **Admin Portal** - SPA

- Has the ability to view the Dashboard as any other user.
- **AI-Generated Employee Scheduling** (Based on Availability & Skills)
- **Real-Time Profit & Expense Dashboard** (Integrated with QuickBooks/Xero)
- **Event Risk Analysis Tool** (Predictive Planning for Weather & Logistics)
- **Live Event Monitoring Dashboard** (Track foh-pro Team & Event Progress)
- **Inventory Auto-Restocking Alerts**
- **Emergency Action Plan Generator** (Prepares Safety Protocols Per Venue/Event)
- **Approval System for Purchases & Expenses** (Automated Amazon Purchase on Approval?)

## **4. Integrations**

| Integration                | Purpose                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Current RMS**            | Customer Data (CRM), Inventory Tracking, RFID Functions                                        |
| **QuickBooks/Xero**        | Invoicing & Payments                                                                           |
| **Google Workspace**       | Calendar, Drive, Gmail, Tasks, Voice                                                           |
| **DocuSign/Adobe**         | Contract & Document Signing                                                                    |
| **Social Media Platforms** | Facebook, Instagram, X, Snapchat, TikTok, Reddit, YouTube, Discord, Yelp, Google Business Page |
| **Google Maps/Earth**      | Venue Mapping, Route Optimization                                                              |

## **5. Technology Stack**

| Layer              | Technology                                                                                                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BaaS               | Firebase (Realtime Database, Cloud Firestore, Authentication, Cloud Functions, Hosting, Cloud Storage, Cloud Messaging, Performance Monitoring, Analytics, Remote Config, In-App Messaging, Test Lab, App Distribution) |
| Frontend           | React.js 19, Next.js 15+, Tailwind CSS v4.0, Zustand v5.0.3, Framer Motion v12.6.2                                                                                                                                      |
| Payment Processing | Cash, Check, **Stripe**, PayPal, QuickBooks API, Cash App, Venmo, Zelle, ACH Transfers, Apple Pay, Google Pay, Cryptocurrency                                                                                           |
| Version Control    | GitHub                                                                                                                                                                                                                  |

## **6. User Roles & Permissions**

| Role     | Permissions                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer | Rental booking, document submission, live tracking, event planning tools, etc.                                                                          |
| Employee | Equipment checklists, task assignments, SOS alerts, site maps, RFID scanning, etc.                                                                      |
| Admin    | All employee permissions plus: Financial insights, event risk analysis, employee oversight, inventory auto-restocking, view-app-as any other user, etc. |

## **7. Rendering Approach**

- **Goal**: Build a performant, modern web app that handles both **public-facing** content (informational/marketing) and **private, real-time portals** (customer/employee/admin).
- **Scope**: FOH-PRO requires SSG/SSR for SEO-critical or public pages and SPA for feature-rich, user-specific dashboards.

1. **Static Site Generation (SSG)**
    - **Pages**: Home, About, Services Overview, FAQ, Blog
    - **Rationale**: Content changes infrequently; SSG provides fast load times and strong SEO.
    - **Implementation**: Incremental Static Regeneration to update pages upon content edits.
        
2. **Server-Side Rendering (SSR)**
    - **Pages**: Product/Service Listings, Event Showcases, Dynamic Public Portfolios
    - **Rationale**: Must remain SEO-accessible but contain frequently updated data (e.g., availability, pricing, event updates).
    - **Implementation**: Real-time data fetched on each request; the server pre-renders HTML before sending to the client.
        
3. **Single-Page Application (SPA)**
    - **Portals**: Customer Portal, Employee Portal, Admin Portal
    - **Rationale**: Highly interactive, real-time features (live chat, push notifications, role-based dashboards).

## **8. Development Philosophies**

To ensure the FOH-PRO web application is fast, scalable, resilient, and user-friendly across all roles and environments, the following **core development philosophies** will guide our architecture, UX, and engineering practices:

### **1. Mobile-First Design**

Prioritize mobile responsiveness across all views. Users — especially on-site employees — will primarily access the application via phones or tablets in high-pressure environments.

### **2. Progressive Enhancement**

Build a strong, functional baseline for all users and enhance features for modern devices and browsers. Every critical workflow should function under low bandwidth and with limited device capabilities.

### **3. Offline-First / Resilient by Design**

Field workers may operate without stable internet. Tools like time tracking, checklists, and equipment scanning should work offline and sync automatically when reconnected.

### **4. Component-Driven Development**

Leverage reusable, documented UI components using Storybook and Tailwind. Isolated component development improves consistency and speeds up iteration.

### **5. Role-Based UX Personalization**

Deliver tailored dashboards and functionality based on user roles (Customer, Employee, Admin). Show each user the most relevant tools and information first.

### **6. AI & Automation First**

Wherever possible, lean on AI to suggest, automate, or pre-fill — from equipment recommendations to employee scheduling. Human interaction should refine, not initiate.

### **7. Design for Chaos**

Plan for unpredictable, live event conditions. Ensure autosave, real-time syncing, undo/redo options, and clear UI states for outages, errors, or in-progress actions.

### **8. Real-Time Everything**

Use Firebase Realtime Database and Cloud Messaging to support live updates, push notifications, status tracking, and interactive dashboards with zero lag.

### **9. API-First Architecture**

Build the app with a modular, API-driven approach. Enable future integrations, mobile apps, partner portals, and external tools via a clean internal/external API layer.

### **10. Accessibility-First (a11y)**

Ensure WCAG-compliant interfaces across all devices. Use semantic HTML, proper contrast ratios, keyboard navigability, and screen reader support from day one.

### **11. Privacy & Data Ownership by Design**

Build transparent, opt-in data flows. Empower users to download, delete, or control the use of their data, especially around media uploads and contact information.

### **12. Test-Driven Development (TDD)**

Write tests **before** implementing business logic or UI features. Emphasize unit, integration, and end-to-end testing to ensure system reliability and rapid refactoring.

### **13. DevOps & Observability**

From staging to production, implement automated CI/CD, performance monitoring, error reporting, and user session logging. Ensure fast recovery and full traceability of bugs.

### **14. Gamified Engagement & Loyalty**

Incorporate rewards, badges, and milestones to boost customer retention and employee motivation. Reward repeat usage, on-time checklists, referrals, and media sharing.

### **15. Inclusive & Neurodiverse Design**

Design calm, accessible interfaces with clear headings, structured information, and optional focus/quiet modes for users with ADHD, dyslexia, or sensory sensitivities.

### **16. Customer Service is a Feature**

Make it fast and easy to get help at any stage. Build support into every screen with features like live chat, click-to-call, emergency escalation, and contextual help articles.

---

**Project Lead:** Cosmo  
**Date:** March 2025  
**Status:** Planning Phase 🚀