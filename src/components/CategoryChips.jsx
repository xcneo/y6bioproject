import { LISTING_TYPES, BOARD_CATEGORIES } from '../data/listingTypes'

// Row of chips that filter the sharing board.
// Same behaviour as FilterChips on the dashboard: no chips selected means show
// everything, which is friendlier than opening onto an empty board.
//
// This is deliberately a second, separate component rather than making
// FilterChips generic. The two rows filter different data with different
// labels, and one component juggling both would be harder for the team to read
// than two short ones that each do a single obvious thing.

export default function CategoryChips({ active, onToggle, onClear }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex w-max gap-2">
        <button
          type="button"
          onClick={onClear}
          className={`shrink-0 rounded-full border px-3 py-2 text-[13px] font-semibold transition ${
            active.length === 0
              ? 'border-[#2F9C5E] bg-[#2F9C5E] text-white shadow-[0_6px_18px_rgba(47,156,94,0.18)]'
              : 'border-[rgba(20,40,25,0.08)] bg-white text-[#5C6E62]'
          }`}
        >
          All
        </button>

        {BOARD_CATEGORIES.map((key) => {
          const type = LISTING_TYPES[key]
          const isOn = active.includes(key)

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
