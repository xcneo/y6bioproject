import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Placeholder from './pages/Placeholder'

// The three screens, listed once and reused for both the routes and the tab bar
// so the two can never drift apart.
const TABS = [
  { path: '/', label: 'Neighbourhood', icon: '🗺️' },
  { path: '/share', label: 'Share', icon: '🤝' },
  { path: '/impact', label: 'Impact', icon: '📊' },
]

function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md border-t border-stone-200 bg-white/95 backdrop-blur">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition ${
              isActive ? 'text-emerald-700' : 'text-stone-400'
            }`
          }
        >
          <span className="text-lg" aria-hidden="true">
            {tab.icon}
          </span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* max-w-md keeps it phone-shaped even when opened on a laptop */}
      <div className="mx-auto min-h-screen max-w-md bg-stone-50 pb-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/share"
            element={
              <Placeholder
                title="Sharing Platform"
                description="Borrow, give away, swap and rent with neighbours — including the Expiring Soon Shelf for food."
              />
            }
          />
          <Route
            path="/impact"
            element={
              <Placeholder
                title="Impact Calculator"
                description="See the CO₂, water, waste and money you save by changing a habit."
              />
            }
          />
        </Routes>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}
