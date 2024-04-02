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

        <div className="flex flex-col items-center mr-4 mt-10">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          ></CustomModal>
        </div>
      </div>
      {/* </div> */}
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300  w-[50vw] mt-11 ">
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
          <Column header="ID" field="id" style={{ width: "3vw" }}></Column>
          <Column
            style={{ width: "8vw" }}
            field="name"
            header="Vendor Name"
          ></Column>
          <Column
            style={{ width: "8vw" }}
            field="phoneNumber"
            header="Phone Number"
          ></Column>

          <Column
            style={{ width: "11vw" }}
            field="email"
            header="Email Address"
          ></Column>
          <Column
            style={{ width: "7vw" }}
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

