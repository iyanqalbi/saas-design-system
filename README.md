# SaasDS

Website and React component kit for SaaS admin templates — structured with [Atomic Design](https://atomicdesign.bradfrost.com/) and styled with [Refero gallery tokens](https://styles.refero.design/style/c2325884-4391-4688-85cd-e143f5107517) (quiet white canvas + Rausch accent).

## Pages

- `/` — Landing page with admin dashboard preview and download CTA
- `/components` — Component catalog by atom / molecule / organism
- `/templates` — Downloadable Vite + React admin starter (zip)

## Stack

- React 19 + TypeScript + Vite
- React Router
- CSS design tokens
- Lucide icons

## Develop

```bash
npm install
npm run dev
```

## Deploy

Site is published to GitHub Pages via Actions on every push to `main`:

**https://iyanqalbi.github.io/saas-design-system/**

```bash
npm run build
```

Vite `base` and React Router `basename` are set to `/saas-design-system/`.

## Structure

```
src/
  components/
    atoms/
    molecules/
    organisms/
  templates/
  pages/
  styles/
    tokens.css
    global.css
  lib/downloadTemplate.ts
```
