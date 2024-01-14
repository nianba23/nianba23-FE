<template>
  <div
    ref="listRef"
    class="virtual-list-container"
    @scroll="manager.handleScroll"
  >
    <div
      :style="{height: `${manager.totalHeight}px`}"
    >
      <ul
        class="list"
        :style="{transform: `translateY(${manager.translateY}px)`}"
      >
        <li
          v-for="(item, index) in manager.showList"
          :key="item.id"
          :data-index="index"
          class="item"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import VirtualListManager from './virtualListManager.js';
import { ref, onMounted, reactive } from 'vue';

const listRef = ref(null);
const manager = reactive(new VirtualListManager());

onMounted(() => {
  const { height } = listRef.value.getBoundingClientRect();
  manager.init(height, 60);
  manager.fetchItem();
});
</script>

<style scoped>
.virtual-list-container {
    width: 300px;
    height: 500px;
    background-color: #409eff1a;
    overflow-y: auto;
    margin: 20px auto;
    padding: 8px;
}

.virtual-list-container .list {
    margin: 0;
    padding: 0;
}

.virtual-list-container .list .item {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
    list-style: none;
}
</style>