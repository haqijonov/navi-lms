'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TaskPanel({ content }) {
  const [tasks, setTasks] = useState(content || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const allCompleted = tasks.every(task => task.completed)

  return (
    <Card className="glass-strong rounded-3xl shadow-lg">
      <CardContent className="p-8">
        <div className="space-y-3 mb-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start gap-4 p-5 rounded-3xl glass border transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-md",
                task.completed
                  ? "border-green-200/50 bg-green-50/30"
                  : "border-slate-200/50 hover:border-primary/30"
              )}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
                className="mt-0.5"
              />
              <label
                className={cn(
                  "flex-1 text-slate-700 cursor-pointer transition-all duration-200",
                  task.completed && "line-through text-slate-400"
                )}
                onClick={() => handleTaskToggle(task.id)}
              >
                {task.text}
              </label>
            </div>
          ))}
        </div>

        {isSubmitted ? (
          <div className="flex items-center gap-3 p-5 rounded-3xl bg-gradient-to-r from-green-50 to-green-50/50 border border-green-200 shadow-md animate-in fade-in duration-300">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="text-green-700 font-semibold">Task submitted successfully!</p>
          </div>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!allCompleted || isSubmitting}
            className="w-full rounded-2xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : allCompleted ? 'Submit Task ✓' : 'Complete all tasks to submit'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
