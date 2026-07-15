import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button, Stepper } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import {
  DESTINATIONS, ACTIVITIES, TRIP_TYPES, DAY_RANGES,
  STAY_TYPES, TRANSPORT_MODES, FOOD_PREFS,
} from '../data/trip.js'

const STEPS = 3

export default function Questions() {
  const navigate = useNavigate()
  const { answers, setAnswer } = useFlow()
  const [step, setStep] = useState(0)

  function back() { step === 0 ? navigate('/') : setStep(step - 1) }
  function next() { step === STEPS - 1 ? navigate('/itineraries') : setStep(step + 1) }

  const complete = [
    // 1 · destination → cities → activities
    !!answers.location && answers.cities.length > 0 && answers.activities.length > 0,
    // 2 · trip type, people, days
    !!answers.tripType && answers.people > 0 && !!answers.dayRange,
    // 3 · stays, transport, food
    answers.stays.length > 0 && !!answers.transport && !!answers.food,
  ][step]

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={back} aria-label="Back"><Icon name="back" /></button>
          <span className="t-p-small muted">{step + 1} of {STEPS}</span>
          <span style={{ width: 30 }} />
        </div>
        <div style={{ marginTop: 12 }}><Stepper current={step + 1} total={STEPS} /></div>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 24, paddingBottom: 20 }}>
        {/* Keyed div remounts on step change → CSS entrance re-runs. CSS (not
            framer) because framer mount animations stall in this preview env. */}
        <div key={step} className="rise-x">
          {step === 0 && <StepDestination answers={answers} setAnswer={setAnswer} />}
          {step === 1 && <StepBasics answers={answers} setAnswer={setAnswer} />}
          {step === 2 && <StepPreferences answers={answers} setAnswer={setAnswer} />}
        </div>
      </div>

      <Footer>
        <Button full variant="dark" disabled={!complete} onClick={next}>
          {step === STEPS - 1 ? 'See itineraries' : 'Next'}
        </Button>
      </Footer>
    </Screen>
  )
}

/* ── shared bits ──────────────────────────────────────────────── */
function QSection({ title, hint, first, children }) {
  return (
    <div style={{ marginTop: first ? 0 : 30 }}>
      <h2 className="q-title q-title--sm">{title}</h2>
      {hint && <div className="t-p-small muted" style={{ marginTop: 3 }}>{hint}</div>}
      <div className="chips" style={{ marginTop: 14 }}>{children}</div>
    </div>
  )
}

function Pill({ on, disabled, onClick, children }) {
  return (
    <button className={`chip${on ? ' is-sel' : ''}${disabled ? ' is-disabled' : ''}`} onClick={onClick}>
      {children}{on ? ' ✓' : ''}
    </button>
  )
}

// Reveal wrapper for the progressive sub-questions — fades and slides in via
// CSS (reliable, unlike framer's mount animation which stalls here).
function Reveal({ show, children }) {
  if (!show) return null
  return <div className="rise">{children}</div>
}

/* ── Step 1 · Destination → cities → activities ───────────────── */
function StepDestination({ answers, setAnswer }) {
  const dest = DESTINATIONS.find((d) => d.key === answers.location)

  function pickLocation(key) {
    if (key === answers.location) return
    setAnswer('location', key)
    setAnswer('cities', [])       // reset the dependent answers
    setAnswer('activities', [])
  }
  function toggleCity(c) {
    const on = answers.cities.includes(c)
    setAnswer('cities', on ? answers.cities.filter((x) => x !== c) : [...answers.cities, c])
  }
  function toggleActivity(a) {
    const on = answers.activities.includes(a)
    setAnswer('activities', on ? answers.activities.filter((x) => x !== a) : [...answers.activities, a])
  }

  return (
    <>
      <h1 className="q-title">Where do you want to go?</h1>
      <div className="t-p-small muted" style={{ marginTop: 4 }}>Popular right now</div>

      <div className="chips" style={{ marginTop: 14 }}>
        {DESTINATIONS.map((d) => (
          <Pill key={d.key} on={answers.location === d.key} onClick={() => pickLocation(d.key)}>
            <span style={{ marginRight: 5 }}>{d.flag}</span>{d.label}
          </Pill>
        ))}
      </div>

      <Reveal show={!!dest}>
        <QSection title={`Which cities in ${dest?.label}?`} hint="Pick the ones you want to cover">
          {dest?.cities.map((c) => (
            <Pill key={c} on={answers.cities.includes(c)} onClick={() => toggleCity(c)}>{c}</Pill>
          ))}
        </QSection>
      </Reveal>

      <Reveal show={answers.cities.length > 0}>
        <QSection title="What do you want to do?" hint="Pick everything that sounds good">
          {ACTIVITIES.map((a) => (
            <Pill key={a} on={answers.activities.includes(a)} onClick={() => toggleActivity(a)}>{a}</Pill>
          ))}
        </QSection>
      </Reveal>
    </>
  )
}

/* ── Step 2 · Trip type, people, days ─────────────────────────── */
function CounterRow({ label, hint, value, onChange, min }) {
  return (
    <div className="counter-row">
      <div>
        <div className="t-shd-sm" style={{ fontWeight: 600 }}>{label}</div>
        <div className="t-lb-sm muted">{hint}</div>
      </div>
      <div className="stepnum">
        <button className="stepnum__btn" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label}`}>
          <Icon name="minus" size={18} />
        </button>
        <span className="stepnum__val">{value}</span>
        <button className="stepnum__btn" onClick={() => onChange(value + 1)} aria-label={`More ${label}`}>
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  )
}

function StepBasics({ answers, setAnswer }) {
  const setPeople = (n) => setAnswer('people', Math.max(1, Math.min(20, n)))
  const setKids = (n) => setAnswer('kids', Math.max(0, Math.min(20, n)))

  return (
    <>
      <h1 className="q-title">What kind of trip is this?</h1>
      <div className="opt-grid" style={{ marginTop: 16 }}>
        {TRIP_TYPES.map((t) => (
          <button
            key={t.key}
            className={`opt${answers.tripType === t.key ? ' is-sel' : ''}`}
            onClick={() => setAnswer('tripType', t.key)}
          >
            <span className="opt__icn"><Icon name={t.icon} size={20} /></span>
            <span className="opt__label">{t.label}</span>
          </button>
        ))}
      </div>

      <QSection title="Who's travelling?" first={false}>
        <div className="counter-group">
          <CounterRow label="Adults" hint="Age 12+" value={answers.people} min={1} onChange={setPeople} />
          <CounterRow label="Children" hint="Age 2–11" value={answers.kids} min={0} onChange={setKids} />
        </div>
      </QSection>

      <QSection title="How many days?">
        {DAY_RANGES.map((d) => (
          <Pill key={d} on={answers.dayRange === d} onClick={() => setAnswer('dayRange', d)}>{d}</Pill>
        ))}
      </QSection>
    </>
  )
}

/* ── Step 3 · Stays, transport, food ──────────────────────────── */
function StepPreferences({ answers, setAnswer }) {
  function toggleStay(s) {
    const on = answers.stays.includes(s)
    setAnswer('stays', on ? answers.stays.filter((x) => x !== s) : [...answers.stays, s])
  }

  return (
    <>
      <h1 className="q-title">Where do you want to stay?</h1>
      <div className="t-p-small muted" style={{ marginTop: 4 }}>Pick any that fit</div>
      <div className="chips" style={{ marginTop: 14 }}>
        {STAY_TYPES.map((s) => (
          <Pill key={s} on={answers.stays.includes(s)} onClick={() => toggleStay(s)}>{s}</Pill>
        ))}
      </div>

      <QSection title="How do you want to get around?">
        <div className="opt-grid" style={{ width: '100%' }}>
          {TRANSPORT_MODES.map((m) => (
            <button
              key={m.key}
              className={`opt opt--tall${answers.transport === m.key ? ' is-sel' : ''}`}
              onClick={() => setAnswer('transport', m.key)}
            >
              <span className="opt__icn"><Icon name={m.icon} size={20} /></span>
              <span className="opt__label" style={{ fontWeight: 600 }}>{m.label}</span>
              <span className="t-lb-sm muted">{m.sub}</span>
            </button>
          ))}
        </div>
      </QSection>

      <QSection title="Any food preference?">
        {FOOD_PREFS.map((f) => (
          <Pill key={f} on={answers.food === f} onClick={() => setAnswer('food', f)}>{f}</Pill>
        ))}
      </QSection>
    </>
  )
}
