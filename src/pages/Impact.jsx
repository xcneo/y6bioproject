import { ACTIVITY } from '../data/activity'
import { HABITS } from '../data/habits'
import { SOURCE_LIST } from '../data/factors'
import { formatCo2, yearSoFar } from '../lib/impact'
import { nudgesFor } from '../lib/nudges'
import { useSession } from '../context/SessionContext'
import HabitCard from '../components/HabitCard'

// Feature 3. Three sections, in this order on purpose:
//
//   1. What you have already done      — real, from your own history
//   2. What a change would be worth    — hypothetical, you drive it
//   3. What we noticed about you       — the personalised nudges
//
// Starting with what someone has already done makes the hypothetical part land
// differently: it reads as "here is more of what you are already doing" rather
// than as a lecture from an app that knows nothing about you.

const NUDGE_STYLE = {
  good: 'bg-emerald-50 text-emerald-900',
  think: 'bg-amber-50 text-amber-900',
  start: 'bg-stone-100 text-stone-700',
}

export default function Impact() {
  const { resident, points } = useSession()
  const activity = ACTIVITY[resident.id]
  const year = yearSoFar(activity)
  const nudges = nudgesFor(activity)

  return (
    <div className="space-y-5 p-4">
      <header>
        <p className="text-sm text-stone-500">{resident.block}</p>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">Impact</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
            ⭐ {points.toLocaleString()} points
          </span>
          <span className="text-xs text-stone-500">{resident.name}&rsquo;s balance</span>
        </div>
      </header>

      {/* ---- 1. Already done ---- */}
      <section>
        <h2 className="text-sm font-semibold text-stone-900">
          Since {activity.since}
        </h2>
        <p className="mb-2 text-xs text-stone-500">
          From what you have actually done in the app.
        </p>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
          <p className="text-3xl font-bold text-emerald-700">
            {formatCo2(year.foodCo2)}
          </p>
          <p className="text-sm text-stone-600">
            of CO₂e kept out of the air, by eating {year.foodKg.toFixed(1)} kg of
            food instead of binning it
          </p>

          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-stone-100 pt-3">
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-stone-500">
                Borrowed
              </dt>
              <dd className="text-lg font-bold text-stone-900">{year.borrowed}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-stone-500">
                Given away
              </dt>
              <dd className="text-lg font-bold text-stone-900">{year.givenAway}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-stone-500">
                Events
              </dt>
              <dd className="text-lg font-bold text-stone-900">
                {year.eventsAttended}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---- 2. What if ---- */}
      <section>
        <h2 className="text-sm font-semibold text-stone-900">What if I&hellip;</h2>
        <p className="mb-2 text-xs text-stone-500">
          Estimates over a year. Tap − and + to change how often.
        </p>

        <ul className="space-y-3">
          {HABITS.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </ul>
      </section>

      {/* ---- 3. Nudges ---- */}
      <section>
        <h2 className="text-sm font-semibold text-stone-900">What we noticed</h2>
        <p className="mb-2 text-xs text-stone-500">
          Worked out with simple rules over your own activity — no prediction,
          and nothing leaves your phone.
        </p>

        <ul className="space-y-2">
          {nudges.map((nudge) => (
            <li
              key={nudge.id}
              className={`rounded-2xl p-4 ${NUDGE_STYLE[nudge.tone]}`}
            >
              <p className="font-semibold">{nudge.title}</p>
              <p className="mt-1 text-sm">{nudge.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Sourcing, on the screen rather than buried in a file ---- */}
      <section>
        <h2 className="text-sm font-semibold text-stone-900">
          Where these numbers come from
        </h2>
        <ul className="mt-2 space-y-2">
          {SOURCE_LIST.map((entry) => (
            <li
              key={entry.label}
              className="rounded-xl bg-white p-3 text-xs shadow-sm ring-1 ring-stone-200"
            >
              <p className="font-semibold text-stone-800">{entry.label}</p>
              <p className="mt-0.5 leading-relaxed text-stone-500">{entry.source}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-stone-400">
          Global averages, and Singapore imports most of its food — so treat
          these as the right order of magnitude, not exact figures for a meal
          eaten here. Anything marked “source needed” has deliberately been left
          blank rather than guessed.
        </p>
      </section>
    </div>
  )
}
