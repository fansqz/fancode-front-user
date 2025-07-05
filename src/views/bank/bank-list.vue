<template>
  <div class="container">
    <el-scrollbar>
      <div class="bank-list">
        <div
          v-for="(item, index) in bankList"
          :key="index"
          @click="handlerBankView(item.id)"
          :class="isLogged() ? 'bank-item' : 'bank-item not-click'"
        >
          <el-image :src="item.icon" class="bank-icon" />
          <div class="bank-message">
            <p class="bank-name">{{ item.name }}</p>
            <p class="bank-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { reqAllBankList } from '@/api/bank'
  import { useRouter } from 'vue-router'
  import { reqGetURL } from '@/api/common'
  import useUserStore from '@/store/modules/user'

  let userStore = useUserStore()
  let $router = useRouter()

  let bankList = ref<any[]>([])
  const handlerBankView = (bankID: string) => {
    if (!isLogged()) {
      return
    }
    $router.push({
      name: 'bank',
      params: {
        bankID: bankID,
      },
    })
  }

  // 用户是否登陆
  const isLogged = (): boolean => {
    return !!userStore.token
  }

  onMounted(async () => {
    let result = await reqAllBankList()
    if (result.code == 200) {
      let banks = result.data
      // 设置头像
      for (let bank of banks) {
        let result2 = await reqGetURL(bank.icon)
        if (result2.code == 200) {
          bank.icon = result2.data
        }
      }
      bankList.value = banks
    }
  })
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;

    .bank-list {
      display: flex;
      justify-content: space-between;

      .bank-item {
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        width: 220px;
        height: 80px;
        overflow: hidden;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(228 227 227);

        .bank-icon {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }

        .bank-message {
          position: absolute;
          left: 80px;
          box-sizing: border-box;
          width: 140px;
          height: 80px;
          padding: 10px 20px;
          background-color: rgb(90 180 253);

          .bank-name {
            margin: 5px 0;
            font-size: large;
            font-weight: bold;
            color: $base-title-font-color;
            text-align: left;
          }

          .bank-description {
            width: 110px;
            font-size: small;
            font-weight: normal;
            color: $base-small-font-color;
            text-align: left;
          }
        }
      }

      .not-click {
        cursor: not-allowed;
      }
    }
  }
</style>
