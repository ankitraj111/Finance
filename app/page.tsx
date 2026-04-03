'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardNav from '@/components/dashboard/dashboard-nav';
import DashboardOverview from '@/components/dashboard/dashboard-overview';
import TransactionsSection from '@/components/dashboard/transactions-section';
import InsightsSection from '@/components/dashboard/insights-section';
import { Transaction, Role } from '@/types';
import { mockTransactions, mockInsights } from '@/data/mock-data';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<Role>('viewer');
  const [currentPage, setCurrentPage] = useState<'overview' | 'transactions' | 'insights'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filterTransactions = () => {
    let result = transactions;

    if (filteredCategory) {
      result = result.filter(t => t.category === filteredCategory);
    }

    if (searchQuery) {
      result = result.filter(t =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'date') {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      result = [...result].sort((a, b) => b.amount - a.amount);
    }

    return result;
  };

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    if (currentRole === 'admin') {
      const newTransaction: Transaction = {
        ...transaction,
        id: String(Date.now()),
      };
      setTransactions([newTransaction, ...transactions]);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader currentRole={currentRole} setCurrentRole={setCurrentRole} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {currentPage === 'overview' && (
              <DashboardOverview transactions={transactions} />
            )}
            {currentPage === 'transactions' && (
              <TransactionsSection
                transactions={filterTransactions()}
                onAddTransaction={handleAddTransaction}
                currentRole={currentRole}
                filteredCategory={filteredCategory}
                setFilteredCategory={setFilteredCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}
            {currentPage === 'insights' && (
              <InsightsSection transactions={transactions} insights={mockInsights} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
