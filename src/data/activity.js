// What each resident has done in the app this year.
//
// ⚠️ ALL INVENTED, like the rest of the mock data. Nobody has done any of this.
//
// This is what the personalised nudges read. The nudges are rule-based — plain
// `if` statements over this list, no machine learning anywhere — so the history
// has to be shaped for the rules to have something to find. Henrison's is
// written so that two of the patterns the team designed actually show up:
//
//   • three power tools borrowed, none bought
//   • groceries shared in a cluster at the end of each month
//
// Mr Lim's is deliberately thinner, so switching phones shows what the screen
// looks like for someone who has only just started using the app. An empty-ish
// state is worth demoing — most real users will be in it.
//
// month is 1–12. dayOfMonth exists so a rule can notice end-of-month clustering
// without doing any date arithmetic (nothing in this prototype does — see the
// note at the top of events.js).
//
// foodType keys must match the keys in factors.js, or the CO₂ cannot be worked
// out for them.

export const ACTIVITY = {
  henrison: {
    since: 'January 2026',

    borrowed: [
      { item: 'Cordless drill', category: 'power tool', from: 'Mr Lim', month: 2 },
      { item: 'Pressure washer', category: 'power tool', from: 'Mr Rahim', month: 4 },
      { item: 'Angle grinder', category: 'power tool', from: 'Daniel Ng', month: 6 },
      { item: '28-inch luggage', category: 'luggage', from: 'Aisyah', month: 3 },
      { item: 'Camping tent', category: 'outdoor gear', from: 'Jasmine Goh', month: 6 },
    ],

    // Food he gave away before it went off.
    foodShared: [
      { what: 'Bag of carrots', foodType: 'rootVegetables', kg: 0.6, month: 3, dayOfMonth: 27 },
      { what: 'Half a loaf', foodType: 'bread', kg: 0.4, month: 4, dayOfMonth: 29 },
      { what: 'Cherry tomatoes', foodType: 'tomatoes', kg: 0.3, month: 5, dayOfMonth: 26 },
      { what: 'Two litres of milk', foodType: 'milk', kg: 2.0, month: 6, dayOfMonth: 28 },
      { what: 'Bag of bananas', foodType: 'bananas', kg: 0.8, month: 7, dayOfMonth: 30 },
      { what: 'Six eggs', foodType: 'eggs', kg: 0.36, month: 8, dayOfMonth: 25 },
    ],

    // Food he took off the shelf that would otherwise have been binned.
    foodClaimed: [
      { what: 'Loaf of white bread', foodType: 'bread', kg: 0.4, month: 5, dayOfMonth: 12 },
      { what: 'Box of tomatoes', foodType: 'tomatoes', kg: 0.3, month: 7, dayOfMonth: 4 },
    ],

    itemsGivenAway: 4,
    eventsAttended: 2,
  },

  mrlim: {
    since: 'July 2026',
    borrowed: [],
    foodShared: [
      { what: 'Bag of long beans', foodType: 'otherVegetables', kg: 0.5, month: 8, dayOfMonth: 14 },
    ],
    foodClaimed: [],
    itemsGivenAway: 1,
    eventsAttended: 0,
  },
}
