// Diminishing returns on repeat exchanges with the same neighbour.
//
// The exploit this closes: two people who agree to cheat can pass the same item
// back and forth and collect points every time. The handover code does not stop
// them — they are genuinely meeting, they just are not genuinely sharing.
//
// The tempting fix is to detect families and close friends. Do not build that.
// A phone cannot tell a colluding pair from a genuinely generous pair, and every
// rule that tries — same surname, same address, "are you related?" — is either
// impossible, wrong (flatmates are not family; siblings live apart), or plain
// profiling. It would also mean collecting identity data the app has no business
// holding. And a family passing a bookshelf to a cousin two blocks away is
// exactly what this app is for. That is not the exploit.
//
// So do not police who people are. Look at what they do: the same two people,
// over and over, at a rate that real sharing does not reach.
//
// The rule that makes this safe to ship: CAP THE POINTS, NEVER THE SHARING.
// Nothing in this file stops an exchange. The item still moves, which is the
// entire purpose of the app. Only the reward tapers. Neighbours who genuinely
// share constantly go on sharing constantly — they just stop being paid for the
// tenth time.
//
// TAPER[n] is the multiplier when the pair has already completed n exchanges:
//   1st, 2nd   full       real neighbours do this; do not punish it
//   3rd        half
//   4th        quarter
//   5th on     nothing    a farming pair is earning zero within a week
export const TAPER = [1, 1, 0.5, 0.25, 0]

// ⚠️ WHAT THIS DOES NOT CATCH, and the decision not to extend it.
//
// The taper is PER PAIR. Three or more people defeat it by circulating. A
// household of six is 15 distinct pairs, each good for two full-rate exchanges
// before it tapers, so one drill can go round indefinitely without anyone ever
// drilling anything.
//
// We are not fixing this here, and the reason is the one at the top of the file
// rather than laziness. Catching a ring means working out who is related to
// whom, which is the profiling this file exists to refuse. And any rule sharp
// enough to catch a colluding household catches a real one too: six people
// sharing one drill for a year is exactly what the app is for. The difference
// between the two is intent, and intent is not on the phone.
//
// The measure that would work is a cap on points earned per week — it bounds the
// payoff globally instead of per relationship, and it profiles nobody. It is not
// built (see §12 of docs/source-checklist.md), so do not write anywhere that the
// payoff is bounded. It is not.

// "This month" is the intended window. Nothing in this prototype does date
// arithmetic (see the note at the top of events.js), so the count here is
// really "seeded history plus whatever happens during the demo". A real version
// would count exchanges in the last 30 days and let older ones fall out.

// Order does not matter. Henrison giving to Mr Lim and Mr Lim giving to
// Henrison are the same pair — otherwise a colluding pair would simply take
// turns and never taper at all.
export function pairKey(a, b) {
  return [a, b].sort().join('|')
}

export function taperRate(priorExchanges) {
  return TAPER[Math.min(priorExchanges, TAPER.length - 1)]
}

export function taperedPoints(basePoints, priorExchanges) {
  return Math.round(basePoints * taperRate(priorExchanges))
}

function ordinal(n) {
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

// One line explaining a reduced rate, or null when nothing is being reduced.
// Says the reason as well as the number — a smaller figure with no explanation
// just looks like a bug.
export function taperNote(priorExchanges, partnerName) {
  const rate = taperRate(priorExchanges)
  if (rate === 1) return null

  const nth = ordinal(priorExchanges + 1)

  if (rate === 0) {
    return `No points left from ${partnerName} this month — this is your ${nth} exchange with them. The handover still goes ahead.`
  }

  return `${rate === 0.5 ? 'Half' : 'Quarter'} rate: your ${nth} exchange with ${partnerName} this month. Repeats with the same neighbour taper off.`
}
