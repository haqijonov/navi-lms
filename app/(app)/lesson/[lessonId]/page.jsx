'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { getLessonById, getLessonContent } from '@/data/fakeLms'
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LessonTabs from '@/components/lesson/LessonTabs'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function LessonPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const lesson = getLessonById(params.lessonId)
  const content = getLessonContent(params.lessonId)

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Lesson not found</p>
        <Link href="/courses" className="text-primary hover:underline mt-4 inline-block">
          Back to courses
        </Link>
      </div>
    )
  }

  // Calculate step indicator (simplified - assuming 3 steps: video, theory, task)
  const activeTab = searchParams.get('tab') || 'video'
  const stepMap = { video: 1, theory: 2, task: 3 }
  const currentStep = stepMap[activeTab] || 1

  // Lesson checklist state
  const [checklist, setChecklist] = useState({
    video: activeTab === 'video',
    theory: false,
    task: false,
  })

  const checklistItems = [
    { id: 'video', label: 'Watch video', time: '15 min', completed: checklist.video },
    { id: 'theory', label: 'Read theory', time: '3 min', completed: checklist.theory },
    { id: 'task', label: 'Complete task', time: '10 min', completed: checklist.task },
  ]

  const allCompleted = checklistItems.every(item => item.completed)
  const completedCount = checklistItems.filter(item => item.completed).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/courses/month/${lesson.monthId}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-slate-500">{lesson.monthTitle}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm font-medium text-primary">
              Step {currentStep} / 3
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{content.title || lesson.title}</h1>
        </div>
      </div>

      {/* Lesson Checklist */}
      <div className="glass-strong rounded-3xl p-5 border border-slate-200/50 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Lesson Checklist</h3>
          <span className="text-sm font-bold text-primary">
            {completedCount}/{checklistItems.length} completed
          </span>
        </div>
        <div className="space-y-2">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === activeTab) {
                  setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id] }))
                }
              }}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200",
                item.completed
                  ? "bg-green-50 border border-green-200/50"
                  : "bg-slate-50 border border-slate-200/50 hover:bg-slate-100",
                item.id === activeTab && "ring-2 ring-primary/20"
              )}
            >
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  item.completed ? "text-green-700 line-through" : "text-slate-700"
                )}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
            </button>
          ))}
        </div>
        {allCompleted && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-50/50 border border-green-200">
            <p className="text-sm font-semibold text-green-700 text-center">
              🎉 Nice! You're 1 step closer to the project
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Suspense fallback={
        <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
          <div className="flex items-center justify-center h-64">
            <div className="text-slate-500">Loading lesson content...</div>
          </div>
        </div>
      }>
        <LessonTabs
          lessonId={params.lessonId}
          content={{
            video: content.video,
            theory: content.theory,
            tasks: content.tasks,
          }}
        />
      </Suspense>
    </div>
  )
}
