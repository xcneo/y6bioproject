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
// The last one deliberately has no CO₂ source yet. It is not an oversight —
// see the note in factors.js about showing the gap instead of inventing a
// number to fill it.

export const HABITS = [
  {
    id: 'beef-to-chicken',
    kind: 'foodSwap',
    title: 'Swap beef for chicken',
    detail: 'Same number of meals, different meat.',
    unit: 'meals a week',
    defaultAmount: 2,
    max: 14,
    from: 'beef',
    to: 'chicken',
  },
  {
    id: 'beef-to-tofu',
    kind: 'foodSwap',
    title: 'Swap beef for tofu',
    detail: 'Tau kwa, tau pok, or a plain block — all count.',
    unit: 'meals a week',
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
    // No CO₂ figure for this yet — the card will say so rather than guess.
    co2Factor: 'powerDrill',
    priceSgd: 89,
    priceNote:
      'Hand-authored, indicative price for an entry-level cordless drill — NOT surveyed.',
    massKg: 1.5,
    massNote: 'Our assumption, not a measurement.',
  },
]
