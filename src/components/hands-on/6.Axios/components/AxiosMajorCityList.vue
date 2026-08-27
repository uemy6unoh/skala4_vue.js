<script setup>
import { useConfigStore } from '@/stores/configStore'
import { getWeatherSymbol } from '../js/axiosWeatherApi'

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
  <aside class="city-panel">
    <div class="panel-heading">
      <h2>주요 도시 6곳</h2>
    </div>

    <div v-if="isLoading" class="panel-state">도시 날씨를 불러오는 중입니다.</div>

    <div v-else-if="errorMessage" class="panel-state error">
      <p>{{ errorMessage }}</p>
      <button type="button" @click="$emit('reload')">다시 불러오기</button>
    </div>

    <div v-else class="city-grid">
      <button
        v-for="city in cities"
        :key="city.id"
        type="button"
        class="city-card"
        @click="$emit('open-detail', city)"
      >
        <span class="city-name">{{ city.name }}</span>
        <span class="city-weather">
          <span aria-hidden="true">{{ getWeatherSymbol(city.status) }}</span>
          <strong>{{ displayTemp(city.temp) }}{{ configStore.unitSymbol }}</strong>
        </span>
        <small>{{ city.status }}</small>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.city-panel {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 18px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.panel-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.panel-heading h2,
.panel-state p {
  margin: 0;
}

.panel-heading h2 {
  font-size: 18px;
  font-weight: 700;
}

.city-grid {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.city-card {
  display: flex;
  min-height: 92px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  color: var(--app-text);
  text-align: left;
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  cursor: pointer;
  transition:
    border-color var(--press-duration) ease,
    transform var(--press-duration) ease;
}

.city-card:hover {
  border-color: #8abaff;
  transform: translateY(-1px);
}

.city-name {
  font-size: 13px;
  font-weight: 700;
}

.city-weather {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.city-weather span {
  color: var(--weather-sun);
}

.city-weather strong {
  font-size: 20px;
}

.city-card small {
  margin-top: 2px;
  color: var(--app-secondary);
}

.panel-state {
  display: grid;
  flex: 1;
  place-items: center;
  padding: 20px;
  font-size: 12px;
  color: var(--app-secondary);
  text-align: center;
  background: var(--app-surface-subtle);
  border-radius: 12px;
}

.panel-state.error {
  color: #b44545;
}

.panel-state button {
  padding: 7px 10px;
  margin-top: 8px;
  color: #b44545;
  background: #fff0f0;
  border: 1px solid #efc5c5;
  border-radius: 8px;
  cursor: pointer;
}
</style>
