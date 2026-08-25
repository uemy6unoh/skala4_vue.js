# Hands-on 4 - Router

한 화면 안에서 모든 내용을 바꾸던 구조를 주소에 따라 다른 화면이 나타나는 구조로 변경했습니다. App.vue에는 공통 목차를 두고 실제 페이지는 RouterView 위치에 표시되도록 구성했습니다.

## 기본 요구사항

### Router 설정

router/index.js에 화면별 경로와 연결할 view를 정의했습니다. 각 화면은 함수를 이용해 필요한 시점에 불러오도록 작성했고, 등록되지 않은 주소는 NotFoundView로 이동하도록 마지막에 Catch-all 경로를 추가했습니다.

main.js에서는 생성한 router를 use로 등록했습니다. 이 과정이 있어야 App.vue와 각 view에서 Vue Router 기능을 사용할 수 있습니다.

### 공통 목차와 화면 영역

App.vue의 왼쪽에는 RouterLink를 이용한 Hands-on 목차를 만들고 오른쪽에는 RouterView를 배치했습니다. 목차를 누르면 App.vue의 공통 틀은 유지되고 오른쪽 실습 화면만 변경됩니다.

현재 화면에 해당하는 목차는 route의 meta 값으로 확인해 다른 배경색이 표시되도록 했습니다.

### 날씨 대시보드

WeatherHomeView는 Component 실습에서 분리한 BaseDashboardCard, SearchBar, WeatherFilter, WeatherCard를 다시 사용했습니다.

검색과 필터 기능은 그대로 유지했고 상세보기 동작만 변경했습니다. 이전 실습의 alert 대신 router.push를 사용해 선택한 도시 ID가 포함된 상세 주소로 이동합니다.

### 동적 상세 경로

상세 주소는 weather 뒤에 cityId가 들어가는 동적 경로로 만들었습니다. WeatherDetailView가 화면에 나타날 때 route.params의 cityId와 날씨 데이터의 id를 비교해 해당 도시를 선택합니다.

도시 정보가 있으면 기온, 습도, 풍속, 미세먼지를 표시하고 잘못된 도시 ID라면 정보를 찾지 못했다는 안내를 보여줍니다.

### 서비스 소개와 없는 페이지

WeatherAboutView에는 실습에서 만든 날씨 화면의 기능을 간단히 작성하고 대시보드로 돌아가는 RouterLink를 추가했습니다.

등록하지 않은 주소로 접근했을 때는 NotFoundView를 보여주고 다시 날씨 대시보드로 이동할 수 있도록 구성했습니다.

## 추가 사항

### 이전 실습 화면 연결

왼쪽 목차에서 MockUp, Composition, Component 화면도 확인할 수 있도록 각각의 경로를 추가했습니다. App.vue에서 실습 컴포넌트를 하나씩 import해서 바꾸지 않아도 주소와 목차로 원하는 단계를 선택할 수 있습니다.

### 생활 안내 기준 화면

날씨 카드에서 사용한 미세먼지, 풍속, 습도 안내가 어떤 조건에서 표시되는지 따로 확인할 수 있는 WeatherGuideView를 추가했습니다.

Router에 view를 직접 하나 추가해 보면서 새 화면을 만들 때는 view 파일 작성, 경로 등록, 이동 링크 연결이 함께 필요하다는 점을 확인했습니다.

### Router 세부 메뉴

Router 실습을 선택한 경우에만 날씨 대시보드, 서비스 소개, 생활 안내 기준 메뉴가 나타나도록 했습니다. 상세 화면으로 이동해도 Hands-on 4가 선택된 상태는 유지됩니다.

## 문제 해결

### 경로를 작성했지만 화면이 나타나지 않는 문제

router/index.js에 경로만 작성해서는 애플리케이션 전체에서 사용할 수 없었습니다. main.js에서 createApp 뒤에 use를 이용해 router를 등록한 후 RouterLink와 RouterView가 정상적으로 동작했습니다.

### Router 관련 파일이 Git에 포함되지 않는 문제

처음 프로젝트를 정리할 때 강의 기본 파일을 제외하려고 views와 router 폴더를 gitignore에 넣어둔 상태였습니다. Router 실습에서는 두 폴더가 제출에 필요한 소스가 되었기 때문에 해당 제외 규칙을 제거했습니다.

### 상세 화면에서도 4번 목차를 표시하는 방법

상세 화면의 주소는 대시보드와 다르기 때문에 기본 exact active 상태만으로는 4번 목차가 선택된 것처럼 보이지 않았습니다. Router에 등록한 관련 경로의 meta에 같은 handsOn 값을 넣고 App.vue가 그 값을 확인하도록 처리했습니다.

## 정리

Component 실습은 한 화면 안의 역할을 나누는 과정이었고, Router 실습은 애플리케이션의 화면 자체를 주소별로 나누는 과정이라는 차이를 확인했습니다.

RouterLink는 사용자가 누르는 이동 수단, RouterView는 현재 주소에 맞는 화면이 들어오는 자리, router.push는 함수 안에서 화면을 이동할 때 사용하는 방법으로 정리할 수 있었습니다.
