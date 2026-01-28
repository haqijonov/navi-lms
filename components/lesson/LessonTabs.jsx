'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

// Dynamically import tab panels for code splitting
const VideoPanel = dynamic(() => import('./VideoPanel'), {
  loading: () => (
    <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading video...</div>
      </div>
    </div>
  ),
})

const TheoryPanel = dynamic(() => import('./TheoryPanel'), {
  loading: () => (
    <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading theory...</div>
      </div>
    </div>
  ),
})

const TaskPanel = dynamic(() => import('./TaskPanel'), {
  loading: () => (
    <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading tasks...</div>
      </div>
    </div>
  ),
})

export default function LessonTabs({ lessonId, content }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get('tab') || 'video'

  const handleTabChange = (value) => {
    router.push(`/lesson/${lessonId}?tab=${value}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 glass mb-6">
        <TabsTrigger value="video">Video</TabsTrigger>
        <TabsTrigger value="theory">Theory</TabsTrigger>
        <TabsTrigger value="task">Task</TabsTrigger>
      </TabsList>

      <TabsContent value="video">
        <Suspense fallback={
          <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500">Loading video...</div>
            </div>
          </div>
        }>
          <VideoPanel content={content.video} />
        </Suspense>
      </TabsContent>

      <TabsContent value="theory">
        <Suspense fallback={
          <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500">Loading theory...</div>
            </div>
          </div>
        }>
          <TheoryPanel content={content.theory} />
        </Suspense>
      </TabsContent>

      <TabsContent value="task">
        <Suspense fallback={
          <div className="glass-strong rounded-3xl p-8 border border-slate-200/50 shadow-lg">
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500">Loading tasks...</div>
            </div>
          </div>
        }>
          <TaskPanel content={content.tasks} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
