import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { GlassCard } from '../components/ui/GlassCard';
import { expenseForecastData, savingsPredictionData, mockMonthlyData } from '../data/mockData';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, BarChart3 } from 'lucide-react';

export function PredictionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Predictions</h1>
          <p className="text-sm text-slate-400 mt-1">ML-powered financial forecasting</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <BarChart3 size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Model: Random Forest v3.2</span>
        </div>
      </div>

      {/* Prediction Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Next Month Expense', value: '₹45,000', change: -4.3, icon: TrendingDown, color: '#22C55E', desc: 'Decreasing trend' },
          { label: 'Next Month Savings', value: '₹52,000', change: 3.8, icon: TrendingUp, color: '#6366F1', desc: 'Increasing trend' },
          { label: 'Overspend Risk', value: 'Low', change: 0, icon: AlertTriangle, color: '#22C55E', desc: 'Within safe range' },
          { label: 'Budget Accuracy', value: '94%', change: 2.1, icon: Target, color: '#F59E0B', desc: 'High confidence' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover glow="accent">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1 font-[family-name:var(--font-display)]">{stat.value}</p>
                  <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.desc}</p>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Expense Forecast Chart */}
      <GlassCard padding="none" className="overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10">
              <BarChart3 size={16} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Expense Forecast</h3>
              <p className="text-xs text-slate-400">Actual vs Predicted with confidence interval</p>
            </div>
          </div>
        </div>
        <div className="p-4" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={expenseForecastData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                formatter={(value: any, name: any) => [`₹${Number(value)?.toLocaleString('en-IN')}`, name]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span style={{ color: '#94A3B8', fontSize: 12 }}>{value}</span>} />
              <Area type="monotone" dataKey="upper" stroke="transparent" fill="rgba(99,102,241,0.05)" name="Upper Bound" />
              <Area type="monotone" dataKey="lower" stroke="transparent" fill="rgba(99,102,241,0.05)" name="Lower Bound" />
              <Area type="monotone" dataKey="actual" stroke="#22C55E" strokeWidth={2} fill="url(#actualGrad)" name="Actual" connectNulls={false} />
              <Area type="monotone" dataKey="forecast" stroke="#6366F1" strokeWidth={2} strokeDasharray="5 5" fill="url(#forecastGrad)" name="Forecast" connectNulls={false} />
              <ReferenceLine x="Jan" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" label={{ value: 'Today', fill: '#94A3B8', fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Savings Prediction Chart */}
      <GlassCard padding="none" className="overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-green-500/10">
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Savings Prediction</h3>
              <p className="text-xs text-slate-400">Projected monthly savings based on spending patterns</p>
            </div>
          </div>
        </div>
        <div className="p-4" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsPredictionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                formatter={(value: any, name: any) => [`₹${Number(value)?.toLocaleString('en-IN')}`, name]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span style={{ color: '#94A3B8', fontSize: 12 }}>{value}</span>} />
              <Line type="monotone" dataKey="actual" stroke="#22C55E" strokeWidth={2} dot={{ r: 4, fill: '#22C55E' }} name="Actual" connectNulls={false} />
              <Line type="monotone" dataKey="predicted" stroke="#6366F1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#6366F1' }} name="Predicted" connectNulls={false} />
              <ReferenceLine x="Jan" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Algorithm Info */}
      <GlassCard gradient className="!bg-indigo-500/5 !border-indigo-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 shrink-0">
            <Lightbulb size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">How Our Predictions Work</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Our prediction pipeline uses an ensemble of <span className="text-indigo-400">Linear Regression</span> for trend detection,
              <span className="text-indigo-400"> Random Forest</span> for non-linear patterns,
              <span className="text-indigo-400"> KMeans Clustering</span> for user segmentation, and
              <span className="text-indigo-400"> Collaborative Filtering</span> for peer comparison.
              The models are retrained weekly on anonymized spending data from 50K+ users, achieving 94% prediction accuracy.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
