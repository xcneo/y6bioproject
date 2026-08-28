import { recipesFor } from '../data/recipes'
import { EnterHandoverCode, ShowHandoverCode } from './HandoverCode'

// One item on the Expiring Soon Shelf.
//
// Two things make this different from an ordinary listing:
//
// 1. Every item shows what kind of photo the poster provided. The team's rule is
//    that you cannot list food invisibly — either a photo of the printed
//    best-before date, or, when there is no printed date, a photo of the food so
//    neighbours can judge freshness themselves. Showing which one was given is
//    the point: it tells you how much to trust the listing.
//
// 2. When an item reaches its date with nobody claiming it, the card stops
//    advertising it and switches to recipes instead. Giving it away has failed,
//    so the app's job changes from finding a taker to stopping it being binned.

function freshness(daysLeft) {
  if (daysLeft < 0) return { text: 'Past its date', style: 'bg-stone-200 text-stone-700' }
  if (daysLeft === 0) return { text: 'Last day', style: 'bg-red-100 text-red-800' }
  if (daysLeft === 1) return { text: '1 day left', style: 'bg-orange-100 text-orange-900' }
  return { text: `${daysLeft} days left`, style: 'bg-amber-100 text-amber-900' }
}

const PHOTO_NOTE = {
  expiry: '📷 Photo of the printed best-before date',
  item: '📷 Photo of the item — judge freshness yourself',
}

export default function ShelfCard({ item, status, myCode, onClaim, onCancel, onCollected }) {
  const isOwner = item.owner === 'You'
  const expired = item.daysLeft < 0
  const tag = freshness(item.daysLeft)
  const recipes = expired && status !== 'done' ? recipesFor(item.tags) : []

  return (
    <li className="w-64 shrink-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-tight text-stone-900">{item.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tag.style}`}
        >
          {tag.text}
        </span>
      </div>

      <p className="mt-1 text-sm text-stone-500">
        {isOwner ? 'Posted by you' : item.owner} &middot; {item.quantity}
      </p>
      <p className="mt-2 text-sm text-stone-700">{item.detail}</p>

      <p className="mt-2 text-xs text-stone-500">Best before {item.bestBefore}</p>
      <p className="mt-1 text-xs text-stone-400">{PHOTO_NOTE[item.photo]}</p>

      {/* ---- Nobody claimed it in time: use it up instead ---- */}
      {recipes.length > 0 && (
        <div className="mt-3 rounded-xl bg-orange-50 p-3">
          <p className="text-xs font-semibold text-orange-900">
            Nobody claimed this. Do not bin it — these use it up:
          </p>
          <ul className="mt-2 space-y-2">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <p className="text-sm font-medium text-stone-900">
                  {recipe.name}{' '}
                  <span className="font-normal text-stone-500">· {recipe.minutes} min</span>
                </p>
                <p className="text-xs text-stone-600">{recipe.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---- Your own food: the neighbour who takes it reads you their code ---- */}
      {isOwner && status !== 'done' && !expired && (
        item.requests > 0 ? (
          <EnterHandoverCode
            expected={item.handoverCode}
            prompt="When they take it, ask them to read out their code."
            reward={item.points}
            onConfirm={() => onCollected(item)}
          />
        ) : (
          <p className="mt-3 rounded-xl bg-stone-100 px-3 py-2.5 text-center text-xs text-stone-500">
            Nobody has claimed this yet.
          </p>
        )
      )}

      {/* ---- A neighbour's food ---- */}
      {!isOwner && !status && !expired && (
        <button
          type="button"
          onClick={() => onClaim(item)}
          className="mt-3 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
        >
          Claim it
        </button>
      )}

      {!isOwner && status === 'requested' && (
        <>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex-1 rounded-xl bg-emerald-50 py-2 text-center text-sm font-semibold text-emerald-800">
              ✓ Claimed
            </span>
            <button
              type="button"
              onClick={() => onCancel(item)}
              className="rounded-xl border border-stone-300 px-3 py-2 text-sm font-medium text-stone-600"
            >
              Cancel
            </button>
          </div>
          <ShowHandoverCode code={myCode} owner={item.owner} />
        </>
      )}

      {status === 'done' && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
          ✓ Collected{isOwner && ` — you earned ${item.points} points`}
        </p>
      )}

      {/* Skipped when the code box is up, which already states the points. */}
      {status !== 'done' && !expired && !(isOwner && item.requests > 0) && (
        <p className="mt-2 text-center text-xs text-stone-500">
          {isOwner
            ? `Earn ${item.points} points once it is collected`
            : `Collect it from ${item.address}`}
        </p>
      )}
    </li>
  )
}
