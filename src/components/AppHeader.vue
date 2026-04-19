<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { currentUserService } from '../services/currentUserService'
import { useActiveProject } from '../composables/useActiveProject'
import { projectsApi } from '../api/projectsApi'
import type { Project } from '../types/project'

const { activeProjectId, setActiveProject, initActiveProject } = useActiveProject()
const theme = defineModel<'light' | 'dark' | 'system'>('theme', { required: true })

const emit = defineEmits<{
  (e: 'manage-projects'): void
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
        <span class="badge text-bg-secondary">{{ userFullName }} ({{ userRole }})</span>
      </div>
    </div>
  </header>
</template>
