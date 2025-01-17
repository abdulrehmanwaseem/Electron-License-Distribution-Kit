import { SquareTerminal } from 'lucide-react'
import React from 'react'

interface TopbarProps {
  title?: string
}

interface ExtendedCSSProperties extends React.CSSProperties {
  WebkitAppRegion?: string
}

export const MacTopbar: React.FC<TopbarProps> = ({ title = 'My App' }) => {
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
      className="h-[38px] bg-[#2D2D2D] flex items-center z-10"
      style={{ WebkitAppRegion: 'drag' } as ExtendedCSSProperties}
    >
      {/* Window Controls - macOS style */}
      <div
        className="z-10 flex items-center gap-2 px-4"
        style={{ WebkitAppRegion: 'no-drag' } as ExtendedCSSProperties}
      >
        <button
          onClick={handleClose}
          className="w-3 h-3 bg-[#FF5F57] rounded-full flex items-center justify-center group hover:brightness-90 transition-all"
          aria-label="Close"
        >
          <span className="text-[#4C0002] opacity-0 group-hover:opacity-100 text-xs">×</span>
        </button>
        <button
          onClick={handleMinimize}
          className="w-3 h-3 bg-[#FEBC2E] rounded-full flex items-center justify-center group hover:brightness-90 transition-all"
          aria-label="Minimize"
        >
          <span className="text-[#9A6B00] opacity-0 group-hover:opacity-100 text-xs">−</span>
        </button>
        <button
          onClick={handleFullScreen}
          className="w-3 h-3 bg-[#28C840] rounded-full flex items-center justify-center group hover:brightness-90 transition-all"
          aria-label="Full Screen"
        >
          <span className="text-[#0B6309] opacity-0 group-hover:opacity-100 text-xs">+</span>
        </button>
      </div>

      {/* Title - centered macOS style */}
      <div className="absolute inset-x-0 flex items-center justify-center flex-1 ">
        <SquareTerminal className="w-5 h-5 mr-1 text-blue-400" />
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
    </div>
  )
}

export default MacTopbar
