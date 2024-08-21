import { SV, SourceNode, LayoutGroupOptions, SVNode, LayoutOptions } from 'structv2';
import G6 from '@antv/g6';

// 单向链表
SV.registerLayout('LinkList', {
  sourcesPreprocess(sources) {
    let root = sources[0];

    if (root.external) {
      root.rootExternal = root.external;
      delete root.external;
    }

    return sources;
  },

  defineOptions(_sourceData: SourceNode[]): LayoutGroupOptions {
    return {
      node: {
        default: {
          type: 'link-list-node',
          label: '[data]',
          size: [60, 30],
          style: {
            stroke: '#333',
            fill: '#eaffd0',
            cursor: 'pointer',
          },
        },
      },
      link: {
        next: {
          type: 'line',
          sourceAnchor: 2,
          targetAnchor: 6,
          style: {
            stroke: '#333',
            endArrow: 'default',
            startArrow: {
              path: G6.Arrow.circle(2, -1),
              fill: '#333',
            },
          },
        },
        loopNext: {
          type: 'quadratic',
          curveOffset: -100,
          sourceAnchor: 2,
          targetAnchor: 7,
          style: {
            stroke: '#333',
            endArrow: 'default',
            startArrow: {
              path: G6.Arrow.circle(2, -1),
              fill: '#333',
            },
          },
        },
      },
      marker: {
        rootExternal: {
          type: 'pointer',
          anchor: 6,
          offset: 8,
          style: {
            fill: '#f08a5d',
          },
        },
        external: {
          type: 'pointer',
          anchor: 0,
          offset: 8,
          style: {
            fill: '#f08a5d',
          },
        },
      },
      layout: {
        xInterval: 50,
        yInterval: 50,
      },
    };
  },

  /**
   *
   * @param node
   * @param parent
   */
  layoutItem(node: SVNode, prev: SVNode, layoutOptions: LayoutOptions) {
    if (!node) {
      return null;
    }

    let width = node.get('size')[0];

    if (prev) {
      node.set('y', prev.get('y'));
      node.set('x', prev.get('x') + layoutOptions.xInterval + width);
    }

    if (node.next) {
      this.layoutItem(node.next, node, layoutOptions);
    }
  },

  layout(nodes: SVNode[], layoutOptions: LayoutOptions) {
    let root = nodes[0];
    this.layoutItem(root, null, layoutOptions);
  },
});
