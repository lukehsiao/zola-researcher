/** `hyphenate` function for Croatian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateHr: (word: string) => string[];

export { hyphenateHr };
