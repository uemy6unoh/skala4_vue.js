<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/hands-on/3.Component/BaseDashboardCard.vue'
import SearchBar from '../components/hands-on/3.Component/SearchBar.vue'
import WeatherCard from '../components/hands-on/3.Component/WeatherCard.vue'
import WeatherFilter from '../components/hands-on/3.Component/WeatherFilter.vue'

const router = useRouter()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 62, wind: 2.8, fineDust: 92 },
  { id: 'city_02', name: '안양', temp: 27, status: '맑음', humidity: 58, wind: 3.1, fineDust: 42 },
  { id: 'city_03', name: '천안', temp: 23, status: '흐림', humidity: 76, wind: 4.5, fineDust: 68 },
  { id: 'city_04', name: '거제', temp: 25, status: '비', humidity: 88, wind: 9.3, fineDust: 22 },
  { id: 'city_05', name: '경주', temp: 29, status: '맑음', humidity: 81, wind: 6.2, fineDust: 28 },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
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

watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[watch] 선택 문구 변경: ${oldInfo} / ${newInfo}`)
})

watch(selectedWeather, (newWeather, oldWeather) => {
  console.log(`[watch] 날씨 필터 변경: ${oldWeather} / ${newWeather}`)
})

watchEffect(() => {
  const query = searchQuery.value || '(비어 있음)'
  console.log(`[watchEffect] 현재 검색어: ${query}`)
})

const openDetail = (cityItem) => {
  router.push({ name: 'weather-detail', params: { cityId: cityItem.id } })
}
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <p class="step-label">Hands-on 4</p>
      <h1>날씨 Router</h1>
      <p>도시 상세보기와 안내 화면을 각각의 주소로 이동합니다.</p>
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
        <WeatherCard
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

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(100%, 820px);
  margin: 24px auto;
  padding: 24px;
  color: #26364d;
  background: #f4f7fb;
  border: 1px solid #e2e9f2;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(34, 54, 84, 0.1);
}

.dashboard-header {
  margin-bottom: 18px;
}

.dashboard-header h1,
.dashboard-header p,
.list-heading h2,
.list-heading p {
  margin: 0;
}

.dashboard-header h1 {
  margin-top: 3px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.dashboard-header > p:last-child {
  margin-top: 7px;
  font-size: 13px;
  color: #718096;
}

.step-label,
.section-label {
  font-size: 11px;
  font-weight: 750;
  color: #5d7ca9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.list-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.list-heading h2 {
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

.empty-result p {
  margin: 6px 0 0;
  font-size: 12px;
}

.status-bar {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 650;
  color: #49637f;
  text-align: center;
  background: #eaf0f7;
  border-radius: 12px;
}

@media (max-width: 650px) {
  .dashboard-wrapper {
    margin: 12px auto;
    padding: 14px;
  }

  .list-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
