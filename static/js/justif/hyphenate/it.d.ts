/** `hyphenate` function for Italian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateIt: (word: string) => string[];

export { hyphenateIt };
