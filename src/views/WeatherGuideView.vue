<script setup>
import { RouterLink } from 'vue-router'

const guideList = [
  { title: '미세먼지', condition: '80㎍/㎥ 초과', message: '외출할 때 마스크를 챙깁니다.' },
  { title: '강한 바람', condition: '8m/s 이상', message: '야외 활동과 시설물에 주의합니다.' },
  { title: '높은 습도', condition: '80% 이상', message: '통풍과 실내 환기를 확인합니다.' },
]
</script>

<template>
  <section class="guide-page">
    <p class="page-label">추가 화면</p>
    <h1>생활 안내 표시 기준</h1>
    <p class="intro">날씨 카드에 표시되는 생활 안내 문구의 기준을 정리했습니다.</p>

    <div class="guide-list">
      <article v-for="guide in guideList" :key="guide.title">
        <span>{{ guide.title }}</span>
        <strong>{{ guide.condition }}</strong>
        <p>{{ guide.message }}</p>
      </article>
    </div>

    <RouterLink :to="{ name: 'weather-home' }">날씨 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.guide-page {
  width: min(100%, 760px);
  padding: 34px;
  margin: 24px auto;
  color: #26364d;
  background: #ffffff;
  border: 1px solid #e1e8f1;
  border-radius: 22px;
  box-shadow: 0 18px 45px rgba(34, 54, 84, 0.1);
}

.page-label,
.guide-page h1,
.intro,
.guide-list p {
  margin: 0;
}

.page-label {
  font-size: 11px;
  font-weight: 750;
  color: #5d7ca9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.guide-page h1 {
  margin-top: 5px;
  font-size: 28px;
  font-weight: 750;
}

.intro {
  margin-top: 8px;
  color: #6d7b8e;
}

.guide-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 24px;
}

.guide-list article {
  padding: 18px;
  background: #f5f8fb;
  border: 1px solid #e2e9f2;
  border-radius: 14px;
}

.guide-list span,
.guide-list strong {
  display: block;
}

.guide-list span {
  font-size: 12px;
  color: #6d7c90;
}

.guide-list strong {
  margin-top: 4px;
  font-size: 17px;
}

.guide-list p {
  margin-top: 10px;
  font-size: 12px;
  color: #66768a;
}

.guide-page a {
  display: inline-block;
  margin-top: 24px;
  font-size: 13px;
  font-weight: 650;
  color: #4d6e9a;
  text-decoration: none;
}

@media (max-width: 700px) {
  .guide-list {
    grid-template-columns: 1fr;
  }
}
</style>
