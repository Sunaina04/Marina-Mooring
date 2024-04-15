import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BoatyardDetailsTable from "./BoatyardDetailsTable"; // Adjust import path if needed
import { BOATYARD_DATA } from "../../../Services/MoorManage/types";
import { Button } from "primereact/button";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

interface DataProps {
  moorings: BOATYARD_DATA[];
}

const BoatyardTable: React.FC<DataProps> = ({ moorings }) => {
  const [expandedRows, setExpandedRows] = useState<any>({});
  console.log(
    "moorings",
    moorings.map((val) => val.id)
  );

  const rowExpansionTemplate = (rowData: any) => {
    return (
      <>
        <div className="flex items-start">
          <div className="flex-grow mr-4 w-[20vw]">
            <DataTable
              value={rowData.boatyardDetails}
              className="p-datatable-striped"
              expandedRows={expandedRows[rowData.id]}
              onRowToggle={(e) => handleRowToggle(e.data, rowData.id)}
              tableStyle={{
                fontSize: "12px",
                color: "#000000",
                fontWeight: 600,
                backgroundColor: "#D9D9D9",
              }}
            >
              <Column field="adress" header="Address"></Column>
              <Column field="name" header="Mooring Inventoried"></Column>
              <Column field="name" header="Boatyard GPS Coordinates"></Column>
            </DataTable>
          </div>
        </div>
      </>
    );
  };

  const handleRowToggle = (data: any, id: any) => {
    const expanded = { ...expandedRows };
    expanded[id] = expanded[id] ? false : true;
    setExpandedRows(expanded);
  };

  return (
    <div>
      <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[35vw] h-[100vh]  mt-10">
        <Accordion allowToggle>
          {moorings.map((mooring) => (
            <AccordionItem key={mooring.id}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {mooring.id} - {mooring.moorings}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <p>No. of Boatyards: {mooring.boatyards}</p>
                <p>Total Mooring Inventoried: {mooring.name}</p>
                {/* You can add more details here */}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default BoatyardTable;
