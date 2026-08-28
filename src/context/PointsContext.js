import { createContext, useContext } from 'react'

// One points balance, shared by every screen.
//
// Until now the points number lived inside Dashboard.jsx. That worked while only
// the dashboard could change it, but the Share screen awards points too, and two
// separate useState numbers would drift apart — you'd give food away on one tab
// and the other tab would still show the old total.
//
// A "context" is React's way of putting one value somewhere every screen can
// reach without passing it down through every component in between.
// PointsProvider.jsx holds the actual number; this file is just the plug socket
// and the helper for plugging into it.

export const PointsContext = createContext(null)

// Call this inside any component to read the points and award more:
//   const { points, earnPoints } = usePoints()
export function usePoints() {
  const value = useContext(PointsContext)

  if (!value) {
    throw new Error('usePoints() was called outside of <PointsProvider>')
  }

  return value
}
