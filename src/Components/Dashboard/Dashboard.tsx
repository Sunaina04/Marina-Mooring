import { DataTable } from "primereact/datatable";
import { Datepicker, Input } from "@mobiscroll/react";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { Box } from "@mui/material";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";


interface BoatData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

interface BillsData {
  billNo: string;
  mooring: string;
  name: string;
  amount: string;
  date: string;
}

const Dashboard = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null);
  const options: string[] = ["Pending", "Cleared"];
  const [value, setValue] = useState<string>(options[0]);
  const [boatData, setBoatData] = useState<BoatData[]>([
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

  const [billsData, setBillsData] = useState<BillsData[]>([
    {
      billNo: "B0210",
      mooring: "Suncatcher",
      name: "John Smith",
      amount: "$50",
      date: "15, March 2024",
    },
    {
      billNo: "B0210",
      mooring: "Suncatcher",
      name: "John Smith",
      amount: "$50",
      date: "15, March 2024",
    },
    {
      billNo: "B0210",
      mooring: "Suncatcher",
      name: "John Smith",
      amount: "$50",
      date: "15, March 2024",
    },
    {
      billNo: "B0210",
      mooring: "Suncatcher",
      name: "John Smith",
      amount: "$50",
      date: "15, March 2024",
    },
    {
      billNo: "B0210",
      mooring: "Suncatcher",
      name: "John Smith",
      amount: "$50",
      date: "15, March 2024",
    },
  ]);

  const Boatsheader = (
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
        className="font-[Lato], font-bold leading-4 text-right tracking-tight"
      >
        View All
      </span>
    </div>
  );

  const Billsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 ">
      <span className="text-sm font-bold">Bills</span>
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

  return (
    <>
      <div className="flex">
        <div>
          <h1 className="mt-14  opacity-30 text-2xl font-normal">Dashboard</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Boat Data DataTable */}

        <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[60vw] ">
          <DataTable
            value={boatData}
            header={Boatsheader}
            tableStyle={
              {
                // width: "73rem",
              }
            }
            scrollable={true}
          >
            <Column style={{ width: "5vw" }} field="id" header=""></Column>
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
              style={{ width: "11vw" }}
              field="date"
              header="Date"
            ></Column>
            <Column
              style={{ width: "13vw" }}
              field="measurement"
              header="Measurement"
            ></Column>
            <Column
              style={{ width: "8vw" }}
              field="place"
              header="Place"
            ></Column>
            <Column
              header="Action"
              body={() => (
                <div className="flex gap-4">
                  <span className="text-black underline cursor-pointer">
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

        {/* Bills Data DataTable and Calendar */}
        <div className="flex gap-2">
          <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5   w-[39.70vw] mb-5">
            <DataTable value={billsData} header={Billsheader} scrollable={true}>
              <Column
                style={{ width: "5vw" }}
                field="billNo"
                header="Bill No"
              ></Column>
              <Column
                style={{ width: "6vw" }}
                field="mooring"
                header="Mooring"
              ></Column>
              <Column
                style={{ width: "7vw" }}
                field="name"
                header="Name"
              ></Column>
              <Column
                style={{ width: "6vw" }}
                field="amount"
                header="Amount"
              ></Column>
              <Column
                style={{ width: "8vw" }}
                field="date"
                header="Date"
              ></Column>
              <Column
                header=""
                body={() => (
                  <div className="flex gap-4 ">
                    <span className="text-black underline cursor-pointer">
                      View
                    </span>
                    <span className="text-red-500 underline cursor-pointer">
                      Edit
                    </span>
                  </div>
                )}
              ></Column>
            </DataTable>
          </div>

          <Box className="w-96 border-[1px] border-[#D1D1D1] p-5 rounded-md mb-6">
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
      </div>
    </>
  );
};

export default Dashboard;
