import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import AddBoatyards from "./AddBoatyards";
import { InputText } from "primereact/inputtext";
import MooringTable from "./BoatyardTable";
import { BOATYARD_DATA, BOATYARD_PAYLOAD, BOATYARD_RESPONSE } from "../../../Types/MoorManageApiTypes";
import BoatyardTable from "./BoatyardTable";
import { useGetBoatyardsMutation } from "../../../Services/MoorManage/MoormanageApi";

const Boatyards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatyardsData, setboatyardsData] = useState<BOATYARD_PAYLOAD[]>([]);
  const [filteredboatyardsData, setFilteredboatyardsData] = useState<
    BOATYARD_PAYLOAD[]
  >([]);
  const [getBaotyards] = useGetBoatyardsMutation();

  const moorings: BOATYARD_DATA[] = [
    {
      id: "#9715",
      moorings: "Pioneer",
      boatyards: 2,
      name: "John smith",
      phoneNumber: "+1 234 543 4324",
      email: "demo@gmail.com",
      boatyardDetails: [
        {
          id: 1,
          name: "Pioneer",
          address: "123 Elm St",
          phone: "+1 234 543 4324",
          mooring: 15,
          mooringDetails: [
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
          ],
        },
        {
          id: 1,
          name: "Pioneer",
          address: "123 Elm St",
          phone: "+1 234 543 4324",
          mooring: 15,
          mooringDetails: [
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
          ],
        },
      ],
    },
    {
      id: "#9715",
      moorings: "Pioneer",
      boatyards: 2,
      name: "John smith",
      phoneNumber: "+1 234 543 4324",
      email: "demo@gmail.com",
      boatyardDetails: [
        {
          id: 1,
          name: "Pioneer",
          address: "123 Elm St",
          phone: "+1 234 543 4324",
          mooring: 15,
          mooringDetails: [
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
          ],
        },
        {
          id: 1,
          name: "Pioneer",
          address: "123 Elm St",
          phone: "+1 234 543 4324",
          mooring: 15,
          mooringDetails: [
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
            },
            {
              id: "#46645",
              mainContact: "Maxwell",
              mooringNumber: "54345",
              boatName: "Sunriase",
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

  const getBaotyardsData = async () => {
    await getBaotyards({})
      .unwrap()
      .then(async (response) => {
        console.log("RESPONSE", response);
        const { status, content } = response as BOATYARD_RESPONSE;
        if (status === 200 && Array.isArray(content)) {
          setboatyardsData(content);
          setFilteredboatyardsData(content); // Initialize filtered data with all data
        }
      });
  };

  useEffect(() => {
    getBaotyardsData();
  }, []);

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
      <div className="ml-10">
        <BoatyardTable moorings={moorings as BOATYARD_DATA[]} />
      </div>
    </>
  );
};

export default Boatyards;
