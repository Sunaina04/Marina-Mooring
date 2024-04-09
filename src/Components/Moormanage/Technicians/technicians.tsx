import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Nullable } from "primereact/ts-helpers";
import { Box } from "@mui/material";
import { Datepicker } from "@mobiscroll/react";
import AddTechnication from "./AddTechnician";
import { InputText } from "primereact/inputtext";
import ButtonComponent from "../../Common/ButtonComponent";

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
    <div className="flex flex-wrap align-items-center gap-4 ">
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

        <div className="">
          <SelectButton
            style={{ fontSize: "0.2rem", fontWeight: "bolder", height: "2rem" }}
            value={value}
            onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
            options={options}
          />
        </div>
      </div>

      <div className="ml-72">
        <ButtonComponent
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          label={"Add New"}
          style={{ backgroundColor: "black", height: "5vh" }}
        />
      </div>
    </div>
  );

  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-20 opacity-30 text-2xl font-normal">
            Moormanage/Technicians
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-10 mt-14">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2]" />
              <InputText
                placeholder="Search"
                className="h-[5vh] cursor-pointer font-bold"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-10 ml-20">
        {/* Boat Data DataTable */}

        {/* Bills Data DataTable and Calendar */}
        <div className="flex gap-8">
          <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-10  w-[50vw] mb-5">
            <DataTable value={billsData} header={Billsheader} scrollable={true}>
              <Column
                style={{ width: "1vw", fontSize: "0.75rem" }}
                field="id"
                header="ID"
              ></Column>
              <Column
                style={{ width: "3vw", fontSize: "0.75rem" }}
                field="mooring"
                header="Mooring"
              ></Column>
              <Column
                style={{ width: "4vw", fontSize: "0.75rem" }}
                field="techniciansName"
                header="Technicians Name"
              ></Column>
              <Column
                style={{ width: "2vw", fontSize: "0.75rem" }}
                field="amount"
                header="Amount"
              ></Column>

              <Column
                header="Service Record"
                style={{ width: "5vw", fontSize: "0.75rem" }}
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
          <Box className="w-50 h-[58vh] border-[1px] border-[#D1D1D1] p-5 rounded-xl ">
            <div className="text-[#000000] text-lg font-bold tracking-tighter text-left mb-5">
              Calendar
            </div>
            <div className="card flex justify-content-center">
              <Datepicker
                controls={["calendar"]}
                // select="range"
                display="inline"
                touchUi={true}
              />
              {/* <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                showWeek
                selectionMode="range"
                style={{ width: "100%" }} // Set width to 100%
              /> */}
            </div>
          </Box>
        </div>

        <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-10  w-[50vw] mb-5">
          <DataTable
            value={boatData}
            header={""}
            tableStyle={{}}
            scrollable={true}
          >
            <Column
              style={{ width: "5vw", fontSize: "0.80rem" }}
              field="id"
              header="Id"
            ></Column>
            <Column
              style={{ width: "10vw", fontSize: "0.80rem" }}
              field="techniciansName"
              header="Technicians Name"
            ></Column>

            <Column
              style={{ width: "10vw", fontSize: "0.80rem" }}
              field="noOfJob"
              header="Open Work Orders"
            ></Column>

            <Column
              style={{ width: "10vw", fontSize: "0.80rem" }}
              field="completedJob"
              header="Completed jobs"
            ></Column>

            <Column
              style={{ width: "4vw", fontSize: "0.80rem" }}
              field="price"
              header="Modify"
            ></Column>

            <Column
              header="Action"
              style={{ width: "8vw", fontSize: "0.80rem" }}
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
