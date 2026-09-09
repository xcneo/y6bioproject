// Personalised nudges.
//
// Rule-based. Every one of these is a plain `if` over the resident's activity
// in src/data/activity.js — there is no model, no training data and no
// prediction anywhere in this file, and the report should say so plainly rather
// than let a reader assume otherwise.
//
// Each rule is a small named function returning a nudge or null. Adding one
// means writing a function and putting it in the RULES list at the bottom.
//
// Honest limitation, worth a line in the evaluation: with six or seven data
// points a rule like "you tend to share at the end of the month" is a
// description of a handful of events, not a discovered habit. Real personalised
// nudges need far more history than a prototype has, and the ones that fire
// here fire because the mock data was written to make them fire. That is fine
// for showing what the feature would do; it is not evidence that it works.

// How many of the same category before we say anything. Three is a pattern;
// two is a coincidence.
const REPEAT_THRESHOLD = 3

// A month is treated as ending on day 25 or later. That is the last 7 days of a
// 31-day month and the last 4 of February, so it is "the last few days" rather
// than a fixed count — fine for spotting a cluster, but do not describe it in
// the report as a five-day window. Nothing here does date arithmetic;
// dayOfMonth is written into the mock data by hand.
const END_OF_MONTH_DAY = 25

// ─── Rules ───────────────────────────────────────────────────────────────────

// "You've borrowed three power tools this year. Buying one may not be necessary
// unless your usage increases." — the team's own example.
function repeatedBorrowing(activity) {
  const counts = {}

  for (const entry of activity.borrowed) {
    counts[entry.category] = (counts[entry.category] ?? 0) + 1
  }

  const [category, count] =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0] ?? []

  if (!category || count < REPEAT_THRESHOLD) return null

  return {
    id: 'repeated-borrowing',
    tone: 'think',
    title: `You have borrowed ${count} ${category}s this year`,
    body: `Buying one may not be necessary unless your usage increases. If it does, the money you have saved so far would cover it — and someone else on the board may be about to give one away.`,
  }
}

// "You tend to share excess groceries at the end of the month. Consider
// planning smaller purchases to reduce waste." — the team's other example.
function endOfMonthSharing(activity) {
  const shared = activity.foodShared

  if (shared.length < REPEAT_THRESHOLD) return null

  const late = shared.filter((entry) => entry.dayOfMonth >= END_OF_MONTH_DAY)

  // Most of them, not just some. A couple of late-month entries is just a month.
  if (late.length < Math.ceil(shared.length * 0.6)) return null

  return {
    id: 'end-of-month-sharing',
    tone: 'think',
    title: 'Your groceries tend to run out of time at the end of the month',
    body: `${late.length === shared.length ? `All ${shared.length} of your` : `${late.length} of your ${shared.length}`} food listings went up in the last week of a month. Buying a little less on the big monthly shop would mean less to give away in a hurry.`,
  }
}

// Positive reinforcement, which the nudge literature is fairly consistent about
// mattering as much as correction. Only fires if there is something real to
// point at.
function foodRescued(activity) {
  const kg = activity.foodClaimed.reduce((total, entry) => total + entry.kg, 0)

  if (kg <= 0) return null

  return {
    id: 'food-rescued',
    tone: 'good',
    title: `You have taken ${kg.toFixed(1)} kg of food off the shelf`,
    body: 'That is food that had already been grown, shipped and paid for, and was about to be thrown away. Nothing else in the app saves as much for as little effort.',
  }
}

// The new-user case. Without this the screen is blank for anyone who has just
// joined, which is most people.
function gettingStarted(activity) {
  const total =
    activity.borrowed.length + activity.foodShared.length + activity.foodClaimed.length

  if (total >= REPEAT_THRESHOLD) return null

  return {
    id: 'getting-started',
    tone: 'start',
    title: 'Not enough history yet for personalised suggestions',
    body: `You joined in ${activity.since}. Once you have borrowed or shared a few more things, this screen will start pointing out patterns in what you actually do.`,
  }
}

const RULES = [gettingStarted, repeatedBorrowing, endOfMonthSharing, foodRescued]

export function nudgesFor(activity) {
  return RULES.map((rule) => rule(activity)).filter(Boolean)
}
