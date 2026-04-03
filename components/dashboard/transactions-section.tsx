'use client';

import { Transaction, Role } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionTable } from './transaction-table';
import { AddTransactionDialog } from './add-transaction-dialog';
import { categories } from '@/data/mock-data';
import { Search, Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

interface TransactionsSectionProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  currentRole: Role;
  filteredCategory: string | null;
  setFilteredCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'date' | 'amount';
  setSortBy: (sort: 'date' | 'amount') => void;
}

export default function TransactionsSection({
  transactions,
  onAddTransaction,
  currentRole,
  filteredCategory,
  setFilteredCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: TransactionsSectionProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const expenseAmount = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const incomeAmount = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const statCards = [
    {
      label: 'Total Volume',
      value: `$${totalAmount.toFixed(2)}`,
      color: 'text-foreground',
      bar: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Total Income',
      value: `$${incomeAmount.toFixed(2)}`,
      color: 'text-emerald-600 dark:text-emerald-400',
      bar: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Total Expenses',
      value: `$${expenseAmount.toFixed(2)}`,
      color: 'text-rose-600 dark:text-rose-400',
      bar: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and analyze all your financial transactions
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="relative overflow-hidden border-border/50 bg-card shadow-sm">
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.bar}`} />
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {card.label}
              </p>
              <p className={`text-2xl font-extrabold mt-2 ${card.color}`}>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main table card */}
      <Card className="border-border/50 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">All Transactions</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            {currentRole === 'admin' && (
              <AddTransactionDialog onAdd={onAddTransaction} setOpen={setShowAddDialog}>
                <Button
                  size="sm"
                  className="gap-1.5 rounded-xl h-9 px-4 bg-primary hover:bg-primary/90 shadow-md shadow-primary/30"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Transaction
                </Button>
              </AddTransactionDialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-xl border-border/60 bg-background/60 text-sm"
                />
              </div>

              <Select
                value={filteredCategory || 'all'}
                onValueChange={(value) => setFilteredCategory(value === 'all' ? null : value)}
              >
                <SelectTrigger className="w-full md:w-44 h-9 rounded-xl border-border/60 bg-background/60 text-sm gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as 'date' | 'amount')}
              >
                <SelectTrigger className="w-full md:w-38 h-9 rounded-xl border-border/60 bg-background/60 text-sm gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {transactions.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">No transactions found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <TransactionTable transactions={transactions} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
