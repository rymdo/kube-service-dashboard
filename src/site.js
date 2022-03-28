const puppeteer = require('puppeteer');

async function getImage(url) {
  const browser = await puppeteer.launch(
    {
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      defaultViewport: {
        width: 1920,
        height: 1080,
        isLandscape: true
      }
    }
  );
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ encoding: "base64" });
  const img = Buffer.from(screenshot, 'base64')
  await browser.close();
  return img
}

function cleanUrl(url) {
  return url
    .replace(/^https?:\/\//, '') // Remove 'http/https' prefix
    .replace(/[\W_]+/g, "-")     // Replace all non alphanumeric characters with '-'
    .replace(/\-$/, '')          // Remove trailing '-'
}

module.exports = {
  getImage,
  cleanUrl
}
