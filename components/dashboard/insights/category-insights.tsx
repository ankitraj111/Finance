'use client';

import { Transaction } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CategoryInsightsProps {
  transactions: Transaction[];
}

export function CategoryInsights({ transactions }: CategoryInsightsProps) {
  const categoryData = transactions
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
    .slice(0, 8);

  if (categoryData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No expense data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 231)" />
        <XAxis
          dataKey="name"
          stroke="oklch(0.5 0.01 231)"
          style={{ fontSize: '12px' }}
          angle={-45}
          textAnchor="end"
          height={100}
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
          formatter={(value) => [`$${value.toFixed(2)}`, 'Spending']}
        />
        <Bar
          dataKey="value"
          fill="oklch(0.65 0.18 265)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
