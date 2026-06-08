import { BalanceOverview } from '../components/dashboard/BalanceOverview';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { SmartInsights } from '../components/dashboard/AIRecommendations';
import { GoalTracker } from '../components/dashboard/GoalTracker';
import { FinancialHealthScore } from '../components/dashboard/FinancialHealthScore';
import { CategoryBreakdown } from '../components/dashboard/CategoryBreakdown';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WeeklySpending } from '../components/dashboard/WeeklySpending';
import { BudgetPlanner } from '../components/dashboard/BudgetPlanner';
import { GlassCard } from '../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingDown } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Welcome back, obalesh K R! Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <GlassCard padding="sm" className="!bg-indigo-500/10 !border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">3 new insights</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Insight Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 !bg-gradient-to-r !from-indigo-500/10 !to-violet-500/10 !border-indigo-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 shrink-0">
            <Lightbulb size={16} className="text-indigo-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Smart Insight</p>
            <p className="text-xs text-slate-400 mt-1">
              Your food delivery spending is 25% higher than last month. Reducing by 2 orders/week could save you ₹2,500/month — enough to reach your MacBook goal 2 months earlier!
            </p>
          </div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 shrink-0 font-medium">View Details</button>
        </div>
      </motion.div>

      {/* Balance Overview */}
      <BalanceOverview />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <FinancialHealthScore />
      </div>

      {/* Category + Weekly + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryBreakdown />
        <WeeklySpending />
        <BudgetPlanner />
      </div>

      {/* Insights + Goals + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SmartInsights />
        </div>
        <GoalTracker />
        <QuickActions />
      </div>
    </div>
  );
}
