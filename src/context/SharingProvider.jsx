import { useState } from 'react'
import { LISTINGS } from '../data/listings'
import { FOOD_ITEMS } from '../data/foodShelf'
import { makeHandoverCode } from '../lib/handover'
import { pairKey } from '../lib/pairing'
import { SharingContext } from './SharingContext'

// Holds the board, the shelf, and one claim per item.
//
// A claim is the whole story of an exchange in one object:
//
//   claims[itemId] = {
//     by:             who asked for it
//     code:           the four digits THEY read out at the handover
//     step:           'requested' while it is arranged, 'done' once confirmed
//     creditedTo:     who the points went to, once done
//     creditedPoints: how many
//   }
//
// Keeping who-was-credited on the claim means both phones can show an honest
// version of the same finished exchange: "you earned 25 points" on one, and
// "Henrison earned 25 points" on the other.

// How many exchanges each pair has already completed, keyed by pairKey().
// Seeded with one between the two switchable residents so the taper is reachable
// in a demo without doing three handovers on stage first.
const SEEDED_PAIRS = {
  [pairKey('henrison', 'mrlim')]: 1,
}

export default function SharingProvider({ children }) {
  const [listings, setListings] = useState(LISTINGS)
  const [foodItems, setFoodItems] = useState(FOOD_ITEMS)
  const [claims, setClaims] = useState({})
  const [pairCounts, setPairCounts] = useState(SEEDED_PAIRS)

  // Asking for something promises nothing and pays nothing, so it is free to
  // cancel. The code is minted here, at the moment of asking, and belongs to
  // this one exchange — not to the person. A code overheard once is no use
  // anywhere else.
  function claimItem(itemId, byId) {
    setClaims((current) => ({
      ...current,
      [itemId]: { by: byId, code: makeHandoverCode(), step: 'requested' },
    }))
  }

  function cancelClaim(itemId) {
    setClaims((current) => {
      const next = { ...current }
      delete next[itemId]
      return next
    })
  }

  // Called once a handover code has been checked. Works whether or not there
  // was a live claim: an item can also be collected by one of the neighbours
  // who only exists as a name in the mock data.
  //
  // partnerId is the other person in the exchange, when the app knows who that
  // is. Recording the pair is what makes the taper in lib/pairing.js work.
  function settleClaim(itemId, creditedTo, creditedPoints, partnerId) {
    setClaims((current) => ({
      ...current,
      [itemId]: {
        ...(current[itemId] ?? {}),
        step: 'done',
        creditedTo,
        creditedPoints,
      },
    }))

    if (!partnerId) return

    setPairCounts((current) => {
      const key = pairKey(creditedTo, partnerId)
      return { ...current, [key]: (current[key] ?? 0) + 1 }
    })
  }

  function addListing(kind, item) {
    if (kind === 'food') {
      setFoodItems((current) => [item, ...current])
    } else {
      setListings((current) => [item, ...current])
    }
  }

  const value = {
    listings,
    foodItems,
    claims,
    pairCounts,
    claimItem,
    cancelClaim,
    settleClaim,
    addListing,
  }

  return <SharingContext.Provider value={value}>{children}</SharingContext.Provider>
}
