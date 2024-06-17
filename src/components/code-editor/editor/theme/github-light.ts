import { editor } from 'monaco-editor';

export const githubLight: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.foreground': '#333333',
    'editor.background': '#ffffff',
    'editor.selectionBackground': '#add6ff',
    'editor.lineHighlightBackground': '#f3f3f3',
    'editorCursor.foreground': '#000000',
    'editorLineNumber.foreground': '#999999',
    'editorLineNumber.background': '#ffffff',
  },
  rules: [
    { token: 'comment', foreground: '#22863a', fontStyle: 'italic' },
    { token: 'string', foreground: '#032f62' },
    { token: 'keyword', foreground: '#d73a49', fontStyle: 'bold' },
  ],
};
