import { editor, languages } from 'monaco-editor';
import { Ref } from 'vue';

export type EditorInstance = editor.IStandaloneCodeEditor;

export type vsCodeRequest = {
  // 编程语言
  language: string;
  // 目标元素
  target: Ref<HTMLElement | undefined>;
  // 主题
  theme: string;
  // 文件
  files: Ref<
    {
      value: string;
      id: number | string;
    }[]
  >;
};
