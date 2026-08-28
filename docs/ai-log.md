# AI Log

Required for the report annex. Team members paste their own prompts here; Claude Code
appends a one-line summary of each task it completes.

## Claude Code task summaries

- 2026-08-14 — Updated `CLAUDE.md`: added the standard Claude Code header, an npm commands
  section, and a "current state" section recording that Tailwind and react-router-dom are
  named in the spec but not yet installed, and that `src/App.jsx` is still the stock Vite
  starter. Created this log file.
- 2026-08-14 — Installed Tailwind CSS v4 (via the `@tailwindcss/vite` plugin) and
  react-router-dom v7. Replaced the stock Vite starter page in `src/App.jsx` with a
  plain Tailwind-styled heading to confirm the setup works; deleted the now-unused
  `src/App.css`. Updated the Stack section of `CLAUDE.md` to match.
- 2026-08-14 — Built the Neighbourhood Dashboard (feature 1) for Clementi: stylised SVG
  map with 15 mock facilities, filter chips by type, tap-a-marker detail card with a
  "report a problem" form, nearest-first list, events with join/volunteer buttons,
  points counter, and the neighbourhood sustainability score ranking six estates.
  Added a three-tab bottom nav with the Share and Impact screens as placeholders.
  Chose one estate in depth over a Singapore-wide map — see the note in `facilities.js`.
- 2026-08-14 — Changed how event points work. Points are now credited only when
  attendance is confirmed, not when you sign up, so volunteering can be cancelled
  with nothing to claw back and nobody can farm points from events they skip.
  Events now move through sign-up → attended, and `events.js` gained past events
  so the attendance step is visible in the demo. Renamed `pointsForJoining` to
  `pointsForAttending`. Also changed the demo resident's name to Henrison.
- 2026-08-28 — Built the Sharing Platform (feature 2). A board for borrowing,
  giving away, swapping, renting and repair requests, plus the Expiring Soon
  Shelf: food sorted by how close it is to its date, with recipe suggestions
  appearing on anything that reached its date unclaimed. The "list something"
  form refuses to post food without a photo, and records whether it was a photo
  of the printed date or of the item itself. Moved the points balance out of
  Dashboard.jsx into a shared React context so both screens show one number.
  Points are awarded on completed handover, never on posting — same rule as
  events, for the same anti-farming reason.
- 2026-08-28 — Replaced the self-tapped "Mark as collected" button with handover
  codes, after the team spotted that whoever was being given points was also the
  one tapping the button that gave them out. Whoever is being credited now has to
  type in the other person's four digits, and the option only appears once a
  neighbour has actually asked for the item. Written up honestly in
  `src/lib/handover.js`, including what it still does not stop.
