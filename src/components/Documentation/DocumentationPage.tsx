import React from 'react';
import { ExternalLink } from 'lucide-react';
import DocumentationAccordion from './DocumentationAccordion';

const DocumentationPage: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#1a1a1a] text-white p-8 flex flex-col items-center justify-center font-sans relative overflow-y-auto">
            <div className="absolute top-8 left-8">
                <a
                    href="/"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg text-lg font-medium text-white no-underline"
                >
                    ← Volver
                </a>
            </div>

            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-6xl font-bold mb-4 tracking-tight">Documentación</h1>
                        <p className="text-gray-400 text-2xl">
                            A vertically stacked set of interactive headings that each
                            <br />
                            reveal a section of content.
                        </p>
                    </div>

                    <a
                        href="https://github.com/myrepo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg text-lg font-medium text-white no-underline"
                    >
                        Github
                        <ExternalLink size={20} />
                    </a>
                </div>

                {/* Main Container */}
                <div className="border-2 border-dashed border-gray-600 rounded-2xl p-10 bg-[#1a1a1a]">
                    <DocumentationAccordion />
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
