import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RowExpansionDemo from "./RowExpansionDemo"; // Adjust import path if needed
import { BOATYARD_DATA } from "../../../Services/MoorManage/types";

interface DataProps {
  moorings: BOATYARD_DATA[];
}

const BoatyardTable: React.FC<DataProps> = ({ moorings }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const expandableTemplate = (rowData: any) => {
    return <RowExpansionDemo boatyardDetails={rowData.boatyardDetails} />;
  };

  const rowExpansionTemplate = (rowData: any) => {
    return (
      <div className="datatable-boatyard-details">
        <DataTable
          value={rowData.boatyardDetails}
          header="Boatyard Details"
          className="p-datatable-striped"
        >
          <Column field="name" header="Name"></Column>
          <Column field="address" header="Address"></Column>
          <Column
            header="Boats"
            body={(rowData) => (
              <DataTable value={rowData.boats}>
                <Column field="mooringNumber" header="Mooring Number"></Column>
                <Column field="boatName" header="Boat Name"></Column>
              </DataTable>
            )}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={moorings}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data as [])} // Explicit type annotation
      >
        <Column expander style={{ width: "3em" }}></Column>
        <Column field="id" header="ID"></Column>
        <Column field="moorings" header="Moorings"></Column>
        <Column field="boatyards" header="Boatyards"></Column>
        <Column field="name" header="Main Contact"></Column>
        <Column field="phoneNumber" header="Phone Number"></Column>
        <Column field="email" header="Email"></Column>
        <Column
          body={expandableTemplate}
          style={{ textAlign: "center", width: "6em" }}
        ></Column>
      </DataTable>
      <DataTable value={moorings} rowExpansionTemplate={rowExpansionTemplate}>
        <Column expander style={{ width: "3em" }}></Column>
        <Column field="id" header="ID"></Column>
        <Column field="moorings" header="Moorings"></Column>
        <Column field="boatyards" header="Boatyards"></Column>
        <Column field="name" header="Main Contact"></Column>
        <Column field="phoneNumber" header="Phone Number"></Column>
        <Column field="email" header="Email"></Column>
      </DataTable>
    </div>
  );
};

export default BoatyardTable;
