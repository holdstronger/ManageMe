<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ProjectList from './components/ProjectList.vue'
import HistoryjkiList from './components/HistoryjkiList.vue'
import NotificationsPanel from './components/NotificationsPanel.vue'
import NotificationImmediateDialog from './components/NotificationImmediateDialog.vue'
import { useActiveProject } from './composables/useActiveProject'
import { notificationService } from './services/notificationService'

const { activeProjectId, initActiveProject } = useActiveProject()
const showProjectsManager = ref(false)
const mainPanel = ref<'app' | 'notifications'>('app')
const notificationJumpId = ref<string | null>(null)
const theme = ref<'light' | 'dark' | 'system'>('system')
const THEME_STORAGE_KEY = 'manageme_theme'

initActiveProject()

const showEmptyState = computed(
  () => !showProjectsManager.value && !activeProjectId.value
)

function resolveTheme(selectedTheme: 'light' | 'dark' | 'system') {
  if (selectedTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return selectedTheme
}

function applyTheme(selectedTheme: 'light' | 'dark' | 'system') {
  document.documentElement.setAttribute('data-bs-theme', resolveTheme(selectedTheme))
}

onMounted(() => {
  notificationService.init()
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | 'system' | null
  if (savedTheme) theme.value = savedTheme
  applyTheme(theme.value)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'system') applyTheme('system')
  })
})

watch(theme, (selectedTheme) => {
  localStorage.setItem(THEME_STORAGE_KEY, selectedTheme)
  applyTheme(selectedTheme)
})

function openNotifications() {
  showProjectsManager.value = false
  mainPanel.value = 'notifications'
}

function closeNotificationsPanel() {
  mainPanel.value = 'app'
}

function onOpenNotificationDetail(id: string) {
  notificationJumpId.value = id
  openNotifications()
}

function onJumpConsumed() {
  notificationJumpId.value = null
}

function openProjectsManager() {
  mainPanel.value = 'app'
  showProjectsManager.value = true
}
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <NotificationImmediateDialog @open-detail="onOpenNotificationDetail" />
    <AppHeader
      v-model:theme="theme"
      @manage-projects="openProjectsManager"
      @open-notifications="openNotifications"
    />
    <main class="flex-grow-1 py-4">
      <div v-if="mainPanel === 'notifications'" class="container">
        <NotificationsPanel
          :jump-to-notification-id="notificationJumpId"
          @close-panel="closeNotificationsPanel"
          @jump-consumed="onJumpConsumed"
        />
      </div>
      <div v-else-if="showProjectsManager" class="container">
        <div class="mb-3">
          <button class="btn btn-outline-secondary" @click="showProjectsManager = false">
            Powrót
          </button>
        </div>
        <ProjectList />
      </div>
      <div v-else-if="showEmptyState" class="container">
        <div class="card text-center mx-auto" style="max-width: 440px">
          <div class="card-body py-4">
            <p class="text-body-secondary mb-3">Wybierz projekt w nagłówku lub dodaj nowy.</p>
            <button class="btn btn-primary" @click="showProjectsManager = true">Zarządzaj projektami</button>
          </div>
        </div>
      </div>
      <div v-else class="container">
        <HistoryjkiList v-if="activeProjectId" :project-id="activeProjectId" />
      </div>
    </main>
  </div>
</template>
