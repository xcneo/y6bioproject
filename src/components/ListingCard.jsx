import { LISTING_TYPES, pointsForCompleting } from '../data/listingTypes'
import { PEOPLE, walkMinutesFor } from '../data/residents'
import { EnterHandoverCode, ShowHandoverCode } from './HandoverCode'

// One card on the sharing board.
//
// Every card is drawn from the point of view of whoever's phone you are on
// (viewerId). The same listing looks completely different to the person who
// posted it and the person collecting it — that is the whole point of the
// switcher, and it is why ownership is an id comparison rather than a card
// that says "You".
//
// The exchange goes:
//   (nothing)   -> nobody has acted on it
//   'requested' -> somebody asked, and can still cancel
//   'done'      -> it changed hands, confirmed by a handover code
//
// Points land only at the last step, and only for whoever typed in the other
// person's code. Two gates, stopping two different things:
//   - "somebody asked for it" stops points being claimed on a listing nobody
//     ever wanted, which is the cheapest fraud there is
//   - the code stops them being claimed without actually meeting

export default function ListingCard({
  listing,
  claim,
  viewerId,
  effectivePoints,
  taperNote,
  onRequest,
  onCancel,
  onComplete,
}) {
  const type = LISTING_TYPES[listing.category]
  const owner = PEOPLE[listing.ownerId]
  const isOwner = listing.ownerId === viewerId
  // effectivePoints is the listing's points after the repeat-exchange taper in
  // lib/pairing.js. Everything the card quotes uses it, so the number you are
  // promised before tapping is the number you get.
  const reward = pointsForCompleting(listing, isOwner, effectivePoints)
  // A repair is the one listing finished by the person who did NOT post it, so
  // it is the one case where the helper enters the poster's code.
  const isRepair = listing.category === 'repair'

  const done = claim?.step === 'done'
  const claimedByMe = claim?.step === 'requested' && claim.by === viewerId
  const claimedByOther = claim?.step === 'requested' && claim.by !== viewerId

  // Requests seeded in the mock data, plus a live one made during the demo.
  const requestCount = listing.requests + (claimedByOther ? 1 : 0)

  // The code box appears ONLY once a real neighbour on the other phone has
  // claimed it, because the code has to come from someone else's screen. Seeded
  // requests are names in the mock data with no phone to read from, and letting
  // them unlock the box was how you could confirm a handover to yourself.
  const showsCodeBox = isOwner && !done && claimedByOther && reward > 0

  const categoryColor = type.color
  const actionSolid = listing.category !== 'rent'

  const primaryAction = (
    <button
      type="button"
      onClick={() => (isOwner ? onComplete(listing, viewerId) : onRequest(listing))}
      className={`mt-3 w-full rounded-full px-4 py-2.5 text-[13px] font-extrabold transition ${
        actionSolid
          ? 'text-white shadow-[0_6px_18px_rgba(20,40,25,0.08)]'
          : 'border bg-white text-[#16281D]'
      }`}
      style={
        actionSolid
          ? { background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor})` }
          : { borderColor: categoryColor, color: categoryColor }
      }
    >
      {listing.category === 'rent'
        ? 'Request to rent'
        : isOwner
          ? 'Mark as collected'
          : type.action}
    </button>
  )

  return (
    <li className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-[16px]"
            style={{ backgroundColor: categoryColor, color: '#fff' }}
            aria-hidden="true"
          >
            {type.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-[Nunito] text-[20px] font-extrabold text-[#16281D]">
              {listing.title}
            </h3>
            <p className="mt-1 text-[12px] text-[#5C6E62]">
              {isOwner ? 'Posted by you' : owner.name} &middot; {listing.address}
            </p>
          </div>
        </div>

        {listing.category === 'rent' && (
          <span className="shrink-0 rounded-full border border-[#E8A93A] bg-[#FDF5E8] px-2.5 py-1 text-[11px] font-bold text-[#B9821F]">
            ${listing.price}/day
          </span>
        )}
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-[#5C6E62]">{listing.detail}</p>

      {!isOwner && (
        <p className="mt-2 text-[11px] text-[#93A399]">
          About {walkMinutesFor(listing, viewerId)} min walk
        </p>
      )}

      {/* ---- Your own post: wait for interest, then confirm with their code ---- */}
      {isOwner && !done && (
        <>
          <p className="mt-3 text-sm text-stone-600">
            {requestCount > 0
              ? `${requestCount} neighbour${requestCount === 1 ? '' : 's'} asked for this`
              : 'No requests yet'}
            {claimedByOther && ` — ${PEOPLE[claim.by].name} is collecting it`}
          </p>

          {!claimedByOther ? (
            <p className="mt-2 rounded-xl bg-stone-100 px-3 py-2.5 text-center text-xs text-stone-500">
              Nothing to confirm yet — the code comes from whoever collects it.
            </p>
          ) : isRepair ? (
            // A repair pays the HELPER, so the code is yours to read out and
            // theirs to type in. You are not being credited, so showing you your
            // own code gives nothing away.
            <ShowHandoverCode
              code={listing.handoverCode}
              prompt={`Once ${PEOPLE[claim.by].name} has fixed it, read this out to them`}
            />
          ) : reward > 0 ? (
            <EnterHandoverCode
              expected={claim.code}
              prompt="When they collect it, ask them to read out their code."
              reward={reward}
              note={taperNote}
              onConfirm={() => onComplete(listing, viewerId)}
            />
          ) : (
            // Renting pays no points, so there is nothing for a code to protect.
            <button
              type="button"
              onClick={() => onComplete(listing, viewerId)}
              className="mt-2 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white active:bg-emerald-700"
            >
              Mark as collected
            </button>
          )}
        </>
      )}

      {/* ---- Someone else's post ---- */}
      {!isOwner && !claim && primaryAction}

      {!isOwner && claimedByMe && (
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
              prompt={`Once it is fixed, ask ${owner.name} to read out their code.`}
              reward={reward}
              note={taperNote}
              onConfirm={() => onComplete(listing, viewerId)}
            />
          ) : (
            <ShowHandoverCode code={claim.code} owner={owner.name} />
          )}
        </>
      )}

      {/* Someone else got there first — visible on the third person's phone. */}
      {!isOwner && claimedByOther && (
        <p className="mt-3 rounded-xl bg-stone-100 px-3 py-2.5 text-center text-sm text-stone-600">
          {PEOPLE[claim.by].name} has claimed this
        </p>
      )}

      {done && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">
          {isRepair ? '✓ Fixed' : '✓ Handed over'}
          {claim.creditedPoints > 0
            ? claim.creditedTo === viewerId
              ? ` — you earned ${claim.creditedPoints} points`
              : ` — ${PEOPLE[claim.creditedTo].name} earned ${claim.creditedPoints} points`
            : ' — no points this time'}
        </p>
      )}

      {/* Footnote only where nothing above has already stated the reward. */}
      {!claim && !showsCodeBox && (
        <>
          <p className="mt-2 text-center text-[11px] text-[#5C6E62]">
            {rewardNote(listing, isOwner, owner.name, effectivePoints)}
          </p>
          {taperNote && (
            <p className="mt-1 rounded-full bg-[#FDF5E8] px-2 py-1.5 text-center text-[11px] font-medium text-[#B9821F]">
              {taperNote}
            </p>
          )}
        </>
      )}
    </li>
  )
}

function rewardNote(listing, isOwner, ownerName, points) {
  if (listing.category === 'rent') {
    return 'No points — you are already being paid for this'
  }

  if (points === 0) {
    // The taper has run all the way down. Say what still happens, not just what
    // does not — the exchange is the point, the points are the incentive.
    return 'No points left, but the exchange still goes ahead'
  }

  if (listing.category === 'repair') {
    return isOwner
      ? `Whoever fixes this earns ${points} points`
      : `Earn ${points} points once it is fixed`
  }

  return isOwner
    ? `Earn ${points} points once it is collected`
    : `${ownerName} earns ${points} points when you collect it`
}
