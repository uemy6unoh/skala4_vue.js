# SKALA Vue.js Hands-on

Vue.js 강의에서 진행하는 Hands-on 과제를 단계별로 정리한 저장소입니다.

## 과제 개요

강의에서 배운 Vue 문법을 날씨 애플리케이션에 하나씩 적용하고, 각 단계에서 필요한 기능을 추가하는 방식으로 진행했습니다.

Hands-on별 README에는 기본 요구사항을 코드에 어떻게 적용했는지, 직접 추가한 기능과 작업 중 해결한 문제를 정리했습니다. 아래 목록에서 Hands-on 이름을 누르면 해당 README로 이동합니다.

## Hands-on 구성

1. [MockUp](src/components/hands-on/1.MockUp/README.md) — 기본 Vue 문법으로 날씨 카드와 사용자 이벤트 구현 `[X]`
2. Composition — `computed`, `watch`, `watchEffect`를 이용한 상태 로직 구성 `[X]`
3. Component — 화면을 검색창, 날씨 카드 등 역할별 컴포넌트로 분리 `[X]`
4. Router — 메인과 상세 화면의 경로 구성 `[X]`
5. Store — Pinia를 이용한 공통 상태 관리 `[X]`
6. Axios — 더미 데이터를 실제 API 데이터로 전환 `[X]`
7. UI Library — UI 라이브러리를 적용해 화면 구성 보완 `[X]`
8. Deployment — 코드 점검, 환경변수 설정, 빌드 및 배포 `[X]`

## AI 활용

이번 과제에서는 AI를 완성 코드를 대신 만드는 용도보다 다음 작업을 보조하는 데 사용했습니다.

- CSS 레이아웃과 색상처럼 화면을 다듬는 작업
- 오류 메시지의 의미와 원인 후보를 확인하는 작업
- 수업 중 헷갈렸던 Vue 문법을 다시 설명받고 복습하는 작업
- README 초안의 순서와 문장을 점검하는 작업

제안받은 내용은 그대로 사용하기보다 현재 코드와 맞는지 다시 확인했습니다. 기능을 선택하고 조건의 기준을 정하는 부분, 최종 실행과 화면 확인은 직접 진행했습니다.

## 실행 방법

```sh
npm install
npm run dev
```

빌드 확인:

```sh
npm run build
```
