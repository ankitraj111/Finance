'use client';

import { Role } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Moon, Sun, Shield, Eye } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface DashboardHeaderProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
}

export default function DashboardHeader({
  currentRole,
  setCurrentRole,
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-card/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 lg:px-8 py-3.5">
        {/* Page title area */}
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Finance Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track and understand your financial activity
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark / Light toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-xl border-border/60 bg-background/80 hover:bg-primary/10 hover:border-primary/40 transition-all"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Role switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-border/60 bg-background/80 hover:bg-primary/10 hover:border-primary/40 px-4 h-9 text-sm font-medium transition-all"
              >
                {currentRole === 'admin' ? (
                  <>
                    <Shield className="h-4 w-4 text-primary" />
                    Admin
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    Viewer
                  </>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-xl">
              <DropdownMenuItem
                onClick={() => setCurrentRole('viewer')}
                className="gap-2 rounded-lg cursor-pointer"
              >
                <Eye className="h-4 w-4 text-muted-foreground" />
                Viewer Mode
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrentRole('admin')}
                className="gap-2 rounded-lg cursor-pointer"
              >
                <Shield className="h-4 w-4 text-primary" />
                Admin Mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
