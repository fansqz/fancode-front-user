export type LinkListData = {
  data: LinkListNode[];
  layouter: 'linkList';
};

export type LinkListNode = {
  id: string;
  external?: string[];
  // 数据
  data?: string;
  next: string;
  pre?: string;
};
