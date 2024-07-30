<template>
  <div class="container">
    <el-scrollbar>
      <div class="bank-list">
        <div
          v-for="(item, index) in bankList"
          :key="index"
          @click="handlerBankView(item.id)"
          class="bank-item"
        >
          <img :src="item.icon" class="bank-icon" />
          <div class="bank-message">
            <p class="bank-name">{{ item.name }}</p>
            <p class="bank-description">介绍：{{ item.description }}</p>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { reqAllBankList } from '@/api/bank';
  import { useRouter } from 'vue-router';
  let $router = useRouter();

  let bankList = ref<any[]>([]);
  const handlerBankView = (bankID: string) => {
    $router.push({
      name: 'bank',
      params: {
        bankID: bankID,
      },
    });
  };
  onMounted(async () => {
    let result = await reqAllBankList();
    if (result.code == 200) {
      bankList.value = result.data;
    }
  });
</script>

<style scoped lang="scss">
  .container {
    .bank-list {
      display: flex;
      justify-content: space-between;
      .bank-item {
        position: relative;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        width: 220px;
        height: 80px;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        box-shadow: 0px 0px 10px rgb(228, 227, 227);
        overflow: hidden;

        cursor: pointer;

        .bank-icon {
          position: absolute;
          border-radius: 5px;
          height: 70px;
          width: 70px;
          left: 5px;
        }
        .bank-message {
          position: absolute;
          height: 70px;
          width: 130px;
          left: 80px;
          .bank-name {
            margin: 5px 0px;
            text-align: left;
            color: $base-title-font-color;
            font-size: large;
            font-weight: bold;
          }
          .bank-description {
            text-align: left;
            font-size: small;
            font-weight: normal;
            color: $base-small-font-color;
          }
        }
      }
    }
  }
</style>
