import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../Customer/AddCustomer";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
            Moormanage/Moorings
          </h1>
        </div>
        <div className="p-input-icon-left mt-8 mr-5">

          <CustomModal onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}>
            <AddCustomer />
          </CustomModal>
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300  w-[65vw] mt-11 ">
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
          <Column
            header="ID"
            field="id"
            style={{ textAlign: "center", width: "3vw" }}
          ></Column>
          <Column
            style={{ width: "8vw" }}
            field="boatName"
            header="boatName"
          ></Column>
          <Column
            style={{ width: "8vw" }}
            field="Customer Name"
            header="Customer Name"
          ></Column>
          <Column style={{ width: "15vw" }} field="date" header="Date"></Column>
          <Column
            style={{ width: "11vw" }}
            field="measurement"
            header="Measurement"
          ></Column>
          <Column
            style={{ width: "7vw" }}
            field="place"
            header="Place"
          ></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">
                  Edit
                </span>
                <span className="text-black  font-bold underline cursor-pointer">
                  Activate
                </span>

                <span className="text-red-600 font-bold underline cursor-pointer">
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

export default Moorings;
