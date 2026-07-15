import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

/* Full-screen transition wrapper used by every screen. The enter animation is
   a plain CSS keyframe (see .screen in components.css) — reliable on mount,
   unlike framer's motion-level enter which stalled here. Top padding respects
   the device safe area (notch / status bar). */
export function Screen({ children, className = '' }) {
  return (
    <div
      className={`screen screen--enter ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        paddingTop: 'env(safe-area-inset-top, 8px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}

export function AppBar({ title, subtitle, onBack, right }) {
  const navigate = useNavigate()
  return (
    <div className="appbar">
      {onBack !== null && (
        <button className="appbar__back" onClick={onBack || (() => navigate(-1))} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
      )}
      <div className="appbar__titles">
        {title && <div className="t-hd-sm">{title}</div>}
        {subtitle && <div className="t-p-small muted">{subtitle}</div>}
      </div>
      {right && <div className="appbar__right">{right}</div>}
    </div>
  )
}

export function Footer({ children }) {
  return <div className="footer">{children}</div>
}
