import { CATEGORIES } from '../data/platforms'

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {Object.entries(CATEGORIES).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
            selected === key
              ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
              : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-200 hover:text-indigo-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
