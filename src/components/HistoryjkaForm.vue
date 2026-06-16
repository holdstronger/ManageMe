<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Historyjka, Priorytet, StanHistoryjki } from '../types/historyjka'

const PRIORYTETY: { value: Priorytet; label: string }[] = [
  { value: 'niski', label: 'Niski' },
  { value: 'średni', label: 'Średni' },
  { value: 'wysoki', label: 'Wysoki' },
]

const STANY: { value: StanHistoryjki; label: string }[] = [
  { value: 'todo', label: 'Do zrobienia' },
  { value: 'doing', label: 'W trakcie' },
  { value: 'done', label: 'Zamknięte' },
]

const props = defineProps<{
  modelValue: boolean
  historyjka?: Historyjka | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { nazwa: string; opis: string; priorytet: Priorytet; stan: StanHistoryjki }): void
}>()

const nazwaField = ref('')
const opisField = ref('')
const priorytetField = ref<Priorytet>('średni')
const stanField = ref<StanHistoryjki>('todo')

watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    if (props.historyjka) {
      nazwaField.value = props.historyjka.nazwa
      opisField.value = props.historyjka.opis
      priorytetField.value = props.historyjka.priorytet
      stanField.value = props.historyjka.stan
    } else {
      nazwaField.value = ''
      opisField.value = ''
      priorytetField.value = 'średni'
      stanField.value = 'todo'
    }
  },
  { immediate: true }
)

const isEditing = () => !!props.historyjka

function handleSubmit() {
  if (!nazwaField.value.trim()) return
  emit('submit', {
    nazwa: nazwaField.value.trim(),
    opis: opisField.value.trim(),
    priorytet: priorytetField.value,
    stan: stanField.value,
  })
  emit('update:modelValue', false)
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="mm-overlay" role="presentation" @click.self="close">
      <div
        class="mm-panel"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @click.stop
        @keydown.esc.prevent="close"
      >
        <h2>{{ isEditing() ? 'Edytuj historyjkę' : 'Nowa historyjka' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="hf-nazwa">Nazwa</label>
            <input
              id="hf-nazwa"
              v-model="nazwaField"
              type="text"
              required
              placeholder="Nazwa historyjki"
              autocomplete="off"
            />
          </div>
          <div class="field">
            <label for="hf-opis">Opis</label>
            <textarea id="hf-opis" v-model="opisField" rows="4" placeholder="Opis" />
          </div>
          <div class="field">
            <label for="hf-priorytet">Priorytet</label>
            <select id="hf-priorytet" v-model="priorytetField">
              <option v-for="p in PRIORYTETY" :key="p.value" :value="p.value">
                {{ p.label }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="hf-stan">Stan</label>
            <select id="hf-stan" v-model="stanField">
              <option v-for="s in STANY" :key="s.value" :value="s.value">
                {{ s.label }}
              </option>
            </select>
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
.field textarea,
.field select {
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
