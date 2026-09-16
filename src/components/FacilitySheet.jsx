import { useState } from 'react'
import { FACILITY_TYPES, OTHER_PROBLEM } from '../data/facilityTypes'
import { Footprints } from 'lucide-react'

// The card that slides up from the bottom when you tap a map marker.
// It also holds the "report a problem" form, because a report is almost always
// about a specific facility — attaching it here saves the resident from having
// to type out which bin they mean.
//
// The problem list comes from the facility's TYPE, not from one shared list.
// A shared list let you report an EV charger as an overflowing bin, which
// cannot happen and made the form read as decoration. See facilityTypes.js.
//
// "Something else" is appended here rather than stored in each type's list, so
// it cannot be forgotten for a new type or accidentally listed twice. Picking
// it opens a text box and the report cannot be sent until it says something —
// an empty "something else" tells the town council nothing at all.

export default function FacilitySheet({ facility, onClose, onReportSent }) {
  const [reportOpen, setReportOpen] = useState(false)
  const [problem, setProblem] = useState(null)
  const [otherText, setOtherText] = useState('')
  const [sent, setSent] = useState(false)

  if (!facility) return null

  const type = FACILITY_TYPES[facility.type]
  const options = [...type.problems, OTHER_PROBLEM]
  // Default to this type's first option, and never trust a stale selection from
  // a different type — Dashboard keys this component per facility so it should
  // not happen, but a list that shows nothing selected is a confusing failure.
  const chosen = options.includes(problem) ? problem : options[0]
  const needsText = chosen === OTHER_PROBLEM
  const canSend = !needsText || otherText.trim().length > 0

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSend) return
    setSent(true)
    onReportSent()
  }

  function choose(option) {
    setProblem(option)
    if (option !== OTHER_PROBLEM) setOtherText('')
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
            <type.icon className="h-5 w-5 text-white" strokeWidth={2.2} />
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

        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
          <Footprints className="h-4 w-4" aria-hidden="true" />
          About {facility.walkMinutes} min walk
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
                {options.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="radio"
                      name="problem"
                      value={option}
                      checked={chosen === option}
                      onChange={(event) => choose(event.target.value)}
                      className="h-4 w-4"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {needsText && (
                <textarea
                  value={otherText}
                  onChange={(event) => setOtherText(event.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="What did you see?"
                  aria-label="Describe the problem"
                  className="mt-2 w-full rounded-xl border border-stone-300 p-3 text-sm text-stone-900 placeholder:text-stone-400"
                />
              )}
            </fieldset>

            <button
              type="submit"
              disabled={!canSend}
              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white disabled:bg-stone-200 disabled:text-stone-400"
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
