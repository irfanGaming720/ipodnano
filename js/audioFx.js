let context
export function tick() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    context ||= new AudioContext()
    const now = context.currentTime
    const osc = context.createOscillator(); const gain = context.createGain()
    osc.type = 'square'; osc.frequency.setValueAtTime(1200, now); osc.frequency.exponentialRampToValueAtTime(240, now + .024)
    gain.gain.setValueAtTime(.028, now); gain.gain.exponentialRampToValueAtTime(.001, now + .042)
    osc.connect(gain).connect(context.destination); osc.start(now); osc.stop(now + .045)
  } catch {}
}
