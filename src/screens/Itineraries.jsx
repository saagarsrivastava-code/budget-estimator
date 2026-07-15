import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/Chrome.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import {
  DESTINATIONS, estimateBudget, buildItineraryVariants, fmtINR,
} from '../data/trip.js'

// Hide a broken banner image so its accent-gradient background shows instead.
function hideImg(e) { e.currentTarget.style.display = 'none' }

export default function Itineraries() {
  const navigate = useNavigate()
  const { answers } = useFlow()

  const dest = DESTINATIONS.find((d) => d.key === answers.location)
  const budget = useMemo(() => estimateBudget(answers), [answers])
  const variants = useMemo(() => buildItineraryVariants(answers), [answers])
  const [picked, setPicked] = useState('popular')

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/questions')} aria-label="Back"><Icon name="back" /></button>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 8, paddingBottom: 28 }}>
        <h1 className="t-hd-large">
          Your {dest?.label || 'trip'} plan
        </h1>
        <div className="t-p-small muted" style={{ marginTop: 4 }}>
          {[
            answers.dayRange,
            `${answers.people} ${answers.people === 1 ? 'traveller' : 'travellers'}`,
            answers.tripType,
          ].filter(Boolean).join(' · ')}
        </div>

        {/* Budget estimate — kept simple */}
        <div className="budget rise">
          <div className="budget__label">Estimated budget</div>
          <div className="budget__range">{fmtINR(budget.low)} <span>–</span> {fmtINR(budget.high)}</div>
          <div className="budget__parts">
            {budget.parts.map((p) => (
              <div key={p.label} className="budget__part">
                <span className="t-p-small muted">{p.label}</span>
                <span className="t-p-small" style={{ fontWeight: 600 }}>{fmtINR(p.amount)}</span>
              </div>
            ))}
          </div>
          <div className="budget__note">
            <Icon name="sparkle" size={14} />
            A ballpark from your choices — the plans below fine-tune it.
          </div>
        </div>

        {/* Itinerary variants — each with imagery + its own edit CTA */}
        <div className="section-label" style={{ marginTop: 24 }}>Pick a starting plan</div>
        <div className="stack-12">
          {variants.map((v, i) => {
            const on = picked === v.key
            // Per-plan cost: relaxed trims paid activities, classics is the fullest.
            const cost = { popular: budget.high, offbeat: Math.round((budget.low + budget.high) / 2000) * 1000, relaxed: budget.low }[v.key] || budget.low
            const daysLabel = answers.dayRange || `${Math.round(budget.days)} days`
            return (
              <div
                key={v.key}
                className={`varcard rise${on ? ' is-sel' : ''}`}
                style={{ animationDelay: `${0.08 + i * 0.07}s` }}
                onClick={() => setPicked(v.key)}
                role="button"
                tabIndex={0}
              >
                <div className="varcard__banner" style={{ background: v.accent }}>
                  <img className="varcard__img" src={v.image} onError={hideImg} alt="" />
                  <span className="varcard__overlay" />
                  <span className="varcard__pace">{v.spots} · {v.pace} pace</span>
                  <div className="varcard__bannertext">
                    <div className="varcard__title">{v.title}</div>
                    <div className="varcard__tag">{v.tag}</div>
                  </div>
                </div>

                <div className="varcard__body">
                  <div className="varcard__price">
                    <span className="varcard__price-amt">{fmtINR(cost)}</span>
                    <span className="varcard__price-unit">/ person</span>
                    <span className="varcard__price-days"><Icon name="clock" size={13} />{daysLabel}</span>
                  </div>
                  <div className="varcard__cities"><Icon name="route" size={13} />{v.cityLine}</div>

                  <ul className="varcard__list">
                    {v.highlights.slice(0, 2).map((h) => (
                      <li key={h}><Icon name="check" size={12} />{h}</li>
                    ))}
                  </ul>

                  <button
                    className="varcard__edit"
                    onClick={(e) => { e.stopPropagation(); setPicked(v.key); navigate('/trip?tab=chat') }}
                  >
                    <Icon name="pencil" size={16} /> Edit itinerary
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Screen>
  )
}
