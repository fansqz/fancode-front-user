import { VisualDescription } from '@/store/modules/visual';
import { Source } from 'structv2';
import reqArrayVisualData from './array';
import reqBinaryTreeVisualData from './binary-tree';
import reqGraphVisualData from './graph';
import reqLinkListVisualData from './link-list';

export const reqVisualData = async (
  debugID: string,
  description: VisualDescription,
): Promise<Source> => {
  console.log(description);
  if (description.type == 'array') {
    return reqArrayVisualData(debugID, description);
  } else if (description.type == 'binaryTree') {
    return reqBinaryTreeVisualData(debugID, description);
  } else if (description.type == 'graph') {
    return reqGraphVisualData(debugID, description);
  } else if (description.type == 'linkList') {
    return reqLinkListVisualData(debugID, description);
  }
};
