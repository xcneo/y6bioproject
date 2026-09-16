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

  const metricBadges = [
    { key: 'water', label: 'Water', icon: '💧', value: result.water },
    { key: 'money', label: 'Money', icon: '💵', value: result.money },
    { key: 'waste', label: 'Waste', icon: '🗑️', value: result.waste },
  ]

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
        <p className="mt-1 font-[Nunito] text-[30px] font-extrabold tracking-[-0.04em] text-[#14733F]">
          {result.co2 > 0 ? result.co2.toFixed(0) : '0'} kg CO₂e
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {metricBadges.map((metric) => (
          <div key={metric.key} className="flex items-center gap-1.5 rounded-full bg-[#F2F7F0] px-2.5 py-1.5 text-[11px] font-semibold text-[#5C6E62]">
            <span aria-hidden="true">{metric.icon}</span>
            <span>{metric.label}</span>
            <span className="text-[#16281D]">{metric.value}</span>
          </div>
        ))}
      </div>
    </li>
  )
}
