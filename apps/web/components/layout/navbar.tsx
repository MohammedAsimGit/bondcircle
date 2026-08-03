'use client';

import { Moon, Sun, Bell, Search, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useThemeMode } from '@/hooks/use-theme';
import { authClient } from '@/lib/auth/client';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

export function Navbar() {
  const router = useRouter();
  const { isDark, setTheme, mounted } = useThemeMode();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut();
      router.push('/login');
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const handleThemeToggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:px-6">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600">
          <span className="text-sm font-bold text-white">BC</span>
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white">{APP_NAME}</span>
      </div>

      {/* Search */}
      <div className="hidden flex-1 max-w-md lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search memories, friends..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Bell className="h-5 w-5" />
        </button>

        {mounted && (
          <button
            onClick={handleThemeToggle}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        )}

        <Dropdown
          trigger={<Avatar name="User" size="sm" className="cursor-pointer" />}
          align="right"
        >
          <DropdownItem onClick={() => router.push('/profile')}>Profile</DropdownItem>
          <DropdownItem onClick={() => router.push('/settings')}>Settings</DropdownItem>
          <div className="my-1 border-t border-slate-200 dark:border-slate-700" />
          <DropdownItem
            onClick={handleSignOut}
            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            {signingOut && <LogOut className="mr-2 h-4 w-4 animate-pulse" />}
            {signingOut ? 'Signing out...' : 'Sign out'}
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
