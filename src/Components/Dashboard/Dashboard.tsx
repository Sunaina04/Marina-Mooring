import { DataTable } from "primereact/datatable";
import { Datepicker } from "@mobiscroll/react";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { Box } from "@mui/material";
import { SetStateAction, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import { Accordion, AccordionTab } from 'primereact/accordion';
import StatCard from "../StatCard/StatCard";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileCopyIcon from "@mui/icons-material/FileCopy";
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
      <span className="text-xl font-extrabold">
        Moorings Coming up for Service
      </span>
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
      <div className="ml-40 ">
        <SelectButton
          style={{ height: "2vh", fontSize: "0.50rem", fontWeight: "bolder" }}
          value={value}
          onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
          options={options}
        />
      </div>
    </div>
  );

  const [expanded, setExpanded] = useState("panel1");

  const handleChange =
    (panel: SetStateAction<string>) => (event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : "");
    };

  const statCardsData = [
    [
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 43324 },
      { title: "Total Customers", percentage: 17, count: 44324 },
      { title: "Total Customers", percentage: 17, count: 58765 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 46789 },
    ],
  ];
  return (
    <>
      <div className="flex ml-12">
        <div>
          <h1 className="mt-14 ml-12 opacity-30 text-2xl font-normal">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex justify-between p-4 ml-20">
        {/* Boat Data DataTable */}

        {/* right section */}
        <div className="flex flex-col">
          <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] p-2 mt-12 w-[40vw] ">
            Map
          </div>

          <div>
            {/* dataTable */}

            <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] p-2 mt-12 w-[40vw] ">
              <DataTable
                value={boatData}
                header={Boatsheader}
                tableStyle={{
                  // width: "73rem",
                  fontSize: "0.90rem",
                  fontWeight: "bold",
                }}
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
          </div>
        </div>

        {/* leftSection */}
        <div className="mr-50 mt-11">
          {/* <Accordion activeIndex={0}  className="custom-accordion">

            <AccordionTab header={<span><i className="pi pi-calendar"></i> Calendar</span>}
              className="mb-8"
            >
              <div className="flex gap-2">

                <Box className="w-96 border-[1px] border-[#D1D1D1] flex justify-center p-4 rounded-xl">

                  <div className="card flex justify-content-center">
                    <Datepicker
                      controls={["calendar"]}
                      // select="range"
                      display="inline"
                      touchUi={true}
                    />
                  </div>
                </Box>
              </div>

            </AccordionTab>
            <AccordionTab header={<span><i className="pi pi-folder-open"></i> Open Work Orders</span>} className=" w-96 mb-8">


              <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] p-2 mt-12  ">
                <DataTable
                  value={boatData}
                  header={Boatsheader}
                  tableStyle={{
                    // width: "73rem",
                    fontSize: "0.90rem",
                    fontWeight: "bold",
                  }}
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

            </AccordionTab>
            <AccordionTab header={<span><i className="pi pi-chart-bar"></i> Total Moorings</span>} className="">
              <div>
                {statCardsData.map((items) => (
                  <StatCard key={items[0].title} items={items} />
                ))}
              </div>
            </AccordionTab>
          </Accordion> */}

          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ width: "30vw" }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === "panel1" ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <CalendarTodayIcon sx={{ marginRight: "8px" }} /> Calendar
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex gap-2">
                  <Box className="w-[35vw] border-[1px] border-[#D1D1D1] flex justify-center p-4 rounded-xl">
                    <div className="card flex justify-content-center">
                      <Datepicker
                        controls={["calendar"]}
                        // select="range"
                        display="inline"
                        touchUi={true}
                      />
                    </div>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ marginTop: "1rem", width: "30vw" }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === "panel2" ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <FileCopyIcon sx={{ marginRight: "8px" }} /> Open Work Orders
              </AccordionSummary>
              <AccordionDetails>
                <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] p-2  ">
                  <DataTable
                    value={boatData}
                    header={""}
                    tableStyle={{
                      // width: "73rem",
                      fontSize: "0.90rem",
                      fontWeight: "bold",
                    }}
                    scrollable={true}
                  >
                    <Column
                      style={{ width: "5vw" }}
                      field="id"
                      header="Order no"
                    ></Column>
                    <Column
                      style={{ width: "7vw" }}
                      field="boatName"
                      header="Mooring"
                    ></Column>
                    <Column
                      style={{ width: "7vw" }}
                      field="name"
                      header="Customer Name"
                    ></Column>
                    <Column
                      style={{ width: "11vw" }}
                      field="date"
                      header="Date"
                    ></Column>

                    <Column
                      header="Action"
                      body={() => (
                        <div className="flex gap-4">
                          <span className="text-black underline cursor-pointer">
                            Edit
                          </span>
                        </div>
                      )}
                    ></Column>
                  </DataTable>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{ marginTop: "1rem", width: "30vw" }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === "panel3" ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <CalendarTodayIcon sx={{ marginRight: "8px" }} /> Total Moorings
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {statCardsData.map((items) => (
                    <StatCard key={items[0].title} items={items} />
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

