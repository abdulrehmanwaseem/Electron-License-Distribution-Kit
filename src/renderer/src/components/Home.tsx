import { Code2, Zap, Lock, Box, Github, Linkedin } from 'lucide-react'

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Box className="w-10 h-10 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            Electron License Distribution Kit
          </h1>
        </div>

        <div className="text-xl text-gray-300 mb-12">
          Build an Electron app with{' '}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold mx-1">
            <Code2 className="w-4 h-4 mr-1" />
            React
          </span>
          and{' '}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 font-semibold mx-1">
            <Zap className="w-4 h-4 mr-1" />
            TypeScript
          </span>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Lock className="w-6 h-6 text-emerald-400" />,
              title: 'Secure Distribution',
              description: 'Safely distribute and manage software licenses'
            },
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: 'Lightning Fast',
              description: 'Built with performance and efficiency in mind'
            },
            {
              icon: <Code2 className="w-6 h-6 text-purple-400" />,
              title: 'Developer Friendly',
              description: 'Modern tech stack with TypeScript support'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          <div className="mt-12 inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
            Author: <span className="ml-1 text-emerald-400 font-mono">Abdul Rehman</span>
          </div>
          <div className="mt-12 inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
            Github:{' '}
            <span className="ml-1 text-emerald-400 font-mono">
              <Github size={20} />
            </span>
          </div>
          <div className="mt-12 inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
            Linkedin:{' '}
            <span className="ml-1 text-emerald-400 font-mono">
              <Linkedin size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
