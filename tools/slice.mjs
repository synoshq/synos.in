// Slice a tall page screenshot into deliverable panels.
//
// Why this exists: SendUserFile rejects very tall images with a 400, and it is the aspect ratio
// rather than the file size, so a 12,000px page has to arrive as three or four panels.
//
// Why ffmpeg rather than sips: `sips -c h w` crops from the CENTRE of the image. With
// --cropOffset it shifts relative to the centre, not from the top, so a naive top-down loop
// silently returns the middle of the page and the first panel looks like it starts at section
// four. That cost a round trip on 2026-08-21. ffmpeg's crop filter is x,y from the top left.
//
// Usage:
//   node tools/slice.mjs .shots/product-1440.png            panels of 6000 source px
//   node tools/slice.mjs .shots/product-1440.png 5000       a different slice height
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { basename, join } from 'node:path'

const src = process.argv[2]
if (!src) { console.error('usage: node tools/slice.mjs <png> [sliceHeight]'); process.exit(1) }
const SLICE = Number(process.argv[3] || 6000)
const OUT = '.shots/panels'
const name = basename(src).replace(/-\d+\.png$/, '').replace(/\.png$/, '')

// `ffmpeg -i x` with no output file always exits 1 after printing the stream line, so the probe
// has to read stderr off the thrown error rather than off a successful return.
let probe = ''
try {
  probe = execFileSync('ffmpeg', ['-i', src], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
} catch (e) {
  probe = String(e.stderr || '')
}
const m = /,\s(\d+)x(\d+)[\s,]/.exec(probe)
if (!m) { console.error('could not read dimensions from ffmpeg'); process.exit(1) }
const [w, h] = [Number(m[1]), Number(m[2])]

mkdirSync(OUT, { recursive: true })
const n = Math.ceil(h / SLICE)
for (let i = 0; i < n; i++) {
  const y = i * SLICE
  const sh = Math.min(SLICE, h - y)
  const out = join(OUT, `${name}-${i}.jpg`)
  rmSync(out, { force: true })
  execFileSync('ffmpeg', [
    '-loglevel', 'error', '-i', src,
    '-vf', `crop=${w}:${sh}:0:${y},scale=1200:-1`,
    '-q:v', '4', out,
  ])
  console.log(`${out}  rows ${y} to ${y + sh}`)
}
