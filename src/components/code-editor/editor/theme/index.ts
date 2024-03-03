import { editor } from 'monaco-editor';
import { EditorInstance } from '../types';
import { githubLight } from './github-light';
import { monokaiLight } from './monokai-light';
import { solarizedLight } from './solarized-light';
import { tomorrowNight } from './tomorrow-night';
/**
 * 初始化主题，必须在创建实例之前初始化，否则无效，目前是两个主题一起导入，可能会导致卡顿（虽然也没多大），
 * 可以考虑优化
 */
export const initTheme = async () => {
  editor.defineTheme('monokai-light', monokaiLight);
  editor.defineTheme('github-light', githubLight);
  editor.defineTheme('solarized-light', solarizedLight);
  editor.defineTheme('tomorrow-night', tomorrowNight);
};

/**
 * 用于改变主题时（调用editorInstance.updateOptions({theme:""})）动态导入主题，目前没用上
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
  return ['monokai-light', 'github-light', 'solarized-light', 'tomorrow-night'];
};
