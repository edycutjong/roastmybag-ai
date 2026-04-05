import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../demo-output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  console.log("🚀 Launching Playwright to capture demo...");
  
  // Launch browser
  const browser = await chromium.launch({ headless: false });

  // Create context with video recording
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark", 
  });

  const page = await context.newPage();
  
  console.log("🌐 Navigating to http://localhost:3000...");
  try {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // Hide the floating Next.js dev build indicator / portal
    await page.addStyleTag({ content: 'nextjs-portal, #__next-build-indicator, [data-nextjs-toast] { display: none !important; }' });
  } catch (err) {
    console.error("❌ Failed to reach localhost:3000. Is your dev server running?");
    process.exit(1);
  }

  // 1. Initial wait to show the landing state
  console.log("📸 Taking initial screenshot...");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outputDir, "01-landing.png") });

  // 2. Type "demo" in the input box
  console.log("⌨️ Typing 'demo'...");
  const input = page.locator("#wallet-input");
  await input.fill("demo");
  await page.waitForTimeout(1000);

  // 3. Click the roast button
  console.log("🔥 Clicking roast button...");
  const roastBtn = page.locator("#roast-button");
  await roastBtn.click();
  
  // 4. Capture the scanning/roasting experience
  console.log("📸 Capturing scanning state...");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outputDir, "02-scanning.png") });

  console.log("⏳ Waiting for results to generate (this could take up to 20s)...");
  // We'll wait until the score ring or the 'Roast Another Wallet' button appears
  await page.waitForSelector(".score-ring, button:has-text('Roast Another Wallet')", { timeout: 30000 });
  
  console.log("📸 Capturing results (Viewport)...");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outputDir, "03-results-viewport.png") });
  
  // Taking a full page screenshot disrupts the video by jittering the scroll. 
  // We'll just wait 5s and then scroll for the video instead.
  console.log("📸 Capturing results (Waited)...");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: path.join(outputDir, "04-results.png") });

  // Scroll down slightly to show damage report if it is long, so it gets recorded in the video
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(1000);

  // Take the full page screenshot
  console.log("📸 Capturing results (Full Screen / Whole Page)...");
  await page.screenshot({ path: path.join(outputDir, "05-results-fullpage.png"), fullPage: true });

  // Close context
  console.log("💾 Saving screenshots and closing browser...");
  await context.close();
  await browser.close();

  console.log(`✅ Screenshot capture complete! Check the '${outputDir}' folder.`);
})();
