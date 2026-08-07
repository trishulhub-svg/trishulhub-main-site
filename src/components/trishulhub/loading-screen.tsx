'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const LAUNCH_KEY = 'trishulhub-launched'

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const FS = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_warp;
uniform float u_flash;
uniform float u_speed;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.07+vec2(13.1,5.7); a*=0.5; }
  return v;
}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float r = length(uv), rr = max(r, 0.08), a = atan(uv.y, uv.x), t = u_time;
  vec3 col = vec3(0.012, 0.02, 0.028);
  float hz = fbm(uv * 2.6 + vec2(t * 0.35 * u_speed, 1.7));
  col += vec3(0.02, 0.12, 0.18) * hz * (0.7 + 0.6 * u_warp);
  for (int i = 0; i < 3; i++) {
    float fi = float(i), ringN = 26.0 + fi * 9.0;
    vec2 sp = vec2((a / 6.28318 + 0.5) * ringN, (0.3 + fi * 0.22) / rr + t * (2.0 + fi * 1.2) * u_speed);
    vec2 cell = floor(sp), f = fract(sp);
    float h = hash(cell + fi * 17.31), on = step(0.68, h);
    vec2 c = vec2(0.2 + 0.6 * hash(cell + 4.7), 0.5), dlt = f - c;
    float sy = mix(130.0, 8.0, u_warp), star = on * exp(-(dlt.x * dlt.x * 150.0 + dlt.y * dlt.y * sy));
    float tw = (0.7 + 0.3 * sin(h * 81.0 + t * 9.0 * u_speed));
    vec3 sCol = mix(vec3(0.85, 0.98, 1.0), vec3(0.0, 0.87, 1.0), step(0.9, h));
    col += sCol * star * mix(tw, 1.0, u_warp) * smoothstep(0.02, 0.25, r) * (1.1 + 0.7 * u_warp);
  }
  col += vec3(0.55, 0.95, 1.0) * u_warp * 0.32 * exp(-r * 4.0);
  col = mix(col, vec3(0.9, 0.98, 1.0), clamp(u_flash, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

/**
 * One-time LAUNCH gate — button only. Skipped after first launch in this tab
 * (sessionStorage), so returning to Home never shows it again.
 */
export function LoadingScreen() {
  const [mounted, setMounted] = useState(false)
  const [done, setDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const stateRef = useRef({
    warp: 0,
    warpTarget: 0,
    flash: 0,
    z: 0,
    last: 0,
    speed: 1,
    running: true,
  })

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (sessionStorage.getItem(LAUNCH_KEY) === '1') {
          setDone(true)
          setMounted(true)
          return
        }
      } catch {
        /* ignore */
      }
      setMounted(true)
    }, 0)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!mounted || done || !containerRef.current) return
    const el = containerRef.current
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.6, filter: 'blur(10px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.0,
        ease: 'back.out(1.7)',
      },
    )
  }, [mounted, done])

  useEffect(() => {
    if (!mounted || done) return
    const canvas = canvasRef.current
    const btn = btnRef.current
    if (!canvas || !btn) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    stateRef.current.speed = isMobile ? 1.45 : 1

    const prog = gl.createProgram()
    if (!prog) return
    const vs = compile(gl, gl.VERTEX_SHADER, VS)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FS)
    if (!vs || !fs) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const locP = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(locP)
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uWarp = gl.getUniformLocation(prog, 'u_warp')
    const uFlash = gl.getUniformLocation(prog, 'u_flash')
    const uSpeed = gl.getUniformLocation(prog, 'u_speed')

    let raf = 0
    const state = stateRef.current
    state.running = true
    state.last = performance.now()

    const frame = (now: number) => {
      if (!state.running) return
      const dt = Math.min(0.05, (now - state.last) / 1000)
      state.last = now
      state.warp += (state.warpTarget - state.warp) * Math.min(1, dt * 2.6)
      state.flash *= Math.exp(-4.5 * dt)
      state.z += dt * (0.05 + state.warp * 1.35) * state.speed

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(canvas.clientWidth * dpr)
      const h = Math.floor(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, state.z)
      gl.uniform1f(uWarp, state.warp)
      gl.uniform1f(uFlash, state.flash)
      gl.uniform1f(uSpeed, state.speed)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      state.running = false
      cancelAnimationFrame(raf)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [mounted, done])

  const launch = useCallback(() => {
    if (exiting) return
    stateRef.current.flash = 1
    stateRef.current.warp = 1
    setExiting(true)
    try {
      sessionStorage.setItem(LAUNCH_KEY, '1')
    } catch {
      /* ignore */
    }

    const overlay = containerRef.current?.closest('[data-loader-root]')
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        scale: 1.06,
        filter: 'blur(12px)',
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => setDone(true),
      })
    } else {
      setTimeout(() => setDone(true), 650)
    }
  }, [exiting])

  if (!mounted || done) return null

  return (
    <AnimatePresence>
      <motion.div
        data-loader-root
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="pointer-events-none absolute h-[420px] w-[420px] rounded-full opacity-35 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)',
          }}
        />

        <div ref={containerRef} className="relative z-10 will-change-transform">
          <button
            ref={btnRef}
            type="button"
            onClick={launch}
            onMouseEnter={() => {
              stateRef.current.warpTarget = 1
            }}
            onMouseLeave={() => {
              stateRef.current.warpTarget = 0
            }}
            disabled={exiting}
            className="group relative block h-[78px] w-[264px] cursor-pointer rounded-[24px] border-0 bg-[linear-gradient(180deg,#2a3a44_0%,#0a1218_55%,#1a2830_100%)] p-[7px] outline-none transition-all duration-300 ease-[cubic-bezier(.34,1.4,.5,1)] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-[#00DEFF] focus-visible:outline-offset-[5px] active:translate-y-[1px] active:scale-[0.985] disabled:pointer-events-none"
            style={{
              boxShadow:
                '0 26px 52px rgba(4,24,36,.35), 0 3px 10px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.14)',
            }}
          >
            <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[17px] bg-[#050b11] shadow-[inset_0_2px_8px_rgba(0,0,0,.9)]">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 block h-full w-full"
                aria-hidden
              />
              <span
                className="relative z-10 pointer-events-none font-display text-sm font-medium uppercase tracking-[0.34em] text-[#e8fbff]"
                style={{
                  textShadow:
                    '0 0 14px rgba(0,222,255,.55), 0 1px 6px rgba(0,0,0,.9)',
                }}
              >
                Launch
              </span>
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
