<template>
  <div class="setting">
    <el-image v-if="getAvatar() != ''" :src="getAvatar()" class="avatar" />
    <img v-if="getAvatar() == ''" src="@/assets/avatar/avatar.png" class="avatar" />
    <el-dropdown class="user_dropdown">
      <span class="el-dropdown-link">
        {{ getUsername() }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown v-if="isLogged()">
        <el-dropdown-menu>
          <el-dropdown-item @click="changeRoute('myprofile')">个人中心</el-dropdown-item>
          <el-dropdown-item @click="changeRoute('accountSetting')">信息修改</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import useUserStore from '@/store/modules/user';
  import { useRouter, useRoute } from 'vue-router';
  let userStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();

  const getUsername = (): string => {
    return userStore.token ? userStore.username : '请登录';
  };

  const isLogged = (): boolean => {
    return !!userStore.token;
  };

  const getAvatar = (): string => {
    return userStore.token ? userStore.avatar : '';
  };

  const logout = () => {
    userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } });
  };

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params });
  };
</script>

<style scoped>
  .setting {
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: end;
    flex-direction: row;
    .avatar {
      margin-right: 20px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .user_dropdown {
      cursor: pointer;
      padding-right: 40px;
    }
  }
</style>
