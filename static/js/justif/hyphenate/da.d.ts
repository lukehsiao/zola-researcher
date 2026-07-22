/** `hyphenate` function for Danish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateDa: (word: string) => string[];

export { hyphenateDa };
