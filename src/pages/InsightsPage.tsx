import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Lightbulb,
  PiggyBank,
  CreditCard,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BarChart3,
  Shield,
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import { mockRecommendations, mockBudgets } from '../data/mockData';
import { CATEGORY_CONFIG, type Recommendation } from '../types';
import { formatCurrency } from '../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle, Lightbulb, PiggyBank, CreditCard, Target, TrendingUp,
};

const typeStyles: Record<Recommendation['type'], { bg: string; text: string }> = {
  alert: { bg: 'bg-red-500/10', text: 'text-red-400' },
  insight: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  saving: { bg: 'bg-green-500/10', text: 'text-green-400' },
  budget: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
};

export function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Insights</h1>
          <p className="text-sm text-slate-400 mt-1">Personalized recommendations for your finances</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Lightbulb size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Updated just now</span>
        </div>
      </div>

      {/* Analysis Method Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: 'Spending Analysis', desc: 'Pattern detection', icon: BarChart3, color: '#6366F1' },
          { name: 'Budget Comparison', desc: 'Category tracking', icon: Target, color: '#22C55E' },
          { name: 'Trend Forecasting', desc: 'Expense projection', icon: TrendingUp, color: '#F59E0B' },
        ].map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover glow="accent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${model.color}15` }}>
                  <model.icon size={18} style={{ color: model.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{model.name}</p>
                  <span className="text-[10px] text-slate-400">{model.desc}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockRecommendations.map((rec, index) => {
          const Icon = iconMap[rec.icon] || Lightbulb;
          const style = typeStyles[rec.type];
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard hover glow="accent" gradient className="h-full">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${style.bg} shrink-0`}>
                    <Icon size={22} className={style.text} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-white">{rec.title}</h3>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${style.bg} ${style.text}`}>
                        {rec.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{rec.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-indigo-400" />
                        <span className="text-sm font-semibold text-indigo-400">{rec.impact}</span>
                      </div>
                      <GlowButton variant="ghost" size="sm" icon={<ArrowRight size={14} />}>Take Action</GlowButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Budget Analysis */}
      <div>
        <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-4">Budget Analysis</h2>
        <div className="space-y-3">
          {mockBudgets.map((budget, index) => {
            const config = CATEGORY_CONFIG[budget.category];
            const percentage = Math.round((budget.spent / budget.allocated) * 100);
            const isOver = percentage > 100;
            const isNear = percentage > 85;

            return (
              <motion.div
                key={budget.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <GlassCard hover padding="sm">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: budget.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{config?.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}</span>
                          {isOver && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold">OVER</span>}
                          {isNear && !isOver && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">NEAR</span>}
                        </div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: isOver ? '#EF4444' : isNear ? '#F59E0B' : budget.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          transition={{ duration: 1, delay: 0.6 + index * 0.05 }}
                        />
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${isOver ? 'text-red-400' : isNear ? 'text-amber-400' : 'text-slate-300'}`}>
                      {percentage}%
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
