<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import TaskForm from './TaskForm.vue'
import type { Historyjka, Priorytet } from '../types/historyjka'
import type { Task } from '../types/task'
import type { User } from '../types/user'
import { tasksApi } from '../api/tasksApi'
import { usersApi } from '../api/usersApi'
import {
  notifyNewTaskInStory,
  notifyTaskAssigned,
  notifyTaskRemovedFromStory,
  notifyTaskStatusDoing,
  notifyTaskStatusDone,
} from '../services/appNotifications'

const props = defineProps<{
  projectId: string
  historyjki: Historyjka[]
}>()

const emit = defineEmits<{
  (e: 'refresh-historyjki'): void
}>()

const tasks = ref<Task[]>([])
const assignableUsers = ref<User[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingTask = ref<Task | null>(null)
const selectedTask = ref<Task | null>(null)
const assigneeId = ref('')

const tasksByState = computed(() => ({
  todo: tasks.value.filter((task) => task.stan === 'todo'),
  doing: tasks.value.filter((task) => task.stan === 'doing'),
  done: tasks.value.filter((task) => task.stan === 'done'),
}))

const storyMap = computed(() => new Map(props.historyjki.map((h) => [h.id, h])))
const userMap = computed(() => new Map(assignableUsers.value.map((u) => [u.id, u])))

watch(
  () => props.projectId,
  () => {
    loadTasks()
  },
  { immediate: true }
)

onMounted(async () => {
  assignableUsers.value = await usersApi.getAssignableUsers()
})

async function loadTasks() {
  if (!props.projectId) {
    tasks.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    tasks.value = await tasksApi.getByProject(props.projectId)
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingTask.value = null
  showForm.value = true
}

function openEdit(task: Task) {
  editingTask.value = task
  showForm.value = true
}

function openDetails(task: Task) {
  selectedTask.value = task
  assigneeId.value = task.odpowiedzialnyUżytkownikId ?? ''
}

function closeDetails() {
  selectedTask.value = null
  assigneeId.value = ''
}

async function saveTask(data: {
  nazwa: string
  opis: string
  priorytet: Priorytet
  historyjkaId: string
  przewidywanyCzasGodziny: number
  zrealizowaneRoboczogodziny: number
}) {
  if (editingTask.value) {
    const updated = await tasksApi.update(editingTask.value.id, data)
    if (updated) replaceTask(updated)
  } else {
    const created = await tasksApi.create({
      ...data,
      projektId: props.projectId,
    })
    tasks.value.push(created)
    const story = storyMap.value.get(created.historyjkaId)
    if (story) {
      notifyNewTaskInStory(created, story, story.właściciel)
    }
  }
}

async function removeTask(task: Task) {
  if (!confirm(`Usunąć zadanie "${task.nazwa}"?`)) return
  const story = storyMap.value.get(task.historyjkaId)
  const ownerId = story?.właściciel
  const ok = await tasksApi.delete(task.id)
  if (!ok) return
  tasks.value = tasks.value.filter((t) => t.id !== task.id)
  if (selectedTask.value?.id === task.id) closeDetails()
  if (ownerId) {
    notifyTaskRemovedFromStory(task.nazwa, story, ownerId)
  }
  emit('refresh-historyjki')
}

async function assignTask() {
  if (!selectedTask.value || !assigneeId.value) return
  const beforeStan = selectedTask.value.stan
  const updated = await tasksApi.assignUser(selectedTask.value.id, assigneeId.value)
  if (!updated) return
  replaceTask(updated)
  selectedTask.value = updated
  const story = storyMap.value.get(updated.historyjkaId)
  notifyTaskAssigned(updated, story, assigneeId.value)
  if (beforeStan === 'todo' && updated.stan === 'doing' && story?.właściciel) {
    notifyTaskStatusDoing(updated, story, story.właściciel)
  }
  emit('refresh-historyjki')
}

async function markDone() {
  if (!selectedTask.value) return
  const story = storyMap.value.get(selectedTask.value.historyjkaId)
  const updated = await tasksApi.markDone(selectedTask.value.id)
  if (!updated) return
  replaceTask(updated)
  selectedTask.value = updated
  if (story?.właściciel) {
    notifyTaskStatusDone(updated, story, story.właściciel)
  }
  emit('refresh-historyjki')
}

function replaceTask(task: Task) {
  const index = tasks.value.findIndex((item) => item.id === task.id)
  if (index !== -1) {
    tasks.value[index] = task
  }
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleString('pl-PL')
}

function priorityLabel(priority: Priorytet) {
  return priority === 'wysoki' ? 'Wysoki' : priority === 'średni' ? 'Średni' : 'Niski'
}

function stateLabel(state: Task['stan']) {
  if (state === 'todo') return 'Do zrobienia'
  if (state === 'doing') return 'W trakcie'
  return 'Zakończone'
}

function userLabel(userId: string | null) {
  if (!userId) return 'Nieprzypisane'
  const user = userMap.value.get(userId)
  return user ? `${user.imię} ${user.nazwisko} (${user.rola})` : 'Nieznany użytkownik'
}
</script>

<template>
  <section class="tasks">
    <header class="tasks-header">
      <h2>Zadania</h2>
      <button class="btn btn-primary" :disabled="historyjki.length === 0" @click="openCreate">
        + Nowe zadanie
      </button>
    </header>

    <p v-if="historyjki.length === 0" class="empty">
      Dodaj historyjkę, aby utworzyć pierwsze zadanie.
    </p>
    <p v-else-if="loading" class="empty">Ładowanie zadań...</p>

    <div v-else class="kanban">
      <div class="column">
        <h3>Todo</h3>
        <ul>
          <li v-for="task in tasksByState.todo" :key="task.id" class="card" @click="openDetails(task)">
            <strong>{{ task.nazwa }}</strong>
            <p>{{ storyMap.get(task.historyjkaId)?.nazwa ?? 'Brak historyjki' }}</p>
          </li>
        </ul>
      </div>
      <div class="column">
        <h3>Doing</h3>
        <ul>
          <li v-for="task in tasksByState.doing" :key="task.id" class="card" @click="openDetails(task)">
            <strong>{{ task.nazwa }}</strong>
            <p>{{ userLabel(task.odpowiedzialnyUżytkownikId) }}</p>
          </li>
        </ul>
      </div>
      <div class="column">
        <h3>Done</h3>
        <ul>
          <li v-for="task in tasksByState.done" :key="task.id" class="card" @click="openDetails(task)">
            <strong>{{ task.nazwa }}</strong>
            <p>{{ formatDate(task.dataZakończenia) }}</p>
          </li>
        </ul>
      </div>
    </div>

    <TaskForm v-model="showForm" :historyjki="historyjki" :task="editingTask" @submit="saveTask" />

    <Teleport to="body">
      <div
        v-if="selectedTask"
        class="task-details-overlay"
        role="presentation"
        @click.self="closeDetails"
      >
        <div
          class="task-details-panel"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          @click.stop
          @keydown.esc.prevent="closeDetails"
        >
          <div class="details-content">
            <div class="details-header">
              <h3>{{ selectedTask.nazwa }}</h3>
              <button type="button" class="btn-icon" @click="closeDetails">✕</button>
            </div>
            <p class="muted">{{ selectedTask.opis || 'Brak opisu' }}</p>
            <ul class="meta">
              <li><strong>Stan:</strong> {{ stateLabel(selectedTask.stan) }}</li>
              <li><strong>Priorytet:</strong> {{ priorityLabel(selectedTask.priorytet) }}</li>
              <li><strong>Historyjka:</strong> {{ storyMap.get(selectedTask.historyjkaId)?.nazwa ?? 'Brak' }}</li>
              <li><strong>Data startu:</strong> {{ formatDate(selectedTask.dataStartu) }}</li>
              <li><strong>Data zakończenia:</strong> {{ formatDate(selectedTask.dataZakończenia) }}</li>
              <li><strong>Plan [h]:</strong> {{ selectedTask.przewidywanyCzasGodziny }}</li>
              <li><strong>Zrealizowane [h]:</strong> {{ selectedTask.zrealizowaneRoboczogodziny }}</li>
              <li><strong>Osoba:</strong> {{ userLabel(selectedTask.odpowiedzialnyUżytkownikId) }}</li>
            </ul>
            <div class="actions-row">
              <select v-model="assigneeId">
                <option disabled value="">Przypisz osobę</option>
                <option v-for="user in assignableUsers" :key="user.id" :value="user.id">
                  {{ user.imię }} {{ user.nazwisko }} ({{ user.rola }})
                </option>
              </select>
              <button type="button" class="btn btn-secondary" :disabled="!assigneeId" @click="assignTask">
                Przypisz
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="selectedTask.stan === 'done' || !selectedTask.odpowiedzialnyUżytkownikId"
                @click="markDone"
              >
                Oznacz jako done
              </button>
            </div>
            <div class="actions-row">
              <button type="button" class="btn btn-secondary" @click="openEdit(selectedTask)">Edytuj</button>
              <button type="button" class="btn btn-danger" @click="removeTask(selectedTask)">Usuń</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.tasks { max-width: 980px; margin: 24px auto 0; padding: 0 24px 24px; }
.tasks-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.empty { text-align: left; color: var(--text); }
.kanban { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.column { border: 1px solid var(--border); border-radius: 10px; background: var(--code-bg); padding: 12px; text-align: left; min-height: 200px; }
.column h3 { margin: 0 0 8px; font-size: 16px; color: var(--text-h); }
.column ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.card { border: 1px solid var(--border); border-radius: 8px; padding: 10px; background: var(--bg); cursor: pointer; }
.card strong { display: block; color: var(--text-h); font-size: 14px; margin-bottom: 4px; }
.card p { font-size: 12px; color: var(--text); }
.task-details-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
}
.task-details-panel {
  border: none;
  border-radius: 12px;
  max-width: 620px;
  width: 92vw;
  max-height: min(90vh, 720px);
  overflow: auto;
  box-shadow: var(--shadow);
  background: var(--bg);
}
.details-content { padding: 20px; text-align: left; }
.details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.muted { color: var(--text); margin-bottom: 10px; }
.meta { list-style: none; padding: 0; margin: 0 0 14px; display: grid; gap: 6px; }
.meta strong { color: var(--text-h); }
.actions-row { display: flex; gap: 8px; margin-top: 10px; align-items: center; flex-wrap: wrap; }
.actions-row select { padding: 8px; border-radius: 8px; border: 1px solid var(--border); background: var(--code-bg); color: var(--text-h); }
.btn { padding: 8px 14px; border: none; border-radius: 8px; font: inherit; cursor: pointer; }
.btn-primary { background: var(--accent); color: white; }
.btn-secondary { background: var(--code-bg); color: var(--text-h); }
.btn-danger { background: rgba(220, 38, 38, 0.12); color: #dc2626; }
.btn-icon { border: none; background: transparent; cursor: pointer; color: var(--text); font-size: 16px; }
</style>
