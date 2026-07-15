import { Routes, Route, useLocation } from 'react-router-dom'

import Landing from './screens/Landing.jsx'
import Questions from './screens/Questions.jsx'
import Itineraries from './screens/Itineraries.jsx'
import Trip from './screens/Trip.jsx'
import Checkout from './screens/Checkout.jsx'

export default function App() {
  const location = useLocation()

  // No AnimatePresence at the route level — each Screen animates in on mount
  // (reliable), and the old route unmounts instantly on navigation. This
  // avoids the framer enter/exit coordination stalls seen with mode="wait".
  return (
    <div className="app">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  )
}
