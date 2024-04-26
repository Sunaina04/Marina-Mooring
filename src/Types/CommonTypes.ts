export interface CustomerDataProps {
  customer: any
  editMode: boolean
  closeModal: () => void
  getCustomer: () => void
}

export interface CityProps {
  name: string
  code: string
}
