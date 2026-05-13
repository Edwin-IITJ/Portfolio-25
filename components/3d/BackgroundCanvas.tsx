'use client'
import { useEffect, useRef } from 'react'

// ─── Grid ─────────────────────────────────────────────────────────────────────
const SPACING = 32     // px between grid points
const DOT_R = 1.3    // px base dot radius
const BASE_ALPHA = 0.13   // resting opacity
const MAX_DISP = 26     // px — clamp total displacement

// ─── Gravity ──────────────────────────────────────────────────────────────────
const SOFTENING = 52     // prevents infinity at mass center
const MASS_K = 55_000 // gravitational constant for drifting masses
const MOUSE_K = 90_000 // cursor pulls harder than drifting masses

// ─── Drifting masses (Lissajous paths, project-coloured) ─────────────────────
// ampX/ampY are fractions of W/H. Frequencies chosen to avoid simple repeats.
const MASS_DEFS = [
  // indigo — LiquidRead / AI
  { aX: 0.30, aY: 0.25, fX: 0.19, fY: 0.23, ph: 0.00, rgb: [99, 102, 241] as const },
  // amber  — Meleth Archive / Photography
  { aX: 0.26, aY: 0.32, fX: 0.29, fY: 0.17, ph: 2.10, rgb: [245, 158, 11] as const },
  // teal   — LucidPast / XR memory
  { aX: 0.20, aY: 0.28, fX: 0.13, fY: 0.31, ph: 4.30, rgb: [20, 184, 166] as const },
]

// ─── Component ────────────────────────────────────────────────────────────────
const BackgroundCanvas = ({ onLoaded }: { onLoaded?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0, t = 0
    const mouse = { x: -99999, y: -99999 }

    const init = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      onLoaded?.()
    }

    const tick = () => {
      t += 0.0035
      ctx.clearRect(0, 0, W, H)

      // ── Compute current mass positions ──────────────────────────────────────
      const masses = MASS_DEFS.map(m => ({
        x: W * 0.5 + W * m.aX * Math.sin(t * m.fX + m.ph),
        y: H * 0.5 + H * m.aY * Math.cos(t * m.fY + m.ph),
        k: MASS_K,
        rgb: m.rgb,
      }))

      const hasMouse = mouse.x > -9000
      if (hasMouse) {
        masses.push({ x: mouse.x, y: mouse.y, k: MOUSE_K, rgb: [99, 102, 241] })
      }

      // ── Rasterise displaced grid ────────────────────────────────────────────
      const cols = Math.ceil(W / SPACING) + 2
      const rows = Math.ceil(H / SPACING) + 2

      for (let row = -1; row < rows; row++) {
        const gy = row * SPACING

        for (let col = -1; col < cols; col++) {
          const gx = col * SPACING

          // Gravity pull + colour blend
          let fdx = 0, fdy = 0
          let rAcc = 0, gAcc = 0, bAcc = 0, wAcc = 0

          for (const m of masses) {
            const dx = gx - m.x
            const dy = gy - m.y
            const d2 = dx * dx + dy * dy + SOFTENING * SOFTENING
            const d = Math.sqrt(d2)

            // Inverse-cube force (k/r² in magnitude, divided by r again for direction)
            const f = m.k / (d * d2)
            fdx -= dx * f
            fdy -= dy * f

            // Colour: weight by 1/d2 (IDW, no extra sqrt)
            const cw = 1 / d2
            rAcc += m.rgb[0] * cw
            gAcc += m.rgb[1] * cw
            bAcc += m.rgb[2] * cw
            wAcc += cw
          }

          // Clamp displacement magnitude
          const dmag = Math.sqrt(fdx * fdx + fdy * fdy)
          const clamp = dmag > MAX_DISP ? MAX_DISP / dmag : 1
          const px = gx + fdx * clamp
          const py = gy + fdy * clamp

          // Displaced fraction → drives glow & opacity boost
          const disp = Math.min(dmag, MAX_DISP) / MAX_DISP

          // Blended colour from all masses
          const r = Math.round(rAcc / wAcc)
          const g = Math.round(gAcc / wAcc)
          const b = Math.round(bAcc / wAcc)

          const alpha = BASE_ALPHA + disp * 0.28
          const radius = DOT_R + disp * 1.1

          // Soft glow for strongly displaced dots (near lens centres)
          if (disp > 0.55) {
            ctx.beginPath()
            ctx.arc(px, py, radius * 4.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${r},${g},${b},${disp * 0.06})`
            ctx.fill()
          }

          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.55)})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(tick)
    }

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = mouse.y = -99999 }

    init(); tick()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [onLoaded])

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-primary-50/40 to-accent-50/30">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        aria-hidden="true"
      />
    </div>
  )
}

export default BackgroundCanvas
