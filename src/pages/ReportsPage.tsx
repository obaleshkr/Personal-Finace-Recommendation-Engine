import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, Sparkles, BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockMonthlyData, mockCategorySpending, mockBudgets } from '../data/mockData';
import { CATEGORY_CONFIG } from '../types';
import { formatCurrency } from '../lib/utils';

export function ReportsPage() {
  const totalIncome = mockMonthlyData.reduce((s, m) => s + m.income, 0);
  const totalExpenses = mockMonthlyData.reduce((s, m) => s + m.expenses, 0);
  const totalSavings = mockMonthlyData.reduce((s, m) => s + m.savings, 0);
  const savingsRate = Math.round((totalSavings / totalIncome) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Generate and export financial reports</p>
        </div>
        <GlowButton icon={<Download size={16} />} size="sm">Export PDF Report</GlowButton>
      </div>

      {/* AI Monthly Summary */}
      <GlassCard gradient className="!bg-gradient-to-r !from-indigo-500/10 !to-violet-500/10 !border-indigo-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 shrink-0">
            <BarChart3 size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white font-[family-name:var(--font-display)]">Monthly Summary — January 2025</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              This month was financially strong! Your income of ₹1,00,000 exceeded expenses by ₹54,101, giving you a savings rate of 54.1%. 
              Food delivery remains your biggest discretionary expense at ₹6,700. Shopping exceeded budget by ₹700. 
              Your investment discipline is excellent with ₹15,000 in SIPs and PPF. The MacBook goal is 65% complete — you're on track for June!
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-xs text-green-400">Income +17.6%</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown size={14} className="text-amber-400" />
                <span className="text-xs text-amber-400">Expenses -10%</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-indigo-400" />
                <span className="text-xs text-indigo-400">Savings +22.9%</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Report Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: '6M Income', value: totalIncome, icon: TrendingUp, color: '#22C55E' },
          { label: '6M Expenses', value: totalExpenses, icon: TrendingDown, color: '#EF4444' },
          { label: '6M Savings', value: totalSavings, icon: BarChart3, color: '#6366F1' },
          { label: 'Savings Rate', value: savingsRate, icon: PieIcon, color: '#F59E0B', suffix: '%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover glow="accent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
                    {stat.suffix ? `${stat.value}${stat.suffix}` : formatCurrency(stat.value)}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard padding="none" className="overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Monthly Comparison</h3>
          </div>
          <div className="p-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
                <Bar dataKey="savings" fill="#6366F1" radius={[4, 4, 0, 0]} name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard padding="none" className="overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Category Distribution</h3>
          </div>
          <div className="p-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="amount"
                  stroke="none"
                >
                  {mockCategorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} formatter={(value: any) => [formatCurrency(Number(value)), 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Budget Report */}
      <GlassCard padding="none" className="overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Budget vs Actual — January 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-slate-400 font-medium px-5 py-3">Category</th>
                <th className="text-right text-xs text-slate-400 font-medium px-5 py-3">Budget</th>
                <th className="text-right text-xs text-slate-400 font-medium px-5 py-3">Actual</th>
                <th className="text-right text-xs text-slate-400 font-medium px-5 py-3">Difference</th>
                <th className="text-right text-xs text-slate-400 font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBudgets.map((budget, index) => {
                const config = CATEGORY_CONFIG[budget.category];
                const diff = budget.allocated - budget.spent;
                const isOver = diff < 0;
                return (
                  <motion.tr
                    key={budget.category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: budget.color }} />
                        <span className="text-sm text-white">{config?.label}</span>
                      </div>
                    </td>
                    <td className="text-right px-5 py-3 text-sm text-slate-300">{formatCurrency(budget.allocated)}</td>
                    <td className="text-right px-5 py-3 text-sm text-white font-medium">{formatCurrency(budget.spent)}</td>
                    <td className={`text-right px-5 py-3 text-sm font-medium ${isOver ? 'text-red-400' : 'text-green-400'}`}>
                      {isOver ? '' : '+'}{formatCurrency(diff)}
                    </td>
                    <td className="text-right px-5 py-3">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded ${
                        isOver ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {isOver ? 'OVER' : 'UNDER'}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
