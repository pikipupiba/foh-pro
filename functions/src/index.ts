/**
 * Firebase Cloud Functions for FOH Pro
 *
 * This file is intentionally minimal as we're using Firebase's built-in Next.js integration
 * via the frameworksBackend configuration in firebase.json, which automatically creates
 * a Cloud Function to serve the Next.js app.
 *
 * When you need to add custom Cloud Functions for your application, you can define them here.
 * Examples include:
 * - API endpoints for third-party integrations
 * - Scheduled functions for maintenance tasks
 * - Firestore triggers for data processing
 * - Authentication hooks
 */

// Uncomment and modify the example below when you need to add a custom function
/*
import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Example callable function
export const helloWorld = onCall(
  {
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 30,
    invoker: "public", // Allow unauthenticated access
  },
  (request) => {
    // Log the function call
    logger.info("Hello World function called", {
      structuredData: true,
      user: request.auth?.uid || "unauthenticated",
    });

    // Return a response
    return {
      message: `Hello ${request.data?.name || 'World'}!`,
      timestamp: new Date().toISOString(),
    };
  }
);
*/
