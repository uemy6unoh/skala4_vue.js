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
  transition:
    color var(--press-duration) ease,
    background-color var(--press-duration) ease,
    border-color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.weather-filter button:active {
  transform: scale(0.97);
}

.weather-filter button.active {
  color: #ffffff;
  background: var(--app-blue);
  border-color: var(--app-blue);
}

@media (hover: hover) and (pointer: fine) {
  .weather-filter button:hover {
    color: var(--app-blue);
    border-color: rgba(22, 119, 255, 0.35);
  }

  .weather-filter button.active:hover {
    color: #ffffff;
    background: var(--app-blue-hover);
    border-color: var(--app-blue-hover);
  }
}

@media (max-width: 650px) {
  .weather-filter {
    justify-content: flex-start;
  }
}
</style>
