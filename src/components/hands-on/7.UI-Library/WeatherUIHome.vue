<script setup>
import 'element-plus/dist/index.css'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElAlert, ElBadge, ElButton, ElCard, ElInput, ElTag } from 'element-plus'
import UIKoreaRegionMap from './components/UIKoreaRegionMap.vue'
import UIMajorCityList from './components/UIMajorCityList.vue'
import UIRegionWeatherSummary from './components/UIRegionWeatherSummary.vue'
import UIUnitToggler from './components/UIUnitToggler.vue'
import { fetchBasicWeather } from './js/uiWeatherApi'
import { majorCities } from './js/uiMajorCities'
import { searchRegions } from './js/uiRegionData'
import { useUIFavoriteStore } from './js/uiFavoriteStore'

const router = useRouter()
const favoriteStore = useUIFavoriteStore()

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
    name: 'ui-detail',
    params: { locationId: selectedRegion.value.code },
  })
}

const openCityDetail = (city) => {
  router.push({
    name: 'ui-detail',
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
        <UIUnitToggler />
        <ElBadge :value="favoriteStore.favoriteCount" type="warning">
          <ElButton plain>관심 지역</ElButton>
        </ElBadge>
      </div>
    </header>

    <ElCard shadow="never" class="search-card">
      <div class="region-search">
        <label for="ui-region-keyword">지역 검색</label>
        <ElInput
          id="ui-region-keyword"
          v-model="searchKeyword"
          clearable
          placeholder="예: 수원시, 서울 종로구"
          @keyup.enter="searchRegion"
        />
        <ElButton type="primary" @click="searchRegion">지도에서 찾기</ElButton>
        <ElAlert
          v-if="searchMessage"
          :title="searchMessage"
          type="warning"
          :closable="false"
          show-icon
        />
      </div>
    </ElCard>

    <div class="map-dashboard">
      <ElCard shadow="never" class="map-card">
        <template #header>
          <div class="map-heading">
            <h2>대한민국 시군구</h2>
            <ElTag type="warning" effect="light">관심 지역: 노란색</ElTag>
          </div>
        </template>

        <div class="map-area">
          <UIKoreaRegionMap
            :favorite-region-codes="favoriteStore.favoriteRegionCodes"
            :selected-region-code="selectedRegion?.code"
            :focus-region-code="focusRegionCode"
            @select-region="selectRegion"
          />
        </div>

        <UIRegionWeatherSummary
          :region="selectedRegion"
          :weather="selectedWeather"
          :is-loading="isRegionLoading"
          :error-message="regionErrorMessage"
          :is-favorite="isSelectedFavorite"
          @toggle-favorite="toggleFavorite"
          @open-detail="openRegionDetail"
        />
      </ElCard>

      <UIMajorCityList
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
.map-heading h2 {
  margin: 0;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.page-header p {
  margin-top: 5px;
  font-size: 13px;
  color: var(--app-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-card :deep(.el-card__body) {
  padding: 10px 12px;
}

.region-search {
  display: grid;
  grid-template-columns: auto minmax(180px, 420px) auto 1fr;
  align-items: center;
  gap: 9px;
}

.region-search label {
  font-size: 12px;
  font-weight: 700;
}

.region-search :deep(.el-alert) {
  padding: 6px 10px;
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
}

.map-card :deep(.el-card__header) {
  padding: 13px 16px;
}

.map-card :deep(.el-card__body) {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  padding: 0;
}

.map-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.map-heading h2 {
  font-size: 17px;
  font-weight: 700;
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
  .region-search :deep(.el-alert) {
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
