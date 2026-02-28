import { PLATFORMS } from '../data/platforms'

const ALL_OPTION = { id: 'all', name: 'ทั้งหมด', logo: '🔖' }

export default function PlatformFilter({ selected, onChange, counts }) {
  const platforms = [ALL_OPTION, ...Object.values(PLATFORMS)]

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {platforms.map((platform) => {
        const isSelected = selected === platform.id
        const count = platform.id === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[platform.id] ?? 0)

        return (
          <button
            key={platform.id}
            onClick={() => onChange(platform.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              isSelected
                ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200'
                : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            <span>{platform.logo}</span>
            <span>{platform.name}</span>
            <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
              isSelected ? 'bg-white/30 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
