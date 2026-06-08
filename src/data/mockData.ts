import type {
  Transaction,
  Budget,
  Goal,
  Recommendation,
  FinancialScore,
  Prediction,
  Notification,
  Achievement,
  MonthlyData,
  CategorySpending,
} from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'expense', category: 'food', amount: 450, description: 'Swiggy - Biryani Paradise', date: '2025-01-15', icon: 'UtensilsCrossed' },
  { id: '2', type: 'expense', category: 'travel', amount: 1200, description: 'Uber - Airport Drop', date: '2025-01-14', icon: 'Plane' },
  { id: '3', type: 'income', category: 'salary', amount: 85000, description: 'Salary - January 2025', date: '2025-01-01', icon: 'Briefcase' },
  { id: '4', type: 'expense', category: 'bills', amount: 2800, description: 'Electricity Bill - Dec', date: '2025-01-10', icon: 'Receipt' },
  { id: '5', type: 'expense', category: 'shopping', amount: 3500, description: 'Amazon - Headphones', date: '2025-01-12', icon: 'ShoppingBag' },
  { id: '6', type: 'expense', category: 'entertainment', amount: 750, description: 'Netflix + Spotify', date: '2025-01-05', icon: 'Gamepad2' },
  { id: '7', type: 'expense', category: 'healthcare', amount: 1500, description: 'Apollo Pharmacy', date: '2025-01-08', icon: 'Heart' },
  { id: '8', type: 'expense', category: 'food', amount: 320, description: 'Zomato - Pizza Hut', date: '2025-01-13', icon: 'UtensilsCrossed' },
  { id: '9', type: 'expense', category: 'education', amount: 4999, description: 'Udemy - ML Course', date: '2025-01-06', icon: 'GraduationCap' },
  { id: '10', type: 'expense', category: 'investments', amount: 10000, description: 'SIP - Nifty 50 Index', date: '2025-01-05', icon: 'TrendingUp' },
  { id: '11', type: 'income', category: 'freelance', amount: 15000, description: 'Freelance Project - UI Design', date: '2025-01-11', icon: 'Laptop' },
  { id: '12', type: 'expense', category: 'bills', amount: 999, description: 'Jio Fiber - Monthly', date: '2025-01-03', icon: 'Receipt' },
  { id: '13', type: 'expense', category: 'food', amount: 280, description: 'Starbucks Coffee', date: '2025-01-09', icon: 'UtensilsCrossed' },
  { id: '14', type: 'expense', category: 'travel', amount: 550, description: 'Ola - Office Commute', date: '2025-01-07', icon: 'Plane' },
  { id: '15', type: 'expense', category: 'shopping', amount: 2200, description: 'Myntra - Winter Jacket', date: '2025-01-04', icon: 'ShoppingBag' },
  { id: '16', type: 'expense', category: 'food', amount: 650, description: 'Dominos - Weekend Treat', date: '2025-01-16', icon: 'UtensilsCrossed' },
  { id: '17', type: 'expense', category: 'bills', amount: 1800, description: 'Airtel Postpaid', date: '2025-01-02', icon: 'Receipt' },
  { id: '18', type: 'expense', category: 'entertainment', amount: 1200, description: 'BookMyShow - Concert', date: '2025-01-17', icon: 'Gamepad2' },
  { id: '19', type: 'expense', category: 'healthcare', amount: 800, description: 'Gym Membership', date: '2025-01-01', icon: 'Heart' },
  { id: '20', type: 'expense', category: 'investments', amount: 5000, description: 'PPF Contribution', date: '2025-01-05', icon: 'TrendingUp' },
];

export const mockBudgets: Budget[] = [
  { category: 'food', allocated: 8000, spent: 6700, color: '#F59E0B' },
  { category: 'travel', allocated: 5000, spent: 4350, color: '#3B82F6' },
  { category: 'bills', allocated: 6000, spent: 5599, color: '#EF4444' },
  { category: 'shopping', allocated: 5000, spent: 5700, color: '#EC4899' },
  { category: 'entertainment', allocated: 3000, spent: 1950, color: '#F97316' },
  { category: 'education', allocated: 5000, spent: 4999, color: '#8B5CF6' },
  { category: 'healthcare', allocated: 3000, spent: 2300, color: '#22C55E' },
  { category: 'investments', allocated: 15000, spent: 15000, color: '#6366F1' },
];

export const mockGoals: Goal[] = [
  { id: '1', name: 'MacBook Pro M4', target: 150000, current: 97500, deadline: '2025-06-30', icon: 'Laptop', color: '#6366F1', monthlySavings: 10500 },
  { id: '2', name: 'Japan Vacation', target: 200000, current: 65000, deadline: '2025-12-31', icon: 'Plane', color: '#3B82F6', monthlySavings: 15000 },
  { id: '3', name: 'Emergency Fund', target: 300000, current: 180000, deadline: '2025-09-30', icon: 'Shield', color: '#22C55E', monthlySavings: 20000 },
  { id: '4', name: 'Royal Enfield', target: 180000, current: 45000, deadline: '2026-03-31', icon: 'Bike', color: '#F59E0B', monthlySavings: 10000 },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Shopping Budget Exceeded',
    description: 'You\'ve spent ₹5,700 this month on shopping, exceeding your ₹5,000 budget by 14%. Consider pausing non-essential purchases.',
    impact: 'Save ₹700/month',
    priority: 'high',
    icon: 'AlertTriangle',
  },
  {
    id: '2',
    type: 'insight',
    title: 'Food Delivery Overspending',
    description: 'You spend 25% more on food delivery than similar users. Cooking at home 3 more days/week could save significantly.',
    impact: 'Save ₹2,500/month',
    priority: 'high',
    icon: 'Lightbulb',
  },
  {
    id: '3',
    type: 'saving',
    title: 'Auto-Save Opportunity',
    description: 'Based on your spending pattern, you can comfortably auto-save ₹8,000 on the 15th of every month without impact.',
    impact: '₹96,000/year',
    priority: 'medium',
    icon: 'PiggyBank',
  },
  {
    id: '4',
    type: 'budget',
    title: 'Optimize Subscription Costs',
    description: 'You have ₹1,950 in monthly subscriptions. Switching to annual plans can save ~20% on Netflix, Spotify, and others.',
    impact: 'Save ₹4,680/year',
    priority: 'medium',
    icon: 'CreditCard',
  },
  {
    id: '5',
    type: 'insight',
    title: 'MacBook Goal Achievable',
    description: 'At your current savings rate, you can achieve your MacBook goal by June 2025. Just ₹52,500 more needed!',
    impact: '6 months to goal',
    priority: 'low',
    icon: 'Target',
  },
  {
    id: '6',
    type: 'alert',
    title: 'Travel Expenses Rising',
    description: 'Your travel costs increased 35% this month. Consider carpooling or public transport for daily commute.',
    impact: 'Save ₹1,800/month',
    priority: 'medium',
    icon: 'TrendingUp',
  },
];

export const mockFinancialScore: FinancialScore = {
  score: 72,
  savingsRatio: 68,
  expenseStability: 75,
  debtRatio: 85,
  monthlyTrend: 60,
};

export const mockPredictions: Prediction[] = [
  { month: 'Aug', predicted: 42000, actual: 39500, lowerBound: 36000, upperBound: 48000 },
  { month: 'Sep', predicted: 44000, actual: 43200, lowerBound: 38000, upperBound: 50000 },
  { month: 'Oct', predicted: 46000, actual: 45800, lowerBound: 40000, upperBound: 52000 },
  { month: 'Nov', predicted: 48000, actual: 49500, lowerBound: 42000, upperBound: 54000 },
  { month: 'Dec', predicted: 52000, actual: 51000, lowerBound: 46000, upperBound: 58000 },
  { month: 'Jan', predicted: 47000, actual: 45899, lowerBound: 41000, upperBound: 53000 },
  { month: 'Feb', predicted: 45000, lowerBound: 39000, upperBound: 51000 },
  { month: 'Mar', predicted: 43000, lowerBound: 37000, upperBound: 49000 },
  { month: 'Apr', predicted: 46000, lowerBound: 40000, upperBound: 52000 },
  { month: 'May', predicted: 48000, lowerBound: 42000, upperBound: 54000 },
  { month: 'Jun', predicted: 50000, lowerBound: 44000, upperBound: 56000 },
];

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Aug', income: 85000, expenses: 39500, savings: 45500 },
  { month: 'Sep', income: 92000, expenses: 43200, savings: 48800 },
  { month: 'Oct', income: 85000, expenses: 45800, savings: 39200 },
  { month: 'Nov', income: 100000, expenses: 49500, savings: 50500 },
  { month: 'Dec', income: 95000, expenses: 51000, savings: 44000 },
  { month: 'Jan', income: 100000, expenses: 45899, savings: 54101 },
];

export const mockCategorySpending: CategorySpending[] = [
  { category: 'food', amount: 6700, percentage: 14.6, color: '#F59E0B' },
  { category: 'travel', amount: 4350, percentage: 9.5, color: '#3B82F6' },
  { category: 'bills', amount: 5599, percentage: 12.2, color: '#EF4444' },
  { category: 'shopping', amount: 5700, percentage: 12.4, color: '#EC4899' },
  { category: 'entertainment', amount: 1950, percentage: 4.2, color: '#F97316' },
  { category: 'education', amount: 4999, percentage: 10.9, color: '#8B5CF6' },
  { category: 'healthcare', amount: 2300, percentage: 5.0, color: '#22C55E' },
  { category: 'investments', amount: 15000, percentage: 32.7, color: '#6366F1' },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Budget Alert', message: 'Shopping budget exceeded by 14%', type: 'warning', time: '2 min ago', read: false },
  { id: '2', title: 'Goal Update', message: 'MacBook goal is 65% complete!', type: 'success', time: '1 hour ago', read: false },
  { id: '3', title: 'Spending Insight', message: 'Your food expenses dropped 12% this week', type: 'info', time: '3 hours ago', read: true },
  { id: '4', title: 'Salary Credited', message: '₹85,000 credited to your account', type: 'success', time: '1 day ago', read: true },
  { id: '5', title: 'Unusual Spending', message: 'Travel expense spike detected', type: 'alert', time: '2 days ago', read: true },
];

export const mockAchievements: Achievement[] = [
  { id: '1', name: 'First Budget', description: 'Created your first budget', icon: '🎯', earned: true, date: '2024-08-15' },
  { id: '2', name: 'Savings Streak', description: 'Saved for 3 consecutive months', icon: '🔥', earned: true, date: '2024-11-30', progress: 100 },
  { id: '3', name: 'Goal Crusher', description: 'Completed a savings goal', icon: '🏆', earned: false, progress: 65 },
  { id: '4', name: 'Budget Master', description: 'Stayed within budget for 6 months', icon: '👑', earned: false, progress: 50 },
  { id: '5', name: 'Smart Investor', description: 'Invested ₹1L+ total', icon: '📈', earned: true, date: '2025-01-05', progress: 100 },
  { id: '6', name: 'Expense Tracker', description: 'Logged 100+ transactions', icon: '📝', earned: true, date: '2024-12-20', progress: 100 },
  { id: '7', name: 'Debt Free', description: 'Zero debt for 12 months', icon: '🎉', earned: false, progress: 83 },
  { id: '8', name: 'Super Saver', description: 'Saved ₹5L+ total', icon: '💎', earned: false, progress: 36 },
];

export const weeklySpendingData = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 850 },
  { day: 'Wed', amount: 2100 },
  { day: 'Thu', amount: 450 },
  { day: 'Fri', amount: 3200 },
  { day: 'Sat', amount: 5600 },
  { day: 'Sun', amount: 2800 },
];

export const savingsPredictionData = [
  { month: 'Aug', actual: 45500, predicted: null },
  { month: 'Sep', actual: 48800, predicted: null },
  { month: 'Oct', actual: 39200, predicted: null },
  { month: 'Nov', actual: 50500, predicted: null },
  { month: 'Dec', actual: 44000, predicted: null },
  { month: 'Jan', actual: 54101, predicted: null },
  { month: 'Feb', actual: null, predicted: 52000 },
  { month: 'Mar', actual: null, predicted: 54000 },
  { month: 'Apr', actual: null, predicted: 56000 },
  { month: 'May', actual: null, predicted: 53000 },
  { month: 'Jun', actual: null, predicted: 58000 },
];

export const expenseForecastData = [
  { month: 'Aug', actual: 39500, forecast: null, lower: null, upper: null },
  { month: 'Sep', actual: 43200, forecast: null, lower: null, upper: null },
  { month: 'Oct', actual: 45800, forecast: null, lower: null, upper: null },
  { month: 'Nov', actual: 49500, forecast: null, lower: null, upper: null },
  { month: 'Dec', actual: 51000, forecast: null, lower: null, upper: null },
  { month: 'Jan', actual: 45899, forecast: null, lower: null, upper: null },
  { month: 'Feb', actual: null, forecast: 45000, lower: 39000, upper: 51000 },
  { month: 'Mar', actual: null, forecast: 43000, lower: 37000, upper: 49000 },
  { month: 'Apr', actual: null, forecast: 46000, lower: 40000, upper: 52000 },
  { month: 'May', actual: null, forecast: 48000, lower: 42000, upper: 54000 },
  { month: 'Jun', actual: null, forecast: 50000, lower: 44000, upper: 56000 },
];
