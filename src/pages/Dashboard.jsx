import { useState } from 'react'
import { FACILITIES } from '../data/facilities'
import { FACILITY_TYPES } from '../data/facilityTypes'
import { USER } from '../data/user'
import { usePoints } from '../context/PointsContext'
import MapView from '../components/MapView'
import FilterChips from '../components/FilterChips'
import FacilitySheet from '../components/FacilitySheet'
import ScoreCard from '../components/ScoreCard'
import EventList from '../components/EventList'

export default function Dashboard() {
  // Which facility types the chips are filtering by. Empty list means "show all".
  const [activeTypes, setActiveTypes] = useState([])
  // The facility whose detail card is open, or null when nothing is open.
  const [selected, setSelected] = useState(null)
  // Where the resident stands on each event, keyed by event id:
  // 'going' = signed up, 'attended' = turned up and the points were credited.
  // An event missing from here is one they have not signed up for.
  // Seeded so the demo shows all three states at once: one past event already
  // credited (its points are part of the starting balance below), and one past
  // event still waiting to be confirmed.
  const [eventStatus, setEventStatus] = useState({
    'canal-cleanup': 'attended',
    'ewaste-jul': 'going',
  })
  // The points balance is shared with the Share screen, so it lives in a
  // context rather than in this file. See src/context/PointsContext.js.
  const { points, earnPoints } = usePoints()

  const visible =
    activeTypes.length === 0
      ? FACILITIES
      : FACILITIES.filter((facility) => activeTypes.includes(facility.type))

  // Closest first, so the list under the map answers "what is nearest to me?".
  const byDistance = [...visible].sort((a, b) => a.walkMinutes - b.walkMinutes)

  function toggleType(key) {
    setActiveTypes((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    )
  }

  // Signing up costs and earns nothing — the points come later, on attendance.
  function joinEvent(event) {
    setEventStatus((current) => ({ ...current, [event.id]: 'going' }))
  }

  // Cancelling just drops the sign-up. No points to take back, because none
  // were given out at sign-up time.
  function cancelEvent(event) {
    setEventStatus((current) => {
      const next = { ...current }
      delete next[event.id]
      return next
    })
  }

  // This is the only place event points are awarded.
  function confirmAttendance(event) {
    if (eventStatus[event.id] === 'attended') return
    setEventStatus((current) => ({ ...current, [event.id]: 'attended' }))
    earnPoints(event.pointsForAttending)
  }

  return (
    <div className="space-y-5 p-4">
      <header>
        <p className="text-sm text-stone-500">Good morning, {USER.name}</p>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">
          {USER.estate}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            ⭐ {points.toLocaleString()} points
          </span>
          <span className="text-xs text-stone-500">Redeem for vouchers</span>
        </div>
      </header>

      <ScoreCard estate={USER.estate} />

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-900">
          Green facilities near {USER.block}
        </h2>
        <FilterChips
          activeTypes={activeTypes}
          onToggle={toggleType}
          onClear={() => setActiveTypes([])}
        />
        <div className="mt-3">
          <MapView
            facilities={visible}
            homeLabel="You"
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        </div>
        <p className="mt-2 text-xs text-stone-400">
          Illustrated map for the prototype — tap a marker for details.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-900">
          Closest to you ({byDistance.length})
        </h2>
        <ul className="space-y-2">
          {byDistance.slice(0, 5).map((facility) => {
            const type = FACILITY_TYPES[facility.type]

            return (
              <li key={facility.id}>
                <button
                  type="button"
                  onClick={() => setSelected(facility)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-stone-200"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${type.pin}`}
                    aria-hidden="true"
                  >
                    {type.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-stone-900">
                      {facility.name}
                    </span>
                    <span className="block truncate text-sm text-stone-500">
                      {facility.address}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-emerald-700">
                    {facility.walkMinutes} min
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        {byDistance.length === 0 && (
          <p className="rounded-2xl bg-white p-4 text-sm text-stone-500 ring-1 ring-stone-200">
            Nothing matches those filters. Tap “All” to see everything again.
          </p>
        )}
      </section>

      <EventList
        statuses={eventStatus}
        onJoin={joinEvent}
        onCancel={cancelEvent}
        onConfirm={confirmAttendance}
      />

      <FacilitySheet
        facility={selected}
        onClose={() => setSelected(null)}
        onReportSent={() => earnPoints(10)}
      />
    </div>
  )
}
