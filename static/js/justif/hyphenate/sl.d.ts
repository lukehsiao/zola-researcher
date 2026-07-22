/** `hyphenate` function for Slovenian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateSl: (word: string) => string[];

export { hyphenateSl };
