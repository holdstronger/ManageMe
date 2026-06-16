/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { projectsApi } from '../api/projectsApi';
import ProjectForm from './ProjectForm.vue';
import { notifyProjectCreated } from '../services/appNotifications';
const projects = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingProject = ref(null);
onMounted(loadProjects);
async function loadProjects() {
    loading.value = true;
    try {
        projects.value = await projectsApi.getAll();
    }
    finally {
        loading.value = false;
    }
}
function openCreate() {
    editingProject.value = null;
    showForm.value = true;
}
function openEdit(project) {
    editingProject.value = project;
    showForm.value = true;
}
async function handleSubmit(data) {
    try {
        if (editingProject.value) {
            const updated = await projectsApi.update(editingProject.value.id, data);
            if (updated) {
                const i = projects.value.findIndex((p) => p.id === updated.id);
                if (i !== -1)
                    projects.value[i] = updated;
            }
        }
        else {
            const created = await projectsApi.create(data);
            projects.value.push(created);
            await notifyProjectCreated(created.nazwa);
        }
    }
    catch (e) {
        console.error('Błąd zapisu:', e);
    }
}
async function remove(project) {
    if (!confirm(`Czy na pewno usunąć projekt „${project.nazwa}"?`))
        return;
    const ok = await projectsApi.delete(project.id);
    if (ok) {
        projects.value = projects.value.filter((p) => p.id !== project.id);
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "mb-1" },
});
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-body-secondary mb-0" },
});
/** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.openCreate) },
    ...{ class: "btn btn-primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert alert-secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['alert']} */ ;
    /** @type {__VLS_StyleScopedClasses['alert-secondary']} */ ;
}
else if (__VLS_ctx.projects.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert alert-light border" },
    });
    /** @type {__VLS_StyleScopedClasses['alert']} */ ;
    /** @type {__VLS_StyleScopedClasses['alert-light']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "vstack gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['vstack']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    for (const [p] of __VLS_vFor((__VLS_ctx.projects))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (p.id),
            ...{ class: "card shadow-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['card']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-body d-flex justify-content-between gap-3" },
        });
        /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.h5, __VLS_intrinsics.h5)({
            ...{ class: "card-title mb-1" },
        });
        /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
        (p.nazwa);
        if (p.opis) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "card-text text-body-secondary" },
            });
            /** @type {__VLS_StyleScopedClasses['card-text']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
            (p.opis);
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "btn-group" },
        });
        /** @type {__VLS_StyleScopedClasses['btn-group']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.projects.length === 0))
                        return;
                    __VLS_ctx.openEdit(p);
                    // @ts-ignore
                    [openCreate, loading, projects, projects, openEdit,];
                } },
            ...{ class: "btn btn-outline-secondary" },
            title: "Edytuj",
        });
        /** @type {__VLS_StyleScopedClasses['btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.projects.length === 0))
                        return;
                    __VLS_ctx.remove(p);
                    // @ts-ignore
                    [remove,];
                } },
            ...{ class: "btn btn-outline-danger" },
            title: "Usuń",
        });
        /** @type {__VLS_StyleScopedClasses['btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
        // @ts-ignore
        [];
    }
}
const __VLS_0 = ProjectForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    project: (__VLS_ctx.editingProject),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.showForm),
    project: (__VLS_ctx.editingProject),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleSubmit) });
var __VLS_3;
var __VLS_4;
// @ts-ignore
[showForm, editingProject, handleSubmit,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
