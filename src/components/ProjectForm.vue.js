/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/berni/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
const nazwa = ref('');
const opis = ref('');
const dialogRef = ref(null);
watch(() => props.modelValue, (open) => {
    if (open) {
        if (props.project) {
            nazwa.value = props.project.nazwa;
            opis.value = props.project.opis;
        }
        else {
            nazwa.value = '';
            opis.value = '';
        }
        dialogRef.value?.showModal();
    }
    else {
        dialogRef.value?.close();
    }
}, { immediate: true });
const isEditing = () => !!props.project;
function handleSubmit() {
    if (!nazwa.value.trim())
        return;
    emit('submit', { nazwa: nazwa.value.trim(), opis: opis.value.trim() });
    emit('update:modelValue', false);
}
function close() {
    emit('update:modelValue', false);
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
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
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
(__VLS_ctx.isEditing() ? 'Edytuj projekt' : 'Nowy projekt');
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "nazwa",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "nazwa",
    value: (__VLS_ctx.nazwa),
    type: "text",
    required: true,
    placeholder: "Nazwa projektu",
    autocomplete: "off",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "field" },
});
/** @type {__VLS_StyleScopedClasses['field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "opis",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
    id: "opis",
    value: (__VLS_ctx.opis),
    rows: "4",
    placeholder: "Opis projektu",
});
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
[close, isEditing, isEditing, handleSubmit, nazwa, opis,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
