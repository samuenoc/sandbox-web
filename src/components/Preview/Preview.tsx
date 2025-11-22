import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { EditorContent } from '../../types';
import './Preview.css';

interface PreviewProps {
  content: EditorContent;
  refreshDelay?: number;
}

const Preview: React.FC<PreviewProps> = ({ content, refreshDelay = 500 }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cleanHTML = useCallback((html: string): string => {
    // Remove DOCTYPE, html, head, body tags if they exist
    let cleaned = html
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
      .replace(/<body[^>]*>/gi, '')
      .replace(/<\/body>/gi, '')
      .trim();

    // If the HTML still contains a title tag, extract just the body content
    if (cleaned.includes('<title>')) {
      const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        cleaned = bodyMatch[1].trim();
      }
    }

    return cleaned;
  }, []);

  const updatePreview = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      setError('Iframe not found');
      setIsLoading(false);
      return;
    }

    try {
      // Get the content for each section
      const htmlContent = cleanHTML(content.html);
      const cssContent = content.css || '';
      const jsContent = content.javascript || '';

      // Create the full HTML document
      const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* User styles */
        ${cssContent}
    </style>
</head>
<body>
    ${htmlContent}
    <script>
        (function() {
            'use strict';
            
            // Override console methods to capture logs
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
                originalLog.apply(console, args);
            };
            
            console.error = function(...args) {
                originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
                originalWarn.apply(console, args);
            };
            
            // Global error handler
            window.addEventListener('error', function(event) {
                console.error('Runtime Error:', event.message, 'at line', event.lineno);
                event.preventDefault();
            });
            
            window.addEventListener('unhandledrejection', function(event) {
                console.error('Unhandled Promise Rejection:', event.reason);
                event.preventDefault();
            });
            
            // Execute user's JavaScript code
            try {
                ${jsContent}
            } catch (error) {
                console.error('JavaScript Execution Error:', error.message);
            }
        })();
    </script>
</body>
</html>`;

      // Write to iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (!iframeDoc) {
        setError('Cannot access iframe document');
        setIsLoading(false);
        return;
      }

      // Clear and write new content
      iframeDoc.open();
      iframeDoc.write(fullDocument);
      iframeDoc.close();

      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Preview update error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
    }
  }, [content, cleanHTML]);

  // Update preview when content changes
  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsLoading(true);
    setError(null);

    // Debounce the preview update
    timeoutRef.current = setTimeout(() => {
      updatePreview();
    }, refreshDelay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content.html, content.css, content.javascript, refreshDelay, updatePreview]);

  const handleRefresh = () => {
    setIsLoading(true);
    setError(null);
    updatePreview();
  };

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(err => {
        console.error('Fullscreen error:', err);
      });
    }
  };

  const handleNewWindow = () => {
    const htmlContent = cleanHTML(content.html);
    const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - New Window</title>
    <style>${content.css}</style>
</head>
<body>
    ${htmlContent}
    <script>${content.javascript}</script>
</body>
</html>`;

    const blob = new Blob([fullDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'width=800,height=600');

    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="preview-title">
          <span className={`preview-dot ${error ? 'error' : ''}`}></span>
          <span>Preview</span>
          {isLoading && <span className="preview-loading">Updating...</span>}
          {error && <span className="preview-error" title={error}>Error</span>}
        </div>
        <div className="preview-actions">
          <button
            className="preview-action-btn"
            onClick={handleRefresh}
            title="Refresh Preview (F5)"
          >
            ↻
          </button>
          <button
            className="preview-action-btn"
            onClick={handleNewWindow}
            title="Open in New Window"
          >
            ⧉
          </button>
          <button
            className="preview-action-btn"
            onClick={handleFullscreen}
            title="Fullscreen (F11)"
          >
            ⛶
          </button>
        </div>
      </div>
      <div className="preview-content">
        {error ? (
          <div className="preview-error-container">
            <h3>Preview Error</h3>
            <p>{error}</p>
            <button onClick={handleRefresh}>Try Again</button>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="preview-iframe"
            title="Code Preview"
            sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
            frameBorder="0"
          />
        )}
      </div>
    </div>
  );
};

export default Preview;