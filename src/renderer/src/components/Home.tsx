import { Code2, Zap, Lock, Box, Github, Linkedin, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

const Home = () => {
    const [isCaptured, setIsCaptured] = useState(false)

    const featureCards = [
        {
            icon: <Lock className="w-6 h-6 text-emerald-400" />,
            title: 'Secure Distribution',
            description: 'Safely distribute and manage software licenses',
        },
        {
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            title: 'Lightning Fast',
            description: 'Built with performance and efficiency in mind',
        },
        {
            icon: <Code2 className="w-6 h-6 text-purple-400" />,
            title: 'Developer Friendly',
            description: 'Modern tech stack with TypeScript support',
        },
    ]

    return (
        <div className="relative flex flex-col items-center justify-center flex-1 p-8 overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />

            {/* Main Content */}
            <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Box className="w-10 h-10 text-blue-400" />
                    <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                        Electron License Distribution Kit
                    </h1>
                </div>
                <div className="mb-12 text-xl text-gray-300">
                    Build an Electron app with{' '}
                    <span className="inline-flex items-center px-3 py-1 mx-1 font-semibold text-blue-400 rounded-full bg-blue-500/10">
                        <Code2 className="w-4 h-4 mr-1" />
                        React
                    </span>
                    and{' '}
                    <span className="inline-flex items-center px-3 py-1 mx-1 font-semibold rounded-full bg-blue-500/10 text-cyan-400">
                        <Zap className="w-4 h-4 mr-1" />
                        TypeScript
                    </span>
                </div>
                {/* Feature Cards */}
                <div className="grid max-w-4xl grid-cols-3 gap-6 mx-auto">
                    {featureCards.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 transition-all duration-300 border-4 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-blue-400 hover:transform hover:-translate-y-1">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-8">
                    <div className="inline-flex items-center px-3 py-1 mt-12 text-sm text-gray-400 border rounded-full bg-white/5 border-white/10">
                        Author:{' '}
                        <span className="ml-2 font-mono text-emerald-400">Abdul Rehman</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-2 mt-12 text-sm text-gray-400 border rounded-full bg-white/5 border-white/10">
                        Github:{' '}
                        <a
                            className="ml-2 font-mono text-emerald-400"
                            href="https://github.com/abdulrehmanwaseem"
                            target="_blank">
                            <Github size={20} />
                        </a>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 mt-12 text-sm text-gray-400 border rounded-full bg-white/5 border-white/10">
                        Linkedin:{' '}
                        <a
                            className="ml-2 font-mono text-emerald-400"
                            href="https://pk.linkedin.com/in/abdulrehmanwaseem"
                            target="_blank">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setIsCaptured(true)
                        throw new Error('This is your first error!')
                    }}
                    className="inline-flex items-center px-4 py-2 mt-6 font-semibold text-red-400 transition-all duration-300 border-2 rounded-lg bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {!isCaptured
                        ? 'Trigger Sentry.io Error Tracking'
                        : 'Error captured. Thank you!'}
                </button>
            </div>
        </div>
    )
}

export default Home
