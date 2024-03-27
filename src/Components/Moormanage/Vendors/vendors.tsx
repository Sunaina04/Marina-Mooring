import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";

interface CustomerData {
  id: string;
  name: string;
  date: string;
  mooring: string;
  users: string;
  price: string;
  contact: string;
}

const Vendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
    {
      id: "01",
      name: "John Smith",
      date: "Mon 13, 01:30pm",
      mooring: "Suncatcher",
      users: "35",
      price: "$45",
      contact: "+1 852 963 1234",
    },
  ]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {" "}
      {/* <div className="flex"> */}
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
              Moormanage/Vendor
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
      {/* </div> */}
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
          tableStyle={{
            minWidth: "50rem",
          }}
        >
          <Column
            header="ID"
            field="id"
            style={{ width: "3rem", textAlign: "center" }}
          ></Column>
          <Column field="name" header="Vendor Name"></Column>
          <Column field="date" header="Slot & Date"></Column>
          <Column field="mooring" header="Moorings"></Column>
          <Column field="users" header="No. of Users"></Column>
          <Column field="price" header="Inventory Price"></Column>
          <Column field="contact" header="Contact"></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Vendor;
