/** `hyphenate` function for Portuguese (leftmin 2, rightmin 3),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenatePt: (word: string) => string[];

export { hyphenatePt };
