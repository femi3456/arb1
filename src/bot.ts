import { ethers } from "ethers";
import { CONFIG } from "./config";
import { logger } from "./logger";
import { provider } from "./provider";
import { OpportunityDetector } from "./opportunityDetector";

async function main() {
  logger.info("Starting MEV Arbitrage Bot...");

  try {
    // Initialize components
    const detector = new OpportunityDetector();

    logger.info("Bot initialized successfully");

    // Main loop
    while (true) {
      try {
        await detector.checkOpportunities();
        await new Promise(resolve => setTimeout(resolve, CONFIG.OPPORTUNITY_CHECK_INTERVAL));
      } catch (error) {
        logger.error("Error in main loop:", error);
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s on error
      }
    }
  } catch (error) {
    logger.error("Failed to start bot:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  logger.info("Shutting down bot...");
  process.exit(0);
});

main().catch(console.error);