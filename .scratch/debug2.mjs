import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const info = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const chain = []
  let el = h1
  while (el && el !== document.body) {
    const cs = getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    chain.push({
      tag: el.tagName,
      cls: el.className && el.className.toString().slice(0, 60),
      display: cs.display,
      position: cs.position,
      height: cs.height,
      transform: cs.transform,
      rectHeight: rect.height,
      rectTop: rect.top,
    })
    el = el.parentElement
  }
  return chain
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
