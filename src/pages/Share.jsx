import { useState } from 'react'
import { LISTINGS } from '../data/listings'
import { FOOD_ITEMS } from '../data/foodShelf'
import { pointsForCompleting } from '../data/listingTypes'
import { USER } from '../data/user'
import { usePoints } from '../context/PointsContext'
import CategoryChips from '../components/CategoryChips'
import ListingCard from '../components/ListingCard'
import ShelfCard from '../components/ShelfCard'
import NewListingSheet from '../components/NewListingSheet'

export default function Share() {
  const { points, earnPoints } = usePoints()

  // The mock data is only the starting point — anything posted during the demo
  // gets added to these, which is why they are state and not used directly.
  const [listings, setListings] = useState(LISTINGS)
  const [foodItems, setFoodItems] = useState(FOOD_ITEMS)

  // Where the resident stands on each listing, keyed by id:
  //   'requested' = asked for it, or offered to help, and can still cancel
  //   'done'      = it actually changed hands
  // One map covers both the board and the food shelf, because ids are unique
  // across both files and the two go through the same steps.
  const [statuses, setStatuses] = useState({})

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

  function setStatus(id, value) {
    setStatuses((current) => ({ ...current, [id]: value }))
  }

  function clearStatus(id) {
    setStatuses((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  // Asking for something promises nothing and pays nothing — same as signing up
  // for an event on the dashboard. That is why cancelling is free.
  function request(item) {
    setStatus(item.id, 'requested')
  }

  function cancel(item) {
    clearStatus(item.id)
  }

  // The only place board points are awarded.
  function completeListing(listing) {
    if (statuses[listing.id] === 'done') return

    const isOwner = listing.owner === 'You'
    setStatus(listing.id, 'done')
    earnPoints(pointsForCompleting(listing, isOwner))
  }

  // Food is always completed by the person who posted it, confirming a neighbour
  // came and took it, so the points always go to them.
  function collectFood(item) {
    if (statuses[item.id] === 'done') return

    setStatus(item.id, 'done')
    earnPoints(item.points)
  }

  function createListing(kind, item) {
    if (kind === 'food') {
      setFoodItems((current) => [item, ...current])
      setNotice(`“${item.title}” is on the shelf. You get ${item.points} points when someone collects it.`)
    } else {
      setListings((current) => [item, ...current])
      setNotice(
        item.points > 0
          ? `“${item.title}” is posted. You get ${item.points} points when it is collected.`
          : `“${item.title}” is posted.`,
      )
    }

    setSheetOpen(false)
  }

  return (
    <div className="space-y-5 p-4">
      <header>
        <p className="text-sm text-stone-500">{USER.block}</p>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Share</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            ⭐ {points.toLocaleString()} points
          </span>
          <span className="text-xs text-stone-500">Same balance as the map screen</span>
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
                status={statuses[item.id]}
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
              status={statuses[listing.id]}
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
