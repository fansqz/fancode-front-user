<template>
  <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import { SV } from 'structv2';
import { ref, onMounted } from 'vue';
import { BinaryTree } from './binary_tree';

const container = ref<HTMLElement>();

onMounted(() => {
  let binaryTree;
  if (container.value) {
    binaryTree = SV.create(container.value,BinaryTree);
  }
  binaryTree.source([
        { id: 1, children: [2, 3], root: true}, 
        { id: 2, children: [4, 5]}, 
        { id: 3, children: [10, 11] }, 
        { id: 4, children: [6, 7] },
        { id: 5 }, 
        { id: 6 },
        { id: 7, children: [8, 9]},
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 }
    ]);
})

</script>

<style>

</style>