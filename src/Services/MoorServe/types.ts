export interface FORMS_PAYLOAD {
  id: number;
  submittedBy: string;
  formName: string;
  submittedDate: string;
  downloadUrl: string;
}

export interface FORMS_RESPONSE {
  message: string;
  status: number;
  errorList: null;
  time: string;
  content: {
    id: number;
    submittedBy: string;
    formName: string;
    submittedDate: string;
    downloadUrl: string;
  };
}

export interface UPLOAD_PAYLOAD {
  file: string;
  customerName: string;
  customerId: string;
}

export interface WorkOrder_PAYLOAD {
  id: number;
  creationDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  customerName: string;
  mooringNumber: string;
  boatYard: string;
  assignedTo: string;
  dueDate: string;
  scheduleDate: string;
  status: string;
  time: string;
  reportProblem: string;
}

export interface WorkOrder_RESPONSE {
  message: string;
  status: number;
  errorList: [];
  time: string;
  content: {
    id: number;
    creationDate: string;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    customerName: string;
    mooringNumber: string;
    boatYard: string;
    assignedTo: string;
    dueDate: string;
    scheduleDate: string;
    status: string;
    time: string;
    reportProblem: string;
  };
}
