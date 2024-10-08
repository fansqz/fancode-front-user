<template>
  <div class="login-container">
    <el-form class="login-form" :rules="rules" :model="loginForm" ref="loginElFrom">
      <div class="title">
        <h1>Fancode</h1>
      </div>
      <!--密码登录-->
      <el-form-item prop="account" v-if="loginForm.loginType == 'password'">
        <el-input :prefix-icon="User" placeholder="邮箱/用户id" v-model="loginForm.account" />
      </el-form-item>
      <el-form-item prop="password" v-if="loginForm.loginType == 'password'">
        <el-input
          :prefix-icon="Lock"
          placeholder="密码"
          type="password"
          show-password="true"
          v-model="loginForm.password"
        />
      </el-form-item>
      <!--邮箱登录-->
      <el-form-item prop="email" v-if="loginForm.loginType == 'email'">
        <el-input :prefix-icon="Message" placeholder="邮箱" v-model="loginForm.email" />
      </el-form-item>
      <el-form-item prop="code" v-if="loginForm.loginType == 'email'">
        <el-input placeholder="验证码" v-model="loginForm.code">
          <template #suffix>
            <el-button link type="primary" @click="sendEmailCode"> 发送验证码 </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-button"
          type="primary"
          @click="login"
          :loading="loading"
          size="default"
        >
          登录
        </el-button>
      </el-form-item>
      <el-from-item class="small-text">
        <div
          class="login-type"
          @mouseover="loginTypeTextStyle = 'color:blue'"
          @mouseleave="loginTypeTextStyle = 'color:black'"
          @click="switchLoginType"
          :style="loginTypeTextStyle"
        >
          <div v-if="loginForm.loginType == 'email'"> 账号密码登录 </div>
          <div v-if="loginForm.loginType == 'password'"> 邮箱验证登录 </div>
        </div>
        <div
          class="go-register"
          @mouseover="goRegisterTextStyle = 'color:blue'"
          @mouseleave="goRegisterTextStyle = 'color:black'"
          @click="changeRoute('register')"
          :style="goRegisterTextStyle"
          >点击注册
        </div>
      </el-from-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { User, Lock, Message } from '@element-plus/icons-vue';
  import { reactive, ref } from 'vue';
  import useUserStore from '@/store/modules/user';
  import { useRouter, useRoute } from 'vue-router';
  import { ElNotification, ElMessage } from 'element-plus';
  import { getDayPeriod } from '@/utils/time';
  import { reqSendCode } from '@/api/auth';

  let useStore = useUserStore();
  let $router = useRouter();
  let $route = useRoute();
  // 登录按钮是否加载
  let loading = ref(false);
  let loginForm = reactive({
    loginType: 'email',
    account: '',
    password: '',
    email: '',
    code: '',
  });
  // 登录类型，默认邮箱登录
  let loginTypeTextStyle = ref();
  let goRegisterTextStyle = ref();

  let rules = {
    account: [
      { required: true, message: '用户id或邮箱不能为空', trigger: 'change' },
      { required: true, min: 5, max: 20, message: '用户id或邮箱过长或过短' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { required: true, min: 6, max: 20, message: '密码长度需6-20位' },
    ],
    email: [{ required: true, message: '邮箱不能为空', trigger: 'change' }],
    code: [
      { required: true, message: '验证码不能为空', trigger: 'change' },
      { required: true, min: 6, max: 6, message: '验证码需要6位' },
    ],
  };
  let loginElFrom = ref();

  const switchLoginType = () => {
    if (loginForm.loginType == 'password') {
      loginForm.loginType = 'email';
    } else {
      loginForm.loginType = 'password';
    }
  };

  const sendEmailCode = async () => {
    let result = await reqSendCode({
      email: loginForm.email,
      type: 'login',
    });
    if (result.code == 200) {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'success',
      });
    }
  };

  const login = async () => {
    // 判断表单校验是否通过
    await loginElFrom.value.validate();
    let data;
    if (loginForm.loginType == 'password') {
      data = {
        type: loginForm.loginType,
        account: loginForm.account,
        password: loginForm.password,
      };
    } else if (loginForm.loginType == 'email') {
      data = {
        type: loginForm.loginType,
        email: loginForm.email,
        code: loginForm.code,
      };
    }
    loading.value = true;
    try {
      await useStore.userLogin(data);
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

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params });
  };
</script>

<style scoped lang="scss">
  .login-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#f9f9fa, #f9fdf7);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .login-form {
      width: 250px;
      height: 280px;
      margin-top: calc(50vh - 240px); /* 调整偏移量 */
      background-color: #ffffff;
      border: 1px solid $base-border-color;
      box-shadow: 12px 12px 2px 1px rgba(37, 218, 121, 0.2);
      padding: 20px 35px;
      .title {
        height: 60px;
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
      .small-text {
        .login-type {
          float: left;
          font-size: small;
          cursor: pointer;
        }
        .go-register {
          float: right;
          font-size: small;
          cursor: pointer;
        }
      }

      .login-button {
        width: 100%;
      }
    }
  }
</style>
