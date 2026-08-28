import { useState } from 'react'
import { LISTING_TYPES, POSTABLE_CATEGORIES } from '../data/listingTypes'
import { USER } from '../data/user'
import { makeHandoverCode } from '../lib/handover'

// The "post something" form, sliding up from the bottom like FacilitySheet.
//
// The important bit is the food branch. The team's anti-misuse rule is that food
// cannot be listed without a photo — ideally of the printed best-before date, or
// failing that of the food itself so neighbours can judge for themselves. The
// form enforces it: with no photo the submit button stays disabled and says why.
//
// Nothing is really uploaded. There is no server in this prototype, so the
// camera button just flips a flag and the screen says so plainly rather than
// pretending a file went somewhere.

// Instead of a date picker — fiddly on a phone and overkill here — the poster
// picks roughly how long the food has. daysLeft is what the shelf sorts by,
// text is what the card prints after the words "Best before".
const EXPIRY_OPTIONS = [
  { label: 'Today', daysLeft: 0, text: 'today' },
  { label: 'Tomorrow', daysLeft: 1, text: 'tomorrow' },
  { label: 'In 2 days', daysLeft: 2, text: 'in 2 days' },
  { label: 'In 3 days', daysLeft: 3, text: 'in 3 days' },
  { label: 'Later this week', daysLeft: 5, text: 'later this week' },
]

export default function NewListingSheet({ onCreate, onClose }) {
  const [category, setCategory] = useState('giveaway')
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [price, setPrice] = useState('5')
  const [quantity, setQuantity] = useState('')
  const [expiry, setExpiry] = useState(EXPIRY_OPTIONS[1])
  const [photoKind, setPhotoKind] = useState('expiry')
  const [photoAdded, setPhotoAdded] = useState(false)

  const isFood = category === 'food'
  // Food is the only category that cannot be posted without a photo.
  const canSubmit = title.trim().length > 0 && (!isFood || photoAdded)

  function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    // Date.now() is only being used to make the key unique within one demo run.
    const id = `new-${Date.now()}`

    if (isFood) {
      onCreate('food', {
        id,
        title: title.trim(),
        detail: detail.trim() || 'No extra details given.',
        quantity: quantity.trim() || 'Not stated',
        owner: 'You',
        address: USER.block,
        walkMinutes: 0,
        bestBefore: expiry.text,
        daysLeft: expiry.daysLeft,
        photo: photoKind,
        // A real app would work these out from the title so the recipe
        // suggestions still fire. Left empty here — see recipes.js.
        tags: [],
        points: LISTING_TYPES.food.defaultPoints,
        requests: 0,
        handoverCode: makeHandoverCode(),
      })
    } else {
      onCreate('board', {
        id,
        category,
        title: title.trim(),
        detail: detail.trim() || 'No extra details given.',
        owner: 'You',
        address: USER.block,
        walkMinutes: 0,
        points: LISTING_TYPES[category].defaultPoints,
        requests: 0,
        handoverCode: makeHandoverCode(),
        ...(category === 'rent' ? { price: Number(price) || 0 } : {}),
      })
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30"
        aria-label="Close"
      />

      <div className="relative mx-auto max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300" />
        <h2 className="text-lg font-semibold text-stone-900">List something</h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-stone-900">
              What are you offering?
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {POSTABLE_CATEGORIES.map((key) => {
                const type = LISTING_TYPES[key]
                const isOn = category === key

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    aria-pressed={isOn}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      isOn ? type.chipOn : 'border-stone-300 bg-white text-stone-600'
                    }`}
                  >
                    <span aria-hidden="true">{type.icon}</span> {type.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="mt-4 block text-sm font-semibold text-stone-900">
            {category === 'repair' ? 'What needs fixing?' : 'What is it?'}
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={isFood ? 'e.g. Half a packet of tofu' : 'e.g. Standing fan'}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-normal text-stone-900 placeholder:text-stone-400"
            />
          </label>

          <label className="mt-3 block text-sm font-semibold text-stone-900">
            Details
            <textarea
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              rows={3}
              placeholder="Condition, when neighbours can collect, anything they should know."
              className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-normal text-stone-900 placeholder:text-stone-400"
            />
          </label>

          {category === 'rent' && (
            <label className="mt-3 block text-sm font-semibold text-stone-900">
              Price per day (SGD)
              <input
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="mt-1 w-28 rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-normal text-stone-900"
              />
              <span className="mt-1 block text-xs font-normal text-stone-500">
                Renting things out earns no points — you are already being paid.
              </span>
            </label>
          )}

          {isFood && (
            <>
              <label className="mt-3 block text-sm font-semibold text-stone-900">
                How much is there?
                <input
                  type="text"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  placeholder="e.g. About 300g"
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5 text-sm font-normal text-stone-900 placeholder:text-stone-400"
                />
              </label>

              <fieldset className="mt-3">
                <legend className="text-sm font-semibold text-stone-900">Best before</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {EXPIRY_OPTIONS.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setExpiry(option)}
                      aria-pressed={expiry.label === option.label}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                        expiry.label === option.label
                          ? 'border-stone-800 bg-stone-800 text-white'
                          : 'border-stone-300 bg-white text-stone-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-4 rounded-2xl bg-orange-50 p-4">
                <legend className="px-1 text-sm font-semibold text-orange-900">
                  Photo required
                </legend>
                <p className="text-xs text-orange-900">
                  Neighbours are being asked to eat this. Show them what they are taking.
                </p>

                <div className="mt-3 space-y-2">
                  <label className="flex items-start gap-2 text-sm text-stone-700">
                    <input
                      type="radio"
                      name="photoKind"
                      value="expiry"
                      checked={photoKind === 'expiry'}
                      onChange={(event) => setPhotoKind(event.target.value)}
                      className="mt-0.5 h-4 w-4"
                    />
                    <span>
                      Photo of the printed best-before date
                      <span className="block text-xs text-stone-500">Preferred</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-sm text-stone-700">
                    <input
                      type="radio"
                      name="photoKind"
                      value="item"
                      checked={photoKind === 'item'}
                      onChange={(event) => setPhotoKind(event.target.value)}
                      className="mt-0.5 h-4 w-4"
                    />
                    <span>
                      No printed date — photo of the food itself
                      <span className="block text-xs text-stone-500">
                        Neighbours judge freshness themselves
                      </span>
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setPhotoAdded(true)}
                  className={`mt-3 w-full rounded-xl py-2.5 text-sm font-semibold ${
                    photoAdded
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'border border-orange-300 bg-white text-orange-900'
                  }`}
                >
                  {photoAdded ? '✓ Photo added' : '📷 Take photo'}
                </button>
                <p className="mt-1 text-center text-[11px] text-stone-500">
                  Demo only — no camera opens and no photo is stored.
                </p>
              </fieldset>
            </>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white disabled:bg-stone-200 disabled:text-stone-400"
          >
            Post it
          </button>

          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-stone-500">
              {title.trim().length === 0
                ? 'Give it a name first.'
                : 'Food needs a photo before it can be listed.'}
            </p>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full py-2 text-sm font-medium text-stone-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
