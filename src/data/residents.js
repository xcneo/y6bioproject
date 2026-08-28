// Everyone the app knows about.
//
// This replaces the old single USER. A sharing app has two sides to every
// exchange, so the prototype has to be able to be two different people —
// otherwise the handover code can never actually be demonstrated, only
// described.
//
// PHONES lists the residents you can switch between during a demo. The rest are
// scenery: names on listings, with no phone of their own to switch to. They are
// in the same map so that a listing only ever has to name one id, and the card
// does not need to care which kind of person it is looking at.

export const PEOPLE = {
  // ---- The two you can switch between ----
  henrison: {
    name: 'Henrison',
    block: 'Blk 442 Clementi Ave 3',
    estate: 'Clementi',
    points: 1240,
  },
  mrlim: {
    name: 'Mr Lim',
    block: 'Blk 440 Clementi Ave 3',
    estate: 'Clementi',
    points: 860,
  },

  // ---- Scenery. Names only. ----
  aisyah: { name: 'Aisyah', block: 'Blk 445 Clementi Ave 3' },
  kumar: { name: 'Kumar', block: 'Blk 445 Clementi Ave 3' },
  weiling: { name: 'Wei Ling', block: 'Blk 352 Clementi Ave 2' },
  mdmchua: { name: 'Mdm Chua', block: 'Blk 419 Clementi Ave 1' },
  danielng: { name: 'Daniel Ng', block: 'Blk 301 Clementi Ave 4' },
  priya: { name: 'Priya', block: 'Blk 726 Clementi West St 2' },
  mrrahim: { name: 'Mr Rahim', block: 'Blk 443 Clementi Ave 3' },
  jasmine: { name: 'Jasmine Goh', block: 'Blk 311 Clementi Ave 4' },
  xinyi: { name: 'Xin Yi', block: 'Blk 351 Clementi Ave 2' },
  nurul: { name: 'Nurul', block: 'Blk 448 Clementi Ave 3' },
}

// The demo switcher offers these two, in this order.
// They live two blocks apart on purpose, so both of them can plausibly walk to
// everything on the map.
export const PHONES = ['henrison', 'mrlim']

// walkMinutes in the mock data is measured from Blk 442, and a 0 means "the
// poster's own front door" — which is only zero minutes away if you are the
// poster. The two switchable residents live about two blocks apart, so that is
// what the other one sees instead.
export const MINUTES_BETWEEN_PHONES = 2

export function walkMinutesFor(item, viewerId) {
  if (item.ownerId === viewerId) return 0
  return item.walkMinutes === 0 ? MINUTES_BETWEEN_PHONES : item.walkMinutes
}
