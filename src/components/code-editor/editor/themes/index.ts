import { EditorInstance } from '../types';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { scopeNameMap, tmGrammarJsonMap, codeThemeList } from './config';
import * as monaco from 'monaco-editor';

let hasGetAllWorkUrl = false;

export const initWorker = () => {
  window.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      hasGetAllWorkUrl = true;
      if (label === 'json') {
        return '/monaco/json.worker.bundle.js';
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return '/monaco/css.worker.bundle.js';
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return '/monaco/html.worker.bundle.js';
      }
      if (label === 'typescript' || label === 'javascript') {
        return '/monaco/ts.worker.bundle.js';
      }
      return '/monaco/editor.worker.bundle.js';
    },
  };
};

/**
 * https://www.cnblogs.com/wanglinmantan/p/15345204.html
 * https://github.com/brijeshb42/monaco-themes
 */
export const initTheme = async () => {
  // 加载主题
  for (let theme of codeThemeList.values()) {
    let themeData = await (await fetch(`/themes/${theme}.json`)).json();
    monaco.editor.defineTheme(theme, themeData);
  }
};

/**
 * 创建语法关联
 */
export const wire = async (languageId, editor) => {
  if (!scopeNameMap[languageId]) {
    return;
  }
  // 语言id到作用域名称的映射
  const grammars = new Map();
  grammars.set(languageId, scopeNameMap[languageId]);

  // 创建一个注册表，可以从作用域名称创建语法
  const registry = new Registry({
    getGrammarDefinition: async (scopeName: string, _dependentScope: string) => {
      let jsonMap = tmGrammarJsonMap[scopeName];
      return {
        format: 'json',
        content: await (await fetch(`/grammars/${jsonMap}`)).text(),
      };
    },
  });
  // 循环检测
  let loop = () => {
    if (hasGetAllWorkUrl) {
      Promise.resolve().then(async () => {
        await wireTmGrammars(monaco, registry, grammars, editor);
      });
    } else {
      setTimeout(() => {
        loop();
      }, 100);
    }
  };
  loop();
};

/**
 * @param theme 主题名称
 * @param editorInstance 编辑器实例
 */
export const changeTheme = async (theme: string, editorInstance: EditorInstance) => {
  editorInstance.updateOptions({ theme });
};

/**
 * 获取所有的主题列表
 * @returns 所有的主题列表
 */
export const getAllTheme = (): string[] => {
  return codeThemeList;
};
