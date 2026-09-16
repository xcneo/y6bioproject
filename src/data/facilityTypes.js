import {
  BatteryCharging,
  Bike,
  GlassWater,
  PlugZap,
  Recycle,
  Route,
  SolarPanel,
  Sprout,
  Trees,
} from 'lucide-react'

// The nine kinds of green infrastructure shown on the dashboard map.
//
// There was a tenth, `bloobox`, removed on 10 Sept 2026. A Bloobox is the box a
// household collects recyclables in at home and then empties into a blue bin, so
// it has no location of its own — a "Bloobox point" IS a recycling bin. Keeping
// a separate pin implied a second place to walk to that does not exist. The fact
// now lives in the recycling cards' text, where it answers the question the
// resident actually has.
//
// Note on the Tailwind class names below: they are written out in full on purpose.
// Tailwind scans this file for complete class names, so building them by joining
// strings (e.g. 'bg-' + colour) would NOT work — the styles would silently go missing.
//
// `color` is the same colour again as a hex code, for the selected filter chip,
// which sets it as an inline style. EVERY type needs one: a chip with no colour
// turns white text on a white button when tapped, and the label vanishes. Keep it
// the same hue as `pin`, so a chip and its pins on the map visibly belong together.
//
// `problems` is the list offered by the "report a problem" form in
// FacilitySheet.jsx, and it is PER TYPE on purpose. A single shared list meant an
// EV charger could be reported as an overflowing bin, which is not a thing that
// can happen and made the form look like scenery rather than something anyone
// would use. Every list is things a resident could actually see standing there.
//
// "Something else" is added to every list by the form itself, not here, and it
// opens a free-text box — see FacilitySheet.jsx. Keep it out of these arrays or
// it will appear twice.

// `icon` is a Lucide icon (lucide.dev/icons), not an emoji. Emoji look different
// on every phone and sat badly beside the line icons in the tab bar. It is the
// icon itself, not a name, so a screen draws it with <type.icon className="…" />.
// To change one, find a new name on lucide.dev and change both the import and
// the line below.
export const FACILITY_TYPES = {
  recycling: {
    label: 'Recycling',
    icon: Recycle,
    color: '#3B82C4',
    pin: 'bg-blue-500',
    chipOn: 'bg-blue-600 text-white border-blue-600',
    problems: [
      'Bin is overflowing',
      'Bin is damaged',
      'Wrong things dumped here',
      'Bin has gone missing',
    ],
  },
  ewaste: {
    label: 'E-waste',
    icon: BatteryCharging,
    color: '#DC2626',
    pin: 'bg-red-500',
    chipOn: 'bg-red-600 text-white border-red-600',
    problems: [
      'Collection box is full',
      'Box is damaged or missing',
      'Cannot get to the box',
      'My item does not fit',
    ],
  },
  evCharger: {
    label: 'EV charging',
    icon: PlugZap,
    color: '#7C5CD9',
    pin: 'bg-violet-500',
    chipOn: 'bg-violet-600 text-white border-violet-600',
    problems: [
      'Charger is not working',
      'Bay blocked by a non-EV',
      'Cable or connector damaged',
      'Payment would not go through',
    ],
  },
  waterRefill: {
    label: 'Water refill',
    icon: GlassWater,
    color: '#29A4D8',
    pin: 'bg-cyan-500',
    chipOn: 'bg-cyan-600 text-white border-cyan-600',
    problems: [
      'No water coming out',
      'Water looks or tastes off',
      'Tap or spout is dirty',
      'Cannot get to it',
    ],
  },
  garden: {
    label: 'Community garden',
    icon: Sprout,
    color: '#4CAF6B',
    pin: 'bg-emerald-500',
    chipOn: 'bg-emerald-600 text-white border-emerald-600',
    problems: [
      'Plots look neglected',
      'Water point not working',
      'Fence or gate damaged',
      'Pests or vermin',
    ],
  },
  solar: {
    label: 'Solar panels',
    icon: SolarPanel,
    color: '#D97706',
    pin: 'bg-amber-500',
    chipOn: 'bg-amber-600 text-white border-amber-600',
    problems: [
      'Panels look damaged',
      'Something has fallen on them',
      'Warning sign or barrier missing',
    ],
  },
  bicycle: {
    label: 'Bicycle parking',
    icon: Bike,
    color: '#EA580C',
    pin: 'bg-orange-500',
    chipOn: 'bg-orange-600 text-white border-orange-600',
    problems: [
      'Racks are always full',
      'Rack is damaged',
      'Abandoned bicycle taking a space',
      'Too dark at night',
    ],
  },
  parkConnector: {
    label: 'Park connector',
    icon: Route,
    color: '#4D7C0F',
    pin: 'bg-lime-600',
    chipOn: 'bg-lime-700 text-white border-lime-700',
    problems: [
      'Path is blocked',
      'Surface is broken or uneven',
      'Lighting is out',
      'Overgrown and hard to pass',
    ],
  },
  coolingSpace: {
    label: 'Cooling green space',
    icon: Trees,
    color: '#166534',
    pin: 'bg-green-700',
    chipOn: 'bg-green-800 text-white border-green-800',
    problems: [
      'Fallen branch or unsafe tree',
      'Litter left behind',
      'Bench or shelter damaged',
      'Lighting is out',
    ],
  },
}

// Handy for looping over the filter chips in a fixed order.
export const TYPE_KEYS = Object.keys(FACILITY_TYPES)

// The form appends this itself and treats it specially — picking it opens a
// free-text box, because the whole point of the option is that we did not
// anticipate the problem.
export const OTHER_PROBLEM = 'Something else'
