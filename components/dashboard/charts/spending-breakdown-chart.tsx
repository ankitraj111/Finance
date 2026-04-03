'use client';

import { Transaction } from '@/types';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SpendingBreakdownChartProps {
  transactions: Transaction[];
}

const COLORS = [
  'oklch(0.65 0.18 265)',
  'oklch(0.7 0.15 200)',
  'oklch(0.55 0.12 140)',
  'oklch(0.75 0.14 85)',
  'oklch(0.6 0.16 30)',
  'oklch(0.62 0.22 25)',
];

export function SpendingBreakdownChart({ transactions }: SpendingBreakdownChartProps) {
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, transaction) => {
        const existing = acc.find((item) => item.name === transaction.category);
        if (existing) {
          existing.value += transaction.amount;
        } else {
          acc.push({ name: transaction.category, value: transaction.amount });
        }
        return acc;
      },
      [] as Array<{ name: string; value: number }>
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  if (expensesByCategory.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No expense data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={expensesByCategory}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {expensesByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(1 0 0)',
            border: '1px solid oklch(0.92 0.01 231)',
            borderRadius: '8px',
            color: 'oklch(0.18 0.004 231.56)',
          }}
          formatter={(value) => `$${value.toFixed(2)}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
