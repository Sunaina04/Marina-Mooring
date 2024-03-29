import { useState } from "react";
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
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300  w-[65vw] mt-11 ">
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
          <Column
            header=""
            field="id"
            style={{ textAlign: "center", width: "3vw" }}
          ></Column>
          <Column
            style={{ width: "8vw" }}
            field="boatName"
            header="Moorings"
          ></Column>
          <Column
            style={{ width: "8vw" }}
            field="name"
            header="Customer Name"
          ></Column>
          <Column style={{ width: "15vw" }} field="date" header="Date"></Column>
          <Column
            style={{ width: "11vw" }}
            field="measurement"
            header="Measurement"
          ></Column>
          <Column
            style={{ width: "7vw" }}
            field="place"
            header="Place"
          ></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">
                  Edit
                </span>
                <span className="text-black  font-bold underline cursor-pointer">
                  Activate
                </span>

                <span className="text-red-600 font-bold underline cursor-pointer">
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
