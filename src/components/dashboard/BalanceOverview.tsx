import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, IndianRupee, Pencil, Check, X } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Modal } from '../ui/Modal';
import { GlowButton } from '../ui/GlowButton';
import { useFinance } from '../../lib/financeStore';
import { formatCurrency } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  index: number;
  onEdit?: () => void;
  editable?: boolean;
}

function StatCard({ label, value, change, icon: Icon, color, bgColor, index, onEdit, editable = false }: StatCardProps) {
  return (
    <GlassCard
      hover
      glow="accent"
      padding="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
          <div className="mt-2">
            <AnimatedCounter
              value={value}
              format="currency"
              className="text-2xl font-bold text-white font-[family-name:var(--font-display)]"
              delay={index * 0.1}
            />
          </div>
          <div className="flex items-center gap-1 mt-2">
            {change > 0 ? (
              <TrendingUp size={14} className="text-green-400" />
            ) : (
              <TrendingDown size={14} className="text-red-400" />
            )}
            <span className={`text-xs font-medium ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {editable && onEdit && (
            <motion.button
              onClick={onEdit}
              className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Pencil size={14} />
            </motion.button>
          )}
          <div className={`p-2.5 rounded-xl ${bgColor}`}>
            <Icon size={20} style={{ color }} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

type EditMode = 'balance' | 'income' | null;

export function BalanceOverview() {
  const { balance, setBalance, setMonthlyIncome, getMonthlyIncome, getMonthlyExpenses, getMonthlySavings } = useFinance();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [editValue, setEditValue] = useState('');

  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const monthlySavings = getMonthlySavings();

  const stats = [
    {
      label: 'Total Balance',
      value: balance,
      change: 12.5,
      icon: Wallet,
      color: '#6366F1',
      bgColor: 'bg-indigo-500/10',
      editable: true,
    },
    {
      label: 'Monthly Income',
      value: monthlyIncome,
      change: 5.2,
      icon: IndianRupee,
      color: '#22C55E',
      bgColor: 'bg-green-500/10',
      editable: true,
    },
    {
      label: 'Monthly Expenses',
      value: monthlyExpenses,
      change: -8.3,
      icon: CreditCard,
      color: '#EF4444',
      bgColor: 'bg-red-500/10',
      editable: false,
    },
    {
      label: 'Monthly Savings',
      value: monthlySavings,
      change: 15.7,
      icon: PiggyBank,
      color: '#F59E0B',
      bgColor: 'bg-amber-500/10',
      editable: false,
    },
  ];

  const openEdit = (mode: EditMode, currentValue: number) => {
    setEditValue(currentValue.toString());
    setEditMode(mode);
  };

  const handleSave = () => {
    const newAmount = parseFloat(editValue);
    if (isNaN(newAmount) || newAmount < 0) {
      setEditMode(null);
      setEditValue('');
      return;
    }
    if (editMode === 'balance') {
      setBalance(newAmount);
    } else if (editMode === 'income') {
      setMonthlyIncome(newAmount);
    }
    setEditMode(null);
    setEditValue('');
  };

  const closeModal = () => {
    setEditMode(null);
    setEditValue('');
  };

  const modalTitle = editMode === 'balance' ? 'Edit Total Balance' : 'Edit Monthly Income';
  const modalLabel = editMode === 'balance' ? 'New Balance Amount (₹)' : 'New Monthly Income (₹)';
  const modalHint = editMode === 'balance'
    ? 'Manually set your total account balance. This overrides the current value.'
    : 'Set your total monthly income. This replaces your current income with the new amount. Your balance will adjust automatically.';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            index={index}
            onEdit={stat.editable ? () => openEdit(stat.label === 'Total Balance' ? 'balance' : 'income', stat.value) : undefined}
          />
        ))}
      </div>

      {/* Unified Edit Modal */}
      <Modal isOpen={editMode !== null} onClose={closeModal} title={modalTitle} size="sm">
        <div className="space-y-4">
          {/* Current value display */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Current Value</span>
              <span className="text-sm font-semibold text-white">
                {formatCurrency(editMode === 'balance' ? balance : monthlyIncome)}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">{modalLabel}</label>
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
            />
          </div>

          {editMode === 'income' && (
            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-indigo-400" />
                <span className="text-[11px] text-indigo-300">
                  Balance will {parseFloat(editValue || '0') > monthlyIncome ? 'increase' : 'decrease'} by{' '}
                  {formatCurrency(Math.abs((parseFloat(editValue || '0') || 0) - monthlyIncome))}
                </span>
              </div>
            </div>
          )}

          <p className="text-[11px] text-slate-500">{modalHint}</p>

          <div className="flex gap-3">
            <GlowButton onClick={handleSave} className="flex-1" size="md" icon={<Check size={16} />}>
              Save Changes
            </GlowButton>
            <GlowButton variant="secondary" onClick={closeModal} className="flex-1" size="md" icon={<X size={16} />}>
              Cancel
            </GlowButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
