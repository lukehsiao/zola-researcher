/** `hyphenate` function for German (reformed orthography) (leftmin 2, rightmin 2),
 * for the `hyphenate` option of justify(). Compiles lazily on first use. */
declare const hyphenateDe: (word: string) => string[];

export { hyphenateDe };
