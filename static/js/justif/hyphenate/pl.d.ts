/** `hyphenate` function for Polish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenatePl: (word: string) => string[];

export { hyphenatePl };
