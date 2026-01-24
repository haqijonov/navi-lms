'use client'

import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BlockCard({ block, months, onMonthClick }) {
  const isLocked = block.status === 'locked'

  return (
    <div
      className={cn(
        "rounded-3xl p-8 glass-strong border-2 transition-all duration-300 shadow-lg",
        "bg-gradient-to-br from-white via-primary/5 to-white",
        isLocked
          ? "opacity-60 border-slate-200 blur-[0.5px]"
          : "border-primary/20 hover:border-primary/30 hover:shadow-xl hover:scale-[1.01]"
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900">{block.title}</h3>
        {isLocked && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100/50 text-slate-400">
            <Lock size={18} />
            <span className="text-sm font-medium">Finish Block 1 to unlock</span>
          </div>
        )}
      </div>

      {!isLocked && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {months.map((month) => (
            <button
              key={month.id}
              onClick={() => onMonthClick(month.id)}
              className="text-left p-5 rounded-3xl glass border border-slate-200/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group hover:scale-105 active:scale-95 min-h-[160px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Month {month.number}</span>
                {month.status === 'completed' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {month.status === 'current' && (
                  <span className="px-3 py-1 text-xs font-bold bg-primary/15 text-primary rounded-full border border-primary/20 animate-pulse">
                    You are here
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                {month.title}
              </h4>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${month.progress}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {isLocked && (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100/50 flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="opacity-50" />
            </div>
            <p className="text-sm font-medium">Complete Block 1 to unlock this content</p>
          </div>
        </div>
      )}
    </div>
  )
}
