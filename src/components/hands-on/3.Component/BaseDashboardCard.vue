<template>
  <section class="base-dashboard-card">
    <slot></slot>
  </section>
</template>

<style scoped>
.base-dashboard-card {
  padding: 18px;
  margin-bottom: 16px;
  background: var(--app-surface-subtle);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
}
</style>
