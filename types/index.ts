export type Role = 'viewer' | 'admin';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface Insight {
  title: string;
  value: string;
  description: string;
  icon: string;
}

export interface SummaryCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}
