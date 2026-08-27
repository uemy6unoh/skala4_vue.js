<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onBeforeUnmount, onMounted, watch } from 'vue'
import provinceBoundaryData from '../data/axiosKoreaSido2025.json'
import { koreaRegionData, regionList } from '../js/axiosRegionData'

const props = defineProps({
  favoriteRegionCodes: {
    type: Array,
    default: () => [],
  },
  selectedRegionCode: {
    type: String,
    default: '',
  },
  focusRegionCode: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select-region'])

let map
let regionLayer
const regionLayers = new Map()

const getRegion = (feature) => {
  return regionList.find((region) => region.code === feature.properties.sggcd)
}

const getRegionStyle = (feature) => {
  const regionCode = feature.properties.sggcd
  const isFavorite = props.favoriteRegionCodes.includes(regionCode)
  const isSelected = props.selectedRegionCode === regionCode

  return {
    color: isSelected ? '#1677ff' : isFavorite ? '#a16207' : '#82979f',
    weight: isSelected ? 3 : 0.8,
    fillColor: isFavorite ? '#facc15' : '#eef4ef',
    fillOpacity: isFavorite ? 0.7 : 0.48,
  }
}

const updateRegionStyles = () => {
  regionLayer?.eachLayer((layer) => {
    layer.setStyle(getRegionStyle(layer.feature))
  })
}

const focusSelectedRegion = () => {
  if (!map || !props.focusRegionCode) return

  const layer = regionLayers.get(props.focusRegionCode)
  if (layer) {
    map.fitBounds(layer.getBounds(), { maxZoom: 8, padding: [24, 24] })
  }
}

onMounted(() => {
  map = L.map('axios-korea-map', {
    maxZoom: 10,
    zoomControl: true,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    maxBoundsViscosity: 1,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; OpenStreetMap | 경계: SGIS · <a href="https://github.com/vuski/admdongkor">admdongkor</a>',
  }).addTo(map)

  regionLayer = L.geoJSON(koreaRegionData, {
    style: getRegionStyle,
    onEachFeature(feature, layer) {
      const region = getRegion(feature)
      if (!region) return

      regionLayers.set(region.code, layer)
      layer.bindTooltip(region.fullName, {
        sticky: true,
        className: 'region-tooltip',
      })

      layer.on({
        mouseover() {
          layer.setStyle({
            weight: 2,
            color: '#25784b',
            fillColor: '#a7f3b4',
            fillOpacity: 0.78,
          })
        },
        mouseout() {
          layer.setStyle(getRegionStyle(feature))
        },
        click() {
          const center = layer.getBounds().getCenter()
          emit('select-region', { ...region, lat: center.lat, lon: center.lng })
        },
      })
    },
  }).addTo(map)

  L.geoJSON(provinceBoundaryData, {
    interactive: false,
    style: {
      color: '#39566b',
      weight: 2.2,
      opacity: 0.9,
      fillOpacity: 0,
    },
  }).addTo(map)

  const koreaBounds = regionLayer.getBounds()

  map.fitBounds(koreaBounds, { padding: [20, 20] })
  map.setMaxBounds(koreaBounds.pad(0.05))
  map.setMinZoom(map.getZoom() + 0.5)
  map.setView(koreaBounds.getCenter(), map.getMinZoom())
})

watch(
  () => [props.favoriteRegionCodes, props.selectedRegionCode],
  () => {
    updateRegionStyles()
  },
  { deep: true },
)

watch(() => props.focusRegionCode, focusSelectedRegion)

onBeforeUnmount(() => {
  map?.remove()
})
</script>

<template>
  <div id="axios-korea-map" class="korea-map" aria-label="대한민국 시군구 날씨 지도"></div>
</template>

<style scoped>
.korea-map {
  width: 100%;
  height: 100%;
  min-height: 340px;
  background: #eef3f8;
}

:global(.region-tooltip) {
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #0b1f33;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 5px 18px rgba(11, 31, 51, 0.16);
}

:global(.leaflet-container .leaflet-interactive:focus) {
  outline: none;
}
</style>
