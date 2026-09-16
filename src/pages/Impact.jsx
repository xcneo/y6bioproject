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
  good: 'border-l-[#2F9C5E] bg-[#EDF7F1] text-[#16281D]',
  think: 'border-l-[#E8A93A] bg-[#FDF5E8] text-[#16281D]',
  start: 'border-l-[#5C6E62] bg-[#F2F7F0] text-[#16281D]',
}

export default function Impact() {
  const { resident, points } = useSession()
  const activity = ACTIVITY[resident.id]
  const year = yearSoFar(activity)
  const nudges = nudgesFor(activity)

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
            Impact
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

      {/* ---- 1. Already done ---- */}
      <section>
        <div className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
          <p className="text-[12px] font-semibold text-[#5C6E62]">Since {activity.since}</p>

          <div className="mt-3">
            <p className="text-[15px] font-semibold text-[#5C6E62]">
              {formatCo2(year.foodCo2)}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#5C6E62]">
              of CO₂e kept out of the air, by eating {year.foodKg.toFixed(1)} kg of food instead of binning it.
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[rgba(20,40,25,0.08)] pt-3">
            <div>
              <dt className="text-[11px] font-semibold text-[#93A399]">Borrowed</dt>
              <dd className="mt-1 text-[18px] font-extrabold text-[#16281D]">{year.borrowed}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold text-[#93A399]">Given away</dt>
              <dd className="mt-1 text-[18px] font-extrabold text-[#16281D]">{year.givenAway}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold text-[#93A399]">Events</dt>
              <dd className="mt-1 text-[18px] font-extrabold text-[#16281D]">{year.eventsAttended}</dd>
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
              className={`rounded-[16px] border-l-4 p-4 ${NUDGE_STYLE[nudge.tone]}`}
            >
              <p className="font-[Nunito] text-[16px] font-extrabold text-[#16281D]">
                {nudge.title}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#5C6E62]">{nudge.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Sourcing, on the screen rather than buried in a file ---- */}
      <section>
        <details className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-0 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
          <summary className="cursor-pointer list-none px-4 py-3 text-[14px] font-extrabold text-[#16281D]">
            How we calculated this
          </summary>
          <div className="border-t border-[rgba(20,40,25,0.08)] px-4 pb-4 pt-3">
            <ul className="space-y-2">
              {SOURCE_LIST.map((entry) => (
                <li
                  key={entry.label}
                  className="rounded-[14px] bg-[#F2F7F0] p-3 text-[12px]"
                >
                  <p className="font-semibold text-[#16281D]">{entry.label}</p>
                  <p className="mt-0.5 leading-relaxed text-[#5C6E62]">{entry.source}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] leading-relaxed text-[#5C6E62]">
              Global averages, and Singapore imports most of its food — so treat
              these as the right order of magnitude, not exact figures for a meal
              eaten here. Anything marked “source needed” has deliberately been left
              blank rather than guessed.
            </p>
          </div>
        </details>
      </section>
    </div>
  )
}
