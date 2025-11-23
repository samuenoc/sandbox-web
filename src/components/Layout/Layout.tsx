import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import type { ContextConfig } from '../../types';
import './Layout.css';

interface LayoutProps {
  config: ContextConfig;
}

const Layout: React.FC<LayoutProps> = ({ config }) => {
  const [lastAction, setLastAction] = useState<{ action: string; timestamp: number } | null>(null);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    if (action === 'navigate-documentation') {
      navigate('/documentation');
      return;
    }

    // Pass actions to the Outlet via context
    // We use a timestamp to ensure the same action can be triggered multiple times
    setLastAction({ action, timestamp: Date.now() });
  };

  return (
    <div className="layout">
      <Sidebar config={{ ...config.sidebar, subtitle: config.sidebar.subtitle, toggle: config.toggle }} onAction={handleAction} />
      <div className="layout-content">
        <Outlet context={{ action: lastAction?.action }} />
      </div>
    </div>
  );
};

export default Layout;