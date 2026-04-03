'use client';

import { LayoutDashboard, TrendingUp, BarChart3, Sparkles } from 'lucide-react';

interface DashboardNavProps {
  currentPage: 'overview' | 'transactions' | 'insights';
  setCurrentPage: (page: 'overview' | 'transactions' | 'insights') => void;
}

export default function DashboardNav({
  currentPage,
  setCurrentPage,
}: DashboardNavProps) {
  const navItems = [
    {
      id: 'overview' as const,
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Summary & charts',
    },
    {
      id: 'transactions' as const,
      label: 'Transactions',
      icon: TrendingUp,
      description: 'All activity',
    },
    {
      id: 'insights' as const,
      label: 'Insights',
      icon: BarChart3,
      description: 'Spending patterns',
    },
  ];

  return (
    <nav className="hidden md:flex w-64 flex-col bg-zinc-50 dark:bg-[#0a0a0f] border-r border-zinc-200 dark:border-zinc-800/50">
      {/* Logo */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--primary), oklch(0.75 0.22 290))' }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-base tracking-tight">
              FinancePro
            </span>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-none mt-0.5">Smart Finance</p>
          </div>
        </div>

        {/* Nav label */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 ml-1">
          Navigation
        </p>

        {/* Nav items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-zinc-200/80 dark:bg-zinc-800 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-none">{item.label}</p>
                  <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/60' : 'text-zinc-400 dark:text-zinc-500'}`}>
                    {item.description}
                  </p>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="px-5 py-5 border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">FP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">FinancePro</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">© 2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
