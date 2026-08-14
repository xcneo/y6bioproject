# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Eco SG — Project Context

## What this is

A school prototype for BL6131 Applied Biology (NUS High), Sustainability Project 2026.
Team: Yvette, Mandy, Zhong Rui, Yi Xuan, Henrison, Xuan Che.

Target area under the Singapore Green Plan 2030: **Sustainable Living**.

**Problem being addressed:** the value–action gap. Around 4 in 10 Singaporeans
don't actively contribute to sustainability efforts despite saying they value them.
Two root causes:
1. **Inconvenience** — sustainable options take more effort (e.g. residents don't know
   where the nearest Bloobox collection point or EV charger is; home recycling
   collection sits around 20%).
2. **Invisible benefit vs. visible cost** — the price premium on sustainable goods is
   obvious, but the benefit requires hunting down a carbon calculator.

**The solution:** *Eco SG*, an app that makes sustainable living the low-effort option
and makes the payoff visible.

## Scope — READ THIS BEFORE SUGGESTING ARCHITECTURE

This is a **prototype for a class demo**, not a production app. Hard constraints:

- **Frontend only.** No backend, no database, no auth, no API keys.
- **All data is mock data** in local JSON files under `src/data/`. Hand-authored,
  plausible, Singapore-specific (real town names, real block numbers, realistic prices in SGD).
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

## Stack — intended vs. actually installed

Intended (what the sections below are written against):

- Vite + React (JavaScript, not TypeScript)
- Tailwind CSS
- react-router-dom for the three main screens
- No state management library. `useState` / `useContext` only.

**Actually installed right now: only `react`, `react-dom`, `vite`, and eslint.**
Tailwind and react-router-dom are *not* in `package.json` — do not write `className`
soup or `<Route>` assuming they work. Styling today is plain CSS in `src/index.css`
and `src/App.css`.

When a task first needs one of them, install it as an explicit step and say so, rather
than silently adding a dependency. Tailwind v4 wires in via `@tailwindcss/vite` plus a
single `@import "tailwindcss"` in the CSS — there is no `tailwind.config.js` unless you
need one.

## Current state of the repo

`src/App.jsx` is still the **stock Vite starter page** (logos, counter button, links to
Vite docs) and `README.md` is still the stock Vite template text. Neither describes this
project. The first feature session should replace App.jsx outright.

Directories the sections below refer to **do not exist yet** — create them when first
needed: `src/data/` (mock JSON + `factors.js`), `docs/ai-log.md`.

`src/assets/hero.png` and `public/icons.svg` belong to the starter template, not to Eco SG.

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

- One feature per session. Don't scaffold all three at once.
- Explain what you changed in plain language at the end of each task — team members
  need to be able to describe the code in the report and presentation.
- When you make a design decision with a real alternative, name the alternative. The
  team is marked on critically evaluating and refining AI-generated suggestions, so they
  need to know what they're choosing between.
- Append a one-line summary of each task to `docs/ai-log.md`. The team pastes their own
  prompts there; the annex requires all AI prompts and outputs.

## Deadlines

- **21 Aug 2026** — two-page prototype progress update with photos/screenshots.
- **21 Sept 2026** — final report (3500–4000 words), team presentation, prototype demo.

Prioritise getting something screenshot-able and tappable over completeness.
