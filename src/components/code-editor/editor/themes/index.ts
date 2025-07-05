import * as monaco from 'monaco-editor'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { Registry } from 'monaco-textmate'
import { loadWASM } from 'onigasm'

import { EditorInstance } from '../types'

import { scopeNameMap, tmGrammarJsonMap, codeThemeList } from './config'

let hasGetAllWorkUrl = false

export const initWorker = async () => {
  await loadWASM(`/onigasm/onigasm.wasm`)
  const originalGetWorkerUrl = window.MonacoEnvironment.getWorkerUrl
  window.MonacoEnvironment.getWorkerUrl = new Proxy(originalGetWorkerUrl, {
    apply(target, thisArg, args) {
      hasGetAllWorkUrl = true
      return target.apply(thisArg, args)
    },
  })
}

/**
 * https://www.cnblogs.com/wanglinmantan/p/15345204.html
 * https://github.com/brijeshb42/monaco-themes
 */
export const initTheme = async () => {
  // 加载主题
  for (const theme of codeThemeList.values()) {
    const themeData = await (await fetch(`/themes/${theme}.json`)).json()
    monaco.editor.defineTheme(theme, themeData)
  }
}

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
      const jsonMap = tmGrammarJsonMap[scopeName]
      return {
        format: 'json',
        content: await (await fetch(`/grammars/${jsonMap}`)).text(),
      }
    },
  })
  // 循环检测
  const loop = () => {
    if (hasGetAllWorkUrl) {
      Promise.resolve().then(async () => {
        await wireTmGrammars(monaco, registry, grammars, editor)
      })
    } else {
      setTimeout(() => {
        loop()
      }, 100)
    }
  }
  loop()
}

/**
 * @param theme 主题名称
 * @param editorInstance 编辑器实例
 */
export const changeTheme = async (theme: string, editorInstance: EditorInstance) => {
  editorInstance.updateOptions({ theme })
}

/**
 * 获取所有的主题列表
 * @returns 所有的主题列表
 */
export const getAllTheme = (): string[] => {
  return codeThemeList
}
