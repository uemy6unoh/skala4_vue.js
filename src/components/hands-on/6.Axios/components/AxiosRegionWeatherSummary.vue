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
  region: {
    type: Object,
    default: null,
  },
  weather: {
    type: Object,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-favorite', 'open-detail'])
</script>

<template>
  <section class="region-summary" aria-live="polite">
    <div v-if="!region" class="empty-summary">
      <strong>지역을 선택해 주세요.</strong>
      <span>지도에서 시군구를 클릭하면 현재 날씨를 확인할 수 있습니다.</span>
    </div>

    <div v-else class="selected-region">
      <div class="region-title">
        <strong>{{ region.fullName }}</strong>
      </div>

      <p v-if="isLoading" class="summary-state">날씨를 불러오는 중입니다.</p>
      <p v-else-if="errorMessage" class="summary-state error">{{ errorMessage }}</p>

      <div v-else-if="weather" class="basic-weather">
        <span class="weather-symbol" aria-hidden="true">{{
          getWeatherSymbol(weather.status)
        }}</span>
        <strong>{{ displayTemp(weather.temp) }}{{ configStore.unitSymbol }}</strong>
        <span>{{ weather.status }}</span>
      </div>

      <div class="summary-actions">
        <button type="button" class="favorite-button" @click="$emit('toggle-favorite')">
          {{ isFavorite ? '관심 지역 해제' : '관심 지역 추가' }}
        </button>
        <button
          type="button"
          class="detail-button"
          :disabled="!weather"
          @click="$emit('open-detail')"
        >
          상세보기
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.region-summary {
  min-height: 92px;
  padding: 14px 16px;
  background: #ffffff;
  border-top: 1px solid var(--app-border);
}

.empty-summary,
.selected-region {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 62px;
}

.empty-summary {
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  color: var(--app-secondary);
  text-align: center;
}

.empty-summary strong {
  color: var(--app-text);
}

.empty-summary span,
.summary-state {
  font-size: 12px;
}

.region-title {
  display: flex;
  min-width: 170px;
}

.region-title strong {
  font-size: 15px;
}

.basic-weather {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: auto;
}

.weather-symbol {
  font-size: 24px;
  color: var(--weather-sun);
}

.basic-weather strong {
  font-size: 22px;
}

.basic-weather span:last-child {
  font-size: 13px;
  color: var(--app-secondary);
}

.summary-state {
  margin: 0 auto 0 0;
  color: var(--app-secondary);
}

.summary-state.error {
  color: #b44545;
}

.summary-actions {
  display: flex;
  gap: 7px;
  margin-left: auto;
}

.summary-actions button {
  padding: 8px 11px;
  font-size: 12px;
  font-weight: 650;
  border-radius: 8px;
  cursor: pointer;
}

.favorite-button {
  color: #7a5700;
  background: #fff7cc;
  border: 1px solid #ead98a;
}

.detail-button {
  color: #ffffff;
  background: var(--app-blue);
  border: 1px solid var(--app-blue);
}

.detail-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

@media (max-width: 720px) {
  .selected-region {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .summary-actions {
    width: 100%;
    margin-left: 0;
  }
}
</style>
