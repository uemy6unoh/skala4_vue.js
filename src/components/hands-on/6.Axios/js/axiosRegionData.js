import koreaRegionData from '../data/axiosKoreaSgg2025.json'

const collectPoints = (coordinates, points = []) => {
  if (typeof coordinates[0] === 'number') {
    points.push(coordinates)
    return points
  }

  coordinates.forEach((coordinate) => collectPoints(coordinate, points))
  return points
}

const getFeatureCenter = (feature) => {
  const points = collectPoints(feature.geometry.coordinates)
  const longitudes = points.map((point) => point[0])
  const latitudes = points.map((point) => point[1])

  return {
    lat: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
    lon: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
  }
}

export const regionList = koreaRegionData.features.map((feature) => {
  const code = feature.properties.sggcd
  const province = feature.properties.sidonm
  const name = feature.properties.sggnm

  return {
    code,
    name,
    fullName: `${province} ${name}`.trim(),
    feature,
    ...getFeatureCenter(feature),
  }
})

export const findRegionByCode = (code) => {
  return regionList.find((region) => region.code === code)
}

export const searchRegions = (keyword) => {
  const query = keyword.trim().replaceAll(' ', '')

  if (!query) {
    return []
  }

  return regionList.filter((region) => region.fullName.replaceAll(' ', '').includes(query))
}

export { koreaRegionData }
