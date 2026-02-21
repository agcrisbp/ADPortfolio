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

```js[class="line-numbers"]{2,4,9-11}:components/XCode.js
function initializeApp() {
  console.log('Line 2: CharFolio starting...'); // Highlighted
  const config = {
    version: '3.0.1', // Highlighted
    env: 'production'
  };

  if (config.version) {
    console.log('Line 9: Config version detected'); // Highlighted
    console.log('Line 10: Preparing modules...'); // Highlighted
    console.log('Line 11: Modules ready'); // Highlighted
  }

  const port = 3000;
  console.log(`Server running on port ${port}`);
}

```

```js{2,6-8,12}
function handleProcessRequest(request) {
  console.log('Line 2: Request received');
  const { id, type, payload } = request;

  if (type === 'SYNC') {
    console.log('Line 6: Starting sync process'); // Highlighted 6-8
    validatePayload(payload);
    saveToDatabase(id, payload);
  }

  const status = 'COMPLETED';
  console.log('Line 12: Process ' + status); // Highlighted
  return { success: true, status };
}

function validatePayload(data) {
  return data !== null;
}

```

---

## Escaping Backticks
This is `Escaping Backticks`.

---

## Accordion

<Accordion title="Lorem ipsum AAA" open>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Accordion>

<AccordionGroup>
  <Accordion title="Lorem ipsum BBB">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Accordion>
  <Accordion title="Lorem ipsum CCC" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Accordion>
</AccordionGroup>

---


## Image
![Banner](/banner.png)

### Linking Image
[![Banner](/banner.png)](https://github.com/charisprod/charfolio/blob/main/public/banner.png?raw=true)

---

## Link
- [Website](https://aghea.vercel.app)
- [Blog](/blog)
- [HEADING 1](#heading-1)

### Auto Link & Email Addresses
- https://aghea.vercel.app
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