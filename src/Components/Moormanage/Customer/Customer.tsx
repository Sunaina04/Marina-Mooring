import { useState } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import { Button } from "primereact/button";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
    {
      id: "01",
      boatName: "Suncatcher",
      name: "John Smith",
      date: "15, March 2024 to 15, March 2024",
      measurement: "Length: 10m, Width: 3.8m",
      place: "Boatyard",
    },
  ]);

  const CustomerHeader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Moorings Coming up for Service</span>
      <span
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
      </span>
    </div>
  );

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
          <h1 className="mt-12 mr-10">Moormanage/Customer</h1>
        </div>
        <div className="flex flex-col items-center mr-4 mt-10">
          <div className="">
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
      <div
        style={{
          background: "#F2F2F2",
          borderRadius: "6px",
          border: "1px solid #D1D1D1",
          maxWidth: "76rem",
          marginTop: "40px",
        }}
      >
        <DataTable
          value={boatData}
          header={CustomerHeader}
          tableStyle={{
            minWidth: "50rem",
          }}
        >
          <Column
            header=""
            field="id"
            style={{ width: "3rem", textAlign: "center" }}
          ></Column>
          <Column field="boatName" header="Boat Name"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="date" header="Date"></Column>
          <Column field="measurement" header="Measurement"></Column>
          <Column field="place" header="Place"></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-2">
                <span className="text-black underline cursor-pointer">
                  Edit
                </span>
                <span className="text-black underline cursor-pointer">
                  Activate
                </span>
                <span className="text-red-500 underline cursor-pointer">
                  Deactivate
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
