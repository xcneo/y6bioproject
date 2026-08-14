# Eco SG

A prototype app for BL6131 Applied Biology (NUS High), Sustainability Project 2026.

Singapore's Green Plan 2030 target area: **Sustainable Living**. The problem we're
addressing is the *value–action gap* — around 4 in 10 Singaporeans say they value
sustainability but don't act on it, because sustainable choices take more effort and
their benefit is invisible while their cost isn't. Eco SG tries to make the sustainable
option the low-effort one, and make the payoff visible.

## The three features

1. **Neighbourhood Dashboard** — a map of green infrastructure near your block
   (recycling points, Bloobox collection, EV chargers, community gardens, water refill
   stations and more), plus upcoming recycling drives you can volunteer for and a way to
   report an overflowing bin or broken facility.
2. **Sharing Platform** — borrow, give away, swap, rent or request repairs from
   neighbours, including an *Expiring Soon Shelf* where food gets claimed before it's
   wasted.
3. **Impact Calculator** — estimates the CO₂, water, waste and money saved by a specific
   habit change, and gives personalised nudges based on your activity in the app.

Two additions of our own run across all three: a **points system** redeemable for
vouchers, and a **neighbourhood sustainability score** that ranks estates against each
other.

## Running it on your own machine

You need [Node.js](https://nodejs.org) version 20 or newer. Check with `node -v`.

```bash
git clone https://github.com/xcneo/y6bioproject.git
cd y6bioproject
npm install     # downloads the libraries the project needs — do this once
npm run dev     # starts the app
```

`npm run dev` prints a link (usually http://localhost:5173). Open it in your browser.
Leave that terminal running while you work — it rebuilds the page every time you save a
file. Press `Ctrl+C` in the terminal to stop it.

The app is designed for a phone, so it shows as a narrow column on a laptop. That's
intended. To see it properly, open your browser's device toolbar and pick a phone size
(in Chrome: right-click → Inspect → the phone/tablet icon).

Other commands:

```bash
npm run build     # makes the production version, in dist/
npm run preview   # views that production version locally
npm run lint      # checks the code for mistakes
```

## Status

This is a class prototype, not a real app. It runs entirely in the browser with no
server, no accounts and no database, and every location, event and figure in
`src/data/` is made up for demonstration. Changes you make in the app disappear when you
reload the page.

Right now the Neighbourhood Dashboard is built (set in Clementi); the Sharing Platform
and Impact Calculator are placeholder screens.

See `CLAUDE.md` for the fuller project brief and the working rules we follow.
