import { DataTable } from "primereact/datatable";

import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../Customer/AddCustomer";
import AddMoorings from "./AddMoorings";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useGetMooringsMutation } from "../../../Services/MoorManage/moormanage";
import {
  MOORING_PAYLOAD,
  MOORING_RESPONSE,
} from "../../../Services/MoorManage/types";
import { FaCircle, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Avatar } from "primereact/avatar";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mooringData, setMooringData] = useState<MOORING_PAYLOAD[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const [getMoorings] = useGetMooringsMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const MooringsHeader = () => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-extrabold mb-2">Moorings</span>
        <div className="flex items-center gap-2 p-2">
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search by name, ID, mooring no, boat name, phone no..."
              className="h-[5vh] w-[48vh] cursor-pointer text-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  const getMooringsData = async () => {
    await getMoorings({})
      .unwrap()
      .then(async (response) => {
        console.log("RESPONSE", response);
        const { status, content } = response as MOORING_RESPONSE;
        if (status === 200 && Array.isArray(content)) {
          const flattenedData = content.reduce((acc, curr) => acc.concat(curr), []);
          setMooringData(flattenedData);
          console.log("RESPONSE boat data", mooringData);
        }
      });
  };
  

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData);
    setEditMode(true);
  };

  useEffect(() => {
    getMooringsData();
  }, []);

  return (
    <>
      <div className="flex items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Moorings
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-20 mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
            style={{ borderRadius: "1rem", overflow: "hidden" }}
          >
            <AddMoorings moorings={selectedCustomer} editMode={editMode} />
          </CustomModal>
        </div>
      </div>

      <div className="flex overflow-hidden ml-12">
        <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[28vw] mt-10">
          <DataTable
            value={mooringData}
            header={MooringsHeader}
            scrollable={true}
            tableStyle={{
              // minWidth: "20rem",
              fontSize: "12px",
              color: "#000000",
              fontWeight: 600,
              backgroundColor: "#D1D1D1",
            }}
            size="small"
          >
            <Column header="ID:" field="id" style={{ width: "6vw" }}></Column>
            <Column
              style={{ width: "6vw" }}
              field="ownerName"
              header="Mooring Name"
            ></Column>
            <Column
              style={{ width: "10vw" }}
              field="emailAddress"
              header="GPS Coordinates"
            ></Column>
            {/* <Column
              style={{ width: "5vw" }}
              field="phone"
              header="Phone:"
            ></Column> */}
            {/* <Column
            style={{ width: "10vw" }}
            field="address"
            header="Address"
          ></Column> */}
            {/* <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  label="Edit"
                  className="p-button-text p-button-info"
                  onClick={() => handleEdit(rowData)}
                />
                <Button
                  label="Delete"
                  className="p-button-text p-button-danger"
                  onClick={() => handleDelete(rowData)}
                />
              </div>
            )}
          ></Column> */}
          </DataTable>
        </div>
        {/* middle container */}
        <div className=" flex flex-col rounded-md border-[1px] p-1 border-gray-300 w-[28vw] ml-5 mt-10 h-[86vh]">
          <div className="rounded-md border-[1px] p-1 border-gray-300  w-[22vw] ml-2 mt-auto h-[17vh] bg-gray-800">
            <p className="text-xs ml-2 mt-2 text-white">Status</p>
            <hr className="m-2" />
            <div className="flex justify-between">
              <div>
                <FaCircle className="h-2 text-red-600 mt-1" />
                <FaCircle className="h-2 text-green-600 mt-7" />
              </div>
              <div>
                <p className="text-xs text-white">Need inspection</p>
                <p className="text-xs text-white tracking-tighter mt-5">
                  Gear On (in the water)
                </p>
              </div>
              <div>
                <FaCircle className="h-2 text-violet-600 mt-1 " />
                <FaCircle className="h-2 text-gray-300 mt-7" />
              </div>
              <div>
                <p className="text-xs text-white tracking-tighter">
                  Gear Off (out of the water)
                </p>
                <p className="text-xs text-white mt-5">Not in Use</p>
              </div>
            </div>
          </div>
        </div>
        {/* last container */}
        <div className="ml-5">
          <div className=" rounded-md border-[1px] p-1 border-gray-300 w-[28vw]  mt-10 h-[40vh]">
            <div className="bg-[#D9D9D9] flex justify-between">
              <div>
                <p className="font-bold">Customers Record</p>
              </div>
              <div className="flex">
                <FaEdit className="mr-2" />
                <RiDeleteBin5Fill className="text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex">
              <div>
                <Avatar size="xlarge" shape="circle" />
              </div>
              <div className="ml-4">
                <p className="text-xs font-extrabold tracking-tighter mt-2">
                  ID: #4645
                </p>
                <p className="text-xs font-extrabold tracking-tighter mt-3">
                  Name: John Smith
                </p>
              </div>
              <div className="ml-4">
                <p className="text-xs font-extrabold tracking-tighter mt-2">
                  Phone: +1 234 543 4324
                </p>
                <p className="text-xs font-extrabold tracking-tighter mt-3">
                  Email:Demo@gamil.com
                </p>
              </div>
            </div>
            <div className="ml-2 mt-2">
              <p className="text-xs font-extrabold tracking-tighter">
                Address: Suite 333 17529 Miller Spur, South Ervinstad
              </p>
            </div>
            <div className="flex mt-2 ml-2">
              <div>
                <p className="text-xs font-extrabold">Boatyard:</p>
              </div>
              <div className="flex text-xs ml-2 font-bold">
                <p className=" bg-gray-300 ">Pioneer</p>
                <p className=" bg-gray-300 ml-2">02Pioneer</p>
                <p className=" bg-gray-300 ml-2">03Pioneer</p>
              </div>
            </div>
          </div>
          <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[28vw]  mt-10 h-[40vh]">
            <div className=" flex justify-between bg-gray-300">
              <div>
                <p>Mooring Information</p>
              </div>
              <div>
                <FaEdit />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="text-xs tracking-tighter ml-2">
                <p className="mb-2">
                  <span className="font-bold">Mooring No:</span> 52325
                </p>
                <p className="mb-2">
                  <span className="font-bold">Harbor:</span> Houston
                </p>
                <p className="mb-2">
                  <span className="font-bold">Type & Weight:</span> Skiff(321kg)
                </p>
                <p className="mb-2">
                  <span className="font-bold">Boat Size:</span> length:10m,
                  width:3.8m
                </p>
                <p className="mb-2">
                  <span className="font-bold">Shackle, Swivel Condition:</span>{" "}
                  none
                </p>
                <p className="mb-2">
                  <span className="font-bold">
                    Type, Length & Condition of Bottom Chain:
                  </span>{" "}
                  Skiff(321kg)
                </p>
                <p className="mb-2">
                  <span className="font-bold">
                    Type, Length & Condition of Top Chain:
                  </span>{" "}
                  none
                </p>
                <p className="mb-2">
                  <span className="font-bold">
                    Type, Length & Condition of Pennant:
                  </span>{" "}
                  none
                </p>
              </div>
              <div className="text-xs tracking-tighter">
                <p className="mb-2">
                  <span className="font-bold">Boat Name:</span> Sunriase
                </p>
                <p className="mb-2">
                  <span className="font-bold">Water Depth:</span> 100m
                </p>
                <p className="mb-2">
                  <span className="font-bold">Condition of Eye:</span> none
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moorings;
