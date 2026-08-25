<script setup>
import { ref } from 'vue'

// 4일차 API 연동을 대비한 가상의 백엔드 데이터 배열 (v-for 및 :key 실습용)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 62, wind: 2.8, fineDust: 92 },
  { id: 'city_02', name: '안양', temp: 27, status: '맑음', humidity: 58, wind: 3.1, fineDust: 42 },
  { id: 'city_03', name: '천안', temp: 23, status: '흐림', humidity: 76, wind: 4.5, fineDust: 68 },
  { id: 'city_04', name: '거제', temp: 25, status: '비', humidity: 88, wind: 9.3, fineDust: 22 },
  { id: 'city_05', name: '경주', temp: 29, status: '맑음', humidity: 81, wind: 6.2, fineDust: 28 },
])

// 검색어 및 알림창 제어용 데이터 (v-model 대용 한글 처리 및 이벤트 실습용)
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 알림 대행 함수 (window 객체 격리 우회)
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <!-- input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" / -->
      <input
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름 입력"
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

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(100%, 760px);
  margin: 24px auto;
  padding: 24px;
  box-sizing: border-box;
  color: #25344a;
  background: #f4f7fb;
  border: 1px solid #e7ecf3;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(34, 54, 84, 0.1);
}

.search-box,
.list-box {
  padding: 18px;
  margin-bottom: 16px;
  background-color: rgba(255, 255, 255, 0.88);
  border: 1px solid #e3e9f2;
  border-radius: 18px;
}

.search-box h3,
.list-box h3 {
  margin: 0 0 12px;
  font-size: 16px;
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
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-box input:focus {
  border-color: #6d8fc7;
  box-shadow: 0 0 0 3px rgba(109, 143, 199, 0.14);
}

.search-box p {
  margin: 10px 0 0;
  font-size: 12px;
  color: #718096;
}

.weather-card {
  --weather-accent: #8ea2bc;
  --weather-tint: #f6f8fb;
  padding: 16px;
  margin-top: 14px;
  box-sizing: border-box;
  background: linear-gradient(145deg, var(--weather-tint) 0%, #ffffff 42%);
  border: 1px solid #e3e8ef;
  border-top: 4px solid var(--weather-accent);
  border-radius: 18px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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

.weather-card:hover {
  box-shadow: 0 12px 26px rgba(40, 58, 84, 0.13);
  transform: translateY(-3px);
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
  font-size: 31px;
  background-color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 6px 14px rgba(47, 65, 90, 0.08);
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
  color: #a05a16;
  background-color: #fff2d5;
}

.comfort-tag.cool {
  color: #2f6f9f;
  background-color: #e5f3ff;
}

.dust-grade {
  margin-top: 1px;
}

.dust-grade.good {
  color: #166534;
  background-color: #dcfce7;
}

.dust-grade.normal {
  color: #854d0e;
  background-color: #fef9c3;
}

.dust-grade.bad {
  color: #991b1b;
  background-color: #fee2e2;
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
  color: #991b1b;
  background-color: #fff1f2;
  border-left: 4px solid #ef4444;
}

.weather-tip.caution {
  color: #92400e;
  background-color: #fffbeb;
  border-left: 4px solid #f59e0b;
}

.weather-tip.safe {
  color: #166534;
  background-color: #f0fdf4;
  border-left: 4px solid #22c55e;
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
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.btn-detail:hover {
  color: #ffffff;
  background-color: #536f9c;
  border-color: #536f9c;
}

.status-bar {
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 650;
  color: #49637f;
  text-align: center;
  background-color: #eaf0f7;
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
