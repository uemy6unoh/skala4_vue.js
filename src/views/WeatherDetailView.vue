<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const selectedCity = ref(null)

const weatherList = [
  {
    id: 'city_01',
    name: '서울',
    area: '서울특별시',
    temp: 28,
    status: '맑음',
    humidity: 62,
    wind: 2.8,
    fineDust: 92,
  },
  {
    id: 'city_02',
    name: '안양',
    area: '경기도 안양시',
    temp: 27,
    status: '맑음',
    humidity: 58,
    wind: 3.1,
    fineDust: 42,
  },
  {
    id: 'city_03',
    name: '천안',
    area: '충청남도 천안시',
    temp: 23,
    status: '흐림',
    humidity: 76,
    wind: 4.5,
    fineDust: 68,
  },
  {
    id: 'city_04',
    name: '거제',
    area: '경상남도 거제시',
    temp: 25,
    status: '비',
    humidity: 88,
    wind: 9.3,
    fineDust: 22,
  },
  {
    id: 'city_05',
    name: '경주',
    area: '경상북도 경주시',
    temp: 29,
    status: '맑음',
    humidity: 81,
    wind: 6.2,
    fineDust: 28,
  },
]

onMounted(() => {
  selectedCity.value = weatherList.find((item) => item.id === route.params.cityId) || null
})
</script>

<template>
  <section class="page-card">
    <template v-if="selectedCity">
      <p class="page-label">지역별 상세 기상관측</p>
      <h1>{{ selectedCity.name }} 날씨</h1>
      <p class="area">{{ selectedCity.area }}</p>

      <div class="current-weather">
        <span v-if="selectedCity.status === '맑음'" aria-label="맑음">☀</span>
        <span v-else-if="selectedCity.status === '흐림'" aria-label="흐림">☁</span>
        <span v-else-if="selectedCity.status === '비'" aria-label="비">☂</span>
        <strong>{{ selectedCity.temp }}°C</strong>
        <small>{{ selectedCity.status }}</small>
      </div>

      <dl class="detail-grid">
        <div>
          <dt>습도</dt>
          <dd>{{ selectedCity.humidity }}%</dd>
        </div>
        <div>
          <dt>풍속</dt>
          <dd>{{ selectedCity.wind }}m/s</dd>
        </div>
        <div>
          <dt>미세먼지</dt>
          <dd>{{ selectedCity.fineDust }}㎍/㎥</dd>
        </div>
      </dl>

      <p v-if="selectedCity.fineDust > 80" class="notice warning">
        미세먼지 농도가 높습니다. 외출할 때 마스크를 챙기세요.
      </p>
      <p v-else-if="selectedCity.wind >= 8" class="notice caution">
        바람이 강하게 불고 있습니다. 야외 활동에 주의하세요.
      </p>
      <p v-else class="notice safe">현재는 비교적 외출하기 좋은 상태입니다.</p>
    </template>

    <template v-else>
      <p class="page-label">지역별 상세 기상관측</p>
      <h1>도시 정보를 찾지 못했습니다.</h1>
      <p class="area">주소의 도시 ID를 다시 확인해 주세요.</p>
    </template>

    <RouterLink :to="{ name: 'weather-home' }" class="back-link">대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.page-card {
  width: min(100%, 720px);
  padding: 30px;
  margin: 24px auto;
  color: var(--app-text);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.page-label,
.page-card h1,
.area {
  margin: 0;
}

.page-label {
  font-size: 11px;
  font-weight: 750;
  color: #5d7ca9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.page-card h1 {
  margin-top: 4px;
  font-size: 28px;
  font-weight: 750;
}

.area {
  margin-top: 4px;
  font-size: 13px;
  color: #7a889a;
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 22px;
  margin-top: 24px;
  background: var(--app-surface-subtle);
  border-radius: 16px;
}

.current-weather span {
  font-size: 42px;
  color: var(--app-blue);
}

.current-weather strong {
  font-size: 34px;
}

.current-weather small {
  color: #708097;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 14px 0 0;
}

.detail-grid div {
  padding: 14px;
  background: #f9fbfd;
  border: 1px solid #e5ebf2;
  border-radius: 12px;
}

.detail-grid dt {
  font-size: 11px;
  color: #8491a3;
}

.detail-grid dd {
  margin: 4px 0 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.notice {
  padding: 11px 13px;
  margin: 14px 0 0;
  font-size: 12px;
  border-radius: 9px;
}

.notice.warning {
  color: #a92f2f;
  background: #fff0f0;
}

.notice.caution {
  color: #9a5b00;
  background: #fff6df;
}

.notice.safe {
  color: #1d7042;
  background: #eaf8f0;
}

.back-link {
  display: inline-block;
  margin-top: 22px;
  font-size: 13px;
  font-weight: 650;
  color: var(--app-blue);
  text-decoration: none;
}

@media (max-width: 600px) {
  .page-card {
    padding: 20px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
