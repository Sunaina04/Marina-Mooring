import { useEffect, useState } from "react";
import CustomModal from "../../customComponent/CustomModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import { Button } from "primereact/button";
import StatCard from "../../StatCard/StatCard";

import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
} from "../../../Services/MoorManage/moormanage";
import { ErrorResponse } from "../../../Services/authentication/types";
import {
  CUSTOMER_PAYLOAD,
  CUSTOMER_RESPONSE,
} from "../../../Services/MoorManage/types";

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CUSTOMER_PAYLOAD[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [getCustomer] = useGetCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditMode(false);
  };

  const statCardsData = [
    [
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 43324 },
      { title: "Total Customers", percentage: 17, count: 44324 },
      { title: "Total Customers", percentage: 17, count: 58765 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 46789 },
    ],

    [{ title: "Services", percentage: 25, count: 34576 }],

    [{ title: "Work Orders", percentage: 58, count: 8421 }],
  ];

  const getCustomerData = async () => {
    console.log("response customer");

    try {
      const response = await getCustomer({}).unwrap();
      console.log("Response:", response);
  
      if (typeof response === 'object' && response !== null && 'data' in response) {
        console.log("Response data:", response.data);
        setBoatData(response.data as CUSTOMER_PAYLOAD[]);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error occurred while fetching customer data:", error);
  
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const { message: msg } = error.data as ErrorResponse;
        console.error("Error message:", msg);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData);
    setEditMode(true);
  };


  const handleDelete = async (rowData: any) => 
    // Handle delete action here, using the data from rowData if necessary
    console.log("Delete clicked for:", rowData, rowData?.id);

    try {
      const response = await deleteCustomer({ id: rowData?.id });
      console.log("RESPONSE", response);
      getCustomerData();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <>
      <div className="flex  items-center ml-9">
        <div>
          <h1 className="mt-14 ml-12 opacity-30 text-2xl font-normal">
            Moormanage/Customer
          </h1>
        </div>
        <div className="flex gap-4 mt-14 ml-[20.60rem]">

        <div>
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search"
              className="h-[5vh] cursor-pointer font-bold"
            />
          </div>
        </div>

          <CustomModal
            label={"ADD NEW"}
            style={{
              width: "50vw",
              height: "80vh",
              backgroundColor: "black",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "1rem",
            }}
            onClick={handleButtonClick}
            visible={modalVisible || editMode}
            onHide={handleModalClose}
          >
            <AddCustomer customer={selectedCustomer} editMode={editMode} closeModal={handleModalClose} getCustomer={getCustomerData}/>
          </CustomModal>
        </div>
      </div>

      <div className="flex  mt-10 ml-12 mr-20">
        {statCardsData.map((items) => (
          <StatCard key={items[0].title} items={items} />
        ))}
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[63.50vw] ml-20 mt-10">
        <DataTable
          value={boatData}
          header={""}
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
            header="ID"
            field="customerId"
            style={{ width: "8vw" }}
          ></Column>
          <Column
            style={{ width: "12vw" }}
            field="customerName"
            header="Customer Name"
          ></Column>
          <Column
            style={{ width: "12vw" }}
            field="emailAddress"
            header="Email"
          ></Column>
          <Column
            style={{ width: "12vw" }}
            field="phone"
            header="Phone"
          ></Column>
          <Column
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
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Customer;


