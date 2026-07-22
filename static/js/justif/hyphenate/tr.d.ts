/** `hyphenate` function for Turkish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateTr: (word: string) => string[];

export { hyphenateTr };
