
import { DataTable } from "primereact/datatable";

import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../Customer/AddCustomer";
import AddMoorings from "./AddMoorings";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { useGetMooringsMutation } from "../../../Services/MoorManage/moormanage";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([]);
  const [getMoorings] = useGetMooringsMutation();
 
  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };


  const MooringsHeader = () => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-extrabold mb-2">Moorings</span>
        <div className="flex items-center gap-2 p-2">
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search by name, ID, mooring no, boat name, phone no..."
              className="h-[5vh] w-[48vh] cursor-pointer text-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  const getMooringsData = async () => {
    const response =  await getMoorings({});
    console.log("RESPONSE" , response)
  }

  useEffect (() => {
    getMooringsData();
  },[])

  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Moorings
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-20 mt-14">

          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
            style={{ borderRadius: "1rem", overflow: "hidden" }}
          >
            <AddMoorings />
          </CustomModal>
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[28vw] ml-20 mt-10">
        <DataTable
          value={boatData}
          header={MooringsHeader}
          scrollable={true}
          tableStyle={{
            // minWidth: "20rem",
            fontSize: "12px",
            color: "#000000",
            fontWeight: 600,
            backgroundColor: "#D1D1D1",
          }}
          size="small"
        >
          <Column
            header="ID:"
            field="customerId"
            style={{ width: "6vw" }}
          ></Column>
          <Column
            style={{ width: "6vw" }}
            field="customerName"
            header="Name:"
          ></Column>
          <Column
            style={{ width: "10vw" }}
            field="emailAddress"
            header="Email:"
          ></Column>
          <Column
            style={{ width: "5vw" }}
            field="phone"
            header="Phone:"
          ></Column>
          {/* <Column
            style={{ width: "10vw" }}
            field="address"
            header="Address"
          ></Column>
          <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  label="Edit"
                  className="p-button-text p-button-info"
                  onClick={() => handleEdit(rowData)}
                />
                <Button
                  label="Delete"
                  className="p-button-text p-button-danger"
                  onClick={() => handleDelete(rowData)}
                />
              </div>
            )}
          ></Column> */}
        </DataTable>
      </div>
    </>
  );
};

export default Moorings;
