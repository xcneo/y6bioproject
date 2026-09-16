import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import SessionProvider from './context/SessionProvider'
import SharingProvider from './context/SharingProvider'
import PhoneSwitcher from './components/PhoneSwitcher'
import Dashboard from './pages/Dashboard'
import Share from './pages/Share'
import Impact from './pages/Impact'

const TABS = [
  { path: '/', label: 'Neighbourhood', icon: 'map' },
  { path: '/share', label: 'Share', icon: 'share' },
  { path: '/impact', label: 'Impact', icon: 'chart' },
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
    return (
      <svg {...common}>
        <path d="M8 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8-5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9.8 10.9l4.4-2.5M9.8 13.2l4.4 2.5" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M4 18.5V9.5M4 9.5l8-5 8 5v9M8 13h8M8 17h5" />
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
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center rounded-[18px] px-2 py-2 text-[11px] font-semibold transition ${
              isActive
                ? 'bg-[#EAF4EE] text-[#14733F] shadow-[inset_0_0_0_1px_rgba(20,115,63,0.09)]'
                : 'text-[#5C6E62]'
            }`
          }
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
              <Route path="/" element={<Dashboard />} />
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
