import { createContext, useContext } from 'react'

// The sharing board and the food shelf, plus who has claimed what.
//
// This used to live inside Share.jsx. It moved up here for two reasons:
//
// 1. Both phones need to see the same board. A request Henrison makes has to
//    show up as a request on Mr Lim's copy of his own listing.
// 2. Switching to the map screen and back used to unmount Share.jsx and wipe
//    everything. That was survivable when it was a one-person demo. It is not
//    survivable when someone asks "can you show me the map again?" halfway
//    through the handover.

export const SharingContext = createContext(null)

export function useSharing() {
  const value = useContext(SharingContext)

  if (!value) {
    throw new Error('useSharing() was called outside of <SharingProvider>')
  }

  return value
}
