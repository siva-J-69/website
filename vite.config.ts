import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { headHtml, noscriptHtml, robotsTxt, sitemapXml } from './src/seo/meta.ts'

function seoFiles(): Plugin {
  return {
    name: 'siva-seo',
    transformIndexHtml(html) {
      return html.replace('<!--seo:head-->', headHtml()).replace('<!--seo:noscript-->', noscriptHtml())
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(robotsTxt())
          return
        }
        if (path === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(sitemapXml())
          return
        }
        next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
})
