/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, nextTick, ref, watch } from 'vue';
import { notificationService } from '../services/notificationService';
const emit = defineEmits();
const dialogRef = ref(null);
const current = computed(() => notificationService.immediateDialogQueue.value[0] ?? null);
watch(current, async (n) => {
    if (!n) {
        dialogRef.value?.close();
        return;
    }
    await nextTick();
    dialogRef.value?.showModal();
});
function acknowledge() {
    dialogRef.value?.close();
    notificationService.dismissNextImmediateDialog();
}
function openDetails() {
    const n = current.value;
    if (!n)
        return;
    acknowledge();
    emit('open-detail', n.id);
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
/** @type {__VLS_StyleScopedClasses['notif-dialog']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.dialog, __VLS_intrinsics.dialog)({
    ...{ onCancel: (__VLS_ctx.acknowledge) },
    ref: "dialogRef",
    ...{ class: "notif-dialog border-0 rounded-3 shadow-lg p-0" },
});
/** @type {__VLS_StyleScopedClasses['notif-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0']} */ ;
if (__VLS_ctx.current) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-4 text-start" },
    });
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-start']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-items-start justify-content-between gap-2 mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "h5 mb-0" },
    });
    /** @type {__VLS_StyleScopedClasses['h5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    (__VLS_ctx.current.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge" },
        ...{ class: ({
                'text-bg-danger': __VLS_ctx.current.priority === 'high',
                'text-bg-warning': __VLS_ctx.current.priority === 'medium',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['badge']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-bg-danger']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-bg-warning']} */ ;
    (__VLS_ctx.notificationService.priorityLabel(__VLS_ctx.current.priority));
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-body-secondary mb-3 small" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['small']} */ ;
    (__VLS_ctx.notificationService.formatDate(__VLS_ctx.current.date));
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    (__VLS_ctx.current.message);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-wrap gap-2 justify-content-end" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-content-end']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.acknowledge) },
        type: "button",
        ...{ class: "btn btn-outline-secondary btn-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.openDetails) },
        type: "button",
        ...{ class: "btn btn-primary btn-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
}
// @ts-ignore
[acknowledge, acknowledge, current, current, current, current, current, current, current, notificationService, notificationService, openDetails,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
