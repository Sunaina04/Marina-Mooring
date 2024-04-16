export interface CUSTOMER_PAYLOAD {
  customerName: string;
  customerId: string;
  phone: string;
  emailAddress: string;
  streetHouse: string;
  sectorBlock: string;
  state: string;
  country: string;
  pinCode: string;
  note: string;
}

export interface CUSTOMER_RESPONSE {
  // data : [
  id: string;
  customerName: string;
  customerId: string;
  phone: string;
  emailAddress: string;
  streetHouse: string;
  sectorBlock: string;
  state: string;
  country: string;
  pinCode: string;
  note: string;
  // ]
}

export interface MOORING_PAYLOAD {
  id: number;
  mooringNumber: string;
  customerName: string;
  harbor: string;
  waterDepth: string;
  gpsCoordinates: string;
  boatName: string;
  boatSize: string;
  boatType: string;
  boatWeight: string;
  conditionOfEye: string;
  bottomChainCondition: string;
  topChainCondition: string;
  shackleSwivelCondition: string;
  pennantCondition: string;
  sizeOfWeight: string;
  typeOfWeight: string;
  deptAtMeanHighWater: string;
}

export interface MOORING_RESPONSE {
  message: string;
  status: number;
  errorList: string[];
  time: string;
  content: {
    id: string;
    mooringNumber: string;
    customerName: string;
    harbor: string;
    waterDepth: string;
    gpsCoordinates: string;
    boatName: string;
    boatSize: string;
    boatType: string;
    boatWeight: string;
    conditionOfEye: string;
    bottomChainCondition: string;
    topChainCondition: string;
    shackleSwivelCondition: string;
    pennantCondition: string;
    sizeOfWeight: string;
    typeOfWeight: string;
    deptAtMeanHighWater: string;
  };
}

export interface VENDOR_PAYLOAD {
  id: number;
  companyName: string;
  companyPhoneNumber: string;
  website: string;
  street: string;
  aptSuite: string;
  state: string;
  country: string;
  zipCode: number;
  companyEmail: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
  salesRepPhoneNumber: string;
  salesRepEmail: string;
  salesRepNote: string;
  primarySalesRep: boolean;
}

export interface VENDOR_RESPONSE {
  message: string;
  status: number;
  errorList: string[];
  time: string;
  content: {
    id: number;
    companyName: string;
    companyPhoneNumber: string;
    website: string;
    street: string;
    aptSuite: string;
    state: string;
    country: string;
    zipCode: number;
    companyEmail: string;
    accountNumber: string;
    firstName: string;
    lastName: string;
    salesRepPhoneNumber: string;
    salesRepEmail: string;
    salesRepNote: string;
    primarySalesRep: boolean;
  };
}

export interface BOATYARD_DATA {
  id: string;
  moorings: string;
  boatyards: number;
  name: string;
  phoneNumber: string;
  email: string;
  boatyardDetails: {
    id: number;
    name: string;
    address: string;
    phone: string;
    mooring: number;
    mooringDetails: {
      id: string;
      mainContact: string;
      mooringNumber: string;
      boatName: string;
    }[];
  }[];
}

export interface BOATYARD_PAYLOAD {
  id: number;
  boatyardId: string;
  mooringName: string;
  ownerName: string;
  emailAddress: string;
  phone: string;
}

export interface BOATYARD_RESPONSE {
  status: number;
  message: string;
  errorList: [];
  time: string;
  content: {
    id: number;
    boatyardId: string;
    mooringName: string;
    ownerName: string;
    emailAddress: string;
    phone: string;
  };
}

export interface TECHNICIAN_PAYLOAD {
  id: number;
  technicianName: string;
  technicianId: string;
  emailAddress: string;
  phone: string;
  streetHouse: string;
  sectorBlock: string;
  state: string;
  country: string;
  pincode: string;
  note: string;
}

export interface TECHNICIAN_RESPONSE {
  status: number;
  message: string;
  errorList: [];
  time: string;
  content: {
    id: number;
    technicianName: string;
    technicianId: string;
    emailAddress: string;
    phone: string;
    streetHouse: string;
    sectorBlock: string;
    state: string;
    country: string;
    pincode: string;
    note: string;
  };
}
