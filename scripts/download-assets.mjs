// 下载参考站视觉素材到本地 public/（Node fetch，无需 curl/wget）
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const BASE = 'https://suanlemeai.cn'

const assets = [
  'home/suanleme-cloud-scroll.jpg',
  'home/suanleme-day-mystic-hero.jpg',
  'visuals/astrology-twelve-house-wheel-v2.jpg',
  'personality/moonlit-editorial-desk.jpg',
  'relationship/relationship-mirror-morning-fast.webp',
]

async function run() {
  for (const rel of assets) {
    const url = `${BASE}/${rel}`
    const dest = join(PUBLIC, rel)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.warn(`[skip] ${rel} -> HTTP ${res.status}`)
        continue
      }
      const buf = Buffer.from(await res.arrayBuffer())
      await mkdir(dirname(dest), { recursive: true })
      await writeFile(dest, buf)
      console.log(`[ok] ${rel} (${(buf.length / 1024).toFixed(0)} KB)`)
    } catch (err) {
      console.warn(`[fail] ${rel} -> ${err.message}`)
    }
  }
}

run()
