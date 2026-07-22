import { I as Item, R as RunText, a as RunMetrics, B as BuildOptions, M as Measure, P as ParagraphItems, L as LineWidths, b as BreakOptions, c as BreakResult, d as Line } from './protrusion-fonts-DXWy6i9x.js';
export { e as Box, C as CJK_CHAR, E as ExpansionOptions, G as Glue, f as GlueSpec, H as HangingPunctuationMode, g as ItemType, h as Penalty, i as ProtrusionCodes, j as ProtrusionTable, T as TrackingOptions, k as cjkBreakAllowed, l as composeProtrusion, m as defaultBreakOptions, n as defaultBuildOptions, o as fontProtrusion, p as graphemes, q as hangingPunctuation, r as kinsokuNotAtLineEnd, s as kinsokuNotAtLineStart, t as latinProtrusion, u as lineWidthAt, v as protrusionCodes } from './protrusion-fonts-DXWy6i9x.js';

/**
 * TeX-exact badness and demerits arithmetic (TeX: The Program §108, §834,
 * §859). Pure functions of numbers; the breaker composes them.
 */
/** TeX's "infinite" badness. */
declare const INF_BAD = 10000;
/**
 * The stretch-to-flex ratio at which a line becomes underfull by TeX's
 * default standards: \hbadness=1000 is the badness above which TeX reports
 * an underfull hbox, and 100·r³ = 1000 at r = ∛10 ≈ 2.15 (spaces at about
 * twice their natural width under default spacing).
 */
declare const UNDERFULL_RATIO: number;
/**
 * How far a lastLineMinWidth ending is willing to stretch its word glue to
 * reach the threshold, as a stretch-to-flex ratio: the willingness scales
 * with the setting, so demanding rectangles (1) works the spaces up to the
 * underfull bound (~2× natural) while a gentle floor (0.33) barely opens
 * them (~1.35×). Endings that would need more revert to natural spacing
 * entirely — all or nothing: a line both stretched and still short reads
 * worse than a ragged one. Shared by the breaker's ending cost and the
 * layout floor so pricing and rendering can never disagree about
 * reachability.
 */
declare function maxEndingStretch(minWidth: number): number;
/**
 * Penalties at or above this value forbid a break; at or below its negation,
 * force one.
 */
declare const INF_PENALTY = 10000;
declare const Fitness: {
    readonly Tight: 0;
    readonly Decent: 1;
    readonly Loose: 2;
    readonly VeryLoose: 3;
};
type Fitness = (typeof Fitness)[keyof typeof Fitness];
/**
 * badness(t, s) ≈ 100·(t/s)³ using TeX's integer approximation
 * (⌊(⌊297·t/s⌋³ + 2¹⁷) / 2¹⁸⌋), so fixtures reproduce TeX's exact values:
 * a line stretched by its full stretchability (t = s) has badness 100, half
 * of it badness 12.
 *
 * `t` is the stretch or shrink needed (≥ 0), `s` the amount available.
 */
declare function badness(t: number, s: number): number;
/**
 * TeX's fitness classification (§834): decent when badness ≤ 12, tight when
 * shrinking beyond that, loose/very-loose when stretching beyond it. Adjacent
 * lines whose classes differ by more than one incur `adjDemerits`.
 */
declare function fitness(shrinking: boolean, b: number): Fitness;
/**
 * Base demerits for one line (§859): (linePenalty + badness)² — capped like
 * TeX at 10⁸ when the sum reaches 10000 — plus/minus the penalty squared for
 * finite positive/negative break penalties. Flag- and fitness-based extras
 * (doubleHyphenDemerits, adjDemerits, finalHyphenDemerits) are added by the
 * breaker, which knows both breakpoints.
 */
declare function demerits(linePenalty: number, b: number, p: number): number;
/**
 * demerits() without the 10⁸ cap on the squared term, for paragraph-final
 * fil lines whose badness is deliberately uncapped (see the breaker's fil
 * branch): the cap would re-flatten the short-ending pressure one level up.
 * Identical to demerits() whenever |linePenalty + b| < 10000.
 */
declare function demeritsUncapped(linePenalty: number, b: number, p: number): number;

/**
 * Right-protrusion credit when a line breaks at item `b`: the materialized
 * hyphen's for width-carrying penalties, otherwise the line's LAST BOX —
 * found by walking back over unbroken penalties and glue, so the paragraph-
 * final box protrudes past the parfillskip tail too (a full last line's
 * period must hang like any other line's). Shared by the breaker and
 * layoutLines so the two can never drift.
 */
declare function breakRp(items: readonly Item[], b: number): number;
/**
 * Flattens a paragraph's styled runs into the Knuth-Plass item stream.
 * Whitespace is collapsed; words become boxes measured whole (kerning-safe),
 * spaces become glue from the run's space spec, and break opportunities
 * (soft hyphens, hyphenator output, explicit hyphens) become penalties.
 * Ends with the TeX parfillskip idiom so the last line sets naturally.
 */
declare function buildItems(texts: readonly RunText[], runs: readonly RunMetrics[], opts: BuildOptions, measure: Measure): ParagraphItems;
/**
 * Attaches cumulative sums and the first-box index to an item stream.
 * Escape hatch for hand-built streams. Invariants the breaker relies on:
 * widths/stretch/shrink must be nonnegative (negative glue would break
 * active-node deactivation monotonicity) and the stream must end with a
 * forced penalty (penalty ≤ −INF_PENALTY).
 */
declare function withSums(items: Item[], runs: readonly RunMetrics[]): ParagraphItems;

/**
 * Knuth-Plass total-fit line breaking with TeX's three-pass escalation:
 * pass 1 ignores hyphenation points at `pretolerance`, pass 2 enables them at
 * `tolerance`, pass 3 adds emergency stretch to the badness computation only.
 * A final rescue pass (TeX's artificial demerits, §854) guarantees a result
 * even for unbreakable overfull material.
 */
declare function breakParagraph(para: ParagraphItems, widths: LineWidths, opts: BreakOptions): BreakResult;

/**
 * Converts chosen breakpoints into per-line render parameters, distributing
 * each line's shortfall/excess between font expansion (quantized to the
 * configured step so the emitted font-stretch values stay cacheable) and
 * inter-word glue. The same ratio drives both because expansion participated
 * in the breaker's stretch/shrink totals.
 */
declare function layoutLines(para: ParagraphItems, breaks: BreakResult, widths: LineWidths, opts: BuildOptions): Line[];
/**
 * Plain-text content of a line (CLI demos, tests, clipboard fixups). Breaks
 * taken at hyphenation points append U+2010 (not ASCII "-") so consumers can
 * distinguish inserted hyphens from hyphens present in the source text.
 */
declare function lineText(para: ParagraphItems, line: Line): string;

export { BreakOptions, BreakResult, BuildOptions, Fitness, INF_BAD, INF_PENALTY, Item, Line, LineWidths, Measure, ParagraphItems, RunMetrics, RunText, UNDERFULL_RATIO, badness, breakParagraph, breakRp, buildItems, demerits, demeritsUncapped, fitness, layoutLines, lineText, maxEndingStretch, withSums };
