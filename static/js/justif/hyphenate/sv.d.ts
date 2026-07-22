/** `hyphenate` function for Swedish (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateSv: (word: string) => string[];

export { hyphenateSv };
