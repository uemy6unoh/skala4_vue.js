<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import UnitToggler from '../5.Store/UnitToggler.vue'
import AxiosKoreaRegionMap from './components/AxiosKoreaRegionMap.vue'
import AxiosMajorCityList from './components/AxiosMajorCityList.vue'
import AxiosRegionWeatherSummary from './components/AxiosRegionWeatherSummary.vue'
import { fetchBasicWeather } from './js/axiosWeatherApi'
import { majorCities } from './js/axiosMajorCities'
import { searchRegions } from './js/axiosRegionData'
import { useMapFavoriteStore } from './js/axiosMapFavoriteStore'

const router = useRouter()
const favoriteStore = useMapFavoriteStore()

const cityWeatherList = ref([])
const selectedRegion = ref(null)
const selectedWeather = ref(null)
const focusRegionCode = ref('')
const searchKeyword = ref('')
const searchMessage = ref('')
const isCityLoading = ref(false)
const cityErrorMessage = ref('')
const isRegionLoading = ref(false)
const regionErrorMessage = ref('')

const isSelectedFavorite = computed(() => {
  if (!selectedRegion.value) return false
  return favoriteStore.isFavorite(selectedRegion.value.code)
})

const loadMajorCities = async () => {
  isCityLoading.value = true
  cityErrorMessage.value = ''

  try {
    cityWeatherList.value = await Promise.all(majorCities.map(fetchBasicWeather))
  } catch (error) {
    console.error(error)
    cityErrorMessage.value = '주요 도시 날씨를 불러오지 못했습니다.'
  } finally {
    isCityLoading.value = false
  }
}

const selectRegion = async (region) => {
  selectedRegion.value = region
  selectedWeather.value = null
  isRegionLoading.value = true
  regionErrorMessage.value = ''

  try {
    selectedWeather.value = await fetchBasicWeather(region)
  } catch (error) {
    console.error(error)
    regionErrorMessage.value = '선택 지역의 날씨를 불러오지 못했습니다.'
  } finally {
    isRegionLoading.value = false
  }
}

const searchRegion = () => {
  const results = searchRegions(searchKeyword.value)

  if (results.length === 0) {
    searchMessage.value = '검색한 지역을 찾지 못했습니다.'
    return
  }

  searchMessage.value = results.length > 1 ? `${results.length}개 지역 중 첫 번째 지역입니다.` : ''
  focusRegionCode.value = results[0].code
  selectRegion(results[0])
}

const toggleFavorite = () => {
  if (!selectedRegion.value) return
  favoriteStore.toggleFavorite(selectedRegion.value.code)
}

const openRegionDetail = () => {
  if (!selectedRegion.value) return

  router.push({
    name: 'axios-detail',
    params: { locationId: selectedRegion.value.code },
  })
}

const openCityDetail = (city) => {
  router.push({
    name: 'axios-detail',
    params: { locationId: city.id },
  })
}

onMounted(loadMajorCities)
</script>

<template>
  <div class="weather-map-page">
    <header class="page-header">
      <div>
        <h1>전국 날씨 지도</h1>
        <p>시군구를 선택해 현재 기온과 날씨 상태를 확인해 보세요.</p>
      </div>
      <div class="header-actions">
        <UnitToggler />
        <div class="favorite-count">
          <span>관심 지역</span>
          <strong>{{ favoriteStore.favoriteCount }}</strong>
        </div>
      </div>
    </header>

    <form class="region-search" @submit.prevent="searchRegion">
      <label for="region-keyword">지역 검색</label>
      <input
        id="region-keyword"
        v-model="searchKeyword"
        type="search"
        placeholder="예: 수원시, 서울 종로구"
      />
      <button type="submit">지도에서 찾기</button>
      <span v-if="searchMessage">{{ searchMessage }}</span>
    </form>

    <div class="map-dashboard">
      <section class="map-card">
        <div class="map-heading">
          <h2>대한민국 시군구</h2>
          <p><i></i> 관심 지역은 노란색으로 표시됩니다.</p>
        </div>

        <div class="map-area">
          <AxiosKoreaRegionMap
            :favorite-region-codes="favoriteStore.favoriteRegionCodes"
            :selected-region-code="selectedRegion?.code"
            :focus-region-code="focusRegionCode"
            @select-region="selectRegion"
          />
        </div>

        <AxiosRegionWeatherSummary
          :region="selectedRegion"
          :weather="selectedWeather"
          :is-loading="isRegionLoading"
          :error-message="regionErrorMessage"
          :is-favorite="isSelectedFavorite"
          @toggle-favorite="toggleFavorite"
          @open-detail="openRegionDetail"
        />
      </section>

      <AxiosMajorCityList
        :cities="cityWeatherList"
        :is-loading="isCityLoading"
        :error-message="cityErrorMessage"
        @open-detail="openCityDetail"
        @reload="loadMajorCities"
      />
    </div>
  </div>
</template>

<style scoped>
.weather-map-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 72px);
  min-height: 650px;
  flex-direction: column;
  gap: 14px;
  color: var(--app-text);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-header h1,
.page-header p,
.map-heading h2,
.map-heading p {
  margin: 0;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.page-header > div > p:last-child {
  margin-top: 5px;
  font-size: 13px;
  color: var(--app-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.favorite-count {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 13px;
  color: #7a5700;
  background: #fff7cc;
  border: 1px solid #ead98a;
  border-radius: 10px;
}

.favorite-count span {
  font-size: 12px;
}

.favorite-count strong {
  font-size: 18px;
}

.region-search {
  display: grid;
  grid-template-columns: auto minmax(180px, 420px) auto 1fr;
  align-items: center;
  gap: 9px;
  padding: 10px 12px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 12px;
}

.region-search label {
  font-size: 12px;
  font-weight: 700;
}

.region-search input {
  min-width: 0;
  padding: 8px 10px;
  color: var(--app-text);
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: 8px;
}

.region-search button {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 650;
  color: #ffffff;
  background: var(--app-blue);
  border: 1px solid var(--app-blue);
  border-radius: 8px;
  cursor: pointer;
}

.region-search span {
  font-size: 11px;
  color: #b44545;
}

.map-dashboard {
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 340px);
  gap: 14px;
}

.map-card {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.map-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--app-border);
}

.map-heading h2 {
  font-size: 17px;
  font-weight: 700;
}

.map-heading p {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--app-secondary);
}

.map-heading i {
  width: 10px;
  height: 10px;
  background: #facc15;
  border: 1px solid #a16207;
  border-radius: 3px;
}

.map-area {
  min-height: 0;
  flex: 1;
}

@media (max-width: 1050px) {
  .weather-map-page {
    height: auto;
  }

  .map-dashboard {
    grid-template-columns: 1fr;
  }

  .map-area {
    height: 520px;
  }
}

@media (max-width: 650px) {
  .weather-map-page {
    min-height: 0;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .region-search {
    grid-template-columns: 1fr auto;
  }

  .region-search label,
  .region-search span {
    grid-column: 1 / -1;
  }

  .map-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .map-area {
    height: 430px;
  }
}
</style>
