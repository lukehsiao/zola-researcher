/** `hyphenate` function for Hungarian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateHu: (word: string) => string[];

export { hyphenateHu };
