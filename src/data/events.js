// Mock upcoming recycling drives and sustainability events in Clementi.
// All invented. Dates are written out so they read clearly in a demo —
// nothing here works out "days from today".

export const EVENTS = [
  {
    id: 'ewaste-aug',
    title: 'E-waste collection drive',
    date: 'Sat 22 Aug, 9am – 1pm',
    location: 'Blk 442 Clementi Ave 3, void deck',
    blurb: 'Bring old phones, cables, batteries and small appliances.',
    pointsForJoining: 50,
    needsVolunteers: true,
  },
  {
    id: 'garden-workday',
    title: 'Community garden work morning',
    date: 'Sun 23 Aug, 8am – 10am',
    location: 'Blk 352 Clementi Ave 2',
    blurb: 'Weeding, composting and replanting. Tools provided.',
    pointsForJoining: 40,
    needsVolunteers: true,
  },
  {
    id: 'repair-cafe',
    title: 'Repair Café',
    date: 'Sat 29 Aug, 2pm – 5pm',
    location: 'Clementi Community Centre, 220 Clementi Ave 4',
    blurb: 'Volunteers help fix fans, kettles, lamps and clothing.',
    pointsForJoining: 30,
    needsVolunteers: false,
  },
  {
    id: 'bloobox-signup',
    title: 'Bloobox sign-up booth',
    date: 'Sun 30 Aug, 10am – 4pm',
    location: 'Clementi Mall, level 1 atrium',
    blurb: 'Collect a free Bloobox and learn what can go in it.',
    pointsForJoining: 20,
    needsVolunteers: false,
  },
]
