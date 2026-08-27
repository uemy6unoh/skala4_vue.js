<script setup>
import { ref } from 'vue'

// v-for로 반복 출력할 도시별 날씨 데이터
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 62, wind: 2.8, fineDust: 92 },
  { id: 'city_02', name: '안양', temp: 27, status: '맑음', humidity: 58, wind: 3.1, fineDust: 42 },
  { id: 'city_03', name: '천안', temp: 23, status: '흐림', humidity: 76, wind: 4.5, fineDust: 68 },
  { id: 'city_04', name: '거제', temp: 25, status: '비', humidity: 88, wind: 9.3, fineDust: 22 },
  { id: 'city_05', name: '경주', temp: 29, status: '맑음', humidity: 81, wind: 6.2, fineDust: 28 },
])

// 검색어와 카드 선택 결과를 화면에 바로 반영하기 위해 ref로 선언
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 상세보기 버튼에서 전달받은 도시명과 날씨를 알림창에 표시
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <h1>Weather Mockup</h1>
      <p>Vue 기본 문법으로 도시별 날씨 정보를 구성합니다.</p>
    </header>

    <section class="search-box">
      <label for="mockup-city-search">도시 검색</label>
      <!-- 한글 조합 중인 값도 바로 보여주기 위해 v-model 대신 :value와 @input 사용 -->
      <input
        id="mockup-city-search"
        name="city-search"
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="도시 이름을 입력하세요…"
        autocomplete="off"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        :class="{
          'is-sunny': item.status === '맑음',
          'is-cloudy': item.status === '흐림',
          'is-rainy': item.status === '비',
        }"
        tabindex="0"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
        @keydown.enter="selectedCityInfo = `${item.name}이 선택되었습니다.`"
        @keydown.space.prevent="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <div class="card-header">
          <div class="city-heading">
            <span v-if="item.status === '맑음'" class="weather-icon" aria-label="맑음">☀</span>
            <span v-else-if="item.status === '흐림'" class="weather-icon" aria-label="흐림">☁</span>
            <span v-else-if="item.status === '비'" class="weather-icon" aria-label="비">☂</span>
            <span v-else class="weather-icon" aria-label="기타 날씨">○</span>

            <div>
              <h4>{{ item.name }}</h4>
              <p class="weather-status">오늘은 {{ item.status }}</p>
            </div>
          </div>

          <!-- 버튼 클릭이 부모 카드의 @click까지 올라가지 않도록 .stop 사용 -->
          <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
            상세보기
          </button>
        </div>

        <div class="weather-metrics">
          <div class="metric-item">
            <span class="metric-label">현재 기온</span>
            <strong class="metric-value">{{ item.temp }}°C</strong>
            <span v-if="item.temp >= 25" class="comfort-tag warm">따뜻함</span>
            <span v-else class="comfort-tag cool">선선함</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">습도</span>
            <strong class="metric-value">{{ item.humidity }}%</strong>
          </div>
          <div class="metric-item">
            <span class="metric-label">풍속</span>
            <strong class="metric-value">{{ item.wind }}m/s</strong>
          </div>
          <div class="metric-item">
            <span class="metric-label">미세먼지</span>
            <strong class="metric-value">{{ item.fineDust }}㎍/㎥</strong>
            <span v-if="item.fineDust <= 30" class="dust-grade good">좋음</span>
            <span v-else-if="item.fineDust <= 80" class="dust-grade normal">보통</span>
            <span v-else class="dust-grade bad">나쁨</span>
          </div>
        </div>

        <!-- 중요한 안내 하나만 보이도록 미세먼지, 강풍, 습도 순서로 조건 배치 -->
        <p v-if="item.status === '맑음' && item.fineDust > 80" class="weather-tip warning">
          날씨는 맑지만 미세먼지가 많아요. 마스크를 착용하세요.
        </p>
        <p v-else-if="item.fineDust > 80" class="weather-tip warning">
          미세먼지가 많아요. 외출할 때 마스크를 챙기세요.
        </p>
        <p v-else-if="item.wind >= 8" class="weather-tip caution">
          바람이 강하게 불어요. 야외 활동에 주의하세요.
        </p>
        <p v-else-if="item.humidity >= 80" class="weather-tip caution">
          습도가 높아요. 통풍과 실내 환기에 신경 써주세요.
        </p>
        <p v-else class="weather-tip safe">현재는 비교적 외출하기 좋은 날씨예요.</p>
      </div>
    </section>

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
  box-sizing: border-box;
  color: var(--app-text);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.dashboard-header {
  margin-bottom: 26px;
}

.dashboard-header h1,
.dashboard-header p {
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

.search-box,
.list-box {
  padding: 18px;
  margin-bottom: 16px;
  background-color: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
}

.search-box label,
.list-box h3 {
  display: block;
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: #31445f;
}

.search-box input {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #f9fbfd;
  border: 1px solid #d7e0ec;
  border-radius: 10px;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.search-box input:focus {
  background-color: #ffffff;
  border-color: var(--app-blue);
  box-shadow: 0 0 0 3px rgba(82, 111, 143, 0.14);
}

.search-box p {
  margin: 10px 0 0;
  font-size: 12px;
  color: #718096;
}

.weather-card {
  --weather-accent: var(--weather-cloud);
  padding: 16px;
  margin-top: 14px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid var(--app-border);
  border-left: 5px solid var(--weather-accent);
  border-radius: var(--app-radius-lg);
  cursor: pointer;
  transition:
    transform 180ms var(--ease-out),
    box-shadow 180ms ease;
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

.weather-card:active {
  box-shadow: 0 7px 18px rgba(40, 58, 84, 0.12);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.city-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  place-items: center;
  font-size: 29px;
  color: var(--weather-accent);
  background-color: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: 10px;
}

.weather-card h4 {
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1f2f46;
}

.weather-status {
  margin: 3px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--weather-accent);
}

.weather-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 64px;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(222, 229, 239, 0.86);
  border-radius: 12px;
}

.metric-label {
  font-size: 11px;
  color: #8290a3;
}

.metric-value {
  font-size: 14px;
  font-weight: 750;
  color: #2d3e55;
  font-variant-numeric: tabular-nums;
}

.comfort-tag,
.dust-grade {
  width: fit-content;
  padding: 2px 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
}

.comfort-tag.warm {
  color: #7d633d;
  background-color: #f2ede4;
}

.comfort-tag.cool {
  color: #526f8f;
  background-color: #ebf0f4;
}

.dust-grade {
  margin-top: 1px;
}

.dust-grade.good {
  color: #4f6d5c;
  background-color: #edf2ef;
}

.dust-grade.normal {
  color: #786141;
  background-color: #f4f0e8;
}

.dust-grade.bad {
  color: #814848;
  background-color: #f4ecec;
}

.weather-tip {
  padding: 8px 10px;
  margin: 12px 0 0;
  font-size: 11px;
  font-weight: 550;
  line-height: 1.45;
  border-radius: 8px;
}

.weather-tip.warning {
  color: #a92f2f;
  background-color: #fff0f0;
  border-left: 4px solid #df4747;
}

.weather-tip.caution {
  color: #9a5b00;
  background-color: #fff6df;
  border-left: 4px solid #e59a18;
}

.weather-tip.safe {
  color: #1d7042;
  background-color: #eaf8f0;
  border-left: 4px solid #31a865;
}

.btn-detail {
  flex: 0 0 auto;
  padding: 6px 10px;
  color: #5f7086;
  background-color: rgba(255, 255, 255, 0.72);
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
    background-color: var(--app-blue);
    border-color: var(--app-blue);
  }
}

.status-bar {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 650;
  color: #0b5cc4;
  text-align: center;
  background-color: #e9f2ff;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .dashboard-wrapper {
    margin: 12px auto;
    padding: 14px;
  }

  .weather-card {
    padding: 14px;
  }

  .card-header {
    align-items: center;
  }

  .weather-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .btn-detail {
    padding: 6px 9px;
  }
}
</style>
