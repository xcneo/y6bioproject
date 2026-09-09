import {
  ASSUMPTIONS,
  FOOD_CO2,
  FOOD_PRICE_SGD,
  FOOD_WATER,
  ITEM_MASS_KG,
  ITEM_PRICE_SGD,
  ITEM_WATER_L,
  MANUFACTURING_CO2,
  SERVING_KG,
  isSourced,
} from '../data/factors'

// The arithmetic behind the Impact Calculator.
//
// Every function here returns the same shape:
//
//   { co2, water, money, waste }
//
// where each is either a NUMBER or the string 'unsourced'. Nothing is ever
// silently zero or silently omitted — if we cannot work something out because
// nobody has sourced the factor, the screen says so out loud. A blank space
// looks like "no saving"; 'unsourced' looks like what it is, an unfinished job.
//
// Units: co2 in kg CO₂e per year, water in litres per year, money in SGD per
// year, waste in kg per year.

const UNSOURCED = 'unsourced'

// Multiplies a factor by an amount, or reports that it cannot. The amount is
// kilograms for the food factors and a count of items for the drill.
function apply(factor, amount) {
  return isSourced(factor) ? factor.value * amount : UNSOURCED
}

// What the food given up costs, minus what the food replacing it costs — but
// only if BOTH factors are sourced. A difference against a missing number is not
// a smaller saving, it is an unknown one.
//
// The two masses are SEPARATE arguments on purpose. This used to take one `kg`
// for both sides and return (from - to) * kg, which quietly assumed you replace
// a mass of one food with the same mass of another. See foodSwap below.
function difference(table, fromKey, toKey, kgFrom, kgTo) {
  const from = table[fromKey]
  const to = table[toKey]

  if (!isSourced(from) || !isSourced(to)) return UNSOURCED

  return from.value * kgFrom - to.value * kgTo
}

// ─── One food instead of another, n meals a week ─────────────────────────────
//
// SERVING FOR SERVING, not kilogram for kilogram. Each food brings its own
// serving mass from SERVING_KG, so swapping one meal of beef for one meal of
// tofu means giving up a 90 g serving of beef and taking on a 200 g serving of
// tau kwa — both figures from HPB's own published list.
//
// This replaced a single shared `portionKg` on 9 Sept 2026. The old version
// multiplied one mass by the DIFFERENCE of the two factors, which assumed you
// replace a mass of one food with the same mass of another. Fine for
// beef → chicken; wrong for beef → tofu, where a real portion is about twice
// the mass. It was also wrong in the direction that flattered us: crediting the
// swap for less tofu than a person really eats makes the saving look bigger.
// Correcting it cut the tofu card's water and money figures by about a fifth.
//
// A swap needs a serving for BOTH foods. Anything outside HPB's "meat and
// others" group — rice, bread, vegetables — has no serving, and the card says
// "Source needed" rather than guessing one.
function foodSwap(habit, mealsPerWeek) {
  const servingFrom = SERVING_KG[habit.from]
  const servingTo = SERVING_KG[habit.to]

  if (!isSourced(servingFrom) || !isSourced(servingTo)) {
    return { co2: UNSOURCED, water: UNSOURCED, money: UNSOURCED, waste: 0 }
  }

  const mealsPerYear = mealsPerWeek * ASSUMPTIONS.weeksPerYear.value
  const kgFrom = mealsPerYear * servingFrom.value
  const kgTo = mealsPerYear * servingTo.value

  return {
    co2: difference(FOOD_CO2, habit.from, habit.to, kgFrom, kgTo),
    water: difference(FOOD_WATER, habit.from, habit.to, kgFrom, kgTo),
    money: difference(FOOD_PRICE_SGD, habit.from, habit.to, kgFrom, kgTo),
    // Swapping one food for another does not change how much lands in the bin.
    waste: 0,
  }
}

// ─── Food eaten instead of thrown away ───────────────────────────────────────
//
// The saving is everything that went into producing it — the emissions and the
// water are spent the moment it is grown, whether or not anyone eats it. That
// is why rescuing food counts for so much more than its weight suggests.
function foodSaved(habit, unitsPerMonth) {
  const kgPerYear =
    unitsPerMonth *
    ASSUMPTIONS.monthsPerYear.value *
    ASSUMPTIONS[habit.kgPerUnit].value

  return {
    co2: apply(FOOD_CO2[habit.food], kgPerYear),
    water: apply(FOOD_WATER[habit.food], kgPerYear),
    money: apply(FOOD_PRICE_SGD[habit.food], kgPerYear),
    waste: kgPerYear,
  }
}

// ─── A thing borrowed instead of bought ──────────────────────────────────────
//
// The manufacturing factor is per KILOGRAM of tool, not per tool, so the mass
// does real work here: it converts the factor into a per-item figure AND it is
// the waste saved. One number, two outputs, which is why it is a sourced factor
// of its own (ITEM_MASS_KG) rather than a bare number inline in habits.js.
//
// Every figure on this card now comes out of factors.js — the price used to be
// typed into habits.js with no source, which meant a wrong price would have
// shown on screen looking exactly as solid as the cited ones. It goes through
// apply() like everything else now, so if anyone empties it out, the card says
// "Source needed" instead of lying.
function notBuying(habit, itemsPerYear) {
  const mass = ITEM_MASS_KG[habit.item]

  // The mass is a factor like any other, so an unsourced one has to stop the
  // CO₂ and the waste figure both. Falling back to zero kilograms would read on
  // screen as "borrowing this saves nothing", which is a claim we would not have
  // the evidence to make.
  const kgOfTool = isSourced(mass) ? mass.value * itemsPerYear : UNSOURCED

  return {
    co2: isUnsourced(kgOfTool)
      ? UNSOURCED
      : apply(MANUFACTURING_CO2[habit.item], kgOfTool),
    // Sourced 8 Sept 2026 from EPA USEEIO. This tile was a "Source needed" chip
    // for weeks because we had no figure, and we would rather have shown the gap
    // than a guess. Note that the card labels this one "Water withdrawn": it is
    // a withdrawal, not the consumptive footprint the food cards use, and the
    // long note in factors.js explains why they must not share a label.
    water: apply(ITEM_WATER_L[habit.item], itemsPerYear),
    money: apply(ITEM_PRICE_SGD[habit.item], itemsPerYear),
    waste: kgOfTool,
  }
}

export function estimate(habit, amount) {
  if (habit.kind === 'foodSwap') return foodSwap(habit, amount)
  if (habit.kind === 'foodSaved') return foodSaved(habit, amount)
  return notBuying(habit, amount)
}

export function isUnsourced(result) {
  return result === UNSOURCED
}

// ─── Formatting ──────────────────────────────────────────────────────────────
//
// Rounding is a claim about precision. "1,398 kg" says we know it to the
// kilogram, which we do not — the factors themselves are one or two significant
// figures. So these round hard on purpose.

export function formatCo2(kg) {
  if (isUnsourced(kg)) return null
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} t`
  if (kg >= 100) return `${Math.round(kg / 10) * 10} kg`
  if (kg >= 10) return `${Math.round(kg)} kg`
  // Below 10 kg, keep a decimal. Rounding 0.3 kg to "0 kg" beside "0.5 kg of
  // food saved" reads as a bug, and understates a real if small saving.
  return `${kg.toFixed(1)} kg`
}

export function formatWater(litres) {
  if (isUnsourced(litres)) return null
  if (litres >= 10000) return `${Math.round(litres / 1000)} m³`
  if (litres >= 1000) return `${(litres / 1000).toFixed(1)} m³`
  return `${Math.round(litres)} L`
}

export function formatMoney(sgd) {
  if (isUnsourced(sgd)) return null
  return `$${Math.round(sgd).toLocaleString()}`
}

export function formatWaste(kg) {
  if (isUnsourced(kg)) return null
  if (kg >= 100) return `${Math.round(kg / 10) * 10} kg`
  if (kg >= 10) return `${Math.round(kg)} kg`
  return `${kg.toFixed(1)} kg`
}

// ─── What has actually happened, rather than what might ──────────────────────
//
// Reads the resident's history in data/activity.js. Food that was shared or
// claimed counts the same way: either it got eaten instead of binned, and the
// emissions already spent on growing it were not wasted.
export function yearSoFar(activity) {
  const rescued = [...activity.foodShared, ...activity.foodClaimed]

  const foodKg = rescued.reduce((total, entry) => total + entry.kg, 0)

  // Skip anything whose food type has no sourced factor rather than adding the
  // 'unsourced' marker into a running total — that would turn the number into
  // nonsense instead of an honest gap. Every foodType in activity.js is sourced
  // today; this is here so that stays true if someone adds one that is not.
  const foodCo2 = rescued.reduce((total, entry) => {
    const contribution = apply(FOOD_CO2[entry.foodType], entry.kg)
    return isUnsourced(contribution) ? total : total + contribution
  }, 0)

  return {
    foodKg,
    foodCo2,
    borrowed: activity.borrowed.length,
    givenAway: activity.itemsGivenAway,
    eventsAttended: activity.eventsAttended,
  }
}
