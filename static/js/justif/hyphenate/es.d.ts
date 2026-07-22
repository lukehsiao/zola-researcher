/** `hyphenate` function for Spanish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateEs: (word: string) => string[];

export { hyphenateEs };
