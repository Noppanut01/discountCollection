export default function Header({ totalCount }) {
  return (
    <header className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              🏷️ โค้ดส่วนลด
            </h1>
            <p className="mt-1 text-violet-200 text-sm sm:text-base">
              รวมโค้ดส่วนลดทุกแพลตฟอร์มไว้ในที่เดียว
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl font-bold">{totalCount}</div>
            <div className="text-violet-200 text-sm">โค้ดที่ใช้งานได้</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          {[
            { icon: '🛍️', label: 'Shopee' },
            { icon: '🛒', label: 'Lazada' },
            { icon: '🚗', label: 'Grab' },
            { icon: '🍜', label: 'LINE MAN' },
            { icon: '🐼', label: 'foodpanda' },
            { icon: '💳', label: 'TrueMoney' },
            { icon: '✈️', label: 'Klook' },
          ].map(({ icon, label }) => (
            <span key={label} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 font-medium">
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
