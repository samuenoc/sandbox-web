import React, { useState } from "react";
import {
  File,
  FilePlus,
  Save,
  Download,
  Eye,
  Columns,
  Rows3,
  Maximize,
  Settings,
  Moon,
  Sun,
  Type,
  WrapText,
  Layout,
  FileCode,
  Package,
  Wind,
  HelpCircle,
  Keyboard,
  Info,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
  Terminal,
  Cloud,
  Code,
  Book
} from "lucide-react";
import type { SidebarOption } from "../../types/index";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface Toggle {
  id: string;
  label: string;
  icon: string;
  action: string;
}

interface SidebarProps {
  config: {
    title: string;
    subtitle?: string;
    options: SidebarOption[];
    toggle?: Toggle;
  };
  onAction: (action: string) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  File,
  FilePlus,
  Save,
  Download,
  Eye,
  Columns,
  Rows: Rows3,
  Maximize,
  Settings,
  Moon,
  Sun,
  Type,
  WrapText,
  Layout,
  FileCode,
  Package,
  Wind,
  HelpCircle,
  BookOpen,
  Keyboard,
  Info,
  Menu,
  Terminal,
  Cloud,
  Code,
  X,
  Book,
};

const Sidebar: React.FC<SidebarProps> = ({ config, onAction }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAction = (action: string) => {
    // If on documentation page and action is not navigate-documentation, go to root first
    if (location.pathname === '/documentation' && action !== 'navigate-documentation') {
      navigate('/');
      // Delay the action slightly to allow navigation to complete
      setTimeout(() => {
        if (action === "toggle-theme") {
          toggleTheme();
        } else {
          onAction(action);
        }
      }, 100);
    } else {
      if (action === "toggle-theme") {
        toggleTheme();
      } else {
        onAction(action);
      }
    }
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const renderOption = (option: SidebarOption, level: number = 0) => {
    const Icon = iconMap[option.icon] || File;
    const hasSubmenu = option.submenu && option.submenu.length > 0;
    const isExpanded = expandedItems.has(option.id);

    if (option.id === "theme-toggle") {
      // Skip rendering the theme toggle in the menu if it's there
      return null;
    }

    return (
      <li key={option.id} className="sidebar-item">
        <button
          className={`sidebar-button level-${level} ${hasSubmenu ? "has-submenu" : ""}`}
          onClick={() => {
            if (hasSubmenu) toggleExpanded(option.id);
            else if (option.action) handleAction(option.action);
          }}
        >
          <div className="icon-sidebar">
            <Icon size={18} stroke="url(#sidebarGradient)" />
          </div>
          {!isCollapsed && <span>{option.label}</span>}
          {hasSubmenu && !isCollapsed && (
            <span className="chevron">
              {isExpanded ? (
                <ChevronDown size={16} stroke="url(#sidebarGradient)" />
              ) : (
                <ChevronRight size={16} stroke="url(#sidebarGradient)" />
              )}
            </span>
          )}
        </button>
        {hasSubmenu && isExpanded && (
          <ul className="sidebar-submenu">
            {option.submenu!.map((subOption) => renderOption(subOption, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <linearGradient id="sidebarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#762F7E" />
            <stop offset="100%" stopColor="#6E2BF8" />
          </linearGradient>
        </defs>
      </svg>

      <button className="mobile-menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed ? (
            <>
              <div className="header-content">
                <div className="header-icon" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                  <img
                    src="/icon.png"
                    alt="Logo"
                    // className="sidebar-logo"
                    style={{ width: '50px' }}
                  />
                </div>
                <div className="header-text">
                  <h2>{config.title}</h2>
                  <h4>{config.subtitle}</h4>
                </div>
              </div>
              <button className="collapse-btn" onClick={() => setIsCollapsed(true)}>
                <ChevronLeft size={20} />
              </button>
            </>
          ) : (
            <div
              className="collapsed-icon"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            >
              <img
                src="/icon.png"
                alt="Logo"
                // className="sidebar-logo"
              />
            </div>
          )}
        </div>

        {!isCollapsed && (
          <>
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">{config.options.map((option) => renderOption(option))}</ul>
            </nav>

            <div className="sidebar-footer">
              {config.toggle ? (
                <div className="footer-toggle">
                  <div className="toggle-label">
                    {theme === "light" ? (
                      <Sun size={18} stroke="url(#sidebarGradient)" />
                    ) : (
                      <Moon size={18} stroke="url(#sidebarGradient)" />
                    )}
                    <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
                  </div>
                  <button
                    className="switch-button"
                    role="switch"
                    aria-checked={theme === "dark"}
                    onClick={() => {
                      toggleTheme();
                      if (config.toggle && config.toggle.action) onAction(config.toggle.action);
                    }}
                    aria-label={theme === "light" ? "Light Mode" : "Dark Mode"}
                  >
                    <span className="switch-knob" />
                  </button>
                </div>
              ) : (
                <p>Hecho por UNAH</p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
