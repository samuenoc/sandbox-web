import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';
import type { EditorContent, ContextConfig } from '../../types';
import './Layout.css';

interface LayoutProps {
  config: ContextConfig;
}

const Layout: React.FC<LayoutProps> = ({ config }) => {
  const [content, setContent] = useState<EditorContent>(config.editor.defaultContent);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [fontSize, setFontSize] = useState(config.editor.fontSize);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>(config.editor.wordWrap);

  const handleAction = (action: string) => {
    switch (action) {
      case 'new-file':
        if (window.confirm('Are you sure you want to create a new file? This will clear all current code.')) {
          setContent({
            html: '',
            css: '',
            javascript: ''
          });
        }
        break;
      
      case 'save-file':
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
      
      case 'export-file':
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
      
      case 'font-size':
        const newSize = prompt('Enter font size (10-24):', fontSize.toString());
        if (newSize) {
          const size = parseInt(newSize);
          if (size >= 10 && size <= 24) {
            setFontSize(size);
          }
        }
        break;
      
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
      
      case 'show-shortcuts':
        alert(`Keyboard Shortcuts:
        
• Ctrl/Cmd + S: Save file
• Alt + Shift + F: Format code
• F11: Fullscreen
• Ctrl/Cmd + /: Toggle comment
• Ctrl/Cmd + D: Duplicate line
• Tab: Indent
• Shift + Tab: Outdent`);
        break;
      
      case 'show-about':
        alert(`Code Sandbox v1.0.0
        
A powerful online code editor with real-time preview.
Built with React, TypeScript, and Monaco Editor.

`);
        break;
      
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="layout">
      <Sidebar config={{ ...config.sidebar, toggle: config.toggle, subtitle: config.sidebar.subtitle }} onAction={handleAction} />
      <div className={`layout-content ${layoutMode}`}>
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
      </div>
    </div>
  );
};

export default Layout;