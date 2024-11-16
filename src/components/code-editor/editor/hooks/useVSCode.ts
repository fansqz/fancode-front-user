import { WatchStopHandle, onBeforeUnmount, onMounted, watch } from 'vue';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

import useDebugStore from '@/store/modules/debug';
import useCodingStore from '@/store/modules/coding';
import { initTheme, changeTheme, wire } from '../themes';
import debounce from 'lodash.debounce';
import { EditorInstance, VsCode } from '../types';
import editUtils from '../utils/editUtils';
import { debug, cancelHighlightLine, highlightLine, scrollIntoView } from '../utils/debugUtils';
import { setBreakPoint } from '../utils/breakpoint';

// TODO: 调试时修改代码改变高亮行，输入改变时更新断点
/**
 *
 * @param { VsCode } params
 */
export const useVsCode = (vscode: VsCode) => {
  const debugStore = useDebugStore();
  const codingStore = useCodingStore();
  return new Promise((resolve) => {
    let { target, onContentChanged, onEditorBlur, onCtrlS, onUpdateBP } = vscode;

    let stopValueWatch: WatchStopHandle;
    let editorInstance: EditorInstance;
    onMounted(async () => {
      if (!target.value) {
        throw new TypeError('target值必须是一个正确的vue ref');
      }
      // 必须先初始化主题再创建实例
      await initTheme();

      const { getConfigs } = await import('../conf');

      // 创建editor实例
      editorInstance = editor.create(
        target.value,
        getConfigs({
          value: codingStore.code,
          readOnly: false,
          theme: codingStore.theme,
          language: codingStore.language,
        }),
      );

      // 设置语言
      wire(codingStore.language, editorInstance);

      // 监控value的变化
      stopValueWatch = watch(
        () => codingStore.editorUpdateCode,
        () => {
          if (codingStore.editorUpdateCode > 0) {
            editorInstance?.setValue(codingStore.code);
          }
          codingStore.editorUpdateCode = 0;
        },
      );

      // 监控语言变化
      watch(
        () => codingStore.language,
        async (val) => {
          const model = editorInstance.getModel();
          if (model) {
            //设置语言
            editor.setModelLanguage(model, val);
            wire(val, editorInstance);
          }
        },
      );

      // 监控主题变化
      watch(
        () => codingStore.theme,
        async (val) => {
          changeTheme(val, editorInstance);
        },
      );

      // 调试
      watch(
        () => debugStore.lineNum,
        async (val, oldVal) => {
          const model = editorInstance.getModel();
          debug({ model, currentline: val, preline: oldVal, instance: editorInstance });
        },
        { immediate: true },
      );

      // 错误定位
      watch(
        () => debugStore.currentErrorLocation,
        async (val: number[]) => {
          // 设置高亮行
          const currentLine = Number(val[0]);
          const model = editorInstance.getModel();
          // 如果模型有效，那么高亮错误行
          if (model) {
            highlightLine(model, currentLine);
            // 滚动编辑器视图确保错误行在视野中
            scrollIntoView(editorInstance, currentLine);
            // 添加鼠标点击事件，用于在用户点击时取消高亮显示
            editorInstance.onMouseDown(function () {
              // 获取当前行的所有装饰（高亮）
              const decorations = model?.getLineDecorations(currentLine);
              // 获取包含'debug-line'类的装饰的ID数组
              const decorationsIds = decorations
                .filter((item) => item.options.className?.includes('debug-line'))
                .map((item) => item.id);
              // 调用取消高亮行函数，移除之前的高亮显示
              cancelHighlightLine(model, decorationsIds);
            });
          }
        },
        // 深度监听
        { deep: true },
      );

      // 监控断点情况
      setBreakPoint(editorInstance, onUpdateBP);

      // 成功回调
      resolve(editorInstance);

      // 监控内容修改，执行回调
      editorInstance.onDidChangeModelContent(
        debounce(async () => {
          // 使用防抖，在不输入内容的时候进行保存
          onContentChanged?.(editorInstance.getValue());
        }, 600),
      );

      // 监听编辑器文本区域失去焦点的事件
      editorInstance.onDidBlurEditorText(() => {
        onEditorBlur?.(editorInstance.getValue());
      });

      // 添加对ctl + s的监听
      editUtils.addSaveCodeListener(editorInstance, onCtrlS);
    });

    // 在组件即将卸载前执行，做些销毁动作
    onBeforeUnmount(() => {
      stopValueWatch();
      let model = editorInstance.getModel();
      model?.dispose();
      editorInstance?.dispose();
      console.log('离开咯', editorInstance);
    });
  });
};
