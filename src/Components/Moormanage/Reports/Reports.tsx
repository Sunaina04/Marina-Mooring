import { useState } from "react";
import CustomModal from "../../customComponent/CustomModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import { Button } from "primereact/button";
import StatCard from "../../StatCard/StatCard";

import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import AddCustomer from "../Customer/AddCustomer";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import VerticalBar from "../../StatCard/VerticalBar";
import ButtonComponent from "../../Common/ButtonComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface ReportsData {
  id: string;
  mooring: string;
  technicianName: string;
  amount: string;
  address: string;
}

const Reports = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const options: string[] = ["Open", "Closed"];

  const [value, setValue] = useState<string>(options[0]);
  const [boatData, setBoatData] = useState<ReportsData[]>([
    {
      id: "01",
      mooring: "Suncatcher",
      technicianName: "John Smith",
      amount: "$50",
      address: "Punjab",
    },
    {
      id: "01",
      mooring: "Suncatcher",
      technicianName: "John Smith",
      amount: "$50",
      address: "Punjab",
    },
    {
      id: "01",
      mooring: "Suncatcher",
      technicianName: "John Smith",
      amount: "$50",
      address: "Punjab",
    },
    {
      id: "01",
      mooring: "Suncatcher",
      technicianName: "John Smith",
      amount: "$50",
      address: "Punjab",
    },
  ]);

  const [billsData, setBillsData] = useState<any[]>([
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

  const [bill, setBill] = useState<any[]>([
    {
      id: 0,
      mooring: "Suncatcher",
      techniciansName: "John Smith",
      amount: "$50",
    },

    {
      id: 0,
      mooring: "Mooring",
      techniciansName: "John Smith",
      amount: "$50",
    },
    {
      id: 0,
      mooring: "Technicians ",
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
    <div className="flex flex-wrap justify-between align-items-center gap-4 ">
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
    </div>
  );

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const statCardsData = [
    [
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 58765 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 46789 },
    ],

    [{ title: "Services", percentage: 25, count: 34576 }],

    [{ title: "Work Orders", percentage: 58, count: 8421 }],
  ];

  return (
    <>
      <div className="flex flex-col  ml-12">
        <div className="flex justify-between">
          <div>
            <h1 className="mt-14 ml-10 opacity-10 text-2xl font-normal">
              Moormanage/Reports
            </h1>
          </div>
          <div>
            <h1 className="mt-14 mr-4 opacity-30 text-lg font-normal text-black">
              Download Reports {<ExpandMoreIcon />}
            </h1>
          </div>
        </div>

        <div className="flex mt-6">
          <div>
            <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-10  w-[40vw] mb-5">
              <DataTable
                value={billsData}
                header={"Customers"}
                scrollable={true}
              >
                <Column
                  style={{ width: "2vw", fontSize: "0.75rem" }}
                  field="id"
                  header="ID"
                ></Column>
                <Column
                  style={{ width: "4vw", fontSize: "0.75rem" }}
                  field="mooring"
                  header="Mooring"
                ></Column>
                <Column
                  style={{ width: "6vw", fontSize: "0.75rem" }}
                  field="techniciansName"
                  header="Technicians Name"
                ></Column>
                <Column
                  style={{ width: "4vw", fontSize: "0.75rem" }}
                  field="amount"
                  header="Amount"
                ></Column>

                <Column
                  header="Work Order"
                  style={{ width: "5vw", fontSize: "0.75rem" }}
                  body={() => (
                    <div className="flex gap-5 ">
                      <span className="text-green-500 bg-green-100  cursor-pointer">
                        Confirmed
                      </span>
                    </div>
                  )}
                ></Column>
              </DataTable>
            </div>
          </div>

          <div>
            <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-8  w-[25vw]  mb-5">
              <DataTable
                value={bill}
                header={"Customer by Mooring"}
                scrollable={true}
              >
                <Column
                  style={{ width: "2vw", fontSize: "0.75rem" }}
                  field="id"
                  header="ID"
                ></Column>
                <Column
                  style={{ width: "8vw", fontSize: "0.75rem" }}
                  field="mooring"
                  header="Boat Name"
                ></Column>
                <Column
                  style={{ width: "9vw", fontSize: "0.75rem" }}
                  field="techniciansName"
                  header="Customer Name"
                ></Column>

                <Column
                  header="Action"
                  style={{ width: "5vw", fontSize: "0.75rem" }}
                  body={() => (
                    <div className="flex gap-5 ">
                      <span className="text-black underline cursor-pointer">
                        Converted
                      </span>
                    </div>
                  )}
                ></Column>
              </DataTable>
            </div>

            <div className="bg-[#F2F2F2] rounded-md border-[1px]  border-[#D1D1D1] p-5 ml-8  w-[25vw]  mb-5">
              <DataTable value={bill} header={"Technicians"} scrollable={true}>
                <Column
                  style={{ width: "2vw", fontSize: "0.75rem" }}
                  field="id"
                  header="ID"
                ></Column>
                <Column
                  style={{ width: "8vw", fontSize: "0.75rem" }}
                  field="mooring"
                  header="Boat Name"
                ></Column>
                <Column
                  style={{ width: "9vw", fontSize: "0.75rem" }}
                  field="techniciansName"
                  header="Customer Name"
                ></Column>

                <Column
                  header="Action"
                  style={{ width: "5vw", fontSize: "0.75rem" }}
                  body={() => (
                    <div className="flex gap-5 ">
                      <span className="text-black underline cursor-pointer">
                        Converted
                      </span>
                    </div>
                  )}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
