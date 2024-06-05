import { Country, MetaData, Role, State } from './CommonType'

export interface UserLoginPayload {
  name: string
  email: string
  phoneNumber: string
  password: string
  userID: string
  customerOwnerId: string
  roleResponseDto: Role
  stateResponseDto: State
  countryResponseDto: Country
}
export interface UserResponse {
  id: number
  name: string
  email: string
  phoneNumber: string
  customerOwnerId: string
  roleResponseDto: Role
  stateResponseDto: State
  countryResponseDto: Country
  street: string
  apt: string
  zipCode: string
  companyName: string
}

export interface GetUserResponse {
  message: string
  status: number
  errorList: [string]
  time: string
  content: UserResponse
}

export interface DeleteUserResponse {
  message: string
  status: number
  errorList: []
  time: number
  content: number
}

export interface AddUserPayload {
  name: string
  email: string
  phoneNumber: string
  password: string
  userID: string
  role: string
  state: string
  country: string
  street: string
  apt: string
  zipCode: string
  confirmPassword: string
}
export interface SaveUserResponse {
  message: string
  status: number
  errorList: [string]
  time: string
  content: {}
}
export interface LoginPayload {
  username: string
  password: string
}

export interface SignUpPayload {
  firstname: string
  lastname: string
  phoneNumber: string
  email: string
  password: string
}

export interface ResetPasswordPayload {
  newPassword: string
  confirmPassword: string
}

export interface ForgotPasswordPayload {
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
  role: RoleData
}

export interface RoleData {
  id: number
  creationDate: string
  lastModifiedDate: string
  name: string
  description: string
}

export interface LoginResponse {
  status: number
  message: string
  user: UserData
  token: string
  refreshToken: string
  role: RoleData
}

export type SignUpResponse = {
  data: {
    status: number
    message: string
    data: UserData
  }
}

export interface ResetPasswordResponse {
  status: number
  message: string
  errorList: string[]
  time: string
  content: Record<string, any>
}

export interface ForgotPasswordResponse {
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
  data: {
    content: string
    message: string
    status: number
  }
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

export interface CustomerPayload {
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

export interface UpdateMooringPayload {
  id: number
  mooringId: string
  customerId: number
  harbor: string
  waterDepth: string
  gpsCoordinates: '9number                                                                                  152'
  boatyardId: number
  boatName: string
  boatSize: string
  boatTypeId: number
  boatWeight: string
  sizeOfWeightId: number
  typeOfWeightId: number
  eyeConditionId: number
  topChainConditionId: number
  bottomChainConditionId: number
  shackleSwivelConditionId: number
  pennantConditionId: number
  depthAtMeanHighWater: number
  statusId: number
}

export interface AddCustomerPayload {
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

export interface CustomerResponse {
  message: string
  status: number
  errorList: []
  time: string
  content: { CustomerPayload: CustomerPayload }
}

export interface DeleteCustomerResponse {
  message: string
  status: number
  errorList: []
  time: string
}

export interface customerResponseDto {
  customerResponseDto: {
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
    mooringResponseDtoList: MooringResponseDtoList
  }
  boatyardNames: []
}

export interface CustomersWithMooringResponse {
  message: string
  status: number
  errorList: []
  time: number
  content: customerResponseDto
}

export interface MooringMetaDataTypes {
  id: number
  condition: string
  description: string
  weight: string
  unitType: string
  boatType: string
  type: string
}

export interface MooringPayload {
  boatyardName: string
  id: number
  mooringNumber: string
  mooringId: string
  customerName: string
  harbor: string
  waterDepth: string
  gpsCoordinates: string
  boatName: string
  boatSize: string
  boatType: MooringMetaDataTypes
  boatWeight: string
  eyeCondition: MooringMetaDataTypes
  bottomChainCondition: MooringMetaDataTypes
  topChainCondition: MooringMetaDataTypes
  shackleSwivelCondition: MooringMetaDataTypes
  pennantCondition: MooringMetaDataTypes
  sizeOfWeight: MooringMetaDataTypes
  typeOfWeight: MooringMetaDataTypes
  depthAtMeanHighWater: number
}

export interface MooringResponseDtoList {
  id: number
  mooringId: string
  mooringName: string
  customerName: string
  harbor: string
  waterDepth: string
  gpsCoordinates: string
  boatyardName: string
  boatName: string
  boatSize: string
  boatType: MooringMetaDataTypes
  boatWeight: string
  eyeCondition: MooringMetaDataTypes
  bottomChainCondition: MooringMetaDataTypes
  topChainCondition: MooringMetaDataTypes
  shackleSwivelCondition: MooringMetaDataTypes
  pennantCondition: MooringMetaDataTypes
  sizeOfWeight: MooringMetaDataTypes
  typeOfWeight: MooringMetaDataTypes
  depthAtMeanHighWater: number
}

export interface MooringResponse {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    MooringPayload: MooringPayload
  }
}

export interface VendorPayload {
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
  stateResponseDto: MetaData
  countryResponseDto: MetaData
  remitStreet: string
  remitApt: string
  remitStateResponseDto: MetaData
  remitCountryResponseDto: MetaData
  remitZipCode: string
  remitEmailAddress: string
  userId: 2
}

export interface VendorResponse {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    VendorPayload: VendorPayload
  }
}

export type BoatYardData = {
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

export interface BoatYardPayload {
  id: number
  boatyardId: string
  boatyardName: string
  emailAddress: string
  phone: string
  street: string
  apt: string
  state: string
  country: string
  zipCode: string
  mainContact: string
  gpsCoordinates: string
  mooringInventoried: number
  mooringResponseDtoList: []
}

export interface RowExpansionBoatYardData {
  Response: [
    {
      id: number
      boatyardId: string
      boatyardName: string
      emailAddress: string
      phone: string
      street: string
      apt: string
      state: string
      country: string
      zipCode: string
      mainContact: string
      gpsCoordinates: string
      mooringInventoried: number
    },
  ]
}

export interface BoatYardResponse {
  status: number
  message: string
  errorList: []
  time: string
  content: BoatYardPayload
}

export interface MooringWithBoatYardContent {
  id: 1
  mooringName: string
  mooringId: string
  customerName: string
  mooringNumber: number
  harbor: string
  waterDepth: string
  gpsCoordinates: string
  boatyardName: string
  boatName: string
  boatSize: string
  boatType: MooringMetaDataTypes
  boatWeight: string
  eyeCondition: MooringMetaDataTypes
  bottomChainCondition: MooringMetaDataTypes
  topChainCondition: MooringMetaDataTypes
  shackleSwivelCondition: MooringMetaDataTypes
  pennantCondition: MooringMetaDataTypes
  sizeOfWeight: MooringMetaDataTypes
  typeOfWeight: MooringMetaDataTypes
  depthAtMeanHighWater: number
  status: string
  boatyardNames: string
  customerId: string
}

export interface MooringWithBoatYardResponse {
  message: string
  status: number
  errorList: []
  time: number
  content: MooringWithBoatYardContent
}

export interface TechnicianPayload {
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

export interface TechnicianResponse {
  status: number
  message: string
  errorList: []
  time: string
  content: {
    TechnicianPayload: TechnicianPayload
  }
}

export interface FormsPayload {
  id: number
  submittedBy: string
  formName: string
  submittedDate: string
  downloadUrl: string
}

export interface FormsResponse {
  message: string
  status: number
  errorList: null
  time: string
  content: {
    FormsPayload: FormsPayload
  }
}

export interface UploadPayload {
  file: string
  customerName: string
  customerId: string
}

export interface WorkOrderPayload {
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

export interface WorkOrderResponse {
  message: string
  status: number
  errorList: []
  time: string
  content: {
    WorkOrderPayload: WorkOrderPayload
  }
}

export interface ContentData {
  name: string
  customerName: string
  id: number
  label: undefined
}

export interface Content {
  content(content: any): unknown
  data: ContentData
}

export interface MetaDataResponse {
  message: string
  status: number
  errorList: []
  time: number
  content: Content
}
