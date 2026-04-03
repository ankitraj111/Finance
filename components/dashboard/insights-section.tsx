'use client';

import { Transaction, Insight } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryInsights } from './insights/category-insights';
import { MonthlyComparison } from './insights/monthly-comparison';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface InsightsSectionProps {
  transactions: Transaction[];
  insights: Insight[];
}

const insightAccents = [
  { bg: 'bg-violet-500/10 dark:bg-violet-500/20', icon: 'text-violet-600 dark:text-violet-400', bar: 'from-violet-500 to-purple-500' },
  { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', icon: 'text-emerald-600 dark:text-emerald-400', bar: 'from-emerald-500 to-teal-500' },
  { bg: 'bg-rose-500/10 dark:bg-rose-500/20', icon: 'text-rose-600 dark:text-rose-400', bar: 'from-rose-500 to-orange-500' },
  { bg: 'bg-amber-500/10 dark:bg-amber-500/20', icon: 'text-amber-600 dark:text-amber-400', bar: 'from-amber-500 to-yellow-500' },
];

export default function InsightsSection({ transactions, insights }: InsightsSectionProps) {
  const calculateHighestCategory = () => {
    const categorySpending: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
      });
    const sorted = Object.entries(categorySpending).sort((a, b) => b[1] - a[1]);
    return sorted[0];
  };

  const highestCategory = calculateHighestCategory();
  const avgAmount = transactions.length
    ? (transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)
    : '0.00';

  const observations = [
    highestCategory
      ? `Your highest spending category is **${highestCategory[0]}** ($${highestCategory[1].toFixed(2)}), accounting for a significant portion of expenses.`
      : 'No expense data available yet.',
    `You have **${transactions.filter((t) => t.type === 'income').length} income** transactions and **${transactions.filter((t) => t.type === 'expense').length} expense** transactions in this period.`,
    `Your average transaction amount is **$${avgAmount}**.`,
    `Consider setting a budget for your top spending categories to better control expenses.`,
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Financial Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Understand your spending patterns and financial trends
        </p>
      </div>

      {/* Insight stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const accent = insightAccents[index % insightAccents.length];
          return (
            <Card
              key={index}
              className={`relative overflow-hidden border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bar}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                      {insight.title}
                    </p>
                    <h3 className="text-xl font-extrabold text-foreground mt-2 truncate">{insight.value}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{insight.description}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${accent.bg}`}>
                    {insight.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
            <CardDescription className="text-xs">
              Expenses by category {highestCategory && `— ${highestCategory[0]} leads`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryInsights transactions={transactions} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Trend</CardTitle>
            <CardDescription className="text-xs">Income vs Expenses by month</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyComparison transactions={transactions} />
          </CardContent>
        </Card>
      </div>

      {/* Key Observations */}
      <Card className="border-border/50 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-500/15 dark:bg-violet-500/25 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Key Observations</CardTitle>
              <CardDescription className="text-xs">AI-powered spending analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {observations.map((obs, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span
                  className="text-sm text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: obs.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
