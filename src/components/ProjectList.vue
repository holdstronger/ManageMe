<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Project } from '../types/project'
import { projectsApi } from '../api/projectsApi'
import ProjectForm from './ProjectForm.vue'

const projects = ref<Project[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingProject = ref<Project | null>(null)

onMounted(loadProjects)

async function loadProjects() {
  loading.value = true
  try {
    projects.value = await projectsApi.getAll()
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingProject.value = null
  showForm.value = true
}

function openEdit(project: Project) {
  editingProject.value = project
  showForm.value = true
}

async function handleSubmit(data: { nazwa: string; opis: string }) {
  try {
    if (editingProject.value) {
      const updated = await projectsApi.update(editingProject.value.id, data)
      if (updated) {
        const i = projects.value.findIndex((p) => p.id === updated.id)
        if (i !== -1) projects.value[i] = updated
      }
    } else {
      const created = await projectsApi.create(data)
      projects.value.push(created)
    }
  } catch (e) {
    console.error('Błąd zapisu:', e)
  }
}

async function remove(project: Project) {
  if (!confirm(`Czy na pewno usunąć projekt „${project.nazwa}"?`)) return
  const ok = await projectsApi.delete(project.id)
  if (ok) {
    projects.value = projects.value.filter((p) => p.id !== project.id)
  }
}
</script>

<template>
  <div class="mx-auto" style="max-width: 900px">
    <header class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div>
        <h2 class="mb-1">Projekty</h2>
        <p class="text-body-secondary mb-0">Centrum projektów</p>
      </div>
      <button class="btn btn-primary" @click="openCreate">+ Dodaj projekt</button>
    </header>

    <div v-if="loading" class="alert alert-secondary">Ładowanie...</div>

    <div v-else-if="projects.length === 0" class="alert alert-light border">
      Brak projektów. Kliknij "Dodaj projekt", aby utworzyć pierwszy.
    </div>

    <div v-else class="vstack gap-3">
      <div v-for="p in projects" :key="p.id" class="card shadow-sm">
        <div class="card-body d-flex justify-content-between gap-3">
          <div>
            <h5 class="card-title mb-1">{{ p.nazwa }}</h5>
            <p v-if="p.opis" class="card-text text-body-secondary">{{ p.opis }}</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-secondary" title="Edytuj" @click="openEdit(p)">Edytuj</button>
            <button class="btn btn-outline-danger" title="Usuń" @click="remove(p)">Usuń</button>
          </div>
        </div>
      </div>
    </div>

    <ProjectForm
      v-model="showForm"
      :project="editingProject"
      @submit="handleSubmit"
    />
  </div>
</template>
