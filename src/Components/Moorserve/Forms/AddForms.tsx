
// import ButtonComponent from '../../Common/ButtonComponent'

// import { Dropdown } from 'primereact/dropdown'
// import InputComponent from '../../Common/InputComponent'
// import React, { useEffect, useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import CustomModal from "../../customComponent/CustomModal";
// import { InputText } from "primereact/inputtext";
// import {
//     FORMS_PAYLOAD,
//     FORMS_RESPONSE,
// } from "../../../Services/MoorServe/types";
// import {
//     useDownloadFormMutation,
//     useGetFormsMutation,
//     useUploadFormMutation,
// } from "../../../Services/MoorServe/moorserve";
// const AddForms = () => {

//     const [formsData, setFormsData] = useState<FORMS_PAYLOAD[]>([]);
//     const [customerName, setCustomerName] = useState("");
//     const [customerID, setCustomerID] = useState("");
//     const [formName, setFormName] = useState("");
//     const [file, setFile] = useState<File | null>(null); // For file upload
//     const [getForms] = useGetFormsMutation();
//     const [uploadForms] = useUploadFormMutation();
//     const [downloadForms] = useDownloadFormMutation();

//     const handleButtonClick = () => {
//         setIsModalOpen(true);
//     };

//     const handleModalClose = () => {
//         console.log("CLICKED");
//         setIsModalOpen(false);
//     };

//     const handleDownload = async (rowData: any) => {
//         console.log("ROW DATA", rowData.formName)
//         try {
//             const response = await downloadForms({ filename: rowData.formName }).unwrap();
//             console.log("Form downloaded successfully:", response);
//         } catch (error) {
//             console.error("Error fetching forms:", error);
//         }
//     };

//     // Fetch forms data from the backend
//     const getFormsData = async () => {
//         try {
//             const response = await getForms({}).unwrap();
//             const { status, content } = response as FORMS_RESPONSE;
//             if (status === 200 && Array.isArray(content)) {
//                 setFormsData(content);
//             }
//         } catch (error) {
//             console.error("Error fetching forms:", error);
//         }
//     };

//     // Save form data
//     const handleSave = async () => {
//         const formData = new FormData();
//         if (file) {
//             // Convert the file string to a Blob
//             const blob = new Blob([file], { type: "application/octet-stream" });
//             // Create a File object from the Blob
//             const fileBlob = new File([blob], "filename.txt");
//             // Append the File object to the FormData
//             formData.append("file", fileBlob);
//         }
//         formData.append("customerName", customerName);
//         formData.append("customerId", customerID);

//         try {
//             // Call the uploadForms mutation with formData
//             const response = await uploadForms(formData).unwrap();
//             console.log("Form uploaded successfully:", response);
//             const { status, content } = response as FORMS_RESPONSE;
//             if (status === 200) {
//                 // Refresh forms data
//                 getFormsData();
//                 // Close modal
//                 setIsModalOpen(false);
//                 // Reset form fields
//                 setCustomerName("");
//                 setCustomerID("");
//                 setFormName("");
//                 setFile(null);
//             }
//         } catch (error) {
//             console.error("Error uploading form:", error);
//             // Handle error
//         }
//     };

//     useEffect(() => {
//         getFormsData();
//     }, []);




//     return (
//         <div>
//             <div className="w-full h-full">
//                 <h1 className="ml-5 text-lg font-bold">Work Order</h1>

//                 <div className="flex justify-around mt-3">
//                     <div>
//                         <span className="font-semibold text-sm">Customer Name</span>
//                         <div className="mt-2">
//                             <InputComponent
//                                 type="text"
//                                 id="customerName"
//                                 name="customerName"
//                                 value={customerName}
//                                 onChange={(e) => setCustomerName(e.target.value)}
//                                 style={{
//                                     width: "13vw",
//                                     height: "4vh",
//                                     border: "1px solid gray",
//                                     borderRadius: "0.50rem",
//                                     fontSize: "0.80vw",
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <span className="font-semibold text-sm">Customer ID</span>
//                         <div className="mt-2">
//                             <InputComponent
//                                type="text"
//                                id="customerID"
//                                name="customerID"
//                                value={customerID}
//                                onChange={(e) => setCustomerID(e.target.value)}
//                                 style={{
//                                     width: "13vw",
//                                     height: "4vh",
//                                     border: "1px solid gray",
//                                     borderRadius: "0.50rem",
//                                     fontSize: "0.80vw",
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <span className="font-semibold text-sm">Form Name:</span>
//                         <div className="mt-2">
//                             <InputComponent
//                                 type="text"
//                                 id="formName"
//                                 name="formName"
//                                 value={formName}
//                                 onChange={(e) => setFormName(e.target.value)}
//                                 style={{
//                                     width: "13vw",
//                                     height: "4vh",
//                                     border: "1px solid gray",
//                                     borderRadius: "0.50rem",
//                                     fontSize: "0.80vw",
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="">

//                     <div className="flex justify-around ml-3 mt-4 ">
//                         <div>
//                             <span className="font-semibold text-sm">upload File</span>
//                             <div className="mt-2">

//                             </div>
//                         </div>


//                     </div>



//                 </div>








//                 <div className="flex gap-3 mt-4 ml-6">
//                     <ButtonComponent
//                         onClick={() => { }}
//                         label={"Save"}
//                         style={{
//                             width: "5vw",
//                             backgroundColor: "black",
//                             cursor: "pointer",
//                             fontWeight: "bolder",
//                             fontSize: "1vw",
//                             border: "1px solid  gray",
//                             color: "white",
//                             borderRadius: "0.50rem",
//                         }}
//                     />
//                     <ButtonComponent
//                         onClick={() => { }}
//                         label={"Back"}
//                         text={true}
//                         style={{ backgroundColor: "white", color: "black", border: "none" }}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddForms


import React from 'react'

const AddForms = () => {
  return (
    <div>
      
    </div>
  )
}

export default AddForms
