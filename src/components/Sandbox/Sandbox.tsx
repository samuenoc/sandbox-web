import React, { useState } from 'react';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';
import type { EditorContent, ContextConfig } from '../../types';
import '../Layout/Layout.css'; // Reuse Layout styles for now or move them
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

interface SandboxProps {
    config: ContextConfig;
}

const Sandbox: React.FC<SandboxProps> = ({ config }) => {
    const [content, setContent] = useState<EditorContent>(config.editor.defaultContent);
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
    const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
    const [fontSize, setFontSize] = useState(config.editor.fontSize);
    const [wordWrap, setWordWrap] = useState<'on' | 'off'>(config.editor.wordWrap);

    const handleAction = (action: string) => {
        switch (action) {
            case 'new-file':
                Swal.fire({
                    title: 'Crear Nuevo Archivo',
                    text: '¿Estás seguro de que quieres crear un nuevo archivo? Esto borrará todo el código actual.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setContent({
                            html: '',
                            css: '',
                            javascript: ''
                        });
                        Swal.fire(
                            '¡Creado!',
                            'Tu nuevo archivo ha sido creado.',
                            'success'
                        );
                    }
                });
                break;

            case 'save-file': {
                const blob = new Blob([
                    `<!-- HTML -->\n${content.html}\n\n`,
                    `/* CSS */\n${content.css}\n\n`,
                    `// JavaScript\n${content.javascript}`
                ], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sandbox-code.txt';
                a.click();
                URL.revokeObjectURL(url);
                break;
            }

            case 'export-file': {
                const htmlBlob = new Blob([
                    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported from Code Sandbox</title>
  <style>${content.css}</style>
</head>
<body>
  ${content.html}
  <script>${content.javascript}</script>
</body>
</html>`
                ], { type: 'text/html' });
                const htmlUrl = URL.createObjectURL(htmlBlob);
                const htmlLink = document.createElement('a');
                htmlLink.href = htmlUrl;
                htmlLink.download = 'index.html';
                htmlLink.click();
                URL.revokeObjectURL(htmlUrl);
                break;
            }

            case 'layout-horizontal':
                setLayoutMode('horizontal');
                break;

            case 'layout-vertical':
                setLayoutMode('vertical');
                break;

            case 'fullscreen':
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
                break;

            case 'font-size': {
                const newSize = prompt('Ingresa el tamaño de fuente (10-24):', fontSize.toString());
                if (newSize) {
                    const size = parseInt(newSize);
                    if (size >= 10 && size <= 24) {
                        setFontSize(size);
                    }
                }
                break;
            }

            case 'word-wrap':
                setWordWrap(prev => prev === 'on' ? 'off' : 'on');
                break;

            case 'load-template-basic':
                setContent(config.editor.defaultContent);
                break;

            case 'load-template-bootstrap':
                setContent({
                    html: `<div class="container mt-5">
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">Bootstrap Template</h1>
          <p class="card-text">This is a Bootstrap 5 template.</p>
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
                    css: `@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

body {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  min-height: 100vh;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
}`,
                    javascript: `console.log('Bootstrap template loaded!');`
                });
                break;

            case 'load-template-tailwind':
                setContent({
                    html: `<div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Tailwind CSS</h1>
    <p class="text-gray-600 mb-6">Rapidly build modern websites without ever leaving your HTML.</p>
    <div class="flex gap-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        Learn More
      </button>
    </div>
  </div>
</div>`,
                    css: `@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');`,
                    javascript: `console.log('Tailwind CSS template loaded!');`
                });
                break;

            case 'load-template-dynamic-rain':
                setContent({
                    html: `<canvas id="rainCanvas"></canvas>`,
                    css: `body, html { margin: 0; padding: 0; overflow: hidden; background: #000; }
#rainCanvas { display: block; width: 100vw; height: 100vh; }`,
                    javascript: `const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Drop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = 10 + Math.random() * 20;
    this.speed = 4 + Math.random() * 4;
  }
  fall() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.7)';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
    this.fall();
  }
}

const drops = Array.from({length: 150}, () => new Drop());

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drops.forEach(drop => drop.draw());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});`
                });
                break;

            case 'show-shortcuts':
                Swal.fire({
                    title: 'Atajos',
                    html: `
                        <div style="text-align: left;">
                            <p><strong>Ctrl/Cmd + S:</strong> Guardar archivo</p>
                            <p><strong>Alt + Shift + F:</strong> Formatear código</p>
                            <p><strong>F11:</strong> Pantalla completa</p>
                            <p><strong>Ctrl/Cmd + /:</strong> Alternar comentario</p>
                            <p><strong>Ctrl/Cmd + D:</strong> Duplicar línea</p>
                            <p><strong>Tab:</strong> Indentar</p>
                            <p><strong>Shift + Tab:</strong> Desindentar</p>
                        </div>
                    `,
                    confirmButtonText: 'Cerrar'
                });
                break;

            case 'show-about':
                Swal.fire({
                    title: 'Acerca de Code Sandbox',
                    html: `
                        <div>
                            <p><strong>Code Sandbox v1.0.0</strong></p>
                            <br />
                            <p>Un potente editor de código en línea con vista previa en tiempo real.</p>
                            <p>Construido con React, TypeScript y Monaco Editor.</p>
                        </div>
                    `,
                    confirmButtonText: 'Cerrar'
                });
                break;
        }
    };

    return (
        <div className={`layout-content ${layoutMode} w-full h-full`}>
            <SandboxContent
                content={content}
                setContent={setContent}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                fontSize={fontSize}
                wordWrap={wordWrap}
                config={config}
                handleAction={handleAction}
            />
        </div>
    );
};

const SandboxContent = ({
    content, setContent, activeTab, setActiveTab, fontSize, wordWrap, config, handleAction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
    const { action } = useOutletContext<{ action: string | null }>();

    // React to action changes
    React.useEffect(() => {
        if (action) {
            handleAction(action);
        }
    }, [action, handleAction]);

    return (
        <>
            <Editor
                content={content}
                onChange={setContent}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                fontSize={fontSize}
                wordWrap={wordWrap}
            />
            <Preview
                content={content}
                refreshDelay={config.preview.refreshDelay}
            />
        </>
    );
}

export default Sandbox;
