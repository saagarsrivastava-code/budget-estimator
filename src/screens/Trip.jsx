import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Screen } from '../components/Chrome.jsx'
import { Button, CategoryPill, Sheet } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { EXPERT_AI, TRIP } from '../data/trip.js'

// Scripted edits the AI applies to the itinerary once a call ends.
const CALL_CHANGES = [
  { stopId: 's5', patch: { name: 'Freedom Beach (quiet cove)', category: 'nature' } },
  { stopId: 's1', patch: { time: '08:30' } },
  { insertAfter: 's2', stop: { id: 's9', time: '20:00', name: 'Suay Restaurant', category: 'food' } },
]

// The scripted transcript shown after a call.
const CALL_TRANSCRIPT = [
  { from: 'ai', text: "Hi Rahul! I'm your Scapia trip expert. I had a look at your Thailand plan — want to make it smoother?" },
  { from: 'me', text: 'Yeah, Wat Chalong feels a bit touristy. Something quieter?' },
  { from: 'ai', text: "Good call. I'll swap it for Freedom Beach — a quiet cove most tourists miss." },
  { from: 'me', text: 'Nice. Can we also do Big Buddha earlier to beat the crowds?' },
  { from: 'ai', text: "Done — moved it to 08:30. And I've added Suay for dinner on Day 1, a local favourite." },
  { from: 'me', text: 'Perfect, thanks!' },
  { from: 'ai', text: "Anytime. I've updated your itinerary — take a look 👇" },
]

export default function Trip() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(searchParams.get('tab') === 'chat')
  const [callOpen, setCallOpen] = useState(false)
  const [transcript, setTranscript] = useState(null) // set after first call
  const [days, setDays] = useState(TRIP.days)
  const [flashing, setFlashing] = useState(false)

  function startCall() {
    setSheetOpen(false)
    setTimeout(() => setCallOpen(true), 260) // let the sheet close first
  }

  // Call ended → apply the AI's edits, save the transcript, flash the changes.
  function endCall() {
    setCallOpen(false)
    setDays((prev) => {
      let next = prev
      for (const c of CALL_CHANGES) {
        next = next.map((day) => {
          if (c.patch) {
            return { ...day, stops: day.stops.map((s) => (s.id === c.stopId ? { ...s, ...c.patch, updated: true } : s)) }
          }
          if (day.stops.some((s) => s.id === c.stop.id)) return day // idempotent insert
          const at = day.stops.findIndex((s) => s.id === c.insertAfter)
          if (at === -1) return day
          const stops = [...day.stops]
          stops.splice(at + 1, 0, { ...c.stop, updated: true })
          return { ...day, stops }
        })
      }
      return next
    })
    setTranscript(CALL_TRANSCRIPT)
    setFlashing(true)
    setTimeout(() => document.getElementById('stop-s5')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350)
    setTimeout(() => setFlashing(false), 2800)
  }

  return (
    <Screen>
      {/* Header — back button, trip identity, price + book CTA */}
      <div className="trip-head trip-head--v2">
        <button className="appbar__back" style={{ marginLeft: -8, marginBottom: 4 }} onClick={() => navigate(-1)} aria-label="Back"><Icon name="back" /></button>
        <div className="trip-head__top">
          <h1 className="t-hd-large">{TRIP.title}</h1>
          <div className="t-p-small muted" style={{ marginTop: 2 }}>{TRIP.durationDays} days · {TRIP.dateRange}</div>
        </div>
        <div className="trip-head__book">
          <div>
            <div className="t-lb-sm muted">Total / person</div>
            <div className="t-hd-sm">{TRIP.price}</div>
          </div>
          <Button variant="dark" size="md" onClick={() => navigate('/checkout')}>Proceed to book</Button>
        </div>
      </div>

      {/* Itinerary editor */}
      <div className="screen-body pad" style={{ paddingTop: 16, paddingBottom: 110 }}>
        {days.map((day, di) => (
          <div key={day.label} style={{ marginTop: di ? 24 : 0 }}>
            <div className="day-label">{day.label} · {day.date}</div>
            <div className="col" style={{ marginTop: 10 }}>
              {day.stops.map((stop, si) => (
                <motion.div key={stop.id} layout transition={{ duration: 0.3 }}>
                  {stop.flight ? (
                    <div className="stop stop--flight" id={`stop-${stop.id}`} style={{ marginTop: si ? 8 : 0 }}>
                      <span className="stop__time"><Icon name="plane" size={18} /></span>
                      <div className="stop__body">
                        <div className="stop__name">{stop.name}</div>
                        <div className="t-lb-sm muted" style={{ marginTop: 3 }}>{stop.time} · {stop.sub}</div>
                        <button className="flightopt">{stop.option} <Icon name="arrowRight" size={13} /></button>
                      </div>
                    </div>
                  ) : (
                  <div className={`stop${stop.updated ? ' stop--edited' : ''}${stop.updated && flashing ? ' is-updated' : ''}`} id={`stop-${stop.id}`} style={{ marginTop: si ? 8 : 0 }}>
                    <span className="stop__time">{stop.time || '—'}</span>
                    <div className="stop__body">
                      <div className="stop__name">{stop.name}</div>
                      <div className="row" style={{ gap: 6, marginTop: 5 }}>
                        <CategoryPill category={stop.category} />
                        {stop.updated && <span className="badge badge--new">Updated by AI</span>}
                      </div>
                    </div>
                    <button className="stop__edit" aria-label={`Edit ${stop.name}`}><Icon name="pencil" size={16} /></button>
                  </div>
                  )}
                  {stop.transitAfter && (
                    <div className="transit">
                      <Icon name={stop.transitAfter.mode === 'walk' ? 'walk' : stop.transitAfter.mode === 'metro' ? 'metro' : 'car'} size={15} />
                      {stop.transitAfter.mode} · {stop.transitAfter.mins} min
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating call CTA */}
      {!sheetOpen && !callOpen && (
        <button className="fab fab--ext" onClick={() => setSheetOpen(true)}>
          <Icon name="phone" size={20} />
          Talk to our expert AI
        </button>
      )}

      <ExpertAISheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        transcript={transcript}
        onStartCall={startCall}
      />

      <ExpertAICall open={callOpen} onEnd={endCall} />
    </Screen>
  )
}

/* ── Bottom sheet — intro (first time) or compact + transcript ── */
function ExpertAISheet({ open, onClose, transcript, onStartCall }) {
  return (
    <Sheet open={open} onClose={onClose} height={transcript ? '78%' : '68%'}>
      {transcript ? (
        /* After a call — compact header, no blurb/stats */
        <div className="ai-intro ai-intro--compact">
          <span className="ai-orb ai-orb--sm"><Icon name="sparkle" size={20} /></span>
          <div style={{ minWidth: 0 }}>
            <div className="t-hd-sm">{EXPERT_AI.name}</div>
            <div className="t-lb-sm muted">{EXPERT_AI.tagline}</div>
          </div>
        </div>
      ) : (
        /* First time — full intro with the pitch */
        <>
          <div className="ai-intro">
            <span className="ai-orb ai-orb--sm"><Icon name="sparkle" size={24} /></span>
            <div>
              <div className="t-hd-med">{EXPERT_AI.name}</div>
              <div className="t-p-small muted">{EXPERT_AI.tagline}</div>
            </div>
          </div>

          <p className="t-p-small muted" style={{ marginTop: 12 }}>{EXPERT_AI.blurb}</p>

          <div className="ai-stats">
            {EXPERT_AI.stats.map((s) => (
              <div key={s.label} className="ai-stat">
                <div className="ai-stat__val">{s.value}</div>
                <div className="ai-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {transcript && (
        <>
          <div className="section-label" style={{ marginTop: 16, marginBottom: 8 }}>Last call · transcript</div>
          <div className="ai-transcript">
            {transcript.map((m, i) => (
              <div key={i} className="row" style={{ gap: 8, alignItems: 'flex-end', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                {m.from === 'ai' && <span className="ai-orb ai-orb--xs"><Icon name="sparkle" size={13} /></span>}
                <div className={`bubble bubble--${m.from === 'me' ? 'me' : 'them'}`}>{m.text}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="btn btn--primary btn--lg btn--full ai-callbtn" onClick={onStartCall}>
        <Icon name="phone" size={19} /> {transcript ? 'Talk to expert AI again' : 'Start the call'}
      </button>
    </Sheet>
  )
}

/* ── Full-screen call with the AI expert ──────────────────────── */
function ExpertAICall({ open, onEnd }) {
  const [phase, setPhase] = useState('ringing') // ringing → connected
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    if (!open) { setPhase('ringing'); setSecs(0); return }
    const t = setTimeout(() => setPhase('connected'), 2200)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open || phase !== 'connected') return
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [open, phase])

  if (!open) return null
  const mmss = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`

  return (
    <div className="call call--enter">
      <div className="call__top">
        <div className="call__avwrap">
          {phase === 'ringing' && <span className="call__pulse call__pulse--anim" />}
          <span className="call__aiorb"><Icon name="sparkle" size={46} /></span>
        </div>
        <div className="call__name">{EXPERT_AI.name}</div>
        <div className="call__status">{phase === 'ringing' ? 'Connecting…' : mmss}</div>
        <div className="call__sub">
          {phase === 'connected' ? 'On call · fine-tuning your itinerary' : EXPERT_AI.tagline}
        </div>

        {phase === 'connected' && (
          <div className="call__wave" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}
          </div>
        )}
      </div>

      <div className="call__controls">
        <button className="call__btn"><Icon name="mic" size={24} /></button>
        <button className="call__end" onClick={onEnd} aria-label="End call"><Icon name="phone" size={26} /></button>
        <button className="call__btn"><Icon name="speaker" size={24} /></button>
      </div>
    </div>
  )
}
