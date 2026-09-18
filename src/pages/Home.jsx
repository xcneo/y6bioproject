import { useSession } from '../context/SessionContext'
import { useSharing } from '../context/SharingContext'
import { ACTIVITY } from '../data/activity'
import energyIcon from '../assets/energy-icon.svg'

const STREAK_DAYS = [
  { day: 'M', icon: 'flame', active: true },
  { day: 'T', icon: 'drop', active: true },
  { day: 'W', icon: 'leaf', active: true },
  { day: 'T', icon: 'flame', active: true },
  { day: 'F', icon: 'drop', active: true },
  { day: 'S', icon: 'leaf', active: true },
  { day: 'S', icon: 'flame', active: false },
]

const ONGOING_ACTIVITIES = [
  { title: 'Bring My Own Reusables', status: 'Signed up', points: '+50 Points', icon: 'reusable', tone: 'bg-[#EAF6EE] text-[#1E7A4A]' },
  { title: 'Clean Energy', status: 'In progress', points: '+75 Points', icon: 'energy', tone: 'bg-[#FFF5D8] text-[#C28716]' },
  { title: 'Compost', status: 'Ready to log', points: '+30 Points', icon: 'compost', tone: 'bg-[#EAF9F3] text-[#2F9C5E]' },
]

const PAST_ACTIVITIES = [
  { title: 'Consume Mindfully', status: 'Completed', points: '+50 Points', icon: 'mindful', tone: 'bg-[#F2EEFF] text-[#7654C6]' },
  { title: 'Protect Wildlife', status: 'Completed', points: '+40 Points', icon: 'wildlife', tone: 'bg-[#FFF0E4] text-[#C86E2D]' },
  { title: 'Recycle', status: 'Completed', points: '+20 Points', icon: 'recycle', tone: 'bg-[#EAF5FF] text-[#2F8FA5]' },
]

function ActivityIcon({ type }) {
  if (type === 'energy') {
    return <img src={energyIcon} alt="" className="h-12 w-12" />
  }

  const illustrations = {
    reusable: '🧴',
    compost: '🥬',
    mindful: '🏷️',
    wildlife: '🦔',
    recycle: '♻️',
  }

  return <span className="text-[25px] leading-none" aria-hidden="true">{illustrations[type]}</span>
}

function StreakIcon({ type }) {
  const paths = {
    flame: <path d="M12 21c4 0 6-3 6-6 0-3-2-5-4-7 0 2-1 3-2 3-1-3-2-5-1-8-4 3-5 7-5 11 0 4 2 7 6 7Z" />,
    drop: <path d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z" />,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
  }

  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

function ActivityCard({ activity }) {
  return (
    <article className="flex items-center gap-3 rounded-[16px] bg-white p-3.5 shadow-[0_6px_18px_rgba(20,40,25,0.05)] ring-1 ring-[rgba(20,40,25,0.06)]">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${activity.tone}`}>
        <ActivityIcon type={activity.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-[Nunito] text-[15px] font-extrabold text-[#16281D]">{activity.title}</h3>
        <p className="mt-0.5 text-[12px] text-[#5C6E62]">{activity.status}</p>
      </div>
      <span className="shrink-0 rounded-full bg-[#EAF6EE] px-2.5 py-1 text-[11px] font-extrabold text-[#1E7A4A]">{activity.points}</span>
    </article>
  )
}

export default function Home() {
  const { resident, points, events, eventStatuses } = useSession()
  const { listings, foodItems, claims } = useSharing()
  const history = ACTIVITY[resident.id]

  const eventActivities = events
    .filter((event) => eventStatuses[event.id] === 'going' || eventStatuses[event.id] === 'attended')
    .map((event) => ({
      title: event.title,
      status: eventStatuses[event.id] === 'attended' ? 'Completed in Neighbourhood' : 'Signed up in Neighbourhood',
      points: `+${event.pointsForAttending} Points`,
      icon: event.title.toLowerCase().includes('garden') ? 'compost' : 'recycle',
      tone: 'bg-[#EAF6EE] text-[#1E7A4A]',
    }))

  const shareActivities = [...listings, ...foodItems]
    .filter((item) => item.ownerId === resident.id || claims[item.id]?.by === resident.id)
    .filter((item) => claims[item.id])
    .map((item) => {
      const claim = claims[item.id]
      const done = claim.step === 'done'
      return {
        title: item.title ?? item.what,
        status: done ? 'Completed in Share' : 'Ongoing in Share',
        points: `+${claim.creditedPoints ?? item.points ?? 0} Points`,
        icon: item.category === 'repair' ? 'mindful' : item.category === 'borrow' ? 'reusable' : 'recycle',
        tone: 'bg-[#EAF5FF] text-[#2F8FA5]',
      }
    })

  const impactActivities = [
    ...(history.borrowed.slice(0, 2).map((item) => ({ title: `Borrowed ${item.item}`, status: 'Completed in Impact', points: '+Impact saved', icon: 'reusable', tone: 'bg-[#FFF5D8] text-[#C28716]' }))),
    ...(history.foodShared.slice(0, 1).map((item) => ({ title: `Shared ${item.what}`, status: 'Completed in Impact', points: '+Impact saved', icon: 'compost', tone: 'bg-[#EAF9F3] text-[#2F9C5E]' }))),
  ]

  const ongoingActivities = [
    ...eventActivities.filter((item) => item.status.includes('Signed up')),
    ...shareActivities.filter((item) => item.status.includes('Ongoing')),
  ]
  const pastActivities = [
    ...eventActivities.filter((item) => item.status.includes('Completed')),
    ...shareActivities.filter((item) => item.status.includes('Completed')),
    ...impactActivities,
  ]
  return (
    <main className="space-y-5 bg-[#F0F2ED] p-4 pb-24">
      <header className="overflow-hidden rounded-[18px] bg-gradient-to-br from-[#2F9C5E] to-[#14733F] px-4 pb-5 pt-4 text-white shadow-[0_12px_28px_rgba(20,40,25,0.12)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25" aria-hidden="true">✦</div>
            <span className="font-[Nunito] text-[18px] font-extrabold">Eco SG</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-sm font-extrabold ring-1 ring-white/30">{resident.name.charAt(0)}</div>
        </div>
        <p className="mt-5 text-[14px] font-medium text-emerald-50/90">Good morning</p>
        <h1 className="mt-1 font-[Nunito] text-[36px] font-extrabold tracking-[-0.05em]">{resident.name}</h1>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[12px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8A93A] text-[12px] text-[#224F2D]">★</span>
          <span className="text-[15px] font-extrabold">{points.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-50/90">Redeem for vouchers</span>
        </div>
      </header>

      <section className="rounded-[16px] bg-[#F2F7F0] p-4 shadow-[0_6px_18px_rgba(20,40,25,0.05)] ring-1 ring-[rgba(20,40,25,0.06)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5C6E62]">Daily streak</p>
            <h2 className="mt-1 font-[Nunito] text-[20px] font-extrabold text-[#16281D]">7-Day Streak</h2>
          </div>
          <span className="rounded-full bg-[#E8A93A] px-2.5 py-1 text-[11px] font-extrabold text-[#224F2D]">+50 bonus</span>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {STREAK_DAYS.map(({ day, icon, active }, index) => (
            <div key={`${day}-${index}`} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#5C6E62]">{day}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${active ? 'bg-[#2F9C5E] text-white shadow-[0_5px_12px_rgba(47,156,94,0.2)]' : 'bg-[#E3EBE4] text-[#93A399]'}`}><StreakIcon type={icon} /></div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-[#5C6E62]">+20 to +50 Bonus Points for maintaining consecutive 7-day streaks.</p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between"><h2 className="font-[Nunito] text-[22px] font-extrabold text-[#16281D]">My Activities</h2><span className="text-[12px] font-semibold text-[#14733F]">View all</span></div>
        <div className="space-y-2.5"><h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5C6E62]">Ongoing / Signed Up Activities</h3>{(ongoingActivities.length ? ongoingActivities : ONGOING_ACTIVITIES).map((activity) => <ActivityCard key={activity.title} activity={activity} />)}</div>
        <div className="space-y-2.5 pt-2"><h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5C6E62]">Past / Completed Activities</h3>{(pastActivities.length ? pastActivities : PAST_ACTIVITIES).map((activity) => <ActivityCard key={activity.title} activity={activity} />)}</div>
      </section>
    </main>
  )
}
