import { FACILITY_TYPES, TYPE_KEYS } from '../data/facilityTypes'

// Row of tappable chips that filter the map.
// No chips selected = show everything. That is friendlier than showing an
// empty map when the screen first opens.

export default function FilterChips({ activeTypes, onToggle, onClear }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex w-max gap-2">
        <button
          type="button"
          onClick={onClear}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            activeTypes.length === 0
              ? 'border-stone-800 bg-stone-800 text-white'
              : 'border-stone-300 bg-white text-stone-600'
          }`}
        >
          All
        </button>

        {TYPE_KEYS.map((key) => {
          const type = FACILITY_TYPES[key]
          const isOn = activeTypes.includes(key)

          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={isOn}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                isOn ? type.chipOn : 'border-stone-300 bg-white text-stone-600'
              }`}
            >
              <span aria-hidden="true">{type.icon}</span> {type.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
