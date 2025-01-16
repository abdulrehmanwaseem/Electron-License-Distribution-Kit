import React from 'react'
import { Minus, Square, X, Terminal } from 'lucide-react'

interface TopbarProps {
  title?: string
}

const Topbar: React.FC<TopbarProps> = ({ title = 'My Electron App' }) => {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  const handleFullScreen = () => {
    window.electron.ipcRenderer.send('fullscreen-window')
  }
  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div className="h-10 bg-gray-900 flex items-center justify-between  z-10">
      <div className="flex items-center px-4 gap-2 flex-1">
        <Terminal className="w-5 h-5 text-blue-400" />
        <span className="text-white text-sm font-medium">{title}</span>
      </div>

      {/* Window Controls */}
      <div className="flex h-full">
        <button
          className="h-full px-4 flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={handleMinimize}
        >
          <Minus className="w-4 h-4 text-gray-300" />
        </button>
        <button
          className="h-full px-4 flex items-center justify-center hover:bg-gray-700 transition-colors"
          onClick={handleFullScreen}
        >
          <Square className="w-4 h-4 text-gray-300" />
        </button>
        <button
          className="h-full px-4 flex items-center justify-center hover:bg-red-500 transition-colors"
          onClick={handleClose}
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  )
}

export default Topbar
