// Mock recycling drives and sustainability events in Clementi.
//
// ⚠️ ALL INVENTED, like the rest of the mock data. No drive, workshop or
//    workday below has been organised, and no venue has agreed to host one.
//    The LOCATIONS are real Clementi addresses — Blk 442's void deck, the
//    Community Centre, Clementi Mall — which is the combination to be careful
//    with: never let the report imply an event is actually scheduled at a real
//    place. Same warning as facilities.js and residents.js carry.
//
// Dates are written out so they read clearly in a demo — nothing here works out
// "days from today".
//
// hasHappened marks events already in the past. Points are only credited once
// attendance at a past event is confirmed, so the past events are what make the
// points system visible in the app.

export const EVENTS = [
  // ---- Upcoming ----
  {
    id: 'ewaste-aug',
    title: 'E-waste collection drive',
    date: 'Sat 22 Aug, 9am – 1pm',
    location: 'Blk 442 Clementi Ave 3, void deck',
    blurb: 'Bring old phones, cables, batteries and small appliances.',
    pointsForAttending: 50,
    needsVolunteers: true,
    hasHappened: false,
  },
  {
    id: 'garden-workday',
    title: 'Community garden work morning',
    date: 'Sun 23 Aug, 8am – 10am',
    location: 'Blk 352 Clementi Ave 2',
    blurb: 'Weeding, composting and replanting. Tools provided.',
    pointsForAttending: 40,
    needsVolunteers: true,
    hasHappened: false,
  },
  {
    id: 'repair-cafe',
    title: 'Repair Café',
    date: 'Sat 29 Aug, 2pm – 5pm',
    location: 'Clementi Community Centre, 220 Clementi Ave 4',
    blurb: 'Volunteers help fix fans, kettles, lamps and clothing.',
    pointsForAttending: 30,
    needsVolunteers: false,
    hasHappened: false,
  },
  {
    id: 'bloobox-signup',
    title: 'Bloobox sign-up booth',
    date: 'Sun 30 Aug, 10am – 4pm',
    location: 'Clementi Mall, level 1 atrium',
    blurb: 'Collect a free Bloobox and learn what can go in it.',
    pointsForAttending: 20,
    needsVolunteers: false,
    hasHappened: false,
  },

  // ---- Already happened ----
  {
    id: 'ewaste-jul',
    title: 'E-waste collection drive',
    date: 'Sat 26 Jul, 9am – 1pm',
    location: 'Blk 442 Clementi Ave 3, void deck',
    blurb: 'Bring old phones, cables, batteries and small appliances.',
    pointsForAttending: 50,
    needsVolunteers: true,
    hasHappened: true,
  },
  {
    id: 'canal-cleanup',
    title: 'Sungei Ulu Pandan clean-up',
    date: 'Sat 2 Aug, 8am – 11am',
    location: 'Ulu Pandan Park Connector, near Clementi Ave 4',
    blurb: 'Litter picking along the canal with the Friends of Ulu Pandan.',
    pointsForAttending: 60,
    needsVolunteers: true,
    hasHappened: true,
  },
]
