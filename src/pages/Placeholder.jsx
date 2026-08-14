// Stand-in for the two screens not built yet. Keeping them visible in the tab
// bar shows the whole concept in a demo, and is honest about what is finished.

export default function Placeholder({ title, description }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="text-xl font-bold text-stone-900">{title}</h1>
      <p className="mt-2 max-w-xs text-sm text-stone-600">{description}</p>
      <p className="mt-6 rounded-full bg-stone-100 px-4 py-1.5 text-xs font-medium text-stone-500">
        Not built yet
      </p>
    </div>
  )
}
