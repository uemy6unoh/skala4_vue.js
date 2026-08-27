<script setup>
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
  resultText: {
    type: String,
    required: true,
  },
})

defineEmits(['update-query'])
</script>

<template>
  <div class="search-bar">
    <label for="component-city-search">도시 검색</label>
    <input
      id="component-city-search"
      name="city-search"
      type="text"
      :value="currentQuery"
      placeholder="도시 이름을 입력하세요…"
      autocomplete="off"
      @input="$emit('update-query', $event.target.value)"
    />

    <div class="search-meta" aria-live="polite">
      <span>검색어: {{ currentQuery || '없음' }}</span>
      <strong>{{ resultText }}</strong>
    </div>
  </div>
</template>

<style scoped>
.search-bar label {
  display: block;
  margin-bottom: 9px;
  font-size: 14px;
  font-weight: 750;
}

.search-bar input {
  width: 100%;
  padding: 11px 13px;
  font-size: 14px;
  background: #f9fbfd;
  border: 1px solid #d3deeb;
  border-radius: 10px;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.search-bar input:focus {
  background: #ffffff;
  border-color: var(--app-blue);
  box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.14);
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

@media (max-width: 650px) {
  .search-meta {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
