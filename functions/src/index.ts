import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import next from "next";
import path from "path";

// Determine if running in development (emulators) or production
const isDev = process.env.FUNCTIONS_EMULATOR === "true";

// Initialize the Next.js server
const server = next({
  dev: isDev,
  dir: path.join(__dirname, "../../"), // Correctly points to the project root
  conf: {
    // Ensure Next.js knows it's running in a serverless environment
    distDir: ".next", // Point to the .next directory in the root
  },
});

const nextjsHandle = server.getRequestHandler();

// Export the function named 'nextApp'
export const nextApp = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 60,
    cors: true, // Enable CORS for all origins
    invoker: "public", // Explicitly set the invoker to public
  },
  async (request, response) => {
    try {
      logger.info(`Request received for: ${request.path}`, {structuredData: true});

      // Prepare the Next.js server (this only needs to be done once)
      await server.prepare();

      // Log request details for debugging
      logger.info({
        message: "Processing request",
        url: request.url,
        method: request.method,
        headers: request.headers,
        path: request.path,
        query: request.query,
      }, {structuredData: true});

      // Handle the request with Next.js
      await nextjsHandle(request, response);

      logger.info(`Request completed for: ${request.path}`, {structuredData: true});
    } catch (error) {
      logger.error("Error handling request with Next.js:", error, {structuredData: true});

      // Provide more detailed error response
      if (!response.headersSent) {
        response.status(500).json({
          error: "Internal Server Error",
          message: error instanceof Error ? error.message : "Unknown error",
          path: request.path,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }
);
