import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import type { EditorContent } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import './Editor.css';

interface EditorProps {
  content: EditorContent;
  onChange: (content: EditorContent) => void;
  activeTab: 'html' | 'css' | 'javascript';
  onTabChange: (tab: 'html' | 'css' | 'javascript') => void;
  fontSize?: number;
  wordWrap?: 'on' | 'off';
}

const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  activeTab,
  onTabChange,
  fontSize = 14,
  wordWrap = 'on'
}) => {
  const { theme, editorTheme } = useTheme();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define custom light theme (clean, high-contrast)
    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '111827', background: 'ffffff' },
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7c3aed' },
        { token: 'number', foreground: 'b91c1c' },
        { token: 'string', foreground: '059669' },
        { token: 'tag', foreground: '2563eb' },
        { token: 'attribute.name', foreground: 'f59e0b' },
        { token: 'attribute.value', foreground: 'c084fc' }
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f1724',
        'editorLineNumber.foreground': '#9ca3af',
        'editorCursor.foreground': '#7c3aed',
        'editorLineNumber.activeForeground': '#374151',
        'editor.selectionBackground': '#c7b3ff66',
        'editor.inactiveSelectionBackground': '#c7b3ff33'
      }
    });

    // Define custom dark theme (Tokyo Night inspired)
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'c0caf5', background: '1a1b26' },
        { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'bb9af7' },
        { token: 'number', foreground: 'ff9e64' },
        { token: 'string', foreground: '9ece6a' },
        { token: 'tag', foreground: '7aa2f7' },
        { token: 'attribute.name', foreground: 'f7768e' },
        { token: 'attribute.value', foreground: 'ffd580' }
      ],
      colors: {
        'editor.background': '#1a1b26',
        'editor.foreground': '#c0caf5',
        'editorLineNumber.foreground': '#565f89',
        'editorCursor.foreground': '#bb9af7',
        'editorLineNumber.activeForeground': '#c0caf5',
        'editor.selectionBackground': '#2a334a',
        'editor.inactiveSelectionBackground': '#232634',
        'editorIndentGuide.background': '#11182733'
      }
    });

    // Apply current theme; if `editorTheme` requests tokyo-night, use our Tokyo Night palette
    if (editorTheme === 'tokyo-night') {
      monaco.editor.setTheme('custom-dark');
    } else {
      monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
    }

    // Focus editor on mount
    editor.focus();
  };

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.editor) {
      if (editorTheme === 'tokyo-night') {
        monacoRef.current.editor.setTheme('custom-dark');
      } else {
        monacoRef.current.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
      }
    }
  }, [theme, editorTheme]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange({
        ...content,
        [activeTab]: value
      });
    }
  };

  const getLanguage = (tab: string) => {
    switch (tab) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'javascript':
        return 'javascript';
      default:
        return 'html';
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-tabs">
          <button
            className={`editor-tab ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => onTabChange('html')}
          >
            HTML
          </button>
          <button
            className={`editor-tab ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => onTabChange('css')}
          >
            CSS
          </button>
          <button
            className={`editor-tab ${activeTab === 'javascript' ? 'active' : ''}`}
            onClick={() => onTabChange('javascript')}
          >
            JavaScript
          </button>
        </div>
        <div className="editor-actions">
          <button 
            className="editor-action-btn"
            onClick={formatCode}
            title="Format Code (Alt+Shift+F)"
          >
            Format
          </button>
        </div>
      </div>
      <div className="editor-content">
        <MonacoEditor
          height="100%"
          language={getLanguage(activeTab)}
          theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
          value={content[activeTab]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: fontSize,
            wordWrap: wordWrap,
            minimap: {
              enabled: false
            },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            parameterHints: {
              enabled: true
            },
            suggestSelection: 'first',
            snippetSuggestions: 'inline',
            suggest: {
              snippetsPreventQuickSuggestions: false
            },
            bracketPairColorization: {
              enabled: true
            },
            padding: {
              top: 16,
              bottom: 16
            }
          }}
        />
      </div>
    </div>
  );
};

export default Editor;