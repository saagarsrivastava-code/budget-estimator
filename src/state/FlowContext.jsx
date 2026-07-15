import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const FlowContext = createContext(null)

export function FlowProvider({ children }) {
  // Free-text ideas + which sources were attached on the ideas screen
  const [ideas, setIdeas] = useState('')
  const [sources, setSources] = useState([]) // keys from UPLOAD_TILES

  // Guided planning answers (matches the flow diagram)
  const [answers, setAnswers] = useState({
    location: null,     // destination key from DESTINATIONS
    cities: [],         // chosen city names (revealed after location)
    activities: [],     // activity types (revealed after cities)
    tripType: null,     // honeymoon / vacation / family / …
    people: 2,          // adults
    kids: 0,            // children (age 2–11)
    dayRange: null,     // '2–4 days' | '5–6 days' | '7–8 days'
    stays: [],          // stay types
    transport: null,    // 'Public' | 'Private'
    food: null,         // food preference
  })
  const setAnswer = useCallback((key, value) => setAnswers((a) => ({ ...a, [key]: value })), [])

  const toggleSource = useCallback((key) => {
    setSources((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }, [])

  const value = useMemo(
    () => ({
      ideas, setIdeas,
      sources, toggleSource,
      answers, setAnswer,
    }),
    [ideas, sources, toggleSource, answers, setAnswer],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
