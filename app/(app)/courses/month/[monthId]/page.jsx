'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { getMonthById } from '@/data/fakeLms'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Dynamically import heavy Roadmap component
const RoadmapNew = dynamic(() => import('@/components/month/RoadmapNew'), {
  loading: () => (
    <div className="flex items-center justify-center h-[600px]">
      <div className="text-slate-500">Loading roadmap...</div>
    </div>
  ),
  ssr: true,
})

export default function MonthDetailPage() {
  const params = useParams()
  const month = getMonthById(params.monthId)

  if (!month) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Month not found</p>
        <Link href="/courses" className="text-primary hover:underline mt-4 inline-block">
          Back to courses
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/courses">
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Month {month.number}: {month.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm font-semibold text-primary">{month.progress}%</span>
              </div>
              <Progress value={month.progress} className="h-2" />
            </div>
            {month.status === 'current' && (
              <span className="px-4 py-1.5 text-sm font-bold bg-primary/15 text-primary rounded-full border border-primary/20 animate-pulse shadow-sm">
                You are here
              </span>
            )}
            {month.status === 'completed' && (
              <span className="px-4 py-1.5 text-sm font-bold bg-green-100 text-green-700 rounded-full border border-green-200 shadow-sm">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg bg-gradient-to-br from-white via-primary/5 to-white">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Lesson Roadmap</h2>
        <Suspense fallback={
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-slate-500">Loading roadmap...</div>
          </div>
        }>
          <RoadmapNew lessons={month.lessons} monthId={month.id} />
        </Suspense>
      </div>
    </div>
  )
}
