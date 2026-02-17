<center><img src="/public/images/sign.png" /></center>

<p align="center">
    <img alt='GitHub Clones' src='https://img.shields.io/badge/dynamic/json?color=success&label=Clone&query=count&url=https://gist.githubusercontent.com/agcrisbp/f90babfbb76e325b96a7311a2fca2bfb/raw/clone.json&logo=github'>
    <img alt='GitHub Clones' src='https://img.shields.io/badge/dynamic/json?color=success&label=Unique&query=uniques&url=https://gist.githubusercontent.com/agcrisbp/f90babfbb76e325b96a7311a2fca2bfb/raw/clone.json&logo=githubactions&logoColor=white'>
</p>

---

# About

- Resume/Portfolio website using NextJS, connect to [Charis Web Services](https://charisprod.xyz) & [Spotify APi](https://github.com/agcrisbp/Spotify-ADLink).

---

# Support

<a href="https://www.buymeacoffee.com/agcrisbp" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 32px !important;width: 114px !important;" ></a>
<a href="https://saweria.co/agcrisbp" target="_blank"><img src="https://bio-aghea.vercel.app/saweria-button.png" alt="Saweria" style="height: 30px !important;width: 114px !important;" ></a>
<a href="https://github.com/sponsors/agcrisbp" target="_blank"><img src="/public/images/sponsor-badge.svg" alt="Github Sponsor" style="height: 30px !important;width: 114px !important;" ></a>

---

# Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/charisprod/charfolio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/charisprod/charfolio)

---

# Get Started

- Create this app:
```
npx create-next-app@latest charfolio --example https://github.com/charisprod/charfolio
```

- Rename `.env.example` to `.env` and fill it with yours.

- Run the app:
```
npm run dev
```

> Edit [seo.json](src/data/seo.json) & deploy.

---

# Information

### Discord ID Setup
- Read: [Setup](https://charlink-docs.vercel.app/get-started/frontend#add-discord-status), and **YOU MUST** join [Charis Production Discord Server](https://charisprod.xyz/invite).

### Spotify Setup
- Use [ADLink Spotify](https://github.com/agcrisbp/Spotify-ADLink).

### GITHUB_PATH & Github APi Setup
- [Generate new token](https://github.com/settings/tokens?type=beta).
- Edit `https://api.github.com/users/YourUsername/repos` in [projects.ts](/src/lib/projects.ts).

### Domain Setup
- Take a look to [next-sitemap.js](/next-sitemap.js) or read [Custom Domain](https://charlink-docs.vercel.app/get-started/custom-domain).