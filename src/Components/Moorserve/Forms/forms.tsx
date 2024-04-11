import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";
import { InputText } from "primereact/inputtext";

interface CustomerData {
  id: string;
  customerName: string;
  mooringName: string;
  date: string;
  measurement: string;
  mooringId: string;
  boatType: string
}

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      customerName: "Suncatcher",
      mooringId: "11",
      mooringName: "Suncatcher",
      measurement: "Length: 10m, Width: 3.8m",
      boatType: "Boatyard",
      date: "15, March 2024 to 15, March 2024"
    },
    {
      id: "01",
      customerName: "Suncatcher",
      mooringId: "11",
      mooringName: "Suncatcher",
      measurement: "Length: 10m, Width: 3.8m",
      boatType: "Boatyard",
      date: "15, March 2024 to 15, March 2024"
    },

    {
      id: "01",
      customerName: "Suncatcher",
      mooringId: "11",
      mooringName: "Suncatcher",
      measurement: "Length: 10m, Width: 3.8m",
      boatType: "Boatyard",
      date: "15, March 2024 to 15, March 2024"
    },
    {
      id: "01",
      customerName: "Suncatcher",
      mooringId: "11",
      mooringName: "Suncatcher",
      measurement: "Length: 10m, Width: 3.8m",
      boatType: "Boatyard",
      date: "15, March 2024 to 15, March 2024"
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
      <span className="text-xl font-bold">Work Orders</span>
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
      {/* <div className="flex ml-12"> */}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            MOORSERVE/Forms Library
          </h1>
        </div>

        <div className="flex  items-center  mt-14 ml-36">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2] text-sm" />
              <InputText
                placeholder="search by name,id,mooring no,name, phone no"
                className="h-[5vh] w-[20vw] cursor-pointer font-bold text-[0.70rem]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mr-64 mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          >
            <AddCustomer customer={undefined} editMode={false} closeModal={function (): void {
              throw new Error("Function not implemented.");
            }} getCustomer={function (): void {
              throw new Error("Function not implemented.");
            }} />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[61vw] ml-20">
        <DataTable
          value={boatData}
          header={header}
          tableStyle={{

          }}
        >
          <Column
            header="ID"
            field="id"
            style={{ width: "3vw" }}
          ></Column>
          <Column field="customerName" header="Customer Name" style={{ width: "11vw" }}></Column>
          <Column field="mooringId" header="Mooring ID" style={{ width: "9vw" }}></Column>
          <Column field="mooringName" header="Mooring Name" style={{ width: "12vw" }}></Column>
          <Column field="date" header="Date" style={{ width: "20vw" }}></Column>
          <Column field="measurement" header="Measurement" style={{ width: "15vw" }}></Column>
          <Column field="boatType" header="Boat type" style={{ width: "8vw" }}></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-2">
                <span className="text-green underline cursor-pointer">
                  Edit
                </span>
                <span className="text-red-500 underline cursor-pointer">
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

export default Forms;
