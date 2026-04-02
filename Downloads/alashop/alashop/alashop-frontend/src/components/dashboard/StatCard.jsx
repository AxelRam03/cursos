const colorMap = {
  rose:   { bg: 'bg-rose-50',   icon: 'text-rose-500',   border: 'border-rose-100' },
  pink:   { bg: 'bg-pink-50',   icon: 'text-pink-500',   border: 'border-pink-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-500', border: 'border-purple-100' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-500',  border: 'border-amber-100' },
  green:  { bg: 'bg-emerald-50',icon: 'text-emerald-500',border: 'border-emerald-100' },
};

export default function StatCard({ title, value, icon: Icon, color = 'rose', alert = false }) {
  const c = colorMap[color] ?? colorMap.rose;
  return (
    <div className={`card p-5 ${alert ? 'ring-2 ring-amber-300' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{title}</p>
        <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
