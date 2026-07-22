/** `hyphenate` function for Norwegian Bokmål (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateNb: (word: string) => string[];

export { hyphenateNb };
