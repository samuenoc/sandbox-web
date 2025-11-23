import { editor } from 'monaco-editor';

export interface EditorTheme {
  id: string;
  name: string;
  isDark: boolean;
  theme: editor.IStandaloneThemeData;
}

// Dracula Theme
const draculaTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6272a4' },
    { token: 'string', foreground: 'f1fa8c' },
    { token: 'keyword', foreground: 'ff79c6' },
    { token: 'number', foreground: 'bd93f9' },
    { token: 'type', foreground: '8be9fd' },
    { token: 'class', foreground: '8be9fd' },
    { token: 'function', foreground: '50fa7b' },
    { token: 'variable', foreground: 'f8f8f2' },
    { token: 'variable.predefined', foreground: 'f8f8f2' },
    { token: 'constant', foreground: 'bd93f9' },
    { token: 'tag', foreground: 'ff79c6' },
    { token: 'attribute.name', foreground: '50fa7b' },
    { token: 'attribute.value', foreground: 'f1fa8c' },
    { token: 'punctuation', foreground: 'f8f8f2' },
    { token: 'operator', foreground: 'ff79c6' },
    { token: 'namespace', foreground: 'ff79c6' },
  ],
  colors: {
    'editor.foreground': '#f8f8f2',
    'editor.background': '#282a36',
    'editor.selectionBackground': '#44475a',
    'editor.lineHighlightBackground': '#44475a',
    'editorCursor.foreground': '#f8f8f0',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.background': '#3B3A32',
    'editorIndentGuide.activeBackground': '#6272a4',
  },
};

// Monokai Theme
const monokaiTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '75715e' },
    { token: 'string', foreground: 'e6db74' },
    { token: 'keyword', foreground: 'f92672' },
    { token: 'number', foreground: 'ae81ff' },
    { token: 'type', foreground: '66d9ef' },
    { token: 'class', foreground: 'a6e22e' },
    { token: 'function', foreground: 'a6e22e' },
    { token: 'variable', foreground: 'f8f8f2' },
    { token: 'constant', foreground: 'ae81ff' },
    { token: 'tag', foreground: 'f92672' },
    { token: 'attribute.name', foreground: 'a6e22e' },
    { token: 'attribute.value', foreground: 'e6db74' },
    { token: 'operator', foreground: 'f92672' },
  ],
  colors: {
    'editor.foreground': '#f8f8f2',
    'editor.background': '#272822',
    'editor.selectionBackground': '#49483e',
    'editor.lineHighlightBackground': '#3e3d32',
    'editorCursor.foreground': '#f8f8f0',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.background': '#3B3A32',
    'editorIndentGuide.activeBackground': '#75715e',
  },
};

// GitHub Dark Theme
const githubDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '8b949e' },
    { token: 'string', foreground: 'a5d6ff' },
    { token: 'keyword', foreground: 'ff7b72' },
    { token: 'number', foreground: '79c0ff' },
    { token: 'type', foreground: 'ffa657' },
    { token: 'class', foreground: 'ffa657' },
    { token: 'function', foreground: 'd2a8ff' },
    { token: 'variable', foreground: 'c9d1d9' },
    { token: 'constant', foreground: '79c0ff' },
    { token: 'tag', foreground: '7ee787' },
    { token: 'attribute.name', foreground: '79c0ff' },
    { token: 'attribute.value', foreground: 'a5d6ff' },
    { token: 'operator', foreground: 'ff7b72' },
  ],
  colors: {
    'editor.foreground': '#c9d1d9',
    'editor.background': '#0d1117',
    'editor.selectionBackground': '#264f78',
    'editor.lineHighlightBackground': '#161b22',
    'editorCursor.foreground': '#58a6ff',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.background': '#21262d',
    'editorIndentGuide.activeBackground': '#444d56',
  },
};

// One Dark Pro Theme
const oneDarkProTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '5c6370' },
    { token: 'string', foreground: '98c379' },
    { token: 'keyword', foreground: 'c678dd' },
    { token: 'number', foreground: 'd19a66' },
    { token: 'type', foreground: 'e06c75' },
    { token: 'class', foreground: 'e5c07b' },
    { token: 'function', foreground: '61afef' },
    { token: 'variable', foreground: 'abb2bf' },
    { token: 'constant', foreground: 'd19a66' },
    { token: 'tag', foreground: 'e06c75' },
    { token: 'attribute.name', foreground: 'd19a66' },
    { token: 'attribute.value', foreground: '98c379' },
    { token: 'operator', foreground: '56b6c2' },
  ],
  colors: {
    'editor.foreground': '#abb2bf',
    'editor.background': '#282c34',
    'editor.selectionBackground': '#3e4451',
    'editor.lineHighlightBackground': '#2c313c',
    'editorCursor.foreground': '#528bff',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.background': '#3B3A32',
    'editorIndentGuide.activeBackground': '#5c6370',
  },
};

// Nord Theme
const nordTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '616e88' },
    { token: 'string', foreground: 'a3be8c' },
    { token: 'keyword', foreground: '81a1c1' },
    { token: 'number', foreground: 'b48ead' },
    { token: 'type', foreground: '8fbcbb' },
    { token: 'class', foreground: '8fbcbb' },
    { token: 'function', foreground: '88c0d0' },
    { token: 'variable', foreground: 'd8dee9' },
    { token: 'constant', foreground: 'b48ead' },
    { token: 'tag', foreground: '81a1c1' },
    { token: 'attribute.name', foreground: '8fbcbb' },
    { token: 'attribute.value', foreground: 'a3be8c' },
    { token: 'operator', foreground: '81a1c1' },
  ],
  colors: {
    'editor.foreground': '#d8dee9',
    'editor.background': '#2e3440',
    'editor.selectionBackground': '#434c5e',
    'editor.lineHighlightBackground': '#3b4252',
    'editorCursor.foreground': '#88c0d0',
    'editorWhitespace.foreground': '#434c5e',
    'editorIndentGuide.background': '#434c5e',
    'editorIndentGuide.activeBackground': '#616e88',
  },
};

// Tokyo Night Theme
const tokyoNightTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '565f89' },
    { token: 'string', foreground: '9ece6a' },
    { token: 'keyword', foreground: 'bb9af7' },
    { token: 'number', foreground: 'ff9e64' },
    { token: 'type', foreground: '2ac3de' },
    { token: 'class', foreground: 'ff9e64' },
    { token: 'function', foreground: '7aa2f7' },
    { token: 'variable', foreground: 'c0caf5' },
    { token: 'constant', foreground: 'ff9e64' },
    { token: 'tag', foreground: 'f7768e' },
    { token: 'attribute.name', foreground: '7aa2f7' },
    { token: 'attribute.value', foreground: '9ece6a' },
    { token: 'operator', foreground: '89ddff' },
  ],
  colors: {
    'editor.foreground': '#a9b1d6',
    'editor.background': '#1a1b26',
    'editor.selectionBackground': '#283457',
    'editor.lineHighlightBackground': '#292e42',
    'editorCursor.foreground': '#7aa2f7',
    'editorWhitespace.foreground': '#3b4261',
    'editorIndentGuide.background': '#3b4261',
    'editorIndentGuide.activeBackground': '#565f89',
  },
};

// Solarized Light Theme
const solarizedLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '93a1a1' },
    { token: 'string', foreground: '2aa198' },
    { token: 'keyword', foreground: '859900' },
    { token: 'number', foreground: 'd33682' },
    { token: 'type', foreground: 'b58900' },
    { token: 'class', foreground: 'b58900' },
    { token: 'function', foreground: '268bd2' },
    { token: 'variable', foreground: '657b83' },
    { token: 'constant', foreground: 'd33682' },
    { token: 'tag', foreground: '268bd2' },
    { token: 'attribute.name', foreground: '93a1a1' },
    { token: 'attribute.value', foreground: '2aa198' },
    { token: 'operator', foreground: '859900' },
  ],
  colors: {
    'editor.foreground': '#657b83',
    'editor.background': '#fdf6e3',
    'editor.selectionBackground': '#eee8d5',
    'editor.lineHighlightBackground': '#eee8d5',
    'editorCursor.foreground': '#657b83',
    'editorWhitespace.foreground': '#eee8d5',
    'editorIndentGuide.background': '#eee8d5',
    'editorIndentGuide.activeBackground': '#93a1a1',
  },
};

// Ayu Light Theme
const ayuLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: 'abb0b6' },
    { token: 'string', foreground: '86b300' },
    { token: 'keyword', foreground: 'fa6e32' },
    { token: 'number', foreground: 'ff9940' },
    { token: 'type', foreground: '399ee6' },
    { token: 'class', foreground: '399ee6' },
    { token: 'function', foreground: 'f29718' },
    { token: 'variable', foreground: '575f66' },
    { token: 'constant', foreground: 'a37acc' },
    { token: 'tag', foreground: '55b4d4' },
    { token: 'attribute.name', foreground: 'f29718' },
    { token: 'attribute.value', foreground: '86b300' },
    { token: 'operator', foreground: 'ed9366' },
  ],
  colors: {
    'editor.foreground': '#575f66',
    'editor.background': '#fafafa',
    'editor.selectionBackground': '#d1e4f4',
    'editor.lineHighlightBackground': '#eff0f1',
    'editorCursor.foreground': '#ff6a00',
    'editorWhitespace.foreground': '#e7e8e9',
    'editorIndentGuide.background': '#e7e8e9',
    'editorIndentGuide.activeBackground': '#d3d4d5',
  },
};

// Cobalt2 Theme
const cobalt2Theme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '0088ff' },
    { token: 'string', foreground: '3ad900' },
    { token: 'keyword', foreground: 'ffc600' },
    { token: 'number', foreground: 'ff628c' },
    { token: 'type', foreground: 'ff68b3' },
    { token: 'class', foreground: 'ff68b3' },
    { token: 'function', foreground: 'ffc600' },
    { token: 'variable', foreground: 'ffffff' },
    { token: 'constant', foreground: 'ff628c' },
    { token: 'tag', foreground: '9effff' },
    { token: 'attribute.name', foreground: 'ffc600' },
    { token: 'attribute.value', foreground: '3ad900' },
    { token: 'operator', foreground: 'ffc600' },
  ],
  colors: {
    'editor.foreground': '#ffffff',
    'editor.background': '#193549',
    'editor.selectionBackground': '#0050a4',
    'editor.lineHighlightBackground': '#1f4662',
    'editorCursor.foreground': '#ffc600',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.background': '#3B3A32',
    'editorIndentGuide.activeBackground': '#0088ff',
  },
};

// Material Theme
const materialTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '546e7a' },
    { token: 'string', foreground: 'c3e88d' },
    { token: 'keyword', foreground: 'c792ea' },
    { token: 'number', foreground: 'f78c6c' },
    { token: 'type', foreground: 'ffcb6b' },
    { token: 'class', foreground: 'ffcb6b' },
    { token: 'function', foreground: '82aaff' },
    { token: 'variable', foreground: 'eeffff' },
    { token: 'constant', foreground: 'f78c6c' },
    { token: 'tag', foreground: 'f07178' },
    { token: 'attribute.name', foreground: 'c792ea' },
    { token: 'attribute.value', foreground: 'c3e88d' },
    { token: 'operator', foreground: '89ddff' },
  ],
  colors: {
    'editor.foreground': '#eeffff',
    'editor.background': '#263238',
    'editor.selectionBackground': '#3c4549',
    'editor.lineHighlightBackground': '#37474f',
    'editorCursor.foreground': '#ffcc00',
    'editorWhitespace.foreground': '#37474f',
    'editorIndentGuide.background': '#37474f',
    'editorIndentGuide.activeBackground': '#546e7a',
  },
};

export const editorThemes: EditorTheme[] = [
  {
    id: 'vs',
    name: 'Visual Studio Light',
    isDark: false,
    theme: {} as editor.IStandaloneThemeData, // Built-in
  },
  {
    id: 'vs-dark',
    name: 'Visual Studio Dark',
    isDark: true,
    theme: {} as editor.IStandaloneThemeData, // Built-in
  },
  {
    id: 'hc-black',
    name: 'High Contrast',
    isDark: true,
    theme: {} as editor.IStandaloneThemeData, // Built-in
  },
  {
    id: 'dracula',
    name: 'Dracula',
    isDark: true,
    theme: draculaTheme,
  },
  {
    id: 'monokai',
    name: 'Monokai',
    isDark: true,
    theme: monokaiTheme,
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    isDark: true,
    theme: githubDarkTheme,
  },
  {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    isDark: true,
    theme: oneDarkProTheme,
  },
  {
    id: 'nord',
    name: 'Nord',
    isDark: true,
    theme: nordTheme,
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    isDark: true,
    theme: tokyoNightTheme,
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    isDark: false,
    theme: solarizedLightTheme,
  },
  {
    id: 'ayu-light',
    name: 'Ayu Light',
    isDark: false,
    theme: ayuLightTheme,
  },
  {
    id: 'cobalt2',
    name: 'Cobalt2',
    isDark: true,
    theme: cobalt2Theme,
  },
  {
    id: 'material',
    name: 'Material',
    isDark: true,
    theme: materialTheme,
  },
];

// Function to register all custom themes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerEditorThemes(monaco: any) {
  editorThemes.forEach(theme => {
    if (theme.id !== 'vs' && theme.id !== 'vs-dark' && theme.id !== 'hc-black') {
      monaco.editor.defineTheme(theme.id, theme.theme);
    }
  });
}

// Function to get theme by ID
export function getEditorTheme(themeId: string): EditorTheme | undefined {
  return editorThemes.find(theme => theme.id === themeId);
}

// Function to get themes by type (dark/light)
export function getEditorThemesByType(isDark: boolean): EditorTheme[] {
  return editorThemes.filter(theme => theme.isDark === isDark);
}