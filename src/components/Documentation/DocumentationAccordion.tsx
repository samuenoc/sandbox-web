import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AccordionItemProps {
    title: string;
    content?: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
    theme: 'light' | 'dark';
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick, theme }) => {
    const itemBgColor = theme === 'dark' ? 'transparent' : '#f3f4f6'; // gray-100

    return (
        <div
            className={`rounded-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                }`}
            style={{ backgroundColor: itemBgColor }}
        >
            <button
                className="w-full py-8 px-8 flex justify-between items-center text-left focus:outline-none group"
                onClick={onClick}
                style={{ backgroundColor: itemBgColor }}
            >
                <span className={`text-xl font-medium transition-colors ${theme === 'dark'
                    ? 'text-gray-200 group-hover:text-white'
                    : 'text-gray-800 group-hover:text-black'
                    }`}>
                    {title}
                </span>
                <ChevronDown
                    className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        } ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pt-4 pb-8' : 'max-h-0 opacity-0'
                    }`}
                style={{ backgroundColor: itemBgColor }}
            >
                <div className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    {content}
                </div>
            </div>
        </div>
    );
};

const DocumentationAccordion: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { theme } = useTheme();

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full space-y-4">
            <AccordionItem
                title="¿Qué es Code Sandbox?"
                isOpen={openIndex === 0}
                onClick={() => handleItemClick(0)}
                content={
                    <div className="px-8">
                        <p className="mb-4">
                            Code Sandbox es un entorno de desarrollo interactivo en línea que permite escribir,
                            editar y visualizar código HTML, CSS y JavaScript en tiempo real. Es perfecto para
                            aprender, experimentar y crear prototipos rápidos sin necesidad de configurar un
                            entorno de desarrollo local.
                        </p>
                        <p>
                            Con una interfaz intuitiva y vista previa en vivo, puedes ver los cambios
                            instantáneamente mientras escribes tu código.
                        </p>
                    </div>
                }
                theme={theme}
            />
            <AccordionItem
                title="Tecnologías Utilizadas"
                isOpen={openIndex === 1}
                onClick={() => handleItemClick(1)}
                content={
                    <div className="px-8">
                        <p className="mb-3"><strong>Frontend:</strong></p>
                        <ul className="list-disc list-inside mb-4 space-y-1">
                            <li>React 18 con TypeScript</li>
                            <li>React Router para navegación</li>
                            <li>Monaco Editor (el editor de VS Code)</li>
                            <li>Tailwind CSS para estilos</li>
                            <li>Lucide React para iconos</li>
                            <li>SweetAlert2 para alertas</li>
                        </ul>
                        <p className="mb-3"><strong>Herramientas de Desarrollo:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Vite como bundler</li>
                            <li>ESLint para linting</li>
                            <li>PostCSS para procesamiento CSS</li>
                        </ul>
                    </div>
                }
                theme={theme}
            />
            <AccordionItem
                title="Características Principales"
                isOpen={openIndex === 2}
                onClick={() => handleItemClick(2)}
                content={
                    <div className="px-8">
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Editor de código en vivo:</strong> Escribe HTML, CSS y JavaScript con resaltado de sintaxis</li>
                            <li><strong>Vista previa en tiempo real:</strong> Ve los cambios instantáneamente</li>
                            <li><strong>Plantillas predefinidas:</strong> Comienza rápido con ejemplos de Bootstrap, Tailwind y más</li>
                            <li><strong>Temas claro y oscuro:</strong> Personaliza tu experiencia visual</li>
                            <li><strong>Diseño responsive:</strong> Funciona en desktop y móvil</li>
                            <li><strong>Exportar proyectos:</strong> Descarga tu código como archivo HTML</li>
                            <li><strong>Layouts flexibles:</strong> Cambia entre vista horizontal y vertical</li>
                        </ul>
                    </div>
                }
                theme={theme}
            />
            <AccordionItem
                title="Cómo Usar"
                isOpen={openIndex === 3}
                onClick={() => handleItemClick(3)}
                content={
                    <div className="px-8">
                        <ol className="list-decimal list-inside space-y-3">
                            <li><strong>Escribe tu código:</strong> Usa los editores para HTML, CSS y JavaScript</li>
                            <li><strong>Ve los resultados:</strong> La vista previa se actualiza automáticamente</li>
                            <li><strong>Usa plantillas:</strong> Selecciona ejemplos predefinidos desde el menú "Ejemplos"</li>
                            <li><strong>Personaliza:</strong> Cambia el tema, tamaño de fuente y layout desde "Ajustes"</li>
                            <li><strong>Guarda tu trabajo:</strong> Usa las opciones de guardar y exportar en el menú "Archivo"</li>
                        </ol>
                        <p className="mt-4">
                            ¡Es así de simple! Comienza a codificar y experimenta con tus ideas.
                        </p>
                    </div>
                }
                theme={theme}
            />
            <AccordionItem
                title="Video Tutorial y Recursos"
                isOpen={openIndex === 4}
                onClick={() => handleItemClick(4)}
                content={
                    <div className="px-8">
                        <p className="mb-4">
                            Aprende más sobre Code Sandbox y cómo aprovechar al máximo sus características:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold mb-2">📹 Video Tutorial:</p>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-block px-4 py-2 rounded-lg transition-colors ${theme === 'dark'
                                        ? 'bg-white/10 hover:bg-white/20 text-white'
                                        : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                                        }`}
                                >
                                    Ver Tutorial en YouTube →
                                </a>
                            </div>
                            <div>
                                <p className="font-semibold mb-2">📚 Recursos Adicionales:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>
                                        <a
                                            href="https://github.com/samuenoc/sandbox-web"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                                        >
                                            Código fuente en GitHub
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://react.dev"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                                        >
                                            Documentación de React
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                theme={theme}
            />
        </div>
    );
};

export default DocumentationAccordion;
