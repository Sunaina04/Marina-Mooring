import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Estimates
          </h1>
        </div>
        <div className="flex flex-col items-center mr-20 mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          >
            <AddCustomer />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[60vw] ml-20">
        <DataTable
          value={boatData}
          header={header}
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
          <Column field="name" header="Customer Name"></Column>
          <Column field="date" header="Date"></Column>
          <Column field="measurement" header="Measurement"></Column>
          <Column field="place" header="Place"></Column>
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
