<template>
  <div class="profile-container">
    <el-scrollbar class="el-scrollbar">
      <div class="content">
        <UserInfo />
        <HeatMap></HeatMap>
        <SubmiteActive></SubmiteActive>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import HeatMap from './heat-map.vue'
  import SubmiteActive from './submit-active.vue'
  import UserInfo from './user-info.vue'
</script>

<style scoped lang="scss">
  .profile-container {
    width: 100%;
    height: 100%;

    .el-scrollbar {
      .content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 20px 200px;
      }
    }
  }
</style>
