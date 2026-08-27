<script setup>
import { useConfigStore } from '@/stores/configStore'
import { ElAlert, ElButton, ElCard, ElSkeleton, ElTag } from 'element-plus'
import { getWeatherSymbol } from '../js/uiWeatherApi'

const configStore = useConfigStore()

const displayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return temp
}

defineProps({
  cities: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

defineEmits(['open-detail', 'reload'])
</script>

<template>
  <ElCard shadow="never" class="city-panel">
    <template #header>
      <h2>주요 도시 6곳</h2>
    </template>

    <ElSkeleton v-if="isLoading" :rows="6" animated />

    <div v-else-if="errorMessage" class="panel-state">
      <ElAlert :title="errorMessage" type="error" :closable="false" show-icon />
      <ElButton type="danger" plain @click="$emit('reload')">다시 불러오기</ElButton>
    </div>

    <div v-else class="city-grid">
      <ElCard
        v-for="city in cities"
        :key="city.id"
        shadow="hover"
        class="city-card"
        tabindex="0"
        @click="$emit('open-detail', city)"
        @keyup.enter="$emit('open-detail', city)"
      >
        <span class="city-name">{{ city.name }}</span>
        <span class="city-weather">
          <span aria-hidden="true">{{ getWeatherSymbol(city.status) }}</span>
          <strong>{{ displayTemp(city.temp) }}{{ configStore.unitSymbol }}</strong>
        </span>
        <ElTag size="small" effect="plain">{{ city.status }}</ElTag>
      </ElCard>
    </div>
  </ElCard>
</template>

<style scoped>
.city-panel {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
}

.city-panel > :deep(.el-card__header) {
  padding: 15px 18px;
}

.city-panel > :deep(.el-card__body) {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  padding: 14px;
}

.city-panel h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.city-grid {
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.city-card {
  min-height: 92px;
  cursor: pointer;
}

.city-card :deep(.el-card__body) {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
}

.city-name {
  font-size: 13px;
  font-weight: 700;
}

.city-weather {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 7px 0 5px;
}

.city-weather > span {
  color: var(--weather-sun);
}

.city-weather strong {
  font-size: 20px;
}

.panel-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
