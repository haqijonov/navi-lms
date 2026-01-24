'use client'

import { useState, createContext, useContext } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const SidebarContext = createContext()

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within AppShell')
  }
  return context
}

export default function AppShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex h-screen bg-white overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
