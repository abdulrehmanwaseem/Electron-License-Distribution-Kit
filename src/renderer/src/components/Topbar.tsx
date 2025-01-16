import React from 'react'
import { Minus, Square, X, Terminal } from 'lucide-react'

interface TopbarProps {
  title?: string
}

const Topbar: React.FC<TopbarProps> = ({ title = 'My Electron App' }) => {
  return (
    <div className="h-10 bg-gray-900 flex items-center justify-between select-none">
      {/* App Icon and Title */}
      <div className="flex items-center px-4 gap-2 flex-1">
        <Terminal className="w-5 h-5 text-blue-400" />
        <span className="text-white text-sm font-medium">{title}</span>
      </div>

      {/* Window Controls */}
      <div className="flex h-full">
        <button className="h-full px-4 flex items-center justify-center hover:bg-gray-700 transition-colors">
          <Minus className="w-4 h-4 text-gray-300" />
        </button>
        <button className="h-full px-4 flex items-center justify-center hover:bg-gray-700 transition-colors">
          <Square className="w-4 h-4 text-gray-300" />
        </button>
        <button className="h-full px-4 flex items-center justify-center hover:bg-red-500 transition-colors">
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  )
}

export default Topbar
