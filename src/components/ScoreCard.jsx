import { NEIGHBOURHOODS } from '../data/neighbourhoods'

// The neighbourhood sustainability score, and how this estate ranks against others.
// This is the "friendly competition between estates" idea, and it is also the
// small version of a Singapore-wide view — real towns, ranked, without trying
// to draw a map of the whole island.

export default function ScoreCard({ estate }) {
  const ranked = [...NEIGHBOURHOODS].sort((a, b) => b.score - a.score)
  const position = ranked.findIndex((n) => n.name === estate) + 1
  const mine = ranked.find((n) => n.name === estate)

  if (!mine) return null

  const radius = 38
  const circumference = 2 * Math.PI * radius
  const dash = (mine.score / 100) * circumference

  return (
    <section className="rounded-[20px] border border-[rgba(20,40,25,0.08)] bg-white p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 rounded-full bg-[#EAF4EE] px-2.5 py-1.5 text-[12px] font-semibold text-[#14733F]">
          <span aria-hidden="true">#</span>
          {position} of {ranked.length} estates
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(20,40,25,0.09)" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#2F9C5E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-[Nunito] text-[26px] font-extrabold tracking-[-0.04em] text-[#16281D]">
              {mine.score}
            </span>
            <span className="text-[12px] font-medium text-[#5C6E62]">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-[Nunito] text-[16px] font-extrabold text-[#16281D]">
            {estate}&rsquo;s sustainability score
          </h2>
          <p className="mt-1 text-[14px] leading-relaxed text-[#5C6E62]">
            Ahead of Toa Payoh, Bukit Batok and Jurong East this month.
          </p>
        </div>
      </div>

      <ol className="mt-4 space-y-2.5">
        {ranked.map((neighbourhood) => {
          const isMine = neighbourhood.name === estate

          return (
            <li key={neighbourhood.name} className="flex items-center gap-2.5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-[12px] font-bold ${isMine ? 'bg-[#2F9C5E] text-white' : 'bg-[#EAF4EE] text-[#5C6E62]'}`}>
                {neighbourhood.name.charAt(0)}
              </span>
              <span className={`w-16 shrink-0 text-[14px] font-semibold ${isMine ? 'text-[#16281D]' : 'text-[#5C6E62]'}`}>
                {neighbourhood.name}
              </span>
              <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#E6EEE7]">
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${isMine ? 'bg-gradient-to-r from-[#2F9C5E] to-[#14733F]' : 'bg-[#B7C9BC]'}`}
                  style={{ width: `${neighbourhood.score}%` }}
                />
              </span>
              <span className="w-7 shrink-0 text-right text-[14px] font-semibold text-[#5C6E62]">
                {neighbourhood.score}
              </span>
            </li>
          )
        })}
      </ol>

      <p className="mt-4 text-[12px] text-[#93A399]">
        Illustrative figures for the prototype, not measured data.
      </p>
    </section>
  )
}
