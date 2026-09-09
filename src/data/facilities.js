// Mock green infrastructure around Clementi.
//
// ⚠️ READ BEFORE PUTTING THIS IN THE REPORT ⚠️
// The street names, block numbers and parks below are REAL places in Clementi.
// Everything this file says ABOUT them is INVENTED — nobody has surveyed any of
// it. That covers three separate things, and the third is the easiest to miss:
//
//   1. Whether each facility exists at that spot at all.
//   2. walkMinutes — a plausible guess from Blk 442 Clementi Ave 3, not a
//      measured or mapped walk. The screen says "about" for this reason.
//   3. Every specific inside `detail` — the EV tariffs, the community centre's
//      opening hours, the Bloobox collection days, the counts of garden beds and
//      bicycle spaces, the allotment waiting list. These are the dangerous ones.
//      They read as researched fact because they are attached to a real address
//      a marker could go and check, and they would find we made them up. They
//      are scene-setting, written so the demo feels like a real estate.
//
// So do NOT write in the report that Clementi "has" these facilities, and do not
// quote a `detail` line as a finding. Any number we are actually claiming is
// true belongs in factors.js with a source field — see CLAUDE.md.
//
// If you want the real ones, walk the estate and check, or look them up on the
// NEA / Town Council / LTA sites, then correct this file. If you do check one,
// write where you checked it beside that entry, so the next person can tell the
// checked entries from the invented ones.
//
// x and y are percentage positions on the stylised map (0-100, left and top).
// They are not real coordinates — nudge them until the map looks right.

export const FACILITIES = [
  {
    id: 'blk441-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 441 Clementi Ave 3',
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
    detail: '4 bays, level 5. Roughly $0.55 per kWh.',
    walkMinutes: 8,
    x: 62,
    y: 55,
  },
  {
    id: 'clementi-mrt-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi MRT station, outside Exit A',
    detail: 'Free refills. Bring your own bottle.',
    walkMinutes: 7,
    x: 57,
    y: 62,
  },
  {
    id: 'blk352-garden',
    type: 'garden',
    name: 'Clementi Community Garden',
    address: 'Blk 352 Clementi Ave 2',
    detail: 'Open plot, 14 beds. Volunteers weed on Saturday mornings.',
    walkMinutes: 5,
    x: 20,
    y: 52,
  },
  {
    id: 'blk330-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 330 Clementi Ave 4',
    detail: 'Powers the lifts and corridor lighting for the block.',
    walkMinutes: 6,
    x: 44,
    y: 15,
  },
  {
    id: 'blk301-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 301 Clementi Ave 4',
    detail: 'Part of the same SolarNova cluster as Blk 330.',
    walkMinutes: 9,
    x: 33,
    y: 10,
  },
  {
    id: 'nushigh-bicycle',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'NUS High School, 20 Clementi Ave 1',
    detail: 'Sheltered racks near the school gate. Roughly 60 spaces.',
    walkMinutes: 11,
    x: 74,
    y: 33,
  },
  {
    id: 'clementi-mrt-bicycle',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'Clementi MRT bicycle hub',
    detail: 'Two-tier racks. Usually full before 9am on weekdays.',
    walkMinutes: 7,
    x: 52,
    y: 66,
  },
  {
    id: 'ulupandan-pcn',
    type: 'parkConnector',
    name: 'Ulu Pandan Park Connector',
    address: 'Along Sungei Ulu Pandan',
    detail: 'Cycle east towards Holland or west towards Jurong.',
    walkMinutes: 4,
    x: 15,
    y: 74,
  },
  {
    id: 'clementi-woods',
    type: 'coolingSpace',
    name: 'Clementi Woods Park',
    address: 'Off West Coast Road',
    detail: 'Mature trees, noticeably cooler at midday. Benches and a playground.',
    walkMinutes: 12,
    x: 80,
    y: 76,
  },
  {
    id: 'blk726-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 726 Clementi West St 2',
    detail: 'Void deck bin. Often overflowing on Sunday nights.',
    walkMinutes: 14,
    x: 24,
    y: 88,
  },
  {
    id: 'cc-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi Community Centre, 220 Clementi Ave 4',
    detail: 'Inside the lobby. Open 9am to 9.30pm.',
    walkMinutes: 6,
    x: 47,
    y: 41,
  },
  {
    id: 'sunsetway-garden',
    type: 'garden',
    name: 'Sunset Way allotment',
    address: 'Sunset Way, near Clementi Arcade',
    detail: 'Rented plots. Waiting list is usually a few months.',
    walkMinutes: 16,
    x: 88,
    y: 20,
  },
  {
    id: 'blk445-ev',
    type: 'evCharger',
    name: 'EV charging point',
    address: 'Blk 445 Clementi Ave 3 car park',
    detail: '2 bays, ground level. Free for the first 30 minutes.',
    walkMinutes: 4,
    x: 37,
    y: 49,
  },
]
