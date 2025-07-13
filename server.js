const express = require("express");
const puppeteer = require("puppeteer");
const PORT = process.env.PORT || 3000;

const app = express();  // <-- 🛠️ This was missing!

app.get("/scrape", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing ?url" });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

    const result = await page.evaluate(() => {
      const getPrice = () => {
        const price = document.querySelector('[data-testid="listing-details__listing-summary__price"]');
        return price?.innerText.replace(/[^\d]/g, "");
      };
      const getRent = () => {
        const rent = document.body.innerText.match(/\$\d{2,4}\s*per\s*week/i);
        return rent ? rent[0].replace(/[^\d]/g, "") : "";
      };
      const getState = () => {
        const match = document.body.innerText.match(/\b(NSW|VIC|SA|WA|QLD|TAS|ACT|NT)\b/);
        return match ? match[1] : "";
      };
      const getType = () => {
        const typeMeta = document.querySelector('meta[property="og:type"]');
        return typeMeta?.content || "";
      };

      return {
        price: getPrice(),
        rent: ge
