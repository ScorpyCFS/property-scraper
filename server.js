const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing ?url" });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const result = await page.evaluate(() => {
      const getText = (selector) => document.querySelector(selector)?.innerText || "";
      const getMeta = (property) => document.querySelector(`meta[property="${property}"]`)?.content || "";

      return {
        price: getText('[data-testid="listing-details__listing-summary__price"]'),
        rent: (document.body.innerText.match(/\$\d{2,4}\s*per\s*week/i) || [])[0] || "",
        state: (document.body.innerText.match(/\b(NSW|VIC|SA|WA|QLD|TAS|ACT|NT)\b/) || [])[0] || "",
        type: getMeta("og:type"),
        address: getMeta("og:title"),
      };
    });

    console.log("✅ Scrape Result:", result);
    res.json(result);
  } catch (err) {
    console.error("❌ Scrape Failed:", err.message);
    res.status(500).json({ error: "Scraping failed", details: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
