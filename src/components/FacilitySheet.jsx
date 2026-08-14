import { useState } from 'react'
import { FACILITY_TYPES } from '../data/facilityTypes'

// The card that slides up from the bottom when you tap a map marker.
// It also holds the "report a problem" form, because a report is almost always
// about a specific facility — attaching it here saves the resident from having
// to type out which bin they mean.

const PROBLEMS = [
  'Bin is overflowing',
  'Facility is broken',
  'Blocked or cannot access',
  'Something else',
]

export default function FacilitySheet({ facility, onClose, onReportSent }) {
  const [reportOpen, setReportOpen] = useState(false)
  const [problem, setProblem] = useState(PROBLEMS[0])
  const [sent, setSent] = useState(false)

  if (!facility) return null

  const type = FACILITY_TYPES[facility.type]

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
    onReportSent()
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-end">
      {/* Tapping the dimmed area behind the card closes it */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30"
        aria-label="Close"
      />

      {/* mx-auto + max-w-md keeps the card inside the phone-shaped column.
          Without it the card is fixed to the window and stretches the full
          width of a laptop screen. */}
      <div className="relative mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300" />

        <div className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${type.pin}`}
            aria-hidden="true"
          >
            {type.icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              {type.label}
            </p>
            <h2 className="text-lg font-semibold text-stone-900">
              {facility.name}
            </h2>
            <p className="text-sm text-stone-600">{facility.address}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-stone-700">{facility.detail}</p>

        <p className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
          🚶 About {facility.walkMinutes} min walk
        </p>

        {!reportOpen && !sent && (
          <button
            type="button"
            onClick={() => setReportOpen(true)}
            className="mt-5 w-full rounded-xl border border-stone-300 py-3 text-sm font-medium text-stone-700"
          >
            Report a problem here
          </button>
        )}

        {reportOpen && !sent && (
          <form onSubmit={handleSubmit} className="mt-5 border-t border-stone-200 pt-4">
            <fieldset>
              <legend className="text-sm font-semibold text-stone-900">
                What is wrong?
              </legend>
              <div className="mt-2 space-y-2">
                {PROBLEMS.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="radio"
                      name="problem"
                      value={option}
                      checked={problem === option}
                      onChange={(event) => setProblem(event.target.value)}
                      className="h-4 w-4"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white"
            >
              Send report
            </button>
            <p className="mt-2 text-center text-xs text-stone-500">
              Demo only — nothing is actually sent anywhere.
            </p>
          </form>
        )}

        {sent && (
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Thanks, report logged.</p>
            <p className="mt-1">
              Town council usually responds within 3 working days. You earned 10 points.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 text-sm font-medium text-stone-500"
        >
          Close
        </button>
      </div>
    </div>
  )
}
