import { EVENTS } from '../data/events'

// Recycling drives and sustainability events.
//
// An event you are involved in moves through three steps:
//   (nothing)  -> you have not signed up
//   'going'    -> you signed up, and can still cancel
//   'attended' -> your attendance was recorded, and the points are now yours
//
// Points are only added at the last step. Signing up promises nothing, so
// cancelling never has to take points away — which also means nobody can farm
// points by joining events they never turn up to.

function UpcomingCard({ event, status, onJoin, onCancel }) {
  const going = status === 'going'

  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
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

      {going ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="flex-1 rounded-xl bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-800">
            ✓ You&rsquo;re going
          </span>
          <button
            type="button"
            onClick={() => onCancel(event)}
            className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onJoin(event)}
          className="mt-3 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
        >
          {event.needsVolunteers ? 'Volunteer' : 'Join'}
        </button>
      )}

      <p className="mt-2 text-center text-xs text-stone-500">
        {going
          ? `+${event.pointsForAttending} points once you attend`
          : `Earn ${event.pointsForAttending} points by attending`}
      </p>
    </li>
  )
}

function PastCard({ event, status, onConfirm }) {
  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
      <div className="min-w-0">
        <h3 className="font-semibold text-stone-900">{event.title}</h3>
        <p className="text-sm text-stone-500">{event.date}</p>
      </div>

      {status === 'attended' && (
        <p className="mt-3 rounded-xl bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-800">
          ✓ Attended · {event.pointsForAttending} points earned
        </p>
      )}

      {status === 'going' && (
        <>
          <button
            type="button"
            onClick={() => onConfirm(event)}
            className="mt-3 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
          >
            Confirm you attended · +{event.pointsForAttending} points
          </button>
          <p className="mt-2 text-center text-xs text-stone-500">
            The organiser checks this against their sign-in sheet.
          </p>
        </>
      )}

      {!status && (
        <p className="mt-3 text-center text-sm text-stone-400">
          You didn&rsquo;t sign up for this one
        </p>
      )}
    </li>
  )
}

export default function EventList({ statuses, onJoin, onCancel, onConfirm }) {
  const upcoming = EVENTS.filter((event) => !event.hasHappened)
  const past = EVENTS.filter((event) => event.hasHappened)

  return (
    <div className="space-y-5">
      <section>
        <h2 className="text-sm font-semibold text-stone-900">Happening near you</h2>
        <ul className="mt-2 space-y-2">
          {upcoming.map((event) => (
            <UpcomingCard
              key={event.id}
              event={event}
              status={statuses[event.id]}
              onJoin={onJoin}
              onCancel={onCancel}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-stone-900">Past events</h2>
        <ul className="mt-2 space-y-2">
          {past.map((event) => (
            <PastCard
              key={event.id}
              event={event}
              status={statuses[event.id]}
              onConfirm={onConfirm}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}
