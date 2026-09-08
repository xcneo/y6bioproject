import { useState } from 'react'
import { estimate } from '../lib/impact'
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

  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
      <h3 className="font-semibold text-stone-900">{habit.title}</h3>
      <p className="mt-0.5 text-sm text-stone-600">{habit.detail}</p>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => change(-1)}
          disabled={amount <= 1}
          aria-label={`Fewer ${habit.unit}`}
          className="h-9 w-9 shrink-0 rounded-full border border-stone-300 text-lg font-semibold text-stone-700 disabled:border-stone-200 disabled:text-stone-300"
        >
          −
        </button>

        <p className="flex-1 text-center text-sm text-stone-700">
          <span className="text-lg font-bold text-stone-900">{amount}</span>{' '}
          {habit.unit}
        </p>

        <button
          type="button"
          onClick={() => change(1)}
          disabled={amount >= habit.max}
          aria-label={`More ${habit.unit}`}
          className="h-9 w-9 shrink-0 rounded-full border border-stone-300 text-lg font-semibold text-stone-700 disabled:border-stone-200 disabled:text-stone-300"
        >
          +
        </button>
      </div>

      <ImpactStats result={result} labels={habit.statLabels} />
    </li>
  )
}
