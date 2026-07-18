# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0]

A big polish pass on the theme.
It is now "usable" in a real sense.

### Added
- Bundle the Atkinson Hyperlegible Next variable font (SIL OFL 1.1) so the theme renders as designed without files from a parent site.
- `custom_css` config option and `extra_head` template block for site-level customization.
- `--font-body` and `--font-mono` CSS custom properties so sites can override fonts without forking the theme's sass.
- Themed 404 page.
- Generic `favicon.svg` and a matching 32x32 `favicon.ico`.
- Demo content now exercises the `aside` shortcode and the `authors` front matter.
- `config.extra.og_image` renders `og:image` on every page for link-preview cards.
- `og:site_name`, and `article:published_time`/`article:modified_time` on posts.
- `<meta name="color-scheme" content="dark">` so form controls and scrollbars match the dark palette before CSS loads.
- `ogtype` and `og_extra` template blocks so page templates can set the Open Graph type and inject type-specific tags.

### Changed
- `<meta charset="utf-8">` is now the first element in the head, replacing the `http-equiv` content-type declaration.
- The feed `<link>` title is the site title rather than the current page's title, which is stable across pages.
- `og:type` is `website` by default and `article` on posts, instead of `article` everywhere.
- Renamed the `fb_open_graph` block to `open_graph`; Open Graph is not Facebook-specific.
- Code blocks use a system monospace stack. Berkeley Mono is a commercial font and cannot be redistributed with the theme.
- The default footer is now generic instead of one person's licensing notice.
- Demo images are local placeholders instead of hotlinks to placekitten (dead), imgur, and Wikimedia.
- Demo social icons are inline Tabler SVGs instead of Font Awesome classes that rendered as nothing with `fontawesome = false`.

### Fixed
- Paginated section pages canonicalize to themselves instead of all pointing at page one.
- Microdata `itemtype` uses `https://schema.org`, and the post list no longer carries an `itemprop` with no enclosing `itemscope`.
- The head no longer references `apple-touch-icon.png` and `manifest.json`, which the theme does not ship.
- The feed link renders again: `config.generate_feed` was renamed `generate_feeds` in Zola 0.19.
- Open Graph meta tags use `property=` instead of `name=`.
- Unbalanced `<span>` in the post header when a page has no `updated` date.
- The `aside` shortcode picks the right icon for capitalized types like `type="Note"`.
- The `figure` shortcode no longer errors when `link`, `alt`, or `bg` is omitted, and captions render markdown.

### Removed
- Obsolete `X-UA-Compatible`, `keywords`, and `twitter:url` meta tags. Search engines ignore keywords, `twitter:url` is not a card property, and the IE compatibility flag is dead.
- Unused `lazysizes.min.js`. Nothing in the theme used lazy loading.

## [0.1.0] - 2020-04-28

Initial release of the zola-researcher theme.

[lh]: https://github.com/lukehsiao
[Unreleased]: https://github.com/lukehsiao/zola-researcher/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/lukehsiao/zola-researcher/releases/tag/v0.1.0
