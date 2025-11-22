export interface SidebarOption {
  id: string;
  label: string;
  icon: string;
  action?: string;
  submenu?: SidebarOption[];
}

export interface EditorContent {
  html: string;
  css: string;
  javascript: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  /** Editor theme key derived from app theme (e.g. 'tokyo-night') */
  editorTheme: string;
}

export interface ContextConfig {
  // toggle: Toggle | undefined;
  sidebar: {
    title: string;
    subtitle?: string;
    options: SidebarOption[];
    toggle?: {
      id: string;
      label: string;
      icon: string;
      action: string;
    };
  };
  editor: {
    defaultContent: EditorContent;
    fontSize: number;
    wordWrap: 'on' | 'off';
  };
  preview: {
    refreshDelay: number;
  };
  
}