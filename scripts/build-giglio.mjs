// Rigenera il giglio vettoriale dal PNG sorgente.
//
// Pipeline: public/loghi/giglio_originale.png
//   -> trace Inkscape (potrace alta precisione)
//   -> public/loghi/giglio.svg (path unico, rosso, viewBox stretto al contorno)
//   -> src/components/GiglioMark.tsx (stesso path, prop currentColor/gradient)
//
// Uso:  node scripts/build-giglio.mjs
// Dopo aver ritoccato il PNG, lancia questo: aggiorna ovunque (nav, hero,
// footer, PageHero, home) perche' tutti usano <GiglioMark/>.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = process.cwd();
const SRC_PNG = path.join(ROOT, "public/loghi/giglio_originale.png");
const OUT_SVG = path.join(ROOT, "public/loghi/giglio.svg");
const OUT_TSX = path.join(ROOT, "src/components/GiglioMark.tsx");
const FILL = "#c0392f"; // rosso giglio

// trova inkscape
const INKSCAPE_CANDIDATES = [
  process.env.INKSCAPE,
  "C:/Program Files/Inkscape/bin/inkscape.com",
  "C:/Program Files/Inkscape/bin/inkscape.exe",
  "inkscape",
].filter(Boolean);

function findInkscape() {
  for (const c of INKSCAPE_CANDIDATES) {
    try {
      execFileSync(c, ["--version"], { stdio: "ignore" });
      return c;
    } catch {}
  }
  throw new Error(
    "Inkscape non trovato. Imposta INKSCAPE=... o installa Inkscape.",
  );
}

const inkscape = findInkscape();
if (!fs.existsSync(SRC_PNG)) throw new Error(`PNG mancante: ${SRC_PNG}`);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "giglio-"));
const tracedSvg = path.join(tmp, "traced.svg");

// 1) trace: scans,smooth,stack,remove_background,speckles,smooth_corners,optimize
execFileSync(inkscape, [
  SRC_PNG,
  "--actions=select-all;object-trace:2,true,false,true,2,1.0,0.2;" +
    `export-filename:${tracedSvg};export-plain-svg;export-do`,
]);

// 2) estrai il path tracciato
const traced = fs.readFileSync(tracedSvg, "utf8");
const pdMatch = traced.match(/<path[^>]*\bd="([\s\S]*?)"/);
if (!pdMatch) throw new Error("Nessun path nel trace Inkscape.");
const pd = pdMatch[1].trim();

// 3) bounding box reale del path -> viewBox stretto
const bboxSvg = path.join(tmp, "bbox.svg");
fs.writeFileSync(
  bboxSvg,
  `<svg xmlns="http://www.w3.org/2000/svg"><path id="g" d="${pd}"/></svg>`,
);
const q = execFileSync(inkscape, [bboxSvg, "--query-all"], {
  encoding: "utf8",
});
const line = q.split(/\r?\n/).find((l) => l.startsWith("g,"));
if (!line) throw new Error("Query bbox fallita.");
const [, x, y, w, h] = line.split(",").map(Number);
const pad = Math.round(Math.max(w, h) * 0.01); // ~1% margine
const vb = [
  Math.floor(x - pad),
  Math.floor(y - pad),
  Math.ceil(w + pad * 2),
  Math.ceil(h + pad * 2),
].join(" ");

// 4) scrivi giglio.svg pulito
fs.writeFileSync(
  OUT_SVG,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><path fill="${FILL}" d="${pd}"/></svg>\n`,
);

// 5) scrivi il componente React (path inline, API invariata)
const L = [];
L.push("// Giglio di Firenze — tracciato preciso da public/loghi/giglio_originale.png");
L.push("// GENERATO da scripts/build-giglio.mjs — non modificare a mano il path.");
L.push("// currentColor o gradiente viola→oro tramite prop `gradient`.");
L.push("let gid = 0;");
L.push("");
L.push("const GIGLIO_PATH =");
L.push("  " + JSON.stringify(pd) + ";");
L.push("");
L.push("export function GiglioMark({");
L.push("  className,");
L.push("  gradient = false,");
L.push("}: {");
L.push("  className?: string;");
L.push("  gradient?: boolean;");
L.push("}) {");
L.push("  const id = `giglio-grad-${gid++}`;");
L.push("  return (");
L.push(`    <svg viewBox="${vb}" className={className} aria-hidden="true">`);
L.push("      {gradient && (");
L.push("        <defs>");
L.push('          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">');
L.push('            <stop offset="0%" stopColor="var(--color-viola)" />');
L.push('            <stop offset="55%" stopColor="var(--color-viola-bright)" />');
L.push('            <stop offset="100%" stopColor="var(--color-gold-bright)" />');
L.push("          </linearGradient>");
L.push("        </defs>");
L.push("      )}");
L.push('      <path d={GIGLIO_PATH} fill={gradient ? `url(#${id})` : "currentColor"} />');
L.push("    </svg>");
L.push("  );");
L.push("}");
L.push("");
fs.writeFileSync(OUT_TSX, L.join("\n"));

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`OK  viewBox="${vb}"  path ${pd.length} chars`);
console.log(`  -> ${path.relative(ROOT, OUT_SVG)}`);
console.log(`  -> ${path.relative(ROOT, OUT_TSX)}`);
