<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <strong>404</strong>
    <h1>페이지를 찾을 수 없습니다.</h1>
    <p>주소가 올바른지 다시 확인해 주세요.</p>
    <RouterLink :to="{ name: 'weather-home' }">날씨 대시보드로 이동</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  width: min(100%, 560px);
  padding: 54px 30px;
  margin: 80px auto;
  color: var(--app-text);
  text-align: center;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  box-shadow: var(--app-shadow);
}

.not-found strong {
  font-size: 54px;
  color: #9eb1c8;
}

.not-found h1 {
  margin: 8px 0 0;
  font-size: 25px;
  font-weight: 750;
}

.not-found p {
  margin: 8px 0 0;
  color: #748398;
}

.not-found a {
  display: inline-block;
  padding: 9px 14px;
  margin-top: 24px;
  color: #ffffff;
  text-decoration: none;
  background: var(--app-blue);
  border-radius: 999px;
  transition:
    background-color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.not-found a:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .not-found a:hover {
    background: var(--app-blue-hover);
  }
}
</style>
