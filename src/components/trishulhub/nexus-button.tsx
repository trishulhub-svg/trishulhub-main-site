'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import gsap from 'gsap'

type NexusButtonProps = {
  href: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
  showArrow?: boolean
}

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const FS = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_arcs;
uniform float u_flash;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.05+vec2(9.7,3.1); a*=0.5; }
  return v;
}
float sdRBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float ar = u_res.x / u_res.y;
  vec2 hs = vec2(ar * 0.5 - 0.2, 0.5 - 0.2);
  float d = sdRBox(p, hs, 0.14);
  float t = u_time;
  float hover = clamp(u_arcs / 6.0, 0.0, 1.0);
  vec3 col = vec3(0.039, 0.039, 0.039);
  float plate = 1.0 - smoothstep(-0.004, 0.004, d);
  vec3 plateCol = vec3(0.04, 0.05, 0.055) + vec3(0.014, 0.022, 0.035) * fbm(p * 9.0);
  plateCol += vec3(0.0, 0.25, 0.3) * exp(d * 9.0) * (0.25 + hover * 0.6);
  col = mix(col, plateCol, plate);
  col *= 1.0 + 0.5 * exp(-max(d, 0.0) * 16.0) * (1.0 - plate);
  float a = atan(p.y, p.x);
  vec3 arcCol = vec3(0.0);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float w = clamp(u_arcs - fi, 0.0, 1.0);
    float n1 = fbm(vec2(a * 2.4 + fi * 11.3, t * (1.6 + fi * 0.27) + fi * 53.1));
    float off = (n1 - 0.5) * (0.11 + u_flash * 0.1);
    float seg = 0.3 + 0.7 * smoothstep(0.35, 0.75, noise(vec2(a * 1.8 + fi * 7.7, t * (0.9 + fi * 0.13) + fi * 19.0)));
    float g = 0.0042 / (abs(d + off) + 0.006);
    arcCol += (vec3(0.0, 0.75, 0.9) * g + vec3(0.6, 1.0, 0.95) * g * g * 0.55) * w * seg;
  }
  float outerMask = 1.0 - smoothstep(0.04, 0.15, d);
  col += arcCol * (0.6 + 0.4 * hover) * outerMask;
  float ring = 0.006 / (abs(d) + 0.006);
  col += vec3(0.8, 0.98, 1.0) * ring * u_flash * 1.5 * outerMask;
  col += vec3(0.7, 0.95, 1.0) * u_flash * 0.16 * outerMask;
  gl_FragColor = vec4(col, 1.0);
}
`

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

type ValenceState = {
  arcs: number
  arcsTarget: number
  flash: number
  crawl: number
  last: number
  running: boolean
}

/**
 * Valence Core primary CTA — electric arc WebGL plate, no outer border frame.
 * TrishulHub cyan + Space Grotesk label.
 */
export function NexusButton({
  href,
  children,
  className = '',
  fullWidth = false,
}: NexusButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const reactId = useId()
  const stateRef = useRef<ValenceState>({
    arcs: 2.4,
    arcsTarget: 2.4,
    flash: 0,
    crawl: 0,
    last: 0,
    running: true,
  })

  const onEnter = useCallback(() => {
    stateRef.current.arcsTarget = 5.8
    if (btnRef.current) btnRef.current.style.transform = 'translateY(-2px)'
  }, [])

  const onLeave = useCallback(() => {
    stateRef.current.arcsTarget = 2.4
    if (btnRef.current) btnRef.current.style.transform = 'translateY(0)'
  }, [])

  const onDown = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translateY(1px) scale(0.99)'
    }
  }, [])

  const onUp = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = 'translateY(-2px)'
    stateRef.current.flash = 1
  }, [])

  // Entrance flicker
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    gsap.fromTo(
      btn,
      { opacity: 0, scale: 0.92 },
      {
        keyframes: [
          { opacity: 0, scale: 0.92, duration: 0 },
          { opacity: 0.85, duration: 0.1 },
          { opacity: 0.12, duration: 0.07 },
          { opacity: 0.92, duration: 0.1 },
          { opacity: 0.35, duration: 0.08 },
          { opacity: 1, scale: 1.015, duration: 0.15 },
          { opacity: 1, scale: 1, duration: 0.65 },
        ],
        ease: 'none',
      },
    )
  }, [reactId])

  useEffect(() => {
    const canvas = canvasRef.current
    const btn = btnRef.current
    if (!canvas || !btn) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })
    if (!gl) {
      btn.style.background = '#062630'
      return
    }

    const prog = gl.createProgram()
    if (!prog) return
    const vsh = createShader(gl, gl.VERTEX_SHADER, VS)
    const fsh = createShader(gl, gl.FRAGMENT_SHADER, FS)
    if (!vsh || !fsh) return
    gl.attachShader(prog, vsh)
    gl.attachShader(prog, fsh)
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
    const uArcs = gl.getUniformLocation(prog, 'u_arcs')
    const uFlash = gl.getUniformLocation(prog, 'u_flash')

    const state = stateRef.current
    state.running = true
    state.last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(btn.clientWidth * dpr)
      const h = Math.round(btn.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    let raf = 0
    const render = (now: number) => {
      if (!state.running) return
      const dt = Math.min(0.05, (now - state.last) / 1000)
      state.last = now
      state.arcs += (state.arcsTarget - state.arcs) * Math.min(1, dt * 5)
      state.flash *= Math.exp(-3.6 * dt)
      state.crawl += dt * (0.6 + (state.arcs / 6) * 1.1 + state.flash * 2.0)

      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduced ? 3.0 : state.crawl)
      gl.uniform1f(uArcs, state.arcs)
      gl.uniform1f(uFlash, state.flash)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!state.running) {
            state.running = true
            state.last = performance.now()
            raf = requestAnimationFrame(render)
          }
        } else {
          state.running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(btn)
    raf = requestAnimationFrame(render)

    return () => {
      state.running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [reactId])

  const shellStyle: CSSProperties = fullWidth
    ? { display: 'block', width: '100%' }
    : { display: 'inline-flex', justifyContent: 'center' }

  return (
    <div className={`relative ${className}`} style={shellStyle}>
      {/* Single shell only — no outer rectangle border */}
      <Link
        ref={btnRef}
        href={href}
        id={`btn-valence-${reactId}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseDown={onDown}
        onMouseUp={onUp}
        className={`group relative flex h-[72px] items-center justify-center rounded-[18px] bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00DEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 sm:h-[84px] ${
          fullWidth ? 'w-full' : 'w-[240px] max-w-full sm:w-[280px]'
        }`}
        style={{
          transition: 'transform .22s cubic-bezier(.34, 1.4, .5, 1)',
          opacity: 0,
          transform: 'scale(0.92)',
        }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 block h-full w-full rounded-[18px]"
          style={{ filter: 'drop-shadow(0 0 15px rgba(0, 222, 255, 0.22))' }}
        />
        <span
          className="relative z-10 pointer-events-none font-display text-sm font-medium tracking-[0.22em] text-[#e0f7f8]"
          style={{
            textShadow:
              '0 0 12px rgba(0, 210, 255, .6), 0 1px 4px rgba(0, 0, 0, .8)',
          }}
        >
          {children}
        </span>
      </Link>
    </div>
  )
}
