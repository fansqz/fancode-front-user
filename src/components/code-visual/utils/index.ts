import { VisualDescription } from '@/components/code-visual/visual-setting/type.ts';
import { descriptions } from '@/enum/description';
import { Source } from 'structv2';
import reqArrayVisualData from './array';
import reqBinaryTreeVisualData from './binary-tree';
import reqGraphVisualData from './graph';
import reqLinkListVisualData from './link-list';

export const reqVisualData = async (
  debugID: string,
  type: descriptions,
  description: VisualDescription,
): Promise<Source> => {
  if (type == descriptions.Array) {
    return reqArrayVisualData(debugID, description);
  } else if (type == descriptions.BinaryTree) {
    return reqBinaryTreeVisualData(debugID, description);
  } else if (type == descriptions.Graph) {
    return reqGraphVisualData(debugID, description);
  } else if (type == descriptions.LinkList) {
    return reqLinkListVisualData(debugID, description);
  }
};
