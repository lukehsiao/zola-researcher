# Researcher
Researcher is a clean, responsive portfolio and blog theme based on the Jekyll theme with the same name.

![researcher screenshot](https://github.com/lukehsiao/zola-researcher/blob/master/screenshot.png?raw=true)

## Installation
First download this theme to your `themes` directory:

```bash
$ cd themes
$ git clone https://github.com/lukehsiao/zola-researcher.git
```
and then enable it in your `config.toml`:

```toml
theme = "zola-researcher"
```

The theme requires putting the blog posts in the blog directory of the `content`
folder and to enable pagination, for example in `content/blog/_index.md`:

```
+++
paginate_by = 8
sort_by = "date"
title = "Blog Posts | John Doe"
description = "A collection of my blog posts."
insert_anchor_links = "right"

[extra]
keywords = "John Doe, blog, posts"
+++
```

## Options

```toml
[extra]
# The Title of the site
author = "John Doe"

# The filename of the icon to use for your favicon
favicon = "favicon.ico"

# Links to include in the navigation bar
nav = [
  {name = "About", link = ""},
  {name = "CV", link = "cv.pdf"},
  {name = "Blog", link = "blog"},
]

# Your Google Analytics ID
analytics = ""

# See below
katex_enable = false

# See below
instantpage_enable = true
```

A full example configuration is included in config.toml.

### KaTeX math formula support

This theme contains math formula support using [KaTeX](https://katex.org/),
which can be enabled by setting `katex_enable = true` in the `extra` section
of `config.toml`.

After enabling this extension, the `katex` short code can be used in documents:
* `{% katex(block=true) %}\KaTeX{% end %}` to typeset a block of math formulas,
  similar to `$$...$$` in LaTeX

### Figure Shortcode

This them also includes a figure shortcode for convenience in captioning figures.

```
{% figure(link="https://www.example.com/", src="https://www.example.com/img.jpeg", alt="sample alt text") %}
Your caption here.
{% end %}
```

### Fontawesome

This theme includes fontawesome, so that fontawesome icons can be directly used.

### Instant.page

The theme contains instant.page prefetching. This can be enabled by setting
`instantpage_enable = true` in the `extra` section of `config.toml`.
