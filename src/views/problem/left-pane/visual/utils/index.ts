import { VisualizeDescription } from '@/store/modules/visual';
import { Source } from 'structv2';
import reqArrayVisualizeData from './array';
import reqBinaryTreeVisualizeData from './binary-tree';
import reqGraphVisualizeData from './graph';

export const reqVisualizeData = async (
  debugID: string,
  description: VisualizeDescription,
): Promise<Source> => {
  if (description.type == 'array') {
    return reqArrayVisualizeData(debugID, description);
  } else if (description.type == 'binaryTree') {
    return reqBinaryTreeVisualizeData(debugID, description);
  } else if (description.type == 'graph') {
    return reqGraphVisualizeData(debugID, description);
  }
};
