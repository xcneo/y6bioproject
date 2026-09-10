// Green infrastructure around Clementi.
//
// ⚠️ READ BEFORE PUTTING THIS IN THE REPORT ⚠️
// The street names, block numbers and parks below are REAL places in Clementi.
// As of 10 Sept 2026 the entries are NO LONGER uniformly invented — they were
// checked against official datasets, so this file now holds three different
// kinds of thing and the report must not treat them alike:
//
//   1. DATASET-CONFIRMED. The facility is recorded in an official dataset at
//      that location: the Clementi MRT bicycle racks (LTA), Ulu Pandan Park
//      Connector and Clementi Woods Park (NParks), the Community in Bloom
//      gardens at Clementi Ave 2 and NUS High School (NParks), and the
//      recycling bins at Blk 441A, 443 and 706 (NEA).
//   2. EXISTS, BUT THE DETAIL IS UNVERIFIED. Both EV points are confirmed to
//      exist via Revolt.sg, but their tariffs are not, so no price is shown.
//      Blk 443's bin is in the NEA data, but "Bloobox" is a separate scheme
//      the dataset does not record.
//   3. STILL INVENTED. Both water coolers and both rooftop-solar entries. No
//      public dataset records water refill points or per-block solar, so
//      nobody can confirm or refute these. The Sunset Way entry says
//      "allotment", which is a different NParks scheme from the community
//      garden the data actually shows nearby.
//
// Which is which, with coordinates and dataset ids, is in §8 of
// docs/source-checklist.md. Do NOT write in the report that Clementi "has"
// every facility below, and do not quote a `detail` line as a finding unless
// §8 says it is confirmed.
//
// walkMinutes is MEASURED. Real routed walking times from Blk 442 Clementi Ave 3,
// read off Google Maps by a team member on 10 Sept 2026. They replace an earlier
// straight-line calculation at 80 m/min, which understated every single entry
// because a real walk bends around blocks and waits at crossings. The screen
// still says "about", since one reading of one route is not a guarantee.
//
// Two facility types are not reached on foot in practice, and their measured
// times for the real mode are recorded in §8 rather than here: the EV points are
// driven to (4 min and 1 min) and the bicycle parking is cycled to (6 min and
// 1 min). The cards still show the walking figure, because the field is called
// walkMinutes and the screen says "walk". Read §8 before changing that.
//
// Three `detail` lines still carry an invented specific and are on §8's
// outstanding list: Blk 443's collection days, the CC's opening hours, and the
// Sunset Way waiting list. If you check one, correct it and say so in §8.
//
// x and y are percentage positions on the stylised map (0-100, left and top).
// They are decorative and NOT a projection — the map does not place pins where
// the coordinates say. Nudge them until it looks right.

export const FACILITIES = [
  {
    id: 'blk441a-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 441A Clementi Ave 3',
    detail: 'Shared bin at the void deck. Paper, plastic, metal, glass.',
    walkMinutes: 2,
    x: 23,
    y: 30,
  },
  {
    id: 'blk443-bloobox',
    type: 'bloobox',
    name: 'Bloobox collection point',
    address: 'Blk 443 Clementi Ave 3',
    detail: 'Drop off your Bloobox here. Emptied every Tuesday and Friday.',
    walkMinutes: 3,
    x: 38,
    y: 27,
  },
  {
    id: 'clementi-mall-ev',
    type: 'evCharger',
    name: 'EV charging bays',
    address: 'Clementi Mall car park, 3155 Commonwealth Ave West',
    detail: '4 bays, level 5. Paid charging.',
    walkMinutes: 2,
    x: 62,
    y: 55,
  },
  {
    id: 'clementi-mrt-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi MRT station, outside Exit A',
    detail: 'Free refills. Bring your own bottle.',
    walkMinutes: 2,
    x: 57,
    y: 62,
  },
  {
    id: 'clementiave2-rc-garden',
    type: 'garden',
    name: 'Clementi Ave 2 RC Garden',
    address: 'Clementi Avenue 2',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 13,
    x: 20,
    y: 52,
  },
  {
    id: 'blk330-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 330 Clementi Ave 2',
    detail: "Feeds the block's common services.",
    walkMinutes: 9,
    x: 44,
    y: 15,
  },
  {
    id: 'blk301-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 301 Clementi Ave 4',
    detail: 'Rooftop panels, like Blk 330.',
    walkMinutes: 17,
    x: 33,
    y: 10,
  },
  {
    id: 'nushigh-bicycle',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'NUS High School, 20 Clementi Ave 1',
    detail: 'Sheltered racks near the school gate.',
    walkMinutes: 19,
    x: 74,
    y: 33,
  },
  {
    id: 'nushigh-garden',
    type: 'garden',
    name: 'NUS High School community garden',
    address: 'NUS High School, 20 Clementi Ave 1',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 19,
    x: 78,
    y: 29,
  },
  {
    id: 'clementi-mrt-bicycle',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'Clementi MRT bicycle hub',
    detail: 'Sheltered single-tier racks. Busiest at commuting times.',
    walkMinutes: 3,
    x: 52,
    y: 66,
  },
  {
    id: 'ulupandan-pcn',
    type: 'parkConnector',
    name: 'Ulu Pandan Park Connector',
    address: 'Along Sungei Ulu Pandan',
    detail: 'On the Southern Ridges and Western Adventure Loops.',
    walkMinutes: 18,
    x: 15,
    y: 74,
  },
  {
    id: 'clementi-woods',
    type: 'coolingSpace',
    name: 'Clementi Woods Park',
    address: 'Off West Coast Road',
    detail: 'Mature trees, shade at midday. Benches and a playground.',
    walkMinutes: 27,
    x: 80,
    y: 76,
  },
  {
    id: 'blk706-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 706 Clementi West St 2',
    detail: 'Void deck bin. Frequently reported full on Sunday evenings.',
    walkMinutes: 25,
    x: 24,
    y: 88,
  },
  {
    id: 'cc-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi Community Centre, 220 Clementi Ave 4',
    detail: 'Inside the lobby. Open 9am to 9.30pm.',
    walkMinutes: 13,
    x: 47,
    y: 41,
  },
  {
    id: 'sunsetway-garden',
    type: 'garden',
    name: 'Sunset Way allotment',
    address: 'Sunset Way, near Clementi Arcade',
    detail: 'Rented plots. Waiting list is usually a few months.',
    walkMinutes: 23,
    x: 88,
    y: 20,
  },
  {
    id: 'blk445-ev',
    type: 'evCharger',
    name: 'EV charging point',
    address: 'Blk 445 Clementi Ave 3 car park',
    detail: '2 bays, ground level.',
    walkMinutes: 7,
    x: 37,
    y: 49,
  },
]
