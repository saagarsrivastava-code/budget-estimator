import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/Chrome.jsx'
import { Button } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div className="screen-body pad" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}>
        <div style={{ paddingTop: 14 }} className="wordmark">
          <span className="wordmark__dot"><Icon name="compass" size={17} /></span>
          <span className="wordmark__name">scapia<span> trips</span></span>
        </div>

        {/* CSS entrances (staggered via animation-delay) — reliable, unlike
            framer's mount animations which stall in this preview env. */}
        <div style={{ marginTop: 'auto', paddingTop: 40, textAlign: 'center' }}>
          <h1
            className="rise"
            style={{ font: '700 30px/1.25 var(--font-body)', letterSpacing: '-0.01em', animationDelay: '0.05s' }}
          >
            Started planning your trip<br />
            <span style={{ color: 'var(--brand-primary)' }}>and got stuck?</span>
          </h1>
          <p
            className="t-p-med muted rise"
            style={{ marginTop: 12, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto', animationDelay: '0.13s' }}
          >
            Our destination experts turn your ideas into a final plan.
          </p>
        </div>

        <div className="spacer" style={{ minHeight: 20 }} />

        {/* Hero — provided artwork: chat mockup over Linh's photo */}
        <img
          className="rise"
          src={`${import.meta.env.BASE_URL}front_page.png`}
          alt="Chat with Linh, your local destination expert"
          style={{ width: '100%', height: 'auto', display: 'block', animationDelay: '0.22s' }}
        />

        <div style={{ height: 24 }} />
        <Button full onClick={() => navigate('/questions')}>Start planning</Button>
        <div style={{ height: 8 }} />
      </div>
    </Screen>
  )
}
