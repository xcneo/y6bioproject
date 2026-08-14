import { NEIGHBOURHOODS } from '../data/neighbourhoods'

// The neighbourhood sustainability score, and how this estate ranks against others.
// This is the "friendly competition between estates" idea, and it is also the
// small version of a Singapore-wide view — real towns, ranked, without trying
// to draw a map of the whole island.

export default function ScoreCard({ estate }) {
  // Highest score first.
  const ranked = [...NEIGHBOURHOODS].sort((a, b) => b.score - a.score)
  const position = ranked.findIndex((n) => n.name === estate) + 1
  const mine = ranked.find((n) => n.name === estate)

  if (!mine) return null

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-stone-900">
          {estate} sustainability score
        </h2>
        <span className="text-xs text-stone-500">
          #{position} of {ranked.length}
        </span>
      </div>

      <p className="mt-1 text-3xl font-bold text-emerald-700">
        {mine.score}
        <span className="text-base font-medium text-stone-400"> / 100</span>
      </p>

      <ol className="mt-3 space-y-1.5">
        {ranked.map((neighbourhood) => {
          const isMine = neighbourhood.name === estate

          return (
            <li key={neighbourhood.name} className="flex items-center gap-2">
              <span
                className={`w-20 shrink-0 text-xs ${
                  isMine ? 'font-semibold text-stone-900' : 'text-stone-500'
                }`}
              >
                {neighbourhood.name}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                <span
                  className={`block h-full rounded-full ${
                    isMine ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                  style={{ width: `${neighbourhood.score}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right text-xs text-stone-500">
                {neighbourhood.score}
              </span>
            </li>
          )
        })}
      </ol>

      <p className="mt-3 text-xs text-stone-400">
        Illustrative figures for the prototype, not measured data.
      </p>
    </section>
  )
}
