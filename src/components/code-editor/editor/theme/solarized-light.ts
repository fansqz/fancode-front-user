import { editor } from 'monaco-editor';

export const solarizedLight: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.foreground': '#586e75',
    'editor.background': '#fdf6e3',
    'editor.selectionBackground': '#eee8d5',
    'editor.lineHighlightBackground': '#eee8d5',
    'editorCursor.foreground': '#657b83',
    'editorLineNumber.foreground': '#93a1a1',
    'editorLineNumber.background': '#fdf6e3',
  },
  rules: [
    { token: 'comment', foreground: '#93a1a1', fontStyle: 'italic' },
    { token: 'string', foreground: '#2aa198' },
    { token: 'keyword', foreground: '#cb4b16', fontStyle: 'bold' },
  ],
};
