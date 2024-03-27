import { useState } from "react";
import ButtonComponent from "../Common/ButtonComponent";
import Customer from "./Customer/Customer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Moormanage = () => {
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

  return (
    <>
      {" "}
      
      <div className="flex justify-between items-center">
        <div>
          <h1
            style={{
              marginTop: "40px",
              opacity: "0.3",
              fontSize: "26px",
              fontWeight: "400",
            }}
          >
            Moormanage/Customer
          </h1>
        </div>
        <div className="p-input-icon-left">
          <ButtonComponent
            label={"ADD NEW"}
            style={{
              width: "7vw",
              backgroundColor: "black",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "40px", // Adjust margin top here
            }}
            onClick={handleButtonClick}
          >
            <img
              src="/assets/images/plus.png"
              alt="icon"
              className="p-icon w-4 mr-4"
              style={{
                filter: "invert(100%)",
                color: "whitesmoke",
                fontWeight: "bolder",
                padding: "",
              }}
            />
          </ButtonComponent>
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

export default Moormanage;
