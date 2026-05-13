<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { currentUserService } from '../services/currentUserService'
import { unreadNotificationCount } from '../services/notificationService'
import { useActiveProject } from '../composables/useActiveProject'
import { projectsApi } from '../api/projectsApi'
import type { Project } from '../types/project'

const { activeProjectId, setActiveProject, initActiveProject } = useActiveProject()
const theme = defineModel<'light' | 'dark' | 'system'>('theme', { required: true })

const emit = defineEmits<{
  (e: 'manage-projects'): void
  (e: 'open-notifications'): void
}>()
const projects = ref<Project[]>([])

onMounted(async () => {
  await initActiveProject()
  projects.value = await projectsApi.getAll()
})

const userFullName = currentUserService.fullName
const userRole = currentUserService.user.rola

function selectProject(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  const id = value === '' ? null : value
  setActiveProject(id)
}
</script>

<template>
  <header class="navbar navbar-expand-lg border-bottom bg-body-tertiary px-3">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">ManageMe</span>

      <div class="d-flex align-items-center gap-2 flex-wrap ms-auto">
        <button type="button" class="btn btn-link py-1 px-2" @click="emit('open-notifications')">
          Powiadomienia
        </button>

        <div class="d-flex align-items-center gap-2">
          <label for="project-select" class="form-label mb-0 small text-body-secondary">Projekt</label>
          <select id="project-select" class="form-select" style="min-width: 220px" @change="selectProject">
            <option :selected="!activeProjectId" value="">Brak projektu</option>
            <option v-for="p in projects" :key="p.id" :value="p.id" :selected="p.id === activeProjectId">
              {{ p.nazwa }}
            </option>
          </select>
        </div>

        <select v-model="theme" class="form-select" style="min-width: 130px" aria-label="Motyw">
          <option value="system">System</option>
          <option value="light">Jasny</option>
          <option value="dark">Ciemny</option>
        </select>

        <button class="btn btn-outline-primary" @click="emit('manage-projects')">Projekty</button>

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            class="btn btn-sm"
            :class="unreadNotificationCount > 0 ? 'btn-outline-danger' : 'btn-outline-secondary'"
            title="Otwórz powiadomienia"
            @click="emit('open-notifications')"
          >
            <span class="small">{{ userFullName }}</span>
            <span v-if="unreadNotificationCount > 0" class="badge text-bg-danger ms-1">
              {{ unreadNotificationCount }}
            </span>
          </button>
          <span class="badge text-bg-secondary">{{ userRole }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
