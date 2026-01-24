'use client'

import { Play } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function VideoPanel({ content }) {
  return (
    <Card className="overflow-hidden glass-strong rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video bg-slate-100 flex items-center justify-center group cursor-pointer hover:bg-slate-200 transition-all duration-300 overflow-hidden">
        {/* Placeholder thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5" />
        
        {/* Play button */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-125 group-hover:shadow-primary/30 transition-all duration-300 active:scale-110">
          <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
        </div>

        {/* Animated ring on hover */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />

        {/* Duration badge */}
        {content?.duration && (
          <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-sm font-semibold shadow-lg">
            {content.duration}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Video Lesson</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Watch the video to learn the concepts. You can pause and rewind as needed.
        </p>
      </div>
    </Card>
  )
}
