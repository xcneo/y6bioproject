# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Eco SG — Project Context

## What this is

A school prototype for BL6131 Applied Biology (NUS High), Sustainability Project 2026.
Team: Yvette, Mandy, Zhong Rui, Yi Xuan, Henrison, Xuan Che.

Target area under the Singapore Green Plan 2030: **Sustainable Living**.

**Problem being addressed:** the value–action gap. **7 in 10 Singaporeans feel
sustainability is important, but only 3 in 10 are actively contributing** —
Singlife, *Sustainable Future Index 2024* (n=1,000, aged 18–64, fielded June–July
2024, published 10 Feb 2025).

**Our own survey says the same about the people we asked** (n=52, Aug–Sept 2026):
**46 of 52 have never taken part in a community sustainability initiative**, while
the same respondents rate this app's aims 4.35–4.44 out of 5. That is the gap
measured in one group of people rather than inferred from two survey questions.
It is a convenience sample of mostly students, so the national claim rests on
Singlife and ours corroborates it locally — never write "our survey found that
Singaporeans…". See `docs/source-checklist.md` §11 and §11b.

Two root causes:

1. **Inconvenience** — sustainable options take more effort (residents don't know
   where the nearest Bloobox point or EV charger is; the domestic recycling rate
   was **11% in 2025** — NEA, "Waste Statistics and Overall Recycling").
2. **Invisible benefit vs. visible cost** — the price premium is obvious, the
   benefit requires hunting down a carbon calculator.

Our survey ranks the barriers **cost 4.37/5**, **no dedicated community 4.23/5**,
**lack of information 3.85/5**. Cost coming top is the figure for root cause 2.

**The solution:** *Eco SG*, an app that makes sustainable living the low-effort
option and makes the payoff visible.

## Scope — READ THIS BEFORE SUGGESTING ARCHITECTURE

A **prototype for a class demo**, not a production app. Hard constraints:

- **Frontend only.** No backend, no database, no auth, no API keys.
- **State lives in React state.** Changes don't persist across reload. That's fine.
- **Mobile-first.** Target viewport ~390px. It will be demoed on a phone.
- **Prefer boring, working code** over clever abstractions. Six students of mixed
  coding experience need to read and edit this.

If a request needs a server, a real map API key, or user accounts — say so and
propose the fake-data version instead.

### `src/data/` holds three different kinds of thing. Do not treat them alike.

They are `.js` modules exporting plain objects — not `.json` — so they can carry
comments, and the comments are where the honesty lives.

1. **Invented scenario data** — `activity.js`, `events.js`, `facilities.js`,
   `foodShelf.js`, `listings.js`, `neighbourhoods.js`, `recipes.js`,
   `residents.js`. Hand-authored, plausible, Singapore-specific. Every one says
   in its header that it is invented. Inventing more is fine and expected.
2. **`factors.js` — NOT mock, and the exception to everything above.** Every
   figure is real and cited. **Never invent a number here**, never round one to
   look tidier, and never treat "it is only a prototype" as licence to guess.
   Same for `SERVING_KG`, which lives in the same file.
3. **UI taxonomy and card copy** — `facilityTypes.js`, `listingTypes.js`,
   `habits.js`. Structure and wording, not claims about the world. `habits.js`
   names the `factors.js` keys each card needs and holds no numbers of its own;
   keep it that way, because a number typed there sits outside the sourcing
   mechanism where nothing will flag it.

⚠️ An earlier version of this brief said "all data is mock data". That was wrong
and dangerous: read literally it licenses inventing a conversion factor.

## Commands

```
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run lint      # eslint over the repo
```

No test runner is configured and there are no tests. Don't write tests against a
framework that isn't installed — verify by running `npm run dev` and looking at
the screen, or by importing `src/lib/impact.js` in a scratch script.

## Stack

- Vite + **React 19** (JavaScript, not TypeScript)
- **Tailwind CSS v4** — styling is class names in the JSX
- **react-router-dom v7** — three routes in `src/App.jsx`
- No state management library. `useState` / `useContext` only.

Tailwind v4 is wired differently from the v3 setup most tutorials show. There is
**no `tailwind.config.js` and no `postcss.config.js`**, and that is correct —
don't add them. The whole setup is two lines: `vite.config.js` loads the
`@tailwindcss/vite` plugin, and `src/index.css` contains `@import 'tailwindcss';`.
Theme values go in a `@theme { }` block in `src/index.css`, not a config file.

## Current state

**All three features are built.** The prototype is feature-complete for the demo.

- **Feature 1, Neighbourhood Dashboard** — `src/pages/Dashboard.jsx`
- **Feature 2, Sharing Platform** — `src/pages/Share.jsx`
- **Feature 3, Impact Calculator** — `src/pages/Impact.jsx`

`src/App.jsx` holds the router and the three-tab bottom nav, wrapped in
`SessionProvider` and `SharingProvider` (both outside the router, so state
survives moving between tabs mid-demo).

`src/lib/` holds the logic: `impact.js` (the calculator's arithmetic),
`nudges.js` (rule-based nudges), `pairing.js` (the repeat-exchange taper),
`handover.js` (the four-digit codes).

**There are two residents, not one** — Henrison and Mr Lim, switched with the
dark bar at the top. Two real phones would need a server, so one device shows two
points of view instead. That is what makes the handover code demonstrable rather
than merely described. Ownership is `ownerId` compared against the current
resident; never reintroduce a literal `'You'`.

**Rules that must not be weakened:**

- Points are awarded **only when something is actually completed** — attendance
  confirmed, item handed over — never for signing up or posting.
- On the sharing screen, a completion that pays points also needs the other
  person's four-digit handover code.
- Repeat exchanges between the same pair taper: full, full, half, quarter,
  nothing (`pairing.js`). The rule that keeps it safe is **cap the points, never
  the sharing** — nothing ever blocks an exchange. Do not add rules about who
  people are (families, friends, same address); a phone cannot tell a colluding
  pair from a generous one, and trying would mean profiling.
- **The taper is per-pair and a ring of three or more defeats it.** Known and
  accepted, not an oversight — a household of six is 15 pairs, each good for two
  full-rate exchanges. The standing decision is **bound the rewards, do not
  identify the users**, because any rule sharp enough to catch a colluding
  household also catches a real one sharing a drill. The fix that fits that
  decision is a per-week points cap; it is **not built**, so nothing may claim
  the payoff is bounded. See §12 of `docs/source-checklist.md`.

Leftover Vite starter files, unused, safe to delete: `src/assets/hero.png`,
`src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`.

`README.md` describes the project properly and is not the stock Vite template. It
carries its own copy of the value–action gap figures — change them in one place
and you have contradicted the other, so change both.

## The three features

### 1. Neighbourhood Dashboard

An interactive map of green infrastructure near the user's block: recycling
points, Bloobox collection, solar panels, community gardens, EV chargers, water
refill stations, bicycle parking, park connectors, cooling green spaces. Also
upcoming recycling drives and events with a join/volunteer button, and a "report
a problem" form.

Prototype approach: a static illustrated map or positioned markers over a
neighbourhood image — do **not** pull in Google Maps or Mapbox. Filter chips by
facility type.

### 2. Sharing Platform

Borrow, give away, swap, rent, request repairs, or list food.

Key sub-feature: the **"Expiring Soon Shelf"** — neighbours claim food before it
is wasted. If nothing is claimed by the expiry date, the app suggests recipes
using those ingredients.

Anti-misuse detail: listing food requires a photo of the expiry date, or of the
item so others can judge freshness. Show this in the listing flow even though
photo upload is faked.

### 3. Impact Calculator

Estimates CO₂, money, water and waste saved from specific habit changes. Swaps
are **serving for serving**, using HPB's published serving sizes — the card unit
is "servings a week".

Also produces **personalised nudges** from the mock activity data, rule-based, no
ML.

## Customisations to keep visible in the UI

- **Points system.** Earned for eco-friendly swaps, attending events, donating
  food. Redeemable for grocery vouchers and restaurant discounts in-app.
  **Grocery vouchers, decided 9 Sept, not green-goods-only** — cost is the
  barrier our survey ranked first (4.37/5, 28 of 52 at maximum), so the reward
  targets the barrier residents named. Restricting redemption to sustainable
  goods was the alternative and would have confined farming to behaviour we
  promote; it was rejected as a weaker incentive against that barrier. The
  accepted cost is that a cash-equivalent reward makes farming worth attempting.
- **Neighbourhood sustainability score.** A mini-map scoring each neighbourhood,
  creating friendly competition and letting planners spot low-engagement areas.

## Important: figures must be sourced

Any number shown to the user goes in `src/data/factors.js` with a `source` field
naming where it came from. The written report is marked on use of reliable
sources. **Never invent a conversion factor.** If you don't have a real one, use
`TODO_SOURCE` and tell the team to look it up — the app shows a "Source needed"
chip rather than a guess.

Three rules learned the hard way, all of them worth a line in the report:

- **Cite the page you actually opened.** If you cannot give it a date and a
  human-readable URL, it is a lead, not a source.
- **Check the qualifier, not just the number.** Raw vs cooked, bare tool vs with
  battery, ex-tax vs inc-tax, one product vs a bundle, a specific crop vs an
  aggregate category. This has caught the project five times, every time.
- **A data change is not finished until the copy describing it has been re-read.**

`docs/source-checklist.md` is the live record of which figures are sourced and
which a person has checked. Update it in the same task that changes a figure.
**Never tick a box on the team's behalf** — a tick means a team member opened the
source and read the number.

## Working style

- **The build phase is over.** Work now is sourcing, verifying, correcting and
  writing up — not new features. If a new feature is requested this close to the
  deadline, say what it would cost and confirm first.
- Explain what you changed in plain language at the end of each task — team
  members need to describe the code in the report and presentation.
- When you make a design decision with a real alternative, name the alternative.
  The team is marked on critically evaluating AI-generated suggestions.
- Append a summary of each task to `docs/ai-log.md`, a paragraph per task, in the
  existing style. The annex requires all AI prompts and outputs.
- The team is new to the terminal and to React. Explain what a command does
  before running it, in plain language. Avoid jargon or define it.

## The repo is shared

`origin` is **https://github.com/xcneo/y6bioproject** — Xuan Che's repo, which the
whole team pulls from. A push to `main` lands on everyone. Commit and push only
when asked, and check `git fetch` first: teammates push too.

## Deadlines

- **21 Sept 2026** — final report (3500–4000 words), team presentation, prototype
  demo. **Under two weeks away as of 9 Sept.**

The prototype is screenshot-able and tappable. The binding constraint is the
written report and the outstanding verification in `docs/source-checklist.md`,
not the code.

## Next task

**Coding is done.** As of 10 Sept 2026 every figure that reaches a screen is
sourced and verified by a team member. Do not start new features. What remains is
writing, and three of the four items below are report work.

`docs/source-checklist.md` is the live record. Its outstanding list:

1. **Confirm the survey figures** against `bio proj form (Responses).xlsx` — §11b.
   The only section still unticked. The file is not in the repo.
2. **Write §7's assumptions and §9's parameters into the methodology** — the
   cooked-vs-raw meat judgement with its 33% sensitivity, and the taper, the
   nudge thresholds and the rounding rules.
3. *Optional:* record dates on the three NParks datasets.

**Everything else is closed.** §8 was rebuilt from official data on 10 Sept — 25
facilities, 21 dataset-confirmed, four illustrative by decision. §12's two
anti-misuse decisions are taken: no per-week points cap, and the self-credit hole
removed.

### Things the report must say, and must not say

- **The payoff is unbounded.** There is no points cap. Never write that the
  payoff is too small to be worth fraud — say a weekly cap is the mitigation we
  designed and did not build.
- **The NEA bin data is 2017**, not the 2024 the portal page reports; the e-waste
  data is 2021–22. `FMEL_UPD_D` means different things in the two files.
- **The e-waste points are "recorded by NEA in 2022, not confirmed on site."**
  Nobody on the team lives in Clementi.
- **Three of the five gardens are inside schools** and are not open to the public.
  The cards say so.
- **Withdrawn claims that must not resurface:** the EV-to-HDB car park number
  correspondence (C17 and so on), and the eggs argument in §7.
- **Never write "our survey found that Singaporeans…"** — n=52, mostly students.
