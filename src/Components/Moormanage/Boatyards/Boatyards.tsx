import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import AddBoatyards from "./AddBoatyards";

interface CustomerData {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  InventoryItems: number;
}
const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [boatData] = useState<CustomerData[]>([
    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },
    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },

    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },

    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },
    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
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
      <div className="flex justify-between items-center ml-12">
        <h1 className="mt-14 ml-28 opacity-30 text-2xl font-normal">
          Moormanage/Boatyards
        </h1>
        <div className="flex flex-col items-center mr-12 mt-14">
          <CustomModal onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}>

            <AddBoatyards />

          </CustomModal>


        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[69.40vw] p-1 ml-40 mt-10">
        <DataTable
          value={boatData}
          tableStyle={{
            minWidth: "20rem",
            fontSize: "12px",
            color: "#000000",
            fontWeight: 600,
            backgroundColor: "#D1D1D1",
          }}
          size="small"
        >
          <Column header="ID" field="id" style={{ width: "8vw" }} />
          <Column style={{ width: "12vw" }} field="name" header="Vendor Name" />
          <Column
            style={{ width: "12vw" }}
            field="phoneNumber"
            header="Phone Number"
          />
          <Column
            style={{ width: "12vw" }}
            field="email"
            header="Email Address"
          />
          <Column
            style={{ width: "11vw" }}
            field="InventoryItems"
            header="Inventory Items"
          />
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-6">
                <span className="text-black font-bold underline cursor-pointer">
                  View Inventory
                </span>
                <span className="text-green-600 font-bold underline cursor-pointer">
                  Edit
                </span>
                <span className="text-red-600 font-bold underline cursor-pointer">
                  Delete
                </span>
              </div>
            )}
          />
        </DataTable>
      </div>
    </>
  );
};

export default Boatyards;
