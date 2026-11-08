import sharp from "sharp";

const input = "public/images/gladiator-logo.svg";
const metadata = await sharp(input).metadata();
const rendered = await sharp(input, { density: 96, limitInputPixels: false })
  .ensureAlpha()
  .png()
  .toBuffer({ resolveWithObject: true });
const { info } = await sharp(input, { density: 96, limitInputPixels: false })
  .ensureAlpha()
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
  .png()
  .toBuffer({ resolveWithObject: true });

console.log(JSON.stringify({ metadata, rendered: rendered.info, trim: info }, null, 2));
