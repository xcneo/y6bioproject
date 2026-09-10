import { useState } from 'react'

// The two halves of a handover, one for each person standing there.
//
// Whoever is about to be credited types the other person's code
// (EnterHandoverCode). Whoever is not being credited just reads their code out
// (ShowHandoverCode). See src/lib/handover.js for why.
//
// In a real app the two halves are on two different phones. Here they are two
// points of view on one device, reached with the demo switcher at the top of
// the screen — so the code really does have to travel from one screen to the
// other.
//
// ⚠️ There used to be a `showHint` prop that printed the expected code in grey
// when the other side was only a name in the mock data. It was removed on
// 10 Sept 2026 because it was a genuine hole, not just a crutch: whoever was
// being paid could read the code off their own screen and confirm a handover
// that never happened, with nobody else involved. Every exchange that pays
// points now needs two real residents and the demo switcher. Do not add it back.

export function EnterHandoverCode({ expected, prompt, reward, note, onConfirm }) {
  const [entered, setEntered] = useState('')
  const [wrong, setWrong] = useState(false)

  function handleConfirm() {
    if (entered === expected) {
      onConfirm()
      return
    }

    setWrong(true)
  }

  return (
    <div className="mt-3 rounded-xl bg-stone-100 p-3">
      <p className="text-xs font-semibold text-stone-800">{prompt}</p>

      <input
        type="text"
        inputMode="numeric"
        maxLength={4}
        value={entered}
        onChange={(event) => {
          // Digits only, so a stray letter cannot make a code look wrong.
          setEntered(event.target.value.replace(/\D/g, ''))
          setWrong(false)
        }}
        placeholder="0000"
        aria-label="Handover code"
        className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-center text-lg font-semibold tracking-[0.4em] text-stone-900 placeholder:tracking-[0.4em] placeholder:text-stone-300"
      />

      <button
        type="button"
        onClick={handleConfirm}
        disabled={entered.length < 4}
        className="mt-2 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white disabled:bg-stone-200 disabled:text-stone-400"
      >
        Confirm handover
      </button>

      {wrong && (
        <p className="mt-2 text-center text-xs font-medium text-red-700">
          That code does not match. Ask them to read it out again.
        </p>
      )}

      <p className="mt-2 text-center text-xs text-stone-500">
        {reward > 0
          ? `You earn ${reward} points when the code matches.`
          : 'Confirms the handover. No points for this one.'}
      </p>

      {/* Why the number is smaller than the listing advertises. A reduced
          figure with no explanation just looks like a bug. */}
      {note && (
        <p className="mt-1 rounded-lg bg-amber-50 px-2 py-1.5 text-center text-[11px] text-amber-900">
          {note}
        </p>
      )}
    </div>
  )
}

// `prompt` lets the repair case say something true — there the poster reads the
// code out to whoever fixed the thing, rather than to whoever they collect from.
export function ShowHandoverCode({ code, owner, prompt }) {
  return (
    <div className="mt-3 rounded-xl bg-stone-100 p-3 text-center">
      <p className="text-xs font-semibold text-stone-800">
        {prompt ?? `Read this out to ${owner} when you collect`}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-[0.4em] text-stone-900">{code}</p>
      <p className="mt-1 text-xs text-stone-500">
        They type it in to confirm. Nobody earns points until they do.
      </p>
    </div>
  )
}
