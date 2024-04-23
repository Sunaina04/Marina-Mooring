import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import { InputText } from "primereact/inputtext";
import {
  FORMS_PAYLOAD,
  FORMS_RESPONSE,
} from "../../../Services/MoorServe/types";
import {
  useDownloadFormMutation,
  useGetFormsMutation,
  useUploadFormMutation,
} from "../../../Services/MoorServe/moorserve";
import { Button } from "primereact/button";

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formsData, setFormsData] = useState<FORMS_PAYLOAD[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [formName, setFormName] = useState("");
  const [file, setFile] = useState<File | null>(null); // For file upload
  const [getForms] = useGetFormsMutation();
  const [uploadForms] = useUploadFormMutation();
  const [downloadForms] = useDownloadFormMutation();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("CLICKED");
    setIsModalOpen(false);
  };

  const handleDownload = async (rowData: any) => {
    console.log("ROW DATA", rowData.formName);
    try {
      const response = await downloadForms({
        filename: rowData.formName,
      }).unwrap();
      console.log("Form downloaded successfully:", response);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // Fetch forms data from the backend
  const getFormsData = async () => {
    try {
      const response = await getForms({}).unwrap();
      const { status, content } = response as FORMS_RESPONSE;
      if (status === 200 && Array.isArray(content)) {
        setFormsData(content);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  // Save form data
  const handleSave = async () => {
    const formData = new FormData();
    if (file) {
      // Convert the file string to a Blob
      const blob = new Blob([file], { type: "application/octet-stream" });
      // Create a File object from the Blob
      const fileBlob = new File([blob], "filename.txt");
      // Append the File object to the FormData
      formData.append("file", fileBlob);
    }
    formData.append("customerName", customerName);
    formData.append("customerId", customerID);

    try {
      // Call the uploadForms mutation with formData
      const response = await uploadForms(formData).unwrap();
      console.log("Form uploaded successfully:", response);
      const { status, content } = response as FORMS_RESPONSE;
      if (status === 200) {
        // Refresh forms data
        getFormsData();
        // Close modal
        setIsModalOpen(false);
        // Reset form fields
        setCustomerName("");
        setCustomerID("");
        setFormName("");
        setFile(null);
      }
    } catch (error) {
      console.error("Error uploading form:", error);
      // Handle error
    }
  };

  useEffect(() => {
    getFormsData();
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Forms</span>
      {/* <span
        style={{
          fontFamily: "Lato",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "16.8px",
          letterSpacing: "0.4837472140789032px",
          textAlign: "right",
        }}
      >
        View All
      </span> */}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            MOORSERVE/Forms Library
          </h1>
        </div>

        <div className=" mr-64 mt-14">
          <CustomModal
           header="Form Details"
            onClick={handleButtonClick}
            visible={isModalOpen}
            onHide={handleModalClose}
            label="Upload New"
            icon={true}
          >
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <InputText
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={customerName}
                  style={{
                    width: "13vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="customerID"
                  className="block text-sm font-medium text-gray-700"
                >
                   ID
                </label>
                <InputText
                  type="text"
                  id="customerID"
                  name="customerID"
                  value={customerID}
                  style={{
                    width: "13vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                  onChange={(e) => setCustomerID(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="">
                <label
                  htmlFor="formName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Form Name
                </label>
                <InputText
                  type="text"
                  id="formName"
                  name="formName"
                  style={{
                    width: "13vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload File
              </label>
              <InputText
                type="file"
                id="fileUpload"
                name="fileUpload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-6 flex ">
              <Button
                type="button"
                onClick={handleSave}
                label={"Save"}
                style={{
                  width: "5vw",
                  backgroundColor: "black",
                  cursor: "pointer",
                  fontWeight: "bolder",
                  fontSize: "1vw",
                  border: "1px solid  gray",
                  color: "white",
                  borderRadius: "0.50rem",
                }}
              />

              <Button
                type="button"
                onClick={handleModalClose}
                label={"Cancel"}
                style={{
                  width: "5vw",
                  backgroundColor: "black",
                  cursor: "pointer",
                  fontWeight: "bolder",
                  fontSize: "1vw",
                  border: "1px solid  gray",
                  color: "white",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[61vw] ml-20">
        <DataTable value={formsData} header={header} tableStyle={{}}>
          <Column header="ID" field="id" style={{ width: "4vw" }}></Column>
          <Column
            field="submittedBy"
            header="Submitted by"
            style={{ width: "12vw" }}
          ></Column>
          <Column
            field="formName"
            header="Form Name"
            style={{ width: "11vw" }}
          ></Column>
          <Column
            field="submittedDate"
            header="Submitted Date"
            style={{ width: "12vw" }}
          ></Column>
          <Column
            header="Action"
            style={{ width: "12vw" }}
            body={(rowData) => (
              // <Button
              //   type="button"
              //   onClick={() => handleDownload(rowData)}
              //   label={"Downloads"}
              //   style={{
              //     width: "5vw",
              //     backgroundColor: "black",
              //     cursor: "pointer",
              //     fontWeight: "bolder",
              //     fontSize: "1vw",
              //     border: "1px solid  gray",
              //     color: "white",
              //     borderRadius: "0.50rem",
              //   }}

              // />
              <p
                onClick={() => handleDownload(rowData)}
                style={{
                  width: "5vw",
                  cursor: "pointer",
                  fontWeight: "bolder",
                  fontSize: "1vw",
                }}
              >
                DownLoad
              </p>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Forms;
