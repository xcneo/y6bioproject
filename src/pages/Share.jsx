import { useState } from 'react'
import { pointsForCompleting } from '../data/listingTypes'
import { PEOPLE } from '../data/residents'
import { pairKey, taperedPoints, taperNote } from '../lib/pairing'
import { useSession } from '../context/SessionContext'
import { useSharing } from '../context/SharingContext'
import CategoryChips from '../components/CategoryChips'
import ListingCard from '../components/ListingCard'
import ShelfCard from '../components/ShelfCard'
import NewListingSheet from '../components/NewListingSheet'

export default function Share() {
  const { resident, points, earnPoints } = useSession()
  const {
    listings,
    foodItems,
    claims,
    pairCounts,
    claimItem,
    cancelClaim,
    settleClaim,
    addListing,
  } = useSharing()

  // Screen-only state. Anything that has to survive switching phones or tabs
  // lives in the providers instead.
  const [activeCategories, setActiveCategories] = useState([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [notice, setNotice] = useState(null)

  const visible =
    activeCategories.length === 0
      ? listings
      : listings.filter((listing) => activeCategories.includes(listing.category))

  // Closest to going off first, so the things that need someone today are the
  // things you see first.
  const shelf = [...foodItems].sort((a, b) => a.daysLeft - b.daysLeft)

  // Everything the current phone needs to know about one exchange: who the
  // other person is, how many times this pair has already traded, and what the
  // points are worth after the taper in lib/pairing.js.
  //
  // The partner is only known when the app can name both sides. When a listing
  // is collected by one of the mock-data neighbours there is nobody to count
  // against, so no taper applies — a real app always knows both parties.
  function exchangeFor(item) {
    const isOwner = item.ownerId === resident.id
    const partner = isOwner ? (claims[item.id]?.by ?? null) : item.ownerId
    const prior = partner ? (pairCounts[pairKey(resident.id, partner)] ?? 0) : 0

    return {
      isOwner,
      partner,
      effectivePoints: partner ? taperedPoints(item.points, prior) : item.points,
      note: partner ? taperNote(prior, PEOPLE[partner].name) : null,
    }
  }

  function request(item) {
    claimItem(item.id, resident.id)
  }

  function cancel(item) {
    cancelClaim(item.id)
  }

  // The only place board points are awarded. confirmedBy is whoever typed the
  // handover code in, which is also whoever gets paid.
  function completeListing(listing, confirmedBy) {
    if (claims[listing.id]?.step === 'done') return

    const { isOwner, partner, effectivePoints } = exchangeFor(listing)
    const reward = pointsForCompleting(listing, isOwner, effectivePoints)

    settleClaim(listing.id, confirmedBy, reward, partner)
    earnPoints(reward, confirmedBy)
  }

  // Food is always confirmed by the person who posted it, so the points always
  // go to them.
  function collectFood(item, confirmedBy) {
    if (claims[item.id]?.step === 'done') return

    const { partner, effectivePoints } = exchangeFor(item)

    settleClaim(item.id, confirmedBy, effectivePoints, partner)
    earnPoints(effectivePoints, confirmedBy)
  }

  function createListing(kind, item) {
    addListing(kind, item)
    setNotice(
      item.points > 0
        ? `“${item.title}” is posted. ${item.points} points once someone collects it and reads you their code.`
        : `“${item.title}” is posted.`,
    )
    setSheetOpen(false)
  }

  return (
    <div className="space-y-5 p-4 pb-24">
      <header className="overflow-hidden rounded-b-[28px] bg-gradient-to-br from-[#2F9C5E] via-[#2F9C5E] to-[#14733F] px-4 pb-5 pt-4 text-white shadow-[0_12px_30px_rgba(20,40,25,0.12)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2.5c4.2 0 7.5 3.1 7.5 7.2 0 5.1-7.5 12.8-7.5 12.8S4.5 14.8 4.5 9.7c0-4.1 3.3-7.2 7.5-7.2Z" />
                <path d="M12 7.5v3.2M9.8 11.4h4.4" />
              </svg>
            </div>
            <div className="font-[Nunito] text-[18px] font-extrabold tracking-[-0.03em]">
              Eco SG
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-sm font-extrabold text-white ring-1 ring-white/30">
            {resident.name.charAt(0)}
          </div>
        </div>

        <p className="text-[12px] font-medium text-emerald-50/90">{resident.block}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <h1 className="font-[Nunito] text-[28px] font-extrabold tracking-[-0.04em] text-white">
            Share
          </h1>

          <div className="flex items-center gap-2 rounded-full bg-white/18 px-3 py-2 text-[12px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8A93A] text-[11px] text-[#224F2D] shadow-sm">
              ★
            </span>
            <span className="text-[15px] font-extrabold">{points.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-50/90">points</span>
          </div>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="w-full rounded-full bg-gradient-to-r from-[#2F9C5E] to-[#14733F] py-3 text-[14px] font-extrabold text-white shadow-[0_8px_22px_rgba(47,156,94,0.2)]"
      >
        + List something
      </button>

      {notice && (
        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-900">
          <p className="flex-1">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="shrink-0 px-1 font-semibold text-emerald-700"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      <section>
        <h2 className="text-sm font-semibold text-stone-900">Expiring Soon Shelf</h2>
        <p className="mb-2 text-xs text-stone-500">
          Food neighbours want to pass on before it goes off. Swipe across.
        </p>
        {/* -mx-4 + px-4 lets the row scroll edge to edge while the cards still
            line up with the rest of the page. */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <ul className="flex w-max items-start gap-3">
            {shelf.map((item) => {
              const exchange = exchangeFor(item)

              return (
                <ShelfCard
                  key={item.id}
                  item={item}
                  claim={claims[item.id]}
                  viewerId={resident.id}
                  effectivePoints={exchange.effectivePoints}
                  taperNote={exchange.note}
                  onClaim={request}
                  onCancel={cancel}
                  onCollected={collectFood}
                />
              )
            })}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-900">
          Borrow, swap and give away
        </h2>
        <CategoryChips
          active={activeCategories}
          onToggle={(key) =>
            setActiveCategories((current) =>
              current.includes(key)
                ? current.filter((item) => item !== key)
                : [...current, key],
            )
          }
          onClear={() => setActiveCategories([])}
        />

        <ul className="mt-3 space-y-3">
          {visible.map((listing) => {
            const exchange = exchangeFor(listing)

            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                claim={claims[listing.id]}
                viewerId={resident.id}
                effectivePoints={exchange.effectivePoints}
                taperNote={exchange.note}
                onRequest={request}
                onCancel={cancel}
                onComplete={completeListing}
              />
            )
          })}
        </ul>

        {visible.length === 0 && (
          <p className="mt-3 rounded-2xl bg-white p-4 text-sm text-stone-500 ring-1 ring-stone-200">
            Nothing matches those filters. Tap “All” to see everything again.
          </p>
        )}
      </section>

      {sheetOpen && (
        <NewListingSheet onCreate={createListing} onClose={() => setSheetOpen(false)} />
      )}
    </div>
  )
}
