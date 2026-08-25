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
  color: #26364d;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e1e8f1;
  border-radius: 22px;
  box-shadow: 0 18px 45px rgba(34, 54, 84, 0.1);
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
  background: #536f9c;
  border-radius: 9px;
}
</style>
