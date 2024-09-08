import { SV, SourceNode, LayoutGroupOptions, SVNode, LayoutOptions, Vector } from 'structv2';
import G6 from '@antv/g6';

SV.registerLayout('graph', {
  defineOptions(_sourceData: SourceNode[]): LayoutGroupOptions {
    return {
      node: {
        default: {
          type: 'circle',
          label: '[data]',
          size: 30,
          labelOptions: {
            style: {
              stroke: '#333',
              fill: '#95e1d3',
            },
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
            lineAppendWidth: 6,
            cursor: 'pointer',
            startArrow: {
              path: G6.Arrow.circle(2, -1),
              fill: '#333',
            },
          },
        },
      },
      layout: {
          radius: 150,
          interval: 250,
          xInterval: 50,
          yInterval: 50
      },
      indexLabel: {
        index: { position: 'bottom' },
        indexRight: { position: 'right' },
      },
      behavior: {
        dragNode: true,
      },
    };
  },

  layout(nodes: SVNode[], layoutOptions: LayoutOptions) {
    let nodeLength = nodes.length;
    let intervalAngle = 2 * Math.PI / nodes.length;
    let { radius } = layoutOptions;
    for (let i = 0; i < nodeLength; i++) {
      let [x, y] = Vector.rotation(-intervalAngle * i, [0, -radius]);
      nodes[i].set('x', x);
      nodes[i].set('y', y);
      console.log("x" + x, "y" + y)
    }
  },
});
