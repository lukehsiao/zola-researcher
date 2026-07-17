# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Bundle the Atkinson Hyperlegible Next variable font (SIL OFL 1.1) so the theme renders as designed without files from a parent site.
- `custom_css` config option and `extra_head` template block for site-level customization.
- `--font-body` and `--font-mono` CSS custom properties so sites can override fonts without forking the theme's sass.
- Themed 404 page.
- Generic `favicon.svg` and a matching 32x32 `favicon.ico`.
- Demo content now exercises the `aside` shortcode and the `authors` front matter.

### Changed
- Code blocks use a system monospace stack. Berkeley Mono is a commercial font and cannot be redistributed with the theme.
- The default footer is now generic instead of one person's licensing notice.
- Demo images are local placeholders instead of hotlinks to placekitten (dead), imgur, and Wikimedia.
- Demo social icons are inline Tabler SVGs instead of Font Awesome classes that rendered as nothing with `fontawesome = false`.

### Fixed
- The head no longer references `apple-touch-icon.png` and `manifest.json`, which the theme does not ship.
- The feed link renders again: `config.generate_feed` was renamed `generate_feeds` in Zola 0.19.
- Open Graph meta tags use `property=` instead of `name=`.
- Unbalanced `<span>` in the post header when a page has no `updated` date.
- The `aside` shortcode picks the right icon for capitalized types like `type="Note"`.
- The `figure` shortcode no longer errors when `link`, `alt`, or `bg` is omitted, and captions render markdown.

### Removed
- Unused `lazysizes.min.js`. Nothing in the theme used lazy loading.

## [0.1.0] - 2020-04-28

Initial release of the zola-researcher theme.

[lh]: https://github.com/lukehsiao
[Unreleased]: https://github.com/lukehsiao/zola-researcher/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/lukehsiao/zola-researcher/releases/tag/v0.1.0
