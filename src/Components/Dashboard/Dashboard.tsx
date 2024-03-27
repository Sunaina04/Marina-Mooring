import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Box } from "@mui/material";

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
  const [date, setDate] = useState(null);
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
      >
        View All
      </span>
    </div>
  );

  const Billsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Bills</span>
      <span
        style={{
          background: "#000000",
          color: "white",
        }}
      >
        Pending
      </span>
      <span
        style={{
          textAlign: "right",
          background: "#D9D9D9",
        }}
      >
        Cleared
      </span>
    </div>
  );

  return (
    <>
      <div className="flex">
        <div>
          <h1
            style={{
              marginTop: "40px",
              opacity: "0.3",
              fontSize: "26px",
              fontWeight: "400",
            }}
          >
            Dashboard
          </h1>
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
          header={Boatsheader}
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
                <span className="text-red-500 underline cursor-pointer">
                  Delete
                </span>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "#F2F2F2",
            borderRadius: "6px",
            border: "1px solid #D1D1D1",
            maxWidth: "45rem",
            marginTop: "40px",
          }}
        >
          <DataTable
            value={billsData}
            header={Billsheader}
            tableStyle={{
              minWidth: "50rem",
            }}
          >
            <Column field="billNo" header="Bill no"></Column>
            <Column field="mooring" header="Mooring"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="amount" header="amount"></Column>
            <Column field="date" header="Date"></Column>
            <Column
              header=""
              body={() => (
                <div className="flex gap-2">
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
        <Box
          className="p-my-4" // Optional: Add margin top and bottom
          style={{
            border: "1px solid #D1D1D1",
            padding: "20px",
            marginLeft: "30px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              color: "#000000",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "24px",
              letterSpacing: "0.4837472140789032px",
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            Calendar
          </div>
          <div className="card flex justify-content-center">
            <Calendar
              value={date}
              onChange={(e: any) => setDate(e.value)}
              inline
              showWeek
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
