const fs = require("fs")
const path = require('path');

const cacheDir = './cache';
const expireTimeMs = 3600 * 1000

function storeImage(name, image) {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }
  const filePath = path.join(cacheDir, name)
  fs.writeFileSync(filePath, image, 'base64')
}

function loadImage(name) {
  if (!imageExists(name)) {
    throw new Error(`image ${name} does not exist`)
  }
  const filePath = path.join(cacheDir, name)
  const img = fs.readFileSync(filePath, { encoding: 'base64' })
  return Buffer.from(img, 'base64')
}

function imageExists(name) {
  const filePath = path.join(cacheDir, name)
  return fs.existsSync(filePath)
}

function imageExpired(name) {
  if (!imageExists(name)) {
    return true
  }
  const filePath = path.join(cacheDir, name)
  const fileStats = fs.statSync(filePath)
  const currentTime = new Date().getTime()
  const fileLastUpdateTime = new Date(fileStats.mtime).getTime()
  if (currentTime - fileLastUpdateTime > expireTimeMs) {
    return true
  }
  return false
}

module.exports = {
  storeImage,
  loadImage,
  imageExists,
  imageExpired,
}