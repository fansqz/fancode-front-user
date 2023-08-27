<template>
  <div class="console">
    <el-menu :default-active="'1'" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">输入用例</el-menu-item>
      <el-menu-item index="2">输出</el-menu-item>
    </el-menu>
    <div class="input-div" v-if="activeIndex == '1'">
      <el-input class="input" v-model="input" type="textarea" placeholder="Please input">
      </el-input>
    </div>
    <div class="output-div" v-if="activeIndex == '2'">
      <div v-if="outputCode == 0"> 暂无输出 </div>
      <div v-if="outputCode == 200"> 执行成功! {{ outputMessage }}</div>
      <div v-if="outputCode == 201"> 提交成功! {{ outputMessage }}</div>
      <div v-if="outputCode == 203"> 编译出错! {{ outputMessage }}</div>
      <div v-if="outputCode == 204"> 运行出错! {{ outputMessage }}</div>
    </div>
    <div class="option-bottom">
      <div class="left"> </div>
      <div class="right">
        <el-button class="button" type="info" plain>运行</el-button>
        <el-button class="button" type="success" plain>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  let activeIndex = ref('1');

  const props = defineProps(['modelValue', 'outputCode', 'outputMessage']);
  const emit = defineEmits(['update:modelValue', 'submit', 'execute']);
  // input的双向绑定
  const input = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };
</script>

<style scoped lang="scss">
  .console {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    .el-menu {
      height: 30px;
    }
    .input-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
      padding: 15px;
    }
    .output-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
    }
    .option-bottom {
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid $border-color;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .button {
        margin-right: 20px;
      }
    }
  }
</style>
