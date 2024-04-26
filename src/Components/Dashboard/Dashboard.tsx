import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SetStateAction, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import Timeline from "../customComponent/Timeline";
import "./Dashboard.css";
import Accordition from "../customComponent/Accordion";
import { FaCircle } from "react-icons/fa";

interface BoatData {
  id: string;
  customerName: string;
  mooringServiceDate: string;
  mooringLocation: string;
}

interface BillsData {
  workOrderNo: string;
  customerName: string;
  assignedTo: string;
  date: string;
}

const Dashboard = () => {
  const [date, setDate] = useState<Nullable<(Date | null)[]>>(null);
  const options: string[] = ["Pending", "Cleared"];
  const [value, setValue] = useState<string>(options[0]);
  const [boatData, setBoatData] = useState<BoatData[]>([
    {
      id: "01",
      customerName: "Suncatcher",
      mooringServiceDate: "John Smith",
      mooringLocation: "15, March 2024",
    },

    {
      id: "01",
      customerName: "Suncatcher",
      mooringServiceDate: "15,march,2024",
      mooringLocation: "38 21.806 144 44.959",
    },
    {
      id: "01",
      customerName: "Suncatcher",
      mooringServiceDate: "15,march,2024",
      mooringLocation: "38 21.806 144 44.959",
    },
    {
      id: "01",
      customerName: "Suncatcher",
      mooringServiceDate: "15,march,2024",
      mooringLocation: "38 21.806 144 44.959",
    },
  ]);

  const [billsData, setBillsData] = useState<BillsData[]>([
    {
      workOrderNo: "B0210",
      customerName: "Suncatcher",
      assignedTo: "John Smith",
      date: "15, March 2024",
    },
    {
      workOrderNo: "B0210",
      customerName: "Suncatcher",
      assignedTo: "John Smith",
      date: "15, March 2024",
    },

    {
      workOrderNo: "B0210",
      customerName: "Suncatcher",
      assignedTo: "John Smith",
      date: "15, March 2024",
    },
    {
      workOrderNo: "B0210",
      customerName: "Suncatcher",
      assignedTo: "John Smith",
      date: "15, March 2024",
    },
  ]);

  const Boatsheader = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-extrabold">Moorings Due for Service</span>
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

  return (
    <>
      <div className="flex ml-12 hello">
          <h1 className="mt-12 ml-12 opacity-30 text-2xl font-normal">
            DASHBOARD
          </h1>
      </div>

      <div className="flex justify-between p-4 ml-8">
        {/* Boat Data DataTable */}

        {/* right section */}
        <div className="relative ">
          <div className="w-[43vw] h-14 mt-11">
            <img src="/assets/images/Sea-img.png" />
            <div className="absolute top-20 left-3">
              <Timeline />
            </div>
            <div className="absolute top-28 right-8">
              <Timeline />
            </div>
          </div>
          <div className="absolute top-60 left-72 rounded-md border-[1px] p-1 border-gray-300 w-[17vw] h-[13vh] bg-white">
            <p className="text-[0.7rem] ml-1  text-black">Status</p>
            <hr className="m-1 border-black" />
            <div className="flex">
              <div>
                <FaCircle className="h-3 text-red-600 mt-1" />
                <FaCircle className="h-3 text-green-600 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                <p className="text-[0.6rem] text-black tracking-tighter mt-[0.3rem]">
                  Gear On (in the water)
                </p>
              </div>
              <div className="ml-1">
                <FaCircle className="h-3 text-violet-600 mt-1 " />
                <FaCircle className="h-3 text-gray-500 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                  Gear Off (out of the water)
                </p>
                <p className="text-[0.6rem] text-black tracking-tighter mt-[0.3rem]">
                  Not in Use
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* dataTable */}

            <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] p- mt-[20rem] w-[43vw] ">
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
                <Column
                  style={{ width: "4vw" }}
                  field="id"
                  header="ID"
                ></Column>
                <Column
                  style={{ width: "12vw" }}
                  field="customerName"
                  header="Customer Name"
                ></Column>

                <Column
                  style={{ width: "15vw" }}
                  field="mooringServiceDate"
                  header="Mooring service Date"
                ></Column>
                <Column
                  style={{ width: "12vw" }}
                  field="mooringLocation"
                  header="Mooring Location"
                ></Column>
                <Column
                  header="Status"
                  style={{ width: "15vw" }}
                  body={() => (
                    <div className="flex gap-4">
                      <span className="text-green-500  cursor-pointer">
                        Complete
                      </span>
                      <span className="text-black underline cursor-pointer">
                        Edit
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
          <Accordition />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
