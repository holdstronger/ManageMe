<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Project } from '../types/project'

const props = defineProps<{
  modelValue: boolean
  project?: Project | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { nazwa: string; opis: string }): void
}>()

const nazwaField = ref('')
const opisField = ref('')

watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    if (props.project) {
      nazwaField.value = props.project.nazwa
      opisField.value = props.project.opis
    } else {
      nazwaField.value = ''
      opisField.value = ''
    }
  },
  { immediate: true }
)

const isEditing = () => !!props.project

function handleSubmit() {
  if (!nazwaField.value.trim()) return
  emit('submit', { nazwa: nazwaField.value.trim(), opis: opisField.value.trim() })
  emit('update:modelValue', false)
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="mm-overlay"
      role="presentation"
      @click.self="close"
    >
      <div
        class="mm-panel"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @click.stop
        @keydown.esc.prevent="close"
      >
        <h2>{{ isEditing() ? 'Edytuj projekt' : 'Nowy projekt' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="pf-nazwa">Nazwa</label>
            <input
              id="pf-nazwa"
              v-model="nazwaField"
              type="text"
              required
              placeholder="Nazwa projektu"
              autocomplete="off"
            />
          </div>
          <div class="field">
            <label for="pf-opis">Opis</label>
            <textarea id="pf-opis" v-model="opisField" rows="4" placeholder="Opis projektu" />
          </div>
          <div class="actions">
            <button type="button" class="btn btn-secondary" @click="close">Anuluj</button>
            <button type="submit" class="btn btn-primary">
              {{ isEditing() ? 'Zapisz' : 'Dodaj' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mm-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
}

.mm-panel {
  width: 100%;
  max-width: 420px;
  max-height: min(90vh, 640px);
  overflow: auto;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.mm-panel h2 {
  margin: 0 0 20px;
  font-size: 20px;
}

.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-h);
  margin-bottom: 6px;
}

.field input,
.field textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
  color: var(--text-h);
  background: var(--code-bg);
  box-sizing: border-box;
}

.field textarea {
  resize: vertical;
  min-height: 80px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-secondary {
  background: var(--code-bg);
  color: var(--text-h);
}
</style>
