<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const handsOnLinks = [
  { step: 1, label: 'MockUp', to: { name: 'mockup' } },
  { step: 2, label: 'Composition', to: { name: 'composition' } },
  { step: 3, label: 'Component', to: { name: 'component' } },
  { step: 4, label: 'Router', to: { name: 'weather-home' } },
]
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <span>SKALA Vue.js</span>
        <strong>Hands-on</strong>
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

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 28px 20px;
  color: #dbe7f5;
  background: #26364d;
}

.brand {
  display: flex;
  flex-direction: column;
  padding: 0 8px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.brand span {
  font-size: 12px;
  color: #94abc7;
}

.brand strong {
  margin-top: 2px;
  font-size: 21px;
  color: #ffffff;
}

.sidebar nav {
  margin-top: 24px;
}

.nav-title {
  padding: 0 9px;
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 700;
  color: #8fa5bf;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 5px;
  color: #c7d5e5;
  text-decoration: none;
  border-radius: 10px;
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

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
  background: #3c5270;
}

.nav-link.active span {
  color: #26364d;
  background: #dce9f8;
}

.router-menu {
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.router-menu a {
  display: block;
  padding: 7px 10px 7px 18px;
  font-size: 12px;
  color: #9fb2c9;
  text-decoration: none;
}

.router-menu a:hover,
.router-menu a.router-link-exact-active {
  color: #ffffff;
}

.main-content {
  min-width: 0;
  padding: 20px;
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
