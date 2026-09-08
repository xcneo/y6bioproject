# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Eco SG — Project Context

## What this is

A school prototype for BL6131 Applied Biology (NUS High), Sustainability Project 2026.
Team: Yvette, Mandy, Zhong Rui, Yi Xuan, Henrison, Xuan Che.

Target area under the Singapore Green Plan 2030: **Sustainable Living**.

**Problem being addressed:** the value–action gap. Around 4 in 10 Singaporeans
don't actively contribute to sustainability efforts despite saying they value them.
(⚠️ That "4 in 10" is still unsourced — find the survey it came from or drop it.
See `docs/source-checklist.md`.)
Two root causes:
1. **Inconvenience** — sustainable options take more effort (e.g. residents don't know
   where the nearest Bloobox collection point or EV charger is; the domestic
   recycling rate was **11% in 2025** — NEA, "Waste Statistics and Overall
   Recycling"). *This figure was "around 20%" in an earlier draft of this brief.
   That was a stale number: the domestic recycling rate has been falling for
   years. The current figure makes the problem larger, not smaller.*
2. **Invisible benefit vs. visible cost** — the price premium on sustainable goods is
   obvious, but the benefit requires hunting down a carbon calculator.

**The solution:** *Eco SG*, an app that makes sustainable living the low-effort option
and makes the payoff visible.

## Scope — READ THIS BEFORE SUGGESTING ARCHITECTURE

This is a **prototype for a class demo**, not a production app. Hard constraints:

- **Frontend only.** No backend, no database, no auth, no API keys.
- **All data is mock data** in `src/data/`. These are `.js` modules exporting plain
  objects and arrays — not `.json` files — so they can carry comments, and the
  comments are where the sourcing lives. Hand-authored, plausible,
  Singapore-specific (real town names, real block numbers, realistic prices in SGD).
- **State lives in React state.** Changes don't persist across reload. That's fine.
- **Mobile-first.** Target viewport ~390px wide. It will be demoed on a phone.
- **Prefer boring, working code** over clever abstractions. Six students of mixed coding
  experience need to read and edit this.

If a request would need a server, a real map API key, or user accounts — say so and
propose the fake-data version instead.

## Commands

```
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run lint      # eslint over the repo
```

No test runner is configured, and there are no tests. Don't write tests against a
framework that isn't installed — if a change needs verifying, verify it by running
`npm run dev` and looking at the screen.

## Stack

All of these are installed and working:

- Vite + **React 19** (JavaScript, not TypeScript)
- **Tailwind CSS v4** — styling is class names in the JSX
- **react-router-dom v7** — wired up, with three routes in `src/App.jsx`
- No state management library. `useState` / `useContext` only.

Tailwind v4 is wired up differently from the v3 setup most tutorials show. There is
**no `tailwind.config.js` and no `postcss.config.js`**, and that is correct — don't add
them or follow a guide that tells you to. The whole setup is two lines:

- `vite.config.js` loads the `@tailwindcss/vite` plugin
- `src/index.css` contains `@import 'tailwindcss';`

Customising theme values (brand colours, fonts) is done with a `@theme { }` block in
`src/index.css`, not in a config file.

## Current state of the repo

`src/App.jsx` holds the router and the three-tab bottom nav, wrapped in
`SessionProvider` and `SharingProvider`. (An earlier version of this brief named a
`PointsProvider`; no such thing exists — the points balance lives in
`SessionProvider`, because it is per-resident.)

**All three features are built.** The prototype is feature-complete for the demo:
- **Feature 1, Neighbourhood Dashboard** — `src/pages/Dashboard.jsx`
- **Feature 2, Sharing Platform** — `src/pages/Share.jsx`
- **Feature 3, Impact Calculator** — `src/pages/Impact.jsx`

`src/lib/` holds the logic the pages call: `impact.js` (the calculator's
arithmetic), `nudges.js` (the rule-based personalised nudges), `pairing.js` (the
repeat-exchange taper) and `handover.js` (the four-digit codes).

`src/context/` holds two providers. `SessionProvider` knows which resident's
phone you are on and keeps a points balance per resident; `SharingProvider`
holds the sharing board itself. Both sit outside the router so state survives
moving between tabs mid-demo.

Repeat exchanges between the same two people earn less each time (`src/lib/pairing.js`):
full, full, half, quarter, then nothing. This closes the collusion hole the handover
code cannot — two people who agree to cheat really do meet. The rule that keeps it
safe: **cap the points, never the sharing.** Nothing ever blocks an exchange. Do not
add rules about who people are (families, friends, same address); a phone cannot tell
a colluding pair from a generous one, and trying would mean profiling.

**There are two residents, not one** — Henrison and Mr Lim, switched with the
dark bar at the top of the screen. Two real phones would need a server, which
this project rules out, so one device shows two points of view instead. This is
what makes the handover code demonstrable rather than merely described.
Ownership is therefore `ownerId` compared against the current resident; never
reintroduce a literal `'You'`.
Points are only ever awarded when something is actually completed — attendance
confirmed, item handed over — never for signing up or posting. On the sharing
screen a completion that pays points also needs the other person's four-digit
handover code, so nobody can pay themselves for a meeting that never happened.
Keep both rules.

`src/data/` exists and holds the mock data, including **`factors.js`** — every
conversion figure the app shows, each with a `source`. Read its header before
touching it. Figures Claude could not source are `value: null` and the screen
shows a "Source needed" chip rather than a guess.

As of 8 Sept 2026 every figure is filled and **no card shows a "Source needed"
chip any more**. The drill's water was the last gap: it was deliberately
unsourced for weeks, then sourced from the EPA's USEEIO input-output model. Keep
the chip mechanism anyway — it is what stopped a guess going in, and the next
unsourced number needs somewhere to show. If you want a screenshot of a chip for
the report, take it from the 21 Aug progress update or an earlier commit.

Three things that follow from this:

- **The drill card's water tile is labelled "Water withdrawn", not "Water".**
  USEEIO gives freshwater *withdrawals*; the food cards use Mekonnen & Hoekstra's
  *consumptive* footprint. Same unit, different physical quantity. Never merge
  the labels — `docs/source-checklist.md` §4d explains why at length.
- **The drill card mixes methods on purpose**: CO₂ from a process LCA, water from
  a spend-based model. Each is the best available for its quantity. The two
  methods were cross-checked on CO₂ and agree within 1.4×.
- **A chip means two different things and the screen cannot tell them apart** —
  "nobody has found this yet" and "we do not think this is knowable". That is a
  real limitation of our own design; see `docs/source-checklist.md` §4c before
  changing anything about it.
- **Claude finding a source is not verification.** The checklist's tick-boxes
  mean *a team member opened the page and read the number*, and they are the
  team's to tick — never tick them on their behalf. When the team did open the
  papers, four Claude-sourced figures turned out wrong. Sections 4, 4b, 5 and 6
  currently have sources that nobody has checked.

A figure shown on screen that is **not** in `factors.js` is outside this
mechanism entirely and nothing will flag it — `docs/source-checklist.md` §8 lists
the ones that remain.

`README.md` describes the project properly and has done since 14 Aug 2026 — it is
not the stock Vite template. Xuan Che edited the wording on 7 Sept.

⚠️ It carries **its own copy of the "4 in 10 Singaporeans" claim**, the unsourced
one flagged at the top of this file. That figure now lives in two places. Change
it in one and you have contradicted yourself in the other, so change both.

Leftover starter files, all still present as of 8 Sept 2026, none of them used, all
safe to delete whenever convenient. They belong to the Vite template, not to Eco SG:
`src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`.

## The repo is shared

`origin` is **https://github.com/xcneo/y6bioproject** — Xuan Che's repo, which the
whole team pulls from. A push to `main` lands on everyone. Commit and push only
when asked, and check `git fetch` first: teammates push too, and on 7 Sept two
README commits appeared between one session and the next.

## The three features

### 1. Neighbourhood Dashboard
An interactive map view of green infrastructure near the user's block: recycling points,
Bloobox collection, solar panels, community gardens, EV chargers, water refill stations,
bicycle parking, park connectors, cooling green spaces.

Also shows: upcoming recycling drives and sustainability events (with a join/volunteer
button), and a "report a problem" form for overflowing bins or broken facilities.

Prototype approach: a static illustrated map or a simple positioned-marker layout over a
neighbourhood image — do **not** pull in Google Maps or Mapbox. Filter chips by facility type.

### 2. Sharing Platform
Residents can borrow, give away, swap, rent, request repairs, or list food.

Key sub-feature: the **"Expiring Soon Shelf"** — neighbours claim food before it's wasted.
If nothing is claimed by the expiry date, the app suggests recipes using those ingredients.

Anti-misuse detail the team designed: listing food requires a photo of the expiry date, or
if unavailable, a photo of the item so others can judge freshness themselves. Show this in
the listing flow even though photo upload is faked.

### 3. Impact Calculator
Estimates CO₂, money, water and waste saved from specific habit changes
(e.g. "what if I replace beef with chicken twice a week?").

Also produces **personalised nudges** based on activity in the app, e.g.
- "You've borrowed three power tools this year. Buying one may not be necessary unless your usage increases."
- "You tend to share excess groceries at the end of the month. Consider planning smaller purchases to reduce waste."

For the prototype these are rule-based on the mock activity data — no ML.

## Customisations the team added (keep these visible in the UI)

- **Points system.** Users earn points for eco-friendly swaps, attending events, donating
  food. Points redeem for grocery vouchers and restaurant discounts in-app.
- **Neighbourhood sustainability score.** A mini-map showing a score per neighbourhood,
  computed from things like food saved and items recycled. Creates friendly competition
  between estates, and lets planners spot low-engagement areas.

## Important: figures must be sourced

Any number shown to the user — kg CO₂ per kg of beef, litres of water per item, etc. —
goes in `src/data/factors.js` with a `source` field naming where it came from
(NEA, MSE, Our World in Data, a cited paper). The written report is marked on use of
reliable sources. **Never invent a conversion factor.** If you don't have a real one,
put a `TODO_SOURCE` marker and tell the team to look it up.

## Working style

- **The build phase is over.** All three features exist. Work now is sourcing,
  verifying, correcting and writing up — not new features. If a new feature is
  requested this close to the deadline, say what it would cost and confirm first.
- Explain what you changed in plain language at the end of each task — team members
  need to be able to describe the code in the report and presentation.
- When you make a design decision with a real alternative, name the alternative. The
  team is marked on critically evaluating and refining AI-generated suggestions, so they
  need to know what they're choosing between.
- Append a summary of each task to `docs/ai-log.md`. It started as one line per
  task; entries are now a paragraph, because what was *decided and why* is the
  part the report needs. Match the existing style. The team pastes their own
  prompts there too; the annex requires all AI prompts and outputs.
- `docs/source-checklist.md` is the live record of which figures are sourced and
  which have been checked by a person. Update it in the same task that changes a
  figure, never later.

## Deadlines

- ~~**21 Aug 2026** — two-page prototype progress update with photos/screenshots.~~
  **Passed.** If it happens to contain a screenshot of a "Source needed" chip,
  that is now the easiest place to find one — none appear in the app any more.
- **21 Sept 2026** — final report (3500–4000 words), team presentation, prototype
  demo. **Under two weeks away as of 8 Sept.**

The prototype is already screenshot-able and tappable. The binding constraint now
is the written report and the outstanding verification in
`docs/source-checklist.md`, not the code.

The team is new to the terminal and to React. Explain what a command
does before running it, in plain language. Avoid jargon or define it.
