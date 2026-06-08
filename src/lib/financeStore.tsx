import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Transaction, Goal, Budget, Category } from '../types';
import { mockTransactions, mockGoals, mockBudgets } from '../data/mockData';
import { CATEGORY_CONFIG } from '../types';
import { generateId } from './utils';

export interface FinanceState {
  balance: number;
  transactions: Transaction[];
  goals: Goal[];
  budgets: Budget[];
}

export interface FinanceActions {
  setBalance: (amount: number) => void;
  setMonthlyIncome: (newTotal: number) => void;
  addTransaction: (t: Omit<Transaction, 'id' | 'icon'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addFundsToGoal: (id: string, amount: number) => void;
  setBudget: (category: Category, allocated: number) => void;
  getMonthlyIncome: () => number;
  getMonthlyExpenses: () => number;
  getMonthlySavings: () => number;
  getSavingsRatio: () => number;
  getExpenseRatio: () => number;
  getFinancialScore: () => number;
  getCategorySpending: () => { category: Category; amount: number; percentage: number; color: string }[];
}

const FinanceContext = createContext<(FinanceState & FinanceActions) | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalanceState] = useState(284500);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);

  const setBalance = useCallback((amount: number) => {
    setBalanceState(amount);
  }, []);

  const setMonthlyIncome = useCallback((newTotal: number) => {
    setTransactions(prev => {
      const incomeTransactions = prev.filter(t => t.type === 'income');
      const expenseTransactions = prev.filter(t => t.type === 'expense');
      const oldTotal = incomeTransactions.reduce((s, t) => s + t.amount, 0);
      const diff = newTotal - oldTotal;

      // Remove all old income, add single new income entry
      const config = CATEGORY_CONFIG['salary'];
      const newIncome: Transaction = {
        id: generateId(),
        type: 'income',
        category: 'salary',
        amount: newTotal,
        description: 'Monthly Income',
        date: new Date().toISOString().split('T')[0],
        icon: config?.icon || 'Briefcase',
      };

      // Adjust balance by the difference
      setBalanceState(b => b + diff);

      return [newIncome, ...expenseTransactions];
    });
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, 'id' | 'icon'>) => {
    const config = CATEGORY_CONFIG[t.category];
    const newT: Transaction = {
      ...t,
      id: generateId(),
      icon: config?.icon || 'MoreHorizontal',
    };
    setTransactions(prev => [newT, ...prev]);
    if (t.type === 'income') {
      setBalanceState(prev => prev + t.amount);
    } else {
      setBalanceState(prev => prev - t.amount);
    }
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => {
      if (t.id !== id) return t;
      const oldAmount = t.type === 'income' ? t.amount : -t.amount;
      const newType = updates.type || t.type;
      const newAmount = updates.amount !== undefined ? updates.amount : t.amount;
      const newAmountSigned = newType === 'income' ? newAmount : -newAmount;
      const diff = newAmountSigned - oldAmount;
      setBalanceState(prev => prev + diff);
      return { ...t, ...updates };
    }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => {
      const t = prev.find(tr => tr.id === id);
      if (t) {
        if (t.type === 'income') {
          setBalanceState(b => b - t.amount);
        } else {
          setBalanceState(b => b + t.amount);
        }
      }
      return prev.filter(tr => tr.id !== id);
    });
  }, []);

  const addGoal = useCallback((g: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...g, id: generateId() }]);
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  const addFundsToGoal = useCallback((id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== id) return g;
      const newCurrent = Math.min(g.current + amount, g.target);
      return { ...g, current: newCurrent };
    }));
    setBalanceState(prev => prev - amount);
  }, []);

  const setBudget = useCallback((category: Category, allocated: number) => {
    setBudgets(prev => {
      const existing = prev.find(b => b.category === category);
      if (existing) {
        return prev.map(b => b.category === category ? { ...b, allocated } : b);
      }
      const config = CATEGORY_CONFIG[category];
      return [...prev, { category, allocated, spent: 0, color: config?.color || '#6B7280' }];
    });
  }, []);

  const getMonthlyIncome = useCallback(() => {
    return transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const getMonthlyExpenses = useCallback(() => {
    return transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const getMonthlySavings = useCallback(() => {
    return getMonthlyIncome() - getMonthlyExpenses();
  }, [getMonthlyIncome, getMonthlyExpenses]);

  const getSavingsRatio = useCallback(() => {
    const income = getMonthlyIncome();
    if (income === 0) return 0;
    return Math.round((getMonthlySavings() / income) * 100);
  }, [getMonthlyIncome, getMonthlySavings]);

  const getExpenseRatio = useCallback(() => {
    const income = getMonthlyIncome();
    if (income === 0) return 0;
    return Math.round((getMonthlyExpenses() / income) * 100);
  }, [getMonthlyIncome, getMonthlyExpenses]);

  const getFinancialScore = useCallback(() => {
    const savingsRatio = getSavingsRatio();
    const income = getMonthlyIncome();
    const expenses = getMonthlyExpenses();

    let savingsScore = 0;
    if (savingsRatio >= 30) savingsScore = 100;
    else if (savingsRatio >= 20) savingsScore = 80;
    else if (savingsRatio >= 10) savingsScore = 60;
    else if (savingsRatio > 0) savingsScore = 40;
    else savingsScore = 10;

    const budgetControl = budgets.reduce((score, b) => {
      const pct = b.allocated > 0 ? (b.spent / b.allocated) * 100 : 0;
      if (pct <= 100) return score + 1;
      return score;
    }, 0);
    const budgetScore = budgets.length > 0 ? Math.round((budgetControl / budgets.length) * 100) : 50;

    const expenseStability = expenses > 0 && income > 0 ? Math.min(100, Math.round((1 - Math.abs(expenses - 45000) / 45000) * 100)) : 50;

    const total = Math.round(savingsScore * 0.4 + budgetScore * 0.3 + expenseStability * 0.3);
    return Math.min(100, Math.max(0, total));
  }, [getSavingsRatio, getMonthlyIncome, getMonthlyExpenses, budgets]);

  const getCategorySpending = useCallback(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const total = expenseTransactions.reduce((s, t) => s + t.amount, 0);
    const categoryMap = new Map<Category, number>();

    expenseTransactions.forEach(t => {
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
    });

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 1000) / 10 : 0,
      color: CATEGORY_CONFIG[category]?.color || '#6B7280',
    })).sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const value: FinanceState & FinanceActions = {
    balance,
    transactions,
    goals,
    budgets,
    setBalance,
    setMonthlyIncome,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addFundsToGoal,
    setBudget,
    getMonthlyIncome,
    getMonthlyExpenses,
    getMonthlySavings,
    getSavingsRatio,
    getExpenseRatio,
    getFinancialScore,
    getCategorySpending,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
}
