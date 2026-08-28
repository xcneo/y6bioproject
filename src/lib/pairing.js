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
