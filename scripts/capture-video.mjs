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
    recordVideo: {
      dir: outputDir,
      size: { width: 1440, height: 900 },
    },
    colorScheme: "dark", 
  });

  const page = await context.newPage();
  
  console.log("🌐 Navigating to http://localhost:3000...");
  try {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // Hide the floating Next.js dev build indicator / portal
    await page.addStyleTag({ content: 'nextjs-portal, #__next-build-indicator, [data-nextjs-toast] { display: none !important; }' });
    
    // Inject an invisible spinning pixel to force the browser compositor to constantly generate frames.
    // This fixes Playwright's "frozen video" bug during static waits where it stops recording frames!
    await page.addStyleTag({
      content: `
        @keyframes forcePaintPlaywright {
          0% { transform: rotate(0.001deg); }
          100% { transform: rotate(360deg); }
        }
        .playwright-force-paint {
          position: fixed;
          bottom: 0;
          right: 0;
          width: 1px;
          height: 1px;
          opacity: 0.01;
          pointer-events: none;
          z-index: 99999;
          animation: forcePaintPlaywright 0.5s linear infinite;
        }
      `
    });
    await page.evaluate(() => {
      const el = document.createElement('div');
      el.className = 'playwright-force-paint';
      document.body.appendChild(el);
    });

  } catch (err) {
    console.error("❌ Failed to reach localhost:3000. Is your dev server running?");
    process.exit(1);
  }

  // 1. Initial wait to show the landing state
  console.log("⏳ Initial landing state...");
  await page.waitForTimeout(2000);

  // 2. Type "demo" in the input box
  console.log("⌨️ Typing 'demo'...");
  const input = page.locator("#wallet-input");
  await input.fill("demo");
  await page.waitForTimeout(1000);

  // 3. Click the roast button
  console.log("🔥 Clicking roast button...");
  const roastBtn = page.locator("#roast-button");
  await roastBtn.click();
  
  // 4. Wait a bit for scanning animation
  console.log("⏳ Scanning state...");
  await page.waitForTimeout(2000);

  console.log("⏳ Waiting for results to generate (this could take up to 20s)...");
  // We'll wait until the score ring or the 'Roast Another Wallet' button appears
  await page.waitForSelector(".score-ring, button:has-text('Roast Another Wallet')", { timeout: 30000 });
  
  // Added a 5 sec wait to let the user see the scores
  console.log("⏳ Reading results...");
  await page.waitForTimeout(5000);

  // Click the center of the viewport so keyboard events target the page
  await page.mouse.click(720, 450);

  // Safely find and scroll to the 'Your AI Roast' section
  console.log("⬇️ Paging perfectly to 'Your AI Roast'...");
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.textContent.includes('Your AI Roast') && e.children.length === 0);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Use 'center' or 'start'
  });
  await page.waitForTimeout(5000); // Wait 5s for reading the roast

  // Safely find and scroll to the 'Full Damage Report' section
  console.log("⬇️ Paging perfectly to 'Full Damage Report'...");
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(e => e.textContent.includes('Full Damage Report') && e.children.length === 0);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(5000); // Wait 5s for reading the report headers

  // Finally, page down the rest of the report until the true bottom of the page
  console.log("⬇️ Paging down the rest of the report...");
  let previousScrollSum = -1;

  // Maximum of 20 paginations
  for (let i = 0; i < 20; i++) {
    // Press PageDown
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(5000); // Wait 5s between each block 
    
    const currentScrollSum = await page.evaluate(() => {
      let sum = window.scrollY || 0;
      if (document.scrollingElement) sum += document.scrollingElement.scrollTop;
      // Sum up scroll positions of all common containers to be strictly foolproof
      document.querySelectorAll('div, main, section').forEach(el => sum += el.scrollTop);
      return sum;
    });

    // If we didn't scroll at all compared to the previous check, we've hit the bottom!
    if (currentScrollSum === previousScrollSum) {
      console.log("🛑 Reached bottom, completing video...");
      break;
    }
    
    previousScrollSum = currentScrollSum;
  }
  
  // Pad the end of the video slightly
  await page.waitForTimeout(2000);

  // Close context to ensure video is fully flushed/saved
  console.log("💾 Saving video and closing browser...");
  await context.close();
  await browser.close();

  console.log(`✅ Video capture complete! Check the '${outputDir}' folder.`);
})();
