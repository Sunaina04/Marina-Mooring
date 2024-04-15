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
//import { Accordion, AccordionTab } from "primereact/accordion";
import Timeline from "../../customComponent/Timeline";

import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

import {
  MOORING_PAYLOAD,
  MOORING_RESPONSE,
} from "../../../Services/MoorManage/types";
import { FaCircle, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Avatar } from "primereact/avatar";
import { AiFillCheckCircle } from "react-icons/ai";
import { Accordion, AccordionDetails } from "@mui/material";

interface CustomerData {
  id: string;
  boatName: string;
  name: string;
  date: string;
  measurement: string;
  place: string;
}
interface CustomerProps {
  id: string;
  name: string;
  phone:string;
  email:string;
  address:string
}

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mooringData, setMooringData] = useState<MOORING_PAYLOAD[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMooringData, setFilteredMooringData] = useState<
    MOORING_PAYLOAD[]
  >([]);
  const [edit, setEdit] = useState<CustomerProps>({
    id: "#43453",
    name: "John Smith",
    phone: "+1 234 543 4324",
    email: 'john@gmail.com',
    address: 'Suite 333 17529 Miller Spur South Ervinstad'
  })
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e: InputSwitchChangeEvent) => {
    // e.stopPropagation();
    console.log(e.value);
    setIsChecked(e.value);
  };

  const [getMoorings] = useGetMooringsMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = mooringData.filter((data) => {
      // Check if data.id is a string before calling toLowerCase()
      const id = typeof data.id === "number" ? data.id.toString() : "";
      const customerName =
        typeof data.customerName === "string"
          ? data.customerName.toLowerCase()
          : "";
      const gpsCoordinates =
        typeof data.gpsCoordinates === "string"
          ? data.gpsCoordinates.toLowerCase()
          : "";
      // Implement your custom filtering logic here
      return (
        id.includes(query.toLowerCase()) ||
        customerName.includes(query.toLowerCase()) ||
        gpsCoordinates.includes(query.toLowerCase())
      );
    });
    setFilteredMooringData(filteredData);
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
              value={searchQuery}
              onChange={handleSearchChange}
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
          setMooringData(content);
          setFilteredMooringData(content); // Initialize filtered data with all data
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
      <div className="flex items-center justify-between ml-12 overflow-hidden">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Moorings
          </h1>
        </div>
        <div className="flex gap-4 items-center mr-20  mt-14">
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

      <div className="flex ml-12 gap-4 mt-10">
        <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[28vw] h-[105vh]">
          <DataTable
            value={filteredMooringData}
            header={MooringsHeader}
            scrollable={true}
            tableStyle={{
              // minWidth: "20rem",
              fontSize: "12px",
              color: "#000000",
              fontWeight: 600,
              backgroundColor: "#D9D9D9",
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
              field="gpsCoordinates"
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
        <div>
          <img
            src="/assets/images/Sea-img.png"
            className="bg-no-repeat object-cover bg-auto rounded-md w-full h-[105vh]"
            alt="Sea"
          />
          <div className="-translate-y-[45vh] -translate-x-30 ml-10 ">
            <div className="translate-x-[7rem]">
              <Timeline />
            </div>
            <div className="rounded-md border-[1px] p-1 border-gray-300  w-[17vw] mt-20 h-[13vh] bg-white">
              <p className="text-[0.7rem] ml-1 text-black">Status</p>
              <hr className="m-1 border-black" />
              <div className="flex">
                <div>
                  <FaCircle className="h-3 text-red-600 mt-1" />
                  <FaCircle className="h-3 text-green-600 mt-4" />
                </div>
                <div>
                  <p className="text-[0.6rem] text-black mt-1">
                    Need inspection
                  </p>
                  <p className="text-[0.6rem] text-black tracking-tighter mt-[0.8rem]">
                    Gear On (in the water)
                  </p>
                </div>
                <div className="ml-1">
                  <FaCircle className="h-3 text-violet-600 mt-1 " />
                  <FaCircle className="h-3 text-gray-500 mt-4" />
                </div>
                <div>
                  <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                    Gear Off (out of the water)
                  </p>
                  <p className="text-[0.6rem] text-black mt-[0.8rem]">
                    Not in Use
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" rounded-md  border-gray-400 w-[28vw]  -translate-y-[145vh] translate-x-[30vw]">
            {/* <div className="bg-[#D9D9D9] h-12 flex justify-between">
              <div>
                <p className="font-bold text-sm mt-3 ml-3">Customers Record</p>
              </div>
              <div className="flex">
                <FaEdit onClick={handleEdit} className="mr-2 mt-3" />
              </div>
            </div> */}
            <Accordion className="border-none ">
              <AccordionDetails className="bg-[#D9D9D9] rounded-md pt-2 px-0">
                <div className="flex justify-between items-center ml-4">
                  <div className="flex items-center">
                    <span className="font-bold">Customers Record</span>
                    <span>
                      <FaEdit className="ml-2" onClick={handleEdit} />
                    </span>
                    <InputSwitch
                      checked={isChecked}
                      onChange={handleInputChange}
                      className="border-none ml-20"
                    />
                  </div>
                </div>

                {isChecked && (
                  <>
                    <div className="bg-[#F2F2F2] px-2">
                      <div className="flex gap-32 mt-4 ">
                        <div className="font-bold text-sm ml-2">
                          <p>ID:{edit.id}</p>
                          <p>Phone:{edit.phone}</p>
                        </div>
                        <div className="font-bold text-sm">
                          <p>Name:{edit.name}</p>
                          <p>Email:{edit.email}</p>
                        </div>
                      </div>
                      <div className="font-bold text-sm mt-2 ml-2">
                        <p>Address:{edit.address}</p>
                      </div>
                      <div className="font-bold text-sm mt-2 ml-2 pb-2">
                        <p>
                          Boatyard:<span className="bg-[#D9D9D9] ml-2">Pioneer</span>{" "}
                          <span className="bg-[#D9D9D9] ml-2">02Pioneer</span> <span className="bg-[#D9D9D9] ml-2" >Pioneer</span>
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <h3 className="mt-2 bg-[#D9D9D9] font-bold h12 ml-4 pb-2">Moorings</h3>
                      <DataTable tableStyle={{ minWidth: "20rem" }} className="bg[#F2F2F2]">
                        <Column field="id" header="ID" headerClassName="text-sm"></Column>
                        <Column
                          field="mooringName"
                          header="Mooring Name"
                          headerStyle={{ fontSize: '0.875rem' }}
                        ></Column>
                        <Column field="gps" header="GPS Coordinate" headerStyle={{ fontSize: '0.87rem' }}></Column>
                      </DataTable>
                    </div>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        {/* middle container
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
        </div> */}
        {/* last container */}
        {/* <div className="ml-5">
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
        </div> */}
      </div>
    </>
  );
};

export default Moorings;
