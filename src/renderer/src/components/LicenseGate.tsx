import { useState } from 'react'
import { Shield, Key, CheckCircle2, XCircle } from 'lucide-react'

const LicenseGate = () => {
    const [licenseKey, setLicenseKey] = useState('')
    const [validationStatus, setValidationStatus] = useState<
        'idle' | 'validating' | 'success' | 'error'
    >('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // setValidationStatus('validating')
        console.log(licenseKey)

        // if (submit) {
        //     setValidationStatus('success')
        // } else {
        //     setValidationStatus('error')
        // }
    }

    return (
        <div className="relative flex flex-col items-center justify-center flex-1 p-8">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Shield className="w-10 h-10 text-blue-400" />
                        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                            License Validation
                        </h1>
                    </div>
                    <p className="text-gray-400">Enter your license key to activate the software</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Key className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={licenseKey}
                            onChange={(e) => setLicenseKey(e.target.value)}
                            className="block w-full py-3 pl-10 pr-3 text-gray-600 placeholder-gray-400 transition-all duration-300 border-2 border-white/10 rounded-xl bg-white/5 focus:outline-none focus:border-blue-400"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={validationStatus === 'validating'}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
                     ${
                         validationStatus === 'validating'
                             ? 'bg-gray-600 cursor-not-allowed'
                             : 'bg-blue-500 hover:bg-blue-600 active:transform active:scale-[0.98]'
                     }
                     flex items-center justify-center gap-2`}>
                        {validationStatus === 'validating' ? (
                            <>
                                <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                                Validating...
                            </>
                        ) : (
                            <>Validate License</>
                        )}
                    </button>
                </form>

                {/* Status Messages */}
                {validationStatus === 'success' && (
                    <div className="flex items-center gap-2 p-3 mt-4 border rounded-lg bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        License key validated successfully!
                    </div>
                )}

                {validationStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 mt-4 text-red-400 border rounded-lg bg-red-500/10 border-red-500/20">
                        <XCircle className="w-5 h-5" />
                        Invalid license key. Please try again.
                    </div>
                )}

                {/* Help Text */}
                <div className="mt-8 text-sm text-center text-gray-400">
                    <p>Need help? Contact our support team at</p>
                    <a
                        href="mailto:abdulrehmanwork2024@gmail.com"
                        className="text-blue-400 hover:text-blue-300">
                        abdulrehmanwork2024@gmail.com
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LicenseGate
