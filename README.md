# Eco SG

A prototype app for BL6131 Applied Biology (NUS High), Sustainability Project 2026.

Singapore's Green Plan 2030 target area: **Sustainable Living**. The problem we're
addressing is the *value–action gap*: 7 in 10 Singaporeans feel sustainability is important,
but only 3 in 10 are actively contributing ([Singlife, *Sustainable Future Index
2024*](https://singlife.com/content/dam/public/sg/documents/about-us/sustainability-strategy/singlife-sustainable-future-index-2024.pdf)
— 1,000 Singaporeans and PRs aged 18–64, surveyed June–July 2024). Sustainable choices take
more effort and their benefit is invisible while their cost is higher. Eco SG tries to make the
sustainable option the low-effort one, and make the payoff visible.

We also ran our own survey (n=52, Aug–Sept 2026): **46 of 52 had never taken part in a
community sustainability initiative**, yet the same people rated this app's aims 4.35–4.44 out
of 5, and ranked cost the biggest barrier (4.37/5). It is a small convenience sample of mostly
students, so it speaks for the people we asked and not for Singapore — details and limitations
in [`docs/source-checklist.md`](docs/source-checklist.md) §11b.

## The three features

1. **Neighbourhood Dashboard** : A map of green infrastructure near your block
   (recycling bins, e-waste bins, EV chargers, community gardens, water refill
   stations and more), plus upcoming recycling drives you can volunteer for and a way to
   report an overflowing bin or broken facility.
2. **Sharing Platform** : Borrow, give away, swap, rent or request repairs from
   neighbours, including an *Expiring Soon Shelf* where food gets claimed before it's
   wasted.
3. **Impact Calculator** : Estimates the CO₂, water, waste and money saved by a specific
   habit change, and gives personalised nudges based on your activity in the app.

Two additions of our own run across all three: a **points system** redeemable for
vouchers, and a **neighbourhood sustainability score** that ranks estates against each
other.

## Running it on your own machine

You need [Node.js](https://nodejs.org) version 20 or newer. Check with `node -v`.

```bash
git clone https://github.com/xcneo/y6bioproject.git
cd y6bioproject
npm install     # downloads the libraries the project needs — do this once,
                # and again whenever package.json changes (e.g. after a pull)
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

All three features are built. This is a class prototype, not a real app: it runs
entirely in the browser with no server, no accounts and no database, and changes you
make in the app disappear when you reload the page. To show both sides of a handover on
one phone, the dark bar at the top switches between two residents, Henrison and Mr Lim.

`src/data/` holds two very different kinds of data, and the difference matters:

- **Real and cited.** Every conversion figure the Impact Calculator uses (CO₂, water,
  prices, serving sizes) is in `src/data/factors.js`, with its source. Of the map's
  25 facilities in Clementi, 21 are recorded real ones: the bins, gardens, bicycle racks
  and parks come from official NEA, LTA and NParks datasets, and the EV chargers were
  confirmed on Revolt.sg, a charger listing. The other four, two water coolers and two
  rooftop-solar entries, are illustrative, because no public dataset records them. What
  has been checked, and by whom, is recorded in [`docs/source-checklist.md`](docs/source-checklist.md).
- **Invented for the demo.** The residents, listings, food shelf, events, recipes, activity
  history and neighbourhood scores are made up, and each file says so at the top.

See `CLAUDE.md` for the fuller project brief and the working rules we follow.
