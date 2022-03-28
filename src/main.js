const puppeteer = require('puppeteer');

const { getImage, cleanUrl } = require('./site');
const { storeImage, loadImage, imageExpired } = require('./cache');

const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/", async function (req, res) {
  const url = "https://www.sweclockers.com/tester/grafikkort"

  let img = null
  if (imageExpired(`${cleanUrl(url)}.png`)) {
    img = await getImage(url)
    storeImage(`${cleanUrl(url)}.png`, img)
  } else {
    img = loadImage(`${cleanUrl(url)}.png`)
  }
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
});
