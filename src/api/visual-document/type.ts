import { descriptions } from '@/constants/description.ts';
import { VisualDescription } from '@/components/code-visual/visual-setting/type.ts';
import { languageConstants } from '@/constants/languages.ts';

export type VisualDocumentDirectoryResponse = BaseResponse & {
  data: VisualDocumentDirectory[];
};

export type VisualDocumentDirectory = {
  // 可视化节点
  id: number;
  parentID: number;
  title: string;
  enable: boolean;
  order: number;
  chidren: VisualDocumentDirectory[];
};

export type VisualDocumentResponse = BaseResponse & {
  data: VisualDocument;
};

export type VisualDocument = {
  id: number;
  parentID: number;
  title: string;
  content: string;
  creatorID: number;
  enable: boolean;
  codeList: VisualDocumentCode[];
};

export type VisualDocumentCode = {
  code: string;
  language: languageConstants;
  breakpoints: number[];
  visualSetting: string;
};

export type VisualSetting = {
  type: descriptions;
  description: VisualDescription;
};
