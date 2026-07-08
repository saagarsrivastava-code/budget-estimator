import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'
import { EXPERT, EXPERT_FALLBACK_LARGE, onAvatarError } from '../data/trip.js'

/* ── Call overlay (full-screen, mock) ─────────────────────────── */
export function ExpertCallOverlay({ open, onClose }) {
  const [phase, setPhase] = useState('ringing') // ringing → connected
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    if (!open) { setPhase('ringing'); setSecs(0); return }
    const toConnected = setTimeout(() => setPhase('connected'), 2400)
    return () => clearTimeout(toConnected)
  }, [open])

  useEffect(() => {
    if (phase !== 'connected') return
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [phase])

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="call"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="call__top">
            <div className="call__avwrap">
              {phase === 'ringing' && <motion.span className="call__pulse" animate={{ scale: [1, 1.35], opacity: [0.5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />}
              <img className="call__av" src={EXPERT.avatar} alt={EXPERT.name} />
            </div>
            <div className="call__name">{EXPERT.name}</div>
            <div className="call__status">{phase === 'ringing' ? 'Calling…' : mmss}</div>
            <div className="call__sub">{EXPERT.title}</div>
          </div>

          <div className="call__controls">
            <button className="call__btn"><Icon name="mic" size={24} /></button>
            <button className="call__end" onClick={onClose} aria-label="End call"><Icon name="phone" size={26} /></button>
            <button className="call__btn"><Icon name="speaker" size={24} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
