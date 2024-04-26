import { MOORING_PAYLOAD, VENDOR_PAYLOAD, WorkOrder_PAYLOAD } from "./ApiTypes"

export interface CustomerDataProps {
  customer: any
  editMode: boolean
  closeModal: () => void
  getCustomer: () => void
}

export interface BoatData {
  id: string
  customerName: string
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
  Label: string
  typeEmail: string
  typePass: string
  showSinUp: boolean
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
  moorings: MOORING_PAYLOAD
  editMode: boolean
}

export interface Technician_Data {
  id: string
  techniciansName: string
  openWorkOrders: string
  completedJobs: string
}

export interface AddVendorProps {
  vendors: VENDOR_PAYLOAD
  editMode: boolean
  closeModal: () => void
  getVendor: () => void
}

export interface AccountPayableProps {
  invoice: string
  mooringid: string
  name: string
  technicianName: string
  services: string
  time: string
  amount: string
}

export interface AccountRecievableProps {
  invoice: string
  mooringid: string
  name: string
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
  workOrderData: WorkOrder_PAYLOAD
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

export interface StatCardProps {
  items: {
    title: string
    percentage: number
    count: number
  }[]
}
