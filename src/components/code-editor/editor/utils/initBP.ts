import { editor, Range } from 'monaco-editor/esm/vs/editor/editor.api';
import { Model } from '../types';

/**
 * 初始化断点
 * @param model 要初始化的model
 * @param range 断点数组
 */
export const initBP = (model: Model, bp?: number[]) => {
  if (bp) {
    // 个人理解是第一个参数传之前的断点identifier，用来删除，第二个参数用来创建断点
    model.deltaDecorations(
      [],
      bp.map((lineNum) => {
        return {
          range: new Range(lineNum, 1, lineNum, 1),
          options: {
            isWholeLine: true,
            // className: "content", // 设置行的背景颜色（自己设置css，给类名）
            glyphMarginClassName: 'breakpoint active',
            stickiness: editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            glyphMarginHoverMessage: { value: '断点' },
          },
        };
      }),
    );
  }
};
