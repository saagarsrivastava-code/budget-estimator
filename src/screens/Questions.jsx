import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button, Stepper } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import { QUESTIONS_TOTAL, PARTY, DURATIONS, MONTHS, MONTH_FLEXIBLE, VIBES, VIBES_MAX, BUDGETS, FOOD_PREFS } from '../data/trip.js'

export default function Questions() {
  const navigate = useNavigate()
  const { answers, setAnswer } = useFlow()
  const [step, setStep] = useState(0)

  function back() { step === 0 ? navigate('/ideas') : setStep(step - 1) }
  function next() { step === QUESTIONS_TOTAL - 1 ? navigate('/planning') : setStep(step + 1) }

  const answered = [
    !!answers.party && !!answers.duration && !!answers.month,
    answers.vibes.length > 0 && !!answers.budget,
    !!answers.food, // notes are optional
  ][step]

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={back} aria-label="Back"><Icon name="back" /></button>
          <span className="t-p-small muted">{step + 1} of {QUESTIONS_TOTAL}</span>
          <span style={{ width: 30 }} />
        </div>
        <div style={{ marginTop: 12 }}><Stepper current={step + 1} total={QUESTIONS_TOTAL} /></div>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 22, paddingBottom: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
          >
            {step === 0 && <StepBasics answers={answers} setAnswer={setAnswer} />}
            {step === 1 && <StepPreferences answers={answers} setAnswer={setAnswer} />}
            {step === 2 && <StepFood answers={answers} setAnswer={setAnswer} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer>
        <Button full variant="dark" disabled={!answered} onClick={next}>
          {step === QUESTIONS_TOTAL - 1 ? 'Send to local expert' : 'Next'}
        </Button>
      </Footer>
    </Screen>
  )
}

function QSection({ title, hint, first, children }) {
  return (
    <div style={{ marginTop: first ? 0 : 28 }}>
      <h2 className="q-title q-title--sm">{title}</h2>
      {hint && <div className="t-p-small muted" style={{ marginTop: 3 }}>{hint}</div>}
      <div className="chips" style={{ marginTop: 12 }}>{children}</div>
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

/* 1 of 2 — the basics: who, how long, what month */
function StepBasics({ answers, setAnswer }) {
  return (
    <>
      <QSection title="Who are you going with?" first>
        {PARTY.map((p) => (
          <Pill key={p} on={answers.party === p} onClick={() => setAnswer('party', p)}>{p}</Pill>
        ))}
      </QSection>

      <QSection title="How long?">
        {DURATIONS.map((d) => (
          <Pill key={d} on={answers.duration === d} onClick={() => setAnswer('duration', d)}>{d}</Pill>
        ))}
      </QSection>

      <QSection title="What month?">
        {MONTHS.map((m) => (
          <Pill key={m} on={answers.month === m} onClick={() => setAnswer('month', m)}>
            {m === MONTH_FLEXIBLE ? m : m.slice(0, 3)}
          </Pill>
        ))}
      </QSection>
    </>
  )
}

/* 2 of 2 — preferences: pace, vibes, budget, notes */
function StepPreferences({ answers, setAnswer }) {
  const { pace, vibes, budget } = answers

  function toggleVibe(v) {
    if (vibes.includes(v)) setAnswer('vibes', vibes.filter((x) => x !== v))
    else if (vibes.length < VIBES_MAX) setAnswer('vibes', [...vibes, v])
  }

  return (
    <>
      <h2 className="q-title q-title--sm">How much free time do you want on your trip?</h2>
      <div className="row" style={{ justifyContent: 'space-between', marginTop: 14, alignItems: 'flex-start', gap: 16 }}>
        <div className="pace-end">
          <span className={`pace-icn${pace <= 35 ? ' is-on' : ''}`}><Icon name="sun" size={19} /></span>
          <div className="t-lb-sm" style={{ marginTop: 6 }}><b>I want more free time</b></div>
        </div>
        <div className="pace-end" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
          <span className={`pace-icn${pace >= 65 ? ' is-on' : ''}`}><Icon name="bolt" size={19} /></span>
          <div className="t-lb-sm" style={{ marginTop: 6 }}><b>I want more activities</b></div>
        </div>
      </div>
      <div className="slider-wrap" style={{ marginTop: 18 }}>
        <div className="slider-track">
          <div className="slider-fill" style={{ width: `${pace}%` }} />
          <div className="slider-knob" style={{ left: `${pace}%` }} />
          <input
            className="slider-input" type="range" min="0" max="100" step="5"
            value={pace} onChange={(e) => setAnswer('pace', Number(e.target.value))}
            aria-label="Travel pace"
          />
        </div>
      </div>

      <QSection title="What's this trip about?" hint={`Pick up to ${VIBES_MAX}`}>
        {VIBES.map((v) => (
          <Pill
            key={v} on={vibes.includes(v)}
            disabled={!vibes.includes(v) && vibes.length >= VIBES_MAX}
            onClick={() => toggleVibe(v)}
          >
            {v}
          </Pill>
        ))}
      </QSection>

      <QSection title="Total budget" hint="Per person">
        {BUDGETS.map((b) => (
          <Pill key={b.key} on={budget === b.key} onClick={() => setAnswer('budget', b.key)}>
            {b.label} · {b.short}
          </Pill>
        ))}
      </QSection>
    </>
  )
}

/* 3 of 3 — food preference + anything else */
function StepFood({ answers, setAnswer }) {
  return (
    <>
      <QSection title="What's your food preference?" first>
        {FOOD_PREFS.map((f) => (
          <Pill key={f} on={answers.food === f} onClick={() => setAnswer('food', f)}>{f}</Pill>
        ))}
      </QSection>

      <div style={{ marginTop: 28 }}>
        <h2 className="q-title q-title--sm">Anything else?</h2>
        <textarea
          className="textbox"
          style={{ marginTop: 12, minHeight: 90 }}
          placeholder="Optional — allergies, must-visits, anything we missed…"
          value={answers.notes}
          onChange={(e) => setAnswer('notes', e.target.value)}
        />
      </div>
    </>
  )
}
