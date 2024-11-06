import { EditorInstance } from '../types';
import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { scopeNameMap,tmGrammarJsonMap,monacoEditorInnerLanguages, codeThemeList } from './config';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

/**
 * https://www.cnblogs.com/wanglinmantan/p/15345204.html
 * https://github.com/brijeshb42/monaco-themes
*/
export const initTheme = async () => {
  // 加载onigasm文件
  await loadWASM(`./src/assets/onigasm/onigasm.wasm`);
  // 加载主题
  for(let theme of codeThemeList.values()){
    let themeData = await (
      await fetch(`./src/assets/themes/${theme}.json`)
    ).json()
    monaco.editor.defineTheme(theme, themeData)
  }
};


/**
 * 创建语法关联
 */
export const wire = async (languageId, editor) => {
  if (!scopeNameMap[languageId]) {
    return
  }
  // 语言id到作用域名称的映射
  const grammars = new Map()
  grammars.set(languageId, scopeNameMap[languageId])
  // 创建一个注册表，可以从作用域名称创建语法
  const registry = new Registry({
    getGrammarDefinition: async (scopeName: string, _dependentScope: string) => {
      let jsonMap = tmGrammarJsonMap[scopeName]
      if (!jsonMap) {
        return null
      }
      return {
        format: 'json',
        content: await (await fetch(`./src/assets/grammars/${jsonMap}`)).text()
      }
    }
  })
  // 注册语言
  if (!monacoEditorInnerLanguages.includes(languageId)) {
    monaco.languages.register({ id: languageId })
  }

  await wireTmGrammars(monaco, registry, grammars, editor)
}


/**
 * 用于改变主题时（调用editorInstance.updateOptions({theme:""})）动态导入主题，目前没用上
 * 使用vscode主题https://www.cnblogs.com/wanglinmantan/p/15345204.html
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
