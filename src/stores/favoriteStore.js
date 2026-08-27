import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteCityIds = ref([])

  const favoriteCount = computed(() => favoriteCityIds.value.length)

  const isFavorite = (cityId) => {
    return favoriteCityIds.value.includes(cityId)
  }

  const toggleFavorite = (cityId) => {
    if (isFavorite(cityId)) {
      favoriteCityIds.value = favoriteCityIds.value.filter((id) => id !== cityId)
      return
    }

    favoriteCityIds.value.push(cityId)
  }

  const clearFavorites = () => {
    favoriteCityIds.value = []
  }

  return { favoriteCityIds, favoriteCount, isFavorite, toggleFavorite, clearFavorites }
})
