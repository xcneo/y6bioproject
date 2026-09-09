// Recipe suggestions for food nobody claimed in time.
//
// The idea from the spec: if an item on the Expiring Soon Shelf reaches its date
// with no claim, the app stops trying to give it away and instead helps you use
// it up, so it still does not end up in the bin.
//
// ⚠️ THE RECIPES BELOW ARE INVENTED, like every other file in this directory
//    except factors.js. They were written for the demo, not taken from a
//    cookbook, tested in a kitchen, or checked by anyone who cooks. Do not
//    present them in the report as sourced or as tested.
//
//    The risk here is lower than elsewhere in src/data — a recipe is not a claim
//    about Singapore, and nothing on this screen feeds the Impact Calculator —
//    but "invented" was the one word this header was missing while every other
//    mock file said it, so it is said now.
//
// These are ordinary home recipes, deliberately short and low-effort — the point
// is to remove an excuse, not to teach cooking. Times are rough estimates, not
// measured, and no nutritional or CO2 figures are claimed here.
//
// uses lists the ingredient tags from foodShelf.js that a recipe needs.

export const RECIPES = [
  {
    id: 'abc-soup',
    name: 'ABC soup',
    minutes: 45,
    uses: ['carrot', 'celery', 'tomato'],
    blurb: 'Carrot, celery and whatever else is soft, simmered with pork ribs or corn.',
  },
  {
    id: 'veg-porridge',
    name: 'Vegetable porridge',
    minutes: 30,
    uses: ['carrot', 'celery', 'egg'],
    blurb: 'Rice, water, chopped vegetables. Forgiving about what goes in.',
  },
  {
    id: 'carrot-egg',
    name: 'Stir-fried carrot with egg',
    minutes: 10,
    uses: ['carrot', 'egg'],
    blurb: 'Shred the carrot, fry it soft, push it aside, scramble the egg in.',
  },
  {
    id: 'banana-pancakes',
    name: 'Banana pancakes',
    minutes: 20,
    uses: ['banana', 'egg', 'milk'],
    blurb: 'Overripe bananas mash better. Flour, egg, milk, fry in a pan.',
  },
  {
    id: 'banana-freeze',
    name: 'Frozen banana for shakes',
    minutes: 5,
    uses: ['banana'],
    blurb: 'Peel, break into chunks, freeze. Keeps for weeks and blends into anything.',
  },
  {
    id: 'french-toast',
    name: 'French toast',
    minutes: 15,
    uses: ['bread', 'egg', 'milk'],
    blurb: 'Rescues bread that has gone dry — dry bread actually soaks up better.',
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    minutes: 15,
    uses: ['bread'],
    blurb: 'Toast the slices hard, blitz or crush them, keep in a jar for months.',
  },
  {
    id: 'tomato-egg',
    name: 'Tomato and egg',
    minutes: 12,
    uses: ['tomato', 'egg'],
    blurb: 'Soft tomatoes are better for this than firm ones. Serve over rice.',
  },
]

// Picks the recipes that use the most of what you actually have.
// Anything sharing no ingredients at all is left out — suggesting french toast
// for a bag of carrots would just look broken.
export function recipesFor(tags, limit = 2) {
  return RECIPES.map((recipe) => ({
    recipe,
    matches: recipe.uses.filter((ingredient) => tags.includes(ingredient)).length,
  }))
    .filter((entry) => entry.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, limit)
    .map((entry) => entry.recipe)
}
