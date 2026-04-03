'use client';

import { Transaction } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BalanceTrendChart } from './charts/balance-trend-chart';
import { SpendingBreakdownChart } from './charts/spending-breakdown-chart';
import { SummaryCards } from './summary-cards';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatDateShort, formatDate } from '@/lib/date-utils';

interface DashboardOverviewProps {
  transactions: Transaction[];
}

export default function DashboardOverview({ transactions }: DashboardOverviewProps) {
  const calculateStats = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const balanceHistory: { date: string; balance: number }[] = [];
    let runningBalance = 0;

    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedTransactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
        runningBalance += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
        runningBalance -= transaction.amount;
      }
      balanceHistory.push({ date: formatDateShort(transaction.date), balance: runningBalance });
    });

    return { balance: totalIncome - totalExpenses, totalIncome, totalExpenses, balanceHistory };
  };

  const stats = calculateStats();

  const summaryCards = [
    { title: 'Total Balance', value: `$${stats.balance.toFixed(2)}`, change: '+12.5%', icon: '💼', trend: 'up' as const },
    { title: 'Total Income', value: `$${stats.totalIncome.toFixed(2)}`, change: '+8.2%', icon: '📈', trend: 'up' as const },
    { title: 'Total Expenses', value: `$${stats.totalExpenses.toFixed(2)}`, change: '+3.1%', icon: '📉', trend: 'down' as const },
  ];

  return (
    <div className="space-y-6">
      <SummaryCards cards={summaryCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Balance Trend</CardTitle>
            <CardDescription className="text-xs">Your balance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <BalanceTrendChart data={stats.balanceHistory} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Spending Breakdown</CardTitle>
            <CardDescription className="text-xs">Expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingBreakdownChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
          <CardDescription className="text-xs">Your latest 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/50">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'income'
                        ? 'bg-emerald-500/15 dark:bg-emerald-500/20'
                        : 'bg-rose-500/15 dark:bg-rose-500/20'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowDownRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{transaction.description}</p>
                    <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground mt-0.5">
                      {transaction.category}
                    </span>
                  </div>
                </div>
                <div className="text-right pl-4 flex-shrink-0">
                  <p
                    className={`text-sm font-bold ${
                      transaction.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{formatDate(transaction.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
