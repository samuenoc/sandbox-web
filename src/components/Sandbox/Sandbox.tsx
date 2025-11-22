import React, { useState } from 'react';
import Editor from '../Editor/Editor';
import Preview from '../Preview/Preview';
import type { EditorContent, ContextConfig } from '../../types';
import '../Layout/Layout.css'; // Reuse Layout styles for now or move them

interface SandboxProps {
    config: ContextConfig;
}

const Sandbox: React.FC<SandboxProps> = ({ config }) => {
    const [content, setContent] = useState<EditorContent>(config.editor.defaultContent);
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
    const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
    const [fontSize, setFontSize] = useState(config.editor.fontSize);
    const [wordWrap, setWordWrap] = useState<'on' | 'off'>(config.editor.wordWrap);

    // We need to expose a way to handle actions that come from the Sidebar (which is now in Layout)
    // For now, we can listen to a custom event or use a context. 
    // However, the plan says Sidebar is in Layout. 
    // If Sidebar is in Layout, how does Sandbox receive actions like "new-file"?
    // The plan says: "Layout can handle navigation actions."
    // But "New File" is a Sandbox action.
    // I should probably use useOutletContext or pass a prop if possible, but Outlet doesn't pass props easily.
    // A better approach for this refactor:
    // Layout renders Sidebar. Sidebar emits actions.
    // Layout handles navigation actions (Documentation).
    // Layout passes other actions to the Outlet via context?
    // Or, simpler: The Sidebar is part of the Layout, but the actions need to reach the active route.
    // Let's use `useOutletContext` from react-router-dom.

    // Wait, I need to define the handleAction here and pass it to the context?
    // No, the Sidebar is in the Layout. The Layout receives the action from Sidebar.
    // If it's a global action (nav), Layout handles it.
    // If it's a local action (editor), Layout needs to tell the Outlet.
    // I'll implement `useOutletContext` in Sandbox to receive the action.

    // Actually, for simplicity in this step, I'll move the `handleAction` logic to Sandbox
    // and assume Layout will pass it down via context.

    // Let's write the logic first.

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
        }
    };

    // Expose handleAction to parent (Layout) via ref or context?
    // Or better: Layout uses useOutletContext to PASS the action down?
    // No, Layout receives the action from Sidebar. It needs to call handleAction on the active child.
    // React Router's useOutletContext allows the parent to pass data to the child.
    // So Layout can pass the 'lastAction' to the child.
    // The child (Sandbox) listens to 'lastAction' and executes it.

    return (
        <div className={`layout-content ${layoutMode} w-full h-full`}>
            {/* We will need to wrap this in a component that receives the action from context */}
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

// Helper to consume context
import { useOutletContext } from 'react-router-dom';

const SandboxContent = ({
    content, setContent, activeTab, setActiveTab, fontSize, wordWrap, config, handleAction
}: any) => {
    const { action } = useOutletContext<{ action: string | null }>();

    // React to action changes
    React.useEffect(() => {
        if (action) {
            handleAction(action);
        }
    }, [action]);

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
