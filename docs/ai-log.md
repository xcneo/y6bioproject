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
- 2026-09-09 — Sourced the "4 in 10 Singaporeans" claim, the last unsourced
  number in the project and the opening line of the problem statement in both
  `CLAUDE.md` and `README.md`. The survey exists — Singlife's *Sustainable Future
  Index 2024*, an online survey of 1,000 Singaporeans and PRs aged 18 to 64
  fielded June–July 2024 — but it does not contain "4 in 10" anywhere. What it
  publishes is two figures: 7 in 10 feel sustainability is important, and only 3
  in 10 are actively contributing. Our "4 in 10" was 7 minus 3, somebody's own
  arithmetic on the way to "the share who value it but don't act", and the
  subtraction is an assumption rather than a finding: it gives exactly 4 only if
  every one of the 3 who act comes from the 7 who value, and if some who act
  don't much care about it then the value-but-don't-act group is bigger than 4 in
  10. The old sentence was a lower bound written as a measurement. Both files now
  quote the two published figures instead, which needs no derivation defending
  and makes a sharper opening line — 7 value it, 3 do it. The report's PDF
  resisted the usual tools (no poppler on the machine, and the fetcher returned
  binary), so the text came out by decompressing the PDF's own content streams
  with zlib and reading the figures verbatim off p. 6. Two traps are now written
  into §11 for whoever verifies it. First, the newer Singlife-SGFIN 2026 edition
  has its own "4 in 10" and it means something completely different — willingness
  to pay a price premium, not failure to act — so it must not be swapped in
  because it looks familiar. Second, that 2026 edition does not supersede the
  figure despite being newer: it changed instrument to the AKOA framework and
  never repeats the awareness-versus-action split, which is the answer if a marker
  asks why we cite a 2024 survey in 2026. One wording limitation is recorded
  rather than smoothed over: Singlife glosses its own result as an *awareness*-
  action gap while we call it a *value*-action gap, and although the question
  wording ("feel sustainability is important") supports our reading, the mismatch
  belongs in the methodology paragraph. The figure is sourced, not verified —
  it goes on the same ☐ list as §4, §4b, §5 and §6, because Claude reading a PDF
  is exactly what this document says is not a verification. Two stale passages in
  the checklist's status block were corrected in the same pass: it still claimed
  the drill card shows a "Source needed" chip and that its water tile always
  would, both overtaken when USEEIO filled that figure on 8 Sept.
- 2026-09-09 (later) — §11 closed and our own survey brought into the checklist
  as a source. Henrison opened the Singlife article, published 10 Feb 2025, saw
  the 7 in 10 and the 3 in 10 for himself and confirmed the tick, so the
  value–action gap went from unsourced to sourced to human-verified inside one
  day — the first figure in the project to do that. Before touching anything the
  repo was swept for every variant of the old claim: the live wording exists in
  exactly two places, `README.md` and `CLAUDE.md`, nothing in `src/` mentions it
  at all because it never reaches a screen, and every other hit is either this
  document explaining the correction or the log recording it. Then the team's own
  Google Form export was read — 52 responses between 21 Aug and 9 Sept 2026, 47
  students, 4 employed, 1 NS — and written up as §11b. The reason it earns a
  section rather than a footnote is methodological: Singlife's gap is the
  distance between two different questions, and calling that a value–action gap
  needs the assumption that the 3 who act sit inside the 7 who value, whereas our
  survey asked both halves of the same 52 people. 46 of them (88.5%) have never
  taken part in a community or ground-up sustainability initiative, and those same
  respondents score the app's three aims 4.35 to 4.44 out of 5 and their society's
  civic engagement 2.54. Values high, action low, one group, no subtraction. The
  barrier ratings also order the brief's two root causes for us — cost 4.37 with
  28 of 52 giving it the maximum, no dedicated community 4.23, lack of information
  3.85 — so cost is the figure to quote for root cause 2. Six limitations are
  recorded rather than smoothed over, and the sharpest is ours to own: every one
  of the 52 said yes to "would you be interested in using such an app?", which in
  a sample of mostly classmates being asked about our own project is what a
  leading question and social desirability look like, not evidence of demand. It
  is reported and discounted in the same breath, because a marker who finds that
  unprompted reads it far worse than one we flag first. The other limitations are
  the convenience sample (which is why the national sentence still rests on
  Singlife and our survey only corroborates it locally, never "our survey found
  that Singaporeans…"), self-selection, ceiling effects that make the 4.44/4.40/
  4.35 ordering of the three aims meaningless, small n, and one genuine gap: the
  export carries the numbers 1 to 5 but not the words they were labelled with, so
  somebody needs to open the Form and write the anchors into §11b before those
  means can be interpreted.
- 2026-09-09 (later still) — The survey's scale anchors were confirmed from the
  Google Form — **1 = "not at all", 5 = "very much"** — which closes the last
  open item in §11b and makes every mean in it interpretable. Writing them down
  immediately exposed something the numbers alone had hidden: the anchors do not
  point the same way on every question. On the barriers (Q5–Q7) and the aims
  (Q10–Q12) a high score is the strong result, but **Q4 asks whether society's
  civic engagement is *sufficient***, so there a *low* score is the striking one.
  Its 2.54 means "not really sufficient", which supports our problem statement
  rather than contradicting it. The earlier write-up had compressed this to
  "score their society's civic engagement at 2.54", which reads as though we had
  measured how much engagement exists — a question we never asked. That is now
  corrected in §11b and the phrasing to use is spelled out: *"rated the
  sufficiency of civic engagement at 2.54 out of 5"*. Small wording point, but it
  is exactly the kind of slip that turns a supporting figure into one a marker
  can dispute, and it only became visible once the anchors were written next to
  the means. §11b now has nothing outstanding.
- 2026-09-09 (verification pass) — Henrison opened the Edinburgh Tool Library
  page and the Horme listing and confirmed all three on-screen drill figures:
  6.165 kg CO2e per kg of tool (§4), and the $134.06 price and 0.99 kg weight
  including the battery (§4b). All three are now properly ticked, which matters
  because this document had them ticked once before on Claude's word alone and
  had to un-tick them. Every figure that reaches a screen has now been read off
  its source by a person. What is left unverified is §5 and §6 — seven numbers
  across four web pages, none of them on screen — and §4d, which is different in
  kind: not a page to open but a four-step derivation to re-do. He also found
  Bosch selling the same drill for $140 on their own site against Horme's
  $134.06, and asked whether we should switch. That decision is left open here
  pending his call, but the analysis is recorded: the two prices agree within
  4.4%, which is corroboration rather than conflict, and switching would move the
  water figure as well as the money one because §4d derives the litres FROM the
  price. CO2 would not move, being mass-based — which is exactly the property
  that made us keep Edinburgh as the headline carbon figure in the first place.
- 2026-09-09 (correction to the entry above) — The Bosch price question is
  settled, and the entry immediately above this one gets a figure wrong that
  needs correcting rather than quietly leaving. It records the two drill prices
  as agreeing "within 4.4%, which is corroboration rather than conflict", and
  suggested keeping the Bosch price as a cross-check on Horme's. That was wrong
  on both counts. Henrison went back to the two listings and found two separate
  problems sitting inside the same comparison. Bosch's $140 EXCLUDES tax, so the
  comparable Singapore figure is $152.60 once 9% GST goes on, while Horme's
  $134.06 already includes it; and the two boxes do not hold the same thing,
  because Bosch bundles a 23-piece bit set while the Horme listing explicitly
  says batteries and charger only. The real gap is therefore about 14% for more
  equipment, not 4% for the same equipment, and the comparison is not a
  cross-check at all — it is two different products quoted on two different tax
  bases. Both errors happened to point the same way, which is what made the
  false agreement look convincing: a quick glance would have returned a
  reassuring 4% and hidden both. Horme stays, and the ordering of the reasons is
  worth keeping because the obvious one is the weakest. First, the app models
  borrowing a drill, and a bit set is not a drill but a consumable you would buy
  either way, so bundling it would charge the bits to the tool and overstate the
  money saved. Second, Horme is a real Singapore retail transaction in SGD with
  GST in it, which is the quantity the card claims. Only third, and only once the
  first two have established that the two prices describe the same object, does
  "it is lower so it claims less" apply. That is the project's stated tie-break
  but it is not a licence to compare a kit against a bundle. The consequence of
  getting it wrong would have reached further than the money tile, because §4d
  derives the water figure from this price: the card would have shown 399 L
  instead of 350 L, a 14% overstatement of a number already only good to an
  order of magnitude. Recorded in §4b as the fourth instance of the same failure
  in this project — after the wheat-versus-bread water figure, the two
  incompatible price bases in §3 and the bare-tool-versus-with-battery weights —
  every one of which was a qualifier going unread rather than a digit being
  mistyped.
- 2026-09-09 (§4d closed) — Henrison verified the water derivation, which had to
  be verified differently from every other section because §4d is not a page to
  open but a four-step calculation to re-do. He went to Ingwersen et al. (2022)
  and checked the two load-bearing assumptions directly: Equation 10 defines
  Phi as producer price divided by purchaser price, and the paper states that
  purchaser price is producer price plus sale and transportation margins, which
  confirms the direction of the adjustment and the margins explanation the whole
  step rests on. He also confirmed the deflator input on FRED independently,
  PCU333991333991 at June 2025 = 288.571. Three documentation fixes followed, none
  of which move the number. First, the wording: this project had been calling Phi
  a "purchaser-to-producer" ratio while every source — Eq. 10 and useeior's format
  spec both — uses the opposite word order, producer:purchaser. The arithmetic was
  never wrong, since producer divided by purchaser is a number below 1 and 0.4565
  is what we multiply by, but a checker searching for the source's phrase would
  have found ours reversed and concluded we had the direction backwards. Corrected
  in both factors.js and the checklist, along with a note that the model actually
  intends Phi for the opposite journey — converting its own coefficients rather
  than the spend — which is mathematically the same single multiplication and
  gives the same 350.4 L either way, but is the reverse of the documented use case
  and should not be presented as following the manual. Second, and more important
  for honesty about sources: the claim "per 2012 producer-price dollar" is
  evidenced in two different places and only one of them is the workbook. The
  dollar year is in the file, on the General Information sheet, and Rho being
  exactly 1 for 2012 corroborates it. The producer-price basis is NOT in the
  workbook anywhere — it comes from the paper. Both files now say so explicitly,
  because claiming the workbook states something it does not is precisely the
  overstatement this checklist exists to catch. Third, the Rho question, which a
  marker who knows USEEIO would ask: the model ships its own deflator, so using a
  BLS series looks like ignoring it. We could not use it — Rho spans 2002 to 2018
  and stops eight years short of a 2026 price. Going outside the model was forced
  rather than chosen, and that is now documented instead of merely being true.
  Henrison also tested the deflator input itself, considering January 2012
  (183.400) against the 2012 annual average (184.44): 348.45 L against 350.43 L,
  a 0.56% difference of about two litres that both round to 350 at the precision
  we store. He kept the annual average on the argument rather than the arithmetic,
  since USEEIO's dollar year is the whole of 2012 and a single month would import
  a seasonal wobble the model does not have. Recorded as a considered-and-rejected
  decision, because "we checked and it did not matter" is itself a finding: it
  establishes the figure is not sensitive to that choice. With §4d ticked, every
  figure that reaches a screen has now been read off its source by a person.
  Only §5 and §6 remain, and neither is on screen.
- 2026-09-09 (§5, §6 and a hole in §8) — Henrison verified the last two sourcing
  sections, §5's four Singapore national figures and §6's two Green Plan targets,
  which means every figure in factors.js is now both sourced and read off its
  source by a person. The job this checklist was created to track is finished.
  Asked what §7 to §11 needed next, the honest answer turned out to be that most
  of them cannot be "verified" at all: §7's assumptions, §9's design parameters
  and §10's mock scenario data are not claims about the world but our own choices
  and inventions, and they are closed by being written into the report's
  methodology, not by opening a page. That is now stated at the top of the
  document so nobody works down the list expecting sources that do not exist.
  §8 is the exception and it turned out to be worse than recorded. It listed one
  EV charger tariff and missed a second — "4 bays, level 5. Roughly $0.55 per
  kWh" at Clementi Mall — along with a dozen other invented specifics attached to
  real, named, findable Clementi addresses: the community centre's opening hours,
  a Bloobox collection schedule, a claim that two real blocks belong to the real
  SolarNova programme, and "roughly 60 spaces" of bicycle parking at NUS High,
  which is our own school and therefore the most embarrassing of the set. The
  file header disclaims whether each facility EXISTS but says nothing about
  tariffs, hours or schedules, which read as researched detail rather than
  scene-setting. The table has been rebuilt from the file and ranked by how fast
  a marker could catch each one. A gap register that under-counts is worse than
  no register, because it reads as though the gap has been measured. The fix is
  recorded as one decision covering all twelve rather than twelve small ones,
  with the cheapest option recommended: extend the file header to cover the
  detail text as well. What must not happen is leaving a specific number attached
  to a real address with no disclaimer, which is the only option with no defence.
- 2026-09-09 (§7) — Bread and portion size. `breadLoafKg` stops being an
  assumption and becomes a product spec: 0.4 kg is the exact stated net weight of
  Gardenia Enriched White Bread 400 g, a real named product on Gardenia's own
  Singapore site, whose nutrition panel corroborates itself at 7 servings x 57 g
  = 399 g, with Sunshine's 400 g loaf on the same shelf confirming it as a
  standard size rather than a one-off. Same upgrade the drill's mass got in §4b.
  It is a Claude-found lead and stays unticked until a person opens the page.
  `weeksPerYear` and `monthsPerYear` are arithmetic and need nothing. Candidate
  sources offered for the meat portion were evaluated and did not survive: the
  general lesson, which is §4b's in another costume, is that a source can be
  perfectly reputable and still not state the quantity you need, so check it
  states YOUR quantity before citing it. On the portion itself a correction was
  needed to something said earlier in this session: HPB does NOT decline to give
  gram figures. HealthHub states one plainly — "1 palm-sized piece of meat, fish
  or poultry (90g)" — and what My Healthy Plate declines to dictate is how many
  servings a person needs, not what one weighs. That makes our 150 g about 1.7
  HPB servings, so it cannot be called a serving in the report. The method for
  settling it is now written into §7 in order: fix the basis first (our factors
  are all per kg as purchased, since the price is a shop price per kg of raw
  meat, so the portion must be raw weight), anchor to the one Singapore authority
  available, then resolve cooked versus raw — which is the open question, because
  HealthHub does not say which its 90 g is and "palm-sized piece" reads like the
  cooked piece on the plate. A cooking-loss conversion stays unapplied because we
  have no sourced figure for it and inventing one is precisely what this project
  forbids. The leverage is what makes this matter: both swap cards scale linearly
  with this number, so 150 g to 90 g cuts every CO2, water and money figure on
  them by 40%, from 1,398 kg to 839 kg and $134.94 to $80.96 on the beef-to-
  chicken card at two meals a week. Three options are recorded with 90 g cited to
  HPB recommended, being the only one with a Singapore authority behind it and no
  invented conversion, erring downward if the 90 g turns out to be cooked. The
  tension is stated rather than hidden: HPB's figure is what a health authority
  recommends while the app models what somebody actually eats, and nobody
  publishes observed Singapore main-meal portion masses on a purchased-weight
  basis, so no option is both sourced and observational. The value is unchanged
  at 0.15 pending the team's decision.
- 2026-09-09 (portionKg resolved) — Standardising the cards to 1 kg was considered
  and rejected, and the reasoning is worth keeping because the idea was a good
  one. It would have dissolved the problem rather than solved it: every factor is
  already per kg, so removing the portion multiplier would have left the swap
  cards fully traceable with no unsourced arithmetic at all. It was rejected on
  product grounds rather than sourcing grounds. The feature is specified as "what
  if I replace beef with chicken twice a week", so meals a week is not the
  packaging but the feature itself, and this app exists to close a value-action
  gap by making a payoff personally visible — nobody plans to swap one kilogram
  of beef. It also could not have applied to the drill card, which counts objects,
  or the bread card, which is now properly sourced in loaves, so it would have
  made the app less internally consistent rather than more. The old layout stays.
  What did change is the portion itself. The blocker had been that converting
  HPB's serving to a raw weight meant inventing a cooking-loss factor, which this
  project forbids. Henrison verified the loss — meat loses 25 to 30% of its mass
  in cooking — so the conversion became legitimate and portionKg moved from an
  invented 0.15 to a derived 0.12: HPB's 90 g palm-sized serving divided by 0.75,
  taking the low end of the verified range because it yields the smaller portion
  and therefore the smaller claim. The interesting part is why we corrected at
  all instead of just adopting HPB's 90 g, which would have been the more
  conservative number and briefly looked like the right answer. Using it would
  have set a COOKED weight against factors that are all RAW — the price is a shop
  price per kg of raw meat, and Poore & Nemecek and Mekonnen & Hoekstra are per kg
  of primary product. That is a basis mismatch, the single error class that has
  now caught this project four times, and deliberately introducing a fifth in the
  name of caution would have been the wrong lesson to draw from those four.
  Matching the basis outranks claiming less. Because the cards scale linearly with
  this number the effect is a flat 20% cut across both swap cards: beef to chicken
  at two meals a week goes from 1,398 kg CO2, 173,004 L and $134.94 to 1,118 kg,
  138,403 L and $107.95. Two things stay open and are recorded as such. HPB does
  not state whether its 90 g is cooked or raw — the Nutrition Hub page, the Know
  Your Servings photo guide and the Recommended Dietary Allowances page were all
  checked and none of them says — so the cooked reading is an interpretation
  resting on "palm-sized piece" describing the plate portion and on 90 g matching
  the international 3 oz cooked convention. If that reading is wrong the figure
  overstates by 33%, and that is now the weakest link in the chain. Separately,
  the 25-30% cooking loss still needs a named source for the bibliography: it was
  verified rather than invented, but this checklist records where a figure came
  from and that reference is not yet written down.
- 2026-09-09 (mass-for-mass swap recorded) — The swap cards use ONE kgPerYear for
  both sides, modelling the replacement of X kg of one food with X kg of another.
  That had never been written down in the code or the checklist, and it is fine
  for beef to chicken — same place on the plate, similar protein density — but
  not for beef to tofu, where tofu carries roughly half the protein per gram and
  a real portion swap would use about twice the mass of tau kwa. What makes it
  worth recording rather than shrugging at is that the assumption is not neutral:
  it flatters us. Crediting the swap for replacing beef with less tofu than a
  person would actually eat makes the saving look bigger, so correcting it lowers
  our own numbers — CO2 barely moves at 3% because tofu's carbon is tiny either
  way, but water and money each fall about a fifth, from 160,892 L and $182.83 to
  129,405 L and $143.52 at two meals a week. Three solutions are recorded in §7 in
  order of preference. Best is serving-for-serving using HPB's own equivalence,
  because HPB already supplies the 90 g meat serving and treats tofu as a protein
  alternative in the same group, so a one-serving-for-one-serving swap is exactly
  what the card already claims and needs no source beyond the one we cite; we
  could not find HPB's tofu gram figure but did not exhaust their material, and
  the schools programme guidelines are the likeliest place to look. Failing that,
  equal protein, with the densities themselves sourced from HPB's own Energy and
  Nutrient Composition of Food database rather than the rough 13-against-26 grams
  per 100 g used illustratively in the checklist table, which is explicitly marked
  as not yet sourced and not for the report. Third, keep equal mass and declare
  it, which costs nothing and is a legitimate stated limitation rather than a
  hidden one. Options 1 and 2 share the same code change — portionKg stops being
  one shared number and becomes per-food so the mass given up and the mass taken
  on are computed separately — which is contained to impact.js and factors.js with
  no UI change, but it is still a change to the calculator's core arithmetic with
  under two weeks to the deadline. For now the assumption is declared in both the
  checklist and a comment on foodSwap, and the decision is left to the team.
- 2026-09-09 (§7 settled, §9 and §10 closed) — Option 1 was chosen for the swap
  problem and it turned out to answer two open questions at once, from a document
  we had already half-read. HPB publishes a full serving list, and extracting it
  properly gave both a meat serving of 90 g and, crucially, the tofu equivalences
  we had been missing: 170 g for soft tofu and 200 g for taukwa. portionKg is
  deleted. Each food now carries its own serving in a new SERVING_KG table and a
  swap is one serving for one serving, which is what the cards always claimed and
  which needs no source beyond the one already cited. The same list also reversed
  the 120 g figure set a few hours earlier. That number came from treating HPB's
  90 g as a cooked weight and dividing by the verified cooking loss, and the full
  list shows the reading was wrong for two reasons visible in the list itself:
  HPB writes "cooked" explicitly where it means cooked, in the pulses and soy
  bean entries, and does not in the meat, fish, poultry, prawn, egg or tofu ones;
  and "3 eggs (150g)" is 50 g an egg, the standard raw edible weight of an egg
  without its shell, which a cooked-weight list could not produce. "Edible
  portion" is a refuse adjustment, not a cooking one, so these are as-purchased
  weights and match our factors exactly. No cooking correction is applied. The
  verified 25-30% loss was not wasted — it is what sent us back to the full list
  — but it is not needed and no longer needs a bibliography entry. Taukwa's 200 g
  was chosen over tofu's 170 g on two arguments pointing the same way: the tofu
  price is sourced from Fortune Tau Kwa so 200 g matches the price basis, and the
  larger serving means more tofu bought and a smaller claimed saving. Beef to
  chicken now reads 839 kg CO2, 103,802 L and $81; beef to tofu reads 865 kg,
  91,806 L and $101, verified by running the real estimate() over every habit
  rather than recalculating by hand. Worth noticing that the tofu card changed
  shape and not just size: it now saves more carbon than the chicken swap but
  less water, because you buy twice the mass of tau kwa and tofu's water
  footprint is not negligible even though its carbon is. The old equal-mass model
  hid that crossover entirely. §9 was closed by writing all nine design
  parameters up with report-ready justifications, mostly harvested from prose
  already in pairing.js, nudges.js and impact.js rather than rewritten; the taper
  is flagged as the one to lead with, being the only parameter that encodes an
  ethical decision rather than a display choice, and the rejected alternative of
  detecting families or shared addresses is on the record as profiling. §10 was
  closed by adding the missing word to recipes.js, which disclaimed its times and
  its lack of CO2 claims but never actually said the recipes were invented while
  every other mock file said so. §8 is deliberately left last at the team's
  request, being the only item that means engaging with real-world data.
- 2026-09-09 (serving sizes corrected against the photo guide) — Henrison pointed
  at HPB's "Know Your Servings: Photo Guide", the current page for this, last
  reviewed 25 July 2025. Its serving figures live inside images, so a text fetch
  returned nothing and the page had to be opened in a browser and read visually.
  Doing that produced two corrections, and neither came from new reasoning —
  both came from reading more of the source instead of working from a related
  document. First, tofu was 200 g, taken from "2 square pieces of taukwa (200g)"
  in a DIFFERENT HPB document; the photo guide lists only "2 blocks of soft tofu
  (170g)" and carries no taukwa line at all, so tofu is now 0.17. Second, a 40 g
  cheese serving had been added from that same other document, and the photo
  guide's Meat/Others group contains no cheese, so it is removed rather than
  sourced from a second place — nothing in the app swaps cheese anyway. The
  citation had also been conflating two separate HPB documents under a single
  URL, which is exactly the failure this checklist exists to catch and was ours.
  The full Meat/Others group is now quoted verbatim in both the code and the
  checklist so nobody has to trust that we took the whole list rather than one
  convenient line. The cooked-or-raw question is reopened rather than closed,
  because the photo guide supplies evidence both ways: HPB writes "cooked"
  explicitly for lentils and noodles and not for meat, which argues raw, but the
  photographs beside the 90 g line show a grilled fish fillet and a griddled
  chicken breast, which argues cooked. An argument made earlier today is
  withdrawn: we had claimed the eggs line settled it because "3 eggs (150g)" is
  50 g of raw shelled egg, but the photo shows boiled eggs and a boiled egg
  weighs about what a raw one does, so eggs cannot distinguish the readings and
  that reasoning must not reach the report. We keep the published 90 g with no
  cooking correction, since a correction could only increase the claim and we
  cannot evidence it. One new open item is recorded: the tofu price is sourced
  from Fortune Tau Kwa, firm pressed beancurd, while the serving is now HPB's
  soft tofu — different products at different prices per kg. Tau kwa costs more,
  so the mismatch overstates the tofu's cost and understates the money saved,
  which is conservative but is still the fifth basis mismatch this project has
  hit. Closing it means either re-sourcing the price to soft tofu or returning to
  the taukwa serving and keeping the current price. The tofu card now reads 875
  kg CO2, 99,678 L and $111 at two meals a week, verified by running the real
  estimate() rather than by hand; the chicken, bread and drill cards are
  unchanged.
- 2026-09-09 (provenance of the withdrawn serving figures) — Asked which website
  the earlier serving sizes had actually come from, and the answer was neither
  the page Henrison supplied nor the page factors.js cited. Re-extracting the
  downloaded file confirmed that taukwa 200 g, cheese 40 g, tofu 170 g, poultry
  90 g and eggs 150 g all came from a PDF at
  ch-api.healthhub.sg/api/public/content/57f166e599504aedaf7d06e7323b0065 —
  HealthHub's content-delivery API rather than a page — reached from a
  search-result listing titled "Examples of 1 serving are: What's on My Healthy
  Plate". No HealthHub page showing taukwa or cheese was ever opened. What
  factors.js cited instead was healthhub.sg/programmes/nutrition-hub/eat-more,
  which was genuinely fetched but supplied only the 90 g meat line; the rest of
  the list was attached to it. The figure itself may well be real, since the PDF
  is on an HPB domain and is unmistakably a My Healthy Plate infographic, but it
  carries no extractable date so we cannot say whether it is current or
  superseded, and it was published in our code under another document's address.
  That is worse than a wrong number: a source is a claim about where a figure
  came from, and that claim was false. Anyone checking would have opened the
  cited URL, found no taukwa line, and reasonably concluded we invented it. The
  exact provenance is now written into §7 rather than being left as "a different
  HPB document", along with the rule it yields — cite the page you actually
  opened, and if you cannot give it a date and a human-readable URL, treat it as
  a lead rather than a source. Worth noting for the report that this happened
  while writing the very section that warns about this failure mode.
- 2026-09-09 (tofu price re-sourced, cheese not found on the page) — The tofu
  basis mismatch is closed. FOOD_PRICE_SGD.tofu was a tau kwa price while the
  serving is HPB's soft tofu, so it was re-sourced from a fresh FairPrice search
  and is now $3.17/kg from Fortune Silken Tofu (Japanese), 300 g at $0.95,
  corroborated by three further 300 g/$0.95 lines. The mismatch turned out to be
  worth about 1%: firm tau kwa sits at $3.13-3.16/kg, within a cent of the soft
  product. That is worth a sentence in the report, and not the obvious one — the
  point is not that we worried about nothing, it is that we only know it was
  nothing because we checked. The same instinct applied to the drill's price
  found a 14% gap hiding behind an apparent 4% one, and applied to the bread
  water figure found the number for raw wheat instead of bread. A mismatch
  costing 1% and a mismatch costing 33% look identical until somebody opens the
  page. The card is unchanged at $111 after rounding. Separately, the photo guide
  was re-opened and its "1 Serving of Meat/Others" group stepped through in small
  increments with no gaps, to check a suggestion that 40 g of cheese is also one
  serving. It is not on that page. The complete group is: 1 palm-sized piece
  fish, lean meat or poultry (90g); 2 blocks of soft tofu (170g); 3/4 cup cooked
  lentils, peas or beans (120g); 3 eggs (150g); 1 handful of almonds (28g); 2
  glasses of milk (500ml). The 40 g cheese line does exist, but in the undated
  ch-api PDF we agreed to stop relying on, so adding it would reintroduce exactly
  the source we just removed. Nothing in the app swaps cheese in any case, so no
  cheese serving is defined and none is needed. Also noted while scrolling: HPB
  labels cooking state wherever it matters — "uncooked oatmeal", "raw non-leafy
  vegetables", "cooked lentils", "cooked wholegrain noodles" — and the meat line
  still says neither, which keeps the cooked-or-raw question genuinely open
  rather than resolved in either direction.
- 2026-09-09 (cards relabelled to servings) — The swap cards now read "servings a
  week" rather than "meals a week". This is a copy change and no number moved:
  HPB's guidance is that a quarter plate of protein at each meal meets the daily
  2-3 servings, so a meal already carried exactly one serving and the arithmetic
  was already correct. Saying "servings" makes the screen agree with SERVING_KG
  and removes the question of whether a meal might hold two. The slider max stays
  at 14, which is 2 servings a day and the lower end of HPB's range; the ceiling
  HPB implies would be 21, and 14 was kept deliberately as the conservative bound
  since nobody swaps every serving they eat. Making the change surfaced a
  copy/data mismatch that had been created earlier the same day: the tofu card
  still read "Tau kwa, tau pok, or a plain block - all count", which stopped
  being true the moment the serving moved to HPB's soft tofu and the price was
  re-sourced to soft tofu. The words named the firm product while every number
  described the soft one. It now reads "Two blocks of soft tofu - one HPB
  serving." That is the same failure as the rest of this section, one layer up:
  we had been checking that factors matched their sources and missed that the
  copy describing those factors had stopped matching them. The rule for the
  report is that a data change is not finished until the copy describing it has
  been re-read.
- 2026-09-09 (meat serving converted to raw, 90 g -> 120 g) — The NHS's meat
  nutrition page was supplied as evidence on the cooked-or-raw question and it
  shifted the balance, so the meat servings are now converted from HPB's
  published 90 g to 120 g raw using a 25% cooking loss, the low end of the
  verified 25-30% band. Two things the NHS page genuinely establishes, and one it
  does not. It establishes a convention: dietary authorities state meat portions
  in cooked weight and say so, the NHS writing "more than 90g (cooked weight) of
  red or processed meat a day", which is what makes the cooked reading of HPB
  plausible. It also supplies a citable cooking-loss ratio we previously lacked,
  because its own worked example "grilled 8oz beef steak - 163g" is 227 g raw
  yielding 163 g cooked, a loss of 28.1%, independently inside the range the team
  verified. What it does NOT establish is anything about HPB's intent, and there
  is a trap worth naming: the NHS 90 g and the HPB 90 g are not the same
  quantity at all. The NHS figure is a daily cap on red and processed meat while
  HPB's is one serving of any protein, of which HPB recommends two or three a
  day. The numbers coinciding is a coincidence and must not be written up as two
  authorities agreeing. The evidence against the cooked reading still stands and
  is kept in both files rather than deleted: HPB labels cooking state everywhere
  else in the same guide, writing cooked rice, uncooked oatmeal, raw non-leafy
  vegetables and cooked lentils, and says neither for meat. An earlier argument
  that the eggs line settled it as raw is withdrawn, since the photo shows boiled
  eggs and a boiled egg weighs about what a raw one does. The conversion applies
  to meat only; tofu, eggs and milk are already as-purchased weights and scaling
  them would invent a correction. This is now the most-revised number in the
  project, having been 150 g, 120 g, 90 g and 120 g again in a single day, every
  move driven by new evidence rather than new opinion, and the checklist now says
  plainly that the report must present it as a judgement under uncertainty with
  the sensitivity quoted rather than buried: both swap cards scale linearly with
  it, so if the 90 g was already raw every food figure is overstated by 33%.
  Beef to chicken moves from 839 kg to 1,118 kg CO2 and beef to tofu from 875 kg
  to 1,186 kg at two servings a week.
- 2026-09-09 (checklist and brief cleaned up) — The checklist was cut from 1,501
  lines to 629 and CLAUDE.md from 299 to 244, on the principle that the document
  should carry the numbers, where they came from and why we used them, and not
  the story of what we considered and rejected along the way. Removed: the two
  candidate sources that failed, the Bosch-versus-Horme comparison, the deflator
  alternative that was tested and rejected, the "why not Rho" section, the
  revision history of the meat serving, the withdrawn eggs argument, the Source
  needed chip narrative, and the mass-for-mass problem now that it is solved.
  Kept, because they describe what a number means or how far it can be trusted:
  the withdrawn-versus-consumptive distinction on the drill's water, the 33%
  sensitivity on the meat serving, the green-water dominance in the food figures,
  the basket-not-a-crop caveat on the vegetable aggregates, and the survey's six
  limitations. Every source URL is preserved and the sources index is intact. §8,
  §9 and §10 are all marked unverified at the team's instruction, including §9
  and §10 which are read-throughs rather than lookups — nobody has done the
  read-through yet, so the boxes stay empty. Two figures were also demoted to
  unverified in the process because they changed after the team last checked
  them: the tofu price, re-sourced from tau kwa to soft tofu on 9 Sept, and
  everything in §7. CLAUDE.md now ends with a "Next task" section pointing at §8,
  and the sourcing rules it carries are reduced to the three the project actually
  learned: cite the page you opened, check the qualifier rather than the number,
  and treat a data change as unfinished until the copy describing it has been
  re-read.
- 2026-09-09 (§8 disclaimed in the file headers) — Took the cheapest of the three
  routes §8 offered for the twelve invented `detail` strings and the walk times in
  `facilities.js`. The old header disclaimed one thing only, whether each facility
  exists at that spot, and the gap was that it said nothing about the specifics
  written into `detail` — the $0.55 per kWh at Clementi Mall, the community
  centre's 9am to 9.30pm, the Bloobox emptied every Tuesday and Friday, the 14
  garden beds, the 60 bicycle spaces. Those are the dangerous ones precisely
  because they are attached to real, findable addresses: a marker could go and
  check one, and would find we made it up. The header now names all three kinds
  of invention separately — existence, walk times, and the detail specifics —
  says not to quote a detail line as a finding, and asks anyone who does check an
  entry to write beside it where they checked, so a later reader can tell a
  checked entry from an invented one. `listings.js` already said ALL INVENTED at
  the top, so its two rental prices were covered; its `price` field now says on
  its own line that it is a plausible asking price rather than a market rate we
  looked up. What this does not do is worth stating plainly in the report,
  because it is the honest limit of the cheap option: a comment disclaims to
  whoever opens the file, and nobody watching the demo opens the file. The screen
  is unchanged, so on screen these still look exactly as authoritative as the
  Poore & Nemecek figures. The two costlier routes — softening the specifics, or
  checking two or three against real data — stack on top of this one rather than
  competing with it, and §8 keeps the twelve rows as the worklist if either is
  taken. The checklist's status row for §8 now reads "invented, now disclaimed in
  the file headers" and its verified box stays empty, since nobody has read the
  new header yet, and CLAUDE.md's next-task section was rewritten to match rather
  than left pointing at work already done.
- 2026-09-09 (two decisions recorded, and the ring exploit written up) — Two
  design decisions and one newly found exploit are now on the record in
  docs/source-checklist.md, which gained a §12 for anti-misuse. The first
  decision is that points redeem for grocery vouchers rather than
  sustainable-goods-only. The reasoning is our own survey: cost was the barrier
  ranked first at 4.37 out of 5 with 28 of 52 respondents rating it maximum, so a
  reward that reduces grocery spending targets the barrier residents actually
  named rather than the one we would prefer them to name. The alternative was
  considered properly and rejected rather than ignored — restricting redemption
  to sustainable goods would confine any farming to behaviour we promote, which
  is a real advantage, but it is a weaker incentive against the barrier the
  project set out to address. The accepted cost is that a cash-equivalent reward
  is what makes farming worth attempting at all, and the two decisions have to be
  presented together in the report or each looks careless alone. The second is the
  circulating ring: because the taper in pairing.js is per pair, a household of
  six is 15 distinct pairs, each good for two full-rate exchanges before it
  tapers, so one drill can circulate indefinitely without anyone using it. Each
  pair yields 2.75 times the base points across the full sequence, so 15 pairs
  extract about 41 times one listing's points from a single item, roughly 619
  points for a drill lent at 15. This is precisely the case pairing.js declined to
  catch, and seeing it has not changed the decision: catching a ring means
  social-graph analysis, which is the profiling the file exists to refuse, and any
  rule sharp enough to catch a colluding household also catches a real one, since
  six people sharing one drill for a year is exactly what the app is for and the
  difference between the two cases is intent, which is not on the phone. The
  standing answer is therefore to bound the rewards and not identify the users.
  The mitigation that fits it is a per-week points cap, which bounds the payoff
  globally rather than per relationship and profiles nobody; it is not built,
  because the build phase closed before the exploit was found and a cap firing on
  stage would read as a bug. §12 states plainly that no cap of any kind exists in
  SessionProvider.jsx, so the tempting report sentence — that the payoff is too
  small to be worth sustained fraud — is false as the code stands and must not be
  written until either the cap exists or the sentence is rewritten to say the
  payoff is unbounded. Recorded alongside it, for future development rather than
  this prototype, is what changes at national scale: on a platform like Healthy
  365 household composition is already known through Singpass and HDB records, so
  the profiling we rejected stops being technically hard and becomes a policy
  decision instead of a technical one, and the objections we would still raise are
  consent context (data given for housing was not given for policing rewards),
  that it penalises genuine household sharing, and the participation cost of
  surveillance in an app whose purpose is raising civic engagement. §12 also
  carries the class-of-problem framing that the app cannot verify a physical fact,
  with a table of what each of the three mechanisms actually does — the handover
  code raises effort, the taper bounds reward per pair, the photo rule is a social
  deterrent — and none of them verifies anything. §9's taper row now says
  explicitly that it bounds reward per pair and does not address multi-party
  circulation, pairing.js carries the same limitation beside the TAPER constant
  where anyone tempted to weaken it will read it first, and CLAUDE.md records both
  decisions so a later session does not re-litigate them. One further hole found
  while checking the ring is listed in §12 as undecided rather than quietly
  omitted: an unclaimed shelf item has no partner, so the taper is skipped
  entirely and the item's own code is printed on screen by the demo hint, letting
  one person on one phone collect full points on a seeded item. Newly posted items
  are not exposed, since requests is 0 and no code box appears. Nothing was built
  this task and no box was ticked.
- 2026-09-09 (§9 verified, and §12's checkbox made honest) — Henrison read
  through the design parameters and §9 is now ticked, taking the outstanding list
  from six items to five. The more useful part of the task was a question the team
  asked while ticking it: what is there to verify in §12 when the idea was ours?
  The answer is that nothing in a decision needs verifying by the person who made
  it — there is no source to open, and *bound the rewards, do not identify the
  users* stands or falls on whether it convinces a reader, not on whether it
  matches a document. But §12 is not all decision. Three things in it came from
  Claude and are exactly the kind of thing this project has been caught by before:
  the arithmetic (15 pairs, 2.75 times base per pair, about 41 times a listing's
  points, roughly 619 for a drill lent at 15), the claims about what the code
  does (no cap in SessionProvider.jsx, the taper skipped when there is no partner,
  the bananas card paying full points to one person on one phone), and whether a
  few sentences of the team's reasoning came back as a section that still says
  what they meant. §12's checkbox now names those three rather than asking
  vaguely for a read-through, and points out that the cheapest check on the second
  is to open the app and tap the banana card's code box. The drill's 15 points was
  confirmed against listings.js while writing this, so the 619 figure is at least
  internally consistent; it still needs a person. The general rule worth keeping
  is that a section mixing the team's judgement with Claude's arithmetic needs its
  checkbox to say which half is being ticked, or the tick means nothing.
- 2026-09-09 (the self-credit hole confirmed by test) — Henrison tested the
  banana card on Henrison's phone, entered 3948, tapped Confirm handover and
  watched 30 points land with no second person involved, with before and after
  screenshots. The code was checked against foodShelf.js and the bananas item's
  handoverCode is indeed '3948', so the test hit the intended item and the
  self-credit hole is now evidenced rather than asserted — a real improvement on
  a Claude claim about the code, and the second point of §12 is ticked as verified
  by test rather than by reading. Two sub-claims bundled into that point are NOT
  covered by the test and have been separated out rather than swept along with it.
  First, the test cannot show that the taper was skipped as opposed to applied at
  full rate, because the seeded pair count for Henrison and Mr Lim is 1 and
  TAPER[1] is 1, so both paths pay exactly 30 and the observation cannot
  distinguish them; that claim still rests on reading Share.jsx, where partner is
  null and effectivePoints is item.points unconditionally. Second, a single
  30-point award is consistent with a cap set above 30, so the no-cap claim still
  rests on reading the eight lines of SessionProvider.jsx. Worth recording too:
  the exploit cannot be repeated in this build, because bananas is the only
  self-creditable item on Henrison's phone — carrots-celery is past its date and
  expired items show no code box, and newly posted items carry requests 0 and show
  "Nobody has claimed this yet" instead. That bound is a fact about the mock data
  rather than about the design, and saying so is what stops it being quoted as a
  mitigation. The general point for the report is that a test verifies exactly
  what it exercises: watching the number 30 appear proved the hole exists and
  proved nothing at all about the two mechanisms that were supposed to have
  stopped it.
- 2026-09-09 (§12 verified, and 619 demoted to an upper bound) — Henrison checked
  the ring arithmetic by hand — 6 x 5 / 2 = 15 pairs, the taper summing to 2.75,
  15 x 2.75 = 41.25, times 15 points = 619, with lend = 15 confirmed against
  listings.js — and read the write-up for faithfulness. Both pass, so §12 is now
  ticked in full: arithmetic by hand, code claims by test, write-up by reading.
  The check produced one correction and it is the interesting part of the task.
  The figure was written as though 619 points were what a household of six would
  earn, when 15 is every pair that COULD exist among six people and the total
  assumes all 15 actually exchange, which no real household does. It is a ceiling,
  not an expectation, and it now reads "up to 619 points" everywhere with a
  warning saying why the words are doing work. Quoting it as an expected figure
  would have been the same error this document keeps catching in sourced data — a
  bound presented as a measurement — arrived at from the opposite direction, since
  every input was correct and only the sentence around them was wrong. The ceiling
  is still the right number to design against, because a mitigation has to hold at
  the worst case, and that is now said explicitly so nobody softens the figure on
  the grounds that it is unrealistic. Worth noting for the report that all three
  verification methods in §12 were different — hand arithmetic, a test with
  screenshots, and a careful read — and that the read was the one that caught the
  error, on a number the other two had already confirmed was correct. §12's
  remaining items are decisions rather than verifications: whether to build the
  per-week cap, and what to do about the self-credit hole. The outstanding list
  stands at five, of which one is a decision and four are checks.
- 2026-09-09 (§10 ticked; §7 and §11b left open) — Henrison read through the mock
  scenario data and §10 is ticked, so §9, §10 and §12 are all verified and the
  outstanding list is down to four. One note was added rather than left implicit:
  the reason given for §10 being low-risk was that the demo audience knows it is a
  prototype, but §10's warning is aimed at the report rather than the audience,
  where nobody is standing there knowing anything. The tick stands, since the
  section was read; the reasoning should not be carried into the write-up. §7 and
  §11b were described as fine as well, and were deliberately NOT ticked. Neither
  is a read-through: §7 is four lookups on HealthHub and Gardenia, including the
  meat serving that changed four times in one day and carries a 33% sensitivity on
  every food figure on screen, and §11b's figures live in a responses spreadsheet
  that is not in the repo and cannot be checked from here at all. The standing
  rule that a tick means a team member opened the source was written precisely for
  the end of a long session, so it was applied at the end of a long session. The
  team's instruction to move on to §8 tomorrow is recorded in CLAUDE.md, which now
  says §9, §10 and §12 are done and names §7 and §11b as still open.
- 2026-09-10 (§8 worklist built) — Turned §8 from a ranked list of twelve invented
  details into a worklist that can be worked through. The reframe is that the
  existing ranking, by how quickly a marker could check a claim, is not the same
  question as what a person can actually do in a day, so the twelve are now
  bucketed three ways. Bucket A is published somewhere and checkable at a desk:
  the CC opening hours, the two EV tariffs, the allotment waiting list, the
  Community in Bloom garden, and the two solar claims. Bucket B is not published
  but is walkable — the NUS High bicycle count, which Henrison can literally go
  and count as a student there, and the MRT hub's before-9am claim, with a note
  that one visit is an anecdote and grounds to soften rather than to assert.
  Bucket C is the useful part: the Blk 726 bin overflowing on Sunday nights and
  Clementi Woods being noticeably cooler at midday cannot be verified by anybody,
  the first because it is a claim about recurring behaviour with no source and the
  second because it would need instruments and repetition, so chasing them wastes
  the day and softening is the only honest close. Every row carries pre-drafted
  fallback wording, which is the column that matters most: a lookup that fails now
  costs nothing because the replacement text is already written, and each fallback
  keeps the scene-setting while dropping only the falsifiable specific — "roughly
  $0.55 per kWh" becomes "paid charging", "14 beds" becomes "raised beds", "60
  spaces" becomes "sheltered racks near the school gate". The where-to-look column
  is explicitly labelled as leads rather than sources, since Claude has opened
  none of those pages and the project's own rule is that a lead becomes a source
  when a team member opens it and can give it a date and a URL. Two field-level
  rows are recommended for no action with reasons: the walk times because the
  screen already hedges with "about" and the header now disclaims them, and the
  two rental prices because an asking price is an invented neighbour's offer
  rather than a claim about the world. If the day runs short the three worth
  having are the CC hours, the Clementi Mall tariff and the Blk 445
  free-for-30-minutes line, the first because it is fastest and the other two
  because a tariff is the most plausible-looking invented figure in the file.
- 2026-09-10 (facilities.js checked against official datasets) — Pulled seven
  official datasets and checked all fifteen facilities.js entries against them,
  changing nothing in the file as instructed. NEA Recycling Bins (12,578 points),
  NEA E-waste Recycling (718), NParks Community in Bloom (1,772), NParks Park
  Connector Loop (878), NParks Parks and Nature Reserves (462), LTA Bicycle Rack
  (396) and HDB Carpark Information, all from data.gov.sg on 10 Sept, with Blk 442
  Clementi Ave 3 geocoded through OneMap to 1.314123, 103.764519 as the reference
  point. One of the four datasets the team asked for could not be pulled: LTA
  DataMall's EV charging points require an AccountKey issued only to registered
  subscribers, so neither EV entry can be confirmed or refuted from open data, and
  registering is the way to close that if the team wants it. Three findings
  matter. Blk 330 Clementi Ave 4 does not exist — Blk 330 is on Clementi Avenue 2,
  365 m east — which also undermines the Blk 301 entry's claim of being in the
  same SolarNova cluster, since the two are on different streets about a kilometre
  apart. Blk 726 Clementi West St 2 is a market and hawker centre, not a housing
  block, so "void deck bin" is wrong, and it is absent from the recycling-bin
  dataset while its neighbours 705 to 731 are all present, which in a 12,578-point
  file is meaningful absence rather than a gap in coverage. And there is no plain
  Blk 441 Clementi Ave 3 at all: OneMap and the bin dataset both return only 441A
  and 441B, Clementi Towers. Three entries came back confirmed real with
  coordinates — the Clementi MRT bicycle racks, Ulu Pandan Park Connector and
  Clementi Woods Park — though the racks are recorded as Single type, which
  contradicts our "two-tier racks" wording. A distinction worth keeping is that
  absence means different things in different files: the bin dataset covers
  essentially every HDB block so a missing block is evidence, while the bicycle
  rack file has 396 points islandwide and proves nothing by omission. Community in
  Bloom was also read carefully rather than loosely: it registers community
  gardens, not allotments, so the Sunset Way hit does not confirm the "rented
  plots" claim, and no garden is registered at Blk 352 Clementi Ave 2, which turns
  out to be a shopping centre. Five pins could be moved to real coordinates rather
  than invented ones, including a genuine registered garden at NUS High School
  that the app does not currently show. Separately, the check made the walk times
  checkable for the first time and six of fifteen are out by more than 2.5 minutes
  in both directions — Clementi Mall is shown as 8 minutes and is 103 metres away,
  Ulu Pandan as 4 and is 849 — so the dashboard's nearest-first ordering is
  currently wrong; recomputing them from real coordinates would now be arithmetic
  rather than invention. The three decisions the team took before the check are
  recorded in §8 as taken: the Blk 726 line reframed as aggregated resident
  reports sourced from the app's own report-a-problem flow, which is the version
  that connects to the argument that the app surfaces infrastructure gaps nobody
  collects; Clementi Woods taking the plain fallback; and Bucket B closed with
  physical verification judged unwarranted for a prototype demonstrating
  feasibility rather than usability. Two of those three are now complicated by the
  data, which is noted beside each rather than silently folded in.
- 2026-09-10 (facilities.js corrected against the datasets) — Acted on the
  dataset comparison. Four pins moved to real coordinates: Blk 441 to 441A, since
  the plain 441 does not exist and OneMap returns only 441A and 441B; Blk 330 from
  Clementi Ave 4, which does not exist, to Clementi Ave 2; the Blk 352 garden to
  the registered Community in Bloom garden at 1.313711, 103.769796, since Blk 352
  turned out to be a shopping centre with no garden registered; and Blk 726 to Blk
  706, because 726 is a market and hawker centre with no void deck and is absent
  from a bin dataset that lists all its neighbours. Blk 301's claim to be in the
  same SolarNova cluster as Blk 330 was removed, since the corrected addresses put
  them on different streets about a kilometre apart. The Clementi MRT racks are
  now described as sheltered single-tier, which is what LTA records, correcting a
  two-tier claim we had invented. NUS High's registered Community in Bloom garden
  was added as a new entry — real, in the dataset, and our own school. Both EV
  entries keep their existence, now sourced to Revolt.sg checked by Henrison on 10
  Sept, with the tariff claims removed: the Clementi Mall card reads "paid
  charging" and the Blk 445 card drops the free-first-30-minutes line. Revolt is
  recorded as an aggregator, good for existence but not the citation we would use
  for a price, where the operator's own page would be needed. Every walkMinutes is
  now computed rather than guessed, from straight-line metres at 80 m/min with a
  floor of one minute, which moved twelve of the sixteen entries and fixed a
  dashboard whose nearest-first ordering had been showing the closest facilities
  as the furthest — Clementi Mall was listed at 8 minutes and is 103 metres away.
  The file header was rewritten because it had stopped being true: it said
  everything in the file was invented, which is no longer the case, so it now
  separates the eight dataset-confirmed entries from the four that exist with
  unverified detail and the four that no public dataset can confirm or refute,
  and it records that walkMinutes is computed and that x and y are decorative
  rather than a projection. Two things are flagged rather than quietly fixed. The
  bay counts on both EV cards, four bays and two bays, are still invented — Revolt
  confirms the stations exist, not how many bays they have — and Blk 445's card
  says ground level while HDB records C19M as a multi-storey car park. Three
  detail lines still carry an invented specific and stay on the outstanding list:
  Blk 443's collection days, the CC's opening hours, and the Sunset Way waiting
  list, which is additionally suspect because the CIB dataset shows a community
  garden there and an allotment is a different NParks scheme.
- 2026-09-10 (walk times measured and replaced) — Henrison measured all sixteen
  walking times from Blk 442 on Google Maps and they are now in facilities.js,
  replacing the straight-line figures computed earlier the same day. The headline
  finding is that the computed step understated every single entry: all sixteen
  measured times came out equal to or longer than the straight-line estimate, and
  the average was roughly double. That is a systematic bias rather than scatter,
  which is the useful thing to say about it — the arithmetic was not merely
  imprecise, it was wrong in a predictable direction, because a real walk bends
  around blocks and waits at crossings while a straight line does neither. The
  worst case was Blk 706 in Clementi West, computed at 11 minutes and measured at
  25, which fits the fact that getting there means crossing a major road. The
  number now has three generations on the record — guessed in August, computed
  from dataset coordinates on 10 Sept, measured on 10 Sept — and the checklist
  keeps all three in one table, since the sequence shows each step was cheap and
  each one moved the answer. One entry is flagged for re-checking rather than
  accepted: Blk 445 is 109 metres away in a straight line but measured 7 minutes
  on foot, a fivefold detour that sits oddly beside Blk 441A at 65 metres and 2
  minutes and Blk 443 at 73 metres and 3 minutes, so Maps may have routed to a car
  park entrance on the far side. Something else surfaced from the measurements
  that nobody had asked for: the team supplied driving times for the two EV points
  and cycling times for the two bicycle parks, which is a real observation, since
  nobody walks to an EV charger. Those are recorded in §8 but not shown, because
  the field is called walkMinutes and the screen says "walk", and putting a
  driving time behind a label that says walk would be exactly the copy/data
  mismatch this project keeps catching. Whether to show a per-type travel mode is
  written up as an open design question rather than acted on, since the build
  phase is closed. The facilities.js header was rewritten again for the same
  reason as this morning: it described walkMinutes as computed at 80 m/min, which
  had stopped being true the moment the measured values landed.
- 2026-09-10 (all four travel modes read from Google Maps by Claude) — Drove the
  browser to read walking, cycling, driving and public transport times for all
  sixteen facilities from Block 442, and recorded them in §8 as unverified leads
  rather than putting them in facilities.js, since a Claude reading is a lead and
  Henrison's own measurements are the stronger provenance. One page load per
  destination turned out to give all four modes at once, because the Maps mode bar
  shows a time under each icon, so the job was sixteen loads rather than
  sixty-four. Three things came out of it that matter more than the times. First,
  the flagged Blk 445 outlier is explained: routed to the dataset coordinate, Maps
  resolves it to Blk 445 Multi-storey Car Park C19M — the exact car park the HDB
  dataset named — and gives 1 minute walking for 109 metres, against the 7 minutes
  measured by hand. Second, two of our coordinates do not point where we think.
  Both come from line and polygon datasets where a single coordinate is a vertex
  rather than a place, so the Ulu Pandan coordinate resolves to a playground at
  Blk 340/343 Clementi Ave 5 and the Clementi Woods coordinate resolves to Kent
  Vale Parking on Clementi Road. Searching those two by name instead gives the
  park and the connector properly, and 30 minutes rather than 35 for the park.
  That is the point-versus-line-or-polygon version of the check-the-qualifier
  rule, and it means neither coordinate should be quoted as the facility's
  location even though neither pin is wrong on the map. Third, and worth a
  paragraph in the report: Claude's walking times run consistently longer than
  Henrison's, thirteen of sixteen by two to four minutes, with NUS High out by
  eight and ten and Blk 445 out by six the other way. The cause is almost
  certainly that we searched differently — Claude routed to dataset coordinates
  while a person types an address, and for a school campus or a car park those
  points can sit hundreds of metres apart. So "measured on Google Maps" sounded
  like one well-defined act and is not: the answer depends on what you typed, and
  two people following the same instruction on the same day differed by up to ten
  minutes. A method has to specify the destination, not just the tool. Nothing was
  changed in facilities.js, which keeps Henrison's numbers, and the note in §8
  says whoever verifies should settle the method first and then read all sixteen
  the same way.
- 2026-09-10 (coordinate method chosen; the nearest-first claim examined) — The
  team settled the destination method as coordinates rather than addresses, which
  had two consequences. The two bad coordinates were replaced with better ones of
  the same kind rather than by searching a name: Clementi Woods now uses the
  centroid of its 198-vertex polygon and Ulu Pandan uses the nearest point on the
  connector line rather than the nearest line vertex. The connector behaves well,
  the on-line point giving 22 minutes and matching the by-name search exactly, but
  the park exposes something the method cannot fix. Clementi Woods has three
  defensible answers — 30 minutes searched by name, 35 to the old polygon vertex,
  36 to the centroid — and the method-correct centroid is arguably the least
  realistic of the three, since nobody walks to the middle of a park. A
  point-based distance to an area-based facility is a category error that no
  choice of point resolves, and that is now written down rather than smoothed
  over. The larger finding came from the team's own question, which was whether
  these are really the nearest facilities. They are not, and the datasets show it
  plainly. Fifteen recycling bins sit within 200 metres and the app shows one of
  them; there is a bin at Blk 442 itself, the resident's own block, zero metres
  away, and the app does not show it, which for an app whose purpose is removing
  the I-don't-know-where-to-go barrier is close to the opposite of the point. Four
  registered community gardens are closer than the one we display. And there is no
  e-waste facility type at all, despite NEA recording four collection points
  within 211 metres and despite the brief naming e-waste drives as an event type.
  Bicycle parking is correct and the park choice is defensible as a category
  judgement. The important framing is that this is a claim the interface makes
  rather than one a card states: the dashboard sorts by walkMinutes and presents a
  nearest-first list, and sorting invented pins by measured distances produces a
  list that is precise and wrong, where the precision of the minutes makes the
  selection look comprehensive when it is not. Three options are recorded with the
  note that they are not equally honest — state it as a limitation, rebuild
  facilities.js from the datasets, which is now data entry rather than invention
  since coordinates and names all exist, or at minimum add the missing e-waste
  type. No code was changed; the decision is the team's.
- 2026-09-10 (facilities.js rebuilt from the datasets; report form made
  type-specific) — Took option 2 from §8 and rebuilt the facility list from the
  official data rather than stating the gap as a limitation. Sixteen hand-invented
  entries became twenty-two, of which seventeen are dataset-confirmed, and the
  work was data entry rather than invention because every coordinate, name and
  address already existed in the files pulled that morning. The headline change is
  that the nearest recycling bin is now the one at Blk 442, the resident's own
  block, which is the single most useful thing the dashboard can say and was
  absent from the old list entirely. A new e-waste type was added, with three NEA
  collection points including one at Clementi Mall 103 metres away, closing a gap
  the brief itself implied since it names e-waste drives as an event type. The
  community gardens are now the four genuinely nearest registered ones plus NUS
  High, replacing a garden we had placed at what turned out to be a shopping
  centre. One entry was removed rather than kept: the NUS High bicycle parking is
  not in LTA's rack data, and while that file has only 396 points islandwide and
  proves nothing by omission, an unevidenced entry had no place in a list rebuilt
  on evidence — it was dropped for being unevidenced, not disproven, and can be
  restored if someone looks. Two types still have no dataset behind them at all,
  water refill points and per-block solar, and those four entries are labelled in
  the file header as the honest remainder. walkMinutes now carries two
  provenances, fourteen entries reusing coordinates already measured on Google
  Maps and eight new ones estimated at straight-line metres divided by 40, a rate
  calibrated from the measured readings rather than a guess at walking speed, with
  the eight named in §8 as needing measurement. The report-a-problem form was also
  made type-specific, which the team asked for on the grounds that an EV charger
  cannot have an overflowing bin. Each type now carries its own problems list, so
  a charger offers not-working, bay-blocked-by-a-non-EV, cable-damaged and
  payment-failed while a park connector offers path-blocked, surface-broken,
  lighting-out and overgrown. Something else is appended by the form to every list
  rather than stored per type, so it cannot be forgotten or duplicated, and it
  opens a free-text box that must be filled before the report can be sent, since
  an unexplained something-else tells a town council nothing. Doing this surfaced
  a pre-existing bug worth a line in the report: FacilitySheet never unmounted,
  because Dashboard passes the facility as a prop and the component returns null
  when it is absent, so its state survived between facilities and a report sent
  about one bin left the next marker showing "report logged". Dashboard now passes
  a key so the sheet remounts per facility. The bug predates this change and
  nobody had noticed, because with one shared problem list the wrong-type symptom
  was invisible — the per-type lists made a latent bug visible, which is an
  argument for specificity in its own right. Verified by running the dev server
  and stepping through the screen: 22 pins render, the E-waste chip appears, an EV
  charger offers only EV problems, Something else opens the box and disables Send
  until it has text, and tapping a bin afterwards shows bin problems with nothing
  carried over.
- 2026-09-10 (water refill and solar closed as illustrative) — The team decided
  not to chase the two facility types that no public dataset covers. Water refill
  points and per-block rooftop solar are now labelled ILLUSTRATIVE in the
  facilities.js header and excluded from the verification worksheet, with the
  reasoning recorded rather than left implicit: unlike a tariff or an opening
  time, these cannot be confirmed OR refuted at any amount of effort, because
  there is no source that would settle them either way, so putting them on a
  verification list would be putting an unanswerable question on a deadline. The
  header now says plainly that this is a decision and not a to-do. Recorded
  alongside it for future development is the more useful observation, which is
  that the fix is a different facility type rather than more research: reverse
  vending machines for drink containers are a real scheme with real published
  findable locations, they carry exactly the same where-is-my-nearest-one idea
  the water cooler was standing in for, and they connect to the recycling
  behaviour the app exists to make convenient. The generalisable lesson, worth a
  line in the report, is that water coolers and per-block solar were the wrong
  things to map rather than badly researched ones, and that when a prototype
  needs a data layer, choosing a category somebody actually publishes is a design
  decision rather than a research shortcut. Also confirmed while checking: the
  rebuild had already cleared the three detail strings that were previously on the
  outstanding list, since Blk 443's collection days and the CC's opening hours
  were rewritten and the Sunset Way entry no longer exists. A verification
  worksheet covering the eight estimated walk times, the dataset-confirmed
  facilities worth spot-checking and the Bloobox framing question was produced in
  the chat at the team's request rather than as a file.
