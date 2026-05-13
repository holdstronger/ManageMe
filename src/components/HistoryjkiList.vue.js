/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, watch, onMounted } from 'vue';
import { historyjkiApi } from '../api/historyjkiApi';
import { currentUserService } from '../services/currentUserService';
import HistoryjkaForm from './HistoryjkaForm.vue';
import TasksBoard from './TasksBoard.vue';
const props = defineProps();
const historyjki = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingHistoryjka = ref(null);
const filterStan = ref('all');
const STANY = [
    { value: 'all', label: 'Wszystkie' },
    { value: 'todo', label: 'Do zrobienia' },
    { value: 'doing', label: 'W trakcie' },
    { value: 'done', label: 'Zamknięte' },
];
const filteredHistoryjki = computed(() => {
    const list = historyjki.value;
    if (filterStan.value === 'all')
        return list;
    return list.filter((h) => h.stan === filterStan.value);
});
const todo = computed(() => historyjki.value.filter((h) => h.stan === 'todo'));
const doing = computed(() => historyjki.value.filter((h) => h.stan === 'doing'));
const done = computed(() => historyjki.value.filter((h) => h.stan === 'done'));
watch(() => props.projectId, () => loadHistoryjki(), { immediate: true });
onMounted(loadHistoryjki);
async function loadHistoryjki() {
    if (!props.projectId) {
        historyjki.value = [];
        loading.value = false;
        return;
    }
    loading.value = true;
    try {
        historyjki.value = await historyjkiApi.getByProject(props.projectId);
    }
    finally {
        loading.value = false;
    }
}
function openCreate() {
    editingHistoryjka.value = null;
    showForm.value = true;
}
function openEdit(h) {
    editingHistoryjka.value = h;
    showForm.value = true;
}
async function handleSubmit(data) {
    try {
        if (editingHistoryjka.value) {
            const updated = await historyjkiApi.update(editingHistoryjka.value.id, data);
            if (updated) {
                const i = historyjki.value.findIndex((h) => h.id === updated.id);
                if (i !== -1)
                    historyjki.value[i] = updated;
            }
        }
        else {
            const created = await historyjkiApi.create({
                ...data,
                projekt: props.projectId,
                właściciel: currentUserService.user.id,
            });
            historyjki.value.push(created);
        }
    }
    catch (e) {
        console.error('Błąd zapisu:', e);
    }
}
async function remove(h) {
    if (!confirm(`Usunąć historyjkę „${h.nazwa}"?`))
        return;
    const ok = await historyjkiApi.delete(h.id);
    if (ok) {
        historyjki.value = historyjki.value.filter((x) => x.id !== h.id);
    }
}
function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
function priorytetLabel(p) {
    const map = {
        niski: 'Niski',
        średni: 'Średni',
        wysoki: 'Wysoki',
    };
    return map[p] ?? p;
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "historyjki-list" },
});
/** @type {__VLS_StyleScopedClasses['historyjki-list']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "header" },
});
/** @type {__VLS_StyleScopedClasses['header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "toolbar" },
});
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    value: (__VLS_ctx.filterStan),
    ...{ class: "filter-select" },
});
/** @type {__VLS_StyleScopedClasses['filter-select']} */ ;
for (const [s] of __VLS_vFor((__VLS_ctx.STANY))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (s.value),
        value: (s.value),
    });
    (s.label);
    // @ts-ignore
    [filterStan, STANY,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.openCreate) },
    ...{ class: "btn btn-primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading" },
    });
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
}
else if (!__VLS_ctx.projectId) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
else if (__VLS_ctx.filteredHistoryjki.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sections" },
    });
    /** @type {__VLS_StyleScopedClasses['sections']} */ ;
    if (__VLS_ctx.filterStan === 'all') {
        if (__VLS_ctx.todo.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
                ...{ class: "section" },
            });
            /** @type {__VLS_StyleScopedClasses['section']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                ...{ class: "section-title" },
            });
            /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "cards" },
            });
            /** @type {__VLS_StyleScopedClasses['cards']} */ ;
            for (const [h] of __VLS_vFor((__VLS_ctx.todo))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    key: (h.id),
                    ...{ class: "card" },
                });
                /** @type {__VLS_StyleScopedClasses['card']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-body" },
                });
                /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-meta" },
                });
                /** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "badge" },
                    ...{ class: ('priorytet-' + h.priorytet) },
                });
                /** @type {__VLS_StyleScopedClasses['badge']} */ ;
                (__VLS_ctx.priorytetLabel(h.priorytet));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "date" },
                });
                /** @type {__VLS_StyleScopedClasses['date']} */ ;
                (__VLS_ctx.formatDate(h.dataUtworzenia));
                __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
                    ...{ class: "card-title" },
                });
                /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
                (h.nazwa);
                if (h.opis) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                        ...{ class: "card-desc" },
                    });
                    /** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
                    (h.opis);
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-actions" },
                });
                /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.todo.length))
                                return;
                            __VLS_ctx.openEdit(h);
                            // @ts-ignore
                            [filterStan, openCreate, loading, projectId, filteredHistoryjki, todo, todo, priorytetLabel, formatDate, openEdit,];
                        } },
                    ...{ class: "btn btn-icon" },
                    title: "Edytuj",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.todo.length))
                                return;
                            __VLS_ctx.remove(h);
                            // @ts-ignore
                            [remove,];
                        } },
                    ...{ class: "btn btn-icon btn-danger" },
                    title: "Usuń",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-danger']} */ ;
                // @ts-ignore
                [];
            }
        }
        if (__VLS_ctx.doing.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
                ...{ class: "section" },
            });
            /** @type {__VLS_StyleScopedClasses['section']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                ...{ class: "section-title" },
            });
            /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "cards" },
            });
            /** @type {__VLS_StyleScopedClasses['cards']} */ ;
            for (const [h] of __VLS_vFor((__VLS_ctx.doing))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    key: (h.id),
                    ...{ class: "card" },
                });
                /** @type {__VLS_StyleScopedClasses['card']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-body" },
                });
                /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-meta" },
                });
                /** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "badge" },
                    ...{ class: ('priorytet-' + h.priorytet) },
                });
                /** @type {__VLS_StyleScopedClasses['badge']} */ ;
                (__VLS_ctx.priorytetLabel(h.priorytet));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "date" },
                });
                /** @type {__VLS_StyleScopedClasses['date']} */ ;
                (__VLS_ctx.formatDate(h.dataUtworzenia));
                __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
                    ...{ class: "card-title" },
                });
                /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
                (h.nazwa);
                if (h.opis) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                        ...{ class: "card-desc" },
                    });
                    /** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
                    (h.opis);
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-actions" },
                });
                /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.doing.length))
                                return;
                            __VLS_ctx.openEdit(h);
                            // @ts-ignore
                            [priorytetLabel, formatDate, openEdit, doing, doing,];
                        } },
                    ...{ class: "btn btn-icon" },
                    title: "Edytuj",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.doing.length))
                                return;
                            __VLS_ctx.remove(h);
                            // @ts-ignore
                            [remove,];
                        } },
                    ...{ class: "btn btn-icon btn-danger" },
                    title: "Usuń",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-danger']} */ ;
                // @ts-ignore
                [];
            }
        }
        if (__VLS_ctx.done.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
                ...{ class: "section" },
            });
            /** @type {__VLS_StyleScopedClasses['section']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                ...{ class: "section-title" },
            });
            /** @type {__VLS_StyleScopedClasses['section-title']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "cards" },
            });
            /** @type {__VLS_StyleScopedClasses['cards']} */ ;
            for (const [h] of __VLS_vFor((__VLS_ctx.done))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                    key: (h.id),
                    ...{ class: "card" },
                });
                /** @type {__VLS_StyleScopedClasses['card']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-body" },
                });
                /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-meta" },
                });
                /** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "badge" },
                    ...{ class: ('priorytet-' + h.priorytet) },
                });
                /** @type {__VLS_StyleScopedClasses['badge']} */ ;
                (__VLS_ctx.priorytetLabel(h.priorytet));
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "date" },
                });
                /** @type {__VLS_StyleScopedClasses['date']} */ ;
                (__VLS_ctx.formatDate(h.dataUtworzenia));
                __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
                    ...{ class: "card-title" },
                });
                /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
                (h.nazwa);
                if (h.opis) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                        ...{ class: "card-desc" },
                    });
                    /** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
                    (h.opis);
                }
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "card-actions" },
                });
                /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.done.length))
                                return;
                            __VLS_ctx.openEdit(h);
                            // @ts-ignore
                            [priorytetLabel, formatDate, openEdit, done, done,];
                        } },
                    ...{ class: "btn btn-icon" },
                    title: "Edytuj",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading))
                                return;
                            if (!!(!__VLS_ctx.projectId))
                                return;
                            if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                                return;
                            if (!(__VLS_ctx.filterStan === 'all'))
                                return;
                            if (!(__VLS_ctx.done.length))
                                return;
                            __VLS_ctx.remove(h);
                            // @ts-ignore
                            [remove,];
                        } },
                    ...{ class: "btn btn-icon btn-danger" },
                    title: "Usuń",
                });
                /** @type {__VLS_StyleScopedClasses['btn']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
                /** @type {__VLS_StyleScopedClasses['btn-danger']} */ ;
                // @ts-ignore
                [];
            }
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "section" },
        });
        /** @type {__VLS_StyleScopedClasses['section']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "cards" },
        });
        /** @type {__VLS_StyleScopedClasses['cards']} */ ;
        for (const [h] of __VLS_vFor((__VLS_ctx.filteredHistoryjki))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                key: (h.id),
                ...{ class: "card" },
            });
            /** @type {__VLS_StyleScopedClasses['card']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "card-body" },
            });
            /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "card-meta" },
            });
            /** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "badge" },
                ...{ class: ('priorytet-' + h.priorytet) },
            });
            /** @type {__VLS_StyleScopedClasses['badge']} */ ;
            (__VLS_ctx.priorytetLabel(h.priorytet));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "date" },
            });
            /** @type {__VLS_StyleScopedClasses['date']} */ ;
            (__VLS_ctx.formatDate(h.dataUtworzenia));
            __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
                ...{ class: "card-title" },
            });
            /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
            (h.nazwa);
            if (h.opis) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                    ...{ class: "card-desc" },
                });
                /** @type {__VLS_StyleScopedClasses['card-desc']} */ ;
                (h.opis);
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "card-actions" },
            });
            /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(!__VLS_ctx.projectId))
                            return;
                        if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                            return;
                        if (!!(__VLS_ctx.filterStan === 'all'))
                            return;
                        __VLS_ctx.openEdit(h);
                        // @ts-ignore
                        [filteredHistoryjki, priorytetLabel, formatDate, openEdit,];
                    } },
                ...{ class: "btn btn-icon" },
                title: "Edytuj",
            });
            /** @type {__VLS_StyleScopedClasses['btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(!__VLS_ctx.projectId))
                            return;
                        if (!!(__VLS_ctx.filteredHistoryjki.length === 0))
                            return;
                        if (!!(__VLS_ctx.filterStan === 'all'))
                            return;
                        __VLS_ctx.remove(h);
                        // @ts-ignore
                        [remove,];
                    } },
                ...{ class: "btn btn-icon btn-danger" },
                title: "Usuń",
            });
            /** @type {__VLS_StyleScopedClasses['btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
            /** @type {__VLS_StyleScopedClasses['btn-danger']} */ ;
            // @ts-ignore
            [];
        }
    }
}
const __VLS_0 = HistoryjkaForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    historyjka: (__VLS_ctx.editingHistoryjka),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    historyjka: (__VLS_ctx.editingHistoryjka),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleSubmit) });
var __VLS_3;
var __VLS_4;
if (__VLS_ctx.projectId) {
    const __VLS_7 = TasksBoard;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onRefreshHistoryjki': {} },
        projectId: (__VLS_ctx.projectId),
        historyjki: (__VLS_ctx.historyjki),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onRefreshHistoryjki': {} },
        projectId: (__VLS_ctx.projectId),
        historyjki: (__VLS_ctx.historyjki),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = ({ refreshHistoryjki: {} },
        { onRefreshHistoryjki: (__VLS_ctx.loadHistoryjki) });
    var __VLS_10;
    var __VLS_11;
}
// @ts-ignore
[projectId, projectId, showForm, editingHistoryjka, handleSubmit, historyjki, loadHistoryjki,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
