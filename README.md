# SKALA Vue Hands-on

Vue.js 강의에서 진행하는 Hands-on 과제를 단계별로 정리한 저장소입니다.

## 과제 개요

- 강의에서 배운 Vue 문법을 먼저 적용하고, 필요한 기능을 직접 추가하면서 화면을 확장합니다.
- 각 Hands-on 폴더의 README에는 구현 화면, 사용한 문법, 추가한 내용과 Trouble Shooting을 기록합니다.
- 완료된 Hands-on은 아래 표의 제목을 누르면 해당 README로 이동할 수 있습니다.

## 학습 진행

앞에서 만든 날씨 앱에 새로운 Vue 개념을 하나씩 적용하는 방식으로 진행합니다.

| 단계 | Hands-on | 작업 내용 | 상태 |
|---:|---|---|---|
| 1 | [MockUp](src/components/hands-on/1.MockUp/README.md) | 기본 Vue 문법으로 날씨 카드와 사용자 이벤트 구현 | 완료 |
| 2 | Composition | `computed`, `watch`, `watchEffect`로 검색과 상태 로직 개선 | 예정 |
| 3 | Component | 화면을 부모·검색창·날씨 카드 컴포넌트로 분리 | 예정 |
| 4 | Router | 메인·상세·소개 화면과 동적 경로 구성 | 예정 |
| 5 | Store | Pinia로 온도 단위 등 공통 상태 관리 | 예정 |
| 6 | Axios | 더미 데이터를 실제 날씨 API 데이터로 전환 | 예정 |
| 7 | UI Library | 외부 UI 라이브러리로 화면 구성 보완 | 예정 |
| 8 | Deployment | 코드 점검, 환경변수 설정, 빌드 및 배포 | 예정 |

## 실행 방법

```sh
npm install
npm run dev
```

빌드 확인:

```sh
npm run build
```
