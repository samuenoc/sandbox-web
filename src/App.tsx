import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Sandbox from './components/Sandbox/Sandbox';
import DocumentationPage from './components/Documentation/DocumentationPage';
import type { ContextConfig } from './types';
import contextData from './data/context.json';
import './App.css';

const App: React.FC = () => {
  const [config, setConfig] = useState<ContextConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // In a real app, you might fetch this from an API
      setConfig(contextData as ContextConfig);
      setLoading(false);
    } catch (err) {
      setError('Failed to load configuration');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
        <p>Loading Code Sandbox...</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error || 'Configuration not found'}</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="app">
        <Routes>
          <Route element={<Layout config={config} />}>
            <Route path="/" element={<Sandbox config={config} />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;