import { SV, SourceNode, LayoutGroupOptions, SVNode, LayoutOptions } from 'structv2';

// 数组
SV.registerLayout('array', {
  defineLeakRule(_models: SVNode[]): SVNode[] {
    return [];
  },

  defineOptions(_sourceData: SourceNode[]): LayoutGroupOptions {
    return {
      node: {
        default: {
          type: 'array-node',
          label: '[data]',
          size: [60, 30],
          labelOptions: {
            style: { fontSize: 20 },
          },
          style: {
            stroke: '#333',
            fill: '#95e1d3',
          },
        },
      },
      marker: {
        headExternal: {
          type: 'pointer',
          anchor: 3,
          style: {
            fill: '#f08a5d',
          },
        },
        external: {
          type: 'pointer',
          anchor: 0,
          style: {
            fill: '#f08a5d',
          },
        },
      },
      indexLabel: {
        index: { position: 'bottom' },
        indexRight: { position: 'right' },
      },
      behavior: {
        dragNode: false,
      },
    };
  },

  layout(nodes: SVNode[], _layoutOptions: LayoutOptions) {
    let arr = nodes;
    for (let i = 0; i < arr.length; i++) {
      let width = arr[i].get('size')[0];
      if (i > 0) {
        arr[i].set('x', arr[i - 1].get('x') + width);
      }
    }
  },
});
