import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()))
page.on('pageerror', (err) => console.log('PAGEERROR:', err.message))
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

const info = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const btns = Array.from(document.querySelectorAll('button')).map((b) => b.textContent.trim()).filter(Boolean)
  const root = document.getElementById('root')
  return {
    h1Text: h1 ? h1.textContent : null,
    h1Opacity: h1 ? getComputedStyle(h1.closest('div[style]') || h1).opacity : null,
    h1Rect: h1 ? h1.getBoundingClientRect() : null,
    rootRect: root.getBoundingClientRect(),
    buttons: btns,
    bodyChildCount: document.body.children.length,
  }
})
console.log(JSON.stringify(info, null, 2))

await page.screenshot({ path: 'C:\\Agroguard360\\.scratch\\debug-cover.png' })
await browser.close()
