import { SV, Group, SVNode, LayoutOptions } from 'structv2';
import G6 from '@antv/g6';

// 链表
SV.registerLayout('linkList', {
  sourcesPreprocess(sources) {
    let root = sources[0];

    if (root.external) {
      root.rootExternal = root.external;
      delete root.external;
    }

    return sources;
  },

  defineOptions() {
    return {
      node: {
        default: {
          type: 'link-list-node',
          label: '[data]',
          size: [60, 30],
          style: {
            stroke: '#333',
            fill: '#cfddfe',
            cursor: 'pointer',
          },
        },
      },
      link: {
        next: {
          type: 'line',
          sourceAnchor: 6,
          targetAnchor: 5,
          style: {
            stroke: '#333',
            endArrow: 'default',
            startArrow: {
              path: G6.Arrow.circle(2, -1),
              fill: '#333',
            },
          },
        },
        prev: {
          type: 'line',
          sourceAnchor: 7,
          targetAnchor: 2,
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
          anchor: 0,
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
        xInterval: 80,
        yInterval: 80,
      },
    };
  },

  /**
   * 对子树进行递归布局
   * @param node
   * @param parent
   */
  layoutItem(node, layoutOptions) {
    if (!node) {
      return null;
    }

    let bound = node.getBound(),
      width = bound.width,
      group = new Group(node),
      nextGroup = null,
      nextBound = null

    if (node.visited) {
      return null;
    }

    node.visited = true;

    if (node.next) {
      nextGroup = this.layoutItem(node.next, layoutOptions);
      nextBound = nextGroup.getBound();
      node.set('x', nextBound.x - layoutOptions.xInterval - width);
      group.add(nextGroup);
    }

    return group
  },

  layout(elements: SVNode[], layoutOptions: LayoutOptions) {
    let groups = [];
    // 解决多棵树相交问题
    for (let element of elements) {
      if (element.root) {
        let group = this.layoutItem(element, layoutOptions);
        groups.push(group);
      }
    }
    // 避免多个链表相交
    for (let i = 0; i < groups.length - 1; i++) {
      let bound1 = groups[i].getBound();
      let bound2 = groups[i + 1].getBound();
      let move = Math.abs(bound2.y - layoutOptions.yInterval - bound1.y - bound1.height);
      console.log(groups[i + 1]);
      groups[i + 1].translate(0, move + 20);
    }
  },
});
