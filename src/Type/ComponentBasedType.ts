import { Dispatch, SetStateAction } from 'react'
import { MooringPayload, VendorPayload, WorkOrderPayload } from './ApiTypes'

export interface CustomerDataProps {
  customer: any
  mooringRowData?: any
  editMode: boolean
  editCustomerMode?: boolean
  editMooringMode?: boolean
  closeModal: () => void
  getCustomer: () => void
  getCustomerRecord?: () => void
  toastRef?: any
  setCustomerData?: any
}
export interface BoatYardProps {
  customerData: any
  editMode: boolean
  toastRef?: any
  gpsCoordinates?: string
  closeModal: () => void
  boatYardData: () => void
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BoatData {
  id: string
  customerName: string
  mooringId?: string
  mooringServiceDate: string
  mooringLocation: string
}

export interface BillsData {
  workOrderNo: string
  customerName: string
  assignedTo: string
  date: string
}

export interface LoginFormProps {
  admin?: boolean
}

export interface MooringDetail {
  id: string
  mainContact: string
  mooringNumber: string
  boatName: string
}

export interface RowExpansionProps {
  mooringDetails: MooringDetail[]
}

export interface AddMooringProps {
  moorings: MooringPayload
  editMode: boolean
  editCustomerMode: boolean
  mooringRowData: any
  toastRef: React.RefObject<any>
  closeModal: () => void
  getCustomer: () => void
  getCustomerRecord?: () => void
}

export interface Technician_Data {
  id: string
  techniciansName: string
  openWorkOrders: string
  completedJobs: string
}

export interface AddVendorProps {
  vendors: VendorPayload
  editMode: boolean
  closeModal: () => void
  getVendor: () => void
  toastRef?: any
}

export interface AddInventoryProps {
  id: any
  closeModal: () => void
  toastRef?: any
}

export interface MoorPayProps {
  invoice: string
  mooringId: string
  customerName: string
  technicianName: string
  services: string
  time: string
  amount: string
}

export interface EstimateProps {
  customerId: string
  customerName: string
  mooringId: string
  boatyard: string
  assigned: string
  duedate: string
}

export interface TimeCardsProps {
  id: string
  boatName: string
  name: string
  date: string
  measurement: string
  place: string
}

export interface WorkOrderProps {
  workOrderData: WorkOrderPayload
  editMode: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PermissionData {
  id: string
  email: string
  name: string
  phone: string
  role: string
}

export type StatCardProps = {
  items: {
    title: string
    percentage: number
    count: number
  }[]
}

export interface CustomerAdminDataProps {
  customerData?: any
  editMode: boolean
  isVisible?: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  customerAdminId?: string
  closeModal: () => void
  getUser: () => void
  getCustomerUser?: () => void
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  customerUsers?: any
  permission?: boolean
  passWordDisplay?: boolean
  toastRef?: any
  editCustomerMode?: boolean
  setEditCustomer?: Dispatch<SetStateAction<any>>
  setSelectedCustomerUser: Dispatch<SetStateAction<any>>
  setSelectedCustomer: Dispatch<SetStateAction<any>>
  setSelectedCustomerUsers?: Dispatch<SetStateAction<any>>
}

export interface HeaderProps {
  header: string
}

export interface CustomModalProps {
  button?: boolean
  buttonText?: string
  headerText: string | JSX.Element
  children: React.ReactNode
  dialogProps?: {
    [key: string]: any
  }
  visible: boolean
  onClick?: () => void
  onHide: () => void
  buttonStyle?: React.CSSProperties | undefined
  dialogStyle?: React.CSSProperties
  footerContent?: React.ReactNode
}

export interface inputHeader {
  header?: string
  iconStyle?: React.CSSProperties
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  headerStyle?: React.CSSProperties
  inputTextStyle?: React.CSSProperties
  value?: string | undefined
  borderBottom?: React.CSSProperties
}
