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
          className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            active.length === 0
              ? 'border-stone-800 bg-stone-800 text-white'
              : 'border-stone-300 bg-white text-stone-600'
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
