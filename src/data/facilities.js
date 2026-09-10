// Green infrastructure around Clementi.
//
// ⚠️ READ BEFORE PUTTING THIS IN THE REPORT ⚠️
// Rebuilt on 10 Sept 2026 from official datasets, replacing a hand-invented list.
// Most entries are now REAL facilities at REAL coordinates. They are not all
// equally well evidenced, and the report must not treat them alike:
//
//   1. DATASET-CONFIRMED — the facility is recorded at that location by the
//      agency that runs it. All recycling and e-waste points (NEA), all
//      community gardens (NParks Community in Bloom), both bicycle racks (LTA),
//      the park connector and Clementi Woods Park (NParks). Coordinates and
//      dataset ids are in §8 of docs/source-checklist.md. Blk 442 and Blk 449
//      were opened in the raw file and read by Henrison on 10 Sept.
//   2. EXISTS, DETAIL UNVERIFIED — both EV points. Confirmed to exist via
//      Revolt.sg (an aggregator), so no tariff is shown. The bay counts are
//      still ours and are flagged in §8.
//   3. ILLUSTRATIVE — both water coolers and both rooftop-solar entries. These
//      are MOCK DATA and the team has decided to leave them that way. Not an
//      oversight and not a to-do: no public dataset records water refill points
//      or per-block rooftop solar, so these cannot be confirmed OR refuted at
//      any amount of effort. Chasing them would cost the deadline and end where
//      it started. The addresses are real; the facilities are our assumption.
//      Do not cite them in the report as findings, and do not put them on a
//      verification list — there is nothing to verify against.
//
//      For future development, the better fix is not more research but a
//      different facility type: REVERSE VENDING MACHINES for drink containers
//      are a real scheme with real, findable, published locations, so they
//      would carry the same "where is my nearest one" idea on evidence instead
//      of assumption. Water coolers and per-block solar are the wrong things to
//      map, not badly researched ones.
//
// ⚠️ THIS IS THE NEAREST FEW, NOT ALL OF THEM. There are 15 recycling bins
// within 200 m of Blk 442 alone. The dashboard's "nearest first" list is
// honest about ORDER but is not an exhaustive survey, and the report should say
// so. What changed on 10 Sept is that the list is now drawn from the real
// nearest rather than from wherever we happened to put a pin.
//
// ⚠️ THE DATASETS ARE OLDER THAN THEIR DOWNLOAD PAGES SAY. Every one of the
// 12,578 records in NEA's recycling-bin file carries FMEL_UPD_D = 2 June 2017,
// while the data.gov.sg page reports a 2024 refresh. The page date is when the
// file was republished, NOT when anyone last looked at a bin. Check the
// per-record date, not the portal's, and say 2017 in the report. The same
// question applies to every other dataset here — LTA's rack file stamps 2019.
//
// walkMinutes has three provenances and §8 records which is which:
//   MEASURED on Google Maps from Blk 442 (1.314123, 103.764519), routing to the
//   dataset coordinate — clementimall-ewaste, clementi-mall-ev, blk445-ev,
//   clementi-mrt-water, clementi-mrt-bicycle, blk330-solar, blk301-solar,
//   nushigh-garden, ulupandan-pcn, clementi-woods, cc-water and cc-ewaste.
//   CORRECTED BY LOCAL KNOWLEDGE — the five recycling bins. ⚠️ Google Maps will
//   not route through an HDB void deck, so it walks you the long way round the
//   block and overstates short hops inside an estate: it gives 4 minutes for a
//   bin 65 m away. A resident who walks it knows better. Henrison set these on
//   10 Sept. This is the one place where local knowledge beats the tool, and it
//   is worth a line in the report.
//   ESTIMATED for the rest, at straight-line metres ÷ 40 — a rate calibrated
//   from the measured readings, not a guess at walking speed. Estimated
//   entries are on §8's outstanding list to be measured.
//
// x and y are percentage positions on the stylised map (0-100, left and top).
// They are decorative and NOT a projection — the map does not place pins where
// the coordinates say. Nudge them until it looks right.

export const FACILITIES = [
  // ---- Recycling bins (NEA Recycling Bins dataset) ----
  // These five ARE the five nearest bins in the dataset, checked 10 Sept: 442 at
  // 0 m, 441B at 64, 441A at 65, 449 at 65, 443 at 73. The next is 105 m away.
  //
  // A Bloobox is the box NEA gives a household to collect recyclables in at
  // home; you empty it into a blue bin. So there is no such thing as a separate
  // "Bloobox point" to walk to — it is these bins. The Bloobox facility type was
  // removed on 10 Sept for that reason and the fact moved into the card text,
  // which answers the resident's actual question. The Bloobox sign-up booth in
  // events.js is a different thing and stays: that is where you collect the box.
  {
    id: 'blk442-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 442 Clementi Ave 3',
    detail: 'At your own block. Paper, plastic, metal, glass. Bloobox contents go here.',
    walkMinutes: 1,
    x: 30,
    y: 34,
  },
  {
    id: 'blk441b-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 441B Clementi Ave 3',
    detail: 'Void deck bin. Paper, plastic, metal, glass. Bloobox contents go here.',
    walkMinutes: 3,
    x: 19,
    y: 26,
  },
  {
    id: 'blk441a-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 441A Clementi Ave 3',
    detail: 'Void deck bin. Paper, plastic, metal, glass. Bloobox contents go here.',
    walkMinutes: 3,
    x: 23,
    y: 30,
  },
  {
    id: 'blk449-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 449 Clementi Ave 3',
    detail: 'Void deck bin. Paper, plastic, metal, glass. Bloobox contents go here.',
    walkMinutes: 3,
    x: 34,
    y: 44,
  },
  {
    id: 'blk443-recycling',
    type: 'recycling',
    name: 'Blue recycling bin',
    address: 'Blk 443 Clementi Ave 3',
    detail: 'Void deck bin. Paper, plastic, metal, glass. Bloobox contents go here.',
    walkMinutes: 1,
    x: 38,
    y: 27,
  },

  // ---- E-waste (NEA E-waste Recycling dataset, ALBA scheme) ----
  {
    id: 'clementimall-ewaste',
    type: 'ewaste',
    name: 'E-waste collection box',
    address: 'POPULAR, The Clementi Mall, 3155 Commonwealth Ave West',
    detail: 'Phones, cables, batteries and small appliances.',
    walkMinutes: 4,
    x: 60,
    y: 52,
  },
  {
    id: 'blk451-ewaste',
    type: 'ewaste',
    name: 'E-waste collection box',
    address: 'FairPrice, Blk 451 Clementi Ave 3',
    detail: 'Phones, cables, batteries and small appliances.',
    walkMinutes: 5,
    x: 44,
    y: 58,
  },
  {
    id: 'cc-ewaste',
    type: 'ewaste',
    name: 'E-waste collection box',
    address: 'Clementi Community Centre, 220 Clementi Ave 4',
    detail: 'By the main entrance.',
    walkMinutes: 15,
    x: 50,
    y: 38,
  },

  // ---- EV charging (existence via Revolt.sg; no open dataset) ----
  {
    id: 'clementi-mall-ev',
    type: 'evCharger',
    name: 'EV charging bays',
    address: 'Clementi Mall car park, 3155 Commonwealth Ave West',
    detail: '4 bays, level 5. Paid charging.',
    walkMinutes: 4,
    x: 62,
    y: 55,
  },
  {
    id: 'blk445-ev',
    type: 'evCharger',
    name: 'EV charging point',
    address: 'Blk 445 Clementi Ave 3 multi-storey car park',
    detail: '2 bays. Paid charging.',
    walkMinutes: 1,
    x: 37,
    y: 49,
  },

  // ---- Water refill (no public dataset — our assumption) ----
  {
    id: 'clementi-mrt-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi MRT station, outside Exit A',
    detail: 'Free refills. Bring your own bottle.',
    walkMinutes: 6,
    x: 57,
    y: 62,
  },
  {
    id: 'cc-water',
    type: 'waterRefill',
    name: 'Water cooler',
    address: 'Clementi Community Centre, 220 Clementi Ave 4',
    detail: 'Inside the lobby. Check the CC’s opening hours.',
    walkMinutes: 15,
    x: 47,
    y: 41,
  },

  // ---- Community gardens (NParks Community in Bloom register) ----
  {
    id: 'swimcomplex-garden',
    type: 'garden',
    name: 'Clementi Swimming Complex garden',
    address: 'Clementi Swimming Complex, 518 Clementi Ave 3',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 4,
    x: 18,
    y: 46,
  },
  {
    id: 'clementipri-garden',
    type: 'garden',
    name: 'Clementi Primary School garden',
    address: 'Clementi Primary School',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 6,
    x: 12,
    y: 36,
  },
  {
    id: 'clementitownsec-garden',
    type: 'garden',
    name: 'Clementi Town Secondary garden',
    address: 'Clementi Town Secondary School',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 8,
    x: 9,
    y: 26,
  },
  {
    id: 'clementiheights-garden',
    type: 'garden',
    name: 'Clementi Heights RC garden',
    address: "Clementi Heights Residents' Committee",
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 9,
    x: 28,
    y: 64,
  },
  {
    id: 'nushigh-garden',
    type: 'garden',
    name: 'NUS High School garden',
    address: 'NUS High School, 20 Clementi Ave 1',
    detail: 'Registered Community in Bloom garden.',
    walkMinutes: 29,
    x: 78,
    y: 29,
  },

  // ---- Rooftop solar (no public dataset — our assumption) ----
  {
    id: 'blk330-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 330 Clementi Ave 2',
    detail: 'Feeds the block’s common services.',
    walkMinutes: 12,
    x: 44,
    y: 15,
  },
  {
    id: 'blk301-solar',
    type: 'solar',
    name: 'Rooftop solar panels',
    address: 'Blk 301 Clementi Ave 4',
    detail: 'Rooftop panels, like Blk 330.',
    walkMinutes: 19,
    x: 33,
    y: 10,
  },

  // ---- Bicycle parking (LTA Bicycle Rack dataset) ----
  {
    id: 'clementi-mrt-bicycle',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'Clementi MRT, Commonwealth Ave West',
    detail: 'Sheltered single-tier racks, 10 spaces.',
    walkMinutes: 6,
    x: 52,
    y: 66,
  },
  {
    id: 'clementi-mrt-bicycle-2',
    type: 'bicycle',
    name: 'Bicycle parking',
    address: 'Clementi MRT, east side',
    detail: 'Open single-tier racks, 25 spaces.',
    walkMinutes: 4,
    x: 58,
    y: 70,
  },

  // ---- Park connector (NParks Park Connector Loop) ----
  {
    id: 'ulupandan-pcn',
    type: 'parkConnector',
    name: 'Ulu Pandan Park Connector',
    address: 'Along Sungei Ulu Pandan',
    detail: 'On the Southern Ridges and Western Adventure Loops.',
    walkMinutes: 22,
    x: 15,
    y: 74,
  },

  // ---- Cooling green space (NParks Parks and Nature Reserves) ----
  {
    id: 'clementi-woods',
    type: 'coolingSpace',
    name: 'Clementi Woods Park',
    address: 'West Coast Road',
    detail: 'Mature trees, shade at midday. Benches and a playground.',
    walkMinutes: 36,
    x: 80,
    y: 76,
  },
]
