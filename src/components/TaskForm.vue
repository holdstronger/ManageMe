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

const nazwa = ref('')
const opis = ref('')
const priorytet = ref<Priorytet>('średni')
const historyjkaId = ref('')
const przewidywanyCzasGodziny = ref(1)
const zrealizowaneRoboczogodziny = ref(0)
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      if (props.task) {
        nazwa.value = props.task.nazwa
        opis.value = props.task.opis
        priorytet.value = props.task.priorytet
        historyjkaId.value = props.task.historyjkaId
        przewidywanyCzasGodziny.value = props.task.przewidywanyCzasGodziny
        zrealizowaneRoboczogodziny.value = props.task.zrealizowaneRoboczogodziny
      } else {
        nazwa.value = ''
        opis.value = ''
        priorytet.value = 'średni'
        historyjkaId.value = props.historyjki[0]?.id ?? ''
        przewidywanyCzasGodziny.value = 1
        zrealizowaneRoboczogodziny.value = 0
      }
      dialogRef.value?.showModal()
    } else {
      dialogRef.value?.close()
    }
  },
  { immediate: true }
)

function close() {
  emit('update:modelValue', false)
}

function handleSubmit() {
  if (!nazwa.value.trim() || !historyjkaId.value) return

  emit('submit', {
    nazwa: nazwa.value.trim(),
    opis: opis.value.trim(),
    priorytet: priorytet.value,
    historyjkaId: historyjkaId.value,
    przewidywanyCzasGodziny: Math.max(1, przewidywanyCzasGodziny.value),
    zrealizowaneRoboczogodziny: Math.max(0, zrealizowaneRoboczogodziny.value),
  })
  close()
}

const isEditing = () => !!props.task
</script>

<template>
  <dialog ref="dialogRef" class="modal" @cancel="close" @close="emit('update:modelValue', false)">
    <div class="modal-content">
      <h2>{{ isEditing() ? 'Edytuj zadanie' : 'Nowe zadanie' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="t-nazwa">Nazwa</label>
          <input id="t-nazwa" v-model="nazwa" type="text" required />
        </div>
        <div class="field">
          <label for="t-opis">Opis</label>
          <textarea id="t-opis" v-model="opis" rows="3" />
        </div>
        <div class="grid">
          <div class="field">
            <label for="t-priorytet">Priorytet</label>
            <select id="t-priorytet" v-model="priorytet">
              <option value="niski">Niski</option>
              <option value="średni">Średni</option>
              <option value="wysoki">Wysoki</option>
            </select>
          </div>
          <div class="field">
            <label for="t-story">Historyjka</label>
            <select id="t-story" v-model="historyjkaId" required>
              <option v-for="h in historyjki" :key="h.id" :value="h.id">
                {{ h.nazwa }}
              </option>
            </select>
          </div>
        </div>
        <div class="grid">
          <div class="field">
            <label for="t-est">Przewidywany czas [h]</label>
            <input id="t-est" v-model.number="przewidywanyCzasGodziny" type="number" min="1" step="1" />
          </div>
          <div class="field">
            <label for="t-work">Zrealizowane roboczogodziny</label>
            <input id="t-work" v-model.number="zrealizowaneRoboczogodziny" type="number" min="0" step="1" />
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
  </dialog>
</template>

<style scoped>
.modal { border: none; border-radius: 12px; padding: 0; max-width: 560px; width: 90vw; box-shadow: var(--shadow); }
.modal::backdrop { background: rgba(0, 0, 0, 0.4); }
.modal-content { padding: 24px; }
.field { margin-bottom: 12px; text-align: left; }
.field label { display: block; font-size: 14px; margin-bottom: 6px; color: var(--text-h); }
.field input, .field textarea, .field select { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--code-bg); color: var(--text-h); font: inherit; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.actions { margin-top: 16px; display: flex; justify-content: flex-end; gap: 10px; }
.btn { padding: 10px 18px; border: none; border-radius: 8px; font: inherit; cursor: pointer; }
.btn-primary { background: var(--accent); color: white; }
.btn-secondary { background: var(--code-bg); color: var(--text-h); }
</style>
