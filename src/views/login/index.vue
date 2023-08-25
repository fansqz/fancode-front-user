<template>
  <div class="login_container">
    <el-form class="login_form" :rules="rules" :model="loginForm" ref="loginElFrom">
      <div class="title">
        <h1>FanCode</h1>
      </div>
      <el-form-item prop="loginName">
        <el-input :prefix-icon="User" v-model="loginForm.loginName"> </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          type="password"
          show-password="true"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login_button"
          type="primary"
          @click="login"
          :loading="loading"
          size="default"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { User, Lock } from '@element-plus/icons-vue';
  import { reactive, ref } from 'vue';
  import useUserStore from '@/store/modules/user';
  import { useRouter, useRoute } from 'vue-router';
  import { ElNotification } from 'element-plus';
  import { getDayPeriod } from '@/utils/time';

  let useStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();
  let loading = ref(false);
  let loginForm = reactive({
    loginName: 'uuid',
    password: 'password',
  });

  let rules = {
    loginName: [
      { required: true, message: '用户uuid不能为空', trigger: 'change' },
      { required: true, min: 5, max: 10, message: '用户uuid长度需6-10位' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { required: true, min: 6, max: 20, message: '密码长度需6-20位' },
    ],
  };
  let loginElFrom = ref();

  // 登录
  const login = async () => {
    // 判断表单校验是否通过
    await loginElFrom.value.validate();
    loading.value = true;
    try {
      await useStore.userLogin(loginForm);
      // 判断是否有redirect参数
      let redirect: any = $route.query.redirect;
      $router.push({ path: redirect || '/' });
      ElNotification({
        type: 'success',
        message: '欢迎回来',
        title: `HI,${getDayPeriod()}好`,
      });
      loading.value = false;
    } catch (error) {
      loading.value = false;
      ElNotification({
        type: 'error',
        message: (error as Error).message,
      });
    }
  };
</script>

<style scoped lang="scss">
  .login_container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login_form {
      position: relative;
      width: 20%;
      height: 30%;
      left: 40%;
      top: 35%;
      background-color: $background-color;
      border-radius: 15px;
      opacity: 0.9;
      border: 1px solid $border-color;
      padding: 20px 35px;
      .title {
        height: 25%;
        padding: 0% 15%;
        h1 {
          color: #6bac61;
          font-size: 30px;
          font-weight: 1000;
          font-family: Microsoft JhengHei;
          text-align: center;
          word-break: break-word;
          white-space: pre-line;
        }
      }
      .login_button {
        width: 100%;
      }
    }
  }
</style>
