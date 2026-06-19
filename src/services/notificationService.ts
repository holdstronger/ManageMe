import { computed, shallowRef } from 'vue'
import type { Notification, NotificationPriority } from '../types/notification'
import { notificationsApi } from '../api/notificationsApi'
import { currentUserService } from './currentUserService'

const allNotifications = shallowRef<Notification[]>([])
const immediateDialogQueue = shallowRef<Notification[]>([])

async function syncFromStorage(): Promise<void> {
  const list = await notificationsApi.getAll()
  allNotifications.value = list
}

function enqueueImmediateDialog(notification: Notification): void {
  const me = currentUserService.user.id
  if (notification.recipientId !== me) return
  if (notification.priority !== 'medium' && notification.priority !== 'high') return
  immediateDialogQueue.value = [...immediateDialogQueue.value, notification]
}

/** Liczba nieprzeczytanych powiadomień dla zalogowanego użytkownika. */
export const unreadNotificationCount = computed(() => {
  const me = currentUserService.user.id
  return allNotifications.value.filter((n) => n.recipientId === me && !n.isRead).length
})

export const notificationService = {
  allNotifications,
  immediateDialogQueue,

  init(): void {
    void syncFromStorage()
  },

  getMine(): Notification[] {
    const me = currentUserService.user.id
    return allNotifications.value.filter((n) => n.recipientId === me)
  },

  getById(id: string): Notification | undefined {
    return allNotifications.value.find((n) => n.id === id)
  },

  async send(
    partial: Pick<Notification, 'title' | 'message' | 'priority' | 'recipientId'>
  ): Promise<Notification> {
    const created = await notificationsApi.create({
      title: partial.title,
      message: partial.message,
      priority: partial.priority,
      recipientId: partial.recipientId,
    })
    await syncFromStorage()
    enqueueImmediateDialog(created)
    return created
  },

  async sendMany(
    recipients: string[],
    partial: Pick<Notification, 'title' | 'message' | 'priority'>
  ): Promise<void> {
    for (const recipientId of recipients) {
      const created = await notificationsApi.create({
        ...partial,
        recipientId,
      })
      enqueueImmediateDialog(created)
    }
    await syncFromStorage()
  },

  async markRead(id: string): Promise<void> {
    await notificationsApi.update(id, { isRead: true })
    await syncFromStorage()
  },

  dismissNextImmediateDialog(): void {
    const [, ...rest] = immediateDialogQueue.value
    immediateDialogQueue.value = rest
  },

  priorityLabel(p: NotificationPriority): string {
    if (p === 'high') return 'Wysoki'
    if (p === 'medium') return 'Średni'
    return 'Niski'
  },

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  },
}
