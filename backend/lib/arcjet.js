import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node"; // Import only what is used
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Initialize ArcJet with security rules
export const aj = arcjet({
    key: process.env.ARCJET_KEY, // API key from environment
    characteristics: ["ip.src"], // This is an example, you can add more characteristics if needed
    rules: [
        // Shield protects you from common attacks (e.g., SQL injection, XSS, CSRF)
        shield({
            mode: "LIVE", // Ensure to specify the mode
        }),

        // Bot detection rules
        detectBot({
            mode: "LIVE", // Blocks all bots except search engines
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Allow only search engines
                // You can add more categories as needed
            ],
        }),

        // Adjusted rate limiting with token bucket
        tokenBucket({
            mode: "LIVE",
            refillRate: 10,  // 10 tokens per interval
            interval: 5,     // Refill every 5 seconds (faster refill)
            capacity: 20,    // Max capacity of the bucket (increased to 20)
        }),
    ],
});
