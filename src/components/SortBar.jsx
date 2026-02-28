import { ArrowUpDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'newest', label: 'ใหม่ล่าสุด' },
  { value: 'expiry', label: 'ใกล้หมดอายุ' },
  { value: 'discount', label: 'ส่วนลดสูงสุด' },
]

export default function SortBar({ value, onChange, resultCount }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        พบ <span className="font-semibold text-gray-700">{resultCount}</span> โค้ดส่วนลด
      </p>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
