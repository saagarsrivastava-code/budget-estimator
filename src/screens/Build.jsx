import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import {
  DESTINATIONS, CAT_ICON, fmtINR, estimateBudget,
  BUILD_FLIGHTS, BUILD_STAYS, BUILD_ACTIVITIES, BUILD_TRANSFERS, defaultBuildSelection,
} from '../data/trip.js'

/* Thumb with a category-coloured icon fallback if the image is missing. */
function Thumb({ image, category }) {
  const [broken, setBroken] = useState(!image)
  return (
    <span className="photo buildopt__thumb" style={{ '--cat': `var(--cat-${category || 'transport'})` }}>
      <span className="photo__icn"><Icon name={CAT_ICON[category] || 'pin'} size={18} /></span>
      {!broken && image && <img src={image} alt="" loading="lazy" onError={() => setBroken(true)} />}
    </span>
  )
}

function OptionRow({ opt, selected, multi, icon, onToggle }) {
  return (
    <button className={`buildopt${selected ? ' is-sel' : ''}`} onClick={onToggle}>
      {opt.image !== undefined || opt.category
        ? <Thumb image={opt.image} category={opt.category} />
        : <span className="buildopt__icn"><Icon name={icon} size={20} /></span>}
      <div className="buildopt__body">
        <div className="buildopt__name">
          {opt.name}
          {opt.tag && <span className="buildopt__tag">{opt.tag}</span>}
        </div>
        <div className="buildopt__meta">{opt.meta}</div>
      </div>
      <div className="buildopt__right">
        <div className="buildopt__price">{fmtINR(opt.price)}{opt.unit || ''}</div>
        <span className={`buildopt__sel buildopt__sel--${multi ? 'check' : 'radio'}${selected ? ' is-on' : ''}`}>
          {selected && <Icon name="check" size={13} />}
        </span>
      </div>
    </button>
  )
}

function Section({ title, hint, children }) {
  return (
    <div className="buildsec">
      <div className="buildsec__head">
        <h2 className="t-hd-sm">{title}</h2>
        <span className="t-lb-sm muted">{hint}</span>
      </div>
      <div className="stack-8">{children}</div>
    </div>
  )
}

export default function Build() {
  const navigate = useNavigate()
  const { answers } = useFlow()
  const dest = DESTINATIONS.find((d) => d.key === answers.location)
  const days = useMemo(() => estimateBudget(answers).days, [answers])
  const nights = Math.max(1, Math.round(days) - 1)

  const init = useMemo(() => defaultBuildSelection(answers), [answers])
  const [flight, setFlight] = useState(init.flight)
  const [stay, setStay] = useState(init.stay)
  const [activities, setActivities] = useState(init.activities)
  const [transfers, setTransfers] = useState(init.transfers)

  const toggle = (arr, set, id) => set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id])

  // Running per-person total from the current picks.
  const total = useMemo(() => {
    const f = BUILD_FLIGHTS.find((o) => o.id === flight)?.price || 0
    const s = (BUILD_STAYS.find((o) => o.id === stay)?.price || 0) * nights
    const a = BUILD_ACTIVITIES.filter((o) => activities.includes(o.id)).reduce((t, o) => t + o.price, 0)
    const tr = BUILD_TRANSFERS.filter((o) => transfers.includes(o.id))
      .reduce((t, o) => t + (o.unit === '/day' ? o.price * Math.round(days) : o.price), 0)
    return f + s + a + tr
  }, [flight, stay, activities, transfers, nights, days])

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/itineraries')} aria-label="Back"><Icon name="back" /></button>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <h1 className="t-hd-large">Plan your {dest?.label || 'trip'}</h1>
        <div className="t-p-small muted" style={{ marginTop: 4 }}>
          Pick what you like for each part — we'll build the itinerary around it.
        </div>

        <Section title="Flights" hint="Choose one">
          {BUILD_FLIGHTS.map((o) => (
            <OptionRow key={o.id} opt={o} icon="plane" selected={flight === o.id} onToggle={() => setFlight(o.id)} />
          ))}
        </Section>

        <Section title="Where you'll stay" hint="Choose one">
          {BUILD_STAYS.map((o) => (
            <OptionRow key={o.id} opt={o} selected={stay === o.id} onToggle={() => setStay(o.id)} />
          ))}
        </Section>

        <Section title="Activities & experiences" hint="Choose any">
          {BUILD_ACTIVITIES.map((o) => (
            <OptionRow key={o.id} opt={o} multi selected={activities.includes(o.id)} onToggle={() => toggle(activities, setActivities, o.id)} />
          ))}
        </Section>

        <Section title="Getting around" hint="Choose any">
          {BUILD_TRANSFERS.map((o) => (
            <OptionRow key={o.id} opt={o} multi icon="car" selected={transfers.includes(o.id)} onToggle={() => toggle(transfers, setTransfers, o.id)} />
          ))}
        </Section>
      </div>

      <Footer>
        <div className="buildbar">
          <div>
            <div className="t-lb-sm muted">Your picks · per person</div>
            <div className="t-hd-sm">≈ {fmtINR(total)}</div>
          </div>
          <Button variant="dark" size="md" onClick={() => navigate('/trip')}>View itinerary</Button>
        </div>
      </Footer>
    </Screen>
  )
}
