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
            class="scrollbar-demo-item"
            :class="{ 'scrollbar-demo-item-active': item == activityYear }"
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
  import { getCurrentInstance, onMounted, ref } from 'vue';
  import { reqActivityMap, reqActivityYear } from '@/api/submission';

  let currentInstance = getCurrentInstance();
  let proxy: any;
  if (currentInstance != null) {
    proxy = currentInstance.proxy;
  }
  let heatMap = ref(null);
  let range: string[] = [];
  let data: any[] = [];
  let activityYears = ref<string[]>([]);
  let activityYear = ref('0');

  const updateHeatMap = async (year: string) => {
    activityYear.value = year;
    await getVirtualData(year);
    setOption();
  };

  const getVirtualData = async (year: string) => {
    // 读取data
    let result = await reqActivityMap(year);
    if (result.code == 200) {
      let data2 = result.data;
      let newData: any[] = [];
      data2.forEach((item: any) => {
        let newItem = [];
        newItem.push(item.date);
        newItem.push(item.count);
        newData.push(newItem);
      });
      data = newData;
    }
    // 读取年份范围
    range = [];
    if (year == '0') {
      let currentDate = new Date();
      let end = currentDate.toISOString().slice(0, 10);
      let currentYear = currentDate.getFullYear(); // 获取当前年份
      let previousYearDate = new Date(
        currentYear - 1,
        currentDate.getMonth() + 1,
        currentDate.getDate() + 1,
      );
      let start = previousYearDate.toISOString().slice(0, 10);
      range.push(start);
      range.push(end);
    } else {
      range.push(`${year}-1-1`);
      range.push(`${year}-12-31`);
    }
  };

  const setOption = () => {
    const myChart = proxy.$echarts.init(heatMap.value);
    myChart.setOption({
      tooltip: {
        formatter: function (params: any) {
          return params.value[0] + ' : ' + params.value[1];
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max: 20,
        inRange: {
          color: ['#c6e48b', '#7bc96f', '#239a3b', '#196127', '#196127'],
        },
      },
      calendar: {
        itemStyle: {
          color: '#cccccc',
          borderWidth: 2,
          borderColor: '#ffffff',
        },
        cellSize: ['auto', 13],
        range: range,
        splitLine: true,
        dayLabel: {
          firstDay: 7,
          nameMap: 'ZH',
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
    });
  };

  const getActivityYear = async () => {
    let result = await reqActivityYear();
    if (result.code == 200) {
      activityYears.value = result.data;
      activityYears.value.unshift('0');
    }
  };

  onMounted(() => {
    updateHeatMap('0');
    getActivityYear();
  });
</script>

<style lang="scss" scoped>
  .card {
    width: 800px;
    border-radius: 5px;
    margin-top: 20px;
    .heat-map-container {
      height: 180px;
      display: flex;
      .heat-map {
        width: 600px;
        height: 180px;
      }
      .select-year {
        margin-left: 20px;
        height: 180px;
        display: flex;
        align-items: center;
        .select-year-scroll {
          height: 100px;
          .scrollbar-demo-item {
            width: 90px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #9da19e;
            border-radius: 5px;
            background-color: rgba(212, 241, 221, 0.2);
            cursor: pointer;
          }
          .scrollbar-demo-item-active {
            background-color: rgba(98, 124, 107, 0.2);
          }
        }
      }
    }
  }
</style>
