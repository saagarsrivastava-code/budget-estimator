import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button, Sheet } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import { DESTINATIONS, estimateBudget, fmtINR } from '../data/trip.js'

const LOAD_MSGS = ['Checking flights & stays', 'Pricing food & activities', 'Crunching your estimate']

export default function Itineraries() {
  const navigate = useNavigate()
  const { answers } = useFlow()

  const dest = DESTINATIONS.find((d) => d.key === answers.location)
  const budget = useMemo(() => estimateBudget(answers), [answers])
  const [why, setWhy] = useState(null) // budget part whose reason sheet is open

  // Brief "estimating…" loader before revealing the budget.
  const [ready, setReady] = useState(false)
  const [msg, setMsg] = useState(0)
  useEffect(() => {
    const done = setTimeout(() => setReady(true), 2200)
    const cycle = setInterval(() => setMsg((m) => Math.min(m + 1, LOAD_MSGS.length - 1)), 650)
    return () => { clearTimeout(done); clearInterval(cycle) }
  }, [])

  if (!ready) {
    return (
      <Screen>
        <div className="pad" style={{ paddingTop: 8 }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/questions')} aria-label="Back"><Icon name="back" /></button>
        </div>
        <div className="estimator-load">
          <div className="estimator-load__spin">
            <span className="estimator-load__ring" />
            <span className="estimator-load__orb"><Icon name="wallet" size={26} /></span>
          </div>
          <div className="t-hd-med" style={{ marginTop: 26 }}>Estimating your {dest?.label || 'trip'} budget</div>
          <div className="estimator-load__msg t-p-small muted" key={msg}>{LOAD_MSGS[msg]}…</div>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/questions')} aria-label="Back"><Icon name="back" /></button>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <h1 className="t-hd-large">
          Your {dest?.label || 'trip'} plan
        </h1>
        <div className="t-p-small muted" style={{ marginTop: 4 }}>
          {[
            answers.dayRange,
            answers.kids > 0
              ? `${answers.people} ${answers.people === 1 ? 'adult' : 'adults'} · ${answers.kids} ${answers.kids === 1 ? 'child' : 'children'}`
              : `${answers.people} ${answers.people === 1 ? 'traveller' : 'travellers'}`,
            answers.tripType,
          ].filter(Boolean).join(' · ')}
        </div>

        {/* Estimated budget — each line taps to reveal why it's priced that way */}
        <div className="budget rise">
          <div className="budget__label">Estimated budget · per person</div>
          <div className="budget__range">{fmtINR(budget.low)} <span>–</span> {fmtINR(budget.high)}</div>
          <div className="budget__parts">
            {budget.parts.map((p) => (
              <button key={p.label} className="budget__part budget__part--btn" onClick={() => setWhy(p)}>
                <span className="budget__partlabel">{p.label}<Icon name="info" size={14} /></span>
                <span className="t-p-small" style={{ fontWeight: 600 }}>{fmtINR(p.amount)}</span>
              </button>
            ))}
          </div>
          <div className="budget__note">
            <Icon name="sparkle" size={14} />
            A ballpark from your choices — tap any line to see how it's priced.
          </div>
        </div>
      </div>

      <Footer>
        <Button full variant="dark" onClick={() => navigate('/build')}>Start planning this trip</Button>
      </Footer>

      {/* Reason-behind-pricing bottom sheet */}
      <Sheet open={!!why} onClose={() => setWhy(null)} height="auto">
        {why && (
          <div className="whysheet">
            <div className="whysheet__head">
              <div>
                <div className="t-lb-sm muted">{why.label}</div>
                <div className="t-hd-med" style={{ marginTop: 2 }}>{fmtINR(why.amount)} <span className="t-p-small muted" style={{ fontWeight: 400 }}>/ person</span></div>
              </div>
              <span className="whysheet__icn"><Icon name="wallet" size={20} /></span>
            </div>
            <p className="t-p-med" style={{ marginTop: 14, color: 'var(--content-secondary)' }}>{why.why}</p>
          </div>
        )}
      </Sheet>
    </Screen>
  )
}
