<template>
  <div class="register-container">
    <el-form class="register-form" :rules="rules" :model="registerForm" ref="registerElFrom">
      <div class="title">
        <h1>Fancode</h1>
      </div>
      <el-form-item prop="username">
        <el-input
          :prefix-icon="User"
          placeholder="请设置用户名称"
          v-model="registerForm.username"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="registerForm.email" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请设置密码"
          type="password"
          show-password="true"
          v-model="registerForm.password"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="验证码" v-model="registerForm.code">
          <template #suffix>
            <el-button link type="primary" @click="sendEmailCode"> 发送验证码 </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-button"
          type="primary"
          @click="register"
          :loading="loading"
          size="default"
        >
          注册
        </el-button>
      </el-form-item>
      <el-from-item class="go-login">
        已有账户？
        <div
          class="login-text"
          @mouseover="goLoginTextStyle = 'color:blue'"
          @mouseleave="goLoginTextStyle = 'color:black'"
          @click="changeRoute('login')"
          :style="goLoginTextStyle"
        >
          点击登录
        </div>
      </el-from-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { User, Message } from '@element-plus/icons-vue';
  import { reactive, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { reqSendCode, reqRegister } from '@/api/auth';

  let $router = useRouter();
  let $route = useRoute();
  // 登录按钮是否加载
  let loading = ref(false);
  let registerForm = reactive({
    username: '',
    email: '',
    password: '',
    code: '',
  });
  let goLoginTextStyle = ref();

  let rules = {
    username: [
      { required: true, message: '用户名称不能为空', trigger: 'change' },
      { required: true, min: 2, max: 30, message: '用户名称过长或过短' },
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
  let registerElFrom = ref();

  const sendEmailCode = async () => {
    let result = await reqSendCode({
      email: registerForm.email,
      type: 'register',
    });
    if (result.code == 200) {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'success',
      });
    } else {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
  };

  const register = async () => {
    // 判断表单校验是否通过
    try {
      await registerElFrom.value.validate();
      loading.value = true;
      let result = await reqRegister(registerForm);
      // 判断是否有redirect参数
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '注册成功，请登录',
        });
        $router.push('login');
      }
      loading.value = false;
    } catch (error) {
      loading.value = false;
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
  .register-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#f9f9fa, #f9fdf7);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .register-form {
      width: 300px;
      height: 380px;
      margin-top: calc(50vh - 280px); /* 调整偏移量 */
      background-color: #ffffff;
      border: 1px solid #666666;
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
      .go-login {
        font-size: small;
        .login-text {
          display: inline;
          cursor: pointer;
        }
      }
      .register-button {
        width: 100%;
      }
    }
  }
</style>
