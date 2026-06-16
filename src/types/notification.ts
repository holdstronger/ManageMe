export type ISOString = string
export type UserID = string

export type NotificationPriority = 'low' | 'medium' | 'high'

/** Powiadomienie w aplikacji (pole `priority` — w specyfikacji literówka „prority”). */
export interface Notification {
  id: string
  title: string
  message: string
  date: ISOString
  priority: NotificationPriority
  isRead: boolean
  recipientId: UserID
}

export type NotificationCreateInput = Omit<Notification, 'id' | 'date' | 'isRead'>
