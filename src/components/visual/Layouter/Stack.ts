import { SV } from 'structv2';
import G6 from '@antv/g6';

SV.registerLayout('Stack', {
  sourcesPreprocess(sources, options) {
    const stackBottomNode = sources[sources.length - 1];

    if (stackBottomNode.external) {
      stackBottomNode.bottomExternal = stackBottomNode.external;
      delete stackBottomNode.external;
    }

    return sources;
  },

  defineLeakRule(nodes) {
    return [];
  },

  defineOptions() {
    return {
      element: {
        default: {
          type: 'array-node',
          label: '[id]',
          size: [60, 30],
          style: {
            stroke: '#333',
            fill: '#95e1d3',
          },
        },
      },
      marker: {
        external: {
          type: 'pointer',
          anchor: 1,
          style: {
            fill: '#f08a5d',
          },
        },
        bottomExternal: {
          type: 'pointer',
          anchor: 2,
          style: {
            fill: '#f08a5d',
          },
        },
        cursor: {
          type: 'cursor',
          anchor: 1,
          style: {
            fill: '#f08a5d',
          },
        },
      },
      indexLabel: {
        index: { position: 'left' },
      },
      behavior: {
        dragNode: false,
      },
    };
  },

  layout(elements, layoutOptions) {
    let blocks = elements;

    for (let i = 1; i < blocks.length; i++) {
      let item = blocks[i],
        prev = blocks[i - 1],
        height = item.get('size')[1];

      item.set('y', prev.get('y') + height);
    }
  },
});
