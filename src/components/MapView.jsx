import { FACILITY_TYPES } from '../data/facilityTypes'

// A hand-drawn, stylised map of Clementi — NOT a real map.
// It is an SVG picture (green patches, roads, the canal) with markers placed
// on top at percentage positions. This is deliberate: real maps like Google Maps
// or Mapbox need an API key and an internet connection, which the prototype
// is not allowed to use.

function MapBackdrop() {
  return (
    <svg
      viewBox="0 0 100 125"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Parks and green patches */}
      <rect x="68" y="62" width="30" height="30" rx="6" fill="#bbf7d0" />
      <rect x="4" y="4" width="22" height="18" rx="5" fill="#bbf7d0" />
      <circle cx="86" cy="14" r="9" fill="#bbf7d0" />

      {/* Sungei Ulu Pandan, the canal along the south west */}
      <path
        d="M -5 70 Q 25 78 45 95 T 105 118"
        stroke="#a5d8f3"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Main roads */}
      <path d="M 0 58 L 100 48" stroke="#e2e2e0" strokeWidth="7" fill="none" />
      <path d="M 46 0 L 54 125" stroke="#e2e2e0" strokeWidth="6" fill="none" />
      <path d="M 0 30 L 100 24" stroke="#eeeeec" strokeWidth="4" fill="none" />
      <path d="M 18 0 L 12 125" stroke="#eeeeec" strokeWidth="4" fill="none" />

      {/* MRT viaduct, drawn as a dashed line */}
      <path
        d="M 0 64 L 100 54"
        stroke="#c4b5a0"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* A few HDB blocks as small rectangles, just for texture */}
      <rect x="24" y="30" width="9" height="4" rx="1" fill="#e7e5e4" />
      <rect x="35" y="22" width="9" height="4" rx="1" fill="#e7e5e4" />
      <rect x="30" y="6" width="4" height="9" rx="1" fill="#e7e5e4" />
      <rect x="41" y="11" width="4" height="9" rx="1" fill="#e7e5e4" />
      <rect x="17" y="48" width="9" height="4" rx="1" fill="#e7e5e4" />
      <rect x="21" y="84" width="9" height="4" rx="1" fill="#e7e5e4" />
    </svg>
  )
}

export default function MapView({ facilities, homeLabel, selectedId, onSelect }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200 bg-emerald-50">
      <MapBackdrop />

      {/* Where the resident lives, so the map has a "you are here" anchor */}
      {/* z-20 keeps the "You" label on top — nearby markers used to cover it */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: '31%', top: '40%' }}
      >
        <div className="h-4 w-4 rounded-full border-[3px] border-white bg-stone-800 shadow" />
        <span className="mt-1 block whitespace-nowrap rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-stone-700 shadow-sm">
          {homeLabel}
        </span>
      </div>

      {facilities.map((facility) => {
        const type = FACILITY_TYPES[facility.type]
        const isSelected = facility.id === selectedId

        return (
          <button
            key={facility.id}
            type="button"
            onClick={() => onSelect(facility)}
            style={{ left: `${facility.x}%`, top: `${facility.y}%` }}
            className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-base shadow-md transition ${type.pin} ${
              isSelected
                ? 'z-10 scale-125 ring-4 ring-white'
                : 'ring-2 ring-white active:scale-110'
            }`}
            aria-label={`${type.label}: ${facility.name} at ${facility.address}`}
          >
            <span aria-hidden="true">{type.icon}</span>
          </button>
        )
      })}

      {facilities.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-stone-500">
          No facilities match the filters you picked.
        </p>
      )}
    </div>
  )
}
