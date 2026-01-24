'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideoPanel from './VideoPanel'
import TheoryPanel from './TheoryPanel'
import TaskPanel from './TaskPanel'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
        <VideoPanel content={content.video} />
      </TabsContent>

      <TabsContent value="theory">
        <TheoryPanel content={content.theory} />
      </TabsContent>

      <TabsContent value="task">
        <TaskPanel content={content.tasks} />
      </TabsContent>
    </Tabs>
  )
}
