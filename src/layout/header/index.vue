<template>
  <div class="header">
    <div class="header_left">
      <Logo class="logo"></Logo>
      <div class="empty" />
      <div
        :class="{ nav_item: true, active_item: isActiveNavItem('coding') }"
        @click="changeRoute('coding')"
      >
        <el-text size="large">编程</el-text>
      </div>
      <div :class="{ learn: true, nav_item: true, active_item: isActiveNavItem('learn') }">
        <el-dropdown @command="handleSelectBank">
          <span>
            <el-text size="large">学习</el-text>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in visualDocumentBanks" :command="item.id">{{
                item.name
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
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
  import Logo from '@/components/logo/index.vue'
  import Setting from './setting.vue'
  import { useRouter, useRoute } from 'vue-router'
  import useUserStore from '@/store/modules/user'
  import { onMounted } from 'vue'
  import { ref } from 'vue'
  import { reqAllVisualDocumentBank } from '@/api/visual-document-bank/index.ts'
  let userStore = useUserStore()
  let $router = useRouter()
  let $route = useRoute()
  const visualDocumentBanks = ref([])

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return
    }
    $router.push({ name: routeName, params })
  }
  const isActiveNavItem = (routeName: string) => {
    return $route.name === routeName
  }

  const isLogged = (): boolean => {
    return !!userStore.token
  }

  const getoLogin = () => {
    $router.push({ name: 'login' })
  }

  const getoRegister = () => {
    $router.push({ name: 'register' })
  }

  const handleSelectBank = (bankID: number) => {
    $router.push({
      name: 'learn',
      params: {
        bankID: bankID,
      },
    })
  }

  onMounted (async () => {
    let result = await reqAllVisualDocumentBank()
    if (result.code == 200) {
      visualDocumentBanks.value = result.data
    }
  })
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    border-bottom: 1px solid var(--el-border-color);

    .header_left {
      position: absolute;
      left: 0%;
      display: flex;
      align-items: center;
      width: 50%;
      height: 100%;

      .logo {
        display: flex;
        align-items: center;
        height: $base-header-height - 15px;
        margin: 0 20px;
      }

      .empty {
        width: 20px;
      }

      .nav_item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        min-width: 60px;
        height: $base-header-height;
        margin: 0 10px;
        cursor: pointer;
      }

      .active_item {
        box-sizing: border-box;
        border-bottom: 3px solid #333;
      }
    }

    .header_right {
      position: absolute;
      right: 0%;
      display: flex;
      flex-direction: row-reverse;
      width: 50%;
      height: 100%;

      .login_button {
        position: relative;
        width: 200px;
        height: 100%;

        .login_content {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 100%;

          .button {
            margin: 10px;
          }
        }
      }

      .setting {
        width: 120px;
        height: 100%;
        margin-right: 30px;
      }
    }
  }
</style>
