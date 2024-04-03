import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
interface CustomerData {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  InventoryItems: number;
}

const Vendor = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
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
      {" "}
      {/* <div className="flex ml-12"> */}
      <div className="flex justify-between items-center ml-2">
        <div>
          <h1 className="mt-14 ml-[7.50rem] opacity-30 text-2xl font-normal">
            Moormanage/Vendor
          </h1>
        </div>

        <div className="flex flex-col items-center mr-[8rem] mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          ></CustomModal>
        </div>
      </div>
      {/* </div> */}
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw] p-1 ml-32 mt-10">
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
          <Column header="ID" field="id" style={{ width: "8vw" }}></Column>
          <Column
            style={{ width: "11vw" }}
            field="name"
            header="Vendor Name"
          ></Column>
          <Column
            style={{ width: "11vw" }}
            field="phoneNumber"
            header="Phone Number"
          ></Column>

          <Column
            style={{ width: "11vw" }}
            field="email"
            header="Email Address"
          ></Column>
          <Column
            style={{ width: "11vw" }}
            field="InventoryItems"
            header="Inventory Items"
          ></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">
                  View Invetory
                </span>
                <span className="text-green-600  font-bold underline cursor-pointer">
                  Edit
                </span>

                <span className="text-red-600 font-bold underline cursor-pointer">
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

export default Vendor;
