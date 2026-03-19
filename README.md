# Daily Planet

A **fictional metro newspaper** front-end demo: home page, section fronts, article reading experience, search, briefing, letters, forum, and staff pages — styled like a serious broadsheet, with **morning / late edition** theming and subtle motion.

> This project is for demonstration only. It is not affiliated with DC Comics, Warner Bros., or any real publication.

**Repository:** [github.com/arda-tugsat/The-Daily-Planet](https://github.com/arda-tugsat/The-Daily-Planet)

## Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **React Router 7**
- **Motion** (animations, with reduced-motion awareness)
- **Vitest** + Testing Library (tests where present)
- **gray-matter** for markdown front matter (`content/articles`)

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

**Windows:** double-click [`start-dev.bat`](start-dev.bat) in the project folder (requires Node.js on your PATH). It installs dependencies if `node_modules` is missing, then runs the dev server.

```bash
npm run build    # production build to dist/
npm run preview  # serve dist locally
npm run lint     # ESLint
```

## Content model

- **Static articles**: [`src/data/articlesStatic.ts`](src/data/articlesStatic.ts)
- **Markdown articles**: [`content/articles/*.md`](content/articles/) — same shape as static entries; **markdown wins** on slug collision when merged in [`src/data/articles.ts`](src/data/articles.ts)
- **Hero images**: Unsplash delivery URLs in [`src/data/photoSources.ts`](src/data/photoSources.ts) (fictional staff photo credits in the UI)

## Routes (high level)

| Path | Purpose |
|------|--------|
| `/` | Home |
| `/article/:slug` | Story |
| `/section/:sectionId` | Section front (metro, world, science, opinion, business, sports) |
| `/search`, `/briefing`, `/letters`, `/forum` | Reader tools |
| `/topics`, `/topic/:topicSlug` | Topic index & tag pages |
| `/series/:seriesId` | Series landing |
| `/saved`, `/staff`, `/corrections`, `/standards` | Saved list, masthead, log, ethics |

`BrowserRouter` uses Vite `import.meta.env.BASE_URL` so you can deploy under a **subpath** (e.g. GitHub Pages) by setting `base` in `vite.config.ts`.

## Clone & contribute

```bash
git clone https://github.com/arda-tugsat/The-Daily-Planet.git
cd The-Daily-Planet
npm install
npm run dev
```

Default branch is `main`.

## License

[MIT](LICENSE) — Copyright (c) 2026 Arda Tuğsat
