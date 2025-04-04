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
    // distDir: "../../.next", // Point to the .next directory in the root (relative to functions/lib)
  },
});

const nextjsHandle = server.getRequestHandler();

// Export the function named 'nextApp'
export const nextApp = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 60,
  },
  async (request, response) => {
    try {
      logger.info(`Request received for: ${request.path}`, {structuredData: true});
      await server.prepare();
      await nextjsHandle(request, response);
    } catch (error) {
      logger.error("Error handling request with Next.js:", error, {structuredData: true});
      response.status(500).send("Internal Server Error");
    }
  }
);
