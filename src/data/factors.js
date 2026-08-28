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

const POORE_NEMECEK =
  'Poore & Nemecek (2018), "Reducing food\'s environmental impacts through producers and consumers", Science 360(6392), pp. 987–992 — as tabulated by Our World in Data, "Environmental Impacts of Food Production"'

export const FOOD_CO2 = {
  beef: { value: 99.5, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  lamb: { value: 39.7, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  cheese: { value: 23.9, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  pork: { value: 12.3, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  chicken: { value: 9.9, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  eggs: { value: 4.7, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  rice: { value: 4.5, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  milk: { value: 3.2, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  tofu: { value: 3.2, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  tomatoes: { value: 2.1, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  bread: { value: 1.6, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  bananas: { value: 0.86, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  otherVegetables: { value: 0.53, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
  rootVegetables: { value: 0.43, unit: 'kg CO₂e per kg of food', source: POORE_NEMECEK },
}

// ─── Water footprint of food ─────────────────────────────────────────────────
//
// Different study from the CO₂ figures, so do not mix the two in one sentence
// without saying so. Global averages again, and these are TOTAL water footprint
// (rain, irrigation and dilution combined), which is why the numbers look huge.

const MEKONNEN_HOEKSTRA =
  'Mekonnen & Hoekstra (2011), "The green, blue and grey water footprint of crops and derived crop products" / "…of farm animals and animal products", UNESCO-IHE Value of Water Research Report Series No. 47 & 48'

export const FOOD_WATER = {
  beef: { value: 15415, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  pork: { value: 5988, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  cheese: { value: 5060, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  chicken: { value: 4325, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  eggs: { value: 3265, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  rice: { value: 2497, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  bread: { value: 1827, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  milk: { value: 1020, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  bananas: { value: 962, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  otherVegetables: { value: 322, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },
  rootVegetables: { value: 322, unit: 'litres per kg of food', source: MEKONNEN_HOEKSTRA },

  tofu: {
    value: null,
    unit: 'litres per kg of food',
    source: TODO_SOURCE,
    hint: 'Mekonnen & Hoekstra give soybeans, not tofu, and tofu is more processed. Look for a tofu figure in the Water Footprint Network product gallery rather than converting the soybean number yourself.',
  },
}

// ─── Prices ──────────────────────────────────────────────────────────────────
//
// NOT surveyed. Hand-authored to be plausible for a Singapore supermarket in
// 2026. Good enough to demo with; NOT good enough to print. One of you should
// walk into an NTUC FairPrice or Sheng Siong and write the real shelf prices in
// here, then change the source line to say so — that is a two-hour job that
// makes a whole section of the report defensible.

const INDICATIVE_PRICE =
  'Hand-authored, indicative Singapore supermarket price — NOT surveyed. Replace with a checked price before quoting.'

export const FOOD_PRICE_SGD = {
  beef: { value: 25, unit: 'SGD per kg', source: INDICATIVE_PRICE },
  chicken: { value: 8, unit: 'SGD per kg', source: INDICATIVE_PRICE },
  tofu: { value: 4, unit: 'SGD per kg', source: INDICATIVE_PRICE },
  bread: { value: 3.2, unit: 'SGD per kg', source: INDICATIVE_PRICE },
}

// ─── Things nobody has sourced yet ───────────────────────────────────────────
//
// Left deliberately empty rather than guessed. The screen shows a "source
// needed" chip where these are used.

export const MANUFACTURING_CO2 = {
  powerDrill: {
    value: null,
    unit: 'kg CO₂e to manufacture one cordless drill',
    source: TODO_SOURCE,
    hint: 'Look for a life-cycle assessment of power tools, or an Environmental Product Declaration (EPD) — some manufacturers publish them. Failing that, a paper on embodied carbon in small household appliances.',
  },
}

export const SINGAPORE = {
  gridEmissionFactor: {
    value: null,
    unit: 'kg CO₂ per kWh of grid electricity',
    source: TODO_SOURCE,
    hint: 'Energy Market Authority publishes the Grid Emission Factor annually in the Singapore Energy Statistics. Use the most recent year and say which year it is.',
  },
  householdWaterPerPerson: {
    value: null,
    unit: 'litres per person per day',
    source: TODO_SOURCE,
    hint: 'PUB publishes household water consumption per capita, and has a stated 2030 target. Both are worth quoting.',
  },
  domesticWastePerPerson: {
    value: null,
    unit: 'kg of domestic waste disposed per person per day',
    source: TODO_SOURCE,
    hint: 'NEA Waste Statistics and Overall Recycling, published yearly. The same page has the domestic recycling rate, which is the ~20% figure in our problem statement.',
  },
}

// ─── Stated assumptions ──────────────────────────────────────────────────────
//
// These are not measurements and are not pretending to be. They are choices we
// made so the arithmetic has something to work with. An assumption you have
// written down is defensible; one you have hidden is not. Say these out loud in
// the report's methodology paragraph.

export const ASSUMPTIONS = {
  portionKg: {
    value: 0.15,
    unit: 'kg of meat or tofu in one portion',
    source: 'Our assumption, not a measurement. 150 g per person per main meal.',
  },
  breadLoafKg: {
    value: 0.4,
    unit: 'kg in one standard loaf',
    source: 'Our assumption, not a measurement. A supermarket sandwich loaf.',
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
  { label: 'Food water footprints', source: MEKONNEN_HOEKSTRA },
  { label: 'Prices', source: INDICATIVE_PRICE },
]
