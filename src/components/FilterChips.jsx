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
          className={`shrink-0 rounded-full border px-3 py-2 text-[13px] font-semibold transition ${
            activeTypes.length === 0
              ? 'border-[#2F9C5E] bg-[#2F9C5E] text-white shadow-[0_6px_18px_rgba(47,156,94,0.18)]'
              : 'border-[rgba(20,40,25,0.08)] bg-white text-[#5C6E62]'
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
              className="shrink-0 rounded-full border border-[rgba(20,40,25,0.08)] bg-white px-3 py-2 text-[13px] font-semibold text-[#16281D] transition hover:border-[rgba(20,40,25,0.12)]"
              style={
                isOn
                  ? {
                      backgroundColor: type.color,
                      borderColor: type.color,
                      color: '#fff',
                      boxShadow: '0 6px 18px rgba(20,40,25,0.05)',
                    }
                  : undefined
              }
            >
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: type.color }} />
              <span aria-hidden="true" className="mr-1">{type.icon}</span>
              {type.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
