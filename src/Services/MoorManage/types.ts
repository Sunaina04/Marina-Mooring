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
  id: string;
  mooringNumber: string;
  ownerName: string;
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
  weight: string;
  sizeOfWeight: string;
  typeOfWeight: string;
  deptAtMeanHighWater: string;
  note: string;
}

export interface MOORING_RESPONSE {
  message: string;
  status: number;
  errorList: string[];
  time: string;
  content: {};
}
