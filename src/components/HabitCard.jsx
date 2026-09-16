import { useState } from 'react'
import { estimate, formatCo2, isUnsourced } from '../lib/impact'
import ImpactStats from './ImpactStats'

// One "what if I…" habit, with a stepper for how often and the four numbers it
// would be worth over a year.
//
// A stepper rather than a slider: on a 390px phone a slider is fiddly and lands
// on values nobody meant, and the interesting range here is 1–14, not 0–100.
// Tapping + three times is both easier and exact.

export default function HabitCard({ habit }) {
  const [amount, setAmount] = useState(habit.defaultAmount)
  const result = estimate(habit, amount)

  function change(by) {
    setAmount((current) => Math.min(habit.max, Math.max(1, current + by)))
  }

  // CO₂ is the headline; the other three sit underneath as badges. All four go
  // through the formatters in lib/impact.js, which round on purpose — printing
  // the raw arithmetic showed things like "15436.800000000003" with no unit.
  const co2Missing = isUnsourced(result.co2)

  return (
    <li className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-[Nunito] text-[18px] font-extrabold text-[#16281D]">{habit.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#5C6E62]">{habit.detail}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#F2F7F0] p-1.5">
        <button
          type="button"
          onClick={() => change(-1)}
          disabled={amount <= 1}
          aria-label={`Fewer ${habit.unit}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[22px] font-semibold text-[#16281D] disabled:text-[#93A399]"
        >
          −
        </button>

        <p className="min-w-20 text-center text-[13px] font-semibold text-[#16281D]">
          <span className="text-[18px] font-extrabold">{amount}</span> {habit.unit}
        </p>

        <button
          type="button"
          onClick={() => change(1)}
          disabled={amount >= habit.max}
          aria-label={`More ${habit.unit}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[22px] font-semibold text-[#16281D] disabled:text-[#93A399]"
        >
          +
        </button>
      </div>

      <div className="mt-4">
        <p className="text-[12px] font-semibold text-[#5C6E62]">This change could save</p>
        {co2Missing ? (
          // Never show a missing factor as zero — see the header of data/factors.js.
          <p className="mt-2 inline-block rounded-md bg-amber-100 px-2 py-1 text-[13px] font-semibold text-amber-900">
            CO₂e: source needed
          </p>
        ) : (
          <p className="mt-1 font-[Nunito] text-[30px] font-extrabold tracking-[-0.04em] text-[#14733F]">
            {result.co2 === 0 ? 'No change' : `${formatCo2(result.co2)} CO₂e`}
            <span className="ml-1.5 font-sans text-[13px] font-semibold tracking-normal text-[#5C6E62]">
              a year
            </span>
          </p>
        )}
      </div>

      <ImpactStats result={result} labels={habit.statLabels} skip={['co2']} />
    </li>
  )
}
