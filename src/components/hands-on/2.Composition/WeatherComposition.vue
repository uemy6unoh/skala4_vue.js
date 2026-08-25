<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

// 화면에 표시할 도시별 날씨 데이터
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 62, wind: 2.8, fineDust: 92 },
  { id: 'city_02', name: '안양', temp: 27, status: '맑음', humidity: 58, wind: 3.1, fineDust: 42 },
  { id: 'city_03', name: '천안', temp: 23, status: '흐림', humidity: 76, wind: 4.5, fineDust: 68 },
  { id: 'city_04', name: '거제', temp: 25, status: '비', humidity: 88, wind: 9.3, fineDust: 22 },
  { id: 'city_05', name: '경주', temp: 29, status: '맑음', humidity: 81, wind: 6.2, fineDust: 28 },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 추가한 날씨 상태 필터
const weatherOptions = ['전체', '맑음', '흐림', '비']
const selectedWeather = ref('전체')

// 검색어와 날씨 상태를 모두 만족하는 도시만 계산
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  return weatherList.value.filter((item) => {
    const matchesQuery = !query || item.name.includes(query)
    const matchesWeather = selectedWeather.value === '전체' || item.status === selectedWeather.value

    return matchesQuery && matchesWeather
  })
})

// 현재 검색 결과를 짧은 문장으로 표시
const searchResultText = computed(() => {
  if (!searchQuery.value.trim() && selectedWeather.value === '전체') {
    return `전체 ${weatherList.value.length}개 도시`
  }

  if (filteredWeatherList.value.length === 0) {
    return '조건에 맞는 도시가 없습니다.'
  }

  return `${filteredWeatherList.value.length}개 도시를 찾았습니다.`
})

// 카드 선택으로 상태바 문구가 바뀌는지 확인
watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[watch] 선택 문구 변경: ${oldInfo} / ${newInfo}`)
})

// 추가한 날씨 필터의 변경도 watch로 확인
watch(selectedWeather, (newWeather, oldWeather) => {
  console.log(`[watch] 날씨 필터 변경: ${oldWeather} / ${newWeather}`)
})

// 함수 안에서 사용한 검색어를 Vue가 자동으로 추적
watchEffect(() => {
  const query = searchQuery.value || '(비어 있음)'
  console.log(`[watchEffect] 현재 검색어: ${query}`)
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <p class="step-label">Hands-on 2</p>
      <h2>날씨 Composition</h2>
      <p>검색어와 날씨 상태에 맞는 도시를 실시간으로 계산합니다.</p>
    </header>

    <section class="search-box">
      <label for="city-search">도시 검색</label>
      <input
        id="city-search"
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름 입력"
      />

      <div class="search-meta">
        <span>검색어: {{ searchQuery || '없음' }}</span>
        <strong>{{ searchResultText }}</strong>
      </div>
    </section>

    <section class="list-box">
      <div class="list-heading">
        <div>
          <p class="section-label">지역별 날씨 현황</p>
          <h3>날씨 상태로 한 번 더 보기</h3>
        </div>

        <div class="weather-filter" aria-label="날씨 상태 필터">
          <button
            v-for="option in weatherOptions"
            :key="option"
            type="button"
            :class="{ active: selectedWeather === option }"
            @click="selectedWeather = option"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div v-if="filteredWeatherList.length" class="weather-list">
        <article
          v-for="item in filteredWeatherList"
          :key="item.id"
          class="weather-card"
          :class="{
            'is-sunny': item.status === '맑음',
            'is-cloudy': item.status === '흐림',
            'is-rainy': item.status === '비',
          }"
          @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
        >
          <div class="card-header">
            <div class="city-heading">
              <span v-if="item.status === '맑음'" class="weather-icon" aria-label="맑음">☀️</span>
              <span v-else-if="item.status === '흐림'" class="weather-icon" aria-label="흐림">☁️</span>
              <span v-else-if="item.status === '비'" class="weather-icon" aria-label="비">🌧️</span>
              <span v-else class="weather-icon" aria-label="기타 날씨">🌤️</span>

              <div>
                <h4>{{ item.name }}</h4>
                <p class="weather-status">오늘은 {{ item.status }}</p>
              </div>
            </div>

            <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">상세보기</button>
          </div>

          <div class="weather-metrics">
            <div class="metric-item">
              <span>현재 기온</span>
              <strong>{{ item.temp }}°C</strong>
            </div>
            <div class="metric-item">
              <span>습도</span>
              <strong>{{ item.humidity }}%</strong>
            </div>
            <div class="metric-item">
              <span>풍속</span>
              <strong>{{ item.wind }}m/s</strong>
            </div>
            <div class="metric-item">
              <span>미세먼지</span>
              <strong>{{ item.fineDust }}㎍/㎥</strong>
            </div>
          </div>

          <p v-if="item.fineDust > 80" class="weather-tip warning">
            미세먼지가 많아요. 외출할 때 마스크를 챙기세요.
          </p>
          <p v-else-if="item.wind >= 8" class="weather-tip caution">
            바람이 강하게 불어요. 야외 활동에 주의하세요.
          </p>
          <p v-else-if="item.humidity >= 80" class="weather-tip caution">
            습도가 높아요. 통풍과 실내 환기에 신경 써주세요.
          </p>
          <p v-else class="weather-tip safe">현재는 비교적 외출하기 좋은 날씨예요.</p>
        </article>
      </div>

      <div v-else class="empty-result">
        <strong>검색 결과가 없습니다.</strong>
        <p>도시 이름이나 날씨 조건을 다시 확인해 주세요.</p>
      </div>
    </section>

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
  box-sizing: border-box;
  color: #26364d;
  background: #f4f7fb;
  border: 1px solid #e2e9f2;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(34, 54, 84, 0.1);
}

.dashboard-header {
  margin-bottom: 18px;
}

.dashboard-header h2,
.dashboard-header p {
  margin: 0;
}

.dashboard-header h2 {
  margin-top: 3px;
  font-size: 26px;
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

.search-box,
.list-box {
  padding: 18px;
  margin-bottom: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e1e8f1;
  border-radius: 18px;
}

.search-box label {
  display: block;
  margin-bottom: 9px;
  font-size: 14px;
  font-weight: 750;
}

.search-box input {
  width: 100%;
  padding: 11px 13px;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #f9fbfd;
  border: 1px solid #d3deeb;
  border-radius: 10px;
  outline: none;
}

.search-box input:focus {
  border-color: #6d8fc7;
  box-shadow: 0 0 0 3px rgba(109, 143, 199, 0.14);
}

.search-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  font-size: 12px;
  color: #748398;
}

.search-meta strong {
  color: #4f6f9c;
}

.list-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.list-heading h3,
.list-heading p {
  margin: 0;
}

.list-heading h3 {
  margin-top: 3px;
  font-size: 17px;
}

.weather-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.weather-filter button {
  padding: 6px 10px;
  font-size: 12px;
  color: #65758b;
  background: #f6f8fb;
  border: 1px solid #dce4ee;
  border-radius: 999px;
  cursor: pointer;
}

.weather-filter button.active {
  color: #ffffff;
  background: #5f7fae;
  border-color: #5f7fae;
}

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

  .list-heading,
  .search-meta {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-filter {
    justify-content: flex-start;
  }

  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
