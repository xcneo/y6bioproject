import { PEOPLE, PHONES } from '../data/residents'
import { useSession } from '../context/SessionContext'

// The demo control that swaps which resident you are.
//
// Two real phones would need a server: each phone runs its own copy of the app
// with its own memory, and nothing joins them up. This prototype has no server,
// so instead of two devices it gives you two points of view on one device.
//
// It is deliberately styled to look like scaffolding rather than part of the
// app — dark bar, small type, the word "demo" in it. Nobody watching should
// come away thinking Eco SG ships with a "become someone else" button.

export default function PhoneSwitcher() {
  const { residentId, balances, switchTo } = useSession()

  return (
    <div className="bg-slate-800 px-4 py-2">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        Demo control · one device standing in for two phones
      </p>

      <div className="mt-1.5 flex gap-1.5">
        {PHONES.map((id) => {
          const isCurrent = id === residentId

          return (
            <button
              key={id}
              type="button"
              onClick={() => switchTo(id)}
              aria-pressed={isCurrent}
              className={`flex-1 rounded-lg px-2 py-1.5 text-left text-xs transition ${
                isCurrent ? 'bg-white text-slate-900' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <span className="block font-semibold">{PEOPLE[id].name}</span>
              <span
                className={`block text-[11px] ${
                  isCurrent ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                ⭐ {balances[id].toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
