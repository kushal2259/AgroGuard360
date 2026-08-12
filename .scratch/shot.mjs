import { chromium } from 'playwright'

const OUT = 'C:\\Users\\kusha\\AppData\\Local\\Temp\\claude\\C--preyansh-app\\87cc8c6f-465d-4280-b699-d1c065eb0169\\scratchpad'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}\\01-cover.png` })

async function goDot(i) {
  const dots = await page.$$('button[aria-label^="Go to slide"]')
  await dots[i].click()
  await page.waitForTimeout(900)
}

await goDot(1)
await page.screenshot({ path: `${OUT}\\02-problem.png` })

await goDot(4)
await page.screenshot({ path: `${OUT}\\05-virtualfarm.png` })

await goDot(5)
await page.screenshot({ path: `${OUT}\\06-pegasus.png` })

await goDot(6)
await page.screenshot({ path: `${OUT}\\07-buddhi.png` })

await goDot(7)
await page.screenshot({ path: `${OUT}\\08-talos.png` })

await goDot(9)
await page.screenshot({ path: `${OUT}\\10-fiontar.png` })

await goDot(10)
await page.screenshot({ path: `${OUT}\\11-mercatus.png` })

await goDot(11)
await page.screenshot({ path: `${OUT}\\12-modules.png` })

await goDot(14)
await page.screenshot({ path: `${OUT}\\15-final.png` })

// Live demo from cover
await goDot(0)
await page.waitForTimeout(300)
const demoBtn = await page.locator('button:has-text("Run Live Demo")').first()
await demoBtn.click()
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}\\16-livedemo.png` })

await browser.close()
console.log('done')
