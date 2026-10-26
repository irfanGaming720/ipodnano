const ring = ['t','y','u','j','n','b','v','c','f','r']
export function createWheelDetector(onStep) {
  let last = null
  return (event) => {
    const key = event.key.toLowerCase()
    if (!ring.includes(key)) return
    if (last === null) { last = key; return }
    const from = ring.indexOf(last); const to = ring.indexOf(key)
    if ((from + 1) % ring.length === to) onStep(1)
    else if ((from - 1 + ring.length) % ring.length === to) onStep(-1)
    last = key
  }
}
