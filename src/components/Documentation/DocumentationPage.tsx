import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import DocumentationAccordion from './DocumentationAccordion';

const DocumentationPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`documentation-page w-full h-full p-8 flex flex-col items-center justify-center font-sans relative overflow-y-auto ${theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-900'
            }`}>
            <div className="absolute top-8 left-8">
                <button
                    onClick={() => window.location.href = '/'}
                    className={`flex items-center gap-3 transition-colors px-8 py-4 rounded-2xl text-xl font-semibold cursor-pointer border ${theme === 'dark'
                        ? 'text-gray-200 hover:bg-white/5 hover:text-white hover:border-gray-400'
                        : 'text-gray-900 hover:bg-gray-300 hover:text-black'
                        }`}
                    style={{
                        backgroundColor: theme === 'dark' ? 'transparent' : '#e5e7eb',
                        borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db'
                    }}
                >
                    ← Volver
                </button>
            </div>

            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-6xl font-bold mb-4 tracking-tight">Documentación</h1>
                        <p className={`text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Encuentra toda la información necesaria para entender, utilizar y sacar el máximo provecho de Code Sandbox.
                        </p>
                    </div>

                    <button
                        onClick={() => window.open('https://github.com/samuenoc/sandbox-web', '_blank', 'noopener,noreferrer')}
                        className={`flex items-center gap-3 transition-colors px-16 py-4 rounded-2xl text-xl font-semibold cursor-pointer border ${theme === 'dark'
                            ? 'text-gray-200 hover:bg-white/5 hover:text-white hover:border-gray-400'
                            : 'text-gray-900 hover:bg-gray-300 hover:text-black'
                            }`}
                        style={{
                            backgroundColor: theme === 'dark' ? 'transparent' : '#e5e7eb',
                            borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db'
                        }}
                    >
                        Github
                        <ExternalLink size={24} />
                    </button>
                </div>

                {/* Main Container */}
                <div className={`border-[5px] border-dashed rounded-2xl p-16 ${theme === 'dark'
                    ? 'border-gray-600 bg-[#1a1a1a]'
                    : 'border-gray-300 bg-white'
                    }`}>
                    <DocumentationAccordion />
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
