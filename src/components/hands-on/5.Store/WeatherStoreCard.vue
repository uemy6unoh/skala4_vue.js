<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

const displayTemp = computed(() => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((props.cityItem.temp * 9) / 5 + 32)
  }

  return props.cityItem.temp
})
</script>

<template>
  <article
    class="weather-card"
    :class="{
      'is-sunny': cityItem.status === '맑음',
      'is-rainy': cityItem.status === '비',
    }"
    tabindex="0"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
    @keydown.enter="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <div class="card-header">
      <div class="city-heading">
        <span v-if="cityItem.status === '맑음'" class="weather-icon" aria-label="맑음">☀</span>
        <span v-else-if="cityItem.status === '흐림'" class="weather-icon" aria-label="흐림">☁</span>
        <span v-else-if="cityItem.status === '비'" class="weather-icon" aria-label="비">☂</span>

        <div>
          <h3>{{ cityItem.name }}</h3>
          <p>오늘은 {{ cityItem.status }}</p>
        </div>
      </div>

      <div class="card-actions">
        <button type="button" class="btn-favorite" @click.stop="favoriteStore.toggleFavorite(cityItem.id)">
          {{ favoriteStore.isFavorite(cityItem.id) ? '관심 해제' : '관심 추가' }}
        </button>
        <button type="button" class="btn-detail" @click.stop="emit('click-detail', cityItem)">
          상세보기
        </button>
      </div>
    </div>

    <div class="weather-metrics">
      <div>
        <span>현재 기온</span>
        <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </div>
      <div>
        <span>습도</span>
        <strong>{{ cityItem.humidity }}%</strong>
      </div>
      <div>
        <span>풍속</span>
        <strong>{{ cityItem.wind }}m/s</strong>
      </div>
      <div>
        <span>미세먼지</span>
        <strong>{{ cityItem.fineDust }}㎍/㎥</strong>
      </div>
    </div>
  </article>
</template>

<style scoped>
.weather-card {
  --weather-accent: var(--weather-cloud);
  padding: 16px;
  margin-top: 14px;
  background: #ffffff;
  border: 1px solid var(--app-border);
  border-left: 5px solid var(--weather-accent);
  border-radius: var(--app-radius-lg);
  cursor: pointer;
}

.weather-card.is-sunny {
  --weather-accent: var(--weather-sun);
}

.weather-card.is-rainy {
  --weather-accent: var(--weather-rain);
}

.card-header,
.city-heading,
.card-actions {
  display: flex;
  align-items: center;
}

.card-header {
  justify-content: space-between;
  gap: 14px;
}

.city-heading,
.card-actions {
  gap: 10px;
}

.weather-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  font-size: 29px;
  color: var(--weather-accent);
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: 10px;
}

.weather-card h3,
.weather-card p {
  margin: 0;
}

.weather-card h3 {
  font-size: 21px;
}

.weather-card p {
  margin-top: 3px;
  font-size: 12px;
  color: var(--weather-accent);
}

.btn-favorite,
.btn-detail {
  padding: 7px 10px;
  font-size: 12px;
  background: #ffffff;
  border: 1px solid #d5deea;
  border-radius: 9px;
  cursor: pointer;
}

.btn-favorite {
  color: #a45b00;
}

.btn-detail {
  color: #5f7086;
}

.weather-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.weather-metrics div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(222, 229, 239, 0.86);
  border-radius: 12px;
}

.weather-metrics span {
  font-size: 11px;
  color: #8290a3;
}

.weather-metrics strong {
  font-size: 14px;
}

@media (max-width: 650px) {
  .card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
