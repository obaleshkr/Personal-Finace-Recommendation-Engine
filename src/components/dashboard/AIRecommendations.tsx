import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, PiggyBank, CreditCard, Target, TrendingUp } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { mockRecommendations } from '../../data/mockData';
import type { Recommendation } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  AlertTriangle, Lightbulb, PiggyBank, CreditCard, Target, TrendingUp,
};

const typeStyles: Record<Recommendation['type'], { bg: string; text: string; border: string }> = {
  alert: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  insight: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  saving: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  budget: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
};

const priorityStyles: Record<Recommendation['priority'], { bg: string; text: string }> = {
  high: { bg: 'bg-red-500/10', text: 'text-red-400' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  low: { bg: 'bg-green-500/10', text: 'text-green-400' },
};

export function SmartInsights() {
  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10">
            <Lightbulb size={16} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Smart Insights</h3>
            <p className="text-xs text-slate-400">Personalized tips for your finances</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-white/5">
        {mockRecommendations.map((rec, index) => {
          const Icon = iconMap[rec.icon] || Lightbulb;
          const style = typeStyles[rec.type];
          const priorityStyle = priorityStyles[rec.priority];

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${style.bg} shrink-0 mt-0.5`}>
                  <Icon size={16} className={style.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-white">{rec.title}</h4>
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${priorityStyle.bg} ${priorityStyle.text}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={12} className="text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-400">{rec.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
