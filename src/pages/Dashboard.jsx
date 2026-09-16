import { useState } from 'react'
import { FACILITIES } from '../data/facilities'
import { FACILITY_TYPES } from '../data/facilityTypes'
import { useSession } from '../context/SessionContext'
import MapView from '../components/MapView'
import FilterChips from '../components/FilterChips'
import FacilitySheet from '../components/FacilitySheet'
import ScoreCard from '../components/ScoreCard'
import EventList from '../components/EventList'
import { Star } from 'lucide-react'

export default function Dashboard() {
  // Who you are and what you have both come from the session, so this screen
  // and the Share screen always agree. See src/context/SessionContext.js.
  const { resident, points, earnPoints } = useSession()

  // Which facility types the chips are filtering by. Empty list means "show all".
  const [activeTypes, setActiveTypes] = useState([])
  // The facility whose detail card is open, or null when nothing is open.
  const [selected, setSelected] = useState(null)

  // Where each resident stands on each event, keyed by event id:
  // 'going' = signed up, 'attended' = turned up and the points were credited.
  // An event missing from the map is one they have not signed up for.
  //
  // Kept per resident so switching phones does not show you someone else's
  // sign-ups. Henrison's is seeded so the demo shows all three states at once:
  // one past event already credited, and one still waiting to be confirmed.
  const [eventsByResident, setEventsByResident] = useState({
    henrison: { 'canal-cleanup': 'attended', 'ewaste-jul': 'going' },
    mrlim: {},
  })

  const myEvents = eventsByResident[resident.id] ?? {}

  // Applies a change to just the current resident's sign-ups.
  function updateEvents(change) {
    setEventsByResident((current) => ({
      ...current,
      [resident.id]: change(current[resident.id] ?? {}),
    }))
  }

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
    updateEvents((mine) => ({ ...mine, [event.id]: 'going' }))
  }

  // Cancelling just drops the sign-up. No points to take back, because none
  // were given out at sign-up time.
  function cancelEvent(event) {
    updateEvents((mine) => {
      const next = { ...mine }
      delete next[event.id]
      return next
    })
  }

  // This is the only place event points are awarded.
  function confirmAttendance(event) {
    if (myEvents[event.id] === 'attended') return
    updateEvents((mine) => ({ ...mine, [event.id]: 'attended' }))
    earnPoints(event.pointsForAttending)
  }

  return (
    <div className="space-y-5 p-4 pb-24">
      <header className="overflow-hidden rounded-b-[28px] bg-gradient-to-br from-[#2F9C5E] via-[#2F9C5E] to-[#14733F] px-4 pb-5 pt-4 text-white shadow-[0_12px_30px_rgba(20,40,25,0.12)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2.5c4.2 0 7.5 3.1 7.5 7.2 0 5.1-7.5 12.8-7.5 12.8S4.5 14.8 4.5 9.7c0-4.1 3.3-7.2 7.5-7.2Z" />
                <path d="M12 7.5v3.2M9.8 11.4h4.4" />
              </svg>
            </div>
            <div className="font-[Nunito] text-[18px] font-extrabold tracking-[-0.03em]">
              Eco SG
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-sm font-extrabold text-white ring-1 ring-white/30">
            {resident.name.charAt(0)}
          </div>
        </div>

        <p className="text-[12px] font-medium text-emerald-50/90">
          Good morning, {resident.name}
        </p>
        <p className="mt-1 text-[12px] text-emerald-50/80">{resident.block}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <h1 className="font-[Nunito] text-[28px] font-extrabold tracking-[-0.04em] text-white">
            Neighbourhood
          </h1>

          <div className="flex items-center gap-2 rounded-full bg-white/18 px-3 py-2 text-[12px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8A93A] text-[11px] text-[#224F2D] shadow-sm">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
            <span className="text-[15px] font-extrabold">{points.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-50/90">points</span>
          </div>
        </div>
      </header>

      <ScoreCard estate={resident.estate} />

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-900">
          Green facilities near {resident.block}
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
                    <type.icon className="h-[18px] w-[18px] text-white" strokeWidth={2.2} />
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
        statuses={myEvents}
        onJoin={joinEvent}
        onCancel={cancelEvent}
        onConfirm={confirmAttendance}
      />

      {/* key resets the sheet's own state for each facility. Without it the
          sheet stays mounted, so a report sent about one bin still reads
          "report logged" when you tap the next marker, and the problem list
          could keep a selection from a different facility type. */}
      <FacilitySheet
        key={selected?.id}
        facility={selected}
        onClose={() => setSelected(null)}
        onReportSent={() => earnPoints(10)}
      />
    </div>
  )
}
