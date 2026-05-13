import { PROJECTS_STORAGE_KEY } from './storageKey';
/**
 * API do zarządzania projektami.
 * Obecnie używa localStorage – w przyszłości można podmienić na NoSQL w chmurze.
 */
class ProjectsApi {
    storageKey = PROJECTS_STORAGE_KEY;
    getProjects() {
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
    setProjects(projects) {
        localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }
    generateId() {
        return crypto.randomUUID();
    }
    async getAll() {
        return Promise.resolve(this.getProjects());
    }
    async getById(id) {
        const projects = this.getProjects();
        return Promise.resolve(projects.find((p) => p.id === id) ?? null);
    }
    async create(input) {
        const project = {
            ...input,
            id: this.generateId(),
        };
        const projects = this.getProjects();
        projects.push(project);
        this.setProjects(projects);
        return Promise.resolve(project);
    }
    async update(id, updates) {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index === -1)
            return Promise.resolve(null);
        projects[index] = { ...projects[index], ...updates };
        this.setProjects(projects);
        return Promise.resolve(projects[index]);
    }
    async delete(id) {
        const projects = this.getProjects();
        const filtered = projects.filter((p) => p.id !== id);
        if (filtered.length === projects.length)
            return Promise.resolve(false);
        this.setProjects(filtered);
        return Promise.resolve(true);
    }
}
export const projectsApi = new ProjectsApi();
