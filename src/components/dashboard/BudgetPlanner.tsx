import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, AlertTriangle, Check } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useFinance } from '../../lib/financeStore';
import { CATEGORY_CONFIG, type Category } from '../../types';
import { formatCurrency } from '../../lib/utils';

const budgetCategories: Category[] = ['food', 'travel', 'bills', 'shopping', 'entertainment', 'education', 'healthcare', 'investments'];

export function BudgetPlanner() {
  const { budgets, setBudget } = useFinance();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (category: Category, currentAllocated: number) => {
    setEditingCategory(category);
    setEditValue(currentAllocated.toString());
  };

  const saveEdit = () => {
    if (editingCategory && editValue) {
      setBudget(editingCategory, parseFloat(editValue));
    }
    setEditingCategory(null);
    setEditValue('');
  };

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Monthly Budget Planner</h3>
        <p className="text-xs text-slate-400 mt-1">Set and track your spending limits</p>
      </div>
      <div className="divide-y divide-white/5">
        {budgetCategories.map((category, index) => {
          const config = CATEGORY_CONFIG[category];
          const budget = budgets.find(b => b.category === category);
          const allocated = budget?.allocated || 0;
          const spent = budget?.spent || 0;
          const percentage = allocated > 0 ? Math.round((spent / allocated) * 100) : 0;
          const isOver = percentage > 100;
          const isNear = percentage > 85 && !isOver;
          const remaining = allocated - spent;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: config?.color }}
                />
                <span className="text-sm font-medium text-white flex-1">{config?.label}</span>
                <div className="flex items-center gap-2">
                  {isOver && (
                    <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-bold">
                      <AlertTriangle size={10} /> OVER
                    </span>
                  )}
                  {isNear && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">NEAR</span>
                  )}
                  {editingCategory === category ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-20 px-2 py-1 bg-white/5 border border-indigo-500/30 rounded-lg text-xs text-white focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <button onClick={saveEdit} className="p-1 rounded hover:bg-white/10 text-green-400">
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(category, allocated)}
                      className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      <Pencil size={12} />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: isOver ? '#EF4444' : isNear ? '#F59E0B' : config?.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-semibold min-w-[40px] text-right ${isOver ? 'text-red-400' : isNear ? 'text-amber-400' : 'text-slate-300'}`}>
                  {percentage}%
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-slate-500">{formatCurrency(spent)} spent</span>
                <span className={`text-[10px] ${isOver ? 'text-red-400' : 'text-slate-500'}`}>
                  {isOver ? `${formatCurrency(Math.abs(remaining))} over budget` : `${formatCurrency(remaining)} remaining`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
