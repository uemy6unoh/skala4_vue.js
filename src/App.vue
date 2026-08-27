<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const handsOnLinks = [
  { step: 1, label: 'MockUp', to: { name: 'mockup' } },
  { step: 2, label: 'Composition', to: { name: 'composition' } },
  { step: 3, label: 'Component', to: { name: 'component' } },
  { step: 4, label: 'Router', to: { name: 'weather-home' } },
  { step: 5, label: 'Store', to: { name: 'store-home' } },
  { step: 6, label: 'Axios', to: { name: 'axios-home' } },
  { step: 7, label: 'UI Library', to: { name: 'ui-home' } },
]
</script>

<template>
  <a class="skip-link" href="#main-content">본문 바로가기</a>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <img class="brand-logo" src="/weather-mark.svg" alt="" width="38" height="38" />
        <div class="brand-copy">
          <span>SKALA Vue.js</span>
          <strong>Weather <br/>Hands-on</strong>
        </div>
      </div>

      <nav aria-label="Hands-on 목차">
        <p class="nav-title">실습 목차</p>
        <RouterLink
          v-for="item in handsOnLinks"
          :key="item.step"
          :to="item.to"
          class="nav-link"
          :class="{ active: route.meta.handsOn === item.step }"
        >
          <span>{{ item.step }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <nav v-if="route.meta.handsOn === 4" class="router-menu" aria-label="Router 세부 메뉴">
        <p class="nav-title">Router 화면</p>
        <RouterLink :to="{ name: 'weather-home' }">날씨 대시보드</RouterLink>
        <RouterLink :to="{ name: 'weather-about' }">서비스 소개</RouterLink>
        <RouterLink :to="{ name: 'weather-guide' }">생활 안내 기준</RouterLink>
      </nav>
    </aside>

    <main id="main-content" class="main-content" tabindex="-1">
      <RouterView v-slot="{ Component, route: viewRoute }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="viewRoute.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 20;
  padding: 9px 13px;
  color: #ffffff;
  text-decoration: none;
  background: var(--app-blue);
  border-radius: 8px;
  transform: translateY(-160%);
  transition: transform var(--press-duration) var(--ease-out);
}

.skip-link:focus {
  transform: translateY(0);
}

.app-shell {
  display: grid;
  grid-template-columns: 244px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 28px 22px;
  color: #d9e7f5;
  background: rgba(11, 31, 51, 0.94);
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 8px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
}

.brand-logo {
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  padding: 6px;
  background: #ffffff;
  border-radius: 11px;
}

.brand-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.brand-copy span {
  font-size: 12px;
  color: #91a8bd;
}

.brand-copy strong {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.sidebar nav {
  margin-top: 24px;
}

.nav-title {
  padding: 0 9px;
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 700;
  color: #7f99b0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 5px;
  color: #c5d5e3;
  text-decoration: none;
  border-radius: 10px;
  transition:
    color var(--press-duration) ease,
    background-color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.nav-link span {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 7px;
}

.nav-link.active {
  color: #ffffff;
  background: var(--app-blue);
}

.nav-link:active {
  transform: scale(0.98);
}

.nav-link.active span {
  color: var(--app-ink);
  background: #ffffff;
}

.router-menu {
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
}

.router-menu a {
  display: block;
  padding: 7px 10px 7px 18px;
  font-size: 12px;
  color: #95abc0;
  text-decoration: none;
  transition:
    color var(--press-duration) ease,
    transform var(--press-duration) var(--ease-out);
}

.router-menu a.router-link-exact-active {
  color: #ffffff;
}

.router-menu a:active {
  transform: scale(0.98);
  transform-origin: left center;
}

.main-content {
  min-width: 0;
  padding: 36px 40px;
}

.page-enter-active {
  transition:
    opacity var(--page-enter-duration) var(--ease-out),
    transform var(--page-enter-duration) var(--ease-out);
}

.page-leave-active {
  transition:
    opacity var(--page-exit-duration) var(--ease-in-out),
    transform var(--page-exit-duration) var(--ease-in-out);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (hover: hover) and (pointer: fine) {
  .nav-link:hover {
    color: #ffffff;
    background: rgba(22, 119, 255, 0.72);
  }

  .router-menu a:hover {
    color: #ffffff;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .sidebar {
    background: var(--app-ink);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media (prefers-contrast: more) {
  .sidebar {
    background: #061524;
    border-right-color: #ffffff;
  }
}

@media (max-width: 760px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    position: static;
    height: auto;
    padding: 18px;
  }

  .brand {
    padding-bottom: 14px;
  }

  .sidebar nav {
    display: flex;
    gap: 6px;
    margin-top: 14px;
    overflow-x: auto;
  }

  .nav-title,
  .router-menu {
    display: none;
  }

  .nav-link {
    flex: 0 0 auto;
    margin: 0;
  }

  .main-content {
    padding: 10px;
  }
}
</style>
