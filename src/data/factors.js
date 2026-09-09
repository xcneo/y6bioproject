// Conversion factors. Every number the Impact Calculator shows comes from here.
//
// ─────────────────────────────────────────────────────────────────────────────
//  READ THIS BEFORE THE REPORT GOES IN
// ─────────────────────────────────────────────────────────────────────────────
//
// The rule from CLAUDE.md is that no figure shown to a user may be invented.
// Every entry below therefore carries a `source`.
//
// ⚠️  BUT: these were written from Claude's memory of well-known published
//     figures. Memory is not a citation. Before any of these numbers goes in
//     the report or on a poster, one of you must OPEN the cited source and
//     check the value. Some are probably a decimal place out.
//
//     Do the food ones first — they drive the biggest headline numbers.
//
// Entries with `value: null` and `source: TODO_SOURCE` are ones Claude did not
// have a trustworthy figure for. The app deliberately shows a "source needed"
// chip wherever one is used, instead of quietly inventing a plausible number.
// Fill them in and the chip disappears. That is the sourcing discipline made
// visible — screenshot it, it is evidence of method.
//
// Shape of an entry:
//   value   the number, in `unit`, or null when unknown
//   unit    what the number counts, written out
//   source  where it came from, specific enough to find again
//   hint    (only on TODO_SOURCE entries) where to go looking

export const TODO_SOURCE = 'TODO_SOURCE — nobody has sourced this yet'

// True when a factor is safe to show a user.
export function isSourced(factor) {
  return factor != null && factor.value != null && factor.source !== TODO_SOURCE
}

// ─── Greenhouse gas emissions of food ────────────────────────────────────────
//
// All from the same study, so the foods are comparable with each other — which
// matters, because the calculator works on the DIFFERENCE between two foods.
// Mixing sources here would be worse than using slightly stale numbers.
//
// These are global averages across the whole supply chain (farm to retail).
// Singapore imports over 90% of its food, so a Singapore-specific figure would
// differ — that is a fair limitation to raise in the evaluation section.

// Checked against the source by the team, 7 Sept 2026, and re-entered to two
// decimal places. Worth knowing why that mattered: at one decimal place milk and
// tofu were both "3.2" and looked like a copy-paste error. They are actually
// 3.15 and 3.16 — genuinely near-identical, which is a more interesting fact
// than a typo would have been, and a fair thing to point out in the report.
//
// The extra decimal is precision in the FACTOR, not in the answer. The screen
// still rounds hard on purpose (see the formatting note in lib/impact.js).
const POORE_NEMECEK =
  'Poore & Nemecek (2018), "Reducing food\'s environmental impacts through producers and consumers", Science 360(6392), pp. 987–992 — as tabulated by Our World in Data, "Environmental Impacts of Food Production"'

export const FOOD_CO2 = {
  beef: { value: 99.48, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  lamb: { value: 39.72, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  cheese: { value: 23.88, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  pork: { value: 12.31, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  chicken: { value: 9.87, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  eggs: { value: 4.67, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  rice: { value: 4.45, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  milk: { value: 3.15, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  tofu: { value: 3.16, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  tomatoes: { value: 2.09, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  bread: { value: 1.57, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  bananas: { value: 0.86, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  otherVegetables: { value: 0.53, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  rootVegetables: { value: 0.43, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
}

// ─── Water footprint of food ─────────────────────────────────────────────────
//
// Different study from the CO₂ figures, so do not mix the two in one sentence
// without saying so. Global averages again, and these are TOTAL water footprint
// (rain, irrigation and dilution combined), which is why the numbers look huge.

// These figures come from TWO different papers by the same authors, so they are
// split into two constants. Both have now been opened and the values checked
// against the actual tables (7 Sept 2026) — the table and page are recorded on
// each entry group below, so a marker can go straight to the number.

// Plants: rice, bread, bananas, vegetables, tofu.
const MH_CROPS =
  'Mekonnen & Hoekstra (2011), "The green, blue and grey water footprint of crops and derived crop products", Hydrology and Earth System Sciences 15, pp. 1577–1600, doi:10.5194/hess-15-1577-2011. PDF: https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf'

// Animals: beef, pork, cheese, chicken, eggs, milk. All six verified 7 Sept 2026
// against Table 1 (weighted global average row) and Table 3, pp. 408–409.
const MH_ANIMALS =
  'Mekonnen & Hoekstra (2012), "A Global Assessment of the Water Footprint of Farm Animal Products", Ecosystems 15, pp. 401–415, doi:10.1007/s10021-011-9517-8. PDF: https://waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf'

// Animal products. Each checked against the paper on 7 Sept 2026; the green +
// blue + grey columns that add up to each total are noted so the arithmetic is
// checkable without re-reading the table.
const MH_ANIMALS_T1 = `${MH_ANIMALS} — Table 1, "Weighted average" row`
const MH_ANIMALS_T3 = `${MH_ANIMALS} — Table 3, p. 409`

export const FOOD_WATER = {
  // 14,414 green + 550 blue + 451 grey = 15,415
  beef: { value: 15415, unit: 'litres per kg of food', source: MH_ANIMALS_T1 },
  // "Pig meat": 4,907 + 459 + 622 = 5,988
  pork: { value: 5988, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },
  // 4,264 + 439 + 357 = 5,060
  cheese: { value: 5060, unit: 'litres per kg of food', source: MH_ANIMALS_T1 },
  // "Chicken meat": 3,545 + 313 + 467 = 4,325
  chicken: { value: 4325, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },
  // 2,592 + 244 + 429 = 3,265
  eggs: { value: 3265, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },
  // 863 + 86 + 72 = 1,020
  milk: { value: 1020, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },

  // Crop products, from the crops paper's Table 3 (p. 1586 onwards). Each one is
  // a SPECIFIC product line, not an aggregate category — that distinction is
  // worth a sentence in the report, because two of these were aggregates before
  // and were quietly wrong for it.
  //
  //   "Rice, husked (brown)": 1488 + 443 + 242 = 2172
  //     The table also lists paddy 1673, broken 2497, flour 2628. We mean brown
  //     rice; say which one if the figure is quoted.
  rice: { value: 2172, unit: 'litres per kg of food', source: MH_CROPS },
  //   "Wheat bread": 1124 + 301 + 183 = 1608
  //     Previously 1827, which is the figure for "Wheat" — the raw grain, not
  //     bread. Corrected 7 Sept 2026.
  bread: { value: 1608, unit: 'litres per kg of food', source: MH_CROPS },
  //   "Bananas": 660 + 97 + 33 = 790
  //     Previously 962, which is the aggregate "Fruits" category. Now the
  //     banana line itself. Corrected 7 Sept 2026.
  bananas: { value: 790, unit: 'litres per kg of food', source: MH_CROPS },

  // These last two are AGGREGATE categories, from Table 3 of the animals paper
  // rather than a per-crop line. That is fine, but it means they describe a
  // basket of produce, not a carrot. Word it as "root vegetables" in the report,
  // never "carrots", even though activity.js uses this key for a bag of them.
  //
  //   "Vegetables":    194 + 43 + 85 = 322
  //   "Starchy roots": 327 + 16 + 43 = 387
  otherVegetables: { value: 322, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },
  // Was 322 — identical to otherVegetables, a copy-paste slip. Fixed to 387.
  rootVegetables: { value: 387, unit: 'litres per kg of food', source: MH_ANIMALS_T3 },

  // Sourced 7 Sept 2026, and the only entry in this file somebody has actually
  // opened the paper to check. The table lists it as "Soya curd", not "tofu" —
  // that is why earlier searches for "tofu" kept missing it and kept returning
  // untraceable secondary figures instead. Worth a sentence in the report: the
  // number existed in our own cited source the whole time, under another name.
  //
  // Table 3, p. 1586, FAOSTAT crop code 236:
  //   Soya curd — green 2397, blue 83, grey 44, TOTAL 2523 m³/ton
  // and m³ per tonne is the same number as litres per kg.
  tofu: {
    value: 2523,
    unit: 'litres per kg of food',
    source: `${MH_CROPS} — Table 3, p. 1586, listed as "Soya curd" (FAOSTAT code 236): green 2397 + blue 83 + grey 44 = 2523 m³/ton, i.e. litres per kg. PDF: https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2011-WaterFootprintCrops.pdf`,
  },
}

// ─── Prices ──────────────────────────────────────────────────────────────────
//
// ONE source, ONE date, COMPARABLE CUTS. All four prices are FairPrice online
// listings read on 7 September 2026, and the two meats are both plain raw
// boneless meat sold for cooking. That matters because the calculator works on
// DIFFERENCES — the same argument the CO₂ block makes for keeping to a single
// study. Two sources with better individual numbers would compare worse.
//
// This replaced an earlier setup where beef and chicken came from
// GlobalProductPrices.com and only tofu and bread came from FairPrice. Two
// things that change is worth recording:
//
//   1. It VALIDATED the beef figure. GlobalProductPrices gave SGD 17.60/kg for
//      "raw cubed beef meat"; FairPrice beef shin shank cube is $17.80/kg. Two
//      independent sources within 1%. Say that in the report — an agreement
//      between sources is evidence, and it is the only such check we have.
//
//   2. It REVERSED an assumption. The old chicken price was a whole bird, bones
//      included, and the worry was that adjusting to boneless would make chicken
//      dearer and shrink the saving. The opposite happened: frozen boneless
//      breast is $9.15/kg, well BELOW the $13.70/kg whole-bird figure, so the
//      saving grew. The lesson for the evaluation section is that the direction
//      of a data problem is not obvious until you check it.
//
// ⚠️  Remaining known limitation, state it rather than hide it: the beef is
//     chilled and the chicken is frozen. Fresh boneless chicken breast runs
//     around $19/kg, which would erase the saving entirely. The money figure on
//     the beef→chicken card is therefore sensitive to that choice, far more than
//     to the price source. The CO₂ and water savings are not affected at all.

const FAIRPRICE_ONLINE =
  'NTUC FairPrice online store (fairprice.com.sg), listings read 7 September 2026.'

export const FOOD_PRICE_SGD = {
  // Tasty Food Affair Beef Shin Shank Cube, 500g, $8.90 → $17.80/kg.
  // Cubed stewing beef: plain, raw, boneless, sold for cooking.
  //
  // Shin/shank is a CHEAP stewing cut — deliberately so. FairPrice steak cuts
  // run far higher (ribeye ~$62/kg, striploin ~$50/kg), so $17.80 sits near the
  // bottom of the beef range. That makes the beef→chicken saving the SMALLEST
  // defensible one rather than the largest, which is the right way round for a
  // marked report: we under-claim. If anyone asks why we did not use a steak
  // price, that is the answer.
  // Cross-check: GlobalProductPrices.com gave SGD 17.60/kg for Singapore in
  // January 2026 (https://www.globalproductprices.com/Singapore/beef_price/).
  beef: { value: 17.8, unit: 'SGD per kg', source: `${FAIRPRICE_ONLINE} Tasty Food Affair Beef Shin Shank Cube, 500g at $8.90 = $17.80/kg. Independently corroborated by GlobalProductPrices.com, Singapore, January 2026, at SGD 17.60/kg for "raw cubed beef meat for cooking".` },

  // Hego Frozen Boneless Chicken Breast (Skinless), 1kg, $9.15 → $9.15/kg.
  // Chosen as the middle of three plain 1 kg frozen boneless skinless breasts
  // that agree closely, which makes it a stable figure rather than one listing:
  //   Betagro IQF, 1kg, $8.95   → $8.95/kg
  //   Hego,        1kg, $9.15   → $9.15/kg   ← used
  //   CP Selection,1kg, $10.95  → $10.95/kg
  // Marinated and organic lines were excluded on purpose — they are a different
  // product, not a different price for the same one.
  chicken: { value: 9.15, unit: 'SGD per kg', source: `${FAIRPRICE_ONLINE} Hego Frozen Boneless Chicken Breast (Skinless), 1kg at $9.15 = $9.15/kg; consistent with Betagro 1kg at $8.95 and CP Selection 1kg at $10.95. Frozen, not fresh — see the note above.` },

  // Fortune Tau Kwa - Original, 450g (2-pack), $1.42 → $3.16/kg.
  // Also observed: Fortune Pasar Tau Kwa 3x150g $1.41 ($3.13/kg), Fortune
  // Silken / Chinese Tofu 300g $0.95 ($3.17/kg). Tau kwa is what the habit card
  // describes, so it is the right line to price.
  // SOFT TOFU, to match the SERVING_KG basis. Re-sourced 9 Sept 2026 from a
  // fresh FairPrice search, because the serving is HPB's "2 blocks of soft tofu
  // (170g)" and the price was previously a TAU KWA price — a different product.
  //
  // The mismatch turned out to be worth almost nothing, which is worth saying in
  // the report rather than hiding: four soft/silken/Chinese tofu products all
  // sit at 300 g for $0.95 = $3.17/kg, and tau kwa sits at $3.13-3.16/kg. About
  // 1% apart. We flagged this as a basis mismatch and it was one — it just did
  // not move the answer. Checking is what established that; assuming would not.
  tofu: { value: 3.17, unit: 'SGD per kg', source: `${FAIRPRICE_ONLINE} Re-read 9 September 2026 for soft tofu specifically, to match HPB's soft-tofu serving. Fortune Silken Tofu (Japanese) 300g at $0.95 = $3.17/kg, corroborated by three further 300g/$0.95 lines — Fortune Japanese Silken Tofu Omega 3 DHA, Fortune Silken Tofu Extra Smooth (Box) and Fortune Chinese Tofu Traditional. Firm tau kwa is within 1%: Fortune Tau Kwa 450g at $1.42 = $3.16/kg, Fortune Pasar Tau Kwa 3x150g at $1.41 = $3.13/kg.` },

  // WHITE bread, deliberately — neither the CO₂ nor the water source
  // distinguishes white from wholemeal (Poore & Nemecek give a generic "Bread",
  // Mekonnen & Hoekstra "Wheat bread"), so pricing wholemeal would make the
  // money column more specific than the three columns beside it. White is also
  // cheaper, so it under-claims rather than over-claims, and a plain white loaf
  // is the one households most often buy and most often waste.
  //
  // Observed white loaves: FairPrice Enriched White Junior 300g $1.55 ($5.17/kg);
  // Sunshine Jumbo Enriched Soft White 550g $3.10 ($5.64/kg); FairPrice White
  // High Fibre 400g $2.60 ($6.50/kg). Wholemeal starts at $6.50/kg.
  // $5.50 sits inside the white band and matches no single listing. That is a
  // DECISION, not an omission: it is a representative mid-range figure for a
  // plain white loaf, chosen between $5.17 and $5.64 rather than pinned to one
  // product whose price will have moved by the time anyone reads the report.
  // Describe it that way and it is defensible; call it a shelf price for a named
  // loaf and it is not.
  bread: { value: 5.5, unit: 'SGD per kg', source: `${FAIRPRICE_ONLINE} White bread. Within the observed range: FairPrice Enriched White Junior 300g at $1.55 ($5.17/kg) to Sunshine Jumbo 550g at $3.10 ($5.64/kg). A representative mid-range figure for a plain white loaf, not a single product price.` },
}

// ─── Manufacturing ───────────────────────────────────────────────────────────
//
// Sourced 8 Sept 2026, after three earlier searches failed. The reason they
// failed is worth a line in the report: no drill manufacturer publishes an
// Environmental Product Declaration, and the LCA literature covers buildings and
// IT hardware, not hand tools. The figure that finally worked came from a TOOL
// LIBRARY — the Edinburgh Tool Library, a sharing organisation of exactly the
// kind this app is modelled on, which had to derive its own number for the same
// reason we could not find one.
//
// ⚠️  This is a DERIVED estimate, not a measurement. Describe it that way.
//     Edinburgh Tool Library built it from reputable underlying sources —
//     the ICE database (Circular Ecology / University of Bath), UK Government
//     GHG Reporting Conversion Factors 2020, and Climate Impact Forecast — but
//     the composition split is their assumption: 30% battery, 15% motor, 15%
//     solid metal, 40% plastic/rubber. Quote the derivation, not just the number.
//
//     Second limitation: it is UK-based. Manufacturing carbon travels through a
//     global supply chain so it transfers reasonably, but say that it is a UK
//     figure applied to Singapore.
//
// Note the UNIT. This is per kilogram of tool, not per drill — which is how the
// source states it, and it is better this way: the mass stays a separate, openly
// declared input (ITEM_MASS_KG.powerDrill, below) instead of being hidden inside
// a single number nobody can take apart.

const EDINBURGH_TOOL_LIBRARY =
  'Edinburgh Tool Library, "Carbon Data for Sharing Libraries", https://edinburghtoollibrary.org.uk/carbon-data-for-sharing-libraries/ — cordless power tool factor 6.165 kg CO₂e per kg of tool. Derived, not measured: built from the ICE database (Circular Ecology / University of Bath), UK Government GHG Reporting Conversion Factors 2020 (battery value 12.119, as ICE carries no battery figure) and Climate Impact Forecast (motors under 500W), using their stated composition assumption of 30% battery, 15% motor, 15% solid metal, 40% plastic/rubber.'

export const MANUFACTURING_CO2 = {
  powerDrill: {
    value: 6.165,
    unit: 'kg CO₂e per kg of cordless power tool',
    source: EDINBURGH_TOOL_LIBRARY,
  },
}

// ─── The drill itself: what it costs and what it weighs ──────────────────────
//
// Sourced 8 Sept 2026 from ONE product listing, and that is the point: the price
// and the mass have to describe the same object. Take the price from a cheap
// drill and the weight from a heavy one and the card compares two different
// tools without saying so — the same argument the food block makes for keeping
// to a single study.
//
// ⚠️  BOTH NUMBERS MOVED, IN OPPOSITE DIRECTIONS. The card used to run on a
//     hand-authored $89 and an assumed 1.5 kg. Nothing entry-level in Singapore
//     is as cheap as $89, and nothing we priced was as heavy as 1.5 kg:
//
//       money saved   $89 → $134.06     the saving got BIGGER
//       CO₂ and waste 1.5 kg → 0.99 kg  both got SMALLER
//
//     So we were under-claiming the money and over-claiming the physics. This is
//     the second time on this project that checking a number moved it the way
//     nobody predicted — the chicken price was the first. Two independent cases
//     is enough to make the point properly in the evaluation section: you cannot
//     reason out the direction of a data error, you have to go and look.
//
// Why this drill, of the four priced at Horme Hardware on 8 Sept 2026:
//
//   Bosch GSR120-LI       $134.06   0.99 kg  including battery   ← used
//   Stanley SCD10D2K-B1   $103.55   1 kg     battery unclear, out of stock
//   Hikoki DS12DA         $160.98   1.2 kg   including battery
//   Stanley SCD12S2       $168.95   1 kg     EXCLUDING battery
//
// It is the cheapest of the four whose stated weight unambiguously includes the
// battery, and that qualifier is doing real work — see the mass note below.

const HORME_GSR120LI =
  'Horme Hardware Singapore (horme.com.sg), listing read 8 September 2026: "BOSCH 12V 2X2.0AH LI-ION DRILL DRIVER GSR120-LI", S$134.06 including GST, stated weight 0.99 kg including battery. https://www.horme.com.sg/product.aspx?id=8991'

export const ITEM_PRICE_SGD = {
  powerDrill: {
    value: 134.06,
    unit: 'SGD for one drill',
    source: `${HORME_GSR120LI} The price is for the kit as sold — tool, two 2.0Ah batteries, charger and case — which is what somebody who does not borrow one actually pays.`,
  },
}

// The mass is a SPEC now, not an assumption. That is why it is here rather than
// in ASSUMPTIONS, where it sat while no model had been chosen.
//
// ⚠️  It has to be the weight WITH the battery in. The Edinburgh factor above
//     is built on a tool assumed to be 30% battery by mass, so multiplying it by
//     a bare-tool weight would value the battery's carbon at nothing — roughly a
//     third of the figure, silently missing. Two of the four listings we checked
//     quote a bare-tool weight. Reading the qualifier mattered more than reading
//     the number.
//
// This one value does two jobs: it turns the per-kilogram carbon factor into a
// per-drill figure, and it IS the waste saved.
//
// Conservative on purpose: 0.99 kg is the tool with one battery, but the buyer
// takes home a second battery, a charger and a case too. The material that goes
// unmanufactured when somebody borrows instead is therefore larger than what we
// claim, not smaller — the same direction as the beef shin price.
export const ITEM_MASS_KG = {
  powerDrill: {
    value: 0.99,
    unit: 'kg, one drill with its battery',
    source: `${HORME_GSR120LI} Weight as stated on the listing, battery included — see the note above on why the battery has to be in it.`,
  },
}

// ─── The drill's water: EPA USEEIO, and why it is labelled differently ───────
//
// Sourced 8 Sept 2026 from the EPA's USEEIO v2.0.1 model, after checking that no
// better-matched figure exists anywhere in it. This is the one number in the app
// that is NOT comparable with the others in its column, and the screen says so:
// the drill card's water tile is labelled "Water withdrawn", not "Water".
//
// ⚠️  WITHDRAWN IS NOT THE SAME QUANTITY AS THE FOOD WATER FIGURES.
//     Mekonnen & Hoekstra (above) give a CONSUMPTIVE footprint — water
//     evaporated, transpired, or needed to dilute pollution. USEEIO gives
//     WITHDRAWALS — water taken from a river or aquifer, most of which is power
//     station cooling water that goes straight back. Same unit, different
//     physical quantity. Putting them in a tile with the same label would repeat
//     the mistake we already made twice (the wheat-vs-bread water figure, and
//     the index-vs-shelf-price basis). Hence the separate label.
//
// NO GREY WATER, AND NO GREEN. Checked 8 Sept 2026 in the model's own
// characterisation matrix C: "Freshwater withdrawals" is characterised from
// exactly TWO flows, both at factor 1.0 — fresh surface water and fresh
// groundwater. It is a pure volume-in count and no pollutant enters it. The
// pollution is in the model (1,282 chemical flows feed the ecotoxicity
// indicator) but comes out as CTUe, an impact potential, never as a dilution
// volume. Grey water is by definition a dilution volume, so there is none here.
//
// That matters because the food figures above are green + blue + grey CONSUMED,
// and green — rain evapotranspired by the crop — is 70-95% of every one of them.
// A drill factory grows nothing, so it has no green water at all. The drill's
// 350 L and beef's 15,415 L/kg share NO component. Not even blue lines up: blue
// is consumptive, this is withdrawal.
//
// We checked whether USEEIO had a consumptive figure and it does not. The whole
// model contains exactly four water flows — fresh surface, fresh ground, saline
// surface, saline ground — all withdrawals, all in kg. There is no blue-water,
// green-water or consumptive row. We also checked the flow-level matrices rather
// than trusting the summary indicator: in matrix M the two fresh-water flows are
// 10.814731453113991 + 1.554442507153987, which sums to 12.369173960267978 —
// exactly the "Freshwater withdrawals" figure in matrix N, to fourteen decimal
// places. Going deeper into the model returns the same number, not a better one.
// (Matrix B holds only 2.73 kg/$, because B is DIRECT flows — the drill factory
// alone, without its supply chain. Using B would have understated by 4.5x.)
//
// THE DERIVATION, in full, so it can be checked or redone:
//
//   USEEIO v2.0.1, sheet N, column 333991/US ("Power tools", BEA
//   "Power-driven handtool manufacturing"), row "Freshwater withdrawals"
//     = 12.36917396026797 kg of freshwater per US dollar
//
//   That is per dollar of PRODUCER-price output in 2012 dollars, so the retail
//   price has to be walked back to that basis. Three steps, each with its own
//   justification:
//
//   ⚠️ WHERE THAT BASIS IS DOCUMENTED — the two halves are NOT in the same place,
//      and only one of them is in the workbook:
//        - The 2012 DOLLAR YEAR is in the file. Sheet "General Information",
//          row 2: "The US dollar (USD) year for the model data, where USD is
//          used, is 2012." (Corroborated by Rho, which is exactly 1 for 2012.)
//        - The PRODUCER-PRICE basis is NOT in the workbook. It comes from the
//          model paper — Ingwersen et al. (2022), Scientific Data 9:194: "The
//          2012 BEA Detail Make and Use Tables Before Redefinitions in
//          Producer's Price are used as the underlying IO tables", and "Model
//          coefficient matrices may be obtained in purchaser's price through
//          adjustment of values from producer's price".
//      Cite the paper for the price type. Do not claim the workbook says it.
//
//     SGD 134.06  the shelf price in ITEM_PRICE_SGD
//   ÷ 1.09        remove 9% GST. A Singapore consumption tax is not revenue to
//                 a US manufacturer, so it cannot carry that sector's water.
//   x 0.78942     to USD, the rate on 8 Sept 2026
//                 = USD 97.09
//   x 0.639155    2026 dollars to 2012 dollars, using the US producer price
//                 index for this exact industry (BLS series PCU333991333991,
//                 "Power-Driven Handtool Manufacturing", Dec 1980 = 100):
//                 2012 annual average 184.44 ÷ 288.571 (June 2025, the latest
//                 observation in the series).
//                 = USD 62.06 in 2012 purchaser prices
//   x 0.456537    USEEIO's own Phi matrix, "price type adjustment", for
//                 333991/US in 2012. Only 45.7% of a retail dollar is
//                 producer-price output of the manufacturer; the rest is retail
//                 margin, wholesale margin and freight, which belong to other
//                 sectors with their own water use.
//                 = USD 28.33 in 2012 PRODUCER prices
//
//                 ⚠️ CALL THIS A "producer:purchaser" RATIO, NOT
//                    "purchaser-to-producer". This comment used to say the
//                    latter; every source uses the opposite word order. Paper
//                    Eq. 10 and useeior's format spec both define it as
//                    producer price / purchaser price — a number below 1, which
//                    0.4565 is. Corrected 9 Sept 2026. The arithmetic was always
//                    right; the label was backwards, and anyone checking would
//                    have searched for the source's phrase and concluded we had
//                    the direction wrong.
//                    Note also that the model INTENDS Phi for the opposite
//                    journey — converting its own coefficients from producer to
//                    purchaser basis. We apply it to the SPEND instead. Both are
//                    one multiplication by Phi and give the same 350.4 L; it was
//                    checked both ways round. Valid, but the reverse of the
//                    documented use case, so do not imply we followed the manual.
//
//   12.36917396026797 x 28.33 = 350.4 litres, stored as 350.
//
// ⚠️  Four limitations, all of which belong in the report:
//     1. It is SPEND-BASED. The same drill bought on sale would come out
//        "using" less water, which is an artefact of the method, not physics.
//     2. USEEIO is a US model. This drill was bought in Singapore and was
//        probably made in China. Same transfer assumption as the UK carbon
//        figure above, and a larger one.
//     3. The deflator uses June 2025, the last observation available in the
//        BLS series. It is not a 2026 index because one does not exist yet.
//     4. Sector averages, not this product. USEEIO knows "power tools", not
//        Bosch GSR120-LI.
//     Treat it as an order-of-magnitude screening estimate. Do not write it as
//     "350 litres" in the report without the word "roughly" in front of it.
//
// Leaving GST in would give 382 L instead of 350 L. We take the lower figure:
// it is the better-argued one, and where two readings are defensible this
// project takes the one that claims less.
//
// WHY NOT USEEIO'S OWN DEFLATOR? The model ships Rho, a currency-year adjustment
// matrix ("commodity-specific deflation ratios"), so using a BLS series instead
// looks like ignoring the model's own tooling. We could not use it: Rho only
// spans 2002-2018, checked in the workbook, so it cannot deflate a 2026 price.
// Going outside the model was forced, not chosen. The substitute is the producer
// price index for this exact BEA industry, which is the closest stand-in
// available. (Rho for 333991/US in 2012 is exactly 1, which is a useful
// independent confirmation that 2012 is the model's base year.)
//
// THE DEFLATOR INPUT WAS ALSO TESTED. January 2012 (183.400) instead of the 2012
// annual average (184.44) gives 348.45 L against 350.43 L — 0.56%, about two
// litres, and both round to 350 at the precision we store. The annual average is
// kept on the argument, not the arithmetic: USEEIO's dollar year is the whole of
// 2012, so an annual average is the matching basis and a single month would
// import a seasonal wobble the model does not have.

const USEEIO =
  'US EPA, USEEIO v2.0.1 (model USEEIOv2.0.1-411), sheet N, column 333991/US ("Power tools" — BEA "Power-driven handtool manufacturing"), row "Freshwater withdrawals" = 12.36917396026797 kg per USD of 2012 producer-price output. Converted from the SGD 134.06 shelf price by removing 9% GST, converting at 0.78942 USD/SGD, deflating 2026 to 2012 dollars with BLS producer price index series PCU333991333991 (2012 annual average 184.44 / 288.571 at June 2025), and applying USEEIO\'s own Phi price-type adjustment for 333991/US in 2012 (0.456537). Dataset creators: Ingwersen, Wesley; Li, Mo; Young, Ben; Vendries, Jorge; Birney, Catherine.'

export const ITEM_WATER_L = {
  powerDrill: {
    value: 350,
    // The unit says "withdrawn" on purpose. See the warning above: this is not
    // the same quantity as the litres on the food cards.
    unit: 'litres of freshwater WITHDRAWN to manufacture one drill (not consumed, no grey, no green)',
    source: USEEIO,
  },
}

// ─── Singapore national figures ──────────────────────────────────────────────
//
// These three were TODO_SOURCE until 7 Sept 2026. They are now filled in from
// the primary publications, each with the year and the page they came from, so
// a marker can check them without searching. Two points to make in the report:
//
//   1. Each of these is a MOVING number, republished yearly. Say the year out
//      loud whenever you quote one — "0.402 kg CO₂/kWh in 2024", not "Singapore's
//      grid emission factor is 0.402". The year is part of the fact.
//   2. The waste figure is not the one we originally asked for. See its note.

export const SINGAPORE = {
  gridEmissionFactor: {
    value: 0.402,
    unit: 'kg CO₂ per kWh of grid electricity',
    year: 2024,
    source:
      'Energy Market Authority, via National Climate Change Secretariat, "Power" — "Singapore\'s Grid Emission Factor … has fallen from 0.409 kgCO2/kWh in 2019 to 0.402 kgCO2/kWh in 2024." https://www.nccs.gov.sg/singapores-climate-action/mitigation-efforts/power/',
  },

  householdWaterPerPerson: {
    value: 141,
    unit: 'litres per person per day',
    year: 2025,
    source:
      'PUB press release, 17 March 2026, "It\'s Everyone\'s Business to Make Every Drop Count" — "Household water consumption in 2025 averaged 141 litres per capita per day (LPCD)", down from 142 in 2024. https://www.pub.gov.sg/Resources/News-Room/PressReleases/2026/03/Its-Everyones-Business-to-Make-Every-Drop-Count',
  },

  // ⚠️  READ THIS BEFORE QUOTING IT.
  //
  // We originally wanted domestic waste DISPOSED per person per day. NEA no
  // longer publishes that as a headline figure — the data.gov.sg dataset for
  // "Total Domestic Waste Disposed Per Capita" stops in 2015. What NEA does
  // publish yearly is waste GENERATED per capita, which is disposed + recycled.
  //
  // So this is a different quantity from the one the entry used to ask for, and
  // it is larger. Do not describe it as "waste sent to the incinerator".
  domesticWasteGeneratedPerPerson: {
    value: 0.83,
    unit: 'kg of domestic waste generated per person per day',
    year: 2025,
    source:
      'NEA, "Waste Statistics and Overall Recycling" — "The daily domestic waste generated per capita … decreased from 1.06 kg in 2015 to 0.83 kg in 2025." https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling',
  },

  // ⚠️  THIS ONE CONTRADICTS OUR OWN PROBLEM STATEMENT — see docs/ai-log.md.
  //
  // Our brief says home recycling "sits around 20%". NEA's current figure is
  // 11%. The ~20% number was true years ago; the domestic recycling rate has
  // been falling. Quoting 20% in the report would be quoting a stale statistic,
  // and it makes our problem look SMALLER than it is. Use 11% and say the year.
  domesticRecyclingRate: {
    value: 11,
    unit: 'per cent of domestic waste recycled',
    year: 2025,
    source:
      'NEA, "Waste Statistics and Overall Recycling" — "The domestic recycling rate remained at 11 per cent" (2025); overall recycling rate 52 per cent. https://www.nea.gov.sg/our-services/waste-management/waste-statistics-and-overall-recycling',
  },
}

// ─── Singapore Green Plan 2030 targets ───────────────────────────────────────
//
// Targets, not measurements. Useful because the report has to tie the app to
// the Green Plan, and a target next to the current figure shows the gap the app
// is trying to help close.

const GREEN_PLAN =
  'Singapore Green Plan 2030, "Our Targets", https://www.greenplan.gov.sg/targets/'

export const GREEN_PLAN_TARGETS = {
  householdWaterPerPerson: {
    value: 130,
    unit: 'litres per person per day by 2030',
    source: `${GREEN_PLAN} — "Reduce household water consumption to 130 litres per capita per day"`,
  },
  wasteToLandfillReduction: {
    value: 30,
    unit: 'per cent cut in waste to landfill per capita per day by 2030',
    source: `${GREEN_PLAN} — "Reduce the amount of waste to landfill per capita per day by 30%" (an interim 20% by 2026)`,
  },
}

// ─── Stated assumptions ──────────────────────────────────────────────────────
//
// These are not measurements and are not pretending to be. They are choices we
// made so the arithmetic has something to work with. An assumption you have
// written down is defensible; one you have hidden is not. Say these out loud in
// the report's methodology paragraph.

// ─── One serving of each food, from HPB's own list ───────────────────────────
//
// Added 9 Sept 2026, replacing the single `portionKg` assumption that used to
// serve both sides of every swap.
//
// Why it had to change: one shared portion modelled swapping X kg of one food
// for X kg of another. That is fair for beef → chicken, but wrong for
// beef → tofu — nobody eats 90 g of tofu in place of 90 g of beef — and it was
// wrong in the direction that FLATTERED us, because crediting the swap for less
// tofu than a person really eats makes the saving look bigger.
//
// The fix is to swap SERVING FOR SERVING, which is what the cards have always
// claimed ("same number of meals"), using HPB's own published equivalences.
//
// SOURCE: HPB's "Know Your Servings: Photo Guide" on HealthHub, last reviewed
// 25 July 2025. Its "1 Serving of Meat/Others" group is quoted in full in
// HPB_SERVING_GUIDE below. Quoting it in full is deliberate — it is what lets
// anyone check that we did not take one line out of a longer list.
//
// ⚠️  CORRECTED 9 SEPT 2026, TWICE IN ONE DAY. Both corrections came from
//     reading MORE of the source rather than from new reasoning:
//
//     1. Tofu was 200 g, from "2 square pieces of taukwa (200g)" in a DIFFERENT
//        HPB document. The photo guide — the current, dated page — lists only
//        "2 blocks of soft tofu (170g)" and has no taukwa line at all. Now 170 g.
//     2. A cheese serving of 40 g was here, also from that other document. The
//        photo guide's Meat/Others group contains no cheese. Removed.
//
//     The citation was also conflating two separate HPB documents under one URL,
//     which is exactly the sort of thing this project exists to catch.
//
// ⚠️  THE MEAT SERVING IS CONVERTED FROM COOKED TO RAW. 90 g -> 120 g.
//     This is the most-revised number in the project — it has been 150 g, 120 g,
//     90 g and now 120 g again, all on 9 Sept 2026 — so the reasoning is set out
//     in full rather than summarised, and the report should present it as a
//     JUDGEMENT UNDER UNCERTAINTY, not a settled fact.
//
//     WHY CONVERT AT ALL: every factor this is multiplied by is per kg of food
//     AS PURCHASED. FOOD_PRICE_SGD is a shop price per kg of raw meat; Poore &
//     Nemecek and Mekonnen & Hoekstra are per kg of primary product. If HPB's
//     90 g is a COOKED weight, using it directly is a basis mismatch.
//
//     EVIDENCE THAT THE 90 g IS COOKED:
//       - The photographs beside the line show a GRILLED fish fillet and a
//         griddled chicken breast. Not raw meat.
//       - "Palm-sized piece" describes a portion as served.
//       - Dietary authorities state meat portions in cooked weight and say so:
//         the NHS writes "more than 90g (COOKED WEIGHT) of red or processed
//         meat a day". See NHS_MEAT below.
//     EVIDENCE AGAINST — still standing, do not delete it:
//       - HPB labels cooking state everywhere else in the same guide: "1/2 bowl
//         COOKED rice", "2/3 bowl UNCOOKED oatmeal", "100g RAW non-leafy
//         vegetables", "3/4 cup COOKED lentils". The meat line says neither.
//       - A possible explanation is that the distinction is dramatic for rice
//         and oats, which roughly triple, and only ~25% for meat. That is an
//         explanation, not evidence.
//
//     WITHDRAWN ARGUMENT: an earlier comment claimed "3 eggs (150g)" settled it
//     as raw, being 50 g of raw shelled egg. The photo shows BOILED eggs, and a
//     boiled egg weighs about what a raw one does, so eggs cannot separate the
//     two readings. Do not put that argument in the report.
//
//     THE CONVERSION: 90 / 0.75 = 120 g, using 25% — the LOW end of a verified
//     25-30% range, because it yields the smaller portion and the smaller claim.
//     28.1% would give 125 g and 30% would give 129 g.
//
//     ⚠️ SENSITIVITY, AND IT IS LARGE. If the cooked reading is wrong and the
//        90 g was already raw, this overstates every food-swap figure by 33%.
//        Both swap cards scale linearly with it. The report should quote the
//        alternative, not bury it.
//
// ✅  THE TOFU BASIS MISMATCH IS CLOSED (9 Sept 2026). The price was a TAU KWA
//     price while the serving is soft tofu; FOOD_PRICE_SGD.tofu is now sourced
//     from soft tofu instead. Worth recording that the mismatch was real but
//     immaterial — soft tofu is $3.17/kg across four products, tau kwa
//     $3.13-3.16/kg, about 1% apart. It was still right to fix: we found that
//     out by checking, not by assuming, and the next mismatch may not be so
//     forgiving.
//
// Foods with no serving here (rice, bread, vegetables, bananas, tomatoes) are
// not in HPB's "meat and others" group. A swap involving them returns
// 'unsourced' rather than a guess — see foodSwap in lib/impact.js.
const HPB_SERVING_GUIDE =
  'Health Promotion Board, "Know Your Servings: Photo Guide", HealthHub, https://www.healthhub.sg/well-being-and-lifestyle/food-diet-and-nutrition/know-your-servings-photo-guide (article last reviewed 25 July 2025). The complete "1 Serving of Meat/Others" group reads: "1 palm-sized piece fish, lean meat or poultry (90g)"; "2 blocks of soft tofu (170g)"; "3/4 cup cooked lentils, peas or beans (120g)"; "3 eggs (150g)"; "1 handful of almonds (28g)"; "2 glasses of milk (500ml)".'

// NHS guidance, used ONLY for two narrow things: to show that dietary
// authorities state meat portions in cooked weight and say so, and to give a
// citable raw-to-cooked ratio. It is NOT the source of our serving size.
//
// ⚠️ NHS's 90 g and HPB's 90 g ARE NOT THE SAME QUANTITY. The NHS figure is a
//    DAILY CAP on red and processed meat; HPB's is ONE SERVING of any protein,
//    of which HPB recommends 2-3 a day. The numbers coinciding is a coincidence,
//    and must not be written up as agreement between two authorities.
const NHS_MEAT =
  'NHS, "Meat in your diet", https://www.nhs.uk/live-well/eat-well/food-types/meat-nutrition/ — "If you currently eat more than 90g (cooked weight) of red or processed meat a day, it is recommended that you cut down to 70g." Its worked examples are cooked weights, and one of them gives a raw-to-cooked ratio: "grilled 8oz beef steak - 163g", i.e. 227 g raw yielding 163 g cooked, a loss of 28.1% — independently inside the 25-30% range verified by the team on 9 Sept 2026. Used here as corroboration of the cooking loss and of the convention, NOT as the serving size: the NHS 90 g is a daily cap on red and processed meat, a different quantity from HPB\'s one-serving figure.'

// The COOKED-TO-RAW conversion applies to MEAT ONLY. The other servings in this
// table are already as-purchased weights and must not be scaled:
//   tofu   sold and weighed uncooked; HPB's photo shows plain raw blocks
//   eggs   a boiled egg weighs about what a raw shelled one does
//   milk   not cooked
// Applying a meat cooking loss to any of them would invent a correction.
export const SERVING_KG = {
  beef: { value: 0.12, unit: 'kg raw, as purchased, in one HPB serving', source: `${HPB_SERVING_GUIDE} Converted from the published 90 g to 120 g raw on the reading that HPB's figure is a cooked weight, using a 25% cooking loss — the low end of a verified 25-30% range. ${NHS_MEAT}` },
  lamb: { value: 0.12, unit: 'kg raw, as purchased, in one HPB serving', source: `${HPB_SERVING_GUIDE} Converted from 90 g cooked at 25% loss. ${NHS_MEAT}` },
  pork: { value: 0.12, unit: 'kg raw, as purchased, in one HPB serving', source: `${HPB_SERVING_GUIDE} Converted from 90 g cooked at 25% loss. ${NHS_MEAT}` },
  chicken: { value: 0.12, unit: 'kg raw, as purchased, in one HPB serving', source: `${HPB_SERVING_GUIDE} Converted from 90 g cooked at 25% loss. ${NHS_MEAT}` },
  // ⚠️ SOFT TOFU, 170 g. Corrected from 200 g on 9 Sept 2026 — see the note
  //    above. The price this is multiplied by is sourced from TAU KWA, a firmer
  //    and pricier product, which is a basis mismatch we have not closed.
  tofu: { value: 0.17, unit: 'kg in one HPB serving', source: HPB_SERVING_GUIDE },
  eggs: { value: 0.15, unit: 'kg in one HPB serving', source: HPB_SERVING_GUIDE },
  // 500 ml of milk, taken as 0.5 kg.
  milk: { value: 0.5, unit: 'kg in one HPB serving', source: HPB_SERVING_GUIDE },
  // NO CHEESE ENTRY. A "2 slices of low-fat cheese (40g)" line was here until
  // 9 Sept 2026, taken from a different HPB document. The photo guide's
  // "Meat/Others" group does not contain cheese, and nothing in the app swaps
  // cheese, so it is removed rather than sourced from a second place.
}

export const ASSUMPTIONS = {
  breadLoafKg: {
    value: 0.4,
    unit: 'kg in one standard loaf',
    // No longer "a supermarket sandwich loaf" in the abstract: 0.4 kg is the
    // stated net weight of a real, named Singapore product. Same upgrade the
    // drill's mass got in §4b — an assumption became a product spec.
    source:
      "Gardenia Enriched White Bread, 400 g — https://www.gardenia.com.sg/gardenia-enriched-white-bread-400g/ (Gardenia's own Singapore site). The pack's nutrition panel corroborates the weight internally: 7 servings x 57 g = 399 g. Sunshine Enriched White Bread is a second 400 g loaf on the same shelf, so 400 g is a standard Singapore sandwich loaf rather than a one-off.",
  },
  weeksPerYear: {
    value: 52,
    unit: 'weeks in a year',
    source: 'Arithmetic.',
  },
  monthsPerYear: {
    value: 12,
    unit: 'months in a year',
    source: 'Arithmetic.',
  },
}

// Every distinct source used above, for the "where these numbers come from"
// section on the Impact screen. Keeping it here means the screen cannot fall
// out of step with the factors.
export const SOURCE_LIST = [
  { label: 'Food greenhouse gas emissions', source: POORE_NEMECEK },
  { label: 'Food water footprints (crops)', source: MH_CROPS },
  { label: 'Food water footprints (animal products)', source: MH_ANIMALS },
  { label: 'Prices', source: FAIRPRICE_ONLINE },
  { label: 'Tool manufacturing', source: EDINBURGH_TOOL_LIBRARY },
]
