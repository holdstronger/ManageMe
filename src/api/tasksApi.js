import { historyjkiApi } from './historyjkiApi';
import { TASKS_STORAGE_KEY } from './storageKey';
import { usersApi } from './usersApi';
class TasksApi {
    storageKey = TASKS_STORAGE_KEY;
    getTasks() {
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
    setTasks(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
    generateId() {
        return crypto.randomUUID();
    }
    async getByProject(projectId) {
        return Promise.resolve(this.getTasks().filter((task) => task.projektId === projectId));
    }
    async getById(id) {
        return Promise.resolve(this.getTasks().find((task) => task.id === id) ?? null);
    }
    async create(input) {
        const now = new Date().toISOString();
        const task = {
            id: this.generateId(),
            nazwa: input.nazwa,
            opis: input.opis,
            priorytet: input.priorytet,
            historyjkaId: input.historyjkaId,
            przewidywanyCzasGodziny: input.przewidywanyCzasGodziny,
            stan: 'todo',
            dataDodania: now,
            dataStartu: null,
            dataZakończenia: null,
            zrealizowaneRoboczogodziny: input.zrealizowaneRoboczogodziny ?? 0,
            odpowiedzialnyUżytkownikId: null,
            projektId: input.projektId,
        };
        const all = this.getTasks();
        all.push(task);
        this.setTasks(all);
        return Promise.resolve(task);
    }
    async update(id, updates) {
        const all = this.getTasks();
        const index = all.findIndex((task) => task.id === id);
        if (index === -1)
            return Promise.resolve(null);
        all[index] = {
            ...all[index],
            ...updates,
        };
        this.setTasks(all);
        return Promise.resolve(all[index]);
    }
    async delete(id) {
        const all = this.getTasks();
        const removed = all.find((task) => task.id === id);
        const filtered = all.filter((task) => task.id !== id);
        if (filtered.length === all.length)
            return Promise.resolve(false);
        this.setTasks(filtered);
        if (removed) {
            await this.syncHistoryjkaStatusForTasks(removed.historyjkaId, filtered);
        }
        return Promise.resolve(true);
    }
    async assignUser(taskId, userId) {
        const user = await usersApi.getById(userId);
        if (!user || (user.rola !== 'developer' && user.rola !== 'devops')) {
            return Promise.resolve(null);
        }
        const all = this.getTasks();
        const index = all.findIndex((task) => task.id === taskId);
        if (index === -1)
            return Promise.resolve(null);
        const now = new Date().toISOString();
        const currentTask = all[index];
        const becomesDoing = currentTask.stan === 'todo';
        const updatedTask = {
            ...currentTask,
            odpowiedzialnyUżytkownikId: userId,
            stan: becomesDoing ? 'doing' : currentTask.stan,
            dataStartu: currentTask.dataStartu ?? now,
            dataZakończenia: currentTask.stan === 'done' ? currentTask.dataZakończenia : null,
        };
        all[index] = updatedTask;
        this.setTasks(all);
        if (becomesDoing) {
            const story = await historyjkiApi.getById(updatedTask.historyjkaId);
            if (story && story.stan === 'todo') {
                await historyjkiApi.update(story.id, { stan: 'doing' });
            }
        }
        return Promise.resolve(updatedTask);
    }
    async markDone(taskId) {
        const all = this.getTasks();
        const index = all.findIndex((task) => task.id === taskId);
        if (index === -1)
            return Promise.resolve(null);
        const currentTask = all[index];
        if (!currentTask.odpowiedzialnyUżytkownikId)
            return Promise.resolve(null);
        const updatedTask = {
            ...currentTask,
            stan: 'done',
            dataStartu: currentTask.dataStartu ?? new Date().toISOString(),
            dataZakończenia: new Date().toISOString(),
        };
        all[index] = updatedTask;
        this.setTasks(all);
        await this.syncHistoryjkaStatusForTasks(updatedTask.historyjkaId, all);
        return Promise.resolve(updatedTask);
    }
    async syncHistoryjkaStatusForTasks(historyjkaId, allTasks) {
        const story = await historyjkiApi.getById(historyjkaId);
        if (!story)
            return;
        const storyTasks = allTasks.filter((task) => task.historyjkaId === historyjkaId);
        if (storyTasks.length === 0)
            return;
        const allDone = storyTasks.every((task) => task.stan === 'done');
        if (allDone && story.stan !== 'done') {
            await historyjkiApi.update(story.id, { stan: 'done' });
            return;
        }
        const anyInProgress = storyTasks.some((task) => task.stan === 'doing' || task.stan === 'done');
        if (anyInProgress && story.stan === 'todo') {
            await historyjkiApi.update(story.id, { stan: 'doing' });
        }
    }
}
export const tasksApi = new TasksApi();
