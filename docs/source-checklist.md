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
| 8. On-screen numbers outside `factors.js` | ✅ **rebuilt 10 Sept — 21 of 25 dataset-confirmed**; 4 illustrative by decision | ✅ **Henrison, 10 Sept** — every non-illustrative entry and travel time |
| 9. Design parameters | n/a — our choices | ✅ **Henrison, 9 Sept** |
| 10. Mock scenario data | n/a — invented | ✅ **Henrison, 9 Sept** |
| 11. Value–action gap in the brief | ✅ | ✅ **Henrison, 9 Sept** |
| 11b. Our own survey | ✅ our own data | ⬜ **not yet** |
| 12. Anti-misuse limits | n/a — our decisions | ✅ **Henrison, 9 Sept** — arithmetic by hand, code claims by test |

### Outstanding

| # | Item | Section |
|---|---|---|
| 1 | **Confirm the serving figures, the bread loaf and the tofu price** — 5 lookups, ~15 min. The last unsourced figures on screen | §7, §3 |
| 2 | Confirm the survey figures against the responses spreadsheet | §11b |
| 3 | Write §7's assumptions and §9's parameters into the methodology | §7, §9 |
| 4 | **Two open decisions, not verifications** — whether to build the per-week cap, and what to do about the self-credit hole | §12 |
| 5 | *Optional:* record dates on the three NParks datasets. Bins (2017), e-waste (2021–22) and LTA racks (2019) are done | §8 |

**§8 is closed.** Every facility, every travel time, and every open question in it
was settled on 10 Sept.

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

### The worklist, 10 Sept

Bucketed by **what a person can actually do**, which is not the same as how fast
a marker could check one. Bucket C is the point: some of these cannot be verified
by anybody, so chasing them wastes the day and softening is the only honest close.

⚠️ **The "where to look" column is leads, not sources.** Claude has not opened any
of these pages. A lead becomes a source when a team member opens it, reads the
number, and can give it a date and a human-readable URL.

**The last column matters most.** It is the softened wording pre-drafted, so a
lookup that fails costs nothing — paste the fallback and the row is closed either
way. Every fallback keeps the scene-setting and drops only the falsifiable
specific.

#### Bucket A — published somewhere, checkable at a desk

| ☐ | Facility | The claim | Where to look (a lead) | If it does not check out |
|---|---|---|---|---|
| ☐ | Clementi Community Centre | "Open **9am to 9.30pm**" | PA's CC directory (onepa.gov.sg) lists opening hours per CC | "Inside the lobby. Check the CC's opening hours." |
| ☐ | Clementi Mall car park | "4 bays, level 5. Roughly **$0.55 per kWh**" | The charging operator's public tariff page — SP Mobility, Shell Recharge, Charge+, TotalEnergies all publish per-kWh rates | "4 bays, level 5. Paid charging." |
| ☐ | Blk 445 car park | "2 bays, ground level. **Free for the first 30 minutes**" | Two different claims: HDB's published car park charges, and the charging operator's tariff. The free-30-min line is the most falsifiable thing in the file | "2 bays, ground level." |
| ☐ | Sunset Way allotment | "Waiting list is usually **a few months**" | NParks allotment gardens — allocation is by ballot, and NParks publishes how it works | "Rented plots, allocated by ballot." |
| ☐ | Blk 352 garden | "Open plot, **14 beds**. Volunteers weed **Saturday mornings**" | NParks Community in Bloom registry lists registered gardens; bed counts and work days are unlikely to be published | "Open plot with raised beds, tended by resident volunteers." |
| ☐ | Blk 330 solar | "Powers the **lifts and corridor lighting** for the block" | HDB's solar pages describe what rooftop solar feeds; block-level detail may not be public | "Feeds the block's common services." |
| ☐ | Blk 301 solar | "Part of the same **SolarNova** cluster as Blk 330" | SolarNova is a real HDB/EDB programme, but a block-by-block list may not be published | "Rooftop panels, like Blk 330." |
| ☐ | Blk 443 Bloobox | "Emptied every **Tuesday and Friday**" | Jurong–Clementi Town Council, or the Bloobox programme's own collection information. May need an email rather than a page | "Emptied on a regular collection round." |

#### Bucket B — not published, but you can go and look

| ☐ | Facility | The claim | How | If it does not check out |
|---|---|---|---|---|
| ☐ | NUS High School | "Roughly **60 spaces**" | You are a student there. Count them | "Sheltered racks near the school gate." |
| ☐ | Clementi MRT bicycle hub | "Usually full before **9am on weekdays**" | One weekday morning look. One visit is an anecdote, not a measurement — treat it as grounds to soften, not to claim | "Two-tier racks. Busiest at commuting times." |

#### Bucket C — nobody can verify these. Soften and move on

| ☐ | Facility | The claim | Why it cannot be checked | Replace with |
|---|---|---|---|---|
| ☐ | Blk 726 recycling | "Often **overflowing on Sunday nights**" | A claim about recurring behaviour over time. No source exists and no single visit establishes it | "Void deck bin." |
| ☐ | Clementi Woods | "**Noticeably cooler** at midday" | Subjective, and a measurement would need instruments and repetition. Parks being cooler is well established in general; this specific park at midday is not | "Mature trees, shade at midday. Benches and a playground." |

#### The two field-level rows — recommend no action

| Field | Values | Recommendation |
|---|---|---|
| `facilities.js` → `walkMinutes` | 2 – 16 | **Leave them.** The screen already hedges with "about", nobody reads a walk time as a measurement, and the header now disclaims them. Lowest risk in the file |
| `listings.js` → `price` | 8, 12 | **Leave them.** A rental asking price is an invented neighbour's offer, not a claim about the world, and the file says ALL INVENTED |

**If the day runs short**, the three worth having are the **CC opening hours**,
the **Clementi Mall tariff** and the **Blk 445 free-30-minutes** line — the first
because it is the fastest, the other two because a tariff is the most
plausible-looking invented figure in the file. Everything else can take its
fallback wording with nothing lost.

---

### Dataset check, 10 Sept 2026

Official datasets pulled and every `facilities.js` entry checked against them.
**Nothing in `facilities.js` has been changed** — this is the comparison, for the
team to decide from.

**Reference point:** Blk 442 Clementi Ave 3 = **1.314123, 103.764519**, from
OneMap's address search. The address is real and resolves exactly.

#### What was pulled

| Dataset | Agency | ID | Features | Downloaded |
|---|---|---|---|---|
| Recycling Bins | NEA | `d_4dde14826642f49eefff48b7832b90db` | 12,578 | 10 Sept 2026 |
| E-waste Recycling (GEOJSON) | NEA | `d_db40d004afeb5a7f0f555fdcc34934cc` | 718 | 10 Sept 2026 |
| Community in Bloom (CIB) | NParks | `d_f91a8b057cfb2bebf2e531ad8061e1c1` | 1,772 | 10 Sept 2026 |
| Park Connector Loop | NParks | `d_a69ef89737379f231d2ae93fd1c5707f` | 878 | 10 Sept 2026 |
| Parks and Nature Reserves | NParks | `d_77d7ec97be83d44f61b85454f844382f` | 462 | 10 Sept 2026 |
| LTA Bicycle Rack (GEOJSON) | LTA | `d_937424cca6d1617288a82a7aeb89f76d` | 396 | 10 Sept 2026 |
| HDB Carpark Information | HDB | `d_23f946fa557947f93a8043bbef41dd09` | queried | 10 Sept 2026 |

⚠️ **LTA DataMall EV charging points could not be pulled.** The endpoint requires
an AccountKey issued only to registered DataMall subscribers, and we do not have
one. **Neither EV entry can be confirmed or refuted from open data.** Registering
for a key is free and is the way to close this if the team wants it.

⚠️ **Absence from a dataset is not proof of absence, and it varies by dataset.**
The recycling-bin file has 12,578 points and covers essentially every HDB block,
so a missing block there means something. The LTA bicycle-rack file has **396
points for the whole island**, which is obviously partial, so a missing rack there
means nothing at all. Say which kind of silence you are quoting.

⚠️ **Check the qualifier, again.** Community in Bloom is the register of
**community gardens**. NParks **allotment** gardens are a different scheme with
different allocation. A CIB hit near Sunset Way does not confirm an allotment.

#### Verdict per facility

| Facility | Type | Verdict | Evidence |
|---|---|---|---|
| `blk443-bloobox` | Bloobox | ⚠️ **Address confirmed, facility type not** | A recycling bin is recorded at Blk 443 Clementi Ave 3 (120443) at 1.314164, 103.763862. "Bloobox" is a separate NEA household scheme and is not what this dataset records |
| `blk445-ev` | EV charger | ⚠️ **Car park confirmed, charger unknown** | HDB car park **C19M, Blk 445 Clementi Ave 3, MULTI-STOREY**. Note: our text says "ground level", and this is an MSCP. Charger itself needs the LTA key |
| `clementi-mall-ev` | EV charger | ⚠️ **Building confirmed, charger unknown** | Clementi Mall confirmed at 3155 Commonwealth Ave West, 1.315027, 103.764716, via the e-waste dataset. Charger needs the LTA key |
| `cc-water` | Water refill | ⚠️ **Building confirmed, cooler not** | **Clementi CC, 220 Clementi Avenue 4** confirmed at 1.318815, 103.768154. No public dataset records water coolers |
| `clementi-mrt-bicycle` | Bicycle parking | ✅ **Confirmed real** | LTA rack at **1.315347, 103.764815** — sheltered, 10 racks — and a second at 1.315495, 103.765302, unsheltered, 25 racks. ⚠️ Both are recorded `TYP_CD: Single`, **not two-tier**, so our "two-tier racks" wording is contradicted |
| `ulupandan-pcn` | Park connector | ✅ **Confirmed real** | **Ulu Pandan PC**, nearest segment 1.318628, 103.770683, on both the Southern Ridges Loop and the Western Adventure Loop |
| `clementi-woods` | Cooling space | ✅ **Confirmed real** | **CLEMENTI WOODS PARK**, 1.301067, 103.767411, in the NParks parks dataset, and also appears in the connector data as "Clementi Wood Park" |
| `blk441-recycling` | Recycling | ⚠️ **Address is wrong** | There is **no plain "Blk 441 Clementi Ave 3"**. OneMap returns only **441A and 441B (Clementi Towers)**, and the bin dataset likewise has 441A and 441B only. Nearest real bin: **441A, 1.314639, 103.764798**, 65 m away |
| `blk330-solar` | Solar | ❌ **Address does not exist** | **There is no Blk 330 on Clementi Ave 4.** Blk 330 is on **Clementi Avenue 2**, at 1.313745, 103.767782, 365 m east. No public dataset lists rooftop solar by block either way |
| `blk301-solar` | Solar | ⚠️ **Address real, claim unverifiable** | Blk 301 Clementi Ave 4 confirmed (Clementi Haven), 1.322176, 103.764912. No public SolarNova block list found, so the "same cluster as Blk 330" claim is unverifiable — and Blk 330 is on a different street ~1 km away, which makes "cluster" doubly invented |
| `blk352-garden` | Garden | ❌ **Not found; and the address is a shopping centre** | Blk 352 Clementi Ave 2 is the **CLEMENTI AVENUE 2 SHOPPING CENTRE**, 1.314279, 103.771351. **No CIB garden is registered there.** Nearest registered gardens: **Clementi Avenue 2 Residents' Committee (Garden I and II)** at 1.313711, 103.769796 |
| `sunsetway-garden` | Garden | ⚠️ **Nearby garden exists, but not an allotment** | CIB has **Sunset Way Residents' Committee** at 1.323590, 103.770437. Clementi Arcade confirmed at 41 Sunset Way. But CIB is community gardens, not allotments — the "rented plots" claim is not confirmed |
| `blk726-recycling` | Recycling | ❌ **Not in the data, and it is not a housing block** | Blk 726 Clementi West St 2 is a **MARKET & HAWKER CENTRE**, 1.303811, 103.764251. It is **absent from the recycling-bin dataset** while its neighbours 705–731 are present — and in a 12,578-point file that absence is meaningful. Our text says "void deck bin"; **a hawker centre has no void deck** |
| `clementi-mrt-water` | Water refill | ⬜ **No public dataset exists** | Nothing public records water coolers or refill points |
| `nushigh-bicycle` | Bicycle parking | ⬜ **No usable dataset** | No LTA rack recorded at NUS High, but with 396 points islandwide that proves nothing. ✅ Separately: **NUS High School does have a registered CIB garden** at 1.306000, 103.769000 — a real green facility we are not showing |

#### Pins worth moving rather than inventing

| Instead of | Move to | Why |
|---|---|---|
| Blk 441 Clementi Ave 3 | **441A Clementi Ave 3** (1.314639, 103.764798) | A real bin at a real address, 65 m from home |
| Blk 330 Clementi Ave 4 | **Blk 330 Clementi Ave 2** (1.313745, 103.767782) | Same block number, correct street |
| Blk 352 "Clementi Community Garden" | **Clementi Ave 2 RC Garden I / II** (1.313711, 103.769796) | A really registered CIB garden 588 m away |
| Blk 726 "void deck bin" | Any of **Blk 705–731 Clementi West St 2** | All are in the bin dataset; 726 is not, and is a hawker centre |
| — | **NUS High School CIB garden** (1.306, 103.769) | A real registered garden we currently do not show at all |

#### Walk times: guessed, then computed, then measured

Three generations of this number, and the sequence is worth a line in the report
because each step was cheap and each one moved the answer.

1. **Guessed** (Aug) — plausible figures typed by hand.
2. **Computed** (10 Sept) — straight-line metres from real coordinates at
   80 m/min, once the dataset check gave us coordinates to compute from.
3. **Measured** (10 Sept) — routed walking times read off Google Maps from Blk 442
   by a team member. **This is what the app now shows.**

⚠️ **The computed step understated every single entry.** All sixteen measured
times came out equal to or longer than the straight-line estimate, because a real
walk bends around blocks and waits at crossings. The average was roughly double.
That is a systematic bias, not scatter — worth saying, because it means the
arithmetic was not merely imprecise, it was wrong in a predictable direction.

| Facility | Guessed | Computed | **Measured** |
|---|---|---|---|
| `blk441a-recycling` | 2 | 1 | **2** |
| `blk443-bloobox` | 3 | 1 | **3** |
| `clementi-mall-ev` | 8 | 1 | **2** |
| `clementi-mrt-water` | 7 | 2 | **2** |
| `clementiave2-rc-garden` | 5 | 7 | **13** |
| `blk330-solar` | 6 | 5 | **9** |
| `blk301-solar` | 9 | 11 | **17** |
| `nushigh-bicycle` | 11 | 14 | **19** |
| `nushigh-garden` | — | 13 | **19** |
| `clementi-mrt-bicycle` | 7 | 2 | **3** |
| `ulupandan-pcn` | 4 | 11 | **18** |
| `clementi-woods` | 12 | 19 | **27** |
| `blk706-recycling` | 14 | 11 | **25** |
| `cc-water` | 6 | 13 | **13** |
| `sunsetway-garden` | 16 | 14 | **23** |
| `blk445-ev` | 4 | 1 | **7** |

**Source:** Google Maps walking directions from Blk 442 Clementi Ave 3, read by
Henrison, **10 Sept 2026**. One reading of one route each, so the screen keeps
saying "about".

⚠️ **One entry to re-check: `blk445-ev`.** Blk 445 is 109 m away in a straight
line but measured 7 minutes on foot — a five-fold detour, far larger than any
other short-range entry (Blk 441A is 65 m and 2 min; Blk 443 is 73 m and 3 min).
Maps may have routed to a car park entrance on the far side. Plausible, but it is
the one number here that does not sit with its neighbours.

#### All four modes, read by Claude 10 Sept 2026 — ⬜ NOT VERIFIED

Read off Google Maps by driving the browser, from **Block 442 HDB Clementi**, on
10 Sept 2026. ⬜ **These are Claude's readings, so they are leads, not
verifications** — the sixteen walking times in `facilities.js` remain Henrison's,
which is the stronger provenance. Recorded here for a team member to check.

The "resolved as" column is the useful part: it is what Google Maps decided the
coordinate meant, which is a check on the pin itself as much as on the time.

| Facility | Resolved as | Drive | M/cycle | Transit | Walk | Cycle |
|---|---|---|---|---|---|---|
| `blk441a-recycling` | (address) | 5 | 5 | — | 4 | 1 |
| `blk443-bloobox` | (address) | 2 | 2 | — | 1 | 1 |
| `clementi-mall-ev` | POPULAR Bookstore, #05-01 to 05, The Clementi Mall | 5 | 5 | — | 4 | 1 |
| `clementi-mrt-water` | 3150 Commonwealth Ave W | 5 | 5 | — | 6 | 2 |
| `clementiave2-rc-garden` | **Block 356, 356 Clementi Ave 2** | 7 | 7 | — | 16 | 4 |
| `blk330-solar` | **Block 330, Clementi Ave 2** ✅ | 6 | 6 | — | 12 | 3 |
| `blk301-solar` | **Blk 301 Clementi Ave 4** ✅ | 10 | 9 | 13 | 19 | 8 |
| `nushigh-bicycle` | 30 Clementi Ave 1 | 9 | 9 | 13 | 27 | 7 |
| `nushigh-garden` | **20 Clementi Ave 1** ✅ | 10 | 9 | 15 | 29 | 7 |
| `clementi-mrt-bicycle` | 3150 Commonwealth Ave W | 5 | 5 | — | 6 | 2 |
| `ulupandan-pcn` *(by name)* | **Ulu Pandan Park Connector** ✅ | 9 | 8 | — | 22 | 9 |
| `ulupandan-pcn` *(by our coord)* | ⚠️ Playground – Blk 340/343 Clementi Ave 5 | 8 | 7 | 22 | 21 | 5 |
| `clementi-woods` *(by name)* | **Clementi Woods Park, West Coast Road** ✅ | 9 | 8 | 16 | 30 | 7 |
| `clementi-woods` *(by our coord)* | ⚠️ Kent Vale Parking 2, 103 Clementi Rd | 13 | 13 | 20 | 35 | 10 |
| `blk706-recycling` | **706 Clementi West Street 2** ✅ | 8 | 7 | 26 | 25 | 6 |
| `cc-water` | **Clementi Community Centre, 220 Clementi Ave 4** ✅ | 8 | 7 | — | 15 | 6 |
| `sunsetway-garden` | **41 Sunset Wy** ✅ (Clementi Arcade) | 10 | 9 | 22 | 26 | 7 |
| `blk445-ev` | **Blk 445 Multi-storey Car Park (C19M)** ✅ | 2 | 2 | — | 1 | 1 |

A blank transit cell means Maps offered no transit route, which it does not for
short hops — not that transit is impossible.

#### ⚠️ Two coordinates do not point where we think they do

Both are **line and polygon datasets**, where a single coordinate is a vertex
rather than a place:

- **`ulupandan-pcn`** — our coordinate is the nearest *segment vertex* of the
  connector. Maps resolves it to a **playground at Blk 340/343 Clementi Ave 5**.
- **`clementi-woods`** — our coordinate is a *polygon vertex* of the park. Maps
  resolves it to **Kent Vale Parking 2 on Clementi Road**, and gives a 35-minute
  walk against 30 minutes for the park searched by name.

Neither pin is wrong on the map, but **neither coordinate should be quoted as the
facility's location**. For these two, the park or connector name is the better
destination. This is the point-versus-line-or-polygon version of the
check-the-qualifier rule.

#### ⚠️ Claude's walk times run consistently longer than Henrison's

Same source, same day, and they still disagree — thirteen of sixteen by 2 to 4
minutes, with two outliers:

| Facility | Henrison | Claude | Gap |
|---|---|---|---|
| `nushigh-garden` | 19 | 29 | **+10** |
| `nushigh-bicycle` | 19 | 27 | **+8** |
| `blk445-ev` | 7 | **1** | **−6** |
| `blk706-recycling` | 25 | 25 | 0 |
| *(the other twelve)* | | | +2 to +4, except `blk443` −2 |

**The likely cause is not carelessness on either side — it is that we searched
differently.** Claude routed to dataset **coordinates**; a person typing the
**address** into Maps gets a different destination point, and for a school campus
or a car park those can sit hundreds of metres apart. `blk445-ev` is the clearest
case: by coordinate it resolves to the multi-storey car park C19M and gives 1
minute, which fits 109 m; the 7-minute reading is presumably to some other point.

**What this means for the report, and it is the interesting part:** "measured on
Google Maps" sounded like a single well-defined act, and it is not. The number
depends on *what you typed*, and two people following the same instruction on the
same day got answers differing by up to ten minutes. **A method needs to specify
the destination, not just the tool.**

**Not resolved here.** `facilities.js` keeps Henrison's numbers. Whoever verifies
should fix the method first — coordinate or address, chosen deliberately — and
then read all sixteen that one way.

#### Method decision, 10 Sept: **coordinates**, not addresses

The team chose the coordinate method. Consequences, and one of them is awkward:

**Two coordinates were replaced with better ones of the same kind.** Under an
address method the fix for a park or a connector is to search its name; under a
coordinate method the fix has to be a better *coordinate*:

| Facility | Old coordinate | Was a | New coordinate | Now a |
|---|---|---|---|---|
| `clementi-woods` | 1.301067, 103.767411 | polygon vertex | **1.300358, 103.767838** | polygon centroid (198 vertices) |
| `ulupandan-pcn` | 1.318628, 103.770683 | nearest line vertex | **1.319696, 103.769675** | nearest point *on* the line |

⚠️ **For a park, "the distance" is not well defined, and picking coordinates does
not make it so.** Clementi Woods gives three defensible answers:

| Destination used | Walk |
|---|---|
| Park searched by name | 30 min |
| Polygon vertex (old) | 35 min |
| **Polygon centroid (new, method-correct)** | **36 min** |

The centroid is the middle of a 198-vertex park, and nobody walks to the middle of
a park — you arrive at its edge. So the method-correct number is arguably the
least realistic of the three. **Worth stating rather than hiding:** a point-based
distance to an area-based facility is a category error that no choice of point
fixes. The connector behaves better — the on-line point gives 22 min, matching the
by-name search exactly, which is a good sign for linear facilities.

#### The other modes, recorded but not shown

Two facility types are not reached on foot in practice, and the measured times
for the real mode were collected alongside the walking ones:

| Facility | Walk (shown) | Real mode |
|---|---|---|
| `clementi-mall-ev` | 2 min | **4 min drive** |
| `blk445-ev` | 7 min | **1 min drive** |
| `nushigh-bicycle` | 19 min | **6 min cycle** |
| `clementi-mrt-bicycle` | 3 min | **1 min cycle** |

The cards still show walking, because the field is `walkMinutes` and the screen
says "walk" — putting a driving time behind a label that says walk would be the
copy/data mismatch this document keeps catching. **But the observation is real:
nobody walks to an EV charger.** Whether to show a per-type travel mode is an open
design question, not a bug, and it is recorded here rather than acted on because
the build phase is closed.

---

### ⚠️ Are these actually the nearest facilities? No — and the datasets prove it

The dashboard sorts by `walkMinutes` and presents a "nearest first" list. That
list is **nearest among the sixteen we chose**, not nearest in Clementi, and the
difference is large. This is the most serious limitation §8 has turned up,
because unlike an invented tariff it is a claim the *interface* makes rather than
one a card states.

**Recycling bins — 15 within 200 m, and we show one of them**

| Distance | Bin |
|---|---|
| **0 m** | **Blk 442 Clementi Ave 3 — the resident's own block** |
| 64 m | Blk 441B |
| 65 m | Blk 441A ← *the one we show* |
| 65 m | Blk 449 |
| 73 m | Blk 443 |
| 105–200 m | nine more |

**There is a recycling bin at the resident's own void deck and the app does not
show it.** For an app whose stated purpose is removing the "I don't know where to
go" barrier, showing the fifth-nearest bin and hiding the one downstairs is close
to the opposite of the point.

**Community gardens — we show the 8th-nearest and the 30th**

| Distance | Garden |
|---|---|
| 157 m | Clementi Swimming Complex |
| 252 m | Clementi Primary School |
| 303 m | Clementi Town Secondary School |
| 380 m | Clementi Heights RC |
| 436–542 m | three more |
| 588 m | Clementi Ave 2 RC ← *we show this* |
| 1,031 m | NUS High ← *and this* |

**E-waste — a whole real category the app does not have**

There is no e-waste facility type in `facilityTypes.js`, yet NEA records four
collection points within 211 m: POPULAR @ Clementi Mall (103 m), Best Denki
(159 m), FairPrice @ Clementi Mall (170 m), FairPrice @ 451 Ave 3 (211 m). The
brief names e-waste drives as an event type, so the omission is an oversight
rather than a decision.

**Bicycle parking — correct.** The 140 m sheltered rack we show is genuinely the
nearest in LTA's data.

**Parks — arguable.** Six NParks green spaces sit closer than Clementi Woods, but
all six are playgrounds, and "cooling green space" plausibly means something
larger. Defensible as a category judgement, not as a distance claim.

#### What was done about it — rebuilt 10 Sept 2026

**Option 2 was taken: `facilities.js` was rebuilt from the datasets.** Sixteen
hand-invented entries became **22**, of which **17 are dataset-confirmed**. This
was data entry, not invention — every coordinate, name and address already
existed in the files pulled that morning.

| Type | Now shows | Source | Was |
|---|---|---|---|
| `recycling` | Blk **442** (own block), 441A, 449 | NEA Recycling Bins | 441A + a hawker centre |
| `bloobox` | Blk 443 | NEA Recycling Bins | same |
| **`ewaste`** | Clementi Mall (POPULAR), Blk 451 FairPrice, Clementi CC | NEA E-waste | **type did not exist** |
| `evCharger` | **Blk 442-444/442A (C17)**, **Blk 449 (C20)**, Clementi Mall, Blk 445 (C19M) | Revolt.sg — Henrison, 10 Sept | two were missing |
| `waterRefill` | Clementi MRT, Clementi CC | ⚠️ none — our assumption | same |
| `garden` | Swimming Complex, Clementi Pri, Clementi Town Sec, Clementi Heights RC, NUS High | NParks Community in Bloom | 1 real + 1 invented |
| `solar` | Blk 330, Blk 301 | ⚠️ none — our assumption | same |
| `bicycle` | Two LTA racks by the MRT | LTA Bicycle Rack | 1 real + 1 unevidenced |
| `parkConnector` | Ulu Pandan PC | NParks PCN | same |
| `coolingSpace` | Clementi Woods Park | NParks Parks | same |

**The headline change: the nearest recycling bin is now the one at Blk 442, the
resident's own block.** That is the single most useful thing the dashboard can
say, and the old list did not contain it.

**One entry was removed:** `nushigh-bicycle`. It is not in LTA's rack data. ⚠️
**That is not evidence it does not exist** — the LTA file has 396 points
islandwide and is plainly partial. It was dropped for being unevidenced, not
disproven, and could be restored if someone looks.

**Two types are now labelled ILLUSTRATIVE and closed** — `waterRefill` and
`solar`, four entries. ✅ **Decided 10 Sept: do not chase these.** No public
dataset records water refill points or per-block rooftop solar, so they cannot be
confirmed *or refuted* at any amount of effort — unlike a tariff or an opening
time, there is no source that would settle them. Putting them on a verification
list would be putting an unanswerable question on a deadline. They stay as mock
data, labelled in the `facilities.js` header, excluded from the worksheet, and
not cited as findings.

**For future development, the fix is a different facility type, not more
research.** **Reverse vending machines** for drink containers are a real scheme
with real, published, findable locations. They carry exactly the same "where is
my nearest one" idea the water cooler was standing in for, but on evidence rather
than assumption — and they connect to the recycling behaviour the app is trying
to make convenient. The lesson generalises and is worth a line in the report:
**water coolers and per-block solar were the wrong things to map, not badly
researched ones.** When a prototype needs a data layer, choosing a category that
somebody publishes is a design decision, not a research shortcut.

**Bloobox note:** no point-level Bloobox dataset exists. The Blk 443 entry is a
dataset-confirmed *recycling bin*, described as where a Bloobox gets emptied.
⬜ Someone should confirm that framing is how the scheme actually works.

**walkMinutes now has two provenances.** Fourteen entries reuse coordinates
already measured on Google Maps; eight new ones are estimated at straight-line
metres ÷ 40, a rate calibrated from those measured readings rather than a guess
at walking speed. ⬜ **The eight estimated entries should be measured** — they are
`blk442-recycling`, `blk449-recycling`, `blk451-ewaste`, the four non-NUS gardens,
and `clementi-mrt-bicycle-2`.

⚠️ **The ordering claim still needs qualifying, even now.** The list is the
nearest few of each type, not all of them: 15 recycling bins remain within 200 m
and we show three. What changed is that the three are genuinely the nearest three,
so the order is no longer arbitrary. The report should say "nearest few by type",
not "all facilities nearby".

### ✅ Verified by Henrison, 10 Sept 2026 — and two findings from doing it

**Blk 442 and Blk 449 confirmed in the raw file.** Opened `RecyclingBins.geojson`
directly: block 442, HDB-CLEMENTI, postcode 120442, Clementi Avenue 3, at
103.764518 / 1.314122 — matching our entry exactly. Blk 449 likewise. ☑ ☑

⚠️ **Finding 1: the dataset is seven years older than its download page says.**
The record's `FMEL_UPD_D` reads **2 June 2017** while the data.gov.sg page reports
a **June 2024** refresh. Checking the whole file afterwards: **all 12,578 records
carry the same 2017 stamp.** So this is not "some records may be stale" — the
entire file is 2017 data republished in 2024. **The portal date is when the file
was posted, not when anyone last looked at a bin.**

**This is the check-the-qualifier rule applied to a dataset instead of a number**,
and it is the sixth time that habit has caught something. The report should cite
these bins as **2017 data**, and the same question should be put to every other
dataset used here — LTA's rack file stamps 2019.

⚠️ **Finding 2: Google Maps will not route through an HDB void deck.** It walks
you the long way round the block, which overstates every short hop inside an
estate — it gave **4 minutes for a bin 65 m away**. Henrison corrected the five
recycling bins from local knowledge: Blk 441A and Blk 449 to **3 min**, Blk 442
and Blk 443 to **1 min**.

**This is the one place in the project where a person beats the tool**, and it
partly explains the earlier Claude-vs-Henrison gap: routing to a dataset
coordinate makes Maps take the long way round more often than searching an
address does. Worth a line in the report — a measurement instrument has
assumptions, and this one assumes you cannot walk through a building.

⚠️ **Call it knowledge of how HDB estates work, NOT local knowledge of Clementi.**
Nobody on the team lives in Clementi. The correction is about void decks in
general and would hold in any estate; writing "local knowledge" would imply a
resident's familiarity with these particular blocks, which we do not have. Same
habit as everywhere else in this document — check what the claim actually rests
on, including when the claim is ours.

### ✅ The Bloobox question is settled — and the type is gone

**A Bloobox is the box NEA gives a household** to collect recyclables in at home.
Every week or so the family carries it to the nearest blue bin and empties it.
**So a "Bloobox point" is not a place — it is a recycling bin.**

The app had a separate `bloobox` facility type with its own pin and filter chip,
which implied a second, different place to walk to. **It has been removed**, and
the fact now lives in the recycling cards: *"Bloobox contents go here."* That
answers the question a resident actually has, which the separate pin did not.

The **Bloobox sign-up booth** in `events.js` stays — that is a real, different
thing: where you go to collect the box in the first place.

**Worth writing up.** The brief lists "residents don't know where the nearest
Bloobox point is" as a symptom of the inconvenience root cause. It turns out the
honest answer is *"it's the blue bin downstairs"* — so the fix was better
information, not another map layer. **A category error in the data model was
hiding a question the app could already answer.**

### The five recycling bins ARE the five nearest — checked

Henrison asked whether three bins could really be the closest given how many sit
on Clementi Ave 3. They could not, and the list was short one:

| Distance | Block | Shown? |
|---|---|---|
| 0 m | **442** | ✅ |
| 64 m | **441B** | ⚠️ **was missing — added 10 Sept** |
| 65 m | **441A** | ✅ |
| 65 m | **449** | ✅ |
| 73 m | **443** | ✅ (was the Bloobox pin) |
| 105 m | 441 Commonwealth Ave West | no — next nearest |

**Blk 441B at 64 m was closer than two bins we were already showing.** The cause
was a de-duplication step that collapsed 441A and 441B as if they were one block;
they are two buildings with two bins. The five shown are now the five nearest, and
the sixth is 105 m away — a clear gap, so the cut is defensible rather than
arbitrary.

### ✅ E-waste verified — Henrison, 10 Sept 2026, and a third dataset trap

All three e-waste points confirmed, both remaining walk times checked, and the
record-date question answered. ☑ ☑ ☑

| Entry | Ours | Henrison | Outcome |
|---|---|---|---|
| `clementimall-ewaste` | 4 min walk | **4 min walk, 5 min drive** | ✅ correct |
| `blk451-ewaste` | 5 min walk *(estimated)* | **3 min walk** | ⚠️ **corrected to 3** |
| `cc-ewaste` | 15 min walk | **15 min walk, 8 min drive** | ✅ correct |

The estimate that was wrong was the only one still computed rather than measured,
which is the pattern the whole exercise predicted: **÷40 overstated a short hop**,
the same direction as every other short-range error we have hit.

#### ⚠️ `FMEL_UPD_D` does not mean the same thing in every dataset

Henrison read `"FMEL_UPD_D" : "20220204175023"` on an e-waste record and asked
"2022???". Checking all 718 records against all 12,578 bin records gives a sharper
answer than either date alone:

| Dataset | Record dates | What the field is doing |
|---|---|---|
| NEA **Recycling Bins** | **every one of 12,578** = 2 Jun 2017 | A single bulk stamp. The whole file was processed at once; there is no per-record history at all |
| NEA **E-waste** | **spread across Dec 2021 – Jun 2022** (602 on 4 Feb 2022, latest 2 Jun 2022) | Genuinely per-record. Points were edited individually as they were added or changed |

**So the same field name means two different things in two files from the same
agency.** In one it is a processing timestamp; in the other it is an edit history.
Reading "2017" and "2022" as comparable ages would be wrong — and this is the
check-the-qualifier rule reaching a *metadata field*, one level further out than
the dataset date we caught this morning.

⚠️ **The e-waste list is 3½ years old and is mostly shops.** Retail collection
points close, move, and change operator far faster than a void-deck bin does. The
bins being 2017 matters less than the e-waste being 2022.

✅ **Decided 10 Sept: accepted on the dataset, not physically verified.** Nobody on
the team lives in Clementi, so a site visit is not a small ask, and for a six-student
prototype demonstrating feasibility the published NEA record is proportionate
evidence. **State it in the report exactly that way** — "recorded by NEA in 2022;
not confirmed on site" — rather than letting the pin imply someone checked. An
unverified claim that says it is unverified is not a weakness; an unverified claim
that looks verified is.

### ✅ Everything else verified — Henrison, 10 Sept 2026

Every non-illustrative facility now has a travel time measured by a team member,
and every open claim was answered. **Nothing in `facilities.js` is a Claude
estimate any more** except the four illustrative entries.

| Entry | Ours | Henrison — walk / other | Outcome |
|---|---|---|---|
| `blk442-ev` | 1 | **1 walk, 1 drive** | ✅ |
| `blk449-ev` | 3 | **2 walk, 4 drive** | corrected → 2 |
| `clementi-mall-ev` | 4 | **6 walk, 4 drive** | corrected → 6 |
| `blk445-ev` | 1 | **1 walk, 1 drive** | ✅ |
| `swimcomplex-garden` | 4 *(est)* | **7 walk, 7 drive** | corrected → 7 |
| `clementipri-garden` | 6 *(est)* | **4 walk, 2 drive** | corrected → 4 |
| `clementitownsec-garden` | 8 *(est)* | **6 walk, 3 drive** | corrected → 6 |
| `clementiheights-garden` | 9 *(est)* | **7 walk, 6 drive** | corrected → 7 |
| `nushigh-garden` | 29 | **21 walk, 7 drive** | corrected → 21 |
| `clementi-mrt-bicycle` | 6 | **5 walk, 4 cycle** | corrected → 5 |
| `clementi-mrt-bicycle-2` | 4 *(est)* | **7 walk, 5 cycle** | corrected → 7 |
| `ulupandan-pcn` | 22 | **~21 walk, 7 drive** | corrected → 21 |
| `clementi-woods` | 36 | **~35 walk** | corrected → 35 |

⚠️ **The ÷40 estimates were wrong in BOTH directions** — 4→7 and 9→7, 6→4 and
8→6. Earlier we said the straight-line method understated systematically; on this
larger sample it does not, it just scatters. **The honest conclusion is weaker
than the one we drew this morning:** straight-line ÷ 40 is not a biased estimator,
it is an imprecise one, and six readings were not enough to tell those apart. That
correction belongs in the report — it is a case of us over-reading a small sample,
which is the same error the survey limitations warn about.

#### ✅ The Clementi Woods distance question is settled

Henrison: *"about right, 36 min walk and 7 min drive to entrance (car can't enter
the park)."* The centroid figure was defensible after all. The entry is set to 35
from the direct reading, and the point worth keeping is that **you cannot drive
into the park**, so the driving time is to the entrance and the walk is the real
number for a visitor.

#### ⚠️ Three of the five gardens are NOT open to the public

Henrison: *"The ones inside schools are not open to the public. The rest, maybe."*

That is **Clementi Primary, Clementi Town Secondary and NUS High** — three of five.
They are now labelled on the card: *"Inside the school — not open to the public."*
The swimming complex and the RC garden are unconfirmed.

✅ **Decided 10 Sept: keep them, and state the restriction on the card.** They are
real registered gardens, and the neighbourhood score counts green infrastructure
that *exists* rather than only what a stranger can walk into — hiding them would
make the estate look less green than it is. The card says "Inside the school — not
open to the public", so nobody walks over expecting to get in.

The alternative was to drop them, on the grounds that a "facilities near you" map
should only list places you can go. It was rejected because the dashboard does two
jobs — find somewhere to go, *and* show how much green infrastructure the estate
has — and only the first is damaged by listing a school garden, while both are
damaged by hiding it. **Say which reading you took, because a marker will ask.**

The swimming complex and the RC garden are unconfirmed either way, so they carry
**no access claim at all** rather than a guessed one.

#### ✅ EV bay counts and levels removed

Henrison: *"Can't confirm the level and stuff, so we should just remove this
feature."* Both `"4 bays, level 5"` and `"2 bays"` are gone. All four EV cards now
say only **"Paid charging."**

**The HDB car park numbers were dropped too.** We had matched the block ranges to
HDB's list (C17, C19M, C20) and called it a corroboration; Henrison did not think
the mapping held for Blk 442. A tidy-looking correspondence nobody can check is
exactly what this project keeps deleting, so it went — including from the
`facilities.js` comment where it was recorded as a finding.

⚠️ **That correspondence is now a withdrawn claim**, like the eggs argument in §7.
It should not reach the report.

### ⚠️ We were showing 2 of the 4 nearest EV chargers — fixed 10 Sept

Henrison checked Revolt.sg and found the four nearest are **Clementi Mall, Blk
449, Blk 442-444/442A, and Blk 445**. We had only Clementi Mall and Blk 445, so
**the two closest of the four were missing** — including one at the resident's own
block.

**A corroboration worth noting.** The block ranges Revolt lists match HDB's own
car park names *exactly*: **C17 = "BLK 442-444,442A"**, **C19M = "BLK 445"**,
**C20 = "BLK 449-451"**. That is a good sign the charger listing is keyed to HDB
car parks rather than to addresses somebody typed, and it lets us cross-check an
aggregator against an official file even though no open EV dataset exists.

⚠️ **One thing to watch:** HDB's C20 spans **449-451**, so "Blk 449" is our
reading of which block the charger actually sits at. On the worksheet.

⚠️ **This one rests on a single human reading of an aggregator**, with no file we
can re-run. Every other facility type here can be re-derived from a dataset; this
one cannot. Worth a second look before the report, and worth saying plainly in it.

### Report-a-problem made type-specific

The form offered one shared list — *bin overflowing, facility broken, blocked,
something else* — to every facility, so **an EV charger could be reported as an
overflowing bin.** That is not a thing that can happen, and it made the form read
as scenery rather than something a resident would use.

Each type now carries its own `problems` list in `facilityTypes.js`: a charger
offers *not working / bay blocked by a non-EV / cable damaged / payment failed*, a
park connector offers *path blocked / surface broken / lighting out / overgrown*.
**"Something else" is appended by the form to every list** and opens a free-text
box; the report cannot be sent while that box is empty, because an unexplained
"something else" tells a town council nothing.

⚠️ **A pre-existing bug was found and fixed while doing this.** `FacilitySheet`
never unmounted — Dashboard passes `facility={selected}` and the component returns
null — so its state survived between facilities. Sending a report about one bin
left the next marker you tapped showing "report logged", and after the per-type
change a stale selection could belong to a different type entirely. Dashboard now
passes `key={selected?.id}`, which remounts the sheet per facility. **Worth a line
in the report:** the bug predates this change and nobody had noticed, because with
one shared list the wrong-type symptom was invisible.

---

### The three decisions taken on 10 Sept, before the dataset check

These were settled independently of the data and stand regardless of it.

**1. Blk 726, "often overflowing on Sunday nights" — reframed, not just softened.**
As static text it does not work: if the app knows a bin overflows every Sunday,
the right move is to tell the town council once so they add a collection, not to
warn residents forever. It is reframed as **aggregated resident reports** —
"frequently reported full on Sunday evenings" — sourced from the app's own
report-a-problem flow. That makes it something the app could legitimately know,
and it carries the argument: **the app surfaces infrastructure gaps no agency
currently collects, because nobody asks residents systematically.** If wiring that
to the report flow costs more than it is worth, the plain fallback "Void deck bin"
is the agreed alternative. ⚠️ The dataset check has since found that Blk 726 is a
**hawker centre, not a housing block**, so "void deck" is wrong in either version
and this entry needs re-siting regardless.

**2. Clementi Woods, "noticeably cooler at midday" — fallback.** A reasonable
general claim about mature tree cover, but we cannot evidence this park at midday.
Agreed wording: **"Mature trees, shade at midday."**

**3. Bucket B — no action.** We are not counting bicycle racks or visiting the MRT
at 9am. Both take their fallback wording. **Recorded reason: physical verification
was judged unwarranted for a prototype demonstrating feasibility rather than
usability.** That is a scope decision, not an oversight, and it is the honest thing
to write in the report. ⚠️ The bicycle-rack dataset has since confirmed the MRT
racks are real but **`Single`, not two-tier**, so that entry's wording is wrong on
a second count.

**Placement rule agreed with the team:** `facilities.js` carries **only the
softened wording**. No justification text on the cards. All reasoning — including
the Bucket C finding — lives in this document.

### Edits applied to `facilities.js`, 10 Sept 2026

The comparison above was acted on. Every `walkMinutes` was then **measured** on
Google Maps from Blk 442 and replaced again — see the three-generation table
above. The minute figures in the table below are the intermediate *computed*
values, kept to show what each edit did at the time.

| Entry | Change |
|---|---|
| `blk441-recycling` → `blk441a-recycling` | Address to **Blk 441A**; the plain 441 does not exist. 2 → 1 min |
| `blk330-solar` | Address to **Clementi Ave 2**; Ave 4 does not exist. 6 → 5 min |
| `blk352-garden` → `clementiave2-rc-garden` | Re-sited to the **registered CIB garden** at 1.313711, 103.769796. "14 beds / Saturday mornings" dropped. 5 → 7 min |
| `blk726-recycling` → `blk706-recycling` | Re-sited to **Blk 706**, a real block with a real bin; 726 is a hawker centre. 14 → 11 min |
| `blk301-solar` | "Same SolarNova cluster as Blk 330" removed — the two are on different streets ~1 km apart. Now "Rooftop panels, like Blk 330." 9 → 11 min |
| `clementi-mrt-bicycle` | **Single-tier**, per LTA's `TYP_CD: Single`, and sheltered per `SHLTR_IND: Yes`. "Full before 9am" → "Busiest at commuting times". 7 → 2 min |
| `nushigh-garden` | **New entry.** NUS High's registered CIB garden, 1.306, 103.769. 13 min |
| `nushigh-bicycle` | "Roughly 60 spaces" dropped. 11 → 14 min |
| `clementi-mall-ev` | "Roughly $0.55 per kWh" → **"Paid charging"**. 8 → 1 min |
| `blk445-ev` | "Free for the first 30 minutes" dropped. 4 → 1 min |
| `ulupandan-pcn` | Now names the loops NParks records. 4 → 11 min |
| `clementi-woods` | "Noticeably cooler" → **"shade at midday"**. 12 → 19 min |

### Which entries are confirmed, unverifiable, or have no dataset

**Dataset-confirmed — the facility is recorded at that location**

| Entry | Dataset | Coordinates |
|---|---|---|
| `blk441a-recycling` | NEA Recycling Bins | 1.314639, 103.764798 |
| `blk443-bloobox` (bin only) | NEA Recycling Bins | 1.314164, 103.763862 |
| `blk706-recycling` | NEA Recycling Bins | 1.306764, 103.762356 |
| `clementi-mrt-bicycle` | LTA Bicycle Rack | 1.315347, 103.764815 — sheltered, 10 racks, `Single` |
| `ulupandan-pcn` | NParks Park Connector Loop | 1.318628, 103.770683 |
| `clementi-woods` | NParks Parks and Nature Reserves | 1.301067, 103.767411 |
| `clementiave2-rc-garden` | NParks Community in Bloom | 1.313711, 103.769796 |
| `nushigh-garden` | NParks Community in Bloom | 1.306000, 103.769000 |

**Exists, but the detail is unverified**

| Entry | What is confirmed | What is not |
|---|---|---|
| `clementi-mall-ev` | **Exists** — Revolt.sg station map, checked by Henrison **10 Sept 2026**, https://revolt.sg/ev-charging/station-map-singapore | The tariff. "$0.55 per kWh" removed. ⚠️ **"4 bays, level 5" is still an invented count** |
| `blk445-ev` | **Exists** — same source and date. Car park confirmed separately as HDB **C19M** | The tariff and the free-30-minutes claim, both removed. ⚠️ **"2 bays, ground level" is still invented**, and C19M is a *multi-storey* car park |
| `blk443-bloobox` | A recycling bin at that block | That it is a **Bloobox** point — a separate NEA scheme no open dataset records. Collection days still unverified |
| `cc-water` | The building — Clementi CC, 220 Clementi Ave 4, 1.318815, 103.768154 | The cooler, and the opening hours (still on the outstanding list) |

⚠️ **Revolt.sg is an aggregator.** It is good enough for *existence*, which is what
it is cited for. If the price is ever verified, **the citation must be the
operator's own page**, not Revolt.

**No public dataset exists for this facility type**

| Type | Entries | Position |
|---|---|---|
| Water refill points | `clementi-mrt-water`, `cc-water` | Nothing public records water coolers. Unconfirmable either way |
| Per-block rooftop solar | `blk330-solar`, `blk301-solar` | No SolarNova block list found. Both addresses are real; the panels are not evidenced |
| Bloobox collection points | `blk443-bloobox` | Scheme is real, point-level locations are not published |
| EV charging points (open data) | both EV entries | LTA DataMall needs a subscriber AccountKey. Closed here by Revolt.sg for existence only |

**Still invented, and knowingly so:** `sunsetway-garden`. NParks CIB records a
**Sunset Way Residents' Committee community garden**, not an allotment — a
different scheme — so "rented plots" and the waiting list are unconfirmed. Left
unchanged because the team has not ruled on it; it is on the outstanding list.

### The Bucket C finding, for the report

Of twelve location claims, **two could not be verified by any method available to
us**: one a claim about recurring behaviour with no records kept by anyone, one
subjective and needing instruments and repetition. **We softened both rather than
assert them.** The value of the finding is not the two claims; it is that we can
say which kind of claim our method could not reach, instead of leaving the reader
to assume we checked everything equally.

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
- NEA Recycling Bins — https://data.gov.sg/datasets/d_4dde14826642f49eefff48b7832b90db/view (pulled 10 Sept 2026)
- NEA E-waste Recycling (GEOJSON) — https://data.gov.sg/datasets/d_db40d004afeb5a7f0f555fdcc34934cc/view (pulled 10 Sept 2026)
- NParks Community in Bloom — https://data.gov.sg/datasets/d_f91a8b057cfb2bebf2e531ad8061e1c1/view (pulled 10 Sept 2026)
- NParks Park Connector Loop — https://data.gov.sg/datasets/d_a69ef89737379f231d2ae93fd1c5707f/view (pulled 10 Sept 2026)
- NParks Parks and Nature Reserves — https://data.gov.sg/datasets/d_77d7ec97be83d44f61b85454f844382f/view (pulled 10 Sept 2026)
- LTA Bicycle Rack (GEOJSON) — https://data.gov.sg/datasets/d_937424cca6d1617288a82a7aeb89f76d/view (pulled 10 Sept 2026)
- HDB Carpark Information — https://data.gov.sg/dataset/hdb-carpark-information (queried 10 Sept 2026)
- OneMap address search — https://www.onemap.gov.sg/ (Blk 442 Clementi Ave 3 geocoded 10 Sept 2026)
- Revolt.sg EV station map — https://revolt.sg/ev-charging/station-map-singapore (checked by Henrison 10 Sept 2026; **aggregator — existence only, not price**)
