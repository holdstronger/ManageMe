import { ACTIVE_PROJECT_STORAGE_KEY } from './storageKey';
/**
 * API do zapamiętywania aktywnego projektu.
 * Używa localStorage – w przyszłości można podmienić na backend.
 */
class ActiveProjectApi {
    storageKey = ACTIVE_PROJECT_STORAGE_KEY;
    async get() {
        return Promise.resolve(localStorage.getItem(this.storageKey));
    }
    async set(projectId) {
        if (projectId === null) {
            localStorage.removeItem(this.storageKey);
        }
        else {
            localStorage.setItem(this.storageKey, projectId);
        }
        return Promise.resolve();
    }
}
export const activeProjectApi = new ActiveProjectApi();
