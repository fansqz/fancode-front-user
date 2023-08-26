<template>
  <div class="setting">
    <el-dropdown :hide-on-click="false" class="user_dropdown">
      <span class="el-dropdown-link">
        {{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>我的</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <img src="@/assets/vue.svg" style="width: 24px; height: 24px" class="user_image" />
  </div>
</template>

<script setup lang="ts">
  import useUserStore from '@/store/modules/user';
  import { useRouter, useRoute } from 'vue-router';
  let userStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();
  const logout = () => {
    userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } });
  };
</script>

<style scoped>
  .setting {
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: row-reverse;
    .user_dropdown {
      padding-right: 60px;
    }
    .user_image {
      padding: 10px;
    }
  }
</style>
