// Handover codes.
//
// The problem this solves: whoever is about to be given points is the one
// tapping the button that gives them out. Nothing stopped you posting "bag of
// rice", tapping "collected" and paying yourself, over and over.
//
// The rule now is: whoever is being credited has to type in the OTHER person's
// four-digit code. You cannot know that code without standing in front of them,
// so the points can only be claimed for a handover that really happened.
//
// Real apps do this too — a delivery PIN, or the code a driver asks you for.
//
// Honest limitation for the report: two neighbours who agree to cheat can still
// read each other codes over the phone. This raises the effort a lot; it does
// not make fraud impossible. Nothing done purely on the phone can.

export function makeHandoverCode() {
  // 1000-9999, so it is always four digits and never starts with a 0.
  return String(Math.floor(1000 + Math.random() * 9000))
}
