# Car painting website

Vite + Vue 3 + TypeScript + SCSS + vue-router, custom SSR prerender (no Nuxt, no Tailwind). Hosting: Cloudflare Pages.
Plan, pages and decisions: `docs/ROADMAP.md` (it takes precedence over the brief `PAINT_SITE_BRIEF.md`).
Talk to the user in Russian. Site copy is written in Russian first; other languages come later as translations.

## Commands

- `npm run dev` — dev server (port 4300)
- `npm run build` — typecheck → client → SSR → `scripts/prerender.mjs` (HTML, sitemap, robots into `dist/`)
- `npm run preview` — serve the built site
- `npm run lint` — oxlint, `npm run format` — oxfmt

## Structure

```
src/
  app.ts, entry-client.ts, entry-server.ts   app factory, hydration, SSR
  App.vue                                    shell: header, RouterView, footer
  router.ts                                  routes = pages × visible locales
  config/          site.ts (brand, domain, phone), pages.ts (pages and per-locale slugs)
  types/           all interfaces and types, by topic (content.ts = shape every locale's content must match)
  constants/       locale-independent constants: image paths and widths, header height, car SVG parts
  utils/           pure functions without Vue: imageSources, formatPrice, padNumber, messenger links
  i18n/            locales.ts (3 locales: ru, ka, en; published flag), messages/<lang>.ts — short UI strings
  data/            locale-independent data: prices, stages, works, order, photos
  content/<lang>/  content texts by topic; keys typed by ids from data/. Loaded with the locale, read via useContent()
                   (content/index.ts — untranslated locales fall back to ru)
  pages/           pages (…Page.vue)
  components/      shared components (HeroCar — temporary SVG car, to be replaced by the Audi photo)
    layout/        SiteHeader, SiteFooter, LangSwitcher
    sections/      full page sections with their own heading (…Section.vue)
    blocks/        reusable pieces placed inside sections or pages (PriceTable, PriceHowto, InsuranceNote, PhotoLightbox)
  composables/     useXxx
  seo/             useSeo, hreflang
  styles/          _tokens.scss, _mixins.scss, _ui.scss, base.scss
```

## Order inside `<script setup>`

1. Imports
2. `defineProps` / `defineEmits`
3. Composables: `useRoute()`, `useI18n()`, `useSeo()`
4. Constants
5. State: `ref`, `reactive`
6. `computed`
7. Functions
8. `watch`
9. Lifecycle hooks: `onMounted`, `onBeforeUnmount`

Import groups in this order: `vue` → libraries → `@/…` → sibling files (`./`). Types go on separate `import type` lines.

SFC blocks: `<script setup lang="ts">` → `<template>` → `<style scoped lang="scss">`.

Do not declare interfaces, types, constants or pure functions in `.vue` files — they live in `types/`, `constants/`, `utils/`. A component keeps only its own state and logic. Imported functions can be called directly in the template.

## Rules

**Naming and files**

- Components in PascalCase; sections `…Section.vue`, pages `…Page.vue`.
- Data constants in UPPER_CASE (`PRICES`), everything else in camelCase.
- `id`s in `src/data/` are English camelCase (`hood`, `frontBumper`) and are never renamed: translations reference them.
- One section — one component. Over ~250 lines — split it.

**SSR and hydration**

- `window`, `document`, `localStorage` — only in `onMounted` or event handlers.
- Anything browser-dependent (scroll, viewport size, date, `Math.random`) may change markup only after mount, otherwise it diverges from the prerendered HTML.

**Links and SEO**

- Internal links — only `RouterLink` + `pagePath(id, locale)`, never a hand-written `href="/…"`: slugs differ per locale.
- Exactly one `h1` per page, headings in order h1 → h2 → h3.
- Every page calls `useSeo` with a title and description.

**Texts**

- No hardcoded text in templates: short strings go to `i18n/messages`, content to `content/<lang>/`.
- Content texts are typed by ids from `data/` (`satisfies Record<Id, string>`) so no locale can miss an item.
- Never write: guarantees or turnaround times, "best"/"No. 1", texts copied from autosyndicate / autosyndycate. Staff: «маляры и рихтовщики с опытом от 12 лет» (painters and body repairers, 12+ years).
- Painting is the product. Body repair (рихтовка) and anti-corrosion are presented as preparation for painting, done on site — never as separate services.

**Styles**

- BEM: `.block`, `.block__el`, `.block--mod`; states via `.is-open`.
- Colors, fonts and repeated sizes — only tokens from `_tokens.scss`. One light theme ("Kraft"), no dark theme.
- Media queries — mixins `above()` / `below()`; animations — inside `@include motion`.
- No `!important`.

**Images and icons**

- Images go through a shared component: `srcset` 400/800/1200, `width`/`height`, `loading="lazy"` (except hero), `alt` is required.
- A changed image gets a new file name or `?v=N`: `/images/*` is cached for 30 days.
- Icons — inline SVG with `currentColor`.

**Accessibility**

- An action is a `<button>`, navigation is an `<a>`/`RouterLink`. Icon-only buttons require `aria-label`.

**TypeScript and state**

- No `any`. Data uses `as const` and `satisfies`. Props — `defineProps<{ … }>()`.
- Emits — an array of strings, no TS signatures; event names in kebab-case, the variable is always `emit`:
  ```ts
  const emit = defineEmits(['close', 'select-color', 'update-value'])
  ```
- State: props down, events up, shared state via composables. No Pinia.

**Comments and formatting**

- Comments only where the "why" is not obvious. No `// ----------` dividers.
- Formatting — oxfmt only (`.oxfmtrc.json`: no semicolons, single quotes, width 100).
