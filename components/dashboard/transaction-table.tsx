'use client';

import { Transaction } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-foreground">Date</TableHead>
            <TableHead className="text-foreground">Description</TableHead>
            <TableHead className="text-foreground">Category</TableHead>
            <TableHead className="text-foreground">Type</TableHead>
            <TableHead className="text-right text-foreground">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-border hover:bg-muted/50">
              <TableCell className="text-foreground text-sm">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell className="text-foreground">{transaction.description}</TableCell>
              <TableCell className="text-foreground">
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  {transaction.category}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {transaction.type === 'income' ? (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-green-600 dark:text-green-400 rotate-180" />
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                        Income
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                        Expense
                      </span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
