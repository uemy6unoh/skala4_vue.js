<script setup>
import { useConfigStore } from '@/stores/configStore'
import { ElAlert, ElButton, ElSkeleton, ElTag } from 'element-plus'
import { getWeatherSymbol } from '../js/uiWeatherApi'

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
      <strong class="region-title">{{ region.fullName }}</strong>

      <ElSkeleton v-if="isLoading" class="summary-state" :rows="1" animated />
      <ElAlert
        v-else-if="errorMessage"
        class="summary-state"
        :title="errorMessage"
        type="error"
        :closable="false"
        show-icon
      />

      <div v-else-if="weather" class="basic-weather">
        <span class="weather-symbol" aria-hidden="true">{{
          getWeatherSymbol(weather.status)
        }}</span>
        <strong>{{ displayTemp(weather.temp) }}{{ configStore.unitSymbol }}</strong>
        <ElTag effect="plain">{{ weather.status }}</ElTag>
      </div>

      <div class="summary-actions">
        <ElButton type="warning" plain @click="$emit('toggle-favorite')">
          {{ isFavorite ? '관심 지역 해제' : '관심 지역 추가' }}
        </ElButton>
        <ElButton type="primary" :disabled="!weather" @click="$emit('open-detail')">
          상세보기
        </ElButton>
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

.empty-summary strong,
.region-title {
  color: var(--app-text);
}

.empty-summary span {
  font-size: 12px;
}

.region-title {
  min-width: 170px;
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

.summary-state {
  max-width: 320px;
  margin-right: auto;
}

.summary-actions {
  display: flex;
  gap: 7px;
  margin-left: auto;
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
