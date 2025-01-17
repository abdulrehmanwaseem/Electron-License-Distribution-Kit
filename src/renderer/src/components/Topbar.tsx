import { Minus, Square, SquareTerminal, X } from 'lucide-react'
import React from 'react'

interface TopbarProps {
  title?: string
}

interface ExtendedCSSProperties extends React.CSSProperties {
  WebkitAppRegion?: string
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
    <div
      className="flex items-center justify-between h-10 bg-gray-900"
      style={{ WebkitAppRegion: 'drag' } as ExtendedCSSProperties} // the entire top bar draggable
    >
      <div className="flex items-center flex-1 gap-2 px-4">
        <SquareTerminal className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-medium text-white">{title}</span>
      </div>

      {/* Window Controls */}
      <div className="flex h-full" style={{ WebkitAppRegion: 'no-drag' } as ExtendedCSSProperties}>
        <button
          className="flex items-center justify-center h-full px-4 transition-colors hover:bg-gray-700"
          onClick={handleMinimize}
        >
          <Minus className="w-4 h-4 text-gray-300" />
        </button>
        <button
          className="flex items-center justify-center h-full px-4 transition-colors hover:bg-gray-700"
          onClick={handleFullScreen}
        >
          <Square className="w-4 h-4 text-gray-300" />
        </button>
        <button
          className="flex items-center justify-center h-full px-4 transition-colors hover:bg-red-500"
          onClick={handleClose}
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  )
}

export default Topbar
