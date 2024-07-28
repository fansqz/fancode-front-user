<template>
  <div class="float-external-table">
    <div class="toggle" @click="toggleTable">
      <i v-if="isOpen" class="fas fa-angle-up fa-sm"></i>
      <i v-else class="fas fa-angle-down fa-sm"></i>
    </div>
    <ul v-show="isOpen" class="external-list">
      <li
        v-for="(group, key, index) in externalList"
        :key="index"
        :class="{
          'external-item': true,
          'external-item--dark': darkMode,
          'external-item--hide': isInHideIndexs(key),
        }"
        @click="toggleGroups(key)"
      >
        <div class="group-name">{{ key }}</div>
        <div v-for="(item, i) in group" :key="i" class="external-pointer-item">
          {{ item }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import clone from '@student/utils/deepClone.js';
  import { Visualizer } from './visualizer';

  export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['externalList'],
    data() {
      return {
        isOpen: true,
        hideGroups: [],
        hideGroupsObj: {},
      };
    },
    computed: {
      darkMode() {
        return this.$store.state.darkMode;
      },
      sources() {
        return this.$store.state.visualData.sources;
      },
      ...mapGetters(['curHideElementIdArr']),
    },
    watch: {
      curHideElementIdArr: {
        handler(val) {
          const hideGroupsObj = clone(this.hideGroupsObj);
          //通过变量堆栈面版数据 控制external-item--hide样式
          for (const key in hideGroupsObj) {
            const index = this.hideGroups.findIndex((item) => item === key);
            val.forEach((id) => {
              hideGroupsObj[key] = hideGroupsObj[key].split(id).join('');
            });
            if (index > -1 && hideGroupsObj[key].length > 0) {
              this.hideGroups.splice(index, 1);
            } else if (index === -1 && hideGroupsObj[key].length === 0) {
              this.hideGroups.push(key);
            }
          }
        },
        deep: true,
      },
    },
    methods: {
      isInHideIndexs(key) {
        return this.hideGroups.includes(key);
      },
      toggleGroups(key) {
        const diffIds = [];
        const hideIndex = this.hideGroups.findIndex((item) => item === key);

        for (const name in this.sources) {
          const item = this.sources[name];

          if (item.layouter && item.layouter === key) {
            item.data.forEach((val) => {
              diffIds.push(val.id);
            });
          }
        }
        if (hideIndex > -1) {
          this.setCurHideElementIdArr({
            data: diffIds,
            type: 'remove',
          });
          this.hideGroups.splice(hideIndex, 1);
        } else {
          this.setCurHideElementIdArr({
            data: diffIds,
            type: 'add',
          });
          //第一次隐藏时将所有id存储起来，比对现有id控制样式
          if (!this.hideGroupsObj[key]) {
            this.hideGroupsObj[key] = diffIds.join('');
          }
          this.hideGroups.push(key);
        }
        //更改为通过结点的id去显示和隐藏，即监听curHideElemetIdArr的变化
        // Visualizer.instance.hideGroups(this.hideGroups);
      },
      toggleTable() {
        this.isOpen = !this.isOpen;
      },
      ...mapMutations({
        setCurHideElementIdArr: 'SET_CUR_HIDE_ELEMENT_ID_ARR',
      }),
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .float-external-table {
    display: flex;
    margin-bottom: 12px;
  }

  .float-external-table > .toggle {
    width: 24px;
    height: 24px;
    text-align: center;
    cursor: pointer;
    font-weight: bolder;
    user-select: none;
    border-radius: 12px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-90deg);
    margin-right: 12px;
  }

  .float-external-table > .toggle:hover {
    background-color: #eee;
  }

  .float-external-table .arrow {
    transition: transform 0.25s ease-out;
  }

  .external-list {
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }

  .group-name {
    margin-right: 4px;
    font-size: 14px;
  }

  .external-item {
    display: flex !important;
    align-items: center;
    padding: 6px;
    color: #333;
    box-sizing: border-box;
    font-weight: bolder;
    border-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #ddd;
    user-select: none;
    cursor: pointer;
    margin-bottom: 4px;
    width: fit-content;
  }

  .external-item--dark {
    background-color: #808080;
    color: #fafafa;
    border: none;
  }

  .external-item--hide {
    opacity: 0.5;
  }

  .external-pointer-item {
    padding: 2px 4px 2px 4px;
    margin-left: 4px;
    border: 1px solid #aaa;
    border-radius: 8px;
    color: #666;
    font-size: 10px;
  }

  .external-item--dark > .external-pointer-item {
    border: 1px solid #fafafa;
    color: #fafafa;
  }
</style>
