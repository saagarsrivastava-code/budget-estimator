import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/Chrome.jsx'
import { Button } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=400&q=80&auto=format&fit=crop`

// Mini plan cards previewed under the budget widget.
const PREVIEW_CARDS = [
  { title: 'The Classics', sub: 'Popular · balanced', accent: 'var(--brand-primary)', img: IMG('1528181304800-259b08848526') },
  { title: 'Offbeat & Hidden', sub: 'Local gems', accent: 'var(--secondary-blue-500)', img: IMG('1507525428034-b723cf961d3e') },
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

        {/* Hero — a preview of what you get: a budget estimate + plan cards */}
        <div className="lp-preview rise" style={{ animationDelay: '0.22s' }}>
          <div className="lp-budget">
            <div className="lp-budget__label">Estimated budget</div>
            <div className="lp-budget__range">₹70,000 <span>–</span> ₹89,000</div>
            <div className="lp-budget__rows">
              <div><span>Flights · return</span><span>₹22,000</span></div>
              <div><span>Stays · 5 nights</span><span>₹22,500</span></div>
              <div><span>Activities & more</span><span>₹17,600</span></div>
            </div>
          </div>

          <div className="lp-cardrow">
            {PREVIEW_CARDS.map((c) => (
              <div key={c.title} className="lp-card">
                <div
                  className="lp-card__img"
                  style={{ backgroundColor: c.accent, backgroundImage: `url(${c.img})` }}
                >
                  <span className="lp-card__pill">{c.sub}</span>
                </div>
                <div className="lp-card__title">{c.title}</div>
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
