import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const WorkOrders = () => {
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
    <div className="flex flex-wrap align-items-center justify-between  p-4">
      <span className="text-xl font-bold">Work Orders</span>
      <div className="">
        <div className="p-input-icon-left">
          <i className="pi pi-search text-[#D2D2D2] " data-testid="search-icon"  />
          <InputText
            placeholder="Search"
            className="h-[5vh] cursor-pointer font-bold"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="">
        <div className="flex justify-between gap-4 mr-4 mt-24">
          <div>
            <h1 className="mt-6 opacity-30 text-2xl ml-36 font-normal">
              MOORSERVE/Work Orders
            </h1>
          </div>
          <div className="flex mr-36 gap-4">
            <div>
              <ButtonComponent
                label={"Create New"}
                onClick={() => {}}
                style={{
                  width: "7vw",
                  height: "5vh",
                  backgroundColor: "black",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.80vw",
                }}
              ></ButtonComponent>
            </div>
          </div>
        </div>

        <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] ml-36 p-2 mt-12 w-[64vw] ">
          <DataTable
            value={boatData}
            header={header}
            tableStyle={{
              // width: "73rem",
              fontSize: "0.80rem",
              fontWeight: "bold",
            }}
            scrollable={true}
          >
            <Column style={{ width: "4vw" }} field="id" header="ID"></Column>
            <Column
              style={{ width: "7vw" }}
              field="boatName"
              header="Customer Name"
            ></Column>
            <Column
              style={{ width: "7vw" }}
              field="name"
              header="Mooring Number"
            ></Column>
            <Column
              style={{ width: "15vw" }}
              field="date"
              header="Boatyard"
            ></Column>
            <Column
              style={{ width: "13vw" }}
              field="measurement"
              header="Assigned to"
            ></Column>
            <Column
              style={{ width: "6vw" }}
              field="place"
              header="Due date"
            ></Column>
            <Column
              header="Action"
              body={() => (
                <div className="flex gap-4">
                  <span className="text-green  cursor-pointer">
                    New Request
                  </span>

                  <span className="text-green underline cursor-pointer">
                    Edit
                  </span>
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WorkOrders;
