<script setup>
import 'element-plus/dist/index.css'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ElAlert,
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElSkeleton,
  ElTag,
} from 'element-plus'
import UIUnitToggler from './components/UIUnitToggler.vue'
import { useConfigStore } from '@/stores/configStore'
import { fetchDetailedWeather, getWeatherSymbol } from './js/uiWeatherApi'
import { findMajorCity } from './js/uiMajorCities'
import { findRegionByCode } from './js/uiRegionData'
import { useUIFavoriteStore } from './js/uiFavoriteStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const favoriteStore = useUIFavoriteStore()

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

const fineDustType = computed(() => {
  if (fineDustGrade.value === '좋음') return 'success'
  if (fineDustGrade.value === '보통') return 'info'
  if (fineDustGrade.value === '나쁨') return 'warning'
  return 'danger'
})

const weatherNotice = computed(() => {
  if (weather.value?.fineDust > 80) {
    return {
      type: 'error',
      message: '미세먼지 농도가 높습니다. 외출할 때 마스크를 챙기세요.',
    }
  }

  if (weather.value?.wind >= 8) {
    return {
      type: 'warning',
      message: '바람이 강하게 불고 있습니다. 야외 활동에 주의하세요.',
    }
  }

  return {
    type: 'success',
    message: '현재는 비교적 외출하기 좋은 상태입니다.',
  }
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

const goToMap = () => {
  router.push({ name: 'ui-home' })
}

onMounted(loadWeatherDetail)
</script>

<template>
  <ElCard shadow="never" class="detail-page">
    <ElSkeleton v-if="isLoading" :rows="6" animated />

    <template v-else-if="weather">
      <header class="detail-heading">
        <div>
          <h1>{{ weather.name }} 날씨</h1>
          <p>{{ weather.fullName }}</p>
        </div>

        <div class="detail-actions">
          <UIUnitToggler />
          <ElButton
            v-if="selectedLocation.type === 'region'"
            type="warning"
            plain
            @click="toggleFavorite"
          >
            {{ isFavorite ? '관심 지역 해제' : '관심 지역 추가' }}
          </ElButton>
        </div>
      </header>

      <div class="current-weather">
        <span class="weather-symbol" aria-hidden="true">{{
          getWeatherSymbol(weather.status)
        }}</span>
        <strong>{{ displayTemp(weather.temp) }}{{ configStore.unitSymbol }}</strong>
        <ElTag effect="plain">{{ weather.status }}</ElTag>
      </div>

      <ElDescriptions :column="2" border class="weather-details">
        <ElDescriptionsItem label="오늘 기온">
          {{ displayTemp(weather.minTemp) }}{{ configStore.unitSymbol }} /
          {{ displayTemp(weather.maxTemp) }}{{ configStore.unitSymbol }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="습도">{{ weather.humidity }}%</ElDescriptionsItem>
        <ElDescriptionsItem label="풍속">{{ weather.wind }}m/s</ElDescriptionsItem>
        <ElDescriptionsItem label="미세먼지">
          {{ weather.fineDust }}㎍/㎥
          <ElTag :type="fineDustType" size="small" class="dust-tag">
            {{ fineDustGrade }}
          </ElTag>
        </ElDescriptionsItem>
      </ElDescriptions>

      <ElAlert
        :title="weatherNotice.message"
        :type="weatherNotice.type"
        :closable="false"
        show-icon
      />
    </template>

    <ElAlert
      v-else
      :title="errorMessage"
      description="지역과 API 연결 상태를 확인해 주세요."
      type="error"
      :closable="false"
      show-icon
    />

    <ElButton class="back-button" @click="goToMap">전국 날씨 지도로 돌아가기</ElButton>
  </ElCard>
</template>

<style scoped>
.detail-page {
  width: min(100%, 760px);
  margin: 24px auto;
}

.detail-page :deep(.el-card__body) {
  padding: 30px;
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

.detail-heading h1,
.detail-heading p {
  margin: 0;
}

.detail-heading h1 {
  font-size: 30px;
  font-weight: 750;
}

.detail-heading p {
  margin-top: 6px;
  font-size: 13px;
  color: var(--app-secondary);
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 28px 0;
  margin: 22px 0;
  border-top: 1px solid var(--app-border);
  border-bottom: 1px solid var(--app-border);
}

.weather-symbol {
  font-size: 44px;
  color: var(--weather-sun);
}

.current-weather strong {
  font-size: 48px;
  letter-spacing: -0.05em;
}

.weather-details {
  margin-bottom: 18px;
}

.dust-tag {
  margin-left: 8px;
}

.back-button {
  margin-top: 22px;
}

@media (max-width: 650px) {
  .detail-page {
    margin: 12px auto;
  }

  .detail-page :deep(.el-card__body) {
    padding: 20px;
  }

  .detail-heading {
    flex-direction: column;
  }

  .detail-actions {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
