export class Inertia {
  constructor(value = 0, min = 0, max = Infinity) {
    this.current = value
    this.target = value
    this.velocity = 0
    this.min = min
    this.max = max
  }

  clamp(value) {
    return Math.max(this.min, Math.min(this.max, value))
  }

  step() {
    this.target = this.clamp(this.target)
    this.current += (this.target - this.current) * 0.2
    this.current = this.clamp(this.current)
    this.velocity *= 0.88
    return this.current
  }

  nudge(amount) {
    this.velocity += amount
    this.target += amount
  }

  settle() {
    this.target = Math.round(this.target)
    this.velocity = 0
  }
}

export const coverTransform = (delta) => {
  const abs = Math.abs(delta)

  if (abs < 1) {
    return {
      rotate: 0,
      x: 0,
      z: 80,
      scale: 1,
      shade: abs * 0.35,
    }
  }

  return {
    rotate: delta <= -1 ? 72 : -72,
    x: delta <= -1 ? -110 + (delta + 1) * 38 : 110 + (delta - 1) * 38,
    z: -60,
    scale: 1,
    shade: Math.min(0.75, abs * 0.4),
  }
}
