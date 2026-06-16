/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref, watch } from 'vue';
import { notificationService } from '../services/notificationService';
const props = defineProps();
const emit = defineEmits();
const detailId = ref(null);
watch(() => props.jumpToNotificationId, (id) => {
    if (id) {
        detailId.value = id;
        emit('jump-consumed');
    }
}, { immediate: true });
const mineSorted = computed(() => [...notificationService.getMine()].sort((a, b) => b.date.localeCompare(a.date)));
const active = computed(() => detailId.value ? (notificationService.getById(detailId.value) ?? null) : null);
watch(detailId, async (id) => {
    if (!id)
        return;
    const n = notificationService.getById(id);
    if (n && !n.isRead) {
        await notificationService.markRead(id);
    }
}, { flush: 'post' });
function openDetail(id) {
    detailId.value = id;
}
function backToList() {
    detailId.value = null;
}
async function markReadClicked(n) {
    if (!n.isRead)
        await notificationService.markRead(n.id);
}
function priorityBadgeClass(p) {
    if (p === 'high')
        return 'text-bg-danger';
    if (p === 'medium')
        return 'text-bg-warning';
    return 'text-bg-secondary';
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
if (!__VLS_ctx.detailId) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "notifications-list" },
    });
    /** @type {__VLS_StyleScopedClasses['notifications-list']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "d-flex justify-content-between align-items-center gap-2 mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "h4 mb-0" },
    });
    /** @type {__VLS_StyleScopedClasses['h4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.detailId))
                    return;
                __VLS_ctx.emit('close-panel');
                // @ts-ignore
                [detailId, emit,];
            } },
        type: "button",
        ...{ class: "btn btn-outline-secondary btn-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    if (__VLS_ctx.mineSorted.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-body-secondary" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "list-group shadow-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['list-group']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
        for (const [n] of __VLS_vFor((__VLS_ctx.mineSorted))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                key: (n.id),
                ...{ class: "list-group-item d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-start" },
                ...{ class: ({ 'border-start border-primary border-4': !n.isRead }) },
            });
            /** @type {__VLS_StyleScopedClasses['list-group-item']} */ ;
            /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-md-row']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
            /** @type {__VLS_StyleScopedClasses['align-items-md-start']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-start']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-4']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(!__VLS_ctx.detailId))
                            return;
                        if (!!(__VLS_ctx.mineSorted.length === 0))
                            return;
                        __VLS_ctx.openDetail(n.id);
                        // @ts-ignore
                        [mineSorted, mineSorted, openDetail,];
                    } },
                ...{ class: "flex-grow-1 text-start pointer" },
                role: "button",
                tabindex: "0",
            });
            /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-start']} */ ;
            /** @type {__VLS_StyleScopedClasses['pointer']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "d-flex flex-wrap align-items-center gap-2 mb-1" },
            });
            /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
            /** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
            if (!n.isRead) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "badge text-bg-primary" },
                });
                /** @type {__VLS_StyleScopedClasses['badge']} */ ;
                /** @type {__VLS_StyleScopedClasses['text-bg-primary']} */ ;
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "badge" },
                ...{ class: (__VLS_ctx.priorityBadgeClass(n.priority)) },
            });
            /** @type {__VLS_StyleScopedClasses['badge']} */ ;
            (__VLS_ctx.notificationService.priorityLabel(n.priority));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "small text-body-secondary" },
            });
            /** @type {__VLS_StyleScopedClasses['small']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
            (__VLS_ctx.notificationService.formatDate(n.date));
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "fw-semibold" },
            });
            /** @type {__VLS_StyleScopedClasses['fw-semibold']} */ ;
            (n.title);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-body-secondary small preview" },
            });
            /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
            /** @type {__VLS_StyleScopedClasses['small']} */ ;
            /** @type {__VLS_StyleScopedClasses['preview']} */ ;
            (n.message);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "d-flex flex-shrink-0 gap-2" },
            });
            /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(!__VLS_ctx.detailId))
                            return;
                        if (!!(__VLS_ctx.mineSorted.length === 0))
                            return;
                        __VLS_ctx.markReadClicked(n);
                        // @ts-ignore
                        [priorityBadgeClass, notificationService, notificationService, markReadClicked,];
                    } },
                type: "button",
                ...{ class: "btn btn-sm btn-outline-secondary" },
                disabled: (n.isRead),
            });
            /** @type {__VLS_StyleScopedClasses['btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
            // @ts-ignore
            [];
        }
    }
}
else if (__VLS_ctx.active) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "notification-detail text-start" },
    });
    /** @type {__VLS_StyleScopedClasses['notification-detail']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-start']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.backToList) },
        type: "button",
        ...{ class: "btn btn-link px-0 mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-link']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card shadow-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['card']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-body" },
    });
    /** @type {__VLS_StyleScopedClasses['card-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-wrap align-items-center gap-2 mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge" },
        ...{ class: (__VLS_ctx.priorityBadgeClass(__VLS_ctx.active.priority)) },
    });
    /** @type {__VLS_StyleScopedClasses['badge']} */ ;
    (__VLS_ctx.notificationService.priorityLabel(__VLS_ctx.active.priority));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "small text-body-secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['small']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
    (__VLS_ctx.notificationService.formatDate(__VLS_ctx.active.date));
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "h4 card-title" },
    });
    /** @type {__VLS_StyleScopedClasses['h4']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
    (__VLS_ctx.active.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "card-text" },
    });
    /** @type {__VLS_StyleScopedClasses['card-text']} */ ;
    (__VLS_ctx.active.message);
    if (!__VLS_ctx.active.isRead) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.detailId))
                        return;
                    if (!(__VLS_ctx.active))
                        return;
                    if (!(!__VLS_ctx.active.isRead))
                        return;
                    __VLS_ctx.markReadClicked(__VLS_ctx.active);
                    // @ts-ignore
                    [priorityBadgeClass, notificationService, notificationService, markReadClicked, active, active, active, active, active, active, active, active, backToList,];
                } },
            type: "button",
            ...{ class: "btn btn-outline-secondary btn-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-body-secondary" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-secondary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.backToList) },
        type: "button",
        ...{ class: "btn btn-secondary btn-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
}
// @ts-ignore
[backToList,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
