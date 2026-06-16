<script setup lang="ts">
import { computed } from 'vue'
import { notificationService } from '../services/notificationService'

const emit = defineEmits<{
  (e: 'open-detail', id: string): void
}>()

const current = computed(() => notificationService.immediateDialogQueue.value[0] ?? null)

function acknowledge() {
  notificationService.dismissNextImmediateDialog()
}

function openDetails() {
  const n = current.value
  if (!n) return
  acknowledge()
  emit('open-detail', n.id)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="current" class="mm-overlay" role="presentation" @click.self="acknowledge">
      <div
        class="mm-panel border rounded-3 shadow-lg text-start"
        role="alertdialog"
        aria-modal="true"
        tabindex="-1"
        @click.stop
        @keydown.esc.prevent="acknowledge"
      >
        <div class="p-4">
          <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
            <h2 class="h5 mb-0">{{ current.title }}</h2>
            <span
              class="badge"
              :class="{
                'text-bg-danger': current.priority === 'high',
                'text-bg-warning': current.priority === 'medium',
              }"
            >
              {{ notificationService.priorityLabel(current.priority) }}
            </span>
          </div>
          <p class="text-body-secondary mb-3 small">
            {{ notificationService.formatDate(current.date) }}
          </p>
          <p class="mb-4">{{ current.message }}</p>
          <div class="d-flex flex-wrap gap-2 justify-content-end">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="acknowledge">Zamknij</button>
            <button type="button" class="btn btn-primary btn-sm" @click="openDetails">Otwórz szczegóły</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mm-overlay {
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
}

.mm-panel {
  width: 100%;
  max-width: 480px;
  background: var(--bs-body-bg, #fff);
  color: var(--bs-body-color, #212529);
}
</style>
