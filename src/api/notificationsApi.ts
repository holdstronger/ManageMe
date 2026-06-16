import type { Notification, NotificationCreateInput } from '../types/notification'
import { NOTIFICATIONS_STORAGE_KEY } from './storageKey'

/**
 * Trwałe powiadomienia (localStorage). W przyszłości można podmienić na API backendu.
 */
class NotificationsApi {
  private storageKey = NOTIFICATIONS_STORAGE_KEY

  private getAllRaw(): Notification[] {
    try {
      const raw = localStorage.getItem(this.storageKey)
      if (!raw) return []
      const parsed = JSON.parse(raw) as Notification[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  private setAll(items: Notification[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }

  private generateId(): string {
    return crypto.randomUUID()
  }

  async getAll(): Promise<Notification[]> {
    return Promise.resolve(this.getAllRaw())
  }

  async create(input: NotificationCreateInput): Promise<Notification> {
    const notification: Notification = {
      ...input,
      id: this.generateId(),
      date: new Date().toISOString(),
      isRead: false,
    }
    const all = this.getAllRaw()
    all.unshift(notification)
    this.setAll(all)
    return Promise.resolve(notification)
  }

  async update(id: string, updates: Partial<Pick<Notification, 'isRead' | 'title' | 'message'>>): Promise<Notification | null> {
    const all = this.getAllRaw()
    const index = all.findIndex((n) => n.id === id)
    if (index === -1) return Promise.resolve(null)
    all[index] = { ...all[index], ...updates }
    this.setAll(all)
    return Promise.resolve(all[index])
  }
}

export const notificationsApi = new NotificationsApi()
