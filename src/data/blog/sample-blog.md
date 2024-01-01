---
banner_alt: This is a sample blog.
banner: /banner.png
title_prefix: Sample
title: Sample Blog
description: This is a sample blog.
date: '2023-07-01'
---

# HEADING 1

## HEADING 2

### HEADING 3

#### HEADING 4

---

**Bold**, *Italic*, ***Bold & Italic***

---

## Blockquotes
> Blockquotes

### Blockquotes with Multiple Paragraphs
> Blockquotes with
>
> Multiple Paragraphs

### Nested Blockquotes

> Nested
>
>> Blockquotes

### Blockquotes with Another Elements

> #### Blockquotes
>
> - with
> - Another
>
>  *Ele* **ments**.

---

## Lists

- Unordered Lists
1. Ordered Lists

---

## Code Blocks

```javascript
const isProduction = process.env.NODE_ENV === 'production';
const domain = isProduction ? 'YourDomainWithoutHTTPS' : 'localhost:3000';
const protocol = isProduction ? 'https' : 'http';

/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
	exclude: ['/server-sitemap.xml'],
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: [
			`${protocol}://${domain}/sitemap.xml`,
			`${protocol}://${domain}/server-sitemap.xml`,
		],
	},
	siteUrl: `${protocol}://${domain}`,
};
```

---

## Escaping Backticks
This is `Escaping Backticks`.

---

## Image
![Banner](/banner.png)

### Linking Image
[![Banner](/banner.png)](https://github.com/agcrisbp/ADPortfolio/blob/main/public/banner.png?raw=true)

---

## Link
- [Website](https://aghea.site)

### Auto Link & Email Addresses
- https://aghea.site
- agcrisbp@proton.me

---

## Table

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### Alignment

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

---

## Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
    
---

## Strikethrough

~~The world is flat.~~ We now know that the world is round.

### Task Lists

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

---

## Emoji

Gone camping! :tent: Be back soon.
That is so funny! :joy:

---

## Paragraph
* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.