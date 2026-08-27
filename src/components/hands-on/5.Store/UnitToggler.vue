<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <section class="unit-toggler" aria-label="온도 단위 설정">
    <div>
      <span>온도 단위</span>
      <strong>{{ configStore.unitSymbol }}</strong>
    </div>
    <button type="button" @click="configStore.toggleUnit">
      {{ configStore.unit === 'celsius' ? '화씨로 변경' : '섭씨로 변경' }}
    </button>
  </section>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  color: var(--app-text);
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
}

.unit-toggler div {
  display: flex;
  align-items: center;
  gap: 7px;
}

.unit-toggler span {
  font-size: 11px;
  color: var(--app-secondary);
}

.unit-toggler strong {
  font-size: 17px;
}

.unit-toggler button {
  padding: 7px 10px;
  font-size: 12px;
  color: #ffffff;
  background: var(--app-blue);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
</style>
