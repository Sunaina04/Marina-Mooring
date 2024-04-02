import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import { Calendar } from "primereact/calendar";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Nullable } from "primereact/ts-helpers";
import AddCustomer from "../Customer/AddCustomer";

interface BoatData {
  id: string;
  techniciansName: string;
  mooring: string;
  date: string;
  price: string;
  completedJob: number;
  noOfJob: number;
}

interface BillsData {
  id: number;
  mooring: string;
  techniciansName: string;
  amount: string;
}

const Technicians = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null);
  const options: string[] = ["Pending", "Cleared"];
  const [value, setValue] = useState<string>(options[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<BoatData[]>([
    {
      id: "01",
      techniciansName: "Jon Smith",
      mooring: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      mooring: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      mooring: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      mooring: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      mooring: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
  ]);

  const [billsData, setBillsData] = useState<BillsData[]>([
    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },

    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
  ]);

  const Billsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 ">
      <span className="text-lg font-bold">Services</span>
      <div className=" ">
        {/* <span
          style={{
            background: "#000000",
            color: "white",
            border: "1px solid black", // Adding border property
            padding: "3px",
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
            marginRight: "-8px",
          }}
        >
          Pending
        </span>
        <span
          style={{
            background: "#D9D9D9",
            padding: "3px", // Adding padding for better appearance
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          Cleared
        </span> */}

        <div className="ml-40 ">
          <SelectButton
            style={{ height: "2vh", fontSize: "0.50rem", fontWeight: "bolder" }}
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            options={options}
          />
        </div>
      </div>
    </div>
  );

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-52 opacity-30 text-2xl font-normal">
            Moormanage/Technicians
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
      <div className="flex flex-col gap-5 mt-10 ml-20">
        {/* Boat Data DataTable */}

        {/* Bills Data DataTable and Calendar */}
        <div className="flex gap-8">
          <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-44  w-[47vw] mb-5">
            <DataTable value={billsData} header={Billsheader} scrollable={true}>
              <Column style={{ width: "5vw" }} field="id" header="ID"></Column>
              <Column
                style={{ width: "8vw" }}
                field="mooring"
                header="Mooring"
              ></Column>
              <Column
                style={{ width: "10vw" }}
                field="techniciansName"
                header="Technicians Name"
              ></Column>
              <Column
                style={{ width: "6vw" }}
                field="amount"
                header="Amount"
              ></Column>

              <Column
                header="Service Record"
                body={() => (
                  <div className="flex gap-5 ">
                    <span className="text-black underline cursor-pointer">
                      View
                    </span>
                    <span className="text-green-500 bg-green-100 opacity-[1rem] cursor-pointer">
                      Confirm
                    </span>
                    <span className="text-red-500 bg-red-100 cursor-pointer">
                      Cancel
                    </span>
                    <span className="text-blue-500 bg-blue-100 cursor-pointer">
                      Modify
                    </span>
                  </div>
                )}
              ></Column>
            </DataTable>
          </div>

          <div className="w-96 border-[1px] border-[#D1D1D1] p-5 rounded-md mb-6">
            <div className="text-[#000000] text-lg font-bold tracking-tighter text-left mb-5">
              Calendar
            </div>
            <div className="card flex justify-content-center">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                showWeek
                selectionMode="range"
                style={{
                  width: "100%",
                  height: "40vh",
                  fontSize: "5rem",
                  borderRadius: "1rem",
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2  ml-44 w-[69vw] mb-4">
          <DataTable
            value={boatData}
            header={""}
            tableStyle={
              {
                // width: "73rem",
              }
            }
            scrollable={true}
          >
            <Column style={{ width: "5vw" }} field="id" header="Id"></Column>
            <Column
              style={{ width: "12vw" }}
              field="techniciansName"
              header="Technicians Name"
            ></Column>
            <Column
              style={{ width: "9vw" }}
              field="date"
              header="Slot & Date"
            ></Column>

            <Column
              style={{ width: "10vw" }}
              field="mooring"
              header="Moorings"
            ></Column>
            <Column
              style={{ width: "9vw" }}
              field="noOfJob"
              header="No.of jobs"
            ></Column>

            <Column
              style={{ width: "9vw" }}
              field="completedJob"
              header="Completed jobs"
            ></Column>

            <Column
              style={{ width: "6vw" }}
              field="price"
              header="Price"
            ></Column>

            <Column
              header="Action"
              body={() => (
                <div className="flex gap-4">
                  <span className="text-green-500 underline cursor-pointer">
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
      </div>
    </>
  );
};

export default Technicians;
