import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { ScoreGauge } from '../ui/ScoreGauge';
import { useFinance } from '../../lib/financeStore';
import { getScoreColor } from '../../lib/utils';

export function FinancialHealthScore() {
  const { getFinancialScore, getSavingsRatio, getExpenseRatio, getMonthlyIncome, getMonthlyExpenses } = useFinance();

  const score = getFinancialScore();
  const savingsRatio = getSavingsRatio();
  const expenseRatio = getExpenseRatio();
  const income = getMonthlyIncome();
  const expenses = getMonthlyExpenses();
  const budgetControl = 75;

  const scoreBreakdown = [
    { label: 'Savings Ratio', value: Math.min(100, Math.max(0, savingsRatio)), icon: '💰' },
    { label: 'Expense Ratio', value: Math.min(100, Math.max(0, 100 - expenseRatio)), icon: '📊' },
    { label: 'Budget Control', value: budgetControl, icon: '🏦' },
    { label: 'Monthly Trend', value: savingsRatio > 20 ? 70 : 40, icon: '📈' },
  ];

  const tips = [
    savingsRatio < 20 ? 'Try to save at least 20% of your income each month' : 'Great savings ratio — keep it up!',
    expenseRatio > 80 ? 'Your expenses are high relative to income — look for areas to cut' : 'Expense level looks manageable',
    'Review your budgets regularly to stay on track',
  ];

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <span className="text-sm">💚</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Financial Health</h3>
            <p className="text-xs text-slate-400">Your financial wellness score</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-center mb-4">
          <ScoreGauge score={score} size={160} strokeWidth={10} />
        </div>
        <div className="space-y-3">
          {scoreBreakdown.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-xs font-medium" style={{ color: getScoreColor(item.value) }}>{item.value}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: getScoreColor(item.value) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
          <p className="text-xs text-indigo-300 font-medium mb-1">💡 Improvement Tips</p>
          {tips.map((tip, i) => (
            <p key={i} className="text-[11px] text-slate-400 mt-1 leading-relaxed">• {tip}</p>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
