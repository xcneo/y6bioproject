# Source checklist — every figure in `src/data/factors.js`

Generated 7 Sept 2026. Tick a box when you have **opened the source and seen the
number with your own eyes**. Claude wrote most of these from memory; memory is
not a citation.

Sections 1–7 cover `factors.js`. **Sections 8–11 cover everything else** —
numbers on screen that bypass the sourcing mechanism, design parameters, mock
scenario data, and the claims in the written brief.

"On screen?" means the figure actually reaches a rendered screen through
`src/lib/impact.js`. A figure that is **not** on screen still matters for the
written report, but it cannot be wrong in the demo — so verify the on-screen
ones first.

---

## Status at 8 Sept 2026

**Two different things, kept in two different columns.** "Has a source" means the
figure is no longer invented. "Seen with our own eyes" means a person opened that
source and read the number off it. Claude can do the first. Only you can do the
second, and the top of this document is explicit about why: *memory is not a
citation.* A figure Claude sourced is a lead, not a verification.

| Section | Has a real source | Seen with our own eyes |
|---|---|---|
| 1. Food greenhouse gas — `FOOD_CO2` | ✅ | ✅ **team, 7 Sept** |
| 2. Food water — `FOOD_WATER` | ✅ | ✅ **team, 7 Sept** — three figures corrected |
| 3. Food prices — `FOOD_PRICE_SGD` | ✅ | ✅ **team, 7 Sept** — one source, matched cuts |
| 4. Manufacturing — `MANUFACTURING_CO2` | ✅ Claude, 8 Sept | ⬜ **nobody has opened it** |
| 4b. Drill price and mass — `ITEM_PRICE_SGD`, `ITEM_MASS_KG` | ✅ Claude, 8 Sept | ⬜ **nobody has opened it** |
| 4d. Drill water — `ITEM_WATER_L` | ✅ Claude, 8 Sept — EPA USEEIO, team supplied the file | ⬜ **check the derivation, not just the source** |
| 5. Singapore national figures | ✅ Claude, 7 Sept | ⬜ **nobody has opened it** |
| 6. Green Plan targets | ✅ Claude, 7 Sept | ⬜ **nobody has opened it** |
| 7. Stated assumptions | n/a — they are choices, not measurements | ⬜ Tick when written into the methodology |

⚠️ **An earlier version of this table said sections 5 and 6 were "done", and
ticked 4 and 4b.** That was wrong by this document's own rule. Four sections have
a source and no human check: **4, 4b, 5 and 6**. Their tick-boxes below are
therefore `☐`, and they stay `☐` until one of you opens the URL.

The good news is that this is a short job. §5 and §6 are **seven numbers across
four web pages**, none of which reach a screen — they are report material, so
they cannot embarrass you in the demo, only in the bibliography. §4 and §4b are
**three numbers on two pages**, and those *are* on screen.

### ✅ Settled — nothing further needed

Sections 1, 2 and 3 are done: sourced *and* checked by a person. Three things in
them are recorded as **stated limitations** rather than open problems — write
them into the methodology paragraph and they stop being weaknesses:

- Beef is **chilled**, chicken **frozen**. Fresh boneless breast (~$19/kg) would
  erase the money saving. CO₂ and water are unaffected.
- `bread` at $5.50/kg is a **representative mid-range** white-loaf figure, not a
  single product's shelf price. Say so; don't call it a shelf price.
- `otherVegetables` and `rootVegetables` are **aggregate categories**, not
  specific crops. Word them as baskets, never as "carrots".

### ⬜ Still to do

| # | Item | Section | Notes |
|---|---|---|---|
| 1 | **Open the sources for §4, §4b, §5 and §6** | §4–6 | Ten numbers, six web pages. Claude found them; nobody has read them. Do §4 and §4b first — those three are on screen. |
| 2 | **"4 in 10 Singaporeans"** in the brief | §11 | Unsourced, and it's the opening line of the problem statement. The only number in the project with **no source at all**. |
| 3 | **Walk times and the EV charger tariff** | §8 | Invented facts about real Clementi addresses. Official datasets exist for most facility types. |
| 4 | **Design parameters** — points, taper, thresholds | §9 | Nothing to source; state them in the methodology. |
| 5 | **§7 assumptions → methodology paragraph** | §7 | Tick when each is written up. |

⚠️ **Don't read item 1 as a formality.** Sections 1–3 were Claude-sourced too, and
when the team actually opened those papers it found **four wrong numbers** —
`bread` was the figure for raw wheat, `bananas` was the aggregate "Fruits" row,
`rootVegetables` was a copy-paste of `otherVegetables`, and the prices rested on
two incompatible bases. Every one of those was in a figure that already had a
confident-looking citation beside it. That is the base rate for this job.

✅ **`factors.js` now has no missing values.** Every entry has a number, a unit
and a named source. The last `null` — the power drill — was filled on 8 Sept.

✅ **The drill card is now entirely inside the sourcing mechanism (8 Sept).** Its
price and mass used to be typed into `habits.js` with no `source` field, so
nothing was watching them. They now live in `ITEM_PRICE_SGD` and `ITEM_MASS_KG`
and go through `isSourced()` like every other figure. **Both numbers moved, in
opposite directions** — see §4b. That closes the first row of §8, which was the
biggest hole in this document.

⚠️ **"Inside the mechanism" is not the same as "sourced", and the drill card
still shows a "Source needed" chip.** Its **water** tile is deliberately
unsourced and always will be — see §4c. An earlier version of this document
called the "4 in 10" claim "the only unsourced number left anywhere", which was
simply wrong: it is the only one with no source *and* no reason for not having
one.

✅ **Fixed 7 Sept:** the brief said home recycling was "around 20%"; corrected to
**11% (2025, NEA)**. The real figure makes the problem bigger, not smaller.

---

## 1. Food greenhouse gas emissions — `FOOD_CO2`

**Source name:** Poore, J. & Nemecek, T. (2018), "Reducing food's environmental
impacts through producers and consumers", *Science* 360(6392), pp. 987–992 — as
tabulated by Our World in Data, "Environmental Impacts of Food Production".

**URL:** https://www.science.org/doi/10.1126/science.aaq0216 (DOI
`10.1126/science.aaq0216`, verified 7 Sept 2026)
**Open-access copy:** https://ora.ox.ac.uk/objects/uuid:b0b53649-5e93-4415-bf07-6b0b1227172f
**Erratum — check this too:** https://pubmed.ncbi.nlm.nih.gov/30792276/

**Year:** 2018 study; figures are global averages for 2005–2015 farm data.

| ☑ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☑ | `beef` | 99.48 | kg CO₂e per kg | **Yes** — both swap cards |
| ☑ | `lamb` | 39.72 | kg CO₂e per kg | No |
| ☑ | `cheese` | 23.88 | kg CO₂e per kg | No |
| ☑ | `pork` | 12.31 | kg CO₂e per kg | No |
| ☑ | `chicken` | 9.87 | kg CO₂e per kg | **Yes** — swap card 1 |
| ☑ | `eggs` | 4.67 | kg CO₂e per kg | **Yes** — "since January" panel |
| ☑ | `rice` | 4.45 | kg CO₂e per kg | No |
| ☑ | `milk` | 3.15 | kg CO₂e per kg | **Yes** — "since January" panel |
| ☑ | `tofu` | 3.16 | kg CO₂e per kg | **Yes** — swap card 2 |
| ☑ | `tomatoes` | 2.09 | kg CO₂e per kg | **Yes** — "since January" panel |
| ☑ | `bread` | 1.57 | kg CO₂e per kg | **Yes** — food-saved card + panel |
| ☑ | `bananas` | 0.86 | kg CO₂e per kg | **Yes** — "since January" panel |
| ☑ | `otherVegetables` | 0.53 | kg CO₂e per kg | **Yes** — "since January" panel |
| ☑ | `rootVegetables` | 0.43 | kg CO₂e per kg | **Yes** — "since January" panel |

> **Re-entered to two decimal places, and it settled a flag.** At one decimal
> place `milk` and `tofu` were both "3.2" and looked like a copy-paste error.
> They are actually **3.15** and **3.16** — genuinely near-identical, which is a
> better fact for the report than a typo would have been.
>
> **Which phone you are on changes what appears.** The "since January" panel reads
> that resident's own history in `activity.js`. `eggs`, `milk`, `tomatoes`,
> `bananas` and `rootVegetables` only appear on **Henrison's** phone;
> `otherVegetables` only appears on **Mr Lim's** (his one bag of long beans).
> `bread` appears on Henrison's. If you are screenshotting the panel to show a
> figure, check you are on the right phone.

---

## 2. Food water footprint — `FOOD_WATER`

✅ **Verified by the team.** These come from **two different papers**, now split
into two constants in `factors.js` so each figure points at the right one. Both
papers were opened and the totals re-added from their green/blue/grey columns on
7 Sept 2026.

**Crops paper** — Mekonnen & Hoekstra (2011), *Hydrology and Earth System
Sciences* 15, pp. 1577–1600, doi:10.5194/hess-15-1577-2011
https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf

**Animals paper** — Mekonnen & Hoekstra (2012), "A Global Assessment of the Water
Footprint of Farm Animal Products", *Ecosystems* 15, pp. 401–415,
doi:10.1007/s10021-011-9517-8
https://waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf

**Year:** 2011 for crops, 2012 for animals. Both are the journal versions. (The
Value of Water *report series* numbers 47 and 48 are the 2010 pre-journal
versions of the same work — cite the journal papers and there is no ambiguity.)

### Animal products — from the 2012 paper

| ☑ | Key | Value | Green + blue + grey | Table | On screen? |
|---|---|---|---|---|---|
| ☑ | `beef` | 15,415 | 14,414 + 550 + 451 | T1, weighted avg | **Yes** — both swap cards |
| ☑ | `pork` | 5,988 | 4,907 + 459 + 622 ("Pig meat") | T3, p. 409 | No |
| ☑ | `cheese` | 5,060 | 4,264 + 439 + 357 | T1, weighted avg | No |
| ☑ | `chicken` | 4,325 | 3,545 + 313 + 467 | T3, p. 409 | **Yes** — swap card 1 |
| ☑ | `eggs` | 3,265 | 2,592 + 244 + 429 | T3, p. 409 | No |
| ☑ | `milk` | 1,020 | 863 + 86 + 72 | T3, p. 409 | No |

### Crop products — from the 2011 paper

Three of these were corrected on 7 Sept 2026. All are now **specific product
lines**, not aggregate categories — two of them previously were, and were wrong
for it.

| ☑ | Key | Value | Table entry (green + blue + grey) | On screen? |
|---|---|---|---|---|
| ☑ | `tofu` | 2,523 | **"Soya curd"** 2397 + 83 + 44 | **Yes** — swap card 2 |
| ☑ | `rice` | 2,172 | **"Rice, husked (brown)"** 1488 + 443 + 242 | No |
| ☑ | `bread` | 1,608 | **"Wheat bread"** 1124 + 301 + 183 | **Yes** — food-saved card |
| ☑ | `bananas` | 790 | **"Bananas"** 660 + 97 + 33 | No |

### Aggregate categories — from the 2012 paper's Table 3

| ☑ | Key | Value | Table entry | On screen? |
|---|---|---|---|---|
| ☑ | `otherVegetables` | 322 | "Vegetables" 194 + 43 + 85 | No |
| ☑ | `rootVegetables` | 387 | "Starchy roots" 327 + 16 + 43 | No |

> ### What the corrections actually were
>
> | Key | Was | Now | Why the old one was wrong |
> |---|---|---|---|
> | `bread` | 1,827 | **1,608** | 1,827 is **"Wheat"** — the raw grain, not bread |
> | `bananas` | 962 | **790** | 962 is the aggregate **"Fruits"** category |
> | `rootVegetables` | 322 | **387** | 322 was a copy of `otherVegetables`; this is "Starchy roots" |
> | `rice` | 2,497 | **2,172** | 2,497 is **"Rice, broken"**; 2,172 is husked/brown |
>
> The `rice` change is a **choice**, not a fix — the table lists paddy 1,673,
> husked (brown) 2,172, broken 2,497, flour 2,628. Brown rice is a defensible
> pick; just say which one if the number is quoted.
>
> ⚠️ `otherVegetables` and `rootVegetables` are **baskets of produce, not
> specific crops**. `activity.js` uses `rootVegetables` for a bag of carrots, so
> word it as "root vegetables" in the report, never "carrots".

---

## 3. Prices — `FOOD_PRICE_SGD`

✅ **One source, one date, comparable cuts.** All four are NTUC FairPrice online
listings read **7 September 2026** (https://www.fairprice.com.sg/), and the two
meats are both plain raw boneless meat sold for cooking.

| ☑ | Key | Value | Product | Per kg |
|---|---|---|---|---|
| ☑ | `beef` | 17.80 | Tasty Food Affair Beef Shin Shank Cube, 500g @ $8.90 | $17.80 |
| ☑ | `chicken` | 9.15 | Hego Frozen Boneless Chicken Breast (Skinless), 1kg @ $9.15 | $9.15 |
| ☑ | `tofu` | 3.15 | Fortune Tau Kwa — Original, 450g @ $1.42 | $3.16 |
| ☑ | `bread` | 5.50 | White bread — representative mid-range figure (decided) | $5.17–$5.64 band |

### The beef figure is corroborated

GlobalProductPrices.com gave **SGD 17.60/kg** for Singapore, January 2026, for
*"raw cubed beef meat for cooking"*. FairPrice beef shin shank cube is
**$17.80/kg**. Two independent sources within 1%.

**Put this in the report.** Agreement between independent sources is evidence,
and it is the only such cross-check anywhere in the file.

### The chicken change reversed an assumption — worth writing up

The old price was a **whole bird, bones included**, at $13.70/kg. The concern was
that correcting to boneless would make chicken *dearer* and shrink the saving.

The opposite happened. Frozen boneless breast is **$9.15/kg** — well below the
whole-bird figure — so matching the cuts made the saving **bigger**, not smaller.

| | Beef | Chicken | Saving per kg |
|---|---|---|---|
| Before (mixed sources, mismatched cuts) | 17.60 | 13.70 | $3.90 |
| **Now (one source, matched cuts)** | **17.80** | **9.15** | **$8.65** |

At 2 meals a week that moves the card's headline from roughly **$61/year to
about $135/year**. Know that before you demo it.

The evaluation-section point: *the direction of a data problem is not obvious
until you check it.* We reasoned our way to the wrong prediction and the data
corrected us.

### ⚠️ Remaining limitation — state it, don't hide it

The beef is **chilled**; the chicken is **frozen**. Fresh boneless chicken breast
runs around **$19/kg**, which would erase the saving entirely.

So the money figure is far more sensitive to fresh-vs-frozen than to which
website the price came from. CO₂ and water savings are unaffected — different
sources, per kg of food.

### Three products agree on the chicken

| Product | Pack | Price | Per kg |
|---|---|---|---|
| Betagro IQF Frozen Skinless Boneless Breast | 1kg | $8.95 | $8.95 |
| **Hego Frozen Boneless Breast (Skinless)** | 1kg | $9.15 | **$9.15** ← used |
| CP Selection Raw Frozen Breast — Boneless Skinless | 1kg | $10.95 | $10.95 |

Marinated and organic lines were excluded deliberately — a different product, not
a different price for the same one.

---

## 4. Manufacturing — `MANUFACTURING_CO2`

✅ **Sourced 8 Sept 2026**, after three earlier searches failed. ⬜ **Claude found
it; nobody has opened the page.** Box stays empty until one of you does — and
this one is on screen, so it is worth ten minutes.

| ☑ | Key | Value | Unit | Source |
|---|---|---|---|---|
| ☐ | `powerDrill` | 6.165 | kg CO₂e **per kg of tool** | Edinburgh Tool Library |

**Source:** Edinburgh Tool Library, "Carbon Data for Sharing Libraries"
https://edinburghtoollibrary.org.uk/carbon-data-for-sharing-libraries/

**Note the unit** — per kilogram of tool, not per drill, which is how the source
states it. `ASSUMPTIONS.drillMassKg` (1.5 kg) converts it, so at present the card
works on **6.165 × 1.5 ≈ 9.25 kg CO₂e per drill**.

### ⚠️ This is a derived estimate, not a measurement — say so

Edinburgh Tool Library built it from reputable underlying sources:

- **ICE database** (Circular Ecology / University of Bath)
- **UK Government GHG Reporting Conversion Factors 2020** — battery value 12.119,
  used because ICE carries no battery figure
- **Climate Impact Forecast** — motors under 500W

…but the composition split is **their assumption**: 30% battery, 15% motor, 15%
solid metal, 40% plastic/rubber. Quote the derivation, not just the number.

Second limitation: it's a **UK** figure. Manufacturing carbon travels a global
supply chain so it transfers reasonably, but say that you're applying a UK figure
to Singapore.

### ✅ Now independently cross-checked — and it holds

The USEEIO model used for the water figure (§4d) also carries a greenhouse gas
coefficient for the same sector: `0.30794485525397181` kg CO₂e per USD, row 10.
Run through the identical price chain (USD 28.33 in 2012 producer prices):

| Method | kg CO₂e per drill |
|---|---|
| Edinburgh Tool Library — process-based, per kg of tool | **6.10** |
| EPA USEEIO — spend-based, whole supply chain | **8.72** |

**1.4× apart, and that is a good result.** Spend-based input-output models
normally run *higher* than process LCAs, because they sweep in the entire
supply chain — the accountants, the marketing, the office heating — where a
process LCA draws a boundary and stops. A factor of 1.4 between two completely
independent methods is agreement, not conflict.

**We are keeping the Edinburgh figure**, for three reasons worth stating:

- It is **anchored to mass**, not price. The USEEIO number would change if the
  drill went on sale, which is nonsense as physics.
- It is **specific to power tools**, with a published composition split. USEEIO
  gives a whole-sector average.
- Keeping them separate **preserves the cross-check**. Adopt USEEIO for both CO₂
  and water and we would have one method and no corroboration.

⚠️ The consequence, which must be stated: the drill card's CO₂ and water now come
from **different methods**. That is defensible — each is the best available for
its own quantity, and there is no consumptive-water equivalent of Edinburgh, nor
a mass-based water figure anywhere — but it is a mixed basis and the report
should say so plainly rather than let a marker find it.

### Why this is a good story for the report

Three searches failed because **no drill manufacturer publishes an EPD**, and the
LCA literature covers buildings and IT hardware, not hand tools. The figure that
finally worked came from a **tool library** — a sharing organisation of exactly
the kind this app models, which had to derive its own number for the same reason
we couldn't find one.

And the mechanism did its job: the card showed a "Source needed" chip for three
weeks rather than a plausible guess. That's the sourcing discipline working, and
it's evidence of method — screenshot the before and after.

---

## 4b. The drill's price and mass — `ITEM_PRICE_SGD`, `ITEM_MASS_KG`

✅ **Sourced 8 September 2026 from one listing**, which is the point: the price
and the weight have to describe the same object.

⬜ **Claude read the listing; nobody on the team has.** Both boxes stay empty
until one of you loads the page. Retail listings also *move* — a price read in
September may not hold in a report submitted later, so re-check this one near the
deadline and note the date you last saw it.

**Source:** Horme Hardware Singapore, "BOSCH 12V 2X2.0AH LI-ION DRILL DRIVER
GSR120-LI" — https://www.horme.com.sg/product.aspx?id=8991 (read 8 Sept 2026)

| ☑ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☐ | `ITEM_PRICE_SGD.powerDrill` | 134.06 | SGD for one drill, incl. GST | **Yes** — drill card, **money** |
| ☐ | `ITEM_MASS_KG.powerDrill` | 0.99 | kg, drill with battery | **Yes** — drill card, **CO₂ and waste** |

### Both numbers moved, in opposite directions — this is the write-up

The card previously ran on a hand-authored **$89** and an assumed **1.5 kg**.

| | Was | Now | Effect on the card |
|---|---|---|---|
| Price | $89 (invented) | **$134.06** | money saved got **bigger** |
| Mass | 1.5 kg (assumed) | **0.99 kg** | CO₂ and waste got **smaller** |

At the default of one drill a year the card goes from *9.2 kg CO₂ / $89 / 1.5 kg*
to **6.1 kg CO₂ / $134 / 1.0 kg**. We were under-claiming the money and
over-claiming the physics, and no amount of thinking about it would have told us
which way round that was.

**This is the second such case** — the chicken price was the first. Two
independent examples is enough to state it as a finding rather than an anecdote:
*you cannot reason out the direction of a data error; you have to go and look.*

### The qualifier mattered more than the number

The mass **must include the battery**. Edinburgh's factor (§4) is built on a tool
assumed to be **30% battery by mass**, so multiplying it by a bare-tool weight
would value the battery's carbon at nothing — roughly a third of the figure,
missing silently. Two of the four listings quote a bare-tool weight.

### The four drills priced, so the choice is on the record

| Drill (Horme, 8 Sept 2026) | Price | Weight | Battery in the weight? |
|---|---|---|---|
| **Bosch GSR120-LI** | **$134.06** | **0.99 kg** | **Yes** ← used |
| Stanley SCD10D2K-B1 | $103.55 | 1 kg | Unclear, and out of stock |
| Hikoki DS12DA | $160.98 | 1.2 kg | Yes |
| Stanley SCD12S2 | $168.95 | 1 kg | **No** |

The Bosch is the cheapest whose weight unambiguously includes the battery.
Nothing entry-level in Singapore is anywhere near $89 — that was the error.

### ⚠️ Two limitations to state

- The price is the **kit** — tool, two batteries, charger, case. That is what a
  person who doesn't borrow actually pays, so it is the right figure for a
  money-*saved* claim, but say that it is a kit.
- The mass is the tool **with one battery**, while the buyer takes home two
  batteries, a charger and a case. So the material saved is **larger** than we
  claim. Under-claiming, same direction as the beef shin cut.

---

## 4c. The drill's water figure — a chip, then a search, then a number

**Superseded on 8 Sept 2026 — read this for the story, then read §4d for the
figure.** It is a good story and it should go in the report roughly as told here.

For weeks `src/lib/impact.js` set the drill's water saving to `UNSOURCED` on
purpose, and the card showed a "Source needed" chip:

> *Borrowing a drill does not save water in any way we can evidence, and an
> unevidenced zero is still a claim. Say we do not know.*

That was the right call at the time. Writing `0` would have claimed borrowing
saves no water, which is almost certainly false and which we had no evidence for
either way. The Edinburgh Tool Library data covers carbon only.

**Then somebody went and looked**, with the EPA's USEEIO input-output model, and
the answer turned out to be findable after all — see §4d. The sequence is the
point: the chip held the place open, nobody filled it with a guess, and when a
real figure arrived it went in with its derivation attached.

⚠️ **No card shows a "Source needed" chip any more.** If you want a screenshot of
the mechanism working — and you should, it is evidence of method — take it from
the 21 Aug progress update, or check out an earlier commit. The chip is still in
the code and still fires; there is just nothing left for it to fire on.

### ⚠️ The mechanism cannot tell two different things apart — say this in the report

A "Source needed" chip currently means either of two quite different things, and
the screen renders them identically:

| | What it means | Example |
|---|---|---|
| **A job not yet done** | A figure exists in the world; we haven't found it | Tofu water, before 7 Sept |
| **A considered position** | We don't believe we can evidence this at all | The drill's water, permanently |

This is a **real limitation of our own design**, found on 8 Sept, and it is
better raised by us than by a marker. It is currently dormant rather than solved:
nothing on screen shows a chip today, so nothing is being misread — but the
ambiguity is still in the code, waiting for the next unsourced figure.

Note what actually resolved the drill's case: **not** a second chip wording, but
going and finding the number. Worth remembering before designing a nicer way to
say "we don't know". Whether to distinguish the two meanings in the UI is still a
**design decision the team should make**, not a bug to quietly patch:

- **Leave it as one chip.** Simpler, and it never lets us quietly downgrade "we
  couldn't be bothered" into "unknowable". One chip keeps the pressure on.
- **Split it in two.** More honest on screen, and stops a demo viewer reading a
  deliberate position as an unfinished one. Costs a second state in
  `ImpactStats.jsx` and a reason field on the factor.

---

## 4d. The drill's water — `ITEM_WATER_L` = 350 L withdrawn

✅ **Sourced 8 September 2026** from the **EPA's USEEIO v2.0.1** model, from the
workbook a team member downloaded (`USEEIOv2.0.1-411.xlsx`, 50 MB).

**Source:** US EPA, USEEIO v2.0.1, model `USEEIOv2.0.1-411`, sheet `N`, column
`333991/US` — "Power tools", BEA *Power-driven handtool manufacturing* — row
**Freshwater withdrawals** = `12.36917396026797` kg per USD.
Creators: Ingwersen, W.; Li, M.; Young, B.; Vendries, J.; Birney, C.

| ☐ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☐ | `ITEM_WATER_L.powerDrill` | 350 | litres **withdrawn** per drill | **Yes** — drill card, tile labelled **"Water withdrawn"** |

### ⚠️ This is not the same quantity as the food water figures

Mekonnen & Hoekstra (§2) give a **consumptive** footprint: water evaporated,
transpired, or needed to dilute pollution. USEEIO gives **withdrawals**: water
taken out of a river or aquifer, most of which is power-station cooling water
that goes straight back. **Same unit, different physical quantity.**

That is why the drill card's tile is labelled **"Water withdrawn"** and the food
cards keep "Water". Letting them share a label would repeat the exact error this
project has already made twice — the wheat-vs-bread water figure, and the
index-vs-shelf-price basis. Say this in the report; it is the strongest single
piece of evaluation on the whole card.

### We checked whether a better-matched figure existed. It does not.

Worth writing up, because a negative result found by looking is still a finding:

1. **No blue/consumptive water anywhere in the model.** USEEIO contains exactly
   **four** water flows — fresh surface, fresh subterranean, saline surface,
   saline subterranean. All withdrawals, all kg. No blue-water, green-water,
   consumptive or evapotranspiration row exists. (The only "blue" in the 2,722
   flows is Trypan blue and Direct Blue 218. They are dyes.)
2. **Going below the summary indicator returns the same number.** In matrix `M`
   the two fresh-water flows are `10.814731453113991` and `1.554442507153987`.
   They sum to `12.369173960267978` — the `N` row 9 value to fourteen decimal
   places. Row 9 *is* those two flows added up.
3. **Matrix `B` is a trap.** It holds only `2.73` kg/$ for this sector, which
   looks like a more conservative figure but is not a comparable one: `B` is
   **direct** flows — the drill factory alone, no supply chain. It is 22% of the
   total. Using it would have understated by **4.5×**.

### ⬜ Does the 350 L include grey water? **No.** Checked 8 Sept 2026.

Asked directly, and answered from the model's own characterisation matrix `C`
rather than from assumption:

| Indicator | Flows with a non-zero factor | What they are |
|---|---|---|
| **Freshwater withdrawals** | **2**, both at factor 1.0 | `Water, fresh` from a surface body; `Water, fresh` from underground |
| Freshwater Ecotoxicity | 1,282 | chemicals emitted to water |
| Eutrophication | 10 | nitrogen, ammonia, BOD, COD |

`WATR` characterises **exactly two resource-extraction flows at factor 1.0**. It
is a pure volume-in count and **no pollutant ever enters it**.

The pollution *is* in the model — 1,282 chemical flows feed ecotoxicity — but it
comes out as **CTUe** and **kg N eq**, which are impact potentials. A grey water
footprint is the *volume of clean water needed to dilute pollutants to ambient
quality standards*; USEEIO never performs that conversion, so there is no grey
figure in the file to extract.

### This is the sharpest version of the mismatch — put it in the report

The food figures are green + blue + grey **consumed**. Here is what they are
actually made of:

| Food | Green | Blue | Grey | Total | Green share |
|---|---|---|---|---|---|
| beef | 14,414 | 550 | 451 | 15,415 | **93.5%** |
| chicken | 3,545 | 313 | 467 | 4,325 | **82.0%** |
| tofu | 2,397 | 83 | 44 | 2,524 | **95.0%** |
| bread | 1,124 | 301 | 183 | 1,608 | **69.9%** |

**Green water — rain evapotranspired by the crop — dominates every one of them.**
A drill factory has no green water at all; nothing is grown.

So the drill's 350 L and the beef card's 15,415 L/kg have **no component in
common**:

- **Food:** green + blue + grey, *consumed* — evaporated, transpired, or polluted
- **Drill:** freshwater *withdrawn*, largely power-station cooling water, most of
  which returns to the river

Not even the blue component lines up, because blue is consumptive and `WATR` is
withdrawal. This is why the tile is labelled **"Water withdrawn"** and why that
label must never be merged with the food cards' "Water". If a marker asks one
question about the water figures, it will be this one.

### The derivation — check this, not just the source

The coefficient is per **2012 producer-price** dollar, so the shelf price has to
be walked back to that basis. Each step and why:

| Step | Factor | Result | Why |
|---|---|---|---|
| Shelf price (§4b) | — | SGD 134.06 | What a person pays |
| Remove GST | ÷ 1.09 | SGD 122.99 | A Singapore consumption tax is not revenue to a US manufacturer |
| To USD | × 0.78942 | USD 97.09 | Rate on 8 Sept 2026 |
| **Deflate to 2012 USD** | × 0.639155 | USD 62.06 | BLS PPI **PCU333991333991**, this exact industry: 2012 annual average **184.44** ÷ **288.571** (June 2025) |
| **Price type** | × 0.456537 | **USD 28.33** | USEEIO's own `Phi` matrix for 333991/US, 2012 |
| Apply coefficient | × 12.369174 | **350.4 L** | Stored as **350** |

**The two adjustments matter enormously.** Naively multiplying the retail price
by the coefficient gives **1,309 L** — 3.7× too high. `Phi` alone removes 54% of
it (retail margin, wholesale margin and freight belong to *other* sectors), and
the deflator removes another third.

### ⚠️ Four limitations — all of them go in the report

1. **Spend-based.** The same drill bought on sale would "use" less water. That is
   an artefact of the method, not physics.
2. **A US model** applied to a drill bought in Singapore and probably made in
   China. Bigger transfer assumption than the UK carbon figure.
3. **The deflator ends at June 2025**, the last observation in the BLS series.
   There is no 2026 index yet.
4. **Sector averages.** USEEIO knows "power tools", not a Bosch GSR120-LI.

Treat it as an order-of-magnitude screening estimate. **Write "roughly 350
litres", never "350 litres".**

Leaving GST in would give **382 L**. We took 350 — the better-argued figure, and
where two readings are defensible this project takes the one that claims less.

---

## 5. Singapore national figures — `SINGAPORE`

Sourced 7 Sept 2026 from primary publications **by Claude. Nobody on the team has
opened these four pages** — that is why every box below is empty, and it is open
item 1. **None of these reach a screen** — they are report material, so they
cannot break the demo, only the bibliography. Each is republished yearly, so
always quote the year, and check you are reading the same year's page.

| ☐ | Key | Value | Unit | Year | Source | URL | On screen? |
|---|---|---|---|---|---|---|---|
| ☐ | `gridEmissionFactor` | 0.402 | kg CO₂ per kWh | 2024 | EMA, via NCCS "Power" | https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/ | No |
| ☐ | `householdWaterPerPerson` | 141 | L per person per day | 2025 | PUB press release, 17 Mar 2026 | https://www.pub.gov.sg/Resources/News-Room/PressReleases/2026/03/Its-Everyones-Business-to-Make-Every-Drop-Count | No |
| ☐ | `domesticWasteGeneratedPerPerson` | 0.83 | kg per person per day | 2025 | NEA, Waste Statistics and Overall Recycling | https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling | No |
| ☐ | `domesticRecyclingRate` | 11 | per cent | 2025 | NEA, Waste Statistics and Overall Recycling | https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling | No |

> ⚠️ **Two things to carry into the report:**
>
> 1. `domesticWasteGeneratedPerPerson` is waste **generated**, not **disposed**.
>    NEA stopped publishing disposed-per-capita after 2015. Generated = disposed
>    + recycled, so it is a larger number. Never call it "waste sent to the
>    incinerator".
> 2. `domesticRecyclingRate` is **11%**, but our own problem statement in
>    `CLAUDE.md` says "around 20%". The 20% figure is stale. Using the current
>    11% makes our problem look *bigger*, so this correction is in our favour —
>    but the brief still needs fixing.

---

## 6. Green Plan 2030 targets — `GREEN_PLAN_TARGETS`

Targets, not measurements. **Not on any screen.** ⬜ **Claude read the targets
page; nobody on the team has.** Both boxes stay empty until one of you does.
Targets are also revised — confirm these are still the current ones.

**Source name:** Singapore Green Plan 2030, "Our Targets"
**URL:** https://www.greenplan.gov.sg/targets/

| ☐ | Key | Value | Unit | On screen? |
|---|---|---|---|---|
| ☐ | `householdWaterPerPerson` | 130 | L per person per day by 2030 | No |
| ☐ | `wasteToLandfillReduction` | 30 | % cut by 2030 (interim 20% by 2026) | No |

---

## 7. Stated assumptions — `ASSUMPTIONS`

Not measurements and not pretending to be — they are our choices, so there is
nothing to *verify*. Instead, tick when the assumption is **written into the
report's methodology paragraph**, which is where it earns its keep.

| ☐ | Key | Value | Unit | Source | On screen? |
|---|---|---|---|---|---|
| ☐ | `portionKg` | 0.15 | kg per portion | Our assumption — 150 g per main meal | **Yes** — both swap cards |
| ☐ | `breadLoafKg` | 0.4 | kg per loaf | Our assumption — supermarket sandwich loaf | **Yes** — food-saved card |
| ☐ | `weeksPerYear` | 52 | weeks | Arithmetic | **Yes** — both swap cards |
| ☐ | `monthsPerYear` | 12 | months | Arithmetic | **Yes** — food-saved card |

✅ **`drillMassKg` has left this section.** On 8 Sept it stopped being an
assumption and became a spec — a real drill's stated weight — so it moved out of
`ASSUMPTIONS` and into `ITEM_MASS_KG`. See §4b. The three above are the only
assumptions left in the app, and all three are arithmetic or portion sizes.

---

## 8. Numbers on screen that are **not** in `factors.js`

⚠️ **This is the real gap.** These reach a rendered screen and read as factual
claims, but they sit outside the sourcing mechanism entirely — no `source` field,
no "Source needed" chip if they're wrong. On screen they look exactly as
authoritative as the Poore & Nemecek numbers.

| ☐ | Where | Value | What it claims | On screen |
|---|---|---|---|---|
| ➡️ | ~~`habits.js` → `borrow-drill.priceSgd`~~ | ~~89~~ | **Moved 8 Sept** — now `ITEM_PRICE_SGD.powerDrill` = 134.06, inside the mechanism and sourced. Not a ☑: nobody has opened the listing yet. See §4b. | Drill card — **money saved** |
| ☐ | `facilities.js` → `walkMinutes` | 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 9, 11, 12, 14, 16 | Walking time from Blk 442 to each facility | Every facility card + sheet |
| ☐ | `facilities.js` → EV charger `detail` | "2 bays … free for the first 30 minutes" | Bay count and charging tariff | Facility sheet |
| ☐ | `listings.js` → `price` | 8, 12 | Rental asking prices in SGD | Listing cards |

**How to close each:**

- ~~**Drill price**~~ — ✅ **done 8 Sept.** One Horme listing settled the price
  and the mass together, and both now sit in `factors.js` with a `source`, so the
  drill card has no number left outside the mechanism. §4b has the write-up.
- **Walk times** — invented. `facilities.js` already warns that the facilities
  themselves are invented, so the walk times inherit that. Lowest-effort fix is
  one sentence in the report: distances are illustrative. Higher-effort: walk it,
  or measure on a map.
- **EV charger detail** — a specific tariff claim about a real location. Either
  check it or soften the wording.
- **Rental prices** — these are a *neighbour's asking price* in a made-up
  scenario, not a claim about the world. Lowest risk on this list; no action
  needed beyond the general "all listings are mock" statement.

---

## 9. Design parameters — decisions, not measurements

Nothing here needs a source. They need **stating** in the report, the same way
§7's assumptions do: a parameter you've written down is a design choice, one you
haven't is a magic number.

| ☐ | Where | Values | What it sets |
|---|---|---|---|
| ☐ | `events.js` → `pointsForAttending` | 20, 30, 40, 50, 60 | Points per event, scaled by effort |
| ☐ | `foodShelf.js` → `points` | 30 (all six) | Points for rescuing food |
| ☐ | `listings.js` → `points` | 0, 15, 20, 25, 40 | Points by listing type |
| ☐ | `residents.js` → `points` | 1240 (Henrison), 860 (Mr Lim) | Opening balances for the demo |
| ☐ | `pairing.js` → `TAPER` | [1, 1, 0.5, 0.25, 0] | Repeat-exchange taper |
| ☐ | `nudges.js` → `REPEAT_THRESHOLD` | 3 | Borrows before "consider buying" fires |
| ☐ | `nudges.js` → `END_OF_MONTH_DAY` | 25 | Day a share counts as "end of month" |
| ☐ | `nudges.js` → late-share ratio | 0.6 | Share of items that must be late to fire |
| ☐ | `impact.js` → rounding thresholds | 10, 100, 1000 | Where the display rounds harder |

The taper and the rounding thresholds are already argued for in comments in their
own files — reuse that prose in the report rather than rewriting it.

---

## 10. Mock scenario data — plausibility only

No sourcing applies. These are the invented world the demo runs in. Two files
already carry warnings; the point of listing them here is so nobody mistakes one
for a finding.

| ☐ | Where | What | Already flagged in-file? |
|---|---|---|---|
| ☐ | `neighbourhoods.js` | Scores 81 / 76 / 68 / 64 / 59 / 52 | ✅ "EVERY SCORE BELOW IS INVENTED" |
| ☐ | `facilities.js` | Whether each facility exists at that spot | ✅ header warning |
| ☐ | `facilities.js` | `x` / `y` map positions | ✅ "not real coordinates" |
| ☐ | `activity.js` | Food weights (0.3–2.0 kg), borrow counts, events attended | ✅ "ALL INVENTED" |
| ☐ | `events.js` | Event titles, dates, venues | ✅ "All invented" |
| ☐ | `listings.js` | Items, prices, owners | ✅ "ALL INVENTED" |
| ☐ | `foodShelf.js` | Items, expiry dates, owners | ✅ "ALL INVENTED" |
| ☐ | `recipes.js` | Recipes, times, ingredient tags | ⚠️ partial — disclaims the *times* and says no CO₂ is claimed, but does not say the recipes are invented. Lowest risk on this list: a recipe is not a claim about Singapore. |
| ☐ | `residents.js` | Names and block numbers | ✅ added 8 Sept — was the last mock file with no warning |

**Corrected 8 Sept 2026.** Three rows above used to say "no warning"; those
warnings have since been added, and this table had not kept up. `residents.js`
was the genuine remaining gap and is now closed — it is the riskiest of the set,
being invented people attached to real Clementi addresses.

⚠️ **Real block numbers, invented facts.** The blocks and streets are real
Clementi addresses. Don't let the report imply anyone surveyed them, and don't
attach an invented resident to a real address in a way that reads as real.

`activity.js` drives the "since January" panel, so its weights become the CO₂
total on screen. They're plausible, not measured — worth a line.

---

## 11. Claims in the written brief (`CLAUDE.md`)

| ☐ | Claim | Status |
|---|---|---|
| ☐ | **"Around 4 in 10 Singaporeans"** don't act on sustainability | ⚠️ **UNSOURCED** — find the survey or drop it |
| ➡️ | Domestic recycling rate | **Fixed 7 Sept:** was "around 20%", now **11% (2025, NEA)**. The brief is corrected; the NEA figure behind it is still on §5's unverified list. |

The "4 in 10" is the opening line of your problem statement, so it's the first
number a marker meets. It reads like it came from a survey — find which one.

---

## Sources index

- Poore & Nemecek (2018), *Science* — https://www.science.org/doi/10.1126/science.aaq0216
- Poore & Nemecek, open-access — https://ora.ox.ac.uk/objects/uuid:b0b53649-5e93-4415-bf07-6b0b1227172f
- Poore & Nemecek erratum — https://pubmed.ncbi.nlm.nih.gov/30792276/
- Mekonnen & Hoekstra (2011), **crops** — https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf (doi:10.5194/hess-15-1577-2011) — tofu = "Soya curd", Table 3, p. 1586
- Mekonnen & Hoekstra (2012), **farm animals** — https://waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf (doi:10.1007/s10021-011-9517-8) — Tables 1 and 3, pp. 408–409
- Mekonnen & Hoekstra, Report 47 (2010 report-series version of the crops paper) — https://www.waterfootprint.org/resources/Report47-WaterFootprintCrops-Vol1.pdf
- Mekonnen & Hoekstra, Report 48 (2010 report-series version of the animals paper) — https://digitalcommons.unl.edu/wffdocs/83/
- NCCS, "Power" (grid emission factor) — https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/
- PUB press release, 17 Mar 2026 — https://www.pub.gov.sg/Resources/News-Room/PressReleases/2026/03/Its-Everyones-Business-to-Make-Every-Drop-Count
- NEA, Waste Statistics and Overall Recycling — https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling
- Horme Hardware Singapore, Bosch GSR120-LI listing (drill price and weight) — https://www.horme.com.sg/product.aspx?id=8991
- US EPA, USEEIO v2.0.1 (`USEEIOv2.0.1-411.xlsx`) — sheets `N`, `M`, `B`, `Phi`, `Rho`, `flows`, `indicators`; model page https://www.epa.gov/land-research/us-environmentally-extended-input-output-useeio-models
- BLS Producer Price Index, Power-Driven Handtool Manufacturing, series PCU333991333991 — https://fred.stlouisfed.org/series/PCU333991333991
- Singapore Green Plan 2030, Our Targets — https://www.greenplan.gov.sg/targets/
- Water Footprint Network product gallery — https://www.waterfootprint.org/resources/interactive-tools/product-gallery/ (no longer needed for tofu)
