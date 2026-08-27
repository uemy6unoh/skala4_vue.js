<script setup>
import { useConfigStore } from '@/stores/configStore'
import { ElButton, ElTag } from 'element-plus'

const configStore = useConfigStore()
</script>

<template>
  <section class="unit-toggler" aria-label="온도 단위 설정">
    <span>온도 단위</span>
    <ElTag>{{ configStore.unitSymbol }}</ElTag>
    <ElButton type="primary" size="small" @click="configStore.toggleUnit">
      {{ configStore.unit === 'celsius' ? '화씨로 변경' : '섭씨로 변경' }}
    </ElButton>
  </section>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unit-toggler > span {
  font-size: 12px;
  color: var(--app-secondary);
}
</style>
