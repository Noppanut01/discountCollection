import { useState, useMemo } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PlatformFilter from './components/PlatformFilter'
import CategoryFilter from './components/CategoryFilter'
import SortBar from './components/SortBar'
import DiscountCard from './components/DiscountCard'
import { discounts } from './data/discounts'

function getDaysLeft(dateStr) {
  const today = new Date()
  const expiry = new Date(dateStr)
  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
}

// Filter out expired codes upfront
const activeDiscounts = discounts.filter(d => getDaysLeft(d.expiryDate) >= 0)

export default function App() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('all')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')

  const platformCounts = useMemo(() => {
    const counts = {}
    activeDiscounts.forEach(d => {
      counts[d.platform] = (counts[d.platform] || 0) + 1
    })
    return counts
  }, [])

  const filtered = useMemo(() => {
    let result = activeDiscounts

    if (platform !== 'all') {
      result = result.filter(d => d.platform === platform)
    }
    if (category !== 'all') {
      result = result.filter(d => d.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(d =>
        d.code.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === 'expiry') return getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate)
      if (sort === 'discount') return b.maxDiscount - a.maxDiscount
      // newest: isNew first, then by id desc
      if (a.isNew !== b.isNew) return a.isNew ? -1 : 1
      return 0
    })

    return result
  }, [search, platform, category, sort])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header totalCount={activeDiscounts.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Platform filter */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">แพลตฟอร์ม</p>
          <PlatformFilter selected={platform} onChange={setPlatform} counts={platformCounts} />
        </div>

        {/* Category filter */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">หมวดหมู่</p>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Sort & result count */}
        <SortBar value={sort} onChange={setSort} resultCount={filtered.length} />

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(discount => (
              <DiscountCard key={discount.id} discount={discount} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">ไม่พบโค้ดส่วนลดที่ตรงกับการค้นหา</p>
            <p className="text-sm mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกแพลตฟอร์มอื่น</p>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-gray-300 py-4">
          อัพเดทล่าสุด: {new Date().toLocaleDateString('th-TH')} • โค้ดส่วนลดอาจเปลี่ยนแปลงได้โดยไม่แจ้งล่วงหน้า
        </p>
      </main>
    </div>
  )
}
