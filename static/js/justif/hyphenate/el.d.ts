/** `hyphenate` function for Greek (monotonic) (leftmin 1, rightmin 1),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateEl: (word: string) => string[];

export { hyphenateEl };
