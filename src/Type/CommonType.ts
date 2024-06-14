import { BoatYardData, UserData } from './ApiTypes'

export interface CityProps {
  name: string
  code: string
  // id:number
}

export interface DataProps {
  moorings: BoatYardData[]
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
export interface SidebarState {
  isOpen: boolean
}

export interface InitialState {
  token: string
  userData: UserData | null
  isOpen: boolean
  sidebar: SidebarState
  customerId: string
  customerName: string
}

export interface FormFieldsProps {
  label: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export type NullableDateArray = (Date | null)[] | null

export interface Role {
  id: number
  name: string
  description: string
}

export interface Country {
  id: number
  name: string
  label: string
}

export interface State {
  id: number
  name: string
  label: string
}

export interface MetaData {
  id: number
  name: string
  label: string
  mooringId: string
  status: string
  description: string
  technicianName: string
  firstName: string
  lastName: string
  boatyardName: string
}

export interface MetaDataTechnician {
  id: number
  name: string
  email: string
  phoneNumber: string
  customerOwnerId: number
  roleResponseDto: Role
  stateResponseDto: State
  countryResponseDto: Country
  street: string
  apt: string
  zipCode: string
  companyName: string
}

export interface MetaDataCustomer {
  id: number
  firstName: string
  lastName: string
}

export interface Customer {
  id: number
  customerName: string
}

export type Params = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  searchText?: string
  customerOwnerId?: number
}
