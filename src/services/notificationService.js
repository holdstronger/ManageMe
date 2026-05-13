import { computed, shallowRef } from 'vue';
import { notificationsApi } from '../api/notificationsApi';
import { currentUserService } from './currentUserService';
const allNotifications = shallowRef([]);
/** Kolejka okien dla bieżącego użytkownika (priority medium | high). */
const immediateDialogQueue = shallowRef([]);
async function syncFromStorage() {
    const list = await notificationsApi.getAll();
    allNotifications.value = list;
}
function enqueueImmediateDialog(notification) {
    const me = currentUserService.user.id;
    if (notification.recipientId !== me)
        return;
    if (notification.priority !== 'medium' && notification.priority !== 'high')
        return;
    immediateDialogQueue.value = [...immediateDialogQueue.value, notification];
}
/** Liczba nieprzeczytanych powiadomień dla zalogowanego użytkownika. */
export const unreadNotificationCount = computed(() => {
    const me = currentUserService.user.id;
    return allNotifications.value.filter((n) => n.recipientId === me && !n.isRead).length;
});
export const notificationService = {
    allNotifications,
    immediateDialogQueue,
    init() {
        void syncFromStorage();
    },
    getMine() {
        const me = currentUserService.user.id;
        return allNotifications.value.filter((n) => n.recipientId === me);
    },
    getById(id) {
        return allNotifications.value.find((n) => n.id === id);
    },
    async send(partial) {
        const created = await notificationsApi.create({
            title: partial.title,
            message: partial.message,
            priority: partial.priority,
            recipientId: partial.recipientId,
        });
        await syncFromStorage();
        enqueueImmediateDialog(created);
        return created;
    },
    async sendMany(recipients, partial) {
        for (const recipientId of recipients) {
            const created = await notificationsApi.create({
                ...partial,
                recipientId,
            });
            enqueueImmediateDialog(created);
        }
        await syncFromStorage();
    },
    async markRead(id) {
        await notificationsApi.update(id, { isRead: true });
        await syncFromStorage();
    },
    dismissNextImmediateDialog() {
        const [, ...rest] = immediateDialogQueue.value;
        immediateDialogQueue.value = rest;
    },
    priorityLabel(p) {
        if (p === 'high')
            return 'Wysoki';
        if (p === 'medium')
            return 'Średni';
        return 'Niski';
    },
    formatDate(iso) {
        return new Date(iso).toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    },
};
