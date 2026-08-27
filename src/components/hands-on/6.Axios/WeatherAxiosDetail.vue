<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import UnitToggler from '../5.Store/UnitToggler.vue'
import { useConfigStore } from '@/stores/configStore'
import { fetchDetailedWeather, getWeatherSymbol } from './js/axiosWeatherApi'
import { findMajorCity } from './js/axiosMajorCities'
import { findRegionByCode } from './js/axiosRegionData'
import { useMapFavoriteStore } from './js/axiosMapFavoriteStore'

const route = useRoute()
const configStore = useConfigStore()
const favoriteStore = useMapFavoriteStore()

const weather = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const selectedLocation = computed(() => {
  const locationId = route.params.locationId
  const city = findMajorCity(locationId)

  if (city) {
    return { ...city, fullName: city.area, type: 'city' }
  }

  const region = findRegionByCode(locationId)
  return region ? { ...region, type: 'region' } : null
})

const isFavorite = computed(() => {
  if (selectedLocation.value?.type !== 'region') return false
  return favoriteStore.isFavorite(selectedLocation.value.code)
})

const fineDustGrade = computed(() => {
  const fineDust = weather.value?.fineDust

  if (fineDust <= 30) return '좋음'
  if (fineDust <= 80) return '보통'
  if (fineDust <= 150) return '나쁨'
  return '매우 나쁨'
})

const displayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return temp
}

const loadWeatherDetail = async () => {
  if (!selectedLocation.value) {
    errorMessage.value = '지역 정보를 찾지 못했습니다.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    weather.value = await fetchDetailedWeather(selectedLocation.value)
  } catch (error) {
    console.error(error)
    errorMessage.value = '상세 날씨를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = () => {
  if (selectedLocation.value?.type !== 'region') return
  favoriteStore.toggleFavorite(selectedLocation.value.code)
}

onMounted(loadWeatherDetail)
</script>

<template>
  <section class="detail-page">
    <p v-if="isLoading" class="request-state">상세 날씨를 불러오는 중입니다.</p>

    <template v-else-if="weather">
      <header class="detail-heading">
        <div>
          <h1>{{ weather.name }} 날씨</h1>
          <p class="area">{{ weather.fullName }}</p>
        </div>

        <div class="detail-actions">
          <UnitToggler />
          <button
            v-if="selectedLocation.type === 'region'"
            type="button"
            class="favorite-button"
            @click="toggleFavorite"
          >
            {{ isFavorite ? '관심 지역 해제' : '관심 지역 추가' }}
          </button>
        </div>
      </header>

      <div class="current-weather">
        <span aria-hidden="true">{{ getWeatherSymbol(weather.status) }}</span>
        <strong>{{ displayTemp(weather.temp) }}{{ configStore.unitSymbol }}</strong>
        <small>{{ weather.status }}</small>
      </div>

      <dl class="detail-grid">
        <div>
          <dt>오늘 기온</dt>
          <dd>
            {{ displayTemp(weather.minTemp) }}{{ configStore.unitSymbol }} /
            {{ displayTemp(weather.maxTemp) }}{{ configStore.unitSymbol }}
          </dd>
        </div>
        <div>
          <dt>습도</dt>
          <dd>{{ weather.humidity }}%</dd>
        </div>
        <div>
          <dt>풍속</dt>
          <dd>{{ weather.wind }}m/s</dd>
        </div>
        <div>
          <dt>미세먼지</dt>
          <dd>{{ weather.fineDust }}㎍/㎥</dd>
          <small>{{ fineDustGrade }}</small>
        </div>
      </dl>

      <p v-if="weather.fineDust > 80" class="notice warning">
        미세먼지 농도가 높습니다. 외출할 때 마스크를 챙기세요.
      </p>
      <p v-else-if="weather.wind >= 8" class="notice caution">
        바람이 강하게 불고 있습니다. 야외 활동에 주의하세요.
      </p>
      <p v-else class="notice safe">현재는 비교적 외출하기 좋은 상태입니다.</p>
    </template>

    <template v-else>
      <h1>{{ errorMessage }}</h1>
      <p class="area">지역과 API 연결 상태를 확인해 주세요.</p>
    </template>

    <RouterLink :to="{ name: 'axios-home' }" class="back-link"
      >전국 날씨 지도로 돌아가기</RouterLink
    >
  </section>
</template>

<style scoped>
.detail-page {
  width: min(100%, 760px);
  padding: 30px;
  margin: 24px auto;
  color: var(--app-text);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.detail-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.detail-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-page h1,
.area,
.request-state {
  margin: 0;
}

.detail-page h1 {
  font-size: 30px;
  font-weight: 750;
}

.area {
  margin-top: 6px;
  font-size: 13px;
  color: var(--app-secondary);
}

.favorite-button {
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 650;
  color: #7a5700;
  background: #fff7cc;
  border: 1px solid #ead98a;
  border-radius: 9px;
  cursor: pointer;
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 28px 0;
  margin-top: 22px;
  border-top: 1px solid var(--app-border);
  border-bottom: 1px solid var(--app-border);
}

.current-weather > span {
  font-size: 44px;
  color: var(--weather-sun);
}

.current-weather strong {
  font-size: 48px;
  letter-spacing: -0.05em;
}

.current-weather small {
  font-size: 15px;
  color: var(--app-secondary);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 22px 0;
}

.detail-grid div {
  padding: 17px;
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: 12px;
}

.detail-grid dt {
  font-size: 12px;
  color: var(--app-secondary);
}

.detail-grid dd {
  margin: 7px 0 0;
  font-size: 21px;
  font-weight: 750;
}

.detail-grid small {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: var(--app-secondary);
}

.notice {
  padding: 12px 14px;
  margin: 0;
  font-size: 13px;
  border-radius: 10px;
}

.notice.safe {
  color: #237a46;
  background: #eaf8ef;
}

.notice.caution {
  color: #865f00;
  background: #fff7d6;
}

.notice.warning {
  color: #a23636;
  background: #fff0f0;
}

.back-link {
  display: inline-block;
  margin-top: 22px;
  font-size: 13px;
  font-weight: 650;
  color: var(--app-blue);
  text-decoration: none;
}

.request-state {
  padding: 60px 20px;
  text-align: center;
  color: var(--app-secondary);
}

@media (max-width: 650px) {
  .detail-page {
    padding: 20px;
    margin: 12px auto;
  }

  .detail-heading {
    flex-direction: column;
  }

  .detail-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
