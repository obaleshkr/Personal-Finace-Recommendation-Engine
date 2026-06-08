import { motion } from 'framer-motion';
import { Target, Plus, Plane, Shield, Laptop, Bike, Calendar, Pencil, Trash2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useFinance } from '../../lib/financeStore';
import { formatCurrency } from '../../lib/utils';

const iconMap: Record<string, React.ElementType> = { Laptop, Plane, Shield, Bike, Target };

export function GoalTracker() {
  const { goals, updateGoal, deleteGoal } = useFinance();

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <Target size={16} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Savings Goals</h3>
              <p className="text-xs text-slate-400">Track your progress</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {goals.map((goal, index) => {
          const Icon = iconMap[goal.icon] || Target;
          const progress = Math.round((goal.current / goal.target) * 100);
          const remaining = goal.target - goal.current;
          const monthsLeft = goal.monthlySavings > 0 ? Math.ceil(remaining / goal.monthlySavings) : Infinity;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${goal.color}15` }}>
                  <Icon size={16} style={{ color: goal.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">{goal.name}</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium" style={{ color: goal.color }}>{progress}%</span>
                      <motion.button
                        onClick={() => {
                          const newAmount = prompt(`Update saved amount for "${goal.name}":`, goal.current.toString());
                          if (newAmount !== null) updateGoal(goal.id, { current: parseFloat(newAmount) || 0 });
                        }}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Pencil size={12} />
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          if (confirm(`Delete goal "${goal.name}"?`)) deleteGoal(goal.id);
                        }}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/10 text-slate-400 hover:text-red-400 transition-all"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Trash2 size={12} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-slate-400">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {monthsLeft !== Infinity ? `${monthsLeft}mo left` : 'Set monthly savings'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: goal.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
