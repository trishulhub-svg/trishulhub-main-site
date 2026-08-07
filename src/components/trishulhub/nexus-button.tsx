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
import { ArrowRight } from 'lucide-react'

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
uniform float u_time, u_level, u_tilt, u_slosh;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.04+vec2(11.3,7.1); a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float x = uv.x * (u_res.x / u_res.y);
  float t = u_time;
  float amp = 0.012 + u_slosh * 0.045;
  float surf = u_level + u_tilt * (uv.x - 0.5) * 0.34
    + amp * sin(x * 5.1 + t * 4.6)
    + amp * 0.62 * sin(x * 9.7 - t * 6.8 + 1.7);
  float d = surf - uv.y;
  // Deep TrishulHub navy base
  vec3 col = mix(vec3(0.02, 0.04, 0.07), vec3(0.04, 0.07, 0.12), uv.y);
  float inside = smoothstep(0.0, 0.012, d);
  // Brand cyan liquid (#00DEFF family)
  vec3 liq = mix(vec3(0.0, 0.87, 1.0), vec3(0.0, 0.22, 0.45), clamp(d/max(u_level,0.001),0.0,1.0));
  liq *= 0.8 + 0.42 * fbm(vec2(x * 4.2, (uv.y + t * 0.14) * 4.2));
  col = mix(col, liq, inside);
  col += vec3(0.0, 0.87, 1.0) * exp(-abs(d) * 80.0) * 0.85;
  vec2 e = uv * (1.0 - uv);
  col *= 0.55 + 0.45 * pow(e.x * e.y * 16.0, 0.22);
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

/**
 * Primary CTA — liquid WebGL fill in TrishulHub cyan, Space Grotesk label.
 * Falls back to solid cyan if WebGL is unavailable.
 */
export function NexusButton({
  href,
  children,
  className = '',
  fullWidth = false,
  showArrow = true,
}: NexusButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const reactId = useId()

  const onPointerMove = useCallback((e: React.MouseEvent | React.PointerEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const state = (btn as HTMLElement & { __nexus?: NexusState }).__nexus
    if (!state) return
    const rect = btn.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    if (state.lastX !== null) {
      state.slosh = Math.min(1.4, state.slosh + Math.abs(x - state.lastX) * 2.6)
    }
    state.lastX = x
    state.tiltT = (x - 0.5) * 2
  }, [])

  const onPointerLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    const state = (btn as HTMLElement & { __nexus?: NexusState }).__nexus
    if (!state) return
    state.lastX = null
    state.tiltT = 0
  }, [])

  const onClick = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    const state = (btn as HTMLElement & { __nexus?: NexusState }).__nexus
    if (!state) return
    state.gulp = 1
    state.slosh = Math.min(1.4, state.slosh + 0.7)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const btn = btnRef.current
    if (!canvas || !btn) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    })
    if (!gl) {
      btn.style.background = '#00DEFF'
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
    const uLevel = gl.getUniformLocation(prog, 'u_level')
    const uTilt = gl.getUniformLocation(prog, 'u_tilt')
    const uSlosh = gl.getUniformLocation(prog, 'u_slosh')

    const state: NexusState = {
      level: 0.56,
      gulp: 0,
      slosh: 0.4,
      tilt: 0,
      tiltT: 0,
      lastX: null,
      last: 0,
      running: true,
    }
    ;(btn as HTMLElement & { __nexus?: NexusState }).__nexus = state

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(btn.clientWidth * dpr)
      const h = Math.floor(btn.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    let raf = 0
    const render = (now: number) => {
      if (!state.running) return
      const dt = Math.min(0.05, (now - state.last) / 1000 || 0.016)
      state.last = now
      state.slosh *= Math.exp(-1.5 * dt)
      state.gulp *= Math.exp(-1.1 * dt)
      state.tilt += (state.tiltT - state.tilt) * Math.min(1, dt * 5)
      state.level +=
        (0.56 - 0.36 * state.gulp - state.level) * Math.min(1, dt * 5.5)

      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, now / 1000)
      gl.uniform1f(uLevel, state.level)
      gl.uniform1f(uTilt, state.tilt)
      gl.uniform1f(uSlosh, state.slosh)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }

    // Pause when off-screen to keep scroll light
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

  const shellStyle: CSSProperties = fullWidth ? { display: 'block', width: '100%' } : { display: 'inline-block' }

  return (
    <div className={`relative group ${className}`} style={shellStyle}>
      <div className="rounded-[19px] bg-gradient-to-b from-[#00DEFF]/30 via-neutral-800/20 to-cyan-950/40 p-[1px] shadow-2xl">
        <Link
          ref={btnRef}
          href={href}
          id={`nexus-btn-${reactId}`}
          onMouseMove={onPointerMove}
          onMouseLeave={onPointerLeave}
          onClick={onClick}
          className={`relative flex h-[58px] items-center justify-center overflow-hidden rounded-[18px] border-0 bg-[#050b11] p-0 transition-all duration-300 ease-out active:translate-y-[1px] active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00DEFF] focus-visible:outline-offset-[5px] ${
            fullWidth ? 'w-full' : 'min-w-[220px] max-w-full px-7 sm:min-w-[250px]'
          }`}
          style={{
            boxShadow:
              '0 22px 44px rgba(4,24,36,0.35), 0 3px 9px rgba(5,10,15,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block h-full w-full"
          />
          <span
            className="relative z-10 flex items-center gap-2 whitespace-nowrap font-display text-[13px] font-medium tracking-[0.14em] text-[#e0faff] sm:text-sm sm:tracking-[0.18em]"
            style={{ textShadow: '0 1px 10px rgba(0,18,25,0.85)' }}
          >
            {children}
            {showArrow ? (
              <ArrowRight size={16} className="opacity-80" strokeWidth={2} />
            ) : null}
          </span>
        </Link>
      </div>
    </div>
  )
}

type NexusState = {
  level: number
  gulp: number
  slosh: number
  tilt: number
  tiltT: number
  lastX: number | null
  last: number
  running: boolean
}
