export interface Login_Payload {
  username: string
  password: string
}

export interface SignUp_Payload {
  firstname: string
  lastname: string
  phoneNumber: string
  email: string
  password: string
}

export interface ResetPassword_Payload {
  newPassword: string
  confirmPassword: string
}

export interface ForgotPassword_Payload {
  email: string
}

export interface UserData {
  id: string
  firstname: string
  lastname: string
  email: string
  password: string
  creationDate: string
  lastModifiedDate: string
  phoneNumber: string
}

export interface RoleData {
  id: string
  creationDate: string
  lastModifiedDate: string
  name: string
  description: string
}

export interface Login_Response {
  status: number
  message: string
  user: UserData
  token: string
  role: RoleData
}

export type SignUp_Response = {
  data: {
    status: number
    message: string
    data: UserData
  }
}

export interface ResetPassword_Response {
  status: number
  message: string
  errorList: string[]
  time: string
  content: Record<string, any>
}

export interface ForgotPassword_Response {
  status: number
  message: string
  data: any
}

export interface AuthenticationData {
  token: string
  data: UserData
}

export interface ErrorResponse {
  status: number
  message: string
  data: string
}

export type ErrorResponseForgotPassword = {
  data: {
    response: string
  }
}

export interface validateEmailResponse {
  response: string
  status: number
  success: boolean
}

export interface Customer_Payload {
  id: number
  creationDate: string
  createdBy: string
  lastModifiedDate: string
  lastModifiedBy: string
  customerName: string
  customerId: string
  phone: string
  emailAddress: string
  streetHouse: string
  aptSuite: string
  state: string
  country: string
  zipCode: string
}

export interface AddCustomer_Payload {
  id: number
  customerName: string
  customerId: string
  phone: string
  emailAddress: string
  streetHouse: string
  aptSuite: string
  state: string
  country: string
  zipCode: string
}

export interface Customer_Response {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    Customer_Payload: Customer_Payload
  }
}

export interface Mooring_Payload {
  id: number
  mooringNumber: string
  customerName: string
  harbor: string
  waterDepth: string
  gpsCoordinates: string
  boatName: string
  boatSize: string
  boatType: string
  boatWeight: string
  conditionOfEye: string
  bottomChainCondition: string
  topChainCondition: string
  shackleSwivelCondition: string
  pennantCondition: string
  sizeOfWeight: string
  typeOfWeight: string
  deptAtMeanHighWater: string
}

export interface Mooring_Response {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    Mooring_Payload: Mooring_Payload
  }
}

export interface Vendor_Payload {
  id: number
  companyName: string
  companyPhoneNumber: string
  website: string
  street: string
  aptSuite: string
  state: string
  country: string
  zipCode: number
  companyEmail: string
  accountNumber: string
  firstName: string
  lastName: string
  salesRepPhoneNumber: string
  salesRepEmail: string
  salesRepNote: string
  primarySalesRep: boolean
}

export interface Vendor_Response {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    Vendor_Payload: Vendor_Payload
  }
}

export interface BoatYard_Data {
  id: string
  moorings: string
  boatyards: number
  name: string
  phoneNumber: string
  email: string
  boatyardDetails: {
    id: number
    name: string
    address: string
    phone: string
    mooring: number
    mooringDetails: {
      id: string
      mainContact: string
      mooringNumber: string
      boatName: string
    }[]
  }[]
}

export interface BoatYard_Payload {
  id: number
  boatyardId: string
  mooringName: string
  ownerName: string
  emailAddress: string
  phone: string
}

export interface BoatYard_Response {
  status: number
  message: string
  errorList: []
  time: string
  content: {
    BoatYard_Payload: BoatYard_Payload
  }
}

export interface Technician_Payload {
  id: number
  technicianName: string
  technicianId: string
  emailAddress: string
  phone: string
  streetHouse: string
  sectorBlock: string
  state: string
  country: string
  pincode: string
  note: string
}

export interface Technician_Response {
  status: number
  message: string
  errorList: []
  time: string
  content: {
    Technician_Payload: Technician_Payload
  }
}

export interface Forms_Payload {
  id: number
  submittedBy: string
  formName: string
  submittedDate: string
  downloadUrl: string
}

export interface Forms_Response {
  message: string
  status: number
  errorList: null
  time: string
  content: {
    Forms_Payload: Forms_Payload
  }
}

export interface Upload_Payload {
  file: string
  customerName: string
  customerId: string
}

export interface WorkOrder_Payload {
  id: number
  creationDate: string
  createdBy: string
  lastModifiedDate: string
  lastModifiedBy: string
  customerName: string
  customerId: string
  mooringNumber: string
  boatYard: string
  assignedTo: string
  dueDate: string
  scheduleDate: string
  status: string
  time: string
  reportProblem: string
}

export interface WorkOrder_Response {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    WorkOrder_Payload: WorkOrder_Payload
  }
}
