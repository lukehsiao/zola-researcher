/** `hyphenate` function for Finnish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateFi: (word: string) => string[];

export { hyphenateFi };
