const MOCK_USER = {
    id: 'user-admin-filip',
    imię: 'Filip',
    nazwisko: 'Wiśniewski',
    rola: 'admin',
};
/**
 * Serwis zarządzający zalogowanym użytkownikiem.
 * Na ten moment: mock użytkownika (bez logowania, rejestracji).
 */
class CurrentUserService {
    _user = MOCK_USER;
    get user() {
        return this._user;
    }
    get fullName() {
        return `${this._user.imię} ${this._user.nazwisko}`.trim();
    }
}
export const currentUserService = new CurrentUserService();
