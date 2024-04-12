import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import AddBoatyards from "./AddBoatyards";
import { InputText } from "primereact/inputtext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Widgets } from "@mui/icons-material";
import MooringTable from "./BoatyardTable";
import { BOATYARD_DATA } from "../../../Services/MoorManage/types";
import BoatyardTable from "./BoatyardTable";
interface CustomerData {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  InventoryItems: number;
}
const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [boatData] = useState<CustomerData[]>([
    {
      id: "0",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },
    {
      id: "01",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },

    {
      id: "02",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },

    {
      id: "03",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },
    {
      id: "04",
      name: "Ram",
      phoneNumber: 4564546897,
      email: "test@gmail.com",
      InventoryItems: 12,
    },
  ]);

  const moorings: BOATYARD_DATA[] = [
    {
      id: 9715,
      moorings: "Pioneer",
      boatyards: 2,
      name: "John smith", // Add name property
      phoneNumber: "+1 234 543 4324", // Add phoneNumber property
      email: "demo@gmail.com", // Add email property
      boatyardDetails: [
        {
          id: 1,
          name: "Pioneer",
          address: "01",
          boats: [
            {
              mooringNumber: 15,
              boatName: "123 Elm St",
            },
            {
              mooringNumber: 16,
              boatName: "45 Chicken Rd",
            },
          ],
        },
      ],
    },
  ];

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <h1 className="mt-14 ml-28 opacity-30 text-2xl font-normal">
          Moormanage/Boatyards
        </h1>
        <div className="flex gap-4 items-center mr-12 mt-14">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2]" />
              <InputText
                placeholder="Search"
                className="h-[5vh] cursor-pointer font-bold"
              />
            </div>
          </div>

          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          >
            <AddBoatyards />
          </CustomModal>
        </div>
      </div>
      <div className=" ml-60 text-center">
        <BoatyardTable moorings={moorings as BOATYARD_DATA[]} />
        {/* <TableContainer sx={{ border: "1px solid gray", width: "50vw" }}>
          <Table>
            <TableHead
              sx={{
                border: "1px solid gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableRow
                sx={{
                  display: "flex",
                  textAlign: "center",
                  marginLeft: "10px",
                  gap: "4px",
                }}
              >
                <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boatData.map((row) => (
                <Accordion key={row.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                        {row.email}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", textAlign: "center" }}>
                        {row.phoneNumber}
                      </TableCell>
                    </TableRow>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                      tenetur ut quis modi nihil iusto quibusdam id dignissimos
                      nemo aut. Inventore perspiciatis totam animi mollitia
                      adipisci, magnam possimus aut dolor.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
    </>
  );
};

export default Boatyards;
