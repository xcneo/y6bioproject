// The habit changes the Impact Calculator can estimate.
//
// Each one names the factor keys it needs; the arithmetic lives in
// src/lib/impact.js. Keeping them apart means you can add a habit here without
// touching any maths, and check the maths without reading any copy.
//
// kind decides how it is worked out:
//   'foodSwap'  same number of meals, different food
//   'foodSaved' food that would otherwise have been binned
//   'notBuying' a thing borrowed instead of bought
//
// The last one had no CO₂ source until 8 Sept 2026, and the card showed a
// "Source needed" chip rather than a guess. It is now sourced — see the
// Edinburgh Tool Library note in factors.js. Leaving the gap visible for three
// weeks is what stopped a wrong number going in; that is the mechanism working,
// and it is worth saying so in the report.
//
// Its price and mass were sourced the same day, from a named product listing.
// Notice that those two were never marked "Source needed" and never could have
// been: they were typed straight into this file, outside the mechanism, where
// nothing was watching them. The gap that shows itself is the safe kind.

export const HABITS = [
  {
    id: 'beef-to-chicken',
    kind: 'foodSwap',
    title: 'Swap beef for chicken',
    detail: 'Same number of servings, different meat.',
    // "servings a week", not "meals a week", since 9 Sept 2026. The arithmetic
    // did not change — one HPB serving is one quarter-plate of protein, and HPB
    // says a quarter plate at each meal meets the daily 2-3 servings, so a meal
    // already carried one serving. The word "serving" just says out loud what
    // the maths was already doing, and matches SERVING_KG in factors.js.
    //
    // max 14 is 2 servings a day, the LOWER end of HPB's 2-3 a day. The ceiling
    // implied by HPB would be 21. Left at 14 deliberately: it is the
    // conservative bound and nobody swaps every serving they eat.
    unit: 'servings a week',
    defaultAmount: 2,
    max: 14,
    from: 'beef',
    to: 'chicken',
  },
  {
    id: 'beef-to-tofu',
    kind: 'foodSwap',
    title: 'Swap beef for tofu',
    // ⚠️ This used to read "Tau kwa, tau pok, or a plain block — all count."
    //    That became WRONG on 9 Sept when the serving moved to HPB's "2 blocks
    //    of soft tofu (170g)" and the price was re-sourced to soft tofu. The
    //    copy was still naming the firm product while the numbers described the
    //    soft one — a card saying one thing and its data saying another. Say
    //    what we actually costed.
    detail: 'Two blocks of soft tofu — one HPB serving.',
    unit: 'servings a week',
    defaultAmount: 2,
    max: 14,
    from: 'beef',
    to: 'tofu',
  },
  {
    id: 'save-bread',
    kind: 'foodSaved',
    title: 'Finish the bread instead of binning it',
    detail:
      'Or pass it to the Expiring Soon Shelf. Either way it gets eaten instead of thrown.',
    unit: 'loaves a month',
    defaultAmount: 2,
    max: 12,
    food: 'bread',
    // One loaf, so the answer comes out per loaf rather than per kg.
    kgPerUnit: 'breadLoafKg',
  },
  {
    id: 'borrow-drill',
    kind: 'notBuying',
    title: 'Borrow a drill instead of buying one',
    detail: 'You have borrowed three power tools this year already.',
    unit: 'tools a year',
    defaultAmount: 1,
    max: 5,
    // One key, three tables — MANUFACTURING_CO2 for the carbon, ITEM_PRICE_SGD
    // for the money and ITEM_MASS_KG for the weight — the same way the bread
    // card's `food` key reaches the three food tables. The drill is a real,
    // named product now (Bosch GSR120-LI at Horme), so the price and the weight
    // describe the same object rather than two different imagined drills.
    item: 'powerDrill',
    // The water figure on this card is freshwater WITHDRAWN (EPA USEEIO), not
    // the consumptive footprint the food cards show (Mekonnen & Hoekstra). Same
    // unit, different physical quantity, so it gets its own label rather than
    // sitting under "Water" as if the two were comparable.
    statLabels: { water: 'Water withdrawn' },
  },
]
