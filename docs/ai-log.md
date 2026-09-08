# AI Log

Required for the report annex. Team members paste their own prompts here; Claude Code
appends a one-line summary of each task it completes.

## Claude Code task summaries

- 2026-08-14 — Updated `CLAUDE.md`: added the standard Claude Code header, an npm commands
  section, and a "current state" section recording that Tailwind and react-router-dom are
  named in the spec but not yet installed, and that `src/App.jsx` is still the stock Vite
  starter. Created this log file.
- 2026-08-14 — Installed Tailwind CSS v4 (via the `@tailwindcss/vite` plugin) and
  react-router-dom v7. Replaced the stock Vite starter page in `src/App.jsx` with a
  plain Tailwind-styled heading to confirm the setup works; deleted the now-unused
  `src/App.css`. Updated the Stack section of `CLAUDE.md` to match.
- 2026-08-14 — Built the Neighbourhood Dashboard (feature 1) for Clementi: stylised SVG
  map with 15 mock facilities, filter chips by type, tap-a-marker detail card with a
  "report a problem" form, nearest-first list, events with join/volunteer buttons,
  points counter, and the neighbourhood sustainability score ranking six estates.
  Added a three-tab bottom nav with the Share and Impact screens as placeholders.
  Chose one estate in depth over a Singapore-wide map — see the note in `facilities.js`.
- 2026-08-14 — Changed how event points work. Points are now credited only when
  attendance is confirmed, not when you sign up, so volunteering can be cancelled
  with nothing to claw back and nobody can farm points from events they skip.
  Events now move through sign-up → attended, and `events.js` gained past events
  so the attendance step is visible in the demo. Renamed `pointsForJoining` to
  `pointsForAttending`. Also changed the demo resident's name to Henrison.
- 2026-08-28 — Built the Sharing Platform (feature 2). A board for borrowing,
  giving away, swapping, renting and repair requests, plus the Expiring Soon
  Shelf: food sorted by how close it is to its date, with recipe suggestions
  appearing on anything that reached its date unclaimed. The "list something"
  form refuses to post food without a photo, and records whether it was a photo
  of the printed date or of the item itself. Moved the points balance out of
  Dashboard.jsx into a shared React context so both screens show one number.
  Points are awarded on completed handover, never on posting — same rule as
  events, for the same anti-farming reason.
- 2026-08-28 — Replaced the self-tapped "Mark as collected" button with handover
  codes, after the team spotted that whoever was being given points was also the
  one tapping the button that gave them out. Whoever is being credited now has to
  type in the other person's four digits, and the option only appears once a
  neighbour has actually asked for the item. Written up honestly in
  `src/lib/handover.js`, including what it still does not stop.
- 2026-08-28 — Added a demo phone switcher so the handover can actually be shown
  rather than just described. Two real phones would need a server, so one device
  now carries two points of view: Henrison and Mr Lim, each with their own points
  balance and their own view of the same board. Ownership changed from the string
  `'You'` to an `ownerId` compared against whoever's phone you are on, which is
  what made two sides possible at all. Sharing state moved into a provider so it
  survives switching tabs mid-demo. Also fixed two things this surfaced: walk
  times of "0 min" on another resident's listing, and recipes for expired food
  being shown to neighbours who are not the ones holding it.
- 2026-08-28 — Added diminishing returns on repeat exchanges between the same two
  people: full, full, half, quarter, then nothing. Closes the collusion hole the
  handover code cannot, since two people who agree to cheat really do meet.
  Deliberately caps the points and never the sharing — the exchange always goes
  ahead, and the card says so when the rate hits zero. Pair keys are
  order-independent so alternating direction does not dodge the taper. Explained
  in `src/lib/pairing.js`, including why the app must not try to detect families.
- 2026-08-28 — Built the Impact Calculator (feature 3), completing all three.
  `src/data/factors.js` now holds every figure the app shows with a cited source;
  where Claude had no trustworthy figure it left `value: null` and the screen
  shows a "Source needed" chip instead of inventing one. Four "what if I…" habit
  cards with steppers estimate CO₂, water, money and waste over a year; a "since
  January" panel totals what the resident has actually done; and the personalised
  nudges are plain rule functions over mock activity — no ML, as specified.
  The sources are printed on the screen itself, not just in the code.
- 2026-09-07 — Sourced the outstanding figures in `src/data/factors.js`. Three of
  the five now have real primary sources with the year and URL recorded: the grid
  emission factor (0.402 kg CO₂/kWh, 2024, EMA via NCCS), household water
  (141 litres per person per day, 2025, PUB press release of 17 Mar 2026), and
  domestic waste per capita. Added the Green Plan 2030 targets that pair with
  them. Two changes worth arguing about in the report: the waste figure is
  GENERATED, not DISPOSED, because NEA stopped publishing disposed-per-capita
  after 2015 — a different and larger quantity, flagged in the file; and NEA's
  current domestic recycling rate is 11%, not the ~20% in our own problem
  statement, so our brief is quoting a stale number that makes the problem look
  smaller than it is. The tofu water footprint and the drill's manufacturing CO₂
  are still `value: null` — searching produced either nothing or two figures
  seventeen-fold apart, so they stay unsourced and the "Source needed" chips stay
  on screen. What was searched and what to try next is written into each hint.
- 2026-09-07 — Compiled `docs/source-checklist.md`: every figure in `factors.js`
  with its value, unit, year, source, URL and whether it actually reaches a
  screen, as tick-boxes to divide between us. Tracing the usage turned up three
  things worth knowing: nine figures drive everything visible in the demo and the
  rest are report-only, so verification has an obvious priority order; the
  Mekonnen & Hoekstra reports are dated 2010, not the 2011 in our code; and two
  numbers on the borrow-a-drill card (the $89 price and the 1.5 kg mass) live in
  `habits.js` outside the sourcing mechanism entirely, while looking just as
  authoritative on screen as the cited ones.
- 2026-09-07 — Tofu water footprint sourced at last: **2,523 litres per kg**.
  The figure came from the team and checked out exactly against the primary
  paper — Mekonnen & Hoekstra (2011), Table 3, p. 1586, where it is listed as
  "Soya curd" (green 2397 + blue 83 + grey 44 = 2523 m³/ton, which is the same
  number as litres/kg). The reason earlier searches failed is that the table
  never uses the word "tofu", so a keyword search missed a figure sitting in a
  source we were already citing. Two things came out of checking it: our citation
  year 2011 is right for the HESS journal version (the report-series version is
  2010), and that one source string is actually covering two different papers —
  the crops one, now verified, and an unopened companion paper that all the
  animal figures including beef depend on.
- 2026-09-07 — Team reported food CO₂, water and prices verified; updated
  `docs/source-checklist.md` and `factors.js` to match. Checking the water
  figures against both papers confirmed all six animal values exactly (beef
  15,415 = 14,414 + 550 + 451, and so on), so the single water source constant
  was split into a crops one and an animals one — a marker can now tell which
  paper each number came from. Two things did not come out clean. First,
  `rootVegetables` is 322, identical to `otherVegetables`, where the paper lists
  "Starchy roots" at 387; left unchanged and flagged, since it is not on any
  screen and the right replacement depends on which source we mean. Second, the
  prices now rest on two incompatible bases — a global index for beef and
  chicken, real shelf prices for tofu and bread — which makes the beef→tofu
  card subtract a shelf price from an index price. Neither citation names its
  source yet, so both are marked incomplete in the file rather than ticked off.
- 2026-09-07 — Merged the team's verified figures into `factors.js`. Food CO₂
  re-entered to two decimal places, which settled an earlier flag: milk and tofu
  are 3.15 and 3.16, not a duplicated 3.2. Three water figures were genuinely
  wrong and are now fixed — bread was 1,827, the figure for raw *wheat* rather
  than bread (1,608); bananas was 962, the aggregate *Fruits* category rather
  than the banana line (790); and rootVegetables was a copy of otherVegetables
  (387, "Starchy roots"). Rice moved 2,497 → 2,172, which is a choice between
  table rows rather than a correction, so the variety is now named in a comment.
  Prices moved to real numbers on two different bases — index for beef and
  chicken, shelf survey for tofu and bread — and neither citation names its
  source yet, so both are marked incomplete rather than ticked.
- 2026-09-07 — Price sources identified and checked. Beef (SGD 17.60/kg) and
  chicken (SGD 13.70/kg) come from GlobalProductPrices.com for Singapore,
  January 2026, and both matched our values exactly. This also corrected an
  earlier warning of mine: I had assumed "global price index" meant a wholesale
  commodity index incomparable with shelf prices, when the site actually reports
  per-country retail — so all four prices are on the same footing after all.
  The real like-for-like problem turned out to be the cut: the beef figure is
  boneless cubes, the chicken figure a whole bone-in bird, so the beef→chicken
  card overstates money saved. Tofu at $3.15/kg checked out against FairPrice
  tau kwa listings ($3.13–$3.17/kg). Bread at $5.50/kg could NOT be reproduced —
  wholemeal loaves are $6.50–$7.17/kg — so it is flagged in the file rather than
  ticked.
- 2026-09-07 — Settled bread as WHITE rather than wholemeal, and recorded why.
  The $5.50/kg figure could not be matched against wholemeal ($6.50–$7.17/kg on
  FairPrice) but sits inside the white band ($5.17–$7.25). The reasoning matters
  more than the number: neither of our environmental sources distinguishes white
  from wholemeal — Poore & Nemecek give generic "Bread", Mekonnen & Hoekstra
  "Wheat bread" — so pricing wholemeal would make the money column more specific
  than the three columns next to it. White is also cheaper, so it under-claims
  rather than over-claims. Left one loose end noted: activity.js still mentions a
  "Loaf of wholemeal".
- 2026-09-07 — Moved all four food prices onto one source: NTUC FairPrice online,
  read 7 Sept 2026, with comparable cuts. Beef is now shin shank cube at
  $17.80/kg and chicken is frozen boneless skinless breast at $9.15/kg, so the
  two meats are both plain raw boneless meat. Two results worth reporting. The
  beef figure was independently corroborated — GlobalProductPrices.com gave
  $17.60/kg for the same description, within 1% — which is the only agreement
  between independent sources anywhere in the file. And the chicken correction
  went the opposite way to the prediction: I had argued that adjusting off a
  whole bird would make chicken dearer and shrink the saving, but boneless breast
  is cheaper than whole chicken, so the saving grew from $3.90/kg to $8.65/kg,
  moving the card from about $61 a year to about $135. Remaining limitation
  recorded rather than hidden: the beef is chilled and the chicken frozen, and
  fresh breast at roughly $19/kg would erase the saving.
- 2026-09-07 — Closed out the food figures. Bread stays at $5.50/kg by decision:
  it matches no single listing, so it is now described in the file as a
  representative mid-range white-loaf figure rather than a shelf price — which is
  defensible, where calling it a named product's price would not be. Recorded why
  the beef cut is a strength rather than a weakness: shin shank is a cheap
  stewing cut near the bottom of the beef range, against steak cuts at $50–62/kg,
  so it produces the smallest defensible saving rather than the largest. Every
  food figure now has a value, unit, named source and year. What is left is one
  missing value (the power drill), two numbers in habits.js that sit outside the
  sourcing mechanism, and the stale 20% recycling rate in our own brief.
- 2026-09-07 — Corrected the recycling rate in `CLAUDE.md` from "around 20%" to
  11% (2025, NEA) and flagged the unsourced "4 in 10 Singaporeans" claim beside
  it. Then swept the whole of `src/` for numbers the checklist had missed and
  added four new sections. The one that matters is §8: five numbers reach a
  screen without going through `factors.js` at all — the drill's $89 price and
  1.5 kg mass, sixteen walking times, an EV charger tariff, and two rental
  prices — so nothing would flag them if they were wrong, and on screen they look
  as authoritative as the cited figures. Also catalogued the design parameters
  (points values, the taper, nudge thresholds) which need stating rather than
  sourcing, and the mock scenario data which needs neither. Three data files
  carry no "this is invented" warning where three others do.
- 2026-09-08 — The power drill is sourced, and `factors.js` now has no `null`
  values left. The figure came from the Edinburgh Tool Library's "Carbon Data for
  Sharing Libraries": 6.165 kg CO₂e per kg of cordless power tool. Kept in the
  source's own per-kilogram unit rather than converted to a per-drill number, so
  the mass stays a visible input instead of being hidden inside one figure — and
  the mass moved out of habits.js into ASSUMPTIONS.drillMassKg where it goes
  through the same discipline as everything else. It is a derived estimate, not a
  measurement, so the file records the whole derivation: ICE database, UK
  Government 2020 factors for the battery, Climate Impact Forecast for the motor,
  and Edinburgh's own 30/15/15/40 composition assumption. Two things worth the
  report: no drill manufacturer publishes an EPD, which is why three searches
  failed, and the figure that worked came from a tool-sharing library — an
  organisation of exactly the kind this app models, which hit the same wall we
  did. The "Source needed" chip sat on that card for three weeks instead of a
  guess, which is the mechanism working.
- 2026-09-08 — Sourced the drill's price and mass from one Horme Hardware
  listing (Bosch GSR120-LI, S$134.06, 0.99 kg with battery), and moved both
  inside the sourcing mechanism as `ITEM_PRICE_SGD` and `ITEM_MASS_KG`. They had
  been sitting in `habits.js` as bare numbers with no `source` field, which is
  the more interesting half of this: they were never marked "Source needed" and
  never could have been, because nothing was watching them — a hand-typed $89
  looked exactly as solid on screen as Poore & Nemecek. Both numbers then moved
  in **opposite** directions. Nothing entry-level in Singapore costs $89, so the
  money saved grew from $89 to $134; nothing we priced weighed 1.5 kg, so the
  CO₂ and waste both shrank, 9.2 kg to 6.1 kg and 1.5 kg to 1.0 kg. We had been
  under-claiming the money and over-claiming the physics. That is the second time
  this project has predicted the direction of a data error wrongly (the chicken
  price was the first), which makes it a finding rather than an anecdote for the
  evaluation section. One detail worth the report on its own: the mass has to be
  the weight *including the battery*, because Edinburgh's factor assumes a tool
  that is 30% battery by mass — two of the four listings we compared quote a
  bare-tool weight, and using one would have silently dropped about a third of
  the carbon. Reading the qualifier mattered more than reading the number. Four
  drills were priced and all four are recorded in the checklist so the choice is
  on the record, not just its result.
- 2026-09-08 — Corrected two things the team caught in `docs/source-checklist.md`,
  both of them mine. First, the status table claimed sections 5 and 6 (the
  Singapore national figures and the Green Plan targets) were "done" and ticked
  sections 4 and 4b, when all four were sourced by Claude and opened by nobody.
  The document's own rule is that a tick means a person read the number off the
  page, so the table now has two columns — "has a real source" and "seen with our
  own eyes" — and only sections 1 to 3 have both. The distinction is not
  pedantry: when the team actually opened the papers behind sections 1 to 3 it
  found four wrong figures, every one of which had a confident citation beside
  it. That is the base rate, and it is now written into the checklist so the
  remaining verification does not look like a formality. Second, the checklist
  called the "4 in 10 Singaporeans" claim "the only unsourced number left
  anywhere", which was wrong: the drill card's WATER tile still shows a "Source
  needed" chip and always will, because `impact.js` marks it unsourced
  deliberately — borrowing a drill saves no water we can evidence, and a zero
  would be a claim we cannot support. Writing that up surfaced a genuine flaw in
  our own design, now §4c: the chip means two different things — "not found yet"
  and "we do not think this is knowable" — and the screen renders them
  identically. Whether to split them in the UI is left as a decision for the team
  with the arguments both ways recorded, not patched over.
- 2026-09-08 — The drill's water footprint is sourced, from the EPA USEEIO
  v2.0.1 workbook the team downloaded, and the last "Source needed" chip is off
  the screen. Sheet N, column 333991/US ("Power tools"), row "Freshwater
  withdrawals" gives 12.369 kg per US dollar. Three things had to be got right
  before that became a number. First, the team's suggestion to look for blue
  water rows in matrix B was checked and came back negative in a useful way: the
  model holds exactly four water flows, all withdrawals, and in matrix M the two
  fresh ones sum to 12.369173960267978 — the N figure to fourteen decimal places.
  Going below the indicator returns the same number, not a better one, and B
  would have been a trap because it is direct-only, 22% of the total. Second, the
  coefficient is per 2012 PRODUCER-price dollar, so multiplying it by a 2026
  Singapore shelf price overstates by 3.7x. USEEIO ships the two corrections in
  its own workbook: Phi (price type) says only 45.7% of a retail dollar is
  manufacturer output, the rest being retail margin, wholesale margin and
  freight; and the currency-year step needed the BLS producer price index for
  this exact industry, PCU333991333991, 2012 average 184.44 against 288.571 at
  June 2025. SGD 134.06 becomes USD 28.33 in 2012 producer prices, and 1,309
  litres becomes 350. Third, and the part that matters most for the report: a
  withdrawal is not a consumptive footprint. The food cards use Mekonnen &
  Hoekstra, which counts water evaporated or needed to dilute pollution; USEEIO
  counts water taken from a river, most of it power-station cooling water that
  goes straight back. So the drill card's tile is labelled "Water withdrawn"
  while the food cards keep "Water" — one small label change in ImpactStats,
  refusing to let the same column mean two things, which is the error this
  project has already made twice. As a by-product the same model gave an
  independent CO2 cross-check: 8.72 kg against Edinburgh's 6.10, a factor of 1.4,
  which for a spend-based model against a process LCA is agreement rather than
  conflict. Edinburgh stays as the headline figure because it is anchored to mass
  rather than price — a drill bought on sale would otherwise "emit" less — and
  keeping the two apart is what preserves the cross-check.
- 2026-09-08 — Asked whether the drill's 350 L includes a grey water component,
  and checked it in USEEIO's characterisation matrix C rather than assuming. It
  does not: "Freshwater withdrawals" is characterised from exactly two flows,
  fresh surface water and fresh groundwater, both at factor 1.0, so it is a pure
  volume-in count that no pollutant ever enters. The pollution is in the model —
  1,282 chemical flows feed the freshwater ecotoxicity indicator — but it comes
  out as CTUe, an impact potential, and never as a dilution volume, which is what
  a grey water footprint is. Following that through produced the sharpest version
  of the mismatch we have found so far, and it is now written into the checklist:
  the food figures are green + blue + grey consumed, and GREEN water — rain
  evapotranspired by the crop — is between 70% and 95% of every one of them
  (beef 93.5%, tofu 95%, bread 70%). A drill factory grows nothing, so it has no
  green water at all, and its number is a withdrawal that mostly returns to the
  river. The drill's 350 L and beef's 15,415 L/kg therefore share no component at
  all — not even blue, since blue is consumptive and this is withdrawal. This
  retrospectively justifies the separate "Water withdrawn" label better than the
  argument originally given for it.
