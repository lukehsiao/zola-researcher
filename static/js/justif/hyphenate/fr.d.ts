/** `hyphenate` function for French (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateFr: (word: string) => string[];

export { hyphenateFr };
