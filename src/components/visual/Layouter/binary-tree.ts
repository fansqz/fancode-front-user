import { SV, SourceNode, LayoutGroupOptions, Group, SVNode, LayoutOptions } from 'structv2';
import G6 from '@antv/g6';

SV.registerLayout('binaryTree', {
  defineOptions(_sourceData: SourceNode[]): LayoutGroupOptions {
    return {
      node: {
        default: {
          type: 'binary-tree-node',
          size: [60, 30],
          label: '[data]',
          style: {
            fill: '#7edafb',
            stroke: '#333',
            cursor: 'pointer',
          },
        },
      },
      link: {
        child: {
          type: 'line',
          sourceAnchor: (index) => (index === 0 ? 3 : 1),
          targetAnchor: 0,
          style: {
            stroke: '#333',
            lineAppendWidth: 6,
            cursor: 'pointer',
            endArrow: 'default',
            preventOverlap: true, //防重叠
            startArrow: {
              path: G6.Arrow.circle(2, -1),
              fill: '#333',
            },
          },
        },
      },
      marker: {
        external: {
          type: 'pointer',
          anchor: 0,
          offset: 14,
          style: {
            fill: '#f08a5d',
          },
          labelOptions: {
            style: {
              fill: '#000099',
            },
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
   * 对子树进行递归布局
   */
  layoutItem(node: SVNode, layoutOptions: LayoutOptions) {
    // 次双亲不进行布局
    if (!node) {
      return null;
    }

    let bound = node.getBound(),
      width = bound.width,
      height = bound.height,
      group = new Group(node),
      leftGroup = null,
      rightGroup = null,
      leftBound = null,
      rightBound = null;

    if (node.visited) {
      return null;
    }

    node.visited = true;

    if (node.child && node.child[0]) {
      leftGroup = this.layoutItem(node.child[0], layoutOptions);
    }

    if (node.child && node.child[1]) {
      rightGroup = this.layoutItem(node.child[1], layoutOptions);
    }

    if (leftGroup) {
      leftBound = leftGroup.getBound();
      node.set('y', leftBound.y - layoutOptions.yInterval - height);
    }

    if (rightGroup) {
      rightBound = rightGroup.getBound();

      if (leftGroup) {
        rightGroup.translate(0, leftBound.y - rightBound.y);
      }

      rightBound = rightGroup.getBound();
      node.set('y', rightBound.y - layoutOptions.yInterval - height);
    }

    // 处理左右子树相交问题
    if (leftGroup && rightGroup) {
      let move = Math.abs(rightBound.x - layoutOptions.xInterval - leftBound.x - leftBound.width);
      if (move > 0) {
        leftGroup.translate(-move / 2, 0);
        rightGroup.translate(move / 2, 0);
      }
    }

    if (leftGroup) {
      leftBound = leftGroup.getBound();
      node.set('x', leftBound.x + leftBound.width + layoutOptions.xInterval / 2 - width);
    }

    if (rightGroup) {
      rightBound = rightGroup.getBound();
      node.set('x', rightBound.x - layoutOptions.xInterval / 2 - width);
    }

    if (leftGroup) {
      group.add(leftGroup);
    }

    if (rightGroup) {
      group.add(rightGroup);
    }

    return group;
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
    // 避免多棵相交
    for (let i = 0; i < groups.length - 1; i++) {
      let bound1 = groups[i].getBound();
      let bound2 = groups[i + 1].getBound();
      let move = Math.abs(bound2.x - layoutOptions.xInterval - bound1.x - bound1.width);
      groups[i + 1].translate(move, 0);
    }
  },
});
