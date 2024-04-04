import React from "react";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import StatCard from "../../StatCard/StatCard";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import VerticalBar from "../../StatCard/VerticalBar";

const ReportsMoorserve = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const options: string[] = ["Pending", "Cleared"];
  const [value, setValue] = useState<string>(options[0]);
  const [boatData, setBoatData] = useState<any[]>([
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
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Reports
          </h1>
        </div>
      </div>
      <div className="flex gap-6 mt-5 ml-12">
        {statCardsData.map((items) => (
          <StatCard key={items[0].title} items={items} />
        ))}
      </div>
      <div className="flex gap-4 ml-20">
        <div className="p-2 mt-12 w-[50vw]">
          <div className="flex flex-wrap align-items-center justify-between gap-2 mr-12">
            <span className="text-sm font-bold">Services</span>
            <div>
              <SelectButton
                style={{
                  height: "2vh",
                  fontSize: "0.50rem",
                  fontWeight: "bolder",
                  marginRight: "35px",
                  marginLeft: "10px",
                }}
                value={value}
                onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
                options={options}
              />
            </div>
          </div>
          <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[45vw] ml-15 mt-5">
            <DataTable
              value={boatData}
              header={""}
              tableStyle={{
                // minWidth: "25rem",
                fontSize: "12px",
                color: "#000000",
                fontWeight: 600,
                backgroundColor: "#D1D1D1",
              }}
              size="small"
            >
              <Column header="ID" field="id" style={{ width: "1vw" }}></Column>
              <Column
                style={{ width: "1vw" }}
                field="mooring"
                header="Moorings"
              ></Column>
              <Column
                style={{ width: "1vw" }}
                field="technicianName"
                header="Technicians Name"
              ></Column>
              <Column
                style={{ width: "1vw" }}
                field="amount"
                header="amount"
              ></Column>
              <Column
                style={{ width: "2vw" }}
                header="Service Record"
                body={() => (
                  <div className="flex gap-5">
                    <span className="text-black  font-bold underline cursor-pointer">
                      View
                    </span>
                    <span
                      className="text-black  font-bold cursor-pointer"
                      style={{ color: "#01BF2E" }}
                    >
                      Confirm
                    </span>
                    <span
                      className="font-bold cursor-pointer"
                      style={{ color: "#E70606" }}
                    >
                      Cancel
                    </span>

                    <span
                      className="text-red-600 font-bold cursor-pointer"
                      style={{ color: "#4068F8" }}
                    >
                      Modify
                    </span>
                  </div>
                )}
              ></Column>
              {/* <Column
            header=""
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold cursor-pointer" style={{color : "#01BF2E"}}>
                  Confirm
                </span>
                <span className="font-bold cursor-pointer" style={{color : "#E70606"}}>
                  Cancel
                </span>

                <span className="text-red-600 font-bold cursor-pointer" style={{color : "#4068F8"}}>
                  Modify
                </span>
              </div>
            )}
          ></Column> */}
            </DataTable>
          </div>
        </div>
        <div className="p-2 mt-12">
          <span className="text-sm font-bold ml-10 mr-50">
            Current Activity
          </span>
          <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[30vw] mt-5 p-4 flex flex-col items-left">
            <span className="text-sm font-bold mb-2">Monthly Progress</span>
            <span className="text-sm mb-2">
              This chart is for total orders & total sales.
            </span>
            <VerticalBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsMoorserve;
