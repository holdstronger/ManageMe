/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, onMounted, ref, watch } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ProjectList from './components/ProjectList.vue';
import HistoryjkiList from './components/HistoryjkiList.vue';
import NotificationsPanel from './components/NotificationsPanel.vue';
import NotificationImmediateDialog from './components/NotificationImmediateDialog.vue';
import { useActiveProject } from './composables/useActiveProject';
import { notificationService } from './services/notificationService';
const { activeProjectId, initActiveProject } = useActiveProject();
const showProjectsManager = ref(false);
const mainPanel = ref('app');
const notificationJumpId = ref(null);
const theme = ref('system');
const THEME_STORAGE_KEY = 'manageme_theme';
initActiveProject();
const showEmptyState = computed(() => !showProjectsManager.value && !activeProjectId.value);
function resolveTheme(selectedTheme) {
    if (selectedTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return selectedTheme;
}
function applyTheme(selectedTheme) {
    document.documentElement.setAttribute('data-bs-theme', resolveTheme(selectedTheme));
}
onMounted(() => {
    notificationService.init();
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme)
        theme.value = savedTheme;
    applyTheme(theme.value);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (theme.value === 'system')
            applyTheme('system');
    });
});
watch(theme, (selectedTheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    applyTheme(selectedTheme);
});
function openNotifications() {
    showProjectsManager.value = false;
    mainPanel.value = 'notifications';
}
function closeNotificationsPanel() {
    mainPanel.value = 'app';
}
function onOpenNotificationDetail(id) {
    notificationJumpId.value = id;
    openNotifications();
}
function onJumpConsumed() {
    notificationJumpId.value = null;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-column min-vh-100" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['min-vh-100']} */ ;
const __VLS_0 = NotificationImmediateDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onOpenDetail': {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onOpenDetail': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ openDetail: {} },
    { onOpenDetail: (__VLS_ctx.onOpenNotificationDetail) });
var __VLS_3;
var __VLS_4;
const __VLS_7 = AppHeader;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ 'onManageProjects': {} },
    ...{ 'onOpenNotifications': {} },
    theme: (__VLS_ctx.theme),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onManageProjects': {} },
    ...{ 'onOpenNotifications': {} },
    theme: (__VLS_ctx.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ manageProjects: {} },
    { onManageProjects: (() => { __VLS_ctx.mainPanel = 'app'; __VLS_ctx.showProjectsManager = true; }) });
const __VLS_14 = ({ openNotifications: {} },
    { onOpenNotifications: (__VLS_ctx.openNotifications) });
var __VLS_10;
var __VLS_11;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-grow-1 py-4" },
});
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
if (__VLS_ctx.mainPanel === 'notifications') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "container" },
    });
    /** @type {__VLS_StyleScopedClasses['container']} */ ;
    const __VLS_15 = NotificationsPanel;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ 'onClosePanel': {} },
        ...{ 'onJumpConsumed': {} },
        jumpToNotificationId: (__VLS_ctx.notificationJumpId),
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onClosePanel': {} },
        ...{ 'onJumpConsumed': {} },
        jumpToNotificationId: (__VLS_ctx.notificationJumpId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_20;
    const __VLS_21 = ({ closePanel: {} },
        { onClosePanel: (__VLS_ctx.closeNotificationsPanel) });
    const __VLS_22 = ({ jumpConsumed: {} },
        { onJumpConsumed: (__VLS_ctx.onJumpConsumed) });
    var __VLS_18;
    var __VLS_19;
}
else if (__VLS_ctx.showProjectsManager) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "container" },
    });
    /** @type {__VLS_StyleScopedClasses['container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.mainPanel === 'notifications'))
                    return;
                if (!(__VLS_ctx.showProjectsManager))
                    return;
                __VLS_ctx.showProjectsManager = false;
                // @ts-ignore
                [onOpenNotificationDetail, theme, mainPanel, mainPanel, showProjectsManager, showProjectsManager, showProjectsManager, openNotifications, notificationJumpId, closeNotificationsPanel, onJumpConsumed,];
            } },
        ...{ class: "btn btn-outline-secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
    const __VLS_23 = ProjectList;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
    const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
}
else if (__VLS_ctx.showEmptyState) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "container" },
    });
    /** @type {__VLS_StyleScopedClasses['container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card text-center mx-auto" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-body py-4" },
    });
    /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-body-secondary mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.mainPanel === 'notifications'))
                    return;
                if (!!(__VLS_ctx.showProjectsManager))
                    return;
                if (!(__VLS_ctx.showEmptyState))
                    return;
                __VLS_ctx.showProjectsManager = true;
                // @ts-ignore
                [showProjectsManager, showEmptyState,];
            } },
        ...{ class: "btn btn-primary" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "container" },
    });
    /** @type {__VLS_StyleScopedClasses['container']} */ ;
    if (__VLS_ctx.activeProjectId) {
        const __VLS_28 = HistoryjkiList;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            projectId: (__VLS_ctx.activeProjectId),
        }));
        const __VLS_30 = __VLS_29({
            projectId: (__VLS_ctx.activeProjectId),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    }
}
// @ts-ignore
[activeProjectId, activeProjectId,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
