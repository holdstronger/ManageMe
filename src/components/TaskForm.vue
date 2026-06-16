<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Priorytet } from '../types/historyjka'
import type { Task } from '../types/task'
import type { Historyjka } from '../types/historyjka'

const props = defineProps<{
  modelValue: boolean
  historyjki: Historyjka[]
  task?: Task | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (
    e: 'submit',
    payload: {
      nazwa: string
      opis: string
      priorytet: Priorytet
      historyjkaId: string
      przewidywanyCzasGodziny: number
      zrealizowaneRoboczogodziny: number
    }
  ): void
}>()

const nazwaField = ref('')
const opisField = ref('')
const priorytetField = ref<Priorytet>('średni')
const historyjkaIdField = ref('')
const przewidywanyCzasGodzinyField = ref(1)
const zrealizowaneRoboczogodzinyField = ref(0)

watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    if (props.task) {
      nazwaField.value = props.task.nazwa
      opisField.value = props.task.opis
      priorytetField.value = props.task.priorytet
      historyjkaIdField.value = props.task.historyjkaId
      przewidywanyCzasGodzinyField.value = props.task.przewidywanyCzasGodziny
      zrealizowaneRoboczogodzinyField.value = props.task.zrealizowaneRoboczogodziny
    } else {
      nazwaField.value = ''
      opisField.value = ''
      priorytetField.value = 'średni'
      historyjkaIdField.value = props.historyjki[0]?.id ?? ''
      przewidywanyCzasGodzinyField.value = 1
      zrealizowaneRoboczogodzinyField.value = 0
    }
  },
  { immediate: true }
)

function close() {
  emit('update:modelValue', false)
}

function handleSubmit() {
  if (!nazwaField.value.trim() || !historyjkaIdField.value) return

  emit('submit', {
    nazwa: nazwaField.value.trim(),
    opis: opisField.value.trim(),
    priorytet: priorytetField.value,
    historyjkaId: historyjkaIdField.value,
    przewidywanyCzasGodziny: Math.max(1, przewidywanyCzasGodzinyField.value),
    zrealizowaneRoboczogodziny: Math.max(0, zrealizowaneRoboczogodzinyField.value),
  })
  close()
}

const isEditing = () => !!props.task
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
        <h2>{{ isEditing() ? 'Edytuj zadanie' : 'Nowe zadanie' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="tf-nazwa">Nazwa</label>
            <input id="tf-nazwa" v-model="nazwaField" type="text" required />
          </div>
          <div class="field">
            <label for="tf-opis">Opis</label>
            <textarea id="tf-opis" v-model="opisField" rows="3" />
          </div>
          <div class="grid">
            <div class="field">
              <label for="tf-priorytet">Priorytet</label>
              <select id="tf-priorytet" v-model="priorytetField">
                <option value="niski">Niski</option>
                <option value="średni">Średni</option>
                <option value="wysoki">Wysoki</option>
              </select>
            </div>
            <div class="field">
              <label for="tf-story">Historyjka</label>
              <select id="tf-story" v-model="historyjkaIdField" required>
                <option v-for="h in historyjki" :key="h.id" :value="h.id">
                  {{ h.nazwa }}
                </option>
              </select>
            </div>
          </div>
          <div class="grid">
            <div class="field">
              <label for="tf-est">Przewidywany czas [h]</label>
              <input id="tf-est" v-model.number="przewidywanyCzasGodzinyField" type="number" min="1" step="1" />
            </div>
            <div class="field">
              <label for="tf-work">Zrealizowane roboczogodziny</label>
              <input id="tf-work" v-model.number="zrealizowaneRoboczogodzinyField" type="number" min="0" step="1" />
            </div>
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
  max-width: 560px;
  max-height: min(90vh, 720px);
  overflow: auto;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.mm-panel h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

.field {
  margin-bottom: 12px;
  text-align: left;
}

.field label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--text-h);
}

.field input,
.field textarea,
.field select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--code-bg);
  color: var(--text-h);
  font: inherit;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
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
