import { HISTORYJKI_STORAGE_KEY } from './storageKey';
/**
 * API do zarządzania historyjkami (funkcjonalnościami) projektu.
 * Używa localStorage – w przyszłości można podmienić na backend.
 */
class HistoryjkiApi {
    storageKey = HISTORYJKI_STORAGE_KEY;
    getHistoryjki() {
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
    setHistoryjki(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    generateId() {
        return crypto.randomUUID();
    }
    async getByProject(projectId) {
        const all = this.getHistoryjki();
        return Promise.resolve(all.filter((h) => h.projekt === projectId));
    }
    async getById(id) {
        const all = this.getHistoryjki();
        return Promise.resolve(all.find((h) => h.id === id) ?? null);
    }
    async create(input) {
        const historyjka = {
            ...input,
            id: this.generateId(),
            dataUtworzenia: new Date().toISOString(),
        };
        const all = this.getHistoryjki();
        all.push(historyjka);
        this.setHistoryjki(all);
        return Promise.resolve(historyjka);
    }
    async update(id, updates) {
        const all = this.getHistoryjki();
        const index = all.findIndex((h) => h.id === id);
        if (index === -1)
            return Promise.resolve(null);
        all[index] = { ...all[index], ...updates };
        this.setHistoryjki(all);
        return Promise.resolve(all[index]);
    }
    async delete(id) {
        const all = this.getHistoryjki();
        const filtered = all.filter((h) => h.id !== id);
        if (filtered.length === all.length)
            return Promise.resolve(false);
        this.setHistoryjki(filtered);
        return Promise.resolve(true);
    }
}
export const historyjkiApi = new HistoryjkiApi();
