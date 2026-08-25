<script setup>
import { ref } from 'vue'
const count = ref(0)
const count1 = ref(0)

// 메서드 핸들러 함수 정의
const showAlert = () => {
  alert('함수가 성공적으로 호출되었습니다!')
}

const numPlus = () => {
  count1.value++ // 💡 ref로 선언한 변수는 .value를 붙여야 함, 박스 쳐져있음.
}
</script>


<template>
  <div class="practice-section">
    <h2>v-on 이벤트 핸들링 기초</h2>
    <h3>1) 인라인 연산 처리</h3>
    <p>현재 카운트: {{ count }}</p>
    <button @click="count++">1씩 증가</button> <!-- templete 들어올 때, vue가 ref를 풀어서 숫자됨 -->
    <br />
    <p>현재 카운트1: {{ count1 }}</p>
    <button @click="numPlus">1씩 증가</button>
    <br />
    <h3>2) 스크립트 함수 호출</h3>
    <button @click="showAlert">알림창 띄우기</button>
  </div>
</template>
