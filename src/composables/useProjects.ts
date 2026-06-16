import { ref } from 'vue'
import type { Project } from '../types/project'
import { projectsApi } from '../api/projectsApi'

const projects = ref<Project[]>([])
let loadPromise: Promise<void> | null = null

async function loadProjects(): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = projectsApi.getAll().then((list) => {
    projects.value = list
  }).finally(() => {
    loadPromise = null
  })

  return loadPromise
}

export function useProjects() {
  return {
    projects,
    loadProjects,
  }
}
