import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Nullable } from "primereact/ts-helpers";
import { BiCalendarAlt } from "react-icons/bi";
import { Box } from "@mui/material";
import AddTechnication from "./AddTechnician";
import { InputText } from "primereact/inputtext";
import ButtonComponent from "../../Common/ButtonComponent";
import DatePickerComponent from "../../Common/DatePickerComponent";
import { TECHNICIAN_PAYLOAD, TECHNICIAN_RESPONSE } from "../../../Services/MoorManage/types";
import { useGetTechnicianMutation } from "../../../Services/MoorManage/moormanage";

interface BoatData {
  id: string;
  techniciansName: string;
  technician: string;
  date: string;
  price: string;
  completedJob: number;
  noOfJob: number;
}

interface BillsData {
  id: number;
  technician: string;
  techniciansName: string;
  amount: string;
}

const Technicians = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null);
  const options: string[] = ["Open", "Closed"];
  const [value, setValue] = useState<string>(options[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [technicianData, setTechnicianData] = useState<TECHNICIAN_PAYLOAD[]>([]);
  const [filteredTechnicianData, setFilteredTechnicianData] = useState<
    TECHNICIAN_PAYLOAD[]
  >([]);
  const [getTechnicians] = useGetTechnicianMutation();

  const [boatData, setBoatData] = useState<BoatData[]>([
    {
      id: "01",
      techniciansName: "Jon Smith",
      technician: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      technician: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      technician: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      technician: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
    {
      id: "01",
      techniciansName: "Jon Smith",
      technician: "Suncatcher",
      price: "$5",
      date: "Mon 13.01:30pm",
      noOfJob: 5,
      completedJob: 10,
    },
  ]);

  const [billsData, setBillsData] = useState<BillsData[]>([
    {
      id: 0,
      technician: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },

    {
      id: 0,
      technician: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      technician: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      technician: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      technician: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },
  ]);

  const technicianHeader = (
    <div>
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <input
          type="search"
          value={globalFilter as string}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search By name, Id..."
          className="border-[1px] w-[30vw] p-2 rounded-md"
        />
      </div>
    </div>
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateUnselect = () => {
    setSelectedDate(null);
  };
  // const workOrder = (
  //   <div></div>
  // )

  const Billsheader = (
    <div className="flex flex-wrap align-items-center gap-4 ">
      <span className="text-sm font-bold text-[black]">Work Orders</span>
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
          style={{
            backgroundColor: "black",
            height: "4vh",
            fontSize: "0.75rem",
            borderRadius: "0.20rem",
          }}
        />
      </div>
    </div>
  );

  const getTechniciansData = async () => {
    await getTechnicians({})
      .unwrap()
      .then(async (response) => {
        console.log("RESPONSE", response);
        const { status, content } = response as TECHNICIAN_RESPONSE;
        if (status === 200 && Array.isArray(content)) {
          setTechnicianData(content);
          setFilteredTechnicianData(content); // Initialize filtered data with all data
        }
      });
  };

  useEffect(() => {
    getTechniciansData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-20 opacity-30 text-2xl font-normal">
            MOORMANAGE/Technicians
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-10 mt-14">
          <div className="">
            <p> Filter order by Date </p>
          </div>
          <div style={{ position: "relative" }}>
            <DatePickerComponent
              onChange={handleDateSelect}
              value={selectedDate}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10px",
              }}
            >
              <BiCalendarAlt />
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-10 ml-20">
        <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[35vw] ">
          <DataTable
            // value={filteredMooringData}
            header={technicianHeader}
            scrollable={true}
            tableStyle={{
              // minWidth: "20rem",
              fontSize: "12px",
              color: "#000000",
              fontWeight: 600,
              backgroundColor: "#D9D9D9",
            }}
            size="small"
          >
            <Column header="ID:" field="id" style={{ width: "6vw" }}></Column>
            <Column
              style={{ width: "6vw" }}
              field="ownerName"
              header="Technician Name"
            ></Column>
            <Column
              style={{ width: "10vw" }}
              field="gpsCoordinates"
              header="Open Work Orders"
            ></Column>
            <Column
              style={{ width: "10vw" }}
              field="gpsCoordinates"
              header="Completed Jobs"
            ></Column>
          </DataTable>
        </div>

        <div className=" rounded-md border-[1px]  border-[#D1D1D1]  ml-10  w-[35vw] ">
          <DataTable scrollable={true}>
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
              field="customerName"
              header="Customer Name"
            ></Column>
            <Column
              style={{ width: "2vw", fontSize: "0.75rem" }}
              field="dueDate"
              header="Due Date"
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Technicians;
