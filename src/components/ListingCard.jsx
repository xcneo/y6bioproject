import { LISTING_TYPES, pointsForCompleting } from '../data/listingTypes'
import { EnterHandoverCode, ShowHandoverCode } from './HandoverCode'

// One card on the sharing board.
//
// A listing you are involved in moves through the same three steps as an event
// on the dashboard:
//   (nothing)   -> nobody has acted on it
//   'requested' -> you asked for it, or offered to help, and can still cancel
//   'done'      -> the item actually changed hands, and points are credited
//
// Points land only at the last step, for the same reason as events: posting
// something is a promise, not a good deed.
//
// And the last step is not a button you can tap on your own. Whoever is being
// credited has to enter the other person's four-digit handover code, so the
// points can only be claimed for a meeting that really happened. Two gates,
// because they stop different things:
//   - "somebody asked for it" stops points being claimed on a listing nobody
//     ever wanted, which is the cheapest fraud there is
//   - the code stops them being claimed without actually meeting

export default function ListingCard({
  listing,
  status,
  myCode,
  onRequest,
  onCancel,
  onComplete,
}) {
  const type = LISTING_TYPES[listing.category]
  const isOwner = listing.owner === 'You'
  const reward = pointsForCompleting(listing, isOwner)
  // A repair is the one listing finished by the person who did NOT post it, so
  // it is the one case where the helper enters the poster's code.
  const isRepair = listing.category === 'repair'
  // When the code box is on screen it already says what the points are, so the
  // footnote at the bottom would just repeat it.
  const showsCodeBox = isOwner && !status && listing.requests > 0 && reward > 0

  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${type.badge}`}
          >
            <span aria-hidden="true">{type.icon}</span> {type.label}
          </span>
          <h3 className="mt-1.5 font-semibold text-stone-900">{listing.title}</h3>
          <p className="text-sm text-stone-500">
            {isOwner ? 'Posted by you' : listing.owner} &middot; {listing.address}
          </p>
        </div>

        {listing.category === 'rent' && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
            ${listing.price}/day
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-stone-700">{listing.detail}</p>

      {!isOwner && (
        <p className="mt-1 text-xs text-stone-400">🚶 About {listing.walkMinutes} min walk</p>
      )}

      {/* ---- Your own post: wait for interest, then confirm with their code ---- */}
      {isOwner && status !== 'done' && (
        <>
          <p className="mt-3 text-sm text-stone-600">
            {listing.requests > 0
              ? `${listing.requests} neighbour${listing.requests === 1 ? '' : 's'} asked for this`
              : 'No requests yet'}
          </p>

          {listing.requests === 0 ? (
            <p className="mt-2 rounded-xl bg-stone-100 px-3 py-2.5 text-center text-xs text-stone-500">
              Nothing to confirm yet — the code comes from whoever collects it.
            </p>
          ) : reward > 0 ? (
            <EnterHandoverCode
              expected={listing.handoverCode}
              prompt="When they collect it, ask them to read out their code."
              reward={reward}
              onConfirm={() => onComplete(listing)}
            />
          ) : (
            // Renting pays no points, so there is nothing for a code to protect.
            <button
              type="button"
              onClick={() => onComplete(listing)}
              className="mt-2 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
            >
              Mark as collected
            </button>
          )}
        </>
      )}

      {/* ---- Someone else's post ---- */}
      {!isOwner && !status && (
        <button
          type="button"
          onClick={() => onRequest(listing)}
          className="mt-3 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
        >
          {type.action}
        </button>
      )}

      {!isOwner && status === 'requested' && (
        <>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex-1 rounded-xl bg-emerald-50 py-2.5 text-center text-sm font-semibold text-emerald-800">
              {isRepair ? '✓ You offered to help' : '✓ Request sent'}
            </span>
            <button
              type="button"
              onClick={() => onCancel(listing)}
              className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600"
            >
              Cancel
            </button>
          </div>

          {isRepair ? (
            <EnterHandoverCode
              expected={listing.handoverCode}
              prompt={`Once it is fixed, ask ${listing.owner} to read out their code.`}
              reward={reward}
              onConfirm={() => onComplete(listing)}
            />
          ) : (
            <ShowHandoverCode code={myCode} owner={listing.owner} />
          )}
        </>
      )}

      {status === 'done' && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">
          {isRepair ? '✓ Fixed' : '✓ Handed over'}
          {reward > 0 && ` — you earned ${reward} points`}
        </p>
      )}

      {/* Footnote only where nothing above has already stated the reward. */}
      {!status && !showsCodeBox && (
        <p className="mt-2 text-center text-xs text-stone-500">
          {rewardNote(listing, isOwner)}
        </p>
      )}
    </li>
  )
}

function rewardNote(listing, isOwner) {
  if (listing.category === 'rent') {
    return 'No points — you are already being paid for this'
  }

  if (listing.category === 'repair') {
    return isOwner
      ? `Whoever fixes this earns ${listing.points} points`
      : `Earn ${listing.points} points once it is fixed`
  }

  return isOwner
    ? `Earn ${listing.points} points once it is collected`
    : `${listing.owner} earns ${listing.points} points when you collect it`
}
