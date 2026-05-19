# Git-Auto-PR Landing Page

Marketing site for [Git-Auto-PR](https://github.com/masonbrogden/Git-Auto-PR) — an automated code review GitHub Action powered by Claude AI.

## Stack

- React + Vite
- Tailwind CSS
- Docker + nginx (for deployment)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

The app is containerized for Railway. The `Dockerfile` serves the production build via nginx on port 8080.

## Related

- [Git-Auto-PR Action](https://github.com/masonbrogden/Git-Auto-PR) — the GitHub Action itself
- [GitHub Marketplace](https://github.com/marketplace/actions/git-auto-pr)
