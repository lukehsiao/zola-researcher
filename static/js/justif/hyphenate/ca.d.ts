/** `hyphenate` function for Catalan (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateCa: (word: string) => string[];

export { hyphenateCa };
