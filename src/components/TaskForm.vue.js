/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
const nazwa = ref('');
const opis = ref('');
const priorytet = ref('średni');
const historyjkaId = ref('');
const przewidywanyCzasGodziny = ref(1);
const zrealizowaneRoboczogodziny = ref(0);
const dialogRef = ref(null);
watch(() => props.modelValue, (open) => {
    if (open) {
        if (props.task) {
            nazwa.value = props.task.nazwa;
            opis.value = props.task.opis;
            priorytet.value = props.task.priorytet;
            historyjkaId.value = props.task.historyjkaId;
            przewidywanyCzasGodziny.value = props.task.przewidywanyCzasGodziny;
            zrealizowaneRoboczogodziny.value = props.task.zrealizowaneRoboczogodziny;
        }
        else {
            nazwa.value = '';
            opis.value = '';
            priorytet.value = 'średni';
            historyjkaId.value = props.historyjki[0]?.id ?? '';
            przewidywanyCzasGodziny.value = 1;
            zrealizowaneRoboczogodziny.value = 0;
        }
        dialogRef.value?.showModal();
    }
    else {
        dialogRef.value?.close();
    }
}, { immediate: true });
function close() {
    emit('update:modelValue', false);
}
function handleSubmit() {
    if (!nazwa.value.trim() || !historyjkaId.value)
        return;
    emit('submit', {
        nazwa: nazwa.value.trim(),
        opis: opis.value.trim(),
        priorytet: priorytet.value,
        historyjkaId: historyjkaId.value,
        przewidywanyCzasGodziny: Math.max(1, przewidywanyCzasGodziny.value),
        zrealizowaneRoboczogodziny: Math.max(0, zrealizowaneRoboczogodziny.value),
    });
    close();
}
const isEditing = () => !!props.task;
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
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.dialog, __VLS_intrinsics.dialog)({
    ...{ onCancel: (__VLS_ctx.close) },
    ...{ onClose: (...[$event]) => {
            __VLS_ctx.emit('update:modelValue', false);
            // @ts-ignore
            [close, emit,];
        } },
    ref: "dialogRef",
    ...{ class: "modal" },
});
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modal-content" },
});
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
(__VLS_ctx.isEditing() ? 'Edytuj zadanie' : 'Nowe zadanie');
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-nazwa",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "t-nazwa",
    value: (__VLS_ctx.nazwa),
    type: "text",
    required: true,
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-opis",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
    id: "t-opis",
    value: (__VLS_ctx.opis),
    rows: "3",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-priorytet",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    id: "t-priorytet",
    value: (__VLS_ctx.priorytet),
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "niski",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "średni",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "wysoki",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-story",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    id: "t-story",
    value: (__VLS_ctx.historyjkaId),
    required: true,
});
for (const [h] of __VLS_vFor((__VLS_ctx.historyjki))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (h.id),
        value: (h.id),
    });
    (h.nazwa);
    // @ts-ignore
    [isEditing, handleSubmit, nazwa, opis, priorytet, historyjkaId, historyjki,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-est",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "t-est",
    type: "number",
    min: "1",
    step: "1",
});
(__VLS_ctx.przewidywanyCzasGodziny);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "t-work",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "t-work",
    type: "number",
    min: "0",
    step: "1",
});
(__VLS_ctx.zrealizowaneRoboczogodziny);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions" },
});
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.close) },
    type: "button",
    ...{ class: "btn btn-secondary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
(__VLS_ctx.isEditing() ? 'Zapisz' : 'Dodaj');
// @ts-ignore
[close, isEditing, przewidywanyCzasGodziny, zrealizowaneRoboczogodziny,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
