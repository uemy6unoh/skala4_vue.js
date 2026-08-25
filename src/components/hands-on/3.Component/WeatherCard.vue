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
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <div class="card-header">
      <div class="city-heading">
        <span v-if="cityItem.status === '맑음'" class="weather-icon" aria-label="맑음">☀️</span>
        <span v-else-if="cityItem.status === '흐림'" class="weather-icon" aria-label="흐림">☁️</span>
        <span v-else-if="cityItem.status === '비'" class="weather-icon" aria-label="비">🌧️</span>
        <span v-else class="weather-icon" aria-label="기타 날씨">🌤️</span>

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
  --weather-accent: #8ea2bc;
  --weather-tint: #f6f8fb;
  padding: 16px;
  margin-top: 14px;
  background: linear-gradient(145deg, var(--weather-tint), #ffffff 42%);
  border: 1px solid #e3e8ef;
  border-top: 4px solid var(--weather-accent);
  border-radius: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.weather-card:hover {
  box-shadow: 0 12px 26px rgba(40, 58, 84, 0.13);
  transform: translateY(-2px);
}

.weather-card.is-sunny {
  --weather-accent: #f2b84b;
  --weather-tint: #fff9e9;
}

.weather-card.is-cloudy {
  --weather-accent: #8ba0b8;
  --weather-tint: #f1f5f9;
}

.weather-card.is-rainy {
  --weather-accent: #5c8fd8;
  --weather-tint: #eef6ff;
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
  font-size: 30px;
  background: rgba(255, 255, 255, 0.78);
  border-radius: 14px;
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
}

.btn-detail:hover {
  color: #ffffff;
  background: #536f9c;
  border-color: #536f9c;
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
}

.weather-tip {
  padding: 9px 11px;
  margin: 12px 0 0;
  font-size: 11px;
  line-height: 1.45;
  border-radius: 8px;
}

.weather-tip.warning {
  color: #991b1b;
  background: #fff1f2;
  border-left: 4px solid #ef4444;
}

.weather-tip.caution {
  color: #92400e;
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
}

.weather-tip.safe {
  color: #166534;
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
}

@media (max-width: 650px) {
  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
