import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Screen } from '../components/Chrome.jsx'
import { Button, CategoryPill, Sheet } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { EXPERT_AI, TRIP, CAT_ICON, EDIT_OPTIONS } from '../data/trip.js'

// Scripted edits the AI applies to the itinerary once a call ends.
const CALL_CHANGES = [
  { stopId: 's5', patch: { name: 'Freedom Beach (quiet cove)', category: 'nature', image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400&q=80&auto=format&fit=crop', desc: 'A quiet white-sand cove most tour groups skip.' } },
  { stopId: 's1', patch: { time: '08:30' } },
  { insertAfter: 's2', stop: { id: 's9', time: '20:00', name: 'Suay Restaurant', category: 'food', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80&auto=format&fit=crop', desc: 'Chef-led modern Thai loved by locals.' } },
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

/* ── Photo with a graceful category-coloured fallback ──────────── */
function Photo({ image, category, className = '', iconSize = 22 }) {
  const [broken, setBroken] = useState(!image)
  return (
    <span className={`photo ${className}`} style={{ '--cat': `var(--cat-${category || 'transport'})` }}>
      <span className="photo__icn"><Icon name={CAT_ICON[category] || 'pin'} size={iconSize} /></span>
      {!broken && image && (
        <img src={image} alt="" loading="lazy" onError={() => setBroken(true)} />
      )}
    </span>
  )
}

export default function Trip() {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [transcript, setTranscript] = useState(null) // set after first call
  const [days, setDays] = useState(TRIP.days)
  const [flashing, setFlashing] = useState(false)
  const [editingId, setEditingId] = useState(null) // id of the stop expanded for editing
  const [infoId, setInfoId] = useState(null) // id of the option whose full description is open
  const [viewAllStop, setViewAllStop] = useState(null) // stop whose full option list is open in a sheet

  // Collapsing / switching stops closes any open description.
  useEffect(() => { setInfoId(null) }, [editingId])

  function toggleEdit(stopId) {
    setEditingId((cur) => (cur === stopId ? null : stopId))
  }

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

  // Traveller picks a replacement from the rail → swap the stop, flash it.
  function replaceStop(stopId, option) {
    setEditingId(null)
    setDays((prev) => prev.map((day) => ({
      ...day,
      stops: day.stops.map((s) => (s.id === stopId
        ? { ...s, name: option.name, category: option.category, image: option.image, desc: option.short, updated: true }
        : s)),
    })))
    setFlashing(true)
    setTimeout(() => document.getElementById(`stop-${stopId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 320)
    setTimeout(() => setFlashing(false), 2800)
  }

  return (
    <Screen>
      {/* Header — back, trip identity, price + book CTA */}
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
              {day.stops.map((stop, si) => {
                const isEditing = editingId === stop.id
                const group = EDIT_OPTIONS[stop.category]
                return (
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
                  <div className={`stop stop--rich${stop.updated ? ' stop--edited' : ''}${stop.updated && flashing ? ' is-updated' : ''}${isEditing ? ' stop--editing' : ''}`} id={`stop-${stop.id}`} style={{ marginTop: si ? 8 : 0 }}>
                    <Photo image={stop.image} category={stop.category} className="stop__thumb" iconSize={22} />
                    <div className="stop__body">
                      <div className="stop__time-lbl">{stop.time || 'Flexible'}</div>
                      <div className="stop__name">{stop.name}</div>
                      {stop.desc && <div className="stop__desc">{stop.desc}</div>}
                      <div className="row" style={{ gap: 6, marginTop: 7 }}>
                        <CategoryPill category={stop.category} />
                        {stop.updated && <span className="badge badge--new">Updated</span>}
                      </div>
                    </div>
                    {group && (
                      <button
                        className={`stop__edit${isEditing ? ' is-on' : ''}`}
                        onClick={() => toggleEdit(stop.id)}
                        aria-label={isEditing ? `Close options for ${stop.name}` : `Replace ${stop.name}`}
                        aria-expanded={isEditing}
                      >
                        <Icon name={isEditing ? 'close' : 'pencil'} size={16} />
                      </button>
                    )}
                  </div>
                  )}

                  {/* Inline expanding editor — preference callout + horizontal option rail */}
                  <AnimatePresence initial={false}>
                    {isEditing && group && (
                      <motion.div
                        className="editpanel"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="editpanel__inner">
                          <PrefCallout prefs={group.prefs} />

                          <div className="optrail">
                            {group.options.map((opt, i) => (
                              <OptionCard
                                key={opt.id}
                                opt={opt}
                                isTop={i === 0}
                                infoOpen={infoId === opt.id}
                                onToggleInfo={() => setInfoId((cur) => (cur === opt.id ? null : opt.id))}
                                onChoose={() => replaceStop(stop.id, opt)}
                              />
                            ))}
                            <button
                              className="optrail__all"
                              onClick={() => setViewAllStop(stop)}
                              aria-label={`View all ${group.options.length} options for ${stop.name}`}
                            >
                              <span className="optrail__allicn"><Icon name="arrowRight" size={20} /></span>
                              <span>View all<br />{group.options.length} options</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {stop.transitAfter && (
                    <div className="transit">
                      <Icon name={stop.transitAfter.mode === 'walk' ? 'walk' : stop.transitAfter.mode === 'metro' ? 'metro' : 'car'} size={15} />
                      {stop.transitAfter.mode} · {stop.transitAfter.mins} min
                    </div>
                  )}
                </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating call CTA */}
      {!sheetOpen && !callOpen && !viewAllStop && (
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

      <AllOptionsSheet
        stop={viewAllStop}
        onClose={() => setViewAllStop(null)}
        onReplace={(opt) => { const s = viewAllStop; setViewAllStop(null); replaceStop(s.id, opt) }}
      />
    </Screen>
  )
}

/* ── Preference callout — states options come from stated prefs ── */
function PrefCallout({ prefs }) {
  return (
    <div className="pref-callout">
      <span className="pref-callout__icn"><Icon name="sparkle" size={16} /></span>
      <div style={{ minWidth: 0 }}>
        <div className="pref-callout__title">Suggested swaps · based on your preferences</div>
        <div className="pref-callout__chips">
          {prefs.map((p) => (
            <span key={p} className="pref-chip"><Icon name="check" size={11} />{p}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── "View all" sheet — the full option list, vertically ──────── */
function AllOptionsSheet({ stop, onClose, onReplace }) {
  const [infoId, setInfoId] = useState(null)
  const group = stop ? EDIT_OPTIONS[stop.category] : null

  useEffect(() => { setInfoId(null) }, [stop?.id])

  return (
    <Sheet open={!!stop && !!group} onClose={onClose} height="90%">
      {stop && group && (
        <>
          <div className="edit-head">
            <div className="t-lb-sm muted">All options for</div>
            <div className="t-hd-med">{stop.name}</div>
          </div>
          <PrefCallout prefs={group.prefs} />
          <div className="optlist">
            {group.options.map((opt, i) => (
              <OptionCard
                key={opt.id}
                opt={opt}
                isTop={i === 0}
                infoOpen={infoId === opt.id}
                onToggleInfo={() => setInfoId((cur) => (cur === opt.id ? null : opt.id))}
                onChoose={() => onReplace(opt)}
              />
            ))}
          </div>
        </>
      )}
    </Sheet>
  )
}

/* ── Single replacement option — photo card used in the rail ───── */
function OptionCard({ opt, isTop, infoOpen, onToggleInfo, onChoose }) {
  return (
    <div className={`optcard${infoOpen ? ' is-expanded' : ''}`}>
      <div className="optcard__banner">
        <Photo image={opt.image} category={opt.category} className="optcard__photo" iconSize={34} />
        {isTop && <span className="optcard__top">Top pick</span>}
        <span className="optcard__match"><Icon name="sparkle" size={11} />{opt.match}% match</span>
      </div>

      <div className="optcard__body">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div className="optcard__name">{opt.name}</div>
            <div className="t-lb-sm muted" style={{ marginTop: 2 }}>{opt.meta}</div>
          </div>
          <button
            className={`info-btn${infoOpen ? ' is-on' : ''}`}
            onClick={onToggleInfo}
            aria-label={infoOpen ? 'Hide details' : 'More details'}
            aria-expanded={infoOpen}
          >
            <Icon name="info" size={17} />
          </button>
        </div>

        <div className="optcard__short">{opt.short}</div>

        <AnimatePresence initial={false}>
          {infoOpen && (
            <motion.div
              className="optcard__long"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <p>{opt.long}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="optcard__tags">
          {opt.tags.map((t) => (
            <span key={t} className="matchtag"><Icon name="check" size={10} />{t}</span>
          ))}
        </div>

        <button className="btn btn--outline btn--md btn--full optcard__pick" onClick={onChoose}>
          Choose this
        </button>
      </div>
    </div>
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
