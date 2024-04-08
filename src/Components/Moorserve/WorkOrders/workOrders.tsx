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
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Work Orders</span>
      <span className="font-[Lato] text-[14px] font-bold text-left ">
        View All
      </span>
    </div>
  );

  return (
    <>
      <div className="">
        <div className="flex justify-between gap-4 mr-4 mt-24">
          <div>
            <h1 className="mt-6 opacity-30 text-2xl ml-36 font-normal">
              Moorserve/Work Orders
            </h1>
          </div>
          <div className="flex mr-36 gap-4">
            <div>
              <div className="p-input-icon-left">
                <i className="pi pi-search text-[#D2D2D2] " />
                <InputText
                  placeholder="Search"
                  className="h-[5vh] cursor-pointer font-bold"
                />
              </div>
            </div>

            <div>
              <ButtonComponent
                label={"Filter"}
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
              >
                <img
                  src="/assets/images/more.png"
                  alt="icon"
                  className="p-icon  w-4 ml-3 "
                  style={{
                    filter: "invert(100%)",
                    color: "whitesmoke",
                    fontWeight: "bolder",
                  }}
                />
              </ButtonComponent>
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
              header="Boat Name"
            ></Column>
            <Column
              style={{ width: "7vw" }}
              field="name"
              header="Name"
            ></Column>
            <Column
              style={{ width: "15vw" }}
              field="date"
              header="Date"
            ></Column>
            <Column
              style={{ width: "13vw" }}
              field="measurement"
              header="Measurement"
            ></Column>
            <Column
              style={{ width: "6vw" }}
              field="place"
              header="Place"
            ></Column>
            <Column
              header="Action"
              body={() => (
                <div className="flex gap-4">
                  <span className="text-green underline cursor-pointer">
                    Approve
                  </span>
                  <span className="text-red-500 underline cursor-pointer">
                    Reject
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
