import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import Icon from './Icon.jsx'
import { CATEGORIES, EXPERT, onAvatarError } from '../data/trip.js'

/* ── Avatar with flag badge ───────────────────────────────────── */
export function ExpertAvatar({ size = 96 }) {
  return (
    <span className="avwrap" style={{ width: size, height: size }}>
      <img
        className="expert-card__av" style={{ width: size, height: size }}
        src={EXPERT.avatar} onError={onAvatarError} alt={EXPERT.name}
      />
      <span className="avwrap__flag">{EXPERT.flag}</span>
    </span>
  )
}

/* ── Rich local-expert card — accomplishments + social proof ──── */
export function ExpertCard() {
  return (
    <div className="excard">
      <div className="excard__head">
        <ExpertAvatar size={54} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="t-lb-sm muted">Your local expert</div>
          <div className="t-hd-sm">{EXPERT.name}</div>
          <span className="expert-card__verify"><Icon name="check" size={12} />{EXPERT.title}</span>
        </div>
      </div>
      <div className="excard__stats">
        {EXPERT.stats.map((s) => (
          <div key={s.label} className="excard__stat">
            <div className="excard__statval">{s.value}</div>
            <div className="excard__statlbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Button ───────────────────────────────────────────────────── */
export function Button({ children, variant = 'primary', full, onClick, disabled, icon, size = 'lg' }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}${full ? ' btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  )
}

/* ── Category pill ────────────────────────────────────────────── */
export function CategoryPill({ category }) {
  const c = CATEGORIES[category]
  if (!c) return null
  return (
    <span className="pill">
      <span className="pill__dot" style={{ background: c.color }} />
      {c.label}
    </span>
  )
}

/* ── Progress stepper ("2 of 5") ──────────────────────────────── */
export function Stepper({ current, total }) {
  return (
    <div className="stepper">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`stepper__seg${i < current ? ' is-on' : ''}`} />
      ))}
    </div>
  )
}

/* ── Bottom sheet ─────────────────────────────────────────────── */
export function Sheet({ open, onClose, children, height = '72%' }) {
  // Drag-to-dismiss is initiated only from the handle (dragListener={false} +
  // dragControls) so taps on buttons inside the sheet are never swallowed by
  // the drag gesture.
  const controls = useDragControls()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet__scrim"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.div
            className="sheet"
            style={{ maxHeight: height }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110) onClose() }}
          >
            <div
              className="sheet__handle"
              style={{ touchAction: 'none', cursor: 'grab' }}
              onPointerDown={(e) => controls.start(e)}
            />
            <div className="sheet__content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
