import { justify } from "./justif/index.js";
import { hyphenateEnUS } from "./justif/hyphenate/en-us.js";

// justif's core justifies every element it is handed, so the stylesheet stays
// the single source of truth for what gets justified: enhance any prose the
// CSS computes to text-align: justify, wherever it lives (the theme justifies
// main prose; a site may justify more, such as the webring summaries). This
// mirrors the auto.js entry, whose default scan is the whole document.
const candidates = document.querySelectorAll(
  "p, li, dd, blockquote, figcaption",
);

// justif breaks only at spaces, after explicit hyphens, and at hyphenation
// points; browsers may also break after "/" (UAX #14). A slash-heavy token
// like a file path in inline code is therefore one unbreakable box to justif,
// and fitting it forces the words that share its lines to stretch. Once such
// a token passes a third of the measure that stretch is glaring, and no
// spacing budget can absorb it, so those elements read better ragged.
// Measured with canvas: cheap, and close enough for a threshold even if the
// mono webfont has not finished loading.
const ctx = document.createElement("canvas").getContext("2d");
function widestUnbreakableTokenPx(code) {
  const cs = getComputedStyle(code);
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  let widest = 0;
  for (const token of code.textContent.split(/\s+/)) {
    // Mirror justif's tokenizer, which still breaks after explicit hyphens.
    for (const piece of token.split(/(?<=-)(?=[^-])/)) {
      widest = Math.max(widest, ctx.measureText(piece).width);
    }
  }
  return widest;
}
for (const el of candidates) {
  for (const code of el.querySelectorAll("code")) {
    if (widestUnbreakableTokenPx(code) > el.clientWidth / 3) {
      el.style.textAlign = "left";
      break;
    }
  }
}

const prose = [...candidates].filter((el) => {
  const align = getComputedStyle(el).textAlign;
  return align === "justify" || align === "justify-all";
});

// The stretch default of 0.5 lets a word space grow to 150% of its natural
// width, which opens visible gaps when a long unbreakable token such as inline
// code shares a line. Halving the stretch budget keeps spacing even; letting
// spaces shrink fully where the body font meets inline code (boundaryShrink)
// and allowing slightly more letter-spacing (tracking) give justif room to fit
// lines without those gaps. spacing is replaced wholesale by justif, so every
// field is set here rather than merged.
justify(prose, {
  hyphenate: hyphenateEnUS,
  spacing: { stretch: 0.25, shrink: 1 / 3, pull: 0.7, boundaryShrink: 1 },
  tracking: { max: 0.04, shrink: 0.03 },
});
