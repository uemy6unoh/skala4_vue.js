<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../3.Component/BaseDashboardCard.vue'
import SearchBar from '../3.Component/SearchBar.vue'
import WeatherFilter from '../3.Component/WeatherFilter.vue'
import UnitToggler from './UnitToggler.vue'
import WeatherStoreCard from './WeatherStoreCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 62, wind: 2.8, fineDust: 92 },
  { id: 'city_02', name: '안양', temp: 27, status: '맑음', humidity: 58, wind: 3.1, fineDust: 42 },
  { id: 'city_03', name: '천안', temp: 23, status: '흐림', humidity: 76, wind: 4.5, fineDust: 68 },
  { id: 'city_04', name: '거제', temp: 25, status: '비', humidity: 88, wind: 9.3, fineDust: 22 },
  { id: 'city_05', name: '경주', temp: 29, status: '맑음', humidity: 81, wind: 6.2, fineDust: 28 },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 관심 도시를 추가해 보세요.')
const weatherOptions = ['전체', '맑음', '흐림', '비']
const selectedWeather = ref('전체')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  return weatherList.value.filter((item) => {
    const matchesQuery = !query || item.name.includes(query)
    const matchesWeather = selectedWeather.value === '전체' || item.status === selectedWeather.value

    return matchesQuery && matchesWeather
  })
})

const searchResultText = computed(() => {
  if (!searchQuery.value.trim() && selectedWeather.value === '전체') {
    return `전체 ${weatherList.value.length}개 도시`
  }

  if (filteredWeatherList.value.length === 0) {
    return '조건에 맞는 도시가 없습니다.'
  }

  return `${filteredWeatherList.value.length}개 도시를 찾았습니다.`
})

const favoriteCities = computed(() => {
  return weatherList.value.filter((city) => favoriteStore.favoriteCityIds.includes(city.id))
})

const openDetail = (cityItem) => {
  router.push({ name: 'store-detail', params: { cityId: cityItem.id } })
}
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <div class="dashboard-title-row">
        <div>
          <h1>Weather Store</h1>
          <p>Pinia로 여러 컴포넌트의 날씨 단위와 관심 도시를 함께 관리합니다.</p>
        </div>
        <UnitToggler />
      </div>
    </header>

    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        :result-text="searchResultText"
        @update-query="(value) => (searchQuery = value)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="list-heading">
        <div>
          <p class="section-label">지역별 날씨 현황</p>
          <h2>날씨 상태로 한 번 더 보기</h2>
        </div>

        <WeatherFilter
          :options="weatherOptions"
          :selected-weather="selectedWeather"
          @select-weather="(value) => (selectedWeather = value)"
        />
      </div>

      <div v-if="filteredWeatherList.length">
        <WeatherStoreCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(message) => (selectedCityInfo = message)"
          @click-detail="openDetail"
        />
      </div>

      <div v-else class="empty-result">
        <strong>검색 결과가 없습니다.</strong>
        <p>도시 이름이나 날씨 조건을 다시 확인해 주세요.</p>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="favorite-heading">
        <div>
          <p class="section-label">Pinia 추가 기능</p>
          <h2>관심 도시 {{ favoriteStore.favoriteCount }}개</h2>
        </div>
        <button
          v-if="favoriteStore.favoriteCount"
          type="button"
          class="btn-clear"
          @click="favoriteStore.clearFavorites"
        >
          전체 해제
        </button>
      </div>

      <p v-if="favoriteCities.length === 0" class="favorite-empty">
        관심 도시로 추가한 지역이 없습니다.
      </p>
      <ul v-else class="favorite-list">
        <li v-for="city in favoriteCities" :key="city.id">{{ city.name }}</li>
      </ul>
    </BaseDashboardCard>

    <div class="status-bar" aria-live="polite">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 34px;
  color: var(--app-text);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.dashboard-header {
  margin-bottom: 26px;
}

.dashboard-title-row,
.list-heading,
.favorite-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.dashboard-title-row {
  align-items: flex-start;
}

.dashboard-header h1,
.dashboard-header p,
.list-heading h2,
.list-heading p,
.favorite-heading h2,
.favorite-heading p {
  margin: 0;
}

.dashboard-header h1 {
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 750;
  letter-spacing: -0.04em;
}

.dashboard-header p {
  margin-top: 8px;
  font-size: 14px;
  color: var(--app-secondary);
}

.section-label {
  font-size: 11px;
  font-weight: 750;
  color: #5d7ca9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.list-heading h2,
.favorite-heading h2 {
  margin-top: 3px;
  font-size: 17px;
  font-weight: 650;
}

.empty-result {
  padding: 38px 20px;
  margin-top: 14px;
  text-align: center;
  color: #7b8799;
  background: #f8fafc;
  border: 1px dashed #cad5e2;
  border-radius: 14px;
}

.empty-result strong {
  color: #b44545;
}

.empty-result p,
.favorite-empty {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--app-secondary);
}

.favorite-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 14px 0 0;
  list-style: none;
}

.favorite-list li {
  padding: 7px 11px;
  font-size: 12px;
  color: #0b5cc4;
  background: #e9f2ff;
  border-radius: 999px;
}

.btn-clear {
  padding: 7px 10px;
  font-size: 12px;
  color: #a92f2f;
  background: #fff0f0;
  border: 1px solid #f0caca;
  border-radius: 8px;
  cursor: pointer;
}

.status-bar {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 650;
  color: #0b5cc4;
  text-align: center;
  background: #e9f2ff;
  border-radius: 12px;
}

@media (max-width: 650px) {
  .dashboard-wrapper {
    margin: 12px auto;
    padding: 14px;
  }

  .dashboard-title-row,
  .list-heading,
  .favorite-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
