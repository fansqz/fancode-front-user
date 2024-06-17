import { editor } from 'monaco-editor';

export const tomorrowNight: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.foreground': '#C5C8C6',
    'editor.background': '#1D1F21',
    'editor.selectionBackground': '#373B41',
    'editor.lineHighlightBackground': '#282A2E',
    'editorCursor.foreground': '#F8F8F0',
    'editorLineNumber.foreground': '#969896',
    'editorLineNumber.background': '#1D1F21',
  },
  rules: [
    { token: 'comment', foreground: '#969896', fontStyle: 'italic' },
    { token: 'string', foreground: '#B5BD68' },
    { token: 'keyword', foreground: '#CC6666', fontStyle: 'bold' },
  ],
};
