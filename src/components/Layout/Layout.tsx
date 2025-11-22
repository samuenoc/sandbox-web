import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import type { ContextConfig } from '../../types';
import './Layout.css';

interface LayoutProps {
  config: ContextConfig;
}

const Layout: React.FC<LayoutProps> = ({ config }) => {
  const navigate = useNavigate();
  const [lastAction, setLastAction] = useState<{ action: string; timestamp: number } | null>(null);

  const handleAction = (action: string) => {
    // Handle navigation actions
    if (action === 'navigate-documentation') {
      navigate('/documentation');
      return;
    }

    // Pass other actions to the Outlet via context
    // We use a timestamp to ensure the same action can be triggered multiple times
    setLastAction({ action, timestamp: Date.now() });
  };

  return (
    <div className="layout">
      <Sidebar config={{ ...config.sidebar, toggle: config.sidebar.toggle, subtitle: config.sidebar.subtitle }} onAction={handleAction} />
      <Outlet context={{ action: lastAction?.action }} />
    </div>
  );
};

export default Layout;