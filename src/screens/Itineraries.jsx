import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button, Sheet } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import { DESTINATIONS, estimateBudget, fmtINR } from '../data/trip.js'

const LOAD_MSGS = ['Checking flights & stays', 'Pricing food & activities', 'Crunching your estimate']
const shortINR = (n) => `₹${Math.round(n / 1000)}k`

export default function Itineraries() {
  const navigate = useNavigate()
  const { answers } = useFlow()

  const dest = DESTINATIONS.find((d) => d.key === answers.location)
  const budget = useMemo(() => estimateBudget(answers), [answers])
  const [why, setWhy] = useState(null) // budget part whose reason sheet is open

  // Chips summarising the choices this estimate is built from.
  const chips = [
    answers.cities?.length && { icon: 'pin', text: answers.cities.join(' · ') },
    ...(answers.activities || []).map((a) => ({ text: a })),
    ...(answers.stays || []).map((s) => ({ icon: 'home', text: s })),
    answers.transport && { icon: answers.transport === 'Private' ? 'car' : 'metro', text: `${answers.transport} transport` },
    answers.food && answers.food !== 'No preference' && { text: answers.food },
  ].filter(Boolean)

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

        {/* Main card — the overall estimate + the choices it's built from */}
        <div className="budget budget--main rise">
          <div className="budget__label">Estimated budget · per person</div>
          <div className="budget__range">{fmtINR(budget.low)} <span>–</span> {fmtINR(budget.high)}</div>
          {chips.length > 0 && (
            <div className="budget__chips">
              {chips.map((c, i) => (
                <span key={i} className="budget__chip">
                  {c.icon && <Icon name={c.icon} size={12} />}{c.text}
                </span>
              ))}
            </div>
          )}
          <div className="budget__note">
            <Icon name="sparkle" size={14} />
            Built from your choices — tap any card to see how it's priced.
          </div>
        </div>

        {/* Each line item as its own card */}
        <div className="section-label" style={{ marginTop: 22 }}>The breakdown</div>
        <div className="stack-10">
          {budget.parts.map((p, i) => (
            <button
              key={p.label}
              className="costcard rise"
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              onClick={() => setWhy(p)}
            >
              <div className="costcard__main">
                <span className="costcard__label">{p.label}<Icon name="info" size={15} /></span>
                {p.sub && <span className="costcard__sub">{p.sub}</span>}
              </div>
              <span className="costcard__amt">{fmtINR(p.amount)}</span>
            </button>
          ))}
        </div>
      </div>

      <Footer>
        <Button full variant="dark" onClick={() => navigate('/build')}>Start planning this trip</Button>
      </Footer>

      {/* Reason-behind-pricing bottom sheet — richer per component */}
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

            {/* Flights → price trend chart */}
            {why.detail?.trend && (
              <>
                <div className="whysheet__subhead">Price trend · by booking window</div>
                <div className="trend">
                  {why.detail.trend.map((t) => {
                    const max = Math.max(...why.detail.trend.map((x) => x.value))
                    const isNow = t.value === why.amount
                    return (
                      <div key={t.label} className={`trend__col${isNow ? ' is-now' : ''}`}>
                        <div className="trend__val">{shortINR(t.value)}</div>
                        <div className="trend__track">
                          <div className="trend__bar" style={{ height: `${Math.round((t.value / max) * 100)}%` }} />
                        </div>
                        <div className="trend__lbl">{t.label}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="trend__note"><Icon name="sparkle" size={13} />{why.detail.note}</div>
              </>
            )}

            {/* Others → bullet breakdown */}
            {why.detail?.bullets && (
              <ul className="whylist">
                {why.detail.bullets.map((b) => (
                  <li key={b}><Icon name="check" size={13} />{b}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Sheet>
    </Screen>
  )
}
