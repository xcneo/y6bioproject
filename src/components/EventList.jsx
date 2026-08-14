import { EVENTS } from '../data/events'

// Upcoming recycling drives and sustainability events, each with a join button.
// Joining awards points — that is the points system showing up in the UI.

export default function EventList({ joinedIds, onJoin }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-stone-900">Happening near you</h2>

      <ul className="mt-2 space-y-2">
        {EVENTS.map((event) => {
          const joined = joinedIds.includes(event.id)

          return (
            <li
              key={event.id}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-stone-900">{event.title}</h3>
                  <p className="text-sm text-emerald-700">{event.date}</p>
                </div>
                {event.needsVolunteers && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                    Volunteers needed
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-stone-600">{event.location}</p>
              <p className="mt-1 text-sm text-stone-700">{event.blurb}</p>

              <button
                type="button"
                onClick={() => onJoin(event)}
                disabled={joined}
                className={`mt-3 w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                  joined
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-emerald-600 text-white active:bg-emerald-700'
                }`}
              >
                {joined
                  ? "✓ You're going"
                  : `${event.needsVolunteers ? 'Volunteer' : 'Join'} · +${event.pointsForJoining} points`}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
