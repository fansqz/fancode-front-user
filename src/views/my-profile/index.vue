<template>
  <div class="profile-container">
    <el-card class="user-message">
      <div class="message1">
        <div class="avatar">
          <img :src="accountInfo.avatar" />
        </div>
        <div class="base-info">
          <div class="base-info-item1">
            {{ accountInfo.username }}
          </div>
          <div class="base-info-item"> 性别：{{ accountInfo.sex == '1' ? '男' : '女' }} </div>
          <div class="base-info-item"> 诞生于：{{ accountInfo.birthDay }} </div>
          <div class="base-info-item"> 码龄：{{ accountInfo.codingAge }} </div>
        </div>
      </div>
      <div class="login-name"> 用户id: {{ accountInfo.loginName }} </div>
      <div class="introduction">
        {{ accountInfo.introduction }}
      </div>
    </el-card>
    <div class="active">
      <HeatMap class="heat-map"></HeatMap>
      <SubmiteActive></SubmiteActive>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { reqAccountInfo } from '@/api/account';
  import HeatMap from './heat-map.vue';
  import SubmiteActive from './submit-active.vue';
  let accountInfo = reactive({
    avatar: '',
    sex: '',
    loginName: '',
    username: '',
    birthDay: '',
    introduction: '',
    codingAge: '',
  });

  onMounted(async () => {
    getAccountInfo();
  });

  const getAccountInfo = async () => {
    let result = await reqAccountInfo();
    if (result.code == 200) {
      let data = result.data;
      accountInfo.avatar = data.avatar;
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
  .profile-container {
    position: absolute;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 50px 150px;
    .user-message {
      height: 575px;
      width: 240px;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 10px;
      .message1 {
        display: flex;
        .avatar {
          height: 80px;
          width: 80px;
          box-sizing: border-box;
          border: 1px solid #666666;
        }
        .base-info {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding-left: 10px;
          padding-bottom: 10px;
          .base-info-item1 {
            font-weight: 900;
            margin-top: auto;
          }
          .base-info-item {
            font-size: small;
            margin-top: 6px;
          }
        }
      }
      .login-name {
        font-size: small;
        color: rgb(104, 101, 101);
      }
      .introduction {
        margin-top: 20px;
      }
    }
    .active {
      flex-grow: 1;
      margin-left: 40px;
      box-sizing: border-box;
    }
  }
</style>
