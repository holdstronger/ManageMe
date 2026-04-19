export interface User {
  id: string
  imię: string
  nazwisko: string
  rola: UserRole
}

export type UserRole = 'admin' | 'devops' | 'developer'
