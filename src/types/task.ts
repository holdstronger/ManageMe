import type { Priorytet, StanHistoryjki } from './historyjka'

export type StanZadania = StanHistoryjki

export interface Task {
  id: string
  nazwa: string
  opis: string
  priorytet: Priorytet
  historyjkaId: string
  przewidywanyCzasGodziny: number
  stan: StanZadania
  dataDodania: string
  dataStartu: string | null
  dataZakończenia: string | null
  zrealizowaneRoboczogodziny: number
  odpowiedzialnyUżytkownikId: string | null
  projektId: string
}

export interface TaskCreateInput {
  nazwa: string
  opis: string
  priorytet: Priorytet
  historyjkaId: string
  przewidywanyCzasGodziny: number
  zrealizowaneRoboczogodziny?: number
  projektId: string
}

export type TaskUpdateInput = Partial<
  Omit<
    Task,
    'id' | 'dataDodania' | 'dataStartu' | 'dataZakończenia' | 'odpowiedzialnyUżytkownikId' | 'projektId'
  >
>
