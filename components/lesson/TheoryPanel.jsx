'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function TheoryPanel({ content }) {
  // Simple markdown-like rendering
  const renderContent = (text) => {
    if (!text) return <p className="text-slate-600">Theory content will be available soon.</p>

    const lines = text.split('\n')
    const elements = []
    let currentParagraph = []
    let currentList = []
    let inCodeBlock = false

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(<p key={`p-${elements.length}`} className="mb-4 text-slate-700">{currentParagraph.join(' ')}</p>)
        currentParagraph = []
      }
    }

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside mb-4 space-y-2 text-slate-700">
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )
        currentList = []
      }
    }

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        flushParagraph()
        flushList()
        inCodeBlock = !inCodeBlock
        return
      }

      if (inCodeBlock) {
        elements.push(
          <code key={index} className="block bg-slate-100 p-4 rounded-lg font-mono text-sm my-2">
            {line}
          </code>
        )
        return
      }

      if (line.startsWith('# ')) {
        flushParagraph()
        flushList()
        elements.push(<h1 key={index} className="text-2xl font-bold text-slate-900 mb-4 mt-6">{line.substring(2)}</h1>)
      } else if (line.startsWith('## ')) {
        flushParagraph()
        flushList()
        elements.push(<h2 key={index} className="text-xl font-semibold text-slate-900 mb-3 mt-5">{line.substring(3)}</h2>)
      } else if (line.startsWith('### ')) {
        flushParagraph()
        flushList()
        elements.push(<h3 key={index} className="text-lg font-semibold text-slate-900 mb-2 mt-4">{line.substring(4)}</h3>)
      } else if (line.startsWith('- ')) {
        flushParagraph()
        currentList.push(line.substring(2))
      } else if (line.trim() === '') {
        flushParagraph()
        flushList()
      } else {
        flushList()
        currentParagraph.push(line.trim())
      }
    })

    flushParagraph()
    flushList()

    return elements.length > 0 ? elements : <p className="text-slate-600">Theory content will be available soon.</p>
  }

  return (
    <Card className="glass-strong rounded-3xl shadow-lg">
      <CardContent className="p-8">
        <div className="prose prose-slate max-w-none">
          {renderContent(content)}
        </div>
      </CardContent>
    </Card>
  )
}
