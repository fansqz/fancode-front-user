export type IndentedNode = {
  child?: string[];
  id: string;
  root?: boolean;
  data: string;
};

// IndentedTree 传递的数据类型
export type IndentedTreeData = {
  data: IndentedNode[];
  layouter: 'Indented';
};
