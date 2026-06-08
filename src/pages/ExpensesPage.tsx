import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  UtensilsCrossed,
  Plane,
  Receipt,
  ShoppingBag,
  GraduationCap,
  Heart,
  Gamepad2,
  TrendingUp,
  Briefcase,
  Laptop,
  MoreHorizontal,
  Download,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowButton } from '../components/ui/GlowButton';
import { Modal } from '../components/ui/Modal';
import { useFinance } from '../lib/financeStore';
import { CATEGORY_CONFIG, type Category, type Transaction } from '../types';
import { formatCurrency, formatDate, generateId } from '../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed, Plane, Receipt, ShoppingBag, GraduationCap, Heart, Gamepad2, TrendingUp, Briefcase, Laptop, MoreHorizontal,
};

const categories: Category[] = ['food', 'travel', 'bills', 'shopping', 'education', 'healthcare', 'entertainment', 'investments', 'salary', 'freelance'];

export function ExpensesPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, getMonthlyIncome, getMonthlyExpenses } = useFinance();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: 'food' as Category,
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesType = selectedType === 'all' || t.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalIncome = getMonthlyIncome();
  const totalExpense = getMonthlyExpenses();

  const handleAdd = () => {
    if (!newTransaction.description || !newTransaction.amount) return;
    addTransaction({
      type: newTransaction.type,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
    });
    setShowAddModal(false);
    setNewTransaction({ description: '', amount: '', category: 'food', type: 'expense', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setEditForm({ description: t.description, amount: t.amount, category: t.category, type: t.type, date: t.date });
  };

  const saveEdit = () => {
    if (editingId) {
      updateTransaction(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Expenses</h1>
          <p className="text-sm text-slate-400 mt-1">Track and manage your transactions</p>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="secondary" size="sm" icon={<Download size={16} />}>Export</GlowButton>
          <GlowButton size="sm" icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>Add Transaction</GlowButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard hover glow="success">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <ArrowUpRight size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Income</p>
              <p className="text-lg font-bold text-green-400">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover glow="danger">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <ArrowDownRight size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Expenses</p>
              <p className="text-lg font-bold text-red-400">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard hover glow="accent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <SlidersHorizontal size={18} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Net Balance</p>
              <p className="text-lg font-bold text-indigo-400">{formatCurrency(totalIncome - totalExpense)}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c} className="bg-slate-800">{CATEGORY_CONFIG[c]?.label}</option>
              ))}
            </select>
            <div className="flex bg-white/5 rounded-xl border border-white/10 p-0.5">
              {(['all', 'income', 'expense'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all capitalize ${
                    selectedType === type ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Transaction List */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((transaction, index) => {
            const config = CATEGORY_CONFIG[transaction.category];
            const Icon = iconMap[transaction.icon || ''] || iconMap[config?.icon || ''] || MoreHorizontal;
            const isEditing = editingId === transaction.id;

            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03 }}
              >
                <GlassCard hover padding="sm" className={`!rounded-xl group ${isEditing ? '!border-indigo-500/30' : ''}`}>
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-500 mb-1 block">Description</label>
                          <input
                            type="text"
                            value={editForm.description || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 mb-1 block">Amount (₹)</label>
                          <input
                            type="number"
                            value={editForm.amount || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-500 mb-1 block">Category</label>
                          <select
                            value={editForm.category || 'food'}
                            onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value as Category }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none"
                          >
                            {categories.map(c => (
                              <option key={c} value={c} className="bg-slate-800">{CATEGORY_CONFIG[c]?.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 mb-1 block">Date</label>
                          <input
                            type="date"
                            value={editForm.date || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                          <X size={12} /> Cancel
                        </button>
                        <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-colors font-medium">
                          <Check size={12} /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl shrink-0"
                        style={{ backgroundColor: `${config?.color || '#6B7280'}15` }}
                      >
                        <Icon size={18} style={{ color: config?.color || '#6B7280' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500">{config?.label}</span>
                          <span className="text-xs text-slate-600">•</span>
                          <span className="text-xs text-slate-500">{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          onClick={() => startEdit(transaction)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-indigo-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Pencil size={14} />
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            if (confirm('Delete this transaction?')) deleteTransaction(transaction.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No transactions found</p>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Transaction" size="md">
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['expense', 'income'] as const).map(type => (
              <button
                key={type}
                onClick={() => setNewTransaction(prev => ({ ...prev, type }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${
                  newTransaction.type === type
                    ? type === 'income'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Description</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Swiggy Order"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Category</label>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value as Category }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c} className="bg-slate-800">{CATEGORY_CONFIG[c]?.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">Date</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium mb-1.5 block">Notes (optional)</label>
            <input
              type="text"
              value={newTransaction.notes}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add a note..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <GlowButton onClick={handleAdd} className="w-full" size="lg">
            Add Transaction
          </GlowButton>
        </div>
      </Modal>
    </div>
  );
}
