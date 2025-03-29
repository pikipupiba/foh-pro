# Product Context (foh-pro)

## 1. Why This Project Exists

Front of House Productions (foh-pro) faces challenges managing the complexities of event production rentals. Current processes likely involve fragmented communication, manual tracking, and disjointed workflows between customers, employees, and management. This leads to inefficiencies, potential errors, and a suboptimal experience for both clients and staff.

## 2. Problems Solved

This web application aims to solve:

*   **Inefficient Booking & Planning**: Streamlining the process for customers to browse rentals, get quotes, plan events, and manage documents.
*   **Poor Operational Coordination**: Providing employees with real-time task assignments, inventory tracking (RFID), logistics information, and communication tools.
*   **Lack of Centralized Oversight**: Giving administrators a unified dashboard for financial insights, employee scheduling, inventory management, and real-time event monitoring.
*   **Data Silos**: Integrating various third-party tools (CRM, accounting, productivity, social media) into a single platform.
*   **Inconsistent User Experience**: Offering dedicated, role-based portals optimized for specific user needs (customer convenience, employee efficiency, admin control).
*   **Challenges with On-Site Operations**: Addressing the need for mobile-first access, offline capabilities, and real-time updates for field staff.

## 3. How It Should Work

The application functions as a central hub with distinct portals:

*   **Public Site**: Attracts potential customers, showcases services (SSG/SSR).
*   **Customer Portal**: Allows clients to manage their entire event lifecycle, from initial inquiry and booking to post-event follow-up, using intuitive planning tools and real-time tracking (SPA).
*   **Employee Portal**: Equips staff with tools for efficient task execution, inventory management, communication, and on-site support, optimized for mobile and potentially offline use (SPA).
*   **Admin Portal**: Provides management with comprehensive oversight, analytics, scheduling tools, and control over all aspects of the business operations (SPA).

The system leverages Firebase for real-time data synchronization and integrates with essential external services to automate workflows.

## 4. Target Users & Experience Goals

*   **Customers**: Event planners, individuals, organizations renting equipment.
    *   *Experience Goals*: Intuitive booking, easy planning, transparent tracking, seamless communication, feeling supported and informed.
*   **Employees**: Field technicians, warehouse staff, logistics coordinators.
    *   *Experience Goals*: Clear assignments, efficient workflows, reliable tools (especially mobile/offline), easy communication, reduced manual effort.
*   **Administrators**: Business owners, managers, operations leads.
    *   *Experience Goals*: Actionable insights, centralized control, automated scheduling/reporting, improved operational efficiency, risk mitigation.

**Overall Experience Goals**: Seamless, intuitive, efficient, reliable, real-time, mobile-first, automated, supportive.
