import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowDownRight, ArrowUpRight, Target, FileText, IndianRupee, CreditCard, Wallet, X, Check } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlowButton } from '../ui/GlowButton';
import { Modal } from '../ui/Modal';
import { useFinance } from '../../lib/financeStore';
import { CATEGORY_CONFIG, type Category } from '../../types';

const actions = [
  { label: 'Add Income', icon: ArrowUpRight, color: '#22C55E', bg: 'bg-green-500/10' },
  { label: 'Add Expense', icon: Plus, color: '#EF4444', bg: 'bg-red-500/10' },
  { label: 'Transfer Savings', icon: Wallet, color: '#6366F1', bg: 'bg-indigo-500/10' },
  { label: 'Add Goal', icon: Target, color: '#F59E0B', bg: 'bg-amber-500/10' },
  { label: 'Download Report', icon: FileText, color: '#EC4899', bg: 'bg-pink-500/10' },
] as const;

const expenseCategories: Category[] = ['food', 'travel', 'bills', 'shopping', 'education', 'healthcare', 'entertainment', 'investments'];
const incomeCategories: Category[] = ['salary', 'freelance'];

export function QuickActions() {
  const { addTransaction, addGoal, addFundsToGoal, goals } = useFinance();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Add Income form
  const [incomeForm, setIncomeForm] = useState({ description: '', amount: '', category: 'salary' as Category, date: new Date().toISOString().split('T')[0] });
  // Add Expense form
  const [expenseForm, setExpenseForm] = useState({ description: '', amount: '', category: 'food' as Category, date: new Date().toISOString().split('T')[0], notes: '' });
  // Transfer Savings form
  const [savingsForm, setSavingsForm] = useState({ goalId: '', amount: '' });
  // Add Goal form
  const [goalForm, setGoalForm] = useState({ name: '', target: '', monthlySavings: '', color: '#6366F1' });

  const goalColors = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#EF4444'];

  const handleAddIncome = () => {
    if (!incomeForm.description || !incomeForm.amount) return;
    addTransaction({
      type: 'income',
      category: incomeForm.category,
      amount: parseFloat(incomeForm.amount),
      description: incomeForm.description,
      date: incomeForm.date,
    });
    setIncomeForm({ description: '', amount: '', category: 'salary', date: new Date().toISOString().split('T')[0] });
    setActiveModal(null);
  };

  const handleAddExpense = () => {
    if (!expenseForm.description || !expenseForm.amount) return;
    addTransaction({
      type: 'expense',
      category: expenseForm.category,
      amount: parseFloat(expenseForm.amount),
      description: expenseForm.description,
      date: expenseForm.date,
    });
    setExpenseForm({ description: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0], notes: '' });
    setActiveModal(null);
  };

  const handleTransferSavings = () => {
    if (!savingsForm.goalId || !savingsForm.amount) return;
    addFundsToGoal(savingsForm.goalId, parseFloat(savingsForm.amount));
    setSavingsForm({ goalId: '', amount: '' });
    setActiveModal(null);
  };

  const handleAddGoal = () => {
    if (!goalForm.name || !goalForm.target) return;
    addGoal({
      name: goalForm.name,
      target: parseFloat(goalForm.target),
      current: 0,
      deadline: '2026-12-31',
      icon: 'Target',
      color: goalForm.color,
      monthlySavings: parseFloat(goalForm.monthlySavings) || 0,
    });
    setGoalForm({ name: '', target: '', monthlySavings: '', color: '#6366F1' });
    setActiveModal(null);
  };

  const handleDownloadReport = () => {
    const reportData = 'FinPilot Financial Report\nGenerated: ' + new Date().toLocaleDateString('en-IN');
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FinPilot-Report.txt';
    a.click();
    URL.revokeObjectURL(url);
    setActiveModal(null);
  };

  return (
    <>
      <GlassCard padding="none" className="overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">Quick Actions</h3>
          <p className="text-xs text-slate-400 mt-1">Manage your finances</p>
        </div>
        <div className="p-4 grid grid-cols-1 gap-2">
          {actions.map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (action.label === 'Download Report') {
                  handleDownloadReport();
                } else {
                  setActiveModal(action.label);
                }
              }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors w-full text-left"
            >
              <div className={`p-2 rounded-xl ${action.bg}`}>
                <action.icon size={16} style={{ color: action.color }} />
              </div>
              <span className="text-sm text-slate-300 font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Add Income Modal */}
      <Modal isOpen={activeModal === 'Add Income'} onClose={() => setActiveModal(null)} title="Add Income" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Source</label>
            <select
              value={incomeForm.category}
              onChange={(e) => setIncomeForm(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
            >
              {incomeCategories.map(c => (
                <option key={c} value={c} className="bg-slate-800">{CATEGORY_CONFIG[c]?.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Description</label>
            <input
              type="text"
              value={incomeForm.description}
              onChange={(e) => setIncomeForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Salary - January"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              value={incomeForm.amount}
              onChange={(e) => setIncomeForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Date</label>
            <input
              type="date"
              value={incomeForm.date}
              onChange={(e) => setIncomeForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <GlowButton onClick={handleAddIncome} className="w-full" size="lg" icon={<Check size={16} />}>
            Add Income
          </GlowButton>
        </div>
      </Modal>

      {/* Add Expense Modal */}
      <Modal isOpen={activeModal === 'Add Expense'} onClose={() => setActiveModal(null)} title="Add Expense" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Category</label>
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
            >
              {expenseCategories.map(c => (
                <option key={c} value={c} className="bg-slate-800">{CATEGORY_CONFIG[c]?.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Description</label>
            <input
              type="text"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Swiggy Order"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Date</label>
            <input
              type="date"
              value={expenseForm.date}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Notes (optional)</label>
            <input
              type="text"
              value={expenseForm.notes}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add a note..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <GlowButton onClick={handleAddExpense} className="w-full" size="lg" icon={<Check size={16} />}>
            Add Expense
          </GlowButton>
        </div>
      </Modal>

      {/* Transfer Savings Modal */}
      <Modal isOpen={activeModal === 'Transfer Savings'} onClose={() => setActiveModal(null)} title="Transfer to Savings Goal" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Select Goal</label>
            <select
              value={savingsForm.goalId}
              onChange={(e) => setSavingsForm(prev => ({ ...prev, goalId: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-800">Choose a goal...</option>
              {goals.map(g => (
                <option key={g.id} value={g.id} className="bg-slate-800">{g.name} — {Math.round((g.current / g.target) * 100)}% complete</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              value={savingsForm.amount}
              onChange={(e) => setSavingsForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <GlowButton
            onClick={handleTransferSavings}
            className="w-full"
            size="lg"
            icon={<Check size={16} />}
          >
            Transfer Funds
          </GlowButton>
        </div>
      </Modal>

      {/* Add Goal Modal */}
      <Modal isOpen={activeModal === 'Add Goal'} onClose={() => setActiveModal(null)} title="Create New Goal" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Goal Name</label>
            <input
              type="text"
              value={goalForm.name}
              onChange={(e) => setGoalForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Dream Vacation"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Target Amount (₹)</label>
            <input
              type="number"
              value={goalForm.target}
              onChange={(e) => setGoalForm(prev => ({ ...prev, target: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Monthly Savings (₹)</label>
            <input
              type="number"
              value={goalForm.monthlySavings}
              onChange={(e) => setGoalForm(prev => ({ ...prev, monthlySavings: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Color</label>
            <div className="flex gap-2">
              {goalColors.map(c => (
                <button
                  key={c}
                  onClick={() => setGoalForm(prev => ({ ...prev, color: c }))}
                  className={`w-8 h-8 rounded-lg transition-all ${goalForm.color === c ? 'ring-2 ring-white/50 scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <GlowButton onClick={handleAddGoal} className="w-full" size="lg" icon={<Check size={16} />}>
            Create Goal
          </GlowButton>
        </div>
      </Modal>
    </>
  );
}
