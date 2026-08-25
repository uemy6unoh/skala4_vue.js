# SKALA Vue Hands-on

Vue 3의 주요 기능을 배우면서 하나의 날씨 애플리케이션을 단계별로 확장하는 실습 프로젝트입니다.

각 Hands on에서는 강의 요구사항을 먼저 구현하고, 배운 문법을 활용한 개인 기능과 화면 구성을 추가합니다. 완성 결과뿐 아니라 **어떤 의도로 구성했는지**를 단계별로 기록합니다.

## 학습 진행

각 Hands on은 별개의 결과물을 만드는 것이 아니라, 앞 단계의 날씨 앱을 다음 개념으로 개선하고 확장하는 과정입니다.

| 일차 | 단계 | Hands on | 날씨 앱의 변화 | 상태 |
|---|---:|---|---|---|
| 1일차 | 1 | [MockUp](src/components/hands-on/1.MockUp/README.md) | 기본 문법으로 날씨 카드 화면과 사용자 이벤트 구현 | 완료 |
| 2일차 | 2 | Composition | `computed`, `watch`, `watchEffect`로 검색과 상태 로직 개선 | 예정 |
| 2일차 | 3 | Component | 화면을 부모·검색창·날씨 카드 컴포넌트로 분리 | 예정 |
| 3일차 | 4 | Router | 메인·상세·소개 화면과 동적 경로 구성 | 예정 |
| 3일차 | 5 | Store | Pinia로 온도 단위 등 공통 상태 관리 | 예정 |
| 3일차 | 6 | Axios | 더미 데이터를 실제 날씨 API 데이터로 전환 | 예정 |
| 4일차 | 7 | UI Library | 외부 UI 라이브러리로 화면 완성도 개선 | 예정 |
| 4일차 | 8 | Deployment | 코드 품질 점검, 환경변수, 빌드 및 배포 | 예정 |

## 개발 환경 및 실행

- Vue 3
- JavaScript
- Vite
- Node.js

```sh
npm install
npm run dev
```

빌드 확인:

```sh
npm run build
```

각 Hands-on의 구현 의도와 학습 내용은 위 진행표의 개별 문서에 기록합니다.
