import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/Chrome.jsx'
import { Button } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

// Preview of the results-page breakdown cards.
const PREVIEW_COSTS = [
  { icon: 'plane', label: 'Flights · return', sub: 'Return economy to Thailand', amount: '₹22,000' },
  { icon: 'home', label: 'Stays · 5 nights', sub: 'Beachfront resorts', amount: '₹35,000' },
  { icon: 'compass', label: 'Activities & entries', sub: 'The major things to do', amount: '₹13,750' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div className="screen-body pad" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}>
        <div style={{ paddingTop: 14 }} className="wordmark">
          <span className="wordmark__dot"><Icon name="compass" size={17} /></span>
          <span className="wordmark__name">scapia<span> trips</span></span>
        </div>

        {/* CSS entrances (staggered) — reliable, unlike framer mount animations. */}
        <div style={{ marginTop: 'auto', paddingTop: 32, textAlign: 'center' }}>
          <h1
            className="rise"
            style={{ font: '700 30px/1.25 var(--font-body)', letterSpacing: '-0.01em', animationDelay: '0.05s' }}
          >
            Know what your trip<br />
            will cost <span style={{ color: 'var(--brand-primary)' }}>before you book</span>
          </h1>
          <p
            className="t-p-med muted rise"
            style={{ marginTop: 12, maxWidth: 290, marginLeft: 'auto', marginRight: 'auto', animationDelay: '0.13s' }}
          >
            Answer a few quick questions and get a clear budget with ready-to-tweak itineraries.
          </p>
        </div>

        <div className="spacer" style={{ minHeight: 16 }} />

        {/* Hero — a preview of the results page: estimate card + breakdown cards */}
        <div className="lp-preview rise" style={{ animationDelay: '0.22s' }}>
          <div className="budget budget--main">
            <div className="budget__label">Estimated budget · per person</div>
            <div className="budget__range">₹83,000 <span>–</span> ₹1,07,000</div>
          </div>

          <div className="stack-8" style={{ marginTop: 12 }}>
            {PREVIEW_COSTS.map((c) => (
              <div key={c.label} className="costcard">
                <span className="costcard__icn"><Icon name={c.icon} size={20} /></span>
                <div className="costcard__main">
                  <span className="costcard__label">{c.label}</span>
                  <span className="costcard__sub">{c.sub}</span>
                </div>
                <span className="costcard__amt">{c.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="spacer" style={{ minHeight: 16 }} />

        <Button full onClick={() => navigate('/questions')}>Estimate my trip</Button>
        <div style={{ height: 8 }} />
      </div>
    </Screen>
  )
}
