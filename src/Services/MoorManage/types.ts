export interface CUSTOMER_PAYLOAD {
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
  message: string;
  status: number;
  errorList: null;
  time: null;
  content: null;
}
