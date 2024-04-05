import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";
import AddEstimates from "./AddEstimates";

interface CustomerData {
  id: string;
  boatName: string;
  ownername: string;
  type: string;
  condition: string;
  mesurmement: string;
  email: string;
  phone: string;
}

const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      boatName: "Suncatcher",
      ownername: "Suncatcher",
      type: "Marina",
      condition: "Good",
      mesurmement: "Length: 10m, Width: 3.8m",
      email: "hello@gmail.com",
      phone: "1456789521",
    },

    {
      id: "01",
      boatName: "Suncatcher",
      ownername: "Suncatcher",
      type: "Marina",
      condition: "Good",
      mesurmement: "Length: 10m, Width: 3.8m",
      email: "hello@gmail.com",
      phone: "1456789521",
    },

    {
      id: "01",
      boatName: "Suncatcher",
      ownername: "Suncatcher",
      type: "Marina",
      condition: "Good",
      mesurmement: "Length: 10m, Width: 3.8m",
      email: "hello@gmail.com",
      phone: "1456789521",
    },

    {
      id: "01",
      boatName: "Suncatcher",
      ownername: "Suncatcher",
      type: "Marina",
      condition: "Good",
      mesurmement: "Length: 10m, Width: 3.8m",
      email: "hello@gmail.com",
      phone: "1456789521",
    },
  ]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Estimates</span>
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

  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-[13vw] opacity-30 text-2xl font-normal">
            Moormanage/Estimates
          </h1>
        </div>
        <div className="flex flex-col items-center mr-20 mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          >
            <AddEstimates />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] ml-60  mb-3 p-2 mt-12 w-[62.50vw]">
        <DataTable
          value={boatData}
          header={header}
          tableStyle={{
            fontSize: "0.80rem",
            fontWeight: "bold",
          }}
        >
          <Column
            header="ID"
            field="id"
            style={{ width: "3rem", textAlign: "center" }}
          ></Column>
          <Column field="boatName" header="Boat Name"></Column>
          <Column field="ownername" header="Owner Name"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="type" header="Condition"></Column>
          <Column field="mesurmement" header="Measurement"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>

          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-2">
                <span className="text-green underline cursor-pointer">
                  Proceed
                </span>
                <span className="text-red-500 underline cursor-pointer">
                  Edit
                </span>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Estimates;
