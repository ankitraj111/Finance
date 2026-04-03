import { Card, CardContent } from '@/components/ui/card';
import { SummaryCard as SummaryCardType } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  cards: SummaryCardType[];
}

const cardAccents = [
  {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    icon: 'text-blue-600 dark:text-blue-400',
    glow: 'hover:shadow-blue-500/20',
    bar: 'from-blue-500 to-violet-500',
  },
  {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    icon: 'text-emerald-600 dark:text-emerald-400',
    glow: 'hover:shadow-emerald-500/20',
    bar: 'from-emerald-500 to-teal-500',
  },
  {
    bg: 'bg-rose-500/10 dark:bg-rose-500/20',
    icon: 'text-rose-600 dark:text-rose-400',
    glow: 'hover:shadow-rose-500/20',
    bar: 'from-rose-500 to-orange-500',
  },
];

export function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, index) => {
        const accent = cardAccents[index] ?? cardAccents[0];
        return (
          <Card
            key={index}
            className={`relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-xl ${accent.glow} hover:-translate-y-1`}
          >
            {/* Top gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bar}`} />

            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {card.title}
                  </p>
                  <h3 className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">
                    {card.value}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {card.trend === 'up' ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        card.trend === 'up'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {card.change}
                    </span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </div>

                {/* Icon badge */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ml-4 flex-shrink-0 ${accent.bg}`}>
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
