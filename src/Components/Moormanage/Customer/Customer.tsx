import { useState } from "react";
import CustomModal from "../../customComponent/CustomModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import AddCustomer from "./AddCustomer";

import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";

interface CustomerData {
  id: string;
  customerName: string;
  email: string;
  phone: number;
  address: string;
}

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      customerName: "Ram",
      email: "John@gmail.com",
      phone: 1456852896,
      address: "Punjab",
    },
    {
      id: "01",
      customerName: "Ram",
      email: "John@gmail.com",
      phone: 1456852896,
      address: "Punjab",
    },
    {
      id: "01",
      customerName: "Ram",
      email: "John@gmail.com",
      phone: 1456852896,
      address: "Punjab",
    },
    {
      id: "01",
      customerName: "Ram",
      email: "John@gmail.com",
      phone: 1456852896,
      address: "Punjab",
    },
  ]);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1
            style={{
              marginTop: "40px",
              opacity: "0.3",
              fontSize: "26px",
              fontWeight: "400",
            }}
            className="mt-12 mr-10"
          >
            Moormanage/Customer
          </h1>
        </div>
        <div className="flex flex-col items-center mr-4 mt-10">
          <div>
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
              }}
              onClick={handleButtonClick}
              visible={modalVisible}
              onHide={handleModalClose}
              header="Add New Customer"
            >
              <AddCustomer />
            </CustomModal>
          </div>
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300  w-[50vw] mt-11 ">
        <DataTable
          value={boatData}
          header={""}
          tableStyle={{
            minWidth: "20rem",
            fontSize: "12px",
            color: "#000000",
            fontWeight: 600,
            backgroundColor: "#D1D1D1",
          }}
          size="small"
        >
          <Column header="ID" field="id" style={{ width: "3vw" }}></Column>
          <Column
            style={{ width: "8vw" }}
            field="customerName"
            header="Customer Name"
          ></Column>
          <Column
            style={{ width: "11vw" }}
            field="email"
            header="Email"
          ></Column>

          <Column
            style={{ width: "11vw" }}
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
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">
                  Edit
                </span>

                <span className="text-red-600 font-bold underline cursor-pointer">
                  Delete
                </span>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Customer;
