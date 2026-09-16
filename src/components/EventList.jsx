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
    <li className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-[Nunito] text-[18px] font-extrabold text-[#16281D]">{event.title}</h3>
          <p className="mt-1 text-[13px] font-semibold text-[#14733F]">{event.date}</p>
        </div>
        {event.needsVolunteers && (
          <span className="shrink-0 rounded-full bg-[#F5E9D0] px-2.5 py-1 text-[11px] font-bold text-[#B9821F]">
            Volunteers needed
          </span>
        )}
      </div>

      <p className="mt-1 text-[13px] text-[#5C6E62]">{event.location}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#5C6E62]">{event.blurb}</p>

      {going ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="flex-1 rounded-full bg-[#EAF4EE] py-2.5 text-center text-[13px] font-semibold text-[#14733F]">
            You&rsquo;re going
          </span>
          <button
            type="button"
            onClick={() => onCancel(event)}
            className="rounded-full border border-[rgba(20,40,25,0.08)] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#5C6E62]"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onJoin(event)}
          className="mt-3 w-full rounded-full bg-gradient-to-r from-[#2F9C5E] to-[#14733F] py-3 text-[13px] font-extrabold text-white shadow-[0_6px_18px_rgba(20,40,25,0.08)]"
        >
          {event.needsVolunteers ? 'Volunteer' : 'Join'}
        </button>
      )}

      <p className="mt-2 text-center text-[11px] text-[#5C6E62]">
        {going
          ? `+${event.pointsForAttending} points once you attend`
          : `Earn ${event.pointsForAttending} points by attending`}
      </p>
    </li>
  )
}

function PastCard({ event, status, onConfirm }) {
  return (
    <li className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
      <div className="min-w-0">
        <h3 className="font-[Nunito] text-[18px] font-extrabold text-[#16281D]">{event.title}</h3>
        <p className="mt-1 text-[13px] font-semibold text-[#5C6E62]">{event.date}</p>
      </div>

      {status === 'attended' && (
        <p className="mt-3 rounded-full bg-[#EAF4EE] px-3 py-2 text-center text-[13px] font-semibold text-[#14733F]">
          Attended · {event.pointsForAttending} points earned
        </p>
      )}

      {status === 'going' && (
        <>
          <button
            type="button"
            onClick={() => onConfirm(event)}
            className="mt-3 w-full rounded-full bg-gradient-to-r from-[#2F9C5E] to-[#14733F] py-3 text-[13px] font-extrabold text-white shadow-[0_6px_18px_rgba(20,40,25,0.08)]"
          >
            Confirm you attended · +{event.pointsForAttending} points
          </button>
          <p className="mt-2 text-center text-[11px] text-[#5C6E62]">
            The organiser checks this against their sign-in sheet.
          </p>
        </>
      )}

      {!status && (
        <p className="mt-3 text-center text-[13px] text-[#93A399]">
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
