/** `hyphenate` function for Ukrainian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateUk: (word: string) => string[];

export { hyphenateUk };
