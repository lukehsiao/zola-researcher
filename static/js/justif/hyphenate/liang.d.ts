/**
 * Frank Liang's pattern-based hyphenation (as in TeX), data-agnostic.
 * Patterns compile lazily into a trie on first use, so importing a language
 * module costs nothing until a paragraph actually hyphenates.
 */
interface PatternData {
    /**
     * Space-separated TeX patterns, e.g. ".ach4 .ad4der 4ab. …".
     * Supply either this or `packed`; `packed` wins if both are present.
     */
    patterns?: string;
    /**
     * The same patterns, sorted and front-coded: tokens are separated by one
     * space, and each starts with a character giving how many leading
     * characters the pattern shares with its predecessor (that count added to
     * `"0"`, capped at 31), followed by the rest of the pattern. Sorting makes
     * those shared prefixes long, so this form is about a third smaller than
     * `patterns` once compressed. The bundled language modules use it; it is
     * otherwise interchangeable, and `tools/gen-hyphenation.mjs` produces it.
     */
    packed?: string;
    /** Space-separated exception words with hyphens at the break points. */
    exceptions?: string;
    /** Minimum letters before the first / after the last break. */
    leftmin?: number;
    rightmin?: number;
}
declare function createHyphenator(data: PatternData): (word: string) => string[];

export { type PatternData, createHyphenator };
