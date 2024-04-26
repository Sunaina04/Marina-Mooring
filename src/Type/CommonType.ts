import { BOATYARD_DATA, UserData } from './ApiTypes'

export interface CityProps {
  name: string
  code: string
}

export interface DataProps {
  moorings: BOATYARD_DATA[]
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
  token: null | string
  userData: UserData | null
}
