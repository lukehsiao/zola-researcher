/** `hyphenate` function for Russian (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateRu: (word: string) => string[];

export { hyphenateRu };
