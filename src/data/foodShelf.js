// The Expiring Soon Shelf — food neighbours are giving away before it goes off.
//
// ⚠️ ALL INVENTED, like the rest of the mock data.
//
// daysLeft is hand-written next to bestBefore rather than worked out from
// today's date, the same way events.js writes its dates out in full. Nothing in
// this prototype does date arithmetic. If you demo this well after Aug 2026,
// edit both fields so they still agree with each other.
//   daysLeft > 0   still good
//   daysLeft === 0 last day
//   daysLeft < 0   past its date
//
// photo is the anti-misuse rule the team designed. You cannot list food without
// showing something, and the app records which kind of proof was given:
//   'expiry'  a photo of the printed best-before date
//   'item'    no printed date available, so a photo of the food itself and
//             neighbours judge freshness for themselves
//
// tags feed the recipe suggestions in recipes.js, for food nobody claimed in time.
//
// ownerId is a key from residents.js, so whether an item is "yours" depends on
// which phone you are looking at.
//
// requests and handoverCode work exactly as they do in listings.js: somebody
// has to have asked for it, and they have to read you their four digits, before
// the points are yours.

export const FOOD_ITEMS = [
  // ---- Henrison's, already past its date and unclaimed: this triggers the recipes ----
  {
    id: 'carrots-celery',
    title: 'Half a bag of carrots and celery',
    detail: 'Bought for a soup I never made. Slightly bendy but fine once cooked.',
    quantity: 'About 6 carrots, 4 celery sticks',
    ownerId: 'henrison',
    address: 'Blk 442 Clementi Ave 3',
    walkMinutes: 0,
    bestBefore: 'Thu 27 Aug',
    daysLeft: -1,
    photo: 'item',
    tags: ['carrot', 'celery'],
    points: 30,
    requests: 0,
    handoverCode: '5514',
  },
  // ---- Henrison's, still claimable: switch to Mr Lim's phone and claim it ----
  {
    id: 'bananas',
    title: 'Five ripe bananas',
    detail: 'Very ripe — good for baking or a shake. Going soft fast in this weather.',
    quantity: '5 bananas',
    ownerId: 'henrison',
    address: 'Blk 442 Clementi Ave 3',
    walkMinutes: 0,
    bestBefore: 'Sat 29 Aug',
    daysLeft: 1,
    photo: 'item',
    tags: ['banana'],
    points: 30,
    requests: 2,
    handoverCode: '3948',
  },

  // ---- Neighbours ----
  {
    id: 'bread',
    title: 'Half a loaf of wholemeal bread',
    detail: 'Opened yesterday, kept sealed. Still soft.',
    quantity: 'About 8 slices',
    ownerId: 'kumar',
    address: 'Blk 445 Clementi Ave 3',
    walkMinutes: 3,
    bestBefore: 'Sat 29 Aug',
    daysLeft: 1,
    photo: 'expiry',
    tags: ['bread'],
    points: 30,
  },
  {
    id: 'milk',
    title: 'Unopened 1L fresh milk',
    detail: 'Bought two by mistake. Been in the fridge the whole time.',
    quantity: '1 litre',
    ownerId: 'aisyah',
    address: 'Blk 445 Clementi Ave 3',
    walkMinutes: 3,
    bestBefore: 'Sun 30 Aug',
    daysLeft: 2,
    photo: 'expiry',
    tags: ['milk'],
    points: 30,
  },
  {
    id: 'tomatoes',
    title: 'Box of cherry tomatoes',
    detail: 'From the community garden plot. More than we can eat.',
    quantity: 'About 300g',
    ownerId: 'nurul',
    address: 'Blk 448 Clementi Ave 3',
    walkMinutes: 4,
    bestBefore: 'Sun 30 Aug',
    daysLeft: 2,
    photo: 'item',
    tags: ['tomato'],
    points: 30,
  },
  {
    id: 'eggs',
    title: 'Six eggs',
    detail: 'Going away on Monday and they will not keep. Carton has the date on it.',
    quantity: '6 eggs',
    ownerId: 'weiling',
    address: 'Blk 352 Clementi Ave 2',
    walkMinutes: 7,
    bestBefore: 'Mon 31 Aug',
    daysLeft: 3,
    photo: 'expiry',
    tags: ['egg'],
    points: 30,
  },
]
