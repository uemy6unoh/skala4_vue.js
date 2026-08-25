<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  selectedWeather: {
    type: String,
    required: true,
  },
})

defineEmits(['select-weather'])
</script>

<template>
  <div class="weather-filter" aria-label="날씨 상태 필터">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :class="{ active: selectedWeather === option }"
      @click="$emit('select-weather', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped>
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

@media (max-width: 650px) {
  .weather-filter {
    justify-content: flex-start;
  }
}
</style>
