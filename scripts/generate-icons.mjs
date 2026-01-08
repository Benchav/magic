import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, "..");
const inputSvgPath = path.join(repoRoot, "public", "icons", "icon.svg");
const outDir = path.join(repoRoot, "public", "icons");

const background = "#050a14";

const targets = [
  { size: 192, file: "icon-192.png" },
  { size: 512, file: "icon-512.png" },
  // iOS uses 180x180 for home screen.
  { size: 180, file: "apple-touch-icon.png" },
];

const main = async () => {
  await mkdir(outDir, { recursive: true });

  const svg = await readFile(inputSvgPath);

  await Promise.all(
    targets.map(async ({ size, file }) => {
      const outPath = path.join(outDir, file);
      await sharp(svg, { density: 384 })
        .resize(size, size, { fit: "contain" })
        .flatten({ background })
        .png({ compressionLevel: 9 })
        .toFile(outPath);
      // eslint-disable-next-line no-console
      console.log(`Generated ${path.relative(repoRoot, outPath)}`);
    })
  );
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
