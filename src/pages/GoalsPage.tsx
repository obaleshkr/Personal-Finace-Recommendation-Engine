import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Plane, Shield, Laptop, Bike, Calendar, Pencil, Trash2, Check, X, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import { Modal } from '../components/ui/Modal';
import { useFinance } from '../lib/financeStore';
import { formatCurrency } from '../lib/utils';
import type { Goal } from '../types';

const iconMap: Record<string, React.ElementType> = { Laptop, Plane, Shield, Bike, Target };

export function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal, addFundsToGoal } = useFinance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Goal>>({});
  const [showFundModal, setShowFundModal] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState('');
  const [newGoal, setNewGoal] = useState({ name: '', target: '', monthlySavings: '', icon: 'Target', color: '#6366F1' });

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.current, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const handleAdd = () => {
    if (!newGoal.name || !newGoal.target) return;
    addGoal({
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: '2026-12-31',
      icon: newGoal.icon,
      color: newGoal.color,
      monthlySavings: parseFloat(newGoal.monthlySavings) || 0,
    });
    setShowAddModal(false);
    setNewGoal({ name: '', target: '', monthlySavings: '', icon: 'Target', color: '#6366F1' });
  };

  const startEdit = (goal: Goal) => {
    setEditingGoal(goal.id);
    setEditForm({ name: goal.name, target: goal.target, monthlySavings: goal.monthlySavings });
  };

  const saveEdit = () => {
    if (editingGoal) {
      updateGoal(editingGoal, editForm);
      setEditingGoal(null);
      setEditForm({});
    }
  };

  const handleFund = () => {
    if (showFundModal && fundAmount) {
      addFundsToGoal(showFundModal, parseFloat(fundAmount));
      setShowFundModal(null);
      setFundAmount('');
    }
  };

  const colors = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Savings Goals</h1>
          <p className="text-sm text-slate-400 mt-1">Plan and track your financial goals</p>
        </div>
        <GlowButton size="sm" icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>New Goal</GlowButton>
      </div>

      {/* Overall Progress */}
      <GlassCard gradient className="!bg-gradient-to-r !from-indigo-500/10 !to-violet-500/10 !border-indigo-500/20">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
              <motion.circle
                cx="60" cy="60" r="50"
                stroke="#6366F1"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 50}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - overallProgress / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.4))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">{overallProgress}%</span>
              <span className="text-[10px] text-slate-400">Overall</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-display)]">Overall Progress</h2>
            <p className="text-sm text-slate-400 mt-1">
              You've saved <span className="text-indigo-400 font-semibold">{formatCurrency(totalSaved)}</span> out of <span className="text-white font-semibold">{formatCurrency(totalTarget)}</span>
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal, index) => {
          const Icon = iconMap[goal.icon] || Target;
          const progress = Math.round((goal.current / goal.target) * 100);
          const remaining = goal.target - goal.current;
          const monthsLeft = goal.monthlySavings > 0 ? Math.ceil(remaining / goal.monthlySavings) : Infinity;
          const isEditing = editingGoal === goal.id;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hover glow="accent" gradient className={`h-full ${isEditing ? '!border-indigo-500/30' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${goal.color}15` }}>
                      <Icon size={24} style={{ color: goal.color }} />
                    </div>
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-display)]">{goal.name}</h3>
                      )}
                      <div className="flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-slate-500" />
                        <span className="text-xs text-slate-400">{monthsLeft !== Infinity ? `${monthsLeft} months left` : 'Set monthly savings'}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: goal.color }}>{progress}%</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Saved: <span className="text-white font-medium">{formatCurrency(goal.current)}</span></span>
                    <span className="text-slate-400">Target: <span className="text-white font-medium">{formatCurrency(goal.target)}</span></span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: goal.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{formatCurrency(goal.monthlySavings)}/month</span>
                    <span className="text-xs text-slate-500">{formatCurrency(remaining)} remaining</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  {isEditing ? (
                    <>
                      <GlowButton size="sm" icon={<Check size={14} />} onClick={saveEdit}>Save</GlowButton>
                      <GlowButton variant="secondary" size="sm" icon={<X size={14} />} onClick={() => { setEditingGoal(null); setEditForm({}); }}>Cancel</GlowButton>
                    </>
                  ) : (
                    <>
                      <GlowButton size="sm" onClick={() => setShowFundModal(goal.id)}>Add Funds</GlowButton>
                      <GlowButton variant="secondary" size="sm" icon={<Pencil size={14} />} onClick={() => startEdit(goal)}>Edit</GlowButton>
                      <GlowButton variant="ghost" size="sm" icon={<Trash2 size={14} />} onClick={() => { if (confirm(`Delete "${goal.name}"?`)) deleteGoal(goal.id); }}>Delete</GlowButton>
                    </>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create New Goal" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Goal Name</label>
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Dream Vacation"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Target Amount (₹)</label>
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Monthly Savings (₹)</label>
            <input
              type="number"
              value={newGoal.monthlySavings}
              onChange={(e) => setNewGoal(prev => ({ ...prev, monthlySavings: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Color</label>
            <div className="flex gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setNewGoal(prev => ({ ...prev, color: c }))}
                  className={`w-8 h-8 rounded-lg transition-all ${newGoal.color === c ? 'ring-2 ring-white/50 scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <GlowButton onClick={handleAdd} className="w-full" size="lg">Create Goal</GlowButton>
        </div>
      </Modal>

      {/* Add Funds Modal */}
      <Modal isOpen={!!showFundModal} onClose={() => { setShowFundModal(null); setFundAmount(''); }} title="Add Funds to Goal" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Add funds to <span className="text-white font-medium">{goals.find(g => g.id === showFundModal)?.name}</span>
          </p>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
              autoFocus
            />
          </div>
          <GlowButton onClick={handleFund} className="w-full" size="lg" icon={<Check size={16} />}>
            Add Funds
          </GlowButton>
        </div>
      </Modal>
    </div>
  );
}
