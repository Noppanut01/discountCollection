import { useState } from 'react'
import { Copy, Check, Clock, Tag, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { PLATFORMS } from '../data/platforms'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDate()
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  const month = months[date.getMonth()]
  const year = date.getFullYear() + 543
  return `${day} ${month} ${year}`
}

function getDaysLeft(dateStr) {
  const today = new Date()
  const expiry = new Date(dateStr)
  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
}

export default function DiscountCard({ discount }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const platform = PLATFORMS[discount.platform]
  const daysLeft = getDaysLeft(discount.expiryDate)
  const isExpiringSoon = daysLeft <= 3 && daysLeft >= 0
  const isExpired = daysLeft < 0

  const handleCopy = () => {
    navigator.clipboard.writeText(discount.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (isExpired) return null

  return (
    <div className={`bg-white rounded-2xl border-2 ${platform.borderColor} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
      {/* Header stripe */}
      <div className="h-1.5 w-full" style={{ backgroundColor: platform.color }} />

      <div className="p-4">
        {/* Platform + badges */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${platform.badgeColor}`}>
            <span>{platform.logo}</span>
            {platform.name}
          </span>
          <div className="flex gap-1.5">
            {discount.isNew && (
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">ใหม่</span>
            )}
            {discount.isHot && (
              <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">🔥 ฮิต</span>
            )}
            {isExpiringSoon && (
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3" />
                ใกล้หมดอายุ
              </span>
            )}
          </div>
        </div>

        {/* Title & discount amount */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-800 text-base leading-snug flex-1">{discount.title}</h3>
          <div
            className="text-xl font-extrabold flex-shrink-0 ml-1"
            style={{ color: platform.color }}
          >
            {discount.discount}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{discount.description}</p>

        {/* Code copy box */}
        <div className={`flex items-center justify-between gap-2 p-3 rounded-xl border-2 border-dashed mb-3 ${platform.bgColor}`}
          style={{ borderColor: platform.color + '60' }}>
          <div className="flex items-center gap-2 min-w-0">
            <Tag className="w-4 h-4 flex-shrink-0" style={{ color: platform.color }} />
            <span className="font-mono font-bold text-base tracking-widest text-gray-700 truncate">
              {discount.code}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0"
            style={{
              backgroundColor: copied ? '#22c55e' : platform.color,
              color: 'white',
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                คัดลอกแล้ว!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                คัดลอก
              </>
            )}
          </button>
        </div>

        {/* Min order & expiry */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>
            {discount.minOrder > 0 ? `ขั้นต่ำ ฿${discount.minOrder.toLocaleString()}` : 'ไม่มีขั้นต่ำ'}
          </span>
          <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-amber-600 font-semibold' : ''}`}>
            <Clock className="w-3.5 h-3.5" />
            หมดอายุ {formatDate(discount.expiryDate)}
            {isExpiringSoon && ` (อีก ${daysLeft} วัน!)`}
          </span>
        </div>

        {/* Expandable conditions */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-600 pt-2 border-t border-gray-100 transition-colors"
        >
          <span>เงื่อนไขการใช้งาน</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <ul className="mt-2 space-y-1">
            {discount.conditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500">
                <span className="text-gray-300 mt-0.5">•</span>
                {cond}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
