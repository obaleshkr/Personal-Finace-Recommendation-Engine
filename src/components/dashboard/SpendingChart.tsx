import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { mockMonthlyData } from '../../data/mockData';

const periods = ['1W', '1M', '3M', '6M', '1Y', 'All'] as const;

type Period = typeof periods[number];

export function SpendingChart() {
  const [activePeriod, setActivePeriod] = useState<Period>('6M');

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Income vs Expenses</h3>
            <p className="text-xs text-slate-400 mt-1">Track your financial flow over time</p>
          </div>
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activePeriod === period
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 pb-4" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockMonthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{
                background: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
              labelStyle={{ color: '#F8FAFC', fontWeight: 600 }}
              itemStyle={{ color: '#94A3B8' }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
            />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span style={{ color: '#94A3B8', fontSize: 12 }}>{value}</span>}
            />
            <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} fill="url(#incomeGradient)" name="Income" />
            <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGradient)" name="Expenses" />
            <Area type="monotone" dataKey="savings" stroke="#6366F1" strokeWidth={2} fill="url(#savingsGradient)" name="Savings" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
