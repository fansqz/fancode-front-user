// 编译器支持的语言
export const monacoEditorInnerLanguages = ['go', 'java', 'c'];

// 语言id到作用域名称的映射
export const scopeNameMap = {
  go: 'source.go',
  c: 'source.c',
  java: 'source.java',
};

// 作用域名称到语法文件的映射
export const tmGrammarJsonMap = {
  'source.go': 'go.tmLanguage.json',
  'source.c': 'c.tmLanguage.json',
  'source.java': 'java.tmLanguage.json',
};

// 主题配置
export const codeThemeList = ['BlulocoLight', 'GitHubLight', 'Monokai', 'OneDarkPro'];