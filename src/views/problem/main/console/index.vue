<template>
  <div class="console">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">输入用例</el-menu-item>
      <el-menu-item index="2">输出</el-menu-item>
    </el-menu>
    <div class="input-div" v-if="activeIndex == '1'">
      <el-input class="input" v-model="inputCase" type="textarea" placeholder="Please input">
      </el-input>
    </div>
    <div class="output-div" v-if="activeIndex == '2'">
      <div v-if="outputStatus == 200">
        <el-alert title="提交成功！" type="success" show-icon />
      </div>
      <div v-else-if="outputStatus == 201">
        <el-alert title="运行成功！" type="success" show-icon>
          {{ userOutput }}
        </el-alert>
      </div>
      <div v-else-if="outputStatus == 202">
        <el-alert title="输出错误！" type="warning" show-icon>
          输出数据:{{ userOutput }} 正确数据 {{ expectedOutput }}
        </el-alert>
      </div>
      <div v-else-if="outputStatus == 204">
        <el-alert title=" 编译出错！" type="error" show-icon>
          {{ errorMessage }}
        </el-alert>
      </div>
      <div v-else-if="outputStatus == 205">
        <el-alert title="运行出错！" type="error" show-icon>
          {{ errorMessage }}
        </el-alert>
      </div>
      <div v-else>
        <el-alert title="暂无输出" type="info" show-icon />
      </div>
    </div>
    <div class="option-bottom">
      <div class="left"> </div>
      <div class="right">
        <el-button class="button" type="info" @click="execute" plain>运行</el-button>
        <el-button class="button" type="success" @click="submit" plain>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  let activeIndex = ref('1');

  const props = defineProps([
    'modelValue',
    'outputStatus',
    'errorMessage',
    'expectedOutput',
    'userOutput',
  ]);
  const emit = defineEmits(['update:modelValue', 'submit', 'execute']);
  // input的双向绑定
  const inputCase = computed({
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

  const submit = () => {
    emit('submit');
    activeIndex.value = '2';
  };

  const execute = () => {
    emit('execute');
    activeIndex.value = '2';
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
      padding: 15px;
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
