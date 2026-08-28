import { useState } from 'react'
import { USER } from '../data/user'
import { PointsContext } from './PointsContext'

// Holds the resident's points balance and hands it to every screen inside it.
// Wrapped around the whole app in App.jsx.
//
// Like everything else in this prototype the number lives in React state only,
// so it resets to USER.points when the page is reloaded.

export default function PointsProvider({ children }) {
  const [points, setPoints] = useState(USER.points)

  // The only way points are ever added. Every screen calls this rather than
  // setting the number directly, so there is one place to look when someone
  // asks "where did those points come from?".
  function earnPoints(amount) {
    setPoints((current) => current + amount)
  }

  return (
    <PointsContext.Provider value={{ points, earnPoints }}>
      {children}
    </PointsContext.Provider>
  )
}
