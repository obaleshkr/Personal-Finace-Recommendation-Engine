import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { weeklySpendingData } from '../../data/mockData';

export function WeeklySpending() {
  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">This Week's Spending</h3>
        <p className="text-xs text-slate-400 mt-1">Daily expense breakdown</p>
      </div>
      <div className="p-4" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySpendingData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="day" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Spent']}
              cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
            />
            <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
