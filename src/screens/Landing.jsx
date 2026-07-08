import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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

        <motion.div
          initial="hide" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
          style={{ marginTop: 'auto', paddingTop: 40, textAlign: 'center' }}
        >
          <motion.h1
            variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            style={{ font: '700 30px/1.25 var(--font-body)', letterSpacing: '-0.01em' }}
          >
            Started planning your trip<br />
            <span style={{ color: 'var(--brand-primary)' }}>and got stuck?</span>
          </motion.h1>
          <motion.p
            variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="t-p-med muted"
            style={{ marginTop: 12, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}
          >
            Our destination experts turn your ideas into a final plan.
          </motion.p>
        </motion.div>

        <div className="spacer" style={{ minHeight: 20 }} />

        {/* Hero — provided artwork: chat mockup over Linh's photo */}
        <motion.img
          src={`${import.meta.env.BASE_URL}front_page.png`}
          alt="Chat with Linh, your local destination expert"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
        />

        <div style={{ height: 24 }} />
        <Button full onClick={() => navigate('/ideas')}>Start planning</Button>
        <div style={{ height: 8 }} />
      </div>
    </Screen>
  )
}
