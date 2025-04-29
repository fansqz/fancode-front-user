import * as monaco from 'monaco-editor';
import { supportedLanguages } from '@/constants/languages.ts';
import { getLanguageKeywords, getLanguageBaseDataTypes } from './language-keyword.ts';

let languageProvider = [];

// 封装分词逻辑
const tokenize = (content) => {
  // 考虑更多的分隔符，如标点符号等
  return content.split(/[\s.,;:\(\)\[\]\{\}"'?!]+/).filter((word) => word.length > 0);
};

// 检查分词是否在字符串内部
const isInsideString = (content, word) => {
  let inString = false;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '"' || content[i] === "'" || content[i] === '`') {
      inString = !inString;
    }
    if (inString && content.includes(word)) {
      return true;
    }
  }
  return false;
};

export const registerAllProvider = () => {
  for (let language of supportedLanguages) {
    const registerPro = registerProvider(language);
    languageProvider.push(registerPro);
  }
};

export const unregisterAllProvider = () => {
  for (let provider of languageProvider) {
    provider.dispose();
  }
  languageProvider = [];
};

/**
 * 注册：自定义语法补全
 * @param language 语言类型
 * @param constValues 常量提示
 */
export const registerProvider = (language) => {
  const monacoProvider = monaco.languages.registerCompletionItemProvider(language, {
    provideCompletionItems: function (model, position, _context, _token) {
      // 获取整个编辑器的内容
      const content = model.getValue();
      // 对上下文进行分词
      const contextWords = tokenize(content);
      // 过滤掉字符串里面的值
      const filteredContextWords = contextWords.filter((word) => {
        return !isInsideString(content, word);
      });

      // 通过下标来获取当前光标后一个内容，即为刚输入的内容
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // 获取当前语言的关键字
      const languageKeywords = getLanguageKeywords(language);
      const keywordSuggestions = languageKeywords.map((e) => ({
        label: e as string,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: e as string,
        detail: `${language} 语言关键字`,
        range: range,
      }));

      // 获取当前语言的基本数据类型
      const languageBaseDataTypes = getLanguageBaseDataTypes(language);
      const dataTypeSuggestions = languageBaseDataTypes.map((e) => ({
        label: e as string,
        kind: monaco.languages.CompletionItemKind.Keyword, // 这里可以根据实际情况调整 kind
        insertText: e as string,
        detail: `${language} 语言基本数据类型`,
        range: range,
      }));

      // 过滤掉上下文中与 Go 语言关键字重叠的部分
      const goKeywords = getLanguageKeywords('go');
      const filteredContextWordsAfterGoKeywords = filteredContextWords.filter((word) => {
        return !goKeywords.includes(word);
      });

      // 过滤掉上下文中与基本数据类型重叠的部分
      const filteredContextWordsAfterDataType = filteredContextWordsAfterGoKeywords.filter(
        (word) => {
          const baseDataTypes = getLanguageBaseDataTypes(language);
          return !baseDataTypes.includes(word);
        },
      );

      // 对上下文分词和语言代码提示进行去重
      const uniqueContextWords = [...new Set(filteredContextWordsAfterDataType)];
      const combinedSuggestions = keywordSuggestions.concat(dataTypeSuggestions);
      const uniqueSuggestions = combinedSuggestions.filter((suggestion) => {
        return !uniqueContextWords.includes(suggestion.label);
      });

      const contextSuggestions = uniqueContextWords.map((word) => ({
        label: word as string,
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: word as string,
        range: range,
      }));

      const newSuggestions = contextSuggestions.concat(uniqueSuggestions);

      return {
        suggestions: newSuggestions,
        isIncomplete: false,
      };
    },
    triggerCharacters: ['$', ''],
  });
  return monacoProvider;
};
