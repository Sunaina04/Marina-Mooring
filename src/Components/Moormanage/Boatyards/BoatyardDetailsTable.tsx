import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

interface MooringDetail {
  id: string;
  mainContact: string;
  mooringNumber: string;
  boatName: string;
}

interface RowExpansionProps {
  mooringDetails: MooringDetail[];
}

const BoatyardDetailsTable: React.FC<RowExpansionProps> = ({
  mooringDetails,
}) => {
  if (!mooringDetails || mooringDetails.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="/assets/images/Sea-img.png"
        alt="sea image"
        style={{ width: "50vw", height: "200px", marginRight:"20px" , marginTop:"-120px" }}
      />
      <div className="float-right bg-[#D9D9D9] rounded-md border-[1px] p-1 border-gray-300 w-[22vw]">
        <DataTable
          value={mooringDetails}
          className="p-datatable-striped"
          tableStyle={{
            fontSize: "10px",
            color: "#D9D9D9",
            fontWeight: 600,
            background: "#D9D9D9",
          }}
        >
          <Column
            field="id"
            header="ID"
            style={{ color: "black", background: "#D9D9D9", marginTop: "-2px" }}
          />
          <Column
            field="mainContact"
            header="Main Contact"
            style={{ color: "black", background: "#D9D9D9" }}
          />
          <Column
            field="mooringNumber"
            header="Mooring Number"
            style={{ color: "black", background: "#D9D9D9" }}
          />
          <Column
            field="boatName"
            header="Boat Name"
            style={{ color: "black", background: "#D9D9D9" }}
          />
          <Column
            style={{ background: "#D9D9D9" }}
            body={(rowData) => (
              <Button
                label="View"
                className="p-button-text p-button-info text-xs underline text-red"
                style={{ color: "red" }}
                // onClick={() => handleEdit(rowData)}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default BoatyardDetailsTable;
