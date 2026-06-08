export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: Category;
  amount: number;
  description: string;
  date: string;
  icon?: string;
}

export type Category =
  | 'food'
  | 'travel'
  | 'bills'
  | 'shopping'
  | 'education'
  | 'healthcare'
  | 'entertainment'
  | 'investments'
  | 'salary'
  | 'freelance'
  | 'other';

export interface Budget {
  category: Category;
  allocated: number;
  spent: number;
  color: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
  color: string;
  monthlySavings: number;
}

export interface Recommendation {
  id: string;
  type: 'saving' | 'budget' | 'insight' | 'alert';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface FinancialScore {
  score: number;
  savingsRatio: number;
  expenseStability: number;
  debtRatio: number;
  monthlyTrend: number;
}

export interface Prediction {
  month: string;
  predicted: number;
  actual?: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  time: string;
  read: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  progress?: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategorySpending {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}

export const CATEGORY_CONFIG: Record<Category, { label: string; icon: string; color: string }> = {
  food: { label: 'Food & Dining', icon: 'UtensilsCrossed', color: '#F59E0B' },
  travel: { label: 'Travel', icon: 'Plane', color: '#3B82F6' },
  bills: { label: 'Bills & Utilities', icon: 'Receipt', color: '#EF4444' },
  shopping: { label: 'Shopping', icon: 'ShoppingBag', color: '#EC4899' },
  education: { label: 'Education', icon: 'GraduationCap', color: '#8B5CF6' },
  healthcare: { label: 'Healthcare', icon: 'Heart', color: '#22C55E' },
  entertainment: { label: 'Entertainment', icon: 'Gamepad2', color: '#F97316' },
  investments: { label: 'Investments', icon: 'TrendingUp', color: '#6366F1' },
  salary: { label: 'Salary', icon: 'Briefcase', color: '#22C55E' },
  freelance: { label: 'Freelance', icon: 'Laptop', color: '#14B8A6' },
  other: { label: 'Other', icon: 'MoreHorizontal', color: '#6B7280' },
};
