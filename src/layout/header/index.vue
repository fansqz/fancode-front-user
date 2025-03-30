<template>
  <div class="header">
    <div class="header_left">
      <Logo class="logo"></Logo>
      <div class="empty" />
      <div
        :class="{ nav_item: true, active_item: isActiveNavItem('coding') }"
        @click="changeRoute('coding')"
      >
        编程
      </div>
      <div
        :class="{ nav_item: true, active_item: isActiveNavItem('learn') }"
        @click="changeRoute('learn')"
      >
        学习
      </div>
      <!-- <div
        :class="{ nav_item: true, active_item: isActiveNavItem('home') }"
        @click="changeRoute('home')"
      >
        题库
      </div> -->
    </div>
    <div class="header_right">
      <Setting class="setting" v-show="isLogged()"></Setting>
      <div class="login_button" v-show="!isLogged()">
        <div class="login_content">
          <el-button class="button" type="primary" @click="getoLogin()" link>登陆</el-button>
          <el-text>/</el-text>
          <el-button class="button" type="primary" @click="getoRegister()" link>注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Logo from '@/components/logo/index.vue';
  import Setting from './setting.vue';
  import { useRouter, useRoute } from 'vue-router';
  import useUserStore from '@/store/modules/user';
  let userStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params });
  };
  const isActiveNavItem = (routeName: string) => {
    return $route.name === routeName;
  };

  const isLogged = (): boolean => {
    return !!userStore.token;
  };

  const getoLogin = () => {
    $router.push({ name: 'login' });
  };

  const getoRegister = () => {
    $router.push({ name: 'register' });
  };
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    top: 0px;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    box-sizing: border-box;
    border-bottom: 1px solid $base-border-color;
    .header_left {
      position: absolute;
      height: 100%;
      width: 50%;
      left: 0%;
      display: flex;
      .logo {
        margin: 0px 20px;
        height: $base-header-height - 20px;
        padding: 10px;
      }
      .empty {
        width: 20px;
      }
      .nav_item {
        width: 50px;
        height: $base-header-height;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0px 10px;
        color: #999999;
      }
      .active_item {
        box-sizing: border-box;
        font-weight: 500;
        color: #333333;
        border-bottom: 3px solid #333333;
      }
    }
    .header_right {
      position: absolute;
      display: flex;
      flex-direction: row-reverse;
      height: 100%;
      width: 50%;
      right: 0%;
      .login_button {
        position: relative;
        height: 100%;
        width: 200px;
        .login_content {
          position: absolute;
          height: 100%;
          width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          .button {
            margin: 10px;
          }
        }
      }
      .setting {
        height: 100%;
        width: 120px;
        margin-right: 30px;
      }
    }
  }
</style>
