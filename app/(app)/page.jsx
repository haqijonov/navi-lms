'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { BookOpen, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Welcome to NAVI</h1>
        <p className="text-lg text-slate-600 max-w-md mx-auto">
          Start your journey to become a Front-End developer. Learn at your own pace and build real projects.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => router.push('/courses')}
          className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Start Learning
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/courses')}
          className="rounded-full px-8 py-6 text-base font-semibold"
        >
          <Target className="w-5 h-5 mr-2" />
          View Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl">
        <div className="p-6 rounded-3xl glass-strong border border-slate-200/50">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">Learn by Doing</h3>
          <p className="text-sm text-slate-600">Build real projects as you learn</p>
        </div>
        <div className="p-6 rounded-3xl glass-strong border border-slate-200/50">
          <Target className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">Track Progress</h3>
          <p className="text-sm text-slate-600">See your journey and celebrate wins</p>
        </div>
        <div className="p-6 rounded-3xl glass-strong border border-slate-200/50">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">Go at Your Pace</h3>
          <p className="text-sm text-slate-600">Learn when and how you want</p>
        </div>
      </div>
    </div>
  )
}
