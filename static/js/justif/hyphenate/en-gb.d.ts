/** `hyphenate` function for British English (leftmin 2, rightmin 3),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateEnGB: (word: string) => string[];

export { hyphenateEnGB };
