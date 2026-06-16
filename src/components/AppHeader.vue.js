/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { onMounted, ref } from 'vue';
import { currentUserService } from '../services/currentUserService';
import { unreadNotificationCount } from '../services/notificationService';
import { useActiveProject } from '../composables/useActiveProject';
import { projectsApi } from '../api/projectsApi';
const { activeProjectId, setActiveProject, initActiveProject } = useActiveProject();
const theme = defineModel('theme', { required: true });
const emit = defineEmits();
const projects = ref([]);
onMounted(async () => {
    await initActiveProject();
    projects.value = await projectsApi.getAll();
});
const userFullName = currentUserService.fullName;
const userRole = currentUserService.user.rola;
function selectProject(event) {
    const value = event.target.value;
    const id = value === '' ? null : value;
    setActiveProject(id);
}
let __VLS_modelEmit;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "navbar navbar-expand-lg border-bottom bg-body-tertiary px-3" },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-expand-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-body-tertiary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container-fluid" },
});
/** @type {__VLS_StyleScopedClasses['container-fluid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "navbar-brand mb-0 h1" },
});
/** @type {__VLS_StyleScopedClasses['navbar-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-items-center gap-2 flex-wrap ms-auto" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ms-auto']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('open-notifications');
            // @ts-ignore
            [emit,];
        } },
    type: "button",
    ...{ class: "btn btn-link py-1 px-2" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-link']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-items-center gap-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "project-select",
    ...{ class: "form-label mb-0 small text-body-secondary" },
});
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['small']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    ...{ onChange: (__VLS_ctx.selectProject) },
    id: "project-select",
    ...{ class: "form-select" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    selected: (!__VLS_ctx.activeProjectId),
    value: "",
});
for (const [p] of __VLS_vFor((__VLS_ctx.projects))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (p.id),
        value: (p.id),
        selected: (p.id === __VLS_ctx.activeProjectId),
    });
    (p.nazwa);
    // @ts-ignore
    [selectProject, activeProjectId, activeProjectId, projects,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    value: (__VLS_ctx.theme),
    ...{ class: "form-select" },
    ...{ style: {} },
    'aria-label': "Motyw",
});
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "system",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "light",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "dark",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('manage-projects');
            // @ts-ignore
            [emit, theme,];
        } },
    ...{ class: "btn btn-outline-primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-items-center gap-2 flex-wrap" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('open-notifications');
            // @ts-ignore
            [emit,];
        } },
    type: "button",
    ...{ class: "btn btn-sm" },
    ...{ class: (__VLS_ctx.unreadNotificationCount > 0 ? 'btn-outline-danger' : 'btn-outline-secondary') },
    title: "Otwórz powiadomienia",
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "small" },
});
/** @type {__VLS_StyleScopedClasses['small']} */ ;
(__VLS_ctx.userFullName);
if (__VLS_ctx.unreadNotificationCount > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge text-bg-danger ms-1" },
    });
    /** @type {__VLS_StyleScopedClasses['badge']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-bg-danger']} */ ;
    /** @type {__VLS_StyleScopedClasses['ms-1']} */ ;
    (__VLS_ctx.unreadNotificationCount);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "badge text-bg-secondary" },
});
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bg-secondary']} */ ;
(__VLS_ctx.userRole);
// @ts-ignore
[unreadNotificationCount, unreadNotificationCount, unreadNotificationCount, userFullName, userRole,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
