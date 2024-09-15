<template>
  <el-card class="card">
    <div class="user-message">
      <img :src="accountInfo.avatar" class="avatar" />
      <div class="base-info">
        <div class="base-info-item1">
          {{ accountInfo.username }}
        </div>
        <div class="base-info-item"> 性别：{{ accountInfo.sex == '1' ? '男' : '女' }} </div>
        <div class="base-info-item"> 诞生于：{{ accountInfo.birthDay }} </div>
        <div class="base-info-item"> 码龄：{{ accountInfo.codingAge }} </div>
        <div class="login-name"> 用户id: {{ accountInfo.loginName }} </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { reqAccountInfo } from '@/api/account';
  import { reqGetURL } from '@/api/common';
  let accountInfo = reactive({
    avatar: '',
    sex: '',
    loginName: '',
    username: '',
    birthDay: '',
    introduction: '',
    codingAge: 0,
  });

  onMounted(async () => {
    getAccountInfo();
  });

  const getAccountInfo = async () => {
    let result = await reqAccountInfo();
    if (result.code == 200) {
      let data = result.data;
      let result2 = await reqGetURL(data.avatar);
      if (result2.code == 200) {
        accountInfo.avatar = result2.data;
      }
      accountInfo.sex = data.sex;
      accountInfo.loginName = data.loginName;
      accountInfo.username = data.username;
      accountInfo.birthDay = data.birthDay;
      accountInfo.introduction = data.introduction;
      accountInfo.codingAge = data.codingAge;
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      });
    }
  };
</script>

<style scoped lang="scss">
  .card {
    width: 800px;
    .user-message {
      height: 120px;
      box-sizing: border-box;
      border-radius: 5px;
      position: relative;
      padding: 10px;
      .avatar {
        position: absolute;
        left: 20px;
        height: 110px;
        width: 110px;
        box-sizing: border-box;
        border: 1px solid $base-border-color;
      }

      .base-info {
        position: absolute;
        left: 150px;
        height: 120px;
        width: 120px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;

        .base-info-item1 {
          font-size: x-large;
          font-weight: 900;
          margin-top: 5px;
        }

        .base-info-item {
          font-size: small;
          margin-top: 6px;
        }

        .login-name {
          font-size: small;
          color: rgb(104, 101, 101);
        }
      }
    }
  }
</style>
