/** `hyphenate` function for Dutch (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateNl: (word: string) => string[];

export { hyphenateNl };
