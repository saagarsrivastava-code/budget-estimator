import { useNavigate } from 'react-router-dom'
import { Screen, Footer } from '../components/Chrome.jsx'
import { Button } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { useFlow } from '../state/FlowContext.jsx'
import { UPLOAD_TILES } from '../data/trip.js'

export default function Ideas() {
  const navigate = useNavigate()
  const { ideas, setIdeas, sources, toggleSource } = useFlow()

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <button className="appbar__back" onClick={() => navigate('/')} aria-label="Back"><Icon name="back" /></button>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 8, paddingBottom: 20 }}>
        <h1 className="t-hd-large">Enter your ideas and whatever you have planned till now</h1>

        <textarea
          className="textbox"
          style={{ marginTop: 16, minHeight: 110 }}
          placeholder="Where to, when, how long, where you're starting from… the more you say, the better…"
          value={ideas}
          onChange={(e) => setIdeas(e.target.value)}
        />

        <div className="tilegrid" style={{ marginTop: 14 }}>
          {UPLOAD_TILES.map((t) => {
            const on = sources.includes(t.key)
            return (
              <button key={t.key} className={`tile${on ? ' is-sel' : ''}`} onClick={() => toggleSource(t.key)}>
                <span className="tile__icn">{on ? <Icon name="check" size={18} /> : <Icon name={t.icon} size={20} />}</span>
                <span className="tile__label">{on ? 'added' : t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Footer>
        <Button full variant="dark" onClick={() => navigate('/questions')}>Next</Button>
      </Footer>
    </Screen>
  )
}
