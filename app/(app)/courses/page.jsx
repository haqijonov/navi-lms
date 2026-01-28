'use client'

import Link from 'next/link'
import { courseYear, blocks, months } from '@/data/fakeLms'
import { Progress } from '@/components/ui/progress'
import BlockCard from '@/components/courses/BlockCard'
import YearGoalCard from '@/components/courses/YearGoalCard'
import { Button } from '@/components/ui/button'
import { Play, Target, TrendingUp } from 'lucide-react'
import { getMonthById } from '@/data/fakeLms'

export default function CoursesPage() {
  const block1Months = months.filter(m => blocks[0].months.includes(m.number))
  const block2Months = months.filter(m => blocks[1].months.includes(m.number))

  // Find current lesson for "Continue Learning" CTA
  const currentMonth = months.find(m => m.status === 'current')
  const currentLesson = currentMonth?.lessons.find(l => l.status === 'current')
  const weeklyGoal = { completed: 2, target: 3 } // Mock data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          My courses · {courseYear.title}
        </h1>
        <p className="text-slate-600 text-lg">{courseYear.subtitle}</p>
      </div>

      {/* Continue Learning CTA */}
      {currentLesson && currentMonth && (
        <div className="glass-strong rounded-3xl p-6 border border-primary/20 bg-gradient-to-r from-primary/5 to-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-slate-600">Continue Learning</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {currentLesson.title}
              </h3>
              <p className="text-sm text-slate-600">
                Month {currentMonth.number}: {currentMonth.title}
              </p>
            </div>
            <Button
              onClick={() => router.push(`/lesson/${currentLesson.id}?tab=video`)}
              className="rounded-full px-6 py-3 shadow-md hover:shadow-lg"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Weekly Goal */}
      <div className="glass-strong rounded-3xl p-6 border border-slate-200/50 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Weekly Goal</h3>
              <p className="text-xs text-slate-600">Keep your momentum going!</p>
            </div>
          </div>
          <span className="text-sm font-bold text-primary">
            {weeklyGoal.completed}/{weeklyGoal.target} lessons
          </span>
        </div>
        <Progress 
          value={(weeklyGoal.completed / weeklyGoal.target) * 100} 
          className="h-2 rounded-full" 
        />
        <p className="text-xs text-slate-500 mt-2">
          {weeklyGoal.target - weeklyGoal.completed} more to reach your goal this week
        </p>
      </div>

      {/* Overall Progress */}
      <div className="glass-strong rounded-3xl p-6 border border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-primary/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
          <span className="text-lg font-bold text-primary">{courseYear.overallProgress}%</span>
        </div>
        <Progress value={courseYear.overallProgress} className="h-4 rounded-full" />
      </div>

      {/* Learning Path */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Learning Path</h2>
        
        {/* Block 1 */}
        <BlockCard
          block={blocks[0]}
          months={block1Months}
        />

        {/* Block 2 */}
        <BlockCard
          block={blocks[1]}
          months={block2Months}
        />
      </div>

      {/* Year Goal */}
      <YearGoalCard />
    </div>
  )
}
