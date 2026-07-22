/**
 * Frank Liang's pattern-based hyphenation (as in TeX), data-agnostic.
 * Patterns compile lazily into a trie on first use, so importing a language
 * module costs nothing until a paragraph actually hyphenates.
 */
interface PatternData {
    /** Space-separated TeX patterns, e.g. ".ach4 .ad4der 4ab. …". */
    patterns: string;
    /** Space-separated exception words with hyphens at the break points. */
    exceptions?: string;
    /** Minimum letters before the first / after the last break. */
    leftmin?: number;
    rightmin?: number;
}
declare function createHyphenator(data: PatternData): (word: string) => string[];

export { type PatternData, createHyphenator };
