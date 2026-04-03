'use client';

import { Transaction } from '@/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyComparisonProps {
  transactions: Transaction[];
}

export function MonthlyComparison({ transactions }: MonthlyComparisonProps) {
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0 };
    }

    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  const chartData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

  if (chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 231)" />
        <XAxis
          dataKey="month"
          stroke="oklch(0.5 0.01 231)"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="oklch(0.5 0.01 231)"
          style={{ fontSize: '12px' }}
          formatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(1 0 0)',
            border: '1px solid oklch(0.92 0.01 231)',
            borderRadius: '8px',
            color: 'oklch(0.18 0.004 231.56)',
          }}
          formatter={(value) => `$${value.toFixed(2)}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="oklch(0.7 0.15 200)"
          strokeWidth={2}
          dot={false}
          fill="url(#incomeGradient)"
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="oklch(0.62 0.22 25)"
          strokeWidth={2}
          dot={false}
          fill="url(#expenseGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
