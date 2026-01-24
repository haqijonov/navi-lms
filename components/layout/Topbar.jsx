'use client'

import { Flame, Coins, Bell, User, Menu, ChevronLeft } from 'lucide-react'
import { useSidebar } from './AppShell'
import { cn } from '@/lib/utils'

export default function Topbar() {
  // Mock data
  const streak = 7
  const points = 1250
  const notifications = 3
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-slate-200/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          ) : (
            <Menu className="h-5 w-5 text-slate-600" />
          )}
        </button>

        <div className="flex-1" /> {/* Spacer */}

        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-50/50 border border-orange-100/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">{streak}</span>
            <span className="text-xs text-orange-600 hidden sm:inline">day streak</span>
          </div>

          {/* Points */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-50/50 border border-amber-100/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
            <Coins className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">{points}</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95">
            <Bell className="h-5 w-5 text-slate-600" />
            {notifications > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-primary rounded-full animate-pulse" />
            )}
          </button>

          {/* User Avatar */}
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
