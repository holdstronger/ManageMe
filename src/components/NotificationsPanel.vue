<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { Notification } from '../types/notification'
import { notificationService } from '../services/notificationService'

const props = defineProps<{
  jumpToNotificationId: string | null
}>()

const emit = defineEmits<{
  (e: 'close-panel'): void
  (e: 'jump-consumed'): void
}>()

const detailId = ref<string | null>(null)

watch(
  () => props.jumpToNotificationId,
  (id) => {
    if (id) {
      detailId.value = id
      void nextTick(() => emit('jump-consumed'))
    }
  },
  { immediate: true }
)

const mineSorted = computed(() =>
  [...notificationService.getMine()].sort((a, b) => b.date.localeCompare(a.date))
)

const active = computed(() =>
  detailId.value ? (notificationService.getById(detailId.value) ?? null) : null
)

watch(
  detailId,
  async (id) => {
    if (!id) return
    const n = notificationService.getById(id)
    if (n && !n.isRead) {
      await notificationService.markRead(id)
    }
  },
  { flush: 'post' }
)

function openDetail(id: string) {
  detailId.value = id
}

function backToList() {
  detailId.value = null
}

async function markReadClicked(n: Notification) {
  if (!n.isRead) await notificationService.markRead(n.id)
}

function priorityBadgeClass(p: Notification['priority']) {
  if (p === 'high') return 'text-bg-danger'
  if (p === 'medium') return 'text-bg-warning'
  return 'text-bg-secondary'
}
</script>

<template>
  <div class="mx-auto" style="max-width: 720px">
    <div v-if="!detailId" class="notifications-list">
      <header class="d-flex justify-content-between align-items-center gap-2 mb-3">
        <h2 class="h4 mb-0">Powiadomienia</h2>
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="emit('close-panel')">
          Powrót
        </button>
      </header>
      <p v-if="mineSorted.length === 0" class="text-body-secondary">Brak powiadomień.</p>
      <ul v-else class="list-group shadow-sm">
        <li
          v-for="n in mineSorted"
          :key="n.id"
          class="list-group-item d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-start"
          :class="{ 'border-start border-primary border-4': !n.isRead }"
        >
          <div class="flex-grow-1 text-start pointer" role="button" tabindex="0" @click="openDetail(n.id)">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <span v-if="!n.isRead" class="badge text-bg-primary">Nowe</span>
              <span class="badge" :class="priorityBadgeClass(n.priority)">
                {{ notificationService.priorityLabel(n.priority) }}
              </span>
              <span class="small text-body-secondary">{{ notificationService.formatDate(n.date) }}</span>
            </div>
            <div class="fw-semibold">{{ n.title }}</div>
            <div class="text-body-secondary small preview">{{ n.message }}</div>
          </div>
          <div class="d-flex flex-shrink-0 gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              :disabled="n.isRead"
              @click.stop="markReadClicked(n)"
            >
              Oznacz jako przeczytane
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="active" class="notification-detail text-start">
      <button type="button" class="btn btn-link px-0 mb-2" @click="backToList">← Lista powiadomień</button>
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span class="badge" :class="priorityBadgeClass(active.priority)">
              {{ notificationService.priorityLabel(active.priority) }}
            </span>
            <span class="small text-body-secondary">{{ notificationService.formatDate(active.date) }}</span>
          </div>
          <h2 class="h4 card-title">{{ active.title }}</h2>
          <p class="card-text">{{ active.message }}</p>
          <button
            v-if="!active.isRead"
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="markReadClicked(active)"
          >
            Oznacz jako przeczytane
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-body-secondary">
      <p>Nie znaleziono powiadomienia.</p>
      <button type="button" class="btn btn-secondary btn-sm" @click="backToList">Wróć do listy</button>
    </div>
  </div>
</template>

<style scoped>
.preview {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pointer {
  cursor: pointer;
}
</style>
