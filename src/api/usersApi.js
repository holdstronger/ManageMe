const MOCK_USERS = [
    {
        id: 'user-admin-filip',
        imię: 'Filip',
        nazwisko: 'Wiśniewski',
        rola: 'admin',
    },
    {
        id: 'user-dev-kasia',
        imię: 'Kasia',
        nazwisko: 'Nowak',
        rola: 'developer',
    },
    {
        id: 'user-devops-mateusz',
        imię: 'Mateusz',
        nazwisko: 'Krawczyk',
        rola: 'devops',
    },
];
class UsersApi {
    async getAll() {
        return Promise.resolve([...MOCK_USERS]);
    }
    async getAssignableUsers() {
        return Promise.resolve(MOCK_USERS.filter((user) => user.rola === 'developer' || user.rola === 'devops'));
    }
    async getById(id) {
        return Promise.resolve(MOCK_USERS.find((user) => user.id === id) ?? null);
    }
}
export const usersApi = new UsersApi();
