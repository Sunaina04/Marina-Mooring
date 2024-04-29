import { BoatYard_Data, UserData } from './ApiTypes'

export interface CityProps {
  name: string
  code: string
}

export interface DataProps {
  moorings: BoatYard_Data[]
}

export interface CustomerData {
  id: string
  name: string
  email: string
  phone: number
}

export interface CustomerProps {
  id: string
  name: string
  phone: string
  email: string
  address: string
}

export interface BillsData {
  id: number
  technician: string
  techniciansName: string
  dueDate: string
}

export interface INITIAl_STATE {
  token: undefined | string
  userData: UserData | undefined
}
