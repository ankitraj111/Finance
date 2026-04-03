'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BalanceTrendChartProps {
  data: Array<{
    date: string;
    balance: number;
  }>;
}

export function BalanceTrendChart({ data }: BalanceTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.65 0.18 265)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.65 0.18 265)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 231)" />
        <XAxis
          dataKey="date"
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
          formatter={(value) => [`$${value.toFixed(2)}`, 'Balance']}
        />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="oklch(0.65 0.18 265)"
          strokeWidth={2}
          dot={false}
          fill="url(#balanceGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
