import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    content?: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700 last:border-0">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={onClick}
            >
                <span className="text-gray-200 text-xl font-medium group-hover:text-white transition-colors">
                    {title}
                </span>
                <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="text-gray-300 text-lg leading-relaxed">
                    {content}
                </div>
            </div>
        </div>
    );
};

const DocumentationAccordion: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(2); // Default open index to match screenshot

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            <AccordionItem
                title="Lorem ipsum"
                isOpen={openIndex === 0}
                onClick={() => handleItemClick(0)}
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <AccordionItem
                title="Lorem ipsum"
                isOpen={openIndex === 1}
                onClick={() => handleItemClick(1)}
                content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
            <AccordionItem
                title="Lorem ipsum"
                isOpen={openIndex === 2}
                onClick={() => handleItemClick(2)}
                content={
                    <>
                        <p className="mb-4">
                            Our flagship product combines cutting-edge technology with sleek design.
                            Built with premium materials, it offers unparalleled performance and
                            reliability.
                        </p>
                        <p>
                            Key features include advanced processing capabilities, and an intuitive user
                            interface designed for both beginners and experts.
                        </p>
                    </>
                }
            />
            <AccordionItem
                title="Lorem ipsum"
                isOpen={openIndex === 3}
                onClick={() => handleItemClick(3)}
                content="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
            <AccordionItem
                title="Lorem ipsum"
                isOpen={openIndex === 4}
                onClick={() => handleItemClick(4)}
                content="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
        </div>
    );
};

export default DocumentationAccordion;
