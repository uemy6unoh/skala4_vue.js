import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useMapFavoriteStore = defineStore('axios-map-favorite', () => {
  const favoriteRegionCodes = ref([])

  const favoriteCount = computed(() => favoriteRegionCodes.value.length)

  const isFavorite = (regionCode) => {
    return favoriteRegionCodes.value.includes(regionCode)
  }

  const toggleFavorite = (regionCode) => {
    if (isFavorite(regionCode)) {
      favoriteRegionCodes.value = favoriteRegionCodes.value.filter((code) => code !== regionCode)
      return
    }

    favoriteRegionCodes.value.push(regionCode)
  }

  return { favoriteRegionCodes, favoriteCount, isFavorite, toggleFavorite }
})
