/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, onMounted, ref, watch } from 'vue';
import TaskForm from './TaskForm.vue';
import { tasksApi } from '../api/tasksApi';
import { usersApi } from '../api/usersApi';
import { notifyNewTaskInStory, notifyTaskAssigned, notifyTaskRemovedFromStory, notifyTaskStatusDoing, notifyTaskStatusDone, } from '../services/appNotifications';
const props = defineProps();
const emit = defineEmits();
const tasks = ref([]);
const assignableUsers = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingTask = ref(null);
const selectedTask = ref(null);
const assigneeId = ref('');
const tasksByState = computed(() => ({
    todo: tasks.value.filter((task) => task.stan === 'todo'),
    doing: tasks.value.filter((task) => task.stan === 'doing'),
    done: tasks.value.filter((task) => task.stan === 'done'),
}));
const storyMap = computed(() => new Map(props.historyjki.map((h) => [h.id, h])));
const userMap = computed(() => new Map(assignableUsers.value.map((u) => [u.id, u])));
watch(() => props.projectId, () => {
    loadTasks();
}, { immediate: true });
onMounted(async () => {
    assignableUsers.value = await usersApi.getAssignableUsers();
});
async function loadTasks() {
    if (!props.projectId) {
        tasks.value = [];
        loading.value = false;
        return;
    }
    loading.value = true;
    try {
        tasks.value = await tasksApi.getByProject(props.projectId);
    }
    finally {
        loading.value = false;
    }
}
function openCreate() {
    editingTask.value = null;
    showForm.value = true;
}
function openEdit(task) {
    editingTask.value = task;
    showForm.value = true;
}
function openDetails(task) {
    selectedTask.value = task;
    assigneeId.value = task.odpowiedzialnyUżytkownikId ?? '';
}
function closeDetails() {
    selectedTask.value = null;
    assigneeId.value = '';
}
async function saveTask(data) {
    if (editingTask.value) {
        const updated = await tasksApi.update(editingTask.value.id, data);
        if (updated)
            replaceTask(updated);
    }
    else {
        const created = await tasksApi.create({
            ...data,
            projektId: props.projectId,
        });
        tasks.value.push(created);
        const story = storyMap.value.get(created.historyjkaId);
        if (story) {
            notifyNewTaskInStory(created, story, story.właściciel);
        }
    }
}
async function removeTask(task) {
    if (!confirm(`Usunąć zadanie "${task.nazwa}"?`))
        return;
    const story = storyMap.value.get(task.historyjkaId);
    const ownerId = story?.właściciel;
    const ok = await tasksApi.delete(task.id);
    if (!ok)
        return;
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
    if (selectedTask.value?.id === task.id)
        closeDetails();
    if (ownerId) {
        notifyTaskRemovedFromStory(task.nazwa, story, ownerId);
    }
    emit('refresh-historyjki');
}
async function assignTask() {
    if (!selectedTask.value || !assigneeId.value)
        return;
    const beforeStan = selectedTask.value.stan;
    const updated = await tasksApi.assignUser(selectedTask.value.id, assigneeId.value);
    if (!updated)
        return;
    replaceTask(updated);
    selectedTask.value = updated;
    const story = storyMap.value.get(updated.historyjkaId);
    notifyTaskAssigned(updated, story, assigneeId.value);
    if (beforeStan === 'todo' && updated.stan === 'doing' && story?.właściciel) {
        notifyTaskStatusDoing(updated, story, story.właściciel);
    }
    emit('refresh-historyjki');
}
async function markDone() {
    if (!selectedTask.value)
        return;
    const story = storyMap.value.get(selectedTask.value.historyjkaId);
    const updated = await tasksApi.markDone(selectedTask.value.id);
    if (!updated)
        return;
    replaceTask(updated);
    selectedTask.value = updated;
    if (story?.właściciel) {
        notifyTaskStatusDone(updated, story, story.właściciel);
    }
    emit('refresh-historyjki');
}
function replaceTask(task) {
    const index = tasks.value.findIndex((item) => item.id === task.id);
    if (index !== -1) {
        tasks.value[index] = task;
    }
}
function formatDate(date) {
    if (!date)
        return '—';
    return new Date(date).toLocaleString('pl-PL');
}
function priorityLabel(priority) {
    return priority === 'wysoki' ? 'Wysoki' : priority === 'średni' ? 'Średni' : 'Niski';
}
function stateLabel(state) {
    if (state === 'todo')
        return 'Do zrobienia';
    if (state === 'doing')
        return 'W trakcie';
    return 'Zakończone';
}
function userLabel(userId) {
    if (!userId)
        return 'Nieprzypisane';
    const user = userMap.value.get(userId);
    return user ? `${user.imię} ${user.nazwisko} (${user.rola})` : 'Nieznany użytkownik';
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['details']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['actions-row']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "tasks" },
});
/** @type {__VLS_StyleScopedClasses['tasks']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "tasks-header" },
});
/** @type {__VLS_StyleScopedClasses['tasks-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.openCreate) },
    ...{ class: "btn btn-primary" },
    disabled: (__VLS_ctx.historyjki.length === 0),
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
if (__VLS_ctx.historyjki.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
else if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "kanban" },
    });
    /** @type {__VLS_StyleScopedClasses['kanban']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "column" },
    });
    /** @type {__VLS_StyleScopedClasses['column']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [task] of __VLS_vFor((__VLS_ctx.tasksByState.todo))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.historyjki.length === 0))
                        return;
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.openDetails(task);
                    // @ts-ignore
                    [openCreate, historyjki, historyjki, loading, tasksByState, openDetails,];
                } },
            key: (task.id),
            ...{ class: "card" },
        });
        /** @type {__VLS_StyleScopedClasses['card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (task.nazwa);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.storyMap.get(task.historyjkaId)?.nazwa ?? 'Brak historyjki');
        // @ts-ignore
        [storyMap,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "column" },
    });
    /** @type {__VLS_StyleScopedClasses['column']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [task] of __VLS_vFor((__VLS_ctx.tasksByState.doing))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.historyjki.length === 0))
                        return;
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.openDetails(task);
                    // @ts-ignore
                    [tasksByState, openDetails,];
                } },
            key: (task.id),
            ...{ class: "card" },
        });
        /** @type {__VLS_StyleScopedClasses['card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (task.nazwa);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.userLabel(task.odpowiedzialnyUżytkownikId));
        // @ts-ignore
        [userLabel,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "column" },
    });
    /** @type {__VLS_StyleScopedClasses['column']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [task] of __VLS_vFor((__VLS_ctx.tasksByState.done))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.historyjki.length === 0))
                        return;
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.openDetails(task);
                    // @ts-ignore
                    [tasksByState, openDetails,];
                } },
            key: (task.id),
            ...{ class: "card" },
        });
        /** @type {__VLS_StyleScopedClasses['card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (task.nazwa);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.formatDate(task.dataZakończenia));
        // @ts-ignore
        [formatDate,];
    }
}
const __VLS_0 = TaskForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    historyjki: (__VLS_ctx.historyjki),
    task: (__VLS_ctx.editingTask),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    historyjki: (__VLS_ctx.historyjki),
    task: (__VLS_ctx.editingTask),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.saveTask) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.dialog, __VLS_intrinsics.dialog)({
    ...{ onClose: (__VLS_ctx.closeDetails) },
    ...{ onCancel: (__VLS_ctx.closeDetails) },
    open: (!!__VLS_ctx.selectedTask),
    ...{ class: "details" },
});
/** @type {__VLS_StyleScopedClasses['details']} */ ;
if (__VLS_ctx.selectedTask) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "details-content" },
    });
    /** @type {__VLS_StyleScopedClasses['details-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "details-header" },
    });
    /** @type {__VLS_StyleScopedClasses['details-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.selectedTask.nazwa);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.closeDetails) },
        ...{ class: "btn-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (__VLS_ctx.selectedTask.opis || 'Brak opisu');
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "meta" },
    });
    /** @type {__VLS_StyleScopedClasses['meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.stateLabel(__VLS_ctx.selectedTask.stan));
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.priorityLabel(__VLS_ctx.selectedTask.priorytet));
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.storyMap.get(__VLS_ctx.selectedTask.historyjkaId)?.nazwa ?? 'Brak');
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.formatDate(__VLS_ctx.selectedTask.dataStartu));
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.formatDate(__VLS_ctx.selectedTask.dataZakończenia));
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.selectedTask.przewidywanyCzasGodziny);
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.selectedTask.zrealizowaneRoboczogodziny);
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.userLabel(__VLS_ctx.selectedTask.odpowiedzialnyUżytkownikId));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "actions-row" },
    });
    /** @type {__VLS_StyleScopedClasses['actions-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
        value: (__VLS_ctx.assigneeId),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        disabled: true,
        value: "",
    });
    for (const [user] of __VLS_vFor((__VLS_ctx.assignableUsers))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            key: (user.id),
            value: (user.id),
        });
        (user.imię);
        (user.nazwisko);
        (user.rola);
        // @ts-ignore
        [historyjki, storyMap, userLabel, formatDate, formatDate, showForm, editingTask, saveTask, closeDetails, closeDetails, closeDetails, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, selectedTask, stateLabel, priorityLabel, assigneeId, assignableUsers,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.assignTask) },
        ...{ class: "btn btn-secondary" },
        disabled: (!__VLS_ctx.assigneeId),
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.markDone) },
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.selectedTask.stan === 'done' || !__VLS_ctx.selectedTask.odpowiedzialnyUżytkownikId),
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "actions-row" },
    });
    /** @type {__VLS_StyleScopedClasses['actions-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedTask))
                    return;
                __VLS_ctx.openEdit(__VLS_ctx.selectedTask);
                // @ts-ignore
                [selectedTask, selectedTask, selectedTask, assigneeId, assignTask, markDone, openEdit,];
            } },
        ...{ class: "btn btn-secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedTask))
                    return;
                __VLS_ctx.removeTask(__VLS_ctx.selectedTask);
                // @ts-ignore
                [selectedTask, removeTask,];
            } },
        ...{ class: "btn btn-danger" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-danger']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
