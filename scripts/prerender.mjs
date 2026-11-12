// Пререндер: dist/index.html (шаблон клиента) + dist-ssr/entry-server.js
// → статический HTML на каждый опубликованный URL, 404.html, sitemap.xml, robots.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

const template = await readFile(join(dist, 'index.html'), 'utf8')
const { render, getPrerenderEntries, siteUrl } = await import(pathToFileURL(ssrEntry).href)

/** '/' → index.html, '/ka/' → ka/index.html, '/kontakty' → kontakty.html */
function fileFor(path) {
  if (path.endsWith('/')) return join(dist, path, 'index.html')
  return join(dist, `${path}.html`)
}

async function renderPage(url) {
  const { html, head } = await render(url)
  return template
    .replace('<html lang="ru">', `<html${head.htmlAttrs}>`)
    .replace('<!--head-tags-->', head.headTags)
    .replace('<!--app-html-->', html)
}

async function write(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

const entries = getPrerenderEntries()

for (const { path } of entries) {
  await write(fileFor(path), await renderPage(path))
  console.log('  ✓', path)
}

// Cloudflare Pages отдаёт 404.html со статусом 404 для неизвестных URL
await write(join(dist, '404.html'), await renderPage('/404'))
console.log('  ✓ 404.html')

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    ({ path, alternates }) => `  <url>
    <loc>${escapeXml(siteUrl + path)}</loc>
${alternates
  .map(
    (a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeXml(a.href)}"/>`,
  )
  .join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`
await write(join(dist, 'sitemap.xml'), sitemap)
await write(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
)
console.log(`  ✓ sitemap.xml (${entries.length} URL), robots.txt`)

// SSR-бандл нужен только для пререндера
await rm(join(root, 'dist-ssr'), { recursive: true, force: true })
