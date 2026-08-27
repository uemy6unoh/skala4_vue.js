<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="info-page">
    <p class="page-label">서비스 소개</p>
    <h1>도시별 날씨를 한눈에 확인합니다.</h1>
    <p>
      Vue Router를 이용해 날씨 대시보드와 도시 상세 화면을 주소별로 나눴습니다. 검색과 날씨 필터로
      도시를 찾고 상세 페이지에서 기온, 습도, 풍속, 미세먼지를 확인할 수 있습니다.
    </p>

    <RouterLink :to="{ name: 'weather-home' }">날씨 대시보드로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.info-page {
  width: min(100%, 720px);
  padding: 34px;
  margin: 24px auto;
  color: var(--app-text);
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.page-label,
.info-page h1,
.info-page p {
  margin: 0;
}

.page-label {
  font-size: 11px;
  font-weight: 750;
  color: #5d7ca9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.info-page h1 {
  margin-top: 5px;
  font-size: 28px;
  font-weight: 750;
}

.info-page > p:nth-of-type(2) {
  margin-top: 18px;
  line-height: 1.8;
  color: #617086;
}

.info-page a {
  display: inline-block;
  padding: 9px 14px;
  margin-top: 24px;
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
  background: var(--app-blue);
  border-radius: 999px;
  transition:
    background-color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.info-page a:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .info-page a:hover {
    background: var(--app-blue-hover);
  }
}
</style>
