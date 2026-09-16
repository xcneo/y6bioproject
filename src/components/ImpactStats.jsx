import {
  formatCo2,
  formatMoney,
  formatWaste,
  formatWater,
  isUnsourced,
} from '../lib/impact'
import { Cloud, Droplet, PiggyBank, Trash2 } from 'lucide-react'

// The four numbers a habit change is worth, as a row of small badges.
//
// No chart here on purpose. Four unrelated scalars with different units are not
// a comparison — plotting them side by side would invite the reader to compare
// "173" against "265" as if they meant the same kind of thing. A badge per
// measure, each labelled with its own unit, says what is actually known.
//
// Three states per badge, and the difference between the last two matters:
//   a number      we can work it out
//   "No change"   we can work it out, and the answer is nothing
//   "Source needed"  nobody has sourced the factor, so we do not know
//
// A blank badge would collapse the last two into each other and quietly imply
// zero. See the header of data/factors.js.

const MEASURES = [
  { key: 'co2', icon: Cloud, label: 'CO₂e', format: formatCo2 },
  { key: 'water', icon: Droplet, label: 'Water', format: formatWater },
  { key: 'money', icon: PiggyBank, label: 'Money', format: formatMoney },
  { key: 'waste', icon: Trash2, label: 'Waste', format: formatWaste },
]

// `labels` lets one card rename a tile. Only the drill card uses it, and only
// for water: its figure is a withdrawal rather than the consumptive footprint
// the food cards show, so calling both of them "Water" would quietly claim the
// two numbers are comparable. They are not. See factors.js, ITEM_WATER_L.
// `skip` leaves measures out — HabitCard shows CO₂ as its own headline, so it
// passes ['co2'] to avoid printing it twice.
export default function ImpactStats({ result, labels = {}, skip = [] }) {
  return (
    <dl className="mt-3 flex flex-wrap gap-2">
      {MEASURES.filter((measure) => !skip.includes(measure.key)).map((measure) => {
        const raw = result[measure.key]
        const missing = isUnsourced(raw)
        const value = missing ? null : measure.format(raw)

        return (
          <div
            key={measure.key}
            className="flex items-center gap-1.5 rounded-full bg-[#F2F7F0] px-2.5 py-1.5 text-[11px] font-semibold text-[#5C6E62]"
          >
            <measure.icon className="h-3.5 w-3.5 text-[#2F9C5E]" aria-hidden="true" />
            <span>{labels[measure.key] ?? measure.label}</span>
            <span className="text-[#16281D]">
              {missing ? 'Source needed' : raw === 0 ? 'No change' : value}
            </span>
          </div>
        )
      })}
    </dl>
  )
}
