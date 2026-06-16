<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { currentUserService } from '../services/currentUserService'
import { unreadNotificationCount } from '../services/notificationService'
import { useActiveProject } from '../composables/useActiveProject'
import { useProjects } from '../composables/useProjects'

const { activeProjectId, setActiveProject, initActiveProject } = useActiveProject()
const { projects, loadProjects } = useProjects()
const theme = defineModel<'light' | 'dark' | 'system'>('theme', { required: true })

const emit = defineEmits<{
  (e: 'manage-projects'): void
  (e: 'open-notifications'): void
}>()

const selectedProjectId = computed({
  get: () => activeProjectId.value ?? '',
  set: (value: string) => setActiveProject(value === '' ? null : value),
})

const userFullName = currentUserService.fullName
const userRole = currentUserService.user.rola

const userInitials = computed(() => {
  const user = currentUserService.user
  return `${user.imię.charAt(0)}${user.nazwisko.charAt(0)}`.toUpperCase()
})

onMounted(async () => {
  await initActiveProject()
  await loadProjects()
})

async function refreshProjects() {
  await loadProjects()
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__left">
        <span class="app-header__brand">ManageMe</span>

        <nav class="app-header__nav" aria-label="Nawigacja główna">
          <button type="button" class="app-header__nav-link" @click="emit('manage-projects')">
            Projekty
          </button>
          <button type="button" class="app-header__nav-link" @click="emit('open-notifications')">
            Powiadomienia
            <span
              v-if="unreadNotificationCount > 0"
              class="app-header__nav-badge"
              :aria-label="`${unreadNotificationCount} nieprzeczytanych`"
            >
              {{ unreadNotificationCount }}
            </span>
          </button>
        </nav>
      </div>

      <div class="app-header__right">
        <div class="app-header__control app-header__control--theme">
          <label class="visually-hidden" for="theme-select">Motyw</label>
          <span class="app-header__control-icon" aria-hidden="true">◐</span>
          <select id="theme-select" v-model="theme" class="app-header__select app-header__select--compact" aria-label="Motyw">
            <option value="system">System</option>
            <option value="light">Jasny</option>
            <option value="dark">Ciemny</option>
          </select>
        </div>

        <div class="app-header__control">
          <label class="app-header__control-label" for="project-select">Projekt</label>
          <select
            id="project-select"
            v-model="selectedProjectId"
            class="app-header__select"
            @focus="refreshProjects"
          >
            <option value="">Brak projektu</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.nazwa }}
            </option>
          </select>
        </div>

        <button
          type="button"
          class="app-header__profile"
          :title="`${userFullName} (${userRole})`"
          @click="emit('open-notifications')"
        >
          <span class="app-header__avatar" aria-hidden="true">{{ userInitials }}</span>
          <span class="app-header__profile-text">
            <span class="app-header__profile-name">{{ userFullName }}</span>
            <span class="app-header__profile-role">{{ userRole }}</span>
          </span>
          <span
            v-if="unreadNotificationCount > 0"
            class="app-header__profile-badge"
            :aria-label="`${unreadNotificationCount} nieprzeczytanych powiadomień`"
          >
            {{ unreadNotificationCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  --header-bg: var(--bs-tertiary-bg);
  --header-border: var(--bs-border-color);
  --header-hover: rgba(var(--bs-emphasis-color-rgb, 33, 37, 41), 0.06);
  --header-muted: var(--bs-secondary-color);

  position: sticky;
  top: 0;
  z-index: 1030;
  height: 3.5rem;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(8px);
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  padding: 0 1.25rem;
}

.app-header__left,
.app-header__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.app-header__left {
  flex: 1 1 auto;
}

.app-header__right {
  flex: 0 1 auto;
  justify-content: flex-end;
}

.app-header__brand {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--bs-emphasis-color);
  white-space: nowrap;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
}

.app-header__nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--header-muted);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.app-header__nav-link:hover {
  background: var(--header-hover);
  color: var(--bs-emphasis-color);
}

.app-header__nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.125rem;
  height: 1.125rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--bs-danger);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
}

.app-header__control {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.app-header__control--theme {
  position: relative;
}

.app-header__control-icon {
  position: absolute;
  left: 0.625rem;
  z-index: 1;
  pointer-events: none;
  font-size: 0.75rem;
  color: var(--header-muted);
  line-height: 1;
}

.app-header__control-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--header-muted);
  white-space: nowrap;
}

.app-header__select {
  min-width: 9.5rem;
  max-width: 14rem;
  height: 2rem;
  padding: 0 2rem 0 0.625rem;
  border: 1px solid var(--header-border);
  border-radius: 0.5rem;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  font: inherit;
  font-size: 0.8125rem;
  line-height: 1.25;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236c757d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
}

.app-header__select--compact {
  min-width: 6.75rem;
  padding-left: 1.75rem;
}

.app-header__select:hover {
  border-color: rgba(var(--bs-primary-rgb), 0.45);
}

.app-header__select:focus {
  outline: none;
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.2);
}

.app-header__profile {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  max-width: 15rem;
  height: 2.25rem;
  padding: 0.25rem 0.625rem 0.25rem 0.25rem;
  border: 1px solid var(--header-border);
  border-radius: 999px;
  background: var(--bs-body-bg);
  color: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.app-header__profile:hover {
  background: var(--header-hover);
  border-color: rgba(var(--bs-primary-rgb), 0.35);
}

.app-header__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: rgba(var(--bs-primary-rgb), 0.15);
  color: var(--bs-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.app-header__profile-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  line-height: 1.15;
  text-align: left;
}

.app-header__profile-name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--bs-emphasis-color);
}

.app-header__profile-role {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--header-muted);
  text-transform: lowercase;
}

.app-header__profile-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.125rem;
  height: 1.125rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--bs-danger);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
  flex-shrink: 0;
}

@media (max-width: 991.98px) {
  .app-header {
    height: auto;
  }

  .app-header__inner {
    flex-wrap: wrap;
    padding: 0.625rem 1rem;
  }

  .app-header__left {
    width: 100%;
  }

  .app-header__right {
    width: 100%;
    flex-wrap: wrap;
  }

  .app-header__profile-text {
    display: none;
  }

  .app-header__profile {
    margin-left: auto;
    max-width: none;
  }
}

@media (max-width: 575.98px) {
  .app-header__control-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .app-header__select {
    min-width: 0;
    flex: 1 1 8rem;
  }

  .app-header__control {
    flex: 1 1 auto;
  }
}
</style>
