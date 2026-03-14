import type { User } from '../types/user'

const MOCK_USER: User = {
  id: 'mock-user-filip',
  imię: 'Filip',
  nazwisko: 'Wiśniewski',
}

/**
 * Serwis zarządzający zalogowanym użytkownikiem.
 * Na ten moment: mock użytkownika (bez logowania, rejestracji).
 */
class CurrentUserService {
  private _user: User = MOCK_USER

  get user(): User {
    return this._user
  }

  get fullName(): string {
    return `${this._user.imię} ${this._user.nazwisko}`.trim()
  }
}

export const currentUserService = new CurrentUserService()
