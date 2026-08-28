import { createContext, useContext } from 'react'

// Who you currently are, and what that person's points balance is.
//
// This used to be PointsContext and held one number. Once the prototype could
// be two people, the number stopped making sense on its own — "1,240 points"
// is only meaningful next to "for whom". So the two live together.
//
// SessionProvider.jsx holds the actual values.

export const SessionContext = createContext(null)

// Call this inside any component:
//   const { resident, points, earnPoints, switchTo } = useSession()
export function useSession() {
  const value = useContext(SessionContext)

  if (!value) {
    throw new Error('useSession() was called outside of <SessionProvider>')
  }

  return value
}
