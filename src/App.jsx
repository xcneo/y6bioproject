import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import SessionProvider from './context/SessionProvider'
import SharingProvider from './context/SharingProvider'
import PhoneSwitcher from './components/PhoneSwitcher'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Share from './pages/Share'
import Impact from './pages/Impact'

const TABS = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/neighbourhood', label: 'Neighbourhood', icon: 'map' },
  { path: '/share', label: 'Share', icon: 'share' },
  { path: '/impact', label: 'Impact', icon: 'impact' },
]

function TabIcon({ icon, active }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: active ? '#14733F' : '#5C6E62',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (icon === 'map') {
    return (
      <svg {...common}>
        <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    )
  }

  if (icon === 'share') {
    // Lucide's Share2, not hand-drawn: the hand-drawn version had uneven dots and
    // lines that stopped short of them. Same size, colour and line width as the
    // two icons beside it.
    return <Share2 size={common.width} color={common.stroke} strokeWidth={common.strokeWidth} aria-hidden="true" />
  }

  if (icon === 'impact') {
    return (
      <svg {...common}>
        <path d="M5 18V9M12 18V5M19 18v-7" />
      </svg>
    )
  }

  if (icon === 'home') {
    return (
      <svg {...common}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  )
}

function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md items-end gap-2 border-t border-[rgba(20,40,25,0.08)] bg-[#F7F9F5]/95 px-2 pb-2 pt-1.5 backdrop-blur-sm">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) => `flex flex-1 flex-col items-center justify-center rounded-[14px] px-1 py-2 text-[10px] font-semibold transition ${isActive ? 'bg-[#EAF4EE] text-[#14733F] shadow-[inset_0_0_0_1px_rgba(20,115,63,0.09)]' : 'text-[#5C6E62]'}`}
        >
          {({ isActive }) => (
            <>
              <TabIcon icon={tab.icon} active={isActive} />
              <span className="mt-1 leading-none">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <SharingProvider>
        <BrowserRouter>
          <div className="mx-auto min-h-screen max-w-md bg-[#F0F2ED] pb-24">
            <PhoneSwitcher />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/neighbourhood" element={<Dashboard />} />
              <Route path="/share" element={<Share />} />
              <Route path="/impact" element={<Impact />} />
            </Routes>
            <TabBar />
          </div>
        </BrowserRouter>
      </SharingProvider>
    </SessionProvider>
  )
}
