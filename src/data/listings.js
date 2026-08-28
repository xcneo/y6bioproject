// Mock sharing-board listings around Clementi (everything except food —
// food lives in foodShelf.js because it carries expiry dates and photos).
//
// ⚠️ ALL INVENTED. The block numbers are real Clementi addresses, but no
// resident has actually offered any of this. Neighbour names are made up.
// Do not write in the report that these are real listings.
//
// Fields:
//   category    one of the keys in listingTypes.js
//   owner       'You' for the demo resident's own posts, a neighbour otherwise
//   walkMinutes rough walk from Blk 442 Clementi Ave 3, same as facilities.js
//   points      awarded when the exchange is completed — see listingTypes.js
//               for who earns them and why rent is 0
//   requests    how many neighbours have already asked. Only shown on your own
//               posts, so you can see there is interest before you commit.
//   price       rent only, in SGD
//   handoverCode  the four digits the OTHER person reads out when you meet.
//               Only on listings where completing them pays someone points —
//               your own posts, and repair requests (the helper is credited
//               there, so the code belongs to whoever asked for the repair).
//               See src/lib/handover.js.

export const LISTINGS = [
  // ---- Your own posts, so the "hand it over and collect the points" step is demoable ----
  {
    id: 'bookshelf',
    category: 'giveaway',
    title: 'IKEA Billy bookshelf, white',
    detail:
      'Moving flats. Two shelves have water marks but it is solid. You collect — I can help carry it down.',
    owner: 'You',
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
    owner: 'You',
    address: 'Blk 442 Clementi Ave 3',
    walkMinutes: 0,
    points: 15,
    requests: 1,
    handoverCode: '7305',
  },

  // ---- Neighbours' posts ----
  {
    id: 'drill',
    category: 'lend',
    title: 'Cordless drill and bit set',
    detail:
      'Bosch, battery still holds charge. Please return within three days — someone else usually wants it after.',
    owner: 'Mr Lim',
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
    owner: 'Aisyah',
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
    owner: 'Wei Ling',
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
    owner: 'Mdm Chua',
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
    owner: 'Daniel Ng',
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
    owner: 'Priya',
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
    owner: 'Mr Rahim',
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
    owner: 'Jasmine Goh',
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
    owner: 'Mdm Chua',
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
    owner: 'Xin Yi',
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
    owner: 'Nurul',
    address: 'Blk 448 Clementi Ave 3',
    walkMinutes: 4,
    points: 40,
    requests: 0,
    handoverCode: '2856',
  },
]
