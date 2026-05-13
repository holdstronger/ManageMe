import { usersApi } from '../api/usersApi';
import { notificationService } from './notificationService';
function storyLabel(story) {
    return story?.nazwa ?? 'Historyjka';
}
/** Utworzono projekt — wszyscy admini (high). */
export async function notifyProjectCreated(projectName) {
    const users = await usersApi.getAll();
    const adminIds = users.filter((u) => u.rola === 'admin').map((u) => u.id);
    await notificationService.sendMany(adminIds, {
        title: 'Utworzono nowy projekt',
        message: `Dodano projekt „${projectName}".`,
        priority: 'high',
    });
}
/** Przypisanie do zadania — osoba przypisana (high). */
export function notifyTaskAssigned(task, story, assigneeId) {
    void notificationService.send({
        title: 'Przypisano Cię do zadania',
        message: `Zadanie „${task.nazwa}" w historyjce „${storyLabel(story)}" zostało Ci przypisane.`,
        priority: 'high',
        recipientId: assigneeId,
    });
}
/** Nowe zadanie — właściciel historyjki (medium). */
export function notifyNewTaskInStory(task, story, ownerId) {
    void notificationService.send({
        title: 'Nowe zadanie w historyjce',
        message: `W historyjce „${storyLabel(story)}" dodano zadanie „${task.nazwa}".`,
        priority: 'medium',
        recipientId: ownerId,
    });
}
/** Usunięto zadanie — właściciel historyjki (medium). */
export function notifyTaskRemovedFromStory(taskName, story, ownerId) {
    void notificationService.send({
        title: 'Usunięto zadanie z historyjki',
        message: `Z historyjki „${storyLabel(story)}" usunięto zadanie „${taskName}".`,
        priority: 'medium',
        recipientId: ownerId,
    });
}
/** Zadanie oznaczone jako done — właściciel historyjki (medium). */
export function notifyTaskStatusDone(task, story, ownerId) {
    void notificationService.send({
        title: 'Zadanie ukończone',
        message: `Zadanie „${task.nazwa}" w historyjce „${storyLabel(story)}" ma status zakończone (done).`,
        priority: 'medium',
        recipientId: ownerId,
    });
}
/** Zadanie w trakcie (doing) — właściciel historyjki (low). */
export function notifyTaskStatusDoing(task, story, ownerId) {
    void notificationService.send({
        title: 'Zadanie w trakcie',
        message: `Zadanie „${task.nazwa}" w historyjce „${storyLabel(story)}" ma status w trakcie (doing).`,
        priority: 'low',
        recipientId: ownerId,
    });
}
