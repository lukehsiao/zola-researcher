/** `hyphenate` function for Slovak (leftmin 2, rightmin 3),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateSk: (word: string) => string[];

export { hyphenateSk };
