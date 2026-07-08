import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'
import { CATEGORIES } from '../data/trip.js'

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
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110) onClose() }}
          >
            <div className="sheet__handle" />
            <div className="sheet__content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
