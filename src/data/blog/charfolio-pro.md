---
title: "CharFolio Pro"
description: "Discover CharFolio Pro, a high-performance portfolio template designed for modern developers. Featuring built-in MDX support, interactive timelines, and a slick project showcase."
date: "2026-02-22"
banner: "/banner.png"
banner_alt: "Banner"
---

## The Vision

In the competitive world of software engineering, a standard resume is no longer enough. **CharFolio Pro** was engineered to bridge the gap between a technical document and a high-end digital experience. 

The goal was to create a "living" portfolio that feels as fast as a native app while maintaining the highest standards of typography and accessibility.

## Technical Excellence

Under the hood, CharFolio utilizes the latest web technologies to ensure a seamless experience for both the developer and the visitor.

### Why these technologies?

| Technology | Purpose |
| :--- | :--- |
| **Next.js** | Server-side rendering & optimized routing |
| **Tailwind/Windi CSS** | Utility-first styling |
| **MDX Remote** | Transforming Markdown into interactive pages |
| **Iconify** | Unified icon system for all social and tech logos |
| **Framer Motion** | Smooth entrance animations and glitches |

## Core Features

### 1. Dynamic "About" Experience
The About page isn't just a wall of text. It's a data-driven identity hub. As seen in our latest update, it features:
* **Glitch-effect Typography**: A modern aesthetic for the header.
* **Interactive Tech Stack**: A marquee-style showcase of your tools (React, Node.js, Python, etc.).
* **Recent Journey**: A vertical timeline pulling directly from your life milestones.
* **Partner Showcase**: A dedicated grid for companies and brands you've collaborated with.

### 2. High-Performance Project Showcase
The Projects page is designed to convert visitors into collaborators. Each project entry supports:
* **MDX Content**: Write your project case studies using Markdown but with the power of React components.
* **Live Demo & Repo Links**: Integrated action buttons to lead users straight to your work.
* **SEO Optimized**: Each project gets its own dynamic OG Image for better social sharing.


## Implementation Details
The project follows a Clean Architecture pattern, strictly decoupling the data layer from the view layer. This approach ensures high maintainability, allowing users to migrate content or overhaul the entire visual theme by modifying only a few configurations.

### Configuration Structure
To register new projects, you simply define them in the project configuration file:

```ts:data/projects.ts
const projects: ProjectPost[] = [
  {
    post: "sample-project",
    repository: "charisprod/charfolio"
  }
];
```

### Data Schema (MDX)
Each project is powered by an MDX file. The system features an intelligent icon fallback, it will prioritize [Simple Icons](https://simpleicons.org) for technology logos, but can also resolve icons from the [Material Icon Theme](https://icon-sets.iconify.design/material-icon-theme/) if the primary source is unavailable.

```markdown
---
title: "Title"
description: "Description"
date: "2026-02-22"
role: "Role"
banner: "/banner.png"               // Optional
banner_alt: "Showcase Banner"       // Optional
homepage: "https://example.com" 
repository: "username/repository"   // GitHub Username & Repository Name
stack: ["nextdotjs", "react", "tailwindcss", "windicss"]
---
```

## Content Management

One of the best parts of CharFolio is that you don't need to touch complex code to update your profile. Everything is centralized in a single `data.ts` file:

```ts:data/data.ts
const data = {
  about: {
    name: "CharFolio",
    bio: "Passionate developer building modern experiences.",
    stack: [
      { title: "Frontend", icons: [{ src: "simple-icons:react", alt: "React" }] }
    ]
  },
  // ... simply edit this file to update the entire site!
}
```

## Ready to build your own?
If you're interested in using this template or contributing to its development, feel free to reach out via the contact section on the [About](https://charisprod.xyz/about) page.