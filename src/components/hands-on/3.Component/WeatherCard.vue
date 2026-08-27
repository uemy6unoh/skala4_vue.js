<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <article
    class="weather-card"
    :class="{
      'is-sunny': cityItem.status === '맑음',
      'is-cloudy': cityItem.status === '흐림',
      'is-rainy': cityItem.status === '비',
    }"
    tabindex="0"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
    @keydown.enter="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
    @keydown.space.prevent="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <div class="card-header">
      <div class="city-heading">
        <span v-if="cityItem.status === '맑음'" class="weather-icon" aria-label="맑음">☀</span>
        <span v-else-if="cityItem.status === '흐림'" class="weather-icon" aria-label="흐림">☁</span>
        <span v-else-if="cityItem.status === '비'" class="weather-icon" aria-label="비">☂</span>
        <span v-else class="weather-icon" aria-label="기타 날씨">○</span>

        <div>
          <h4>{{ cityItem.name }}</h4>
          <p class="weather-status">오늘은 {{ cityItem.status }}</p>
        </div>
      </div>

      <button type="button" class="btn-detail" @click.stop="emit('click-detail', cityItem)">
        상세보기
      </button>
    </div>

    <div class="weather-metrics">
      <div class="metric-item">
        <span>현재 기온</span>
        <strong>{{ cityItem.temp }}°C</strong>
      </div>
      <div class="metric-item">
        <span>습도</span>
        <strong>{{ cityItem.humidity }}%</strong>
      </div>
      <div class="metric-item">
        <span>풍속</span>
        <strong>{{ cityItem.wind }}m/s</strong>
      </div>
      <div class="metric-item">
        <span>미세먼지</span>
        <strong>{{ cityItem.fineDust }}㎍/㎥</strong>
      </div>
    </div>

    <p v-if="cityItem.fineDust > 80" class="weather-tip warning">
      미세먼지가 많아요. 외출할 때 마스크를 챙기세요.
    </p>
    <p v-else-if="cityItem.wind >= 8" class="weather-tip caution">
      바람이 강하게 불어요. 야외 활동에 주의하세요.
    </p>
    <p v-else-if="cityItem.humidity >= 80" class="weather-tip caution">
      습도가 높아요. 통풍과 실내 환기에 신경 써주세요.
    </p>
    <p v-else class="weather-tip safe">현재는 비교적 외출하기 좋은 날씨예요.</p>
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
  transition:
    transform 180ms var(--ease-out),
    box-shadow 180ms ease;
}

.weather-card:active {
  box-shadow: 0 6px 16px rgba(40, 58, 84, 0.12);
}

.weather-card.is-sunny {
  --weather-accent: var(--weather-sun);
}

.weather-card.is-cloudy {
  --weather-accent: var(--weather-cloud);
}

.weather-card.is-rainy {
  --weather-accent: var(--weather-rain);
}

.card-header,
.city-heading {
  display: flex;
  align-items: center;
}

.card-header {
  justify-content: space-between;
  gap: 14px;
}

.city-heading {
  gap: 12px;
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

.weather-card h4,
.weather-status {
  margin: 0;
}

.weather-card h4 {
  font-size: 21px;
  font-weight: 800;
}

.weather-status {
  margin-top: 3px;
  font-size: 12px;
  font-weight: 650;
  color: var(--weather-accent);
}

.btn-detail {
  padding: 7px 11px;
  color: #5f7086;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #d5deea;
  border-radius: 9px;
  cursor: pointer;
  transition:
    color var(--press-duration) ease,
    background-color var(--press-duration) ease,
    border-color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.btn-detail:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .weather-card:hover {
    box-shadow: 0 12px 26px rgba(40, 58, 84, 0.13);
    transform: translateY(-2px);
  }

  .btn-detail:hover {
    color: #ffffff;
    background: var(--app-blue);
    border-color: var(--app-blue);
  }
}

.weather-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(222, 229, 239, 0.86);
  border-radius: 12px;
}

.metric-item span {
  font-size: 11px;
  color: #8290a3;
}

.metric-item strong {
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.weather-tip {
  padding: 9px 11px;
  margin: 12px 0 0;
  font-size: 11px;
  line-height: 1.45;
  border-radius: 8px;
}

.weather-tip.warning {
  color: #a92f2f;
  background: #fff0f0;
  border-left: 4px solid #df4747;
}

.weather-tip.caution {
  color: #9a5b00;
  background: #fff6df;
  border-left: 4px solid #e59a18;
}

.weather-tip.safe {
  color: #1d7042;
  background: #eaf8f0;
  border-left: 4px solid #31a865;
}

@media (max-width: 650px) {
  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
