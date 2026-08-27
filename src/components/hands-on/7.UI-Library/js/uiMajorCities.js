export const majorCities = [
  { id: 'seoul', name: '서울', area: '서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'daejeon', name: '대전', area: '대전광역시', lat: 36.3504, lon: 127.3845 },
  { id: 'jeonju', name: '전주', area: '전북특별자치도 전주시', lat: 35.8242, lon: 127.148 },
  { id: 'daegu', name: '대구', area: '대구광역시', lat: 35.8714, lon: 128.6014 },
  { id: 'busan', name: '부산', area: '부산광역시', lat: 35.1796, lon: 129.0756 },
  { id: 'jeju', name: '제주', area: '제주특별자치도 제주시', lat: 33.4996, lon: 126.5312 },
]

export const findMajorCity = (id) => {
  return majorCities.find((city) => city.id === id)
}
