import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const FlowContext = createContext(null)

export function FlowProvider({ children }) {
  // Free-text ideas + which sources were attached on the ideas screen
  const [ideas, setIdeas] = useState('')
  const [sources, setSources] = useState([]) // keys from UPLOAD_TILES

  // Questionnaire answers (5 steps)
  const [answers, setAnswers] = useState({
    party: 'Partner',
    duration: '4–6 days',
    month: 'December',
    pace: 50,                              // 0 more free time … 100 packed
    vibes: ['Food & dining', 'Hidden gems'],
    budget: 'Mid-range',
    food: 'No preference',
    notes: '',
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
