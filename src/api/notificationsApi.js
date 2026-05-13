import { NOTIFICATIONS_STORAGE_KEY } from './storageKey';
/**
 * Trwałe powiadomienia (localStorage). W przyszłości można podmienić na API backendu.
 */
class NotificationsApi {
    storageKey = NOTIFICATIONS_STORAGE_KEY;
    getAllRaw() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw)
                return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    setAll(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    generateId() {
        return crypto.randomUUID();
    }
    async getAll() {
        return Promise.resolve(this.getAllRaw());
    }
    async create(input) {
        const notification = {
            ...input,
            id: this.generateId(),
            date: new Date().toISOString(),
            isRead: false,
        };
        const all = this.getAllRaw();
        all.unshift(notification);
        this.setAll(all);
        return Promise.resolve(notification);
    }
    async update(id, updates) {
        const all = this.getAllRaw();
        const index = all.findIndex((n) => n.id === id);
        if (index === -1)
            return Promise.resolve(null);
        all[index] = { ...all[index], ...updates };
        this.setAll(all);
        return Promise.resolve(all[index]);
    }
}
export const notificationsApi = new NotificationsApi();
