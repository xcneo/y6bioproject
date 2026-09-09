# Source checklist — every figure the app shows

**The rule: a box is ticked only when a team member has opened the source and
read the number with their own eyes.** Claude finding a source is a lead, not a
verification. That rule exists because when the team first checked Claude-sourced
figures, four were wrong.

**"On screen?"** means the figure reaches a rendered screen through
`src/lib/impact.js`. Off-screen figures still matter for the report, but they
cannot be wrong in the demo.

---

## Status

| Section | Sourced | Verified by a person |
|---|---|---|
| 1. Food CO₂ — `FOOD_CO2` | ✅ | ✅ **team, 7 Sept** |
| 2. Food water — `FOOD_WATER` | ✅ | ✅ **team, 7 Sept** |
| 3. Food prices — `FOOD_PRICE_SGD` | ✅ | ✅ **team, 7 Sept** — except `tofu`, re-sourced 9 Sept |
| 4. Manufacturing CO₂ | ✅ | ✅ **Henrison, 9 Sept** |
| 4b. Drill price and mass | ✅ | ✅ **Henrison, 9 Sept** |
| 4d. Drill water | ✅ | ✅ **Henrison, 9 Sept** |
| 5. Singapore national figures | ✅ | ✅ **Henrison, 9 Sept** |
| 6. Green Plan targets | ✅ | ✅ **Henrison, 9 Sept** |
| 7. Servings and assumptions | ✅ | ⬜ **not yet** |
| 8. On-screen numbers outside `factors.js` | ⚠️ invented, now disclaimed in the file headers | ⬜ **not yet** |
| 9. Design parameters | n/a — our choices | ✅ **Henrison, 9 Sept** |
| 10. Mock scenario data | n/a — invented | ✅ **Henrison, 9 Sept** |
| 11. Value–action gap in the brief | ✅ | ✅ **Henrison, 9 Sept** |
| 11b. Our own survey | ✅ our own data | ⬜ **not yet** |
| 12. Anti-misuse limits | n/a — our decisions | ✅ **Henrison, 9 Sept** — arithmetic by hand, code claims by test |

### Outstanding

| # | Item | Section |
|---|---|---|
| 1 | **The `detail` strings and walk times** — headers now disclaim them; decide whether to soften or check the twelve on screen | §8 |
| 2 | Confirm the serving figures, the bread loaf and the tofu price | §7, §3 |
| 3 | Write §7's assumptions and §9's parameters into the methodology | §7, §9 |
| 4 | **Two open decisions, not verifications** — whether to build the per-week cap, and what to do about the self-credit hole | §12 |

---

## 1. Food greenhouse gas — `FOOD_CO2`

**Source:** Poore, J. & Nemecek, T. (2018), "Reducing food's environmental
impacts through producers and consumers", *Science* 360(6392), pp. 987–992 — as
tabulated by Our World in Data, "Environmental Impacts of Food Production".
https://www.science.org/doi/10.1126/science.aaq0216 ·
open access https://ora.ox.ac.uk/objects/uuid:b0b53649-5e93-4415-bf07-6b0b1227172f ·
erratum https://pubmed.ncbi.nlm.nih.gov/30792276/

**Why this source:** one study for every food, so the numbers are comparable with
each other — which matters, because the calculator works on the *difference*
between two foods. Mixing sources here would be worse than slightly stale data.

**Basis:** global averages, farm to retail, per kg of food as purchased.

| ☑ | Key | Value (kg CO₂e/kg) | On screen? |
|---|---|---|---|
| ☑ | `beef` | 99.48 | **Yes** — both swap cards |
| ☑ | `lamb` | 39.72 | No |
| ☑ | `cheese` | 23.88 | No |
| ☑ | `pork` | 12.31 | No |
| ☑ | `chicken` | 9.87 | **Yes** — swap card 1 |
| ☑ | `eggs` | 4.67 | **Yes** — "since January" panel |
| ☑ | `rice` | 4.45 | No |
| ☑ | `milk` | 3.15 | **Yes** — panel |
| ☑ | `tofu` | 3.16 | **Yes** — swap card 2 |
| ☑ | `tomatoes` | 2.09 | **Yes** — panel |
| ☑ | `bread` | 1.57 | **Yes** — food-saved card + panel |
| ☑ | `bananas` | 0.86 | **Yes** — panel |
| ☑ | `otherVegetables` | 0.53 | **Yes** — panel |
| ☑ | `rootVegetables` | 0.43 | **Yes** — panel |

**Limitations to state:**

- Global averages. Singapore imports over 90% of its food, so a Singapore figure
  would differ.
- `milk` 3.15 and `tofu` 3.16 are genuinely near-identical, not a copy-paste
  error. Quoting them to two decimals is what shows that.
- **The panel differs by phone.** `eggs`, `milk`, `tomatoes`, `bananas` and
  `rootVegetables` appear only on Henrison's; `otherVegetables` only on Mr Lim's.
  Check which phone you are on before screenshotting.

---

## 2. Food water footprint — `FOOD_WATER`

**Two papers, not one** — split into two constants in `factors.js` so each figure
points at the right one.

**Crops** — Mekonnen & Hoekstra (2011), *Hydrology and Earth System Sciences* 15,
pp. 1577–1600, doi:10.5194/hess-15-1577-2011
https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf

**Animals** — Mekonnen & Hoekstra (2012), "A Global Assessment of the Water
Footprint of Farm Animal Products", *Ecosystems* 15, pp. 401–415,
doi:10.1007/s10021-011-9517-8
https://waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf

**Basis:** total **consumptive** footprint — green (rain) + blue (irrigation) +
grey (dilution), per kg of product. Cite the journal papers, not the Value of
Water report-series versions, and there is no ambiguity.

### Animal products — 2012 paper

| ☑ | Key | Value (L/kg) | Green + blue + grey | Table |
|---|---|---|---|---|
| ☑ | `beef` | 15,415 | 14,414 + 550 + 451 | T1, weighted avg |
| ☑ | `pork` | 5,988 | 4,907 + 459 + 622 ("Pig meat") | T3, p. 409 |
| ☑ | `cheese` | 5,060 | 4,264 + 439 + 357 | T1, weighted avg |
| ☑ | `chicken` | 4,325 | 3,545 + 313 + 467 | T3, p. 409 |
| ☑ | `eggs` | 3,265 | 2,592 + 244 + 429 | T3, p. 409 |
| ☑ | `milk` | 1,020 | 863 + 86 + 72 | T3, p. 409 |

### Crop products — 2011 paper

| ☑ | Key | Value (L/kg) | Table entry |
|---|---|---|---|
| ☑ | `tofu` | 2,523 | "Soya curd" 2397 + 83 + 44 |
| ☑ | `rice` | 2,172 | "Rice, husked (brown)" 1488 + 443 + 242 |
| ☑ | `bread` | 1,608 | "Wheat bread" 1124 + 301 + 183 |
| ☑ | `bananas` | 790 | "Bananas" 660 + 97 + 33 |

### Aggregates — 2012 paper, Table 3

| ☑ | Key | Value (L/kg) | Table entry |
|---|---|---|---|
| ☑ | `otherVegetables` | 322 | "Vegetables" 194 + 43 + 85 |
| ☑ | `rootVegetables` | 387 | "Starchy roots" 327 + 16 + 43 |

**Limitations to state:**

- **Green water dominates every food figure** — 70% to 95% of each. That matters
  when comparing against the drill's water in §4d, which has none.
- `rice` is a **choice** among four table lines (paddy 1,673 / husked 2,172 /
  broken 2,497 / flour 2,628). We use husked brown. Say which one if quoted.
- `otherVegetables` and `rootVegetables` are **baskets, not specific crops**.
  `activity.js` uses `rootVegetables` for a bag of carrots — word it as "root
  vegetables", never "carrots".

---

## 3. Food prices — `FOOD_PRICE_SGD`

**Source:** NTUC FairPrice online store, https://www.fairprice.com.sg/ — listings
read **7 September 2026** (tofu re-read 9 September).

**Why this source:** one retailer on one date, so the foods are priced on a
comparable basis. Both meats are plain raw boneless meat sold for cooking.

| ☑ | Key | Value (SGD/kg) | Product |
|---|---|---|---|
| ☑ | `beef` | 17.80 | Tasty Food Affair Beef Shin Shank Cube, 500g @ $8.90 |
| ☑ | `chicken` | 9.15 | Hego Frozen Boneless Chicken Breast (Skinless), 1kg @ $9.15 |
| ⬜ | `tofu` | 3.17 | Fortune Silken Tofu (Japanese), 300g @ $0.95 |
| ☑ | `bread` | 5.50 | White bread, representative mid-range figure |

**Why the tofu figure changed (9 Sept).** It was a **tau kwa** price while the
serving in §7 is HPB's **soft tofu** — different products. Re-sourced to soft
tofu, corroborated by three further 300 g / $0.95 lines (Japanese Silken Omega 3
DHA, Silken Extra Smooth Box, Chinese Tofu Traditional). Firm tau kwa is within
1% at $3.13–3.16/kg, so the correction moved almost nothing — but that was only
knowable by checking. ⬜ **This one figure is Claude-sourced and unverified.**

**Limitations to state:**

- **Beef is chilled, chicken frozen.** Fresh boneless breast (~$19/kg) would
  erase the money saving. CO₂ and water are unaffected.
- `bread` at $5.50/kg is a **representative mid-range white-loaf figure** across a
  $5.17–$5.64 band, not one product's shelf price. Say so.

---

## 4. Manufacturing CO₂ — `MANUFACTURING_CO2`

**Source:** Edinburgh Tool Library, "Carbon Data for Sharing Libraries",
https://edinburghtoollibrary.org.uk/carbon-data-for-sharing-libraries/

| ☑ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☑ | `powerDrill` | 6.165 | kg CO₂e **per kg of tool** | **Yes** — drill card |

**Why this source:** it is per kilogram of tool rather than per dollar, which
means a drill bought on sale does not "emit" less.

**What it is built from — quote the derivation, not just the number.** It is
**derived, not measured**: the ICE database (Circular Ecology / University of
Bath), the UK Government GHG Reporting Conversion Factors 2020 (battery value
12.119, as ICE carries no battery figure) and Climate Impact Forecast (motors
under 500 W), combined on a stated composition of 30% battery, 15% motor, 15%
solid metal, 40% plastic/rubber.

**Cross-check that holds:** USEEIO's spend-based model gives 8.72 kg for the same
drill against Edinburgh's 6.10 — a factor of 1.4. For a spend-based model against
a process LCA that is agreement, not conflict. Keeping the two on separate bases
is what preserves the cross-check.

**Limitations:** a UK factor applied to a drill bought in Singapore and probably
made in China; and it is an estimate built from databases, not a measurement.

---

## 4b. The drill's price and mass — `ITEM_PRICE_SGD`, `ITEM_MASS_KG`

**Source:** Horme Hardware Singapore, "BOSCH 12V 2X2.0AH LI-ION DRILL DRIVER
GSR120-LI" — https://www.horme.com.sg/product.aspx?id=8991 (read 8 Sept, confirmed
9 Sept 2026)

| ☑ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☑ | `ITEM_PRICE_SGD.powerDrill` | 134.06 | SGD, incl. GST | **Yes** — money |
| ☑ | `ITEM_MASS_KG.powerDrill` | 0.99 | kg, **with battery** | **Yes** — CO₂ and waste |

**Why one listing for both:** the price and the weight have to describe the same
object. This is the cheapest drill on the shelf whose stated weight unambiguously
includes the battery.

**Why the battery must be in the weight:** §4's factor assumes a tool that is 30%
battery by mass, so multiplying it by a bare-tool weight would value the
battery's carbon at nothing — about a third of the figure, missing silently.

**Limitations to state:**

- The price is the **kit** — tool, two batteries, charger, case. That is what
  somebody who does not borrow actually pays, so it is right for a money-saved
  claim, but call it a kit.
- The mass is the tool **with one battery**, while the buyer takes home two
  batteries, a charger and a case. The material saved is therefore **larger** than
  we claim.
- Retail listings move. Re-check near the deadline and note the date.
- When comparing prices anywhere, **check the tax basis and the contents of the
  box before comparing the digits.** This has caught the project four times.

---

## 4d. The drill's water — `ITEM_WATER_L` = 350 L withdrawn

**Source:** US EPA, USEEIO v2.0.1 (`USEEIOv2.0.1-411.xlsx`), sheet `N`, column
`333991/US` — "Power tools", BEA *Power-driven handtool manufacturing* — row
**Freshwater withdrawals** = `12.36917396026797` kg per USD.
Creators: Ingwersen, W.; Li, M.; Young, B.; Vendries, J.; Birney, C.
Model paper: Ingwersen et al. (2022), *Scientific Data* 9:194,
https://www.nature.com/articles/s41597-022-01293-7

| ☑ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☑ | `ITEM_WATER_L.powerDrill` | 350 | litres **withdrawn** per drill | **Yes** — tile reads "Water withdrawn" |

### ⚠️ This is not the same quantity as the food water figures

The food figures (§2) are **consumptive** — water evaporated, transpired or
needed to dilute pollution, and 70–95% of each is green water, rain
evapotranspired by a crop. USEEIO gives **withdrawals** — water taken from a
river or aquifer, most of it power-station cooling water that goes straight back.

A drill factory grows nothing, so it has **no green water at all**, and the
figure contains **no grey water either** (checked in the model's characterisation
matrix `C`: the indicator is built from exactly two flows, fresh surface and
fresh groundwater, both at factor 1.0 — a pure volume-in count).

**The drill's 350 L and beef's 15,415 L/kg share no component.** Not even blue,
because blue is consumptive and this is withdrawal. That is why the tile is
labelled **"Water withdrawn"** and why that label must never be merged with the
food cards' "Water".

### The derivation — check this, not just the source

| Step | Factor | Result | Why |
|---|---|---|---|
| Shelf price (§4b) | — | SGD 134.06 | what a person pays |
| Remove GST | ÷ 1.09 | SGD 122.99 | a Singapore tax is not revenue to a US manufacturer |
| To USD | × 0.78942 | USD 97.09 | rate on 8 Sept 2026 |
| Deflate to 2012 USD | × 0.639155 | USD 62.06 | BLS PPI **PCU333991333991**, this exact industry: 2012 annual average 184.44 ÷ 288.571 (June 2025) |
| Price type | × 0.456537 | **USD 28.33** | USEEIO's own `Phi` matrix for 333991/US, 2012 |
| Apply coefficient | × 12.369174 | **350.4 L** | stored as **350** |

**Why each correction is needed:** the coefficient is per **2012 producer-price
dollar**, and the shelf price is a 2026 Singapore retail dollar. The largest
correction is the last: **only about 46% of a retail dollar is the manufacturer's
output**, the rest being retail margin, wholesale margin and freight, which belong
to other industries. Skipping all four would give 1,658 L — 4.7× too high.

**`Phi` is a producer:purchaser ratio** — producer price ÷ purchaser price, per
the model paper's Equation 10 and useeior's format spec. Use that word order; the
value is below 1 (0.45653746022562908 for this sector, checkable in the `Phi`
sheet).

**The BLS index is used because USEEIO's own deflator (`Rho`) stops at 2018** and
cannot reach a 2026 price. The substitute is the producer price index for the
same BEA industry.

**Where the basis is documented** — the two halves are in different places:

| Claim | Where |
|---|---|
| Dollar year is **2012** | ✅ in the workbook — `General Information` sheet: *"The US dollar (USD) year for the model data, where USD is used, is 2012."* |
| Basis is **producer price** | ❌ **not in the workbook** — in the paper: *"The 2012 BEA Detail Make and Use Tables Before Redefinitions in Producer's Price are used as the underlying IO tables."* |

**Limitations — all four go in the report:**

1. **Spend-based.** The same drill bought on sale would "use" less water. An
   artefact of the method, not physics.
2. **A US model** applied to a drill bought in Singapore, probably made in China.
3. **The deflator ends June 2025**, the last observation in the BLS series.
4. **Sector averages** — USEEIO knows "power tools", not a Bosch GSR120-LI.

Treat it as an order-of-magnitude screening estimate. **Write "roughly 350
litres", never "350 litres".**

---

## 5. Singapore national figures — `SINGAPORE`

None of these reach a screen — they are report material. Each is republished
yearly, so always quote the year.

| ☑ | Key | Value | Unit | Year | Source |
|---|---|---|---|---|---|
| ☑ | `gridEmissionFactor` | 0.402 | kg CO₂/kWh | 2024 | EMA via NCCS "Power" — https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/ |
| ☑ | `householdWaterPerPerson` | 141 | L/person/day | 2025 | PUB press release, 17 Mar 2026 — https://www.pub.gov.sg/Resources/News-Room/PressReleases/2026/03/Its-Everyones-Business-to-Make-Every-Drop-Count |
| ☑ | `domesticWasteGeneratedPerPerson` | 0.83 | kg/person/day | 2025 | NEA, Waste Statistics and Overall Recycling — https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling |
| ☑ | `domesticRecyclingRate` | 11 | per cent | 2025 | NEA, same page |

⚠️ **`domesticWasteGeneratedPerPerson` is waste *generated*, not *disposed*.** NEA
stopped publishing disposed-per-capita after 2015. Generated = disposed +
recycled, so it is the larger number. **Never call it "waste sent to the
incinerator".**

---

## 6. Green Plan 2030 targets — `GREEN_PLAN_TARGETS`

Targets, not measurements. Not on any screen. Targets get revised, so quote the
date you read them.

**Source:** Singapore Green Plan 2030, "Our Targets" —
https://www.greenplan.gov.sg/targets/ (read 9 Sept 2026)

| ☑ | Key | Value | Unit |
|---|---|---|---|
| ☑ | `householdWaterPerPerson` | 130 | L/person/day by 2030 |
| ☑ | `wasteToLandfillReduction` | 30 | % cut by 2030 (interim 20% by 2026) |

---

## 7. Servings and assumptions — `SERVING_KG`, `ASSUMPTIONS`

⬜ **Not yet verified by a person.**

### `SERVING_KG` — one HPB serving of each food

**Source:** Health Promotion Board, "Know Your Servings: Photo Guide", HealthHub,
last reviewed 25 July 2025 —
https://www.healthhub.sg/well-being-and-lifestyle/food-diet-and-nutrition/know-your-servings-photo-guide

Its **"1 Serving of Meat/Others"** group in full: *"1 palm-sized piece fish, lean
meat or poultry (90g)"* · *"2 blocks of soft tofu (170g)"* · *"¾ cup cooked
lentils, peas or beans (120g)"* · *"3 eggs (150g)"* · *"1 handful of almonds
(28g)"* · *"2 glasses of milk (500ml)"*.

**Why serving-for-serving:** the cards claim "same number of servings, different
food". A single shared portion would model swapping a mass of one food for the
same mass of another — fine for beef → chicken, wrong for beef → tofu, where a
real portion is about twice the mass, and wrong in the direction that flatters
us.

| ⬜ | Key | Value (kg) | From |
|---|---|---|---|
| ⬜ | `beef`, `lamb`, `pork`, `chicken` | 0.12 | 90 g cooked ÷ 0.75 — see below |
| ⬜ | `tofu` | 0.17 | "2 blocks of soft tofu (170g)" |
| ⬜ | `eggs` | 0.15 | "3 eggs (150g)" |
| ⬜ | `milk` | 0.5 | "2 glasses of milk (500ml)" |

Foods outside HPB's "meat and others" group (rice, bread, vegetables) have no
serving, and a swap involving them returns `unsourced` rather than a guess.

### ⚠️ The meat conversion, and its sensitivity

Our factors are all per kg of food **as purchased**, so the serving must be a raw
weight. We read HPB's 90 g as a **cooked** weight and convert: **90 ÷ 0.75 = 120
g**, using 25% — the low end of a verified 25–30% cooking loss, because it gives
the smaller claim.

**Why the cooked reading:** the photographs beside the line show a grilled fish
fillet and a griddled chicken breast; "palm-sized piece" describes a portion as
served; and dietary guidance states meat portions in cooked weight and says so —
the NHS writes *"more than 90g **(cooked weight)** of red or processed meat a
day"* (https://www.nhs.uk/live-well/eat-well/food-types/meat-nutrition/).

**Against it, and still standing:** HPB labels cooking state everywhere else in
the same guide — *"½ bowl **cooked** rice"*, *"⅔ bowl **uncooked** oatmeal"*,
*"100g **raw** non-leafy vegetables"* — and says neither for meat.

⚠️ **NHS's 90 g is not HPB's 90 g.** The NHS figure is a **daily cap** on red and
processed meat; HPB's is **one serving** of any protein, of which HPB recommends
2–3 a day. The numbers coinciding is a coincidence — do not write it up as two
authorities agreeing. The NHS page is used for two narrow things only: the
convention, and a citable cooking-loss ratio (*"grilled 8oz beef steak – 163g"* =
227 g raw → 163 g cooked, **28.1%**, inside the verified band).

**⚠️ Quote this sensitivity, do not bury it.** Both swap cards scale linearly, so
if the 90 g was already raw every food figure is overstated by a third:

| beef → chicken, 2 servings/wk | kg CO₂ | litres | money |
|---|---|---|---|
| 90 g — if already raw | 839 | 103,802 | $81 |
| **120 g — shipped** | **1,118** | **138,403** | **$108** |

The honest sentence: *we read HPB's 90 g as a cooked weight and converted it to
120 g raw to match our factors; on the alternative reading the figures are a
third lower, and HPB does not state which applies.*

**The conversion is meat only.** Tofu is sold uncooked, a boiled egg weighs what a
raw shelled one does, and milk is not cooked. Scaling those would invent a
correction.

### `ASSUMPTIONS`

| ⬜ | Key | Value | Source |
|---|---|---|---|
| ⬜ | `breadLoafKg` | 0.4 | **Gardenia Enriched White Bread, 400 g** — https://www.gardenia.com.sg/gardenia-enriched-white-bread-400g/ The pack's own nutrition panel corroborates it: 7 servings × 57 g = 399 g. Sunshine sells a second 400 g loaf, so it is a standard Singapore size. |
| ✅ | `weeksPerYear` | 52 | arithmetic |
| ✅ | `monthsPerYear` | 12 | arithmetic |

---

## 8. Numbers on screen that are **not** in `factors.js`

**Route 1 of the three below was taken on 9 Sept: the `facilities.js` header now
disclaims the `detail` strings and the walk times, not just whether each facility
exists.** `listings.js` already said "ALL INVENTED"; its `price` field now says so
on its own line too.

⬜ **Still not read through by a person, and the screen is unchanged.** A header
comment tells whoever opens the file. It tells nobody looking at the demo, where
these still sit outside the sourcing mechanism — no `source` field, no "Source
needed" chip if they are wrong, and on screen they look exactly as authoritative
as the Poore & Nemecek figures. That is the residual gap, and it is a fair
question to be asked in the presentation.

| ⬜ | Where | Value | What it claims |
|---|---|---|---|
| ⬜ | `facilities.js` → `walkMinutes` | 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 9, 11, 12, 14, 16 | Walking time from Blk 442 to each facility |
| ⬜ | `listings.js` → `price` | 8, 12 | Rental asking prices in SGD |

The walk times are the mildest of these: the screen already says "**about** 7 min
walk", and nobody reads a walk time as a measurement. The `detail` strings are the
larger part, because each attaches an invented specific to a **real, named,
findable Clementi address**. Ranked by how fast a marker could check one:

| ⬜ | Address | The claim |
|---|---|---|
| ⬜ | Clementi Mall car park | "4 bays, level 5. Roughly **$0.55 per kWh**." |
| ⬜ | Blk 445 Clementi Ave 3 car park | "2 bays, ground level. **Free for the first 30 minutes**." |
| ⬜ | Clementi Community Centre | "**Open 9am to 9.30pm**." |
| ⬜ | Blk 301 Clementi Ave 4 | "Part of the same **SolarNova** cluster as Blk 330." |
| ⬜ | Blk 330 Clementi Ave 4 | "Powers the lifts and corridor lighting for the block." |
| ⬜ | Blk 443 Clementi Ave 3 | "Emptied every **Tuesday and Friday**." |
| ⬜ | NUS High School | "Roughly **60 spaces**." |
| ⬜ | Blk 352 Clementi Ave 2 | "Open plot, **14 beds**. Volunteers weed **Saturday mornings**." |
| ⬜ | Sunset Way allotment | "Waiting list is usually **a few months**." |
| ⬜ | Clementi MRT bicycle hub | "Usually full before **9am on weekdays**." |
| ⬜ | Blk 726 Clementi West St 2 | "Often overflowing on **Sunday nights**." |
| ⬜ | Off West Coast Road | "Mature trees, **noticeably cooler** at midday." |

**The three ways to close it, cheapest first:**

1. ✅ **Extend the file header** so the `detail` text and walk times are covered
   too — **done 9 Sept**. Costs nothing and protects the report; changes nothing
   a user sees.
2. ⬜ **Soften the specifics** — "roughly $0.55 per kWh" → "paid charging". This
   is the one that reaches the screen. Still available, and the twelve rows above
   are the worklist for it.
3. ⬜ **Check them** against real data. If only some, do the two EV tariffs and
   the CC opening hours.

They stack rather than compete: 1 is a floor, and 2 or 3 can still be done on top.
The reason to consider 3 for two or three entries is that "we checked what we
could and disclaimed the rest" is a stronger sentence in the report than "we
disclaimed all of it".

Whichever you pick, **do not leave a specific number attached to a real address
with no disclaimer.** As of 9 Sept all twelve are disclaimed in the file that
holds them, and none is disclaimed on the screen that shows them.

---

## 9. Design parameters — decisions, not measurements

✅ **Read through and verified — Henrison, 9 Sept.** Nothing here needs a source;
it needs **stating** in the report. A parameter you have written down is a design
choice; one you have not is a magic number.

| ☑ | Where | Values | The justification |
|---|---|---|---|
| ☑ | `pairing.js` → `TAPER` | 1, 1, 0.5, 0.25, 0 | Full rate twice because real neighbours do exchange twice, then half, quarter, nothing — a colluding **pair** earns zero within a week while a generous one is barely touched. **Cap the points, never the sharing**: nothing blocks an exchange, only the reward tapers. ⚠️ **Scope:** it bounds the reward *per pair* and does nothing about multi-party circulation — see §12. |
| ☑ | `nudges.js` → `REPEAT_THRESHOLD` | 3 | "Three is a pattern; two is a coincidence." |
| ☑ | `nudges.js` → `END_OF_MONTH_DAY` | 25 | A month ends in its last few days. The rule is `dayOfMonth >= 25`, so the window is the last 7 days of a 31-day month, 6 of a 30-day one, 4 of February — not a fixed five. |
| ☑ | `nudges.js` → late-share ratio | 0.6 | Most of them, not just some — a couple of late entries is just a month passing. |
| ☑ | `events.js` → `pointsForAttending` | 20–60 | Scaled by effort. Credited **only once attendance is confirmed**, never for signing up. |
| ☑ | `foodShelf.js` → `points` | 30, flat | Flat on purpose. Varying it would imply we can rank how much waste each rescue avoids, which we cannot. |
| ☑ | `listings.js` → `points` | 0, 15, 20, 25, 40 | By type, and **who earns differs by type**: for lend/giveaway/swap/food the poster earns, for repair the helper earns, and for **rent nobody earns — money already changed hands.** |
| ☑ | `residents.js` → `points` | 1240, 860 | Demo opening balances so the redemption screen has something to spend. Not earned; they mean nothing. |
| ☑ | Redemption — **grocery vouchers**, not green-goods-only | Cost is the barrier our own survey ranked first, at **4.37/5 with 28 of 52 rating it maximum** (§11b), so a reward that reduces grocery spending targets the barrier residents named rather than the one we would prefer them to name. The alternative — restricting redemption to sustainable goods — was considered and rejected: it would confine any farming to behaviour we promote, but it is a weaker incentive against the barrier we set out to address. **The trade-off is deliberate and belongs in the report:** a cash-equivalent reward is what makes farming worth attempting at all (§12). |
| ☑ | `impact.js` → rounding thresholds | CO₂ 10 / 100 / 1000 · water 1000 / 10000 · waste 10 / 100 · money whole dollars | **Rounding is a claim about precision.** The factors are one or two significant figures, so the display rounds hard. Each unit has its own ladder — kg → t, L → m³ — so quoting a single set of thresholds understates it. Below 10 kg a decimal is kept, because "0 kg" beside a real saving reads as a bug. |

⚠️ **Lead with the taper.** It is the only parameter here encoding an *ethical*
decision: the alternative — detecting families, flatmates or shared addresses —
was rejected as profiling, because a phone cannot distinguish a colluding pair
from a generous one and the app has no business holding identity data.

---

## 10. Mock scenario data — plausibility only

✅ **Read through — Henrison, 9 Sept 2026.** No sourcing applies; these are the
invented world the demo runs in. Every file carries a header saying so, and all
eight were confirmed to.

| ☑ | Where | What |
|---|---|---|
| ☑ | `neighbourhoods.js` | Scores 81 / 76 / 68 / 64 / 59 / 52 |
| ☑ | `facilities.js` | Whether each facility exists at that spot; `x`/`y` map positions |
| ☑ | `activity.js` | Food weights (0.3–2.0 kg), borrow counts, events attended |
| ☑ | `events.js` | Titles, dates, venues |
| ☑ | `listings.js` | Items, prices, owners |
| ☑ | `foodShelf.js` | Items, expiry dates, owners |
| ☑ | `recipes.js` | Recipes, times, ingredient tags |
| ☑ | `residents.js` | Names and block numbers |

⚠️ **Real block numbers, invented facts.** The blocks and streets are real
Clementi addresses. Do not let the report imply anyone surveyed them, and do not
attach an invented resident to a real address in a way that reads as real.

`activity.js` drives the year-so-far panel, so its weights become the CO₂ total
on screen. Plausible, not measured — worth a line. **It is only "since January"
on Henrison's phone**; Mr Lim joined in July 2026, and his thinner history is
what makes the near-empty state demoable.

**All eight headers checked, 9 Sept.** Every file does carry its warning.
`events.js` was the weakest — it said "All invented" in passing, with no ⚠️ and
no mention that its venues (Blk 442's void deck, the Community Centre, Clementi
Mall) are real places. It now carries the same warning as `facilities.js` and
`residents.js`. The risk it closes is small but is the same one as §8: an
invented specific sitting on a real, findable address.

---

## 11. The value–action gap in the brief and README

**Source:** Singlife, *Sustainable Future Index 2024* — published 10 Feb 2025;
online survey of **1,000 Singaporeans and PRs aged 18–64**, fielded **June–July
2024**. Report PDF:
https://singlife.com/content/dam/public/sg/documents/about-us/sustainability-strategy/singlife-sustainable-future-index-2024.pdf ·
newsroom https://singlife.com/en/about-us/newsroom/2025/singlife-sustainable-future-index-2024

| ☑ | Claim | Value |
|---|---|---|
| ☑ | Feel sustainability is important | **7 in 10** |
| ☑ | Are actively contributing | **3 in 10** |

**Why we quote both figures rather than one.** The brief used to say "around 4 in
10 Singaporeans don't actively contribute despite valuing it". That number
appears nowhere in the survey — it was 7 minus 3, our own subtraction, and it
only lands on 4 if every one of the 3 who act comes from the 7 who value. It was
a lower bound presented as a measurement. Quoting the two published figures needs
no derivation to defend.

*Naming quirk:* the index is titled **2024** for its fielding year and published
**10 Feb 2025**, which is why its newsroom URL sits under `/2025/`.

**Wording limitation:** the report glosses this as a gap between *awareness* and
action; we call it a *value*–action gap. The question wording — "feel
sustainability is important" — supports our reading, but say so once.

---

## 11b. Our own survey

**The only source we collected ourselves**, so the method is ours to defend.
Keep `bio proj form (Responses).xlsx` with the report.

| | |
|---|---|
| **Fielded** | 21 Aug – 9 Sept 2026 |
| **n** | **52** |
| **Composition** | **47 Student, 4 Employed, 1 NS** |
| **Instrument** | Google Form, 12 questions — 2 yes/no, 1 free text, 9 rated 1–5 |
| **Scale anchors** | **1 = "not at all", 5 = "very much"** |

| Question | Result |
|---|---|
| Participated in a community/ground-up sustainability initiative | **No 46 (88.5%)** · Yes 6 (11.5%) |
| Civic engagement is *sufficient* | **mean 2.54** — 44 of 52 answered ≤3 |
| Barrier: cost | **mean 4.37** — 28 of 52 gave the maximum |
| Barrier: no dedicated community | mean 4.23 |
| Barrier: lack of information | mean 3.85 |
| Would use the app | **Yes 52 (100%)** — see limitation 1 |
| Likely to share it | mean 4.29 |
| Aim: encourage sustainable living | mean 4.44 |
| Aim: civic engagement | mean 4.40 |
| Aim: accessibility | mean 4.35 |

The six who had participated named: a school environmental interest group, a HEIG
mangrove and beach clean-up, SG Climate Rally, and a community centre workshop.

**Why this is worth more than a footnote.** Singlife's gap is the distance between
two *different questions*, and turning that into a value–action gap needs the
assumption that the actors sit inside the valuers. **Ours does not need that
assumption, because both halves were asked of the same 52 people.**

⚠️ **Q4 runs the other way to the rest.** It asks whether civic engagement is
*sufficient*, so its low 2.54 is the striking result. Quote it as *"rated the
sufficiency of civic engagement at 2.54 out of 5"*, never as "rated civic
engagement 2.54".

**Limitations — write these down before a marker finds them:**

1. **The 100% on "would you use this app" is not evidence of demand.** A unanimous
   positive, about our own project, asked mostly of our own classmates, is what a
   leading question and social desirability produce. **Report it and discount it
   ourselves.**
2. **Convenience sample.** 47 of 52 are students. The national claim rests on
   Singlife and must keep resting on it. Never write "our survey found that
   Singaporeans…".
3. **Self-selection.** People who answer a sustainability survey care more.
4. **Ceiling effects.** No respondent scored the three aims below 3, so the
   4.44 / 4.40 / 4.35 ordering is not meaningful. Do not rank them.
5. **n = 52 is small.** Quote counts alongside percentages.

---

## 12. Anti-misuse — what we bound, and what we did not

**What needs checking here, and what does not.** The decisions in this section are
the team's own — the voucher choice, and *bound the rewards, do not identify the
users*. Nobody needs to verify a decision they made; there is no external source
to open, and the argument stands or falls on whether it convinces a reader.

✅ **All three verified — Henrison, 9 Sept 2026.** Three things in this section
were Claude's, not the team's, and each needed a person:

1. ☑ **The arithmetic — checked by hand, Henrison, 9 Sept.** 6 × 5 / 2 = 15
   pairs; the taper sums to 2.75; 15 × 2.75 = 41.25; × 15 points = 619. `lend` =
   15 points confirmed in `listings.js`. **The check also corrected the framing**:
   15 pairs assumes every possible pair exchanges, which no real household does,
   so the figure is written as an upper bound throughout — see the warning below.
2. ☑ **The claims about the code — tested, not merely read. Henrison, 9 Sept**,
   with before/after screenshots. On Henrison's phone the `bananas` card's code
   box was given **3948** and Confirm handover tapped; **30 points landed with no
   second person involved.** The code matches `foodShelf.js` → `bananas` →
   `handoverCode: '3948'`, so the test hit the intended item. The self-credit
   hole is real and is now evidenced rather than asserted.

   ⚠️ **Two sub-claims the test does not reach, and neither is provable by
   repeating it.**

   - **That the taper was *skipped*, rather than applied at full rate.** The
     seeded pair count for Henrison–Mr Lim is 1, and `TAPER[1]` is 1, so a
     tapered path and an untapered path both pay 30. The test cannot tell them
     apart. The claim rests on reading `Share.jsx:49` and `:55` — partner is
     `null`, so `effectivePoints` is `item.points` unconditionally.
   - **That no cap exists.** One 30-point award is consistent with a cap set
     above 30. The claim rests on reading `SessionProvider.jsx:21–28`, which is
     eight lines and has no cap logic in it.

   **Nor can the exploit be repeated in this build**, which is worth knowing
   before anyone tries: `bananas` is the only self-creditable item on Henrison's
   phone. `carrots-celery` is past its date, and expired items show no code box;
   newly posted items carry `requests: 0` and show "Nobody has claimed this yet".
   So the hole is real but bounded at one item per demo — which is a fact about
   the mock data, not about the design.
3. ☑ **Whether the write-up says what the team meant — read, Henrison, 9 Sept.**
   The decision was given to Claude in a few sentences and came back as a section.
   Read for anything strengthened, softened or invented, particularly the Healthy
   365 objections and the blunt line about the payoff being unbounded. Passed as
   written, with the one phrasing correction in point 1.

It is the section most likely to be worth marks, because it is where the project
says what its own design cannot do.

**The class of problem.** The app cannot verify a physical fact. It cannot see
whether an item changed hands, whether a listing matches the thing in the
cupboard, or whether two people who met actually needed to. Every listing is
self-reported. So none of our three mechanisms verifies anything — they raise
**effort** or bound **reward**:

| Mechanism | What it does | What it cannot do |
|---|---|---|
| Handover code (`handover.js`) | Whoever is credited must type the OTHER person's four digits, so points need two people in the same place | Two people who agree to cheat can read codes down the phone. Stated in `handover.js` since 28 Aug |
| Taper (`pairing.js`) | Bounds the reward **per pair** — full, full, half, quarter, nothing | Nothing about three or more people. See the ring below |
| Photo rule (`NewListingSheet.jsx`) | Food cannot be listed without a photo, and which kind is recorded and shown | Upload is faked; no image is stored or compared. It is a social deterrent, not a mechanism |

### The circulating ring

**The exploit.** The taper is per-pair, so a household of six is 15 distinct pairs
(6 choose 2), each with two full-rate exchanges before it tapers. One drill can
circulate indefinitely without anyone ever using it. Taking the full taper
sequence, each pair yields 1 + 1 + 0.5 + 0.25 = **2.75 times the base points**, so
15 pairs extract **up to about 41 times one listing's points** from a single item
— **up to 619 points** for a drill lent at 15, before the ring even starts again
with a second item.

⚠️ **"Up to" is doing real work in that sentence.** 15 is every pair that *could*
exist among six people, and it assumes all 15 actually exchange. No real household
does that — some pairs never trade with each other. **619 is a ceiling, not an
expected figure**, and quoting it as what a household would earn would be the same
error this document keeps catching elsewhere: a bound presented as a measurement.
The ceiling is still the right number to design against, because the mitigation
has to hold at the worst case.

**This is the case `pairing.js` deliberately declined to catch**, and the decision
has not changed on seeing it.

**Our decision: bound the rewards, do not identify the users.** Two reasons, and
the second is the one that survives disagreement:

1. Catching a ring requires social-graph analysis — working out who is related to
   whom. That is the profiling `pairing.js` rejected, and it would mean holding
   identity data the app has no business holding.
2. **Any rule sharp enough to catch a colluding household also catches a real
   one.** A family passing a drill between six members over a year is the
   behaviour the app exists to encourage. A rule cannot tell the two apart,
   because the difference is intent, and intent is not on the phone.

**The mitigation we would add and did not build: a per-week points cap.** It is
the only measure that touches the ring, because it bounds the payoff globally
rather than per relationship, and it profiles nobody — the same ethical footing as
the taper. It was not built because the build phase closed before the exploit was
found, and a cap firing during the demo would read as a bug. ⚠️ **There is
currently no cap of any kind** — `earnPoints` in `SessionProvider.jsx` adds and
returns. Any sentence in the report arguing "the payoff is too small to be worth
sustained fraud" is **false as the code stands**, and must not be written until
either the cap exists or the sentence is rewritten to say the payoff is unbounded.

**Why this matters more given the voucher decision.** Redemption is grocery
vouchers (§9), which is cash-equivalent. That choice targets the barrier our
survey ranked first, and the cost of it is precisely that farming becomes worth
attempting. The two decisions have to be presented together or each looks
careless on its own.

### If this scaled to a government platform

Recorded for future development, not for this prototype. On something like Healthy
365, household composition is **already known** through Singpass and HDB records,
so the profiling we rejected stops being technically hard and becomes a policy
decision rather than a technical one. The objections we would still raise:

- **Consent context.** Data given for housing was not given for policing rewards.
  Lawful access is not the same as appropriate use.
- **It penalises genuine household sharing** — the same objection as above, except
  now enforced with real records rather than guesswork.
- **The participation cost of surveillance.** An app whose stated purpose is
  raising civic engagement damages that purpose by monitoring who lives with whom.
  Our survey already found "no dedicated community" a barrier at 4.23/5 (§11b);
  surveillance is not how that is lowered.

**Our answer holds at either scale: bound the rewards, do not identify the users.**
At prototype scale it is the only option available; at national scale it is the
one that should still be chosen.

### Also open, no decision taken yet

⚠️ **An unclaimed shelf item can be self-credited, with no taper.** Found 9 Sept
while checking the ring, and **confirmed by test the same day** — 3948 entered on
Henrison's `bananas` card paid 30 points with nobody else involved (see point 2
above for what the test does and does not establish). In `Share.jsx` the partner is `claims[item.id]?.by ?? null`,
so with no live claim there is no partner and **the taper is skipped entirely**;
`ShelfCard.jsx` falls back to the item's own code and `showHint` prints it on
screen. One person on one phone can therefore collect the full points on a seeded
item — `bananas`, `requests: 2`, is the live example. It is a labelled demo crutch
("Demo only: their code is …") and a **newly posted** item is not exposed, because
`requests: 0` shows "Nobody has claimed this yet" and no code box. The team has not
yet decided whether to leave it, and it is listed here so a limitations section
that claims to be complete actually is.

---

## Sources index

- Poore & Nemecek (2018), *Science* — https://www.science.org/doi/10.1126/science.aaq0216 · open access https://ora.ox.ac.uk/objects/uuid:b0b53649-5e93-4415-bf07-6b0b1227172f · erratum https://pubmed.ncbi.nlm.nih.gov/30792276/
- Mekonnen & Hoekstra (2011), **crops** — https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf (doi:10.5194/hess-15-1577-2011)
- Mekonnen & Hoekstra (2012), **farm animals** — https://waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf (doi:10.1007/s10021-011-9517-8)
- NTUC FairPrice online store — https://www.fairprice.com.sg/
- Gardenia Singapore, Enriched White Bread 400 g — https://www.gardenia.com.sg/gardenia-enriched-white-bread-400g/
- HPB / HealthHub, "Know Your Servings: Photo Guide" — https://www.healthhub.sg/well-being-and-lifestyle/food-diet-and-nutrition/know-your-servings-photo-guide
- NHS, "Meat in your diet" — https://www.nhs.uk/live-well/eat-well/food-types/meat-nutrition/
- Edinburgh Tool Library, "Carbon Data for Sharing Libraries" — https://edinburghtoollibrary.org.uk/carbon-data-for-sharing-libraries/
- Horme Hardware Singapore, Bosch GSR120-LI — https://www.horme.com.sg/product.aspx?id=8991
- US EPA, USEEIO v2.0.1 — model page https://www.epa.gov/land-research/us-environmentally-extended-input-output-useeio-models · paper https://www.nature.com/articles/s41597-022-01293-7
- BLS Producer Price Index, Power-Driven Handtool Manufacturing, PCU333991333991 — https://fred.stlouisfed.org/series/PCU333991333991
- NCCS, "Power" — https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/
- PUB press release, 17 Mar 2026 — https://www.pub.gov.sg/Resources/News-Room/PressReleases/2026/03/Its-Everyones-Business-to-Make-Every-Drop-Count
- NEA, Waste Statistics and Overall Recycling — https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling
- Singapore Green Plan 2030, Our Targets — https://www.greenplan.gov.sg/targets/
- Singlife, *Sustainable Future Index 2024* — https://singlife.com/content/dam/public/sg/documents/about-us/sustainability-strategy/singlife-sustainable-future-index-2024.pdf
- Our own survey — `bio proj form (Responses).xlsx`, n=52, 21 Aug – 9 Sept 2026
