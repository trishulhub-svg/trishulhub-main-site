// Minimal SSR-ish test of framer-motion's animate() with keyframes
// to see if it throws "Invalid value used as weak map key"

// Stub minimal DOM globals so framer-motion can load
globalThis.window = undefined
globalThis.document = undefined

import { animate } from 'framer-motion'

console.log('animate type:', typeof animate)

try {
  const controls = animate(0, [0, 12, 48, 76, 100, 0], {
    duration: 5.5,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'loop',
    times: [0, 0.18, 0.45, 0.7, 0.9, 1],
    onUpdate: (latest) => console.log('latest', latest),
  })
  console.log('OK 3-arg (0, [array], opts):', typeof controls)
  controls.stop()
} catch (e) {
  console.error('FAIL 3-arg (0, [array], opts):', e.message)
}

try {
  const controls = animate([0, 12, 48, 76, 100, 0], {
    duration: 5.5,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'loop',
    times: [0, 0.18, 0.45, 0.7, 0.9, 1],
    onUpdate: (latest) => console.log('latest', latest),
  })
  console.log('OK 2-arg ([array], opts):', typeof controls)
  controls.stop()
} catch (e) {
  console.error('FAIL 2-arg ([array], opts):', e.message)
}

try {
  const controls = animate(0, 100, {
    duration: 1,
    onUpdate: (latest) => console.log('latest', latest),
  })
  console.log('OK 3-arg (0, 100, opts):', typeof controls)
  controls.stop()
} catch (e) {
  console.error('FAIL 3-arg (0, 100, opts):', e.message)
}

process.exit(0)
