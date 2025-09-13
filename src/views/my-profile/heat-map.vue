<template>
  <el-card class="card">
    <div class="heat-map-container">
      <div ref="heatMap" class="heat-map"></div>
      <div class="select-year">
        <el-scrollbar height="100px" class="select-year-scroll">
          <p
            v-for="item in activityYears"
            type="info"
            :key="item"
            class="scrollbar-item"
            :class="{ 'scrollbar-item-active': item == activityYear }"
            @click="updateHeatMap(item)"
          >
            {{ item == '0' ? '至今' : item }}
          </p>
        </el-scrollbar>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { getCurrentInstance, onMounted, ref } from 'vue'
  import { reqActivityMap, reqActivityYear } from '@/api/submission'

  let currentInstance = getCurrentInstance()
  let proxy: any
  if (currentInstance != null) {
    proxy = currentInstance.proxy
  }
  let heatMap = ref(null)
  let range
  let data: any[] = []
  let activityYears = ref<string[]>([])
  let activityYear = ref('0')

  const updateHeatMap = async (year: string) => {
    activityYear.value = year
    await getVirtualData(year)
    setOption()
  }

  const getVirtualData = async (year: string) => {
    // 读取data
    let result = await reqActivityMap(year)
    if (result.code == 200) {
      let data2 = result.data
      let newData: any[] = []
      data2.forEach((item: any) => {
        let newItem = []
        newItem.push(item.date)
        newItem.push(item.count)
        newData.push(newItem)
      })
      data = newData
    }
    range = []
    // 读取年份范围
    if (year == '0') {
      let currentDate = new Date()
      let end = currentDate.toISOString().slice(0, 10)
      let currentYear = currentDate.getFullYear() // 获取当前年份
      let previousYearDate = new Date(
        currentYear - 1,
        currentDate.getMonth(),
        currentDate.getDate(),
      )
      let start = previousYearDate.toISOString().slice(0, 10)
      range.push(start)
      range.push(end)
    } else {
      range = year
    }
  }
  const setOption = () => {
    const myChart = proxy.$echarts.init(heatMap.value)
    myChart.setOption({
      visualMap: {
        show: false,
        min: 0,
        max: 20,
        type: 'piecewise',
        orient: 'horizontal',
        inRange: {
          // 使用蓝色色调，从浅蓝色到深蓝色过渡
          color: ['#9be9a8', '#40c463', '#30a14e', '#30a14e'],
        },
      },
      tooltip: {},
      calendar: {
        left: '50',
        top: '40',
        itemStyle: {
          // 调整单元颜色，更柔和的颜色和更明显的边框，增大圆角
          color: '#ebedf0',
          borderWidth: 2, // 增加边框宽度
          borderColor: '#ffffff', // 修改边框颜色
        },
        cellSize: 11, // 增大单元大小，可根据实际情况调整
        range: range,
        splitLine: {
          show: false,
        },
        dayLabel: {
          show: false,
        },
        monthLabel: {
          show: true,
          nameMap: 'ZH',
        },
        yearLabel: {
          show: false,
        },
        silent: {
          show: false,
        },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: data,
      },
    })
  }

  const getActivityYear = async () => {
    let result = await reqActivityYear()
    if (result.code == 200) {
      activityYears.value = result.data
      activityYears.value.sort((a, b) => Number(b) - Number(a))
      activityYears.value.unshift('0')
    }
  }

  onMounted(() => {
    updateHeatMap('0')
    getActivityYear()
  })
</script>

<style lang="scss" scoped>
  .card {
    width: 800px;
    margin-top: 20px;
    border-radius: 5px;

    .heat-map-container {
      display: flex;
      height: 150px;

      .heat-map {
        width: 650px;
        height: 150px;
      }

      .select-year {
        display: flex;
        align-items: center;
        height: 150px;

        .select-year-scroll {
          height: 100px;

          .scrollbar-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 25px;
            color: $text-color-secondary;
            cursor: pointer;
            background-color: rgba($success-color, 0.2);
            border-radius: 5px;
          }

          .scrollbar-item-active {
            background-color: rgba($success-color, 0.3);
          }
        }
      }
    }
  }
</style>
