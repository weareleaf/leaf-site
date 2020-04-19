const Jimp = require('jimp')
const fs = require('fs').promises
const glob = require('glob')

const BACKGROUND_COLOR = '#3d18c3'
const QUALITY = 50
const FILES = __dirname + '/../src/assets/**/*.png'

async function convertPng(inputPath) {
  const outputPath = inputPath.replace('.png', '.jpg')
  const inputBuffer = await fs.readFile(inputPath)
  const sourceImage = await Jimp.read(inputBuffer)

  const width = sourceImage.bitmap.width
  const height = sourceImage.bitmap.height

  const resultImage = await new Jimp(width, height, BACKGROUND_COLOR)
  await resultImage.composite(sourceImage, 0, 0)
  await resultImage.quality(QUALITY)
  await resultImage.write(outputPath)

  console.log(`Saved ${outputPath}`)
}

glob(FILES, {}, (err, files) => {
  files.forEach(async function(file) {
    if (file.includes('favicon')) return
    return await(convertPng(file))
  })
})
