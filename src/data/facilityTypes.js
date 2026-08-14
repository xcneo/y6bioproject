// The nine kinds of green infrastructure shown on the dashboard map.
//
// Note on the Tailwind class names below: they are written out in full on purpose.
// Tailwind scans this file for complete class names, so building them by joining
// strings (e.g. 'bg-' + colour) would NOT work — the styles would silently go missing.

export const FACILITY_TYPES = {
  recycling: {
    label: 'Recycling',
    icon: '♻️',
    pin: 'bg-blue-500',
    chipOn: 'bg-blue-600 text-white border-blue-600',
  },
  bloobox: {
    label: 'Bloobox',
    icon: '📦',
    pin: 'bg-sky-500',
    chipOn: 'bg-sky-600 text-white border-sky-600',
  },
  evCharger: {
    label: 'EV charging',
    icon: '🔌',
    pin: 'bg-violet-500',
    chipOn: 'bg-violet-600 text-white border-violet-600',
  },
  waterRefill: {
    label: 'Water refill',
    icon: '💧',
    pin: 'bg-cyan-500',
    chipOn: 'bg-cyan-600 text-white border-cyan-600',
  },
  garden: {
    label: 'Community garden',
    icon: '🌱',
    pin: 'bg-emerald-500',
    chipOn: 'bg-emerald-600 text-white border-emerald-600',
  },
  solar: {
    label: 'Solar panels',
    icon: '☀️',
    pin: 'bg-amber-500',
    chipOn: 'bg-amber-600 text-white border-amber-600',
  },
  bicycle: {
    label: 'Bicycle parking',
    icon: '🚲',
    pin: 'bg-orange-500',
    chipOn: 'bg-orange-600 text-white border-orange-600',
  },
  parkConnector: {
    label: 'Park connector',
    icon: '🚶',
    pin: 'bg-lime-600',
    chipOn: 'bg-lime-700 text-white border-lime-700',
  },
  coolingSpace: {
    label: 'Cooling green space',
    icon: '🌳',
    pin: 'bg-green-700',
    chipOn: 'bg-green-800 text-white border-green-800',
  },
}

// Handy for looping over the filter chips in a fixed order.
export const TYPE_KEYS = Object.keys(FACILITY_TYPES)
