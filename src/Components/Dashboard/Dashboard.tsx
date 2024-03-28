import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { Box } from "@mui/material";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";

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
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Boat Data DataTable */}
        <div>
          <div
            style={{
              background: "#F2F2F2",
              borderRadius: "6px",
              border: "1px solid #D1D1D1",
              padding: "20px",
            }}
          >
            <DataTable
              value={boatData}
              header={Boatsheader}
              tableStyle={{
                minWidth: "50rem",
              }}
            >
              <Column field="id" header=""></Column>
              <Column field="boatName" header="Boat Name"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="date" header="Date"></Column>
              <Column field="measurement" header="Measurement"></Column>
              <Column field="place" header="Place"></Column>
              <Column
                header="Action"
                body={() => (
                  <div className="flex gap-2">
                    <span className="text-black underline cursor-pointer">
                      Edit
                    </span>
                    <span className="text-red-500 underline cursor-pointer">
                      delete
                    </span>
                  </div>
                )}
              ></Column>
            </DataTable>
          </div>
        </div>

        {/* Bills Data DataTable and Calendar */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#F2F2F2",
              borderRadius: "6px",
              border: "1px solid #D1D1D1",
              padding: "20px",
              flex: "1",
            }}
          >
            <DataTable
              value={billsData}
              header={Billsheader}
              tableStyle={{
                width: "100%", // Set width to 100%
              }}
            >
              <Column field="billNo" header="Bill No"></Column>
              <Column field="mooring" header="Mooring"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="amount" header="Amount"></Column>
              <Column field="date" header="Date"></Column>
              <Column
                header=""
                body={() => (
                  <div className="flex gap-2">
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

          <Box
            className="p-my-4"
            style={{
              border: "1px solid #D1D1D1",
              padding: "20px",
              flex: "1",
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
                onChange={(e) => setDate(e.value)}
                inline
                showWeek
                selectionMode="range"
                style={{ width: "100%" }} // Set width to 100%
              />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
