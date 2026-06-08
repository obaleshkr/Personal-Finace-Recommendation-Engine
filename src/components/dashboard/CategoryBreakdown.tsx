import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { useFinance } from '../../lib/financeStore';
import { CATEGORY_CONFIG } from '../../types';
import { formatCurrency } from '../../lib/utils';

export function CategoryBreakdown() {
  const { getCategorySpending } = useFinance();
  const categorySpending = getCategorySpending();

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Spending by Category</h3>
        <p className="text-xs text-slate-400 mt-1">Where your money goes this month</p>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div style={{ width: 180, height: 180 }} className="shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="amount"
                  stroke="none"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  }}
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {categorySpending.map((item) => {
              const config = CATEGORY_CONFIG[item.category];
              return (
                <div key={item.category} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400 flex-1 truncate">{config?.label || item.category}</span>
                  <span className="text-xs font-medium text-white">{item.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
