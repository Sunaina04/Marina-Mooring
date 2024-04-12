import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BoatyardDetailsTable from "./BoatyardDetailsTable"; // Adjust import path if needed
import { BOATYARD_DATA } from "../../../Services/MoorManage/types";
import { Button } from "primereact/button";

interface DataProps {
  moorings: BOATYARD_DATA[];
}

const BoatyardTable: React.FC<DataProps> = ({ moorings }) => {
  const [expandedRow, setExpandedRow] = useState<any>(null);

  const expandableTemplate = (rowData: any) => {
    return <BoatyardDetailsTable mooringDetails={rowData.mooringDetails} />;
  };

  const rowExpansionTemplate = (rowData: any) => {
    return (
      <>
        <div className="flex items-start">
          <div className="flex-grow mr-4 w-[20vw]">
            <DataTable
              value={rowData.boatyardDetails}
              header={`Boatyard Details ${rowData.id}`}
              className="p-datatable-striped"
              expandedRows={expandedRow}
              onRowToggle={(e) => setExpandedRow(e.data as [])}
              rowExpansionTemplate={(rowData: any) => (
                <BoatyardDetailsTable mooringDetails={rowData.mooringDetails} />
              )}
              tableStyle={{
                fontSize: "12px",
                color: "#000000",
                fontWeight: 600,
                backgroundColor: "#D9D9D9",
              }}
            >
              <Column field="id"></Column>
              <Column field="name" header="Boatyard Name"></Column>
              <Column field="address" header="Address"></Column>
              <Column field="phone" header="Phone Number"></Column>
              <Column field="mooring" header="Mooring Inventoried"></Column>
              <Column expander style={{ width: "6em" }} />
            </DataTable>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[75vw] h-[100vh]  mt-10">
        <DataTable
          value={moorings}
          expandedRows={expandedRow}
          onRowToggle={(e) => setExpandedRow(e.data as [])}
          rowExpansionTemplate={rowExpansionTemplate}
          tableStyle={{
            // minWidth: "20rem",
            fontSize: "12px",
            color: "#000000",
            fontWeight: 600,
            backgroundColor: "#D1D1D1",
          }}
        >
          <Column field="id" header="ID"></Column>
          <Column field="moorings" header="Moorings"></Column>
          <Column field="boatyards" header="Boatyards"></Column>
          <Column field="name" header="Main Contact"></Column>
          <Column field="phoneNumber" header="Phone Number"></Column>
          <Column field="email" header="Email"></Column>
          <Column
            style={{ width: "6vw" }}
            header="Actions"
            body={(rowData) => (
              <Button
                label="Edit"
                className="p-button-text p-button-info underline"
                style={{ color: "red" }}
                // onClick={() => handleEdit(rowData)}
              />
            )}
          ></Column>
          <Column expander style={{ width: "6em" }} />
        </DataTable>
      </div>
    </div>
  );
};

export default BoatyardTable;
