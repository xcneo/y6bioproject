// Mock sharing-board listings around Clementi (everything except food —
// food lives in foodShelf.js because it carries expiry dates and photos).
//
// ⚠️ ALL INVENTED. The block numbers are real Clementi addresses, but no
// resident has actually offered any of this. Neighbour names are made up.
// Do not write in the report that these are real listings.
//
// Fields:
//   category    one of the keys in listingTypes.js
//   ownerId     a key from residents.js. Whether a listing is "yours" depends
//               on which phone you are looking at, so it is an id and not a
//               name — see the switcher in App.jsx.
//   walkMinutes rough walk from Blk 442 Clementi Ave 3. Both switchable
//               residents live within two blocks of each other, so these stay
//               about right on either phone. Do not read them as precise.
//   points      awarded when the exchange is completed — see listingTypes.js
//               for who earns them and why rent is 0
//   requests    how many neighbours asked BEFORE the demo started. A request
//               made during the demo is counted on top of this.
//   price       rent only, in SGD. Invented like the rest of the listing —
//               a plausible asking price, not a market rate we looked up.
//   handoverCode  the four digits the OTHER person reads out when you meet.
//               Only on listings where completing them pays someone points —
//               your own posts, and repair requests (the helper is credited
//               there, so the code belongs to whoever asked for the repair).
//               See src/lib/handover.js.

export const LISTINGS = [
  // ---- Henrison's and Mr Lim's own posts. Switch phones to see both sides. ----
  {
    id: 'bookshelf',
    category: 'giveaway',
    title: 'IKEA Billy bookshelf, white',
    detail:
      'Moving flats. Two shelves have water marks but it is solid. You collect — I can help carry it down.',
    ownerId: 'henrison',
    address: 'Blk 442 Clementi Ave 3',
    walkMinutes: 0,
    points: 25,
    requests: 3,
    handoverCode: '4821',
  },
  {
    id: 'steam-iron',
    category: 'lend',
    title: 'Steam iron',
    detail: 'Happy to lend for a day or two. Just knock, I am usually in after 7pm.',
    ownerId: 'henrison',
    address: 'Blk 442 Clementi Ave 3',
    walkMinutes: 0,
    points: 15,
    requests: 1,
    handoverCode: '7305',
  },

  // ---- Posted by neighbours who have no phone in this demo ----
  {
    id: 'drill',
    category: 'lend',
    title: 'Cordless drill and bit set',
    detail:
      'Bosch, battery still holds charge. Please return within three days — someone else usually wants it after.',
    ownerId: 'mrlim',
    address: 'Blk 440 Clementi Ave 3',
    walkMinutes: 2,
    points: 15,
    requests: 0,
  },
  {
    id: 'luggage',
    category: 'lend',
    title: '28-inch luggage',
    detail: 'For a trip. Wheels are fine, one zip pull is missing. Free to borrow up to two weeks.',
    ownerId: 'aisyah',
    address: 'Blk 445 Clementi Ave 3',
    walkMinutes: 3,
    points: 15,
    requests: 0,
  },
  {
    id: 'planters',
    category: 'giveaway',
    title: 'Box of plastic planters and trays',
    detail: 'About fifteen of them, various sizes. Cleared from my corridor. First to ask.',
    ownerId: 'weiling',
    address: 'Blk 352 Clementi Ave 2',
    walkMinutes: 7,
    points: 25,
    requests: 0,
  },
  {
    id: 'study-desk',
    category: 'giveaway',
    title: 'Study desk with drawer',
    detail:
      'Daughter finished her O levels. Sturdy, one scratch on top. Must go by the weekend or it goes to the bulky waste point.',
    ownerId: 'mdmchua',
    address: 'Blk 419 Clementi Ave 1',
    walkMinutes: 9,
    points: 25,
    requests: 0,
  },
  {
    id: 'textbooks',
    category: 'swap',
    title: 'Sec 3 textbooks — swap for Sec 4',
    detail:
      'Have E-Maths, Chemistry and Geography in good condition. Looking for the Sec 4 equivalents.',
    ownerId: 'danielng',
    address: 'Blk 301 Clementi Ave 4',
    walkMinutes: 6,
    points: 20,
    requests: 0,
  },
  {
    id: 'plant-cuttings',
    category: 'swap',
    title: 'Pothos cuttings — swap for herbs',
    detail: 'Rooted in water already. Would love a curry leaf or pandan cutting in return.',
    ownerId: 'priya',
    address: 'Blk 726 Clementi West St 2',
    walkMinutes: 11,
    points: 20,
    requests: 0,
  },
  {
    id: 'pressure-washer',
    category: 'rent',
    title: 'Pressure washer',
    detail: 'Good for corridor tiles and bicycles. Includes the hose. Deposit $30, returned to you.',
    ownerId: 'mrrahim',
    address: 'Blk 443 Clementi Ave 3',
    walkMinutes: 2,
    points: 0,
    price: 8,
    requests: 0,
  },
  {
    id: 'camping-tent',
    category: 'rent',
    title: 'Four-person camping tent',
    detail: 'Used twice at East Coast. Dry and clean, comes with pegs and a groundsheet.',
    ownerId: 'jasmine',
    address: 'Blk 311 Clementi Ave 4',
    walkMinutes: 8,
    points: 0,
    price: 12,
    requests: 0,
  },
  {
    id: 'rice-cooker',
    category: 'repair',
    title: 'Rice cooker will not heat up',
    detail:
      'Light comes on but stays warm, never cooks. Rather fix it than throw it. Can bring it to you.',
    ownerId: 'mdmchua',
    address: 'Blk 419 Clementi Ave 1',
    walkMinutes: 9,
    points: 40,
    requests: 0,
    handoverCode: '6142',
  },
  {
    id: 'bike-brakes',
    category: 'repair',
    title: 'Bicycle brakes rubbing',
    detail:
      'Rear brake drags and the pads look uneven. I have the tools, I just do not know what I am doing.',
    ownerId: 'xinyi',
    address: 'Blk 351 Clementi Ave 2',
    walkMinutes: 7,
    points: 40,
    requests: 0,
    handoverCode: '9370',
  },
  {
    id: 'school-shoes',
    category: 'repair',
    title: 'School shoes, sole coming off',
    detail: 'Only six months old. Someone said shoe glue would hold it — anyone done this before?',
    ownerId: 'nurul',
    address: 'Blk 448 Clementi Ave 3',
    walkMinutes: 4,
    points: 40,
    requests: 0,
    handoverCode: '2856',
  },
]
