import { SV, SourceNode, LayoutGroupOptions, SVNode, LayoutOptions } from 'structv2'

SV.registerLayout('arrayBar', {
  sourcesPreprocess(sources) {
    const firstElement = sources[0]

    if (firstElement.external) {
      firstElement.headExternal = firstElement.external
      delete firstElement.external
    }

    return sources
  },
  defineOptions() {
    return {
      node: {
        default: {
          type: 'array-node',
          label: '[data]',
          size: [40, 80], // 柱状图默认尺寸，将在layout中动态调整
          labelOptions: {
            style: {
              fontSize: 12,
              fontWeight: 400,
              fill: '#2c3e50',
            },
          },
          style: {
            stroke: '#10b981',
            strokeWidth: 1,
            fill: '#d1fae5',
            cursor: 'pointer',
            radius: 4,
            // 悬停效果
            hover: {
              stroke: '#059669',
              strokeWidth: 2,
              fill: '#a7f3d0',
            },
          },
        },
      },
      marker: {
        headExternal: {
          type: 'pointer',
          offset: 50,
          anchor: 2,
          style: {
            fill: '#f08a5d',
          },
        },
        external: {
          type: 'pointer',
          offset: 50,
          anchor: 2,
          style: {
            fill: '#f08a5d',
          },
        },
      },
      indexLabel: {
        index: {
          position: 'bottom',
          style: { fontSize: 10, fill: '#666' },
        },
        indexRight: { position: 'right' },
      },
      behavior: {
        dragNode: false,
      },
    }
  },

  layout(elements) {
    let arr = elements
    const dataLength = arr.length

    // 固定柱状图宽度和间距
    const barWidth = 40 // 固定柱状图宽度
    const spacing = 10 // 固定间距

    // 计算所有数据的最大值，用于高度计算
    let maxValue = 0
    for (let i = 0; i < arr.length; i++) {
      const value = Number(arr[i].get('data')) || 0
      console.log(value)
      maxValue = Math.max(maxValue, value)
    }

    // 智能高度计算逻辑 - 从节点定义中抽离出来
    function calculateIntelligentHeight(value, maxValue, baseHeight) {
      if (maxValue === 0) {
        return baseHeight * 0.1 // 如果最大值为0，显示最小高度
      }

      const ratio = value / maxValue
      let actualHeight

      // 使用对数比例，让不同数值范围都有合理的视觉展示
      if (ratio <= 0.01) {
        // 极小值：使用对数比例，确保可见
        actualHeight = baseHeight * (0.05 + Math.log10(ratio * 100) * 0.1)
      } else if (ratio <= 0.1) {
        // 小值：线性插值，从5%到15%
        actualHeight = baseHeight * (0.05 + ratio * 1.0)
      } else if (ratio <= 0.5) {
        // 中等值：线性插值，从15%到60%
        actualHeight = baseHeight * (0.15 + (ratio - 0.1) * 1.125)
      } else {
        // 大值：线性插值，从60%到100%
        actualHeight = baseHeight * (0.6 + (ratio - 0.5) * 0.8)
      }

      // 确保最小和最大高度
      actualHeight = Math.max(actualHeight, baseHeight * 0.05) // 最小5%
      actualHeight = Math.min(actualHeight, baseHeight * 0.95) // 最大95%

      return actualHeight
    }

    // 更新每个元素的尺寸和位置
    for (let i = 0; i < arr.length; i++) {
      const value = Number(arr[i].get('data')) || 0
      const baseHeight = 150 // 基础高度

      // 计算智能高度
      const intelligentHeight = calculateIntelligentHeight(value, maxValue, baseHeight)

      // 设置最大值，用于节点内部的高度计算
      arr[i].set('maxValue', maxValue)

      // 设置动态高度
      arr[i].set('size', [barWidth, intelligentHeight])

      // 计算x坐标
      if (i > 0) {
        arr[i].set('x', arr[i - 1].get('x') + arr[i - 1].get('size')[0] + spacing)
      } else {
        arr[i].set('x', 0)
      }

      arr[i].set('y', baseHeight - intelligentHeight / 2)
    }
  },
})
