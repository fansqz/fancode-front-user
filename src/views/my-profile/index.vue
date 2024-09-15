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
  import HeatMap from './heat-map.vue';
  import SubmiteActive from './submit-active.vue';
  import UserInfo from './user-info.vue';
</script>

<style scoped lang="scss">
  .profile-container {
    height: 100%;
    width: 100%;
    .el-scrollbar {
      .content {
        width: 100%;
        padding: 20px 200px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>
