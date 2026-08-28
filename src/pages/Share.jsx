import { useState } from 'react'
import { pointsForCompleting } from '../data/listingTypes'
import { useSession } from '../context/SessionContext'
import { useSharing } from '../context/SharingContext'
import CategoryChips from '../components/CategoryChips'
import ListingCard from '../components/ListingCard'
import ShelfCard from '../components/ShelfCard'
import NewListingSheet from '../components/NewListingSheet'

export default function Share() {
  const { resident, points, earnPoints } = useSession()
  const { listings, foodItems, claims, claimItem, cancelClaim, settleClaim, addListing } =
    useSharing()

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

    const isOwner = listing.ownerId === confirmedBy
    const reward = pointsForCompleting(listing, isOwner)

    settleClaim(listing.id, confirmedBy, reward)
    earnPoints(reward, confirmedBy)
  }

  // Food is always confirmed by the person who posted it, so the points always
  // go to them.
  function collectFood(item, confirmedBy) {
    if (claims[item.id]?.step === 'done') return

    settleClaim(item.id, confirmedBy, item.points)
    earnPoints(item.points, confirmedBy)
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
    <div className="space-y-5 p-4">
      <header>
        <p className="text-sm text-stone-500">{resident.block}</p>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Share</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            ⭐ {points.toLocaleString()} points
          </span>
          <span className="text-xs text-stone-500">{resident.name}&rsquo;s balance</span>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white active:bg-emerald-700"
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
            {shelf.map((item) => (
              <ShelfCard
                key={item.id}
                item={item}
                claim={claims[item.id]}
                viewerId={resident.id}
                onClaim={request}
                onCancel={cancel}
                onCollected={collectFood}
              />
            ))}
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
          {visible.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              claim={claims[listing.id]}
              viewerId={resident.id}
              onRequest={request}
              onCancel={cancel}
              onComplete={completeListing}
            />
          ))}
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
