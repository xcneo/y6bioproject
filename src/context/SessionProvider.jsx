import { useState } from 'react'
import { PEOPLE, PHONES } from '../data/residents'
import { EVENTS } from '../data/events'
import { SessionContext } from './SessionContext'

// Holds which phone you are looking at, and one points balance per resident.
//
// Balances are kept for both residents at once rather than resetting on each
// switch, which is the whole point: you can hand something over as one person,
// switch, and see the points land on the other side.

export default function SessionProvider({ children }) {
  const [residentId, setResidentId] = useState(PHONES[0])

  // { henrison: 1240, mrlim: 860 } — starting balances come from residents.js.
  const [balances, setBalances] = useState(() =>
    Object.fromEntries(PHONES.map((id) => [id, PEOPLE[id].points])),
  )

  const [eventStatuses, setEventStatuses] = useState({
    henrison: { 'canal-cleanup': 'attended', 'ewaste-jul': 'going' },
    mrlim: {},
  })

  // Credits whoever is named. Usually that is the current resident, but a
  // handover can credit the other side, so the caller says who.
  function earnPoints(amount, personId = residentId) {
    if (amount <= 0) return

    setBalances((current) => ({
      ...current,
      [personId]: (current[personId] ?? 0) + amount,
    }))
  }

  function updateEventStatus(eventId, status, personId = residentId) {
    setEventStatuses((current) => ({
      ...current,
      [personId]: { ...(current[personId] ?? {}), [eventId]: status },
    }))
  }

  const value = {
    residentId,
    resident: { id: residentId, ...PEOPLE[residentId] },
    points: balances[residentId],
    balances,
    events: EVENTS,
    eventStatuses: eventStatuses[residentId] ?? {},
    updateEventStatus,
    earnPoints,
    switchTo: setResidentId,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
