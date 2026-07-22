/**
 * `hyphenate` function for American English (leftmin 2, rightmin 3), for
 * the `hyphenate` option of justify(). Patterns compile lazily on first use.
 */
declare const hyphenateEnUS: (word: string) => string[];

export { hyphenateEnUS };
