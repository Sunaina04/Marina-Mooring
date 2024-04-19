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
