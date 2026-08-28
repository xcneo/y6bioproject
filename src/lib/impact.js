import {
  ASSUMPTIONS,
  FOOD_CO2,
  FOOD_PRICE_SGD,
  FOOD_WATER,
  MANUFACTURING_CO2,
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

// Multiplies a factor by an amount, or reports that it cannot.
function apply(factor, kg) {
  return isSourced(factor) ? factor.value * kg : UNSOURCED
}

// a - b, but only if BOTH factors are sourced. A difference against a missing
// number is not a smaller saving, it is an unknown one.
function difference(table, fromKey, toKey, kg) {
  const from = table[fromKey]
  const to = table[toKey]

  if (!isSourced(from) || !isSourced(to)) return UNSOURCED

  return (from.value - to.value) * kg
}

// ─── One food instead of another, n meals a week ─────────────────────────────
function foodSwap(habit, mealsPerWeek) {
  const kgPerYear =
    mealsPerWeek * ASSUMPTIONS.weeksPerYear.value * ASSUMPTIONS.portionKg.value

  return {
    co2: difference(FOOD_CO2, habit.from, habit.to, kgPerYear),
    water: difference(FOOD_WATER, habit.from, habit.to, kgPerYear),
    money: difference(FOOD_PRICE_SGD, habit.from, habit.to, kgPerYear),
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
function notBuying(habit, itemsPerYear) {
  return {
    co2: apply(MANUFACTURING_CO2[habit.co2Factor], itemsPerYear),
    // Borrowing a drill does not save water in any way we can evidence, and an
    // unevidenced zero is still a claim. Say we do not know.
    water: UNSOURCED,
    money: habit.priceSgd * itemsPerYear,
    waste: habit.massKg * itemsPerYear,
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
