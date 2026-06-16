import type { User } from '../types/user'

const MOCK_USERS: User[] = [
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
]

class UsersApi {
  async getAll(): Promise<User[]> {
    return Promise.resolve([...MOCK_USERS])
  }

  async getAssignableUsers(): Promise<User[]> {
    return Promise.resolve(
      MOCK_USERS.filter((user) => user.rola === 'developer' || user.rola === 'devops')
    )
  }

  async getById(id: string): Promise<User | null> {
    return Promise.resolve(MOCK_USERS.find((user) => user.id === id) ?? null)
  }
}

export const usersApi = new UsersApi()
