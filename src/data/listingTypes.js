// The six things a resident can post on the sharing board.
//
// Same note as facilityTypes.js: the Tailwind class names are written out in
// full on purpose. Tailwind scans this file for whole class names, so building
// them by joining strings would silently lose the styles.
//
// Who earns the points differs by category, and that is deliberate:
//
//   lend / giveaway / swap / food  the person who POSTED it earns the points,
//                                  once the item is actually handed over.
//   repair                         the neighbour who OFFERS HELP earns them,
//                                  once the repair is done. The person with the
//                                  broken kettle isn't the one doing the good deed.
//   rent                           nobody earns points. Money already changes
//                                  hands, so points on top would pay twice, and
//                                  would reward listing things at a price over
//                                  simply lending them for free.

export const LISTING_TYPES = {
  lend: {
    label: 'Borrow',
    icon: '🔧',
    chipOn: 'bg-sky-600 text-white border-sky-600',
    badge: 'bg-sky-100 text-sky-800',
    action: 'Ask to borrow',
    defaultPoints: 15,
  },
  giveaway: {
    label: 'Free',
    icon: '🎁',
    chipOn: 'bg-emerald-600 text-white border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800',
    action: 'Claim it',
    defaultPoints: 25,
  },
  swap: {
    label: 'Swap',
    icon: '🔄',
    chipOn: 'bg-violet-600 text-white border-violet-600',
    badge: 'bg-violet-100 text-violet-800',
    action: 'Offer a swap',
    defaultPoints: 20,
  },
  rent: {
    label: 'Rent',
    icon: '💵',
    chipOn: 'bg-amber-600 text-white border-amber-600',
    badge: 'bg-amber-100 text-amber-900',
    action: 'Request to rent',
    defaultPoints: 0,
  },
  repair: {
    label: 'Repair',
    icon: '🛠️',
    chipOn: 'bg-rose-600 text-white border-rose-600',
    badge: 'bg-rose-100 text-rose-800',
    action: 'Offer to help',
    defaultPoints: 40,
  },
  food: {
    label: 'Food',
    icon: '🥕',
    chipOn: 'bg-orange-600 text-white border-orange-600',
    badge: 'bg-orange-100 text-orange-900',
    action: 'Claim it',
    defaultPoints: 30,
  },
}

// The rule above, written once so the card and the screen can never disagree
// about who gets paid. isOwner means "the person completing this is the one who
// posted it".
// points defaults to the listing's own figure, but the caller can pass a
// reduced one — see the repeat-exchange taper in src/lib/pairing.js.
export function pointsForCompleting(listing, isOwner, points = listing.points) {
  if (listing.category === 'repair') {
    // The neighbour who turned up with a screwdriver earns them, not the person
    // whose kettle was broken.
    return isOwner ? 0 : points
  }

  return isOwner ? points : 0
}

// Food is posted through the same form but shows up in the Expiring Soon Shelf
// at the top of the screen instead of in the main board, so it is left out of
// the board's filter chips.
export const BOARD_CATEGORIES = ['lend', 'giveaway', 'swap', 'rent', 'repair']

// Order used by the "what are you posting?" picker in the new-listing form.
export const POSTABLE_CATEGORIES = [...BOARD_CATEGORIES, 'food']
