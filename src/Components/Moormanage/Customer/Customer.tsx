import { useEffect, useState } from "react";
import CustomModal from "../../customComponent/CustomModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Outlet } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import { Button } from "primereact/button";
import StatCard from "../../StatCard/StatCard";
import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa6";
import { Avatar } from "primereact/avatar";
import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
} from "../../../Services/MoorManage/moormanage";
import { ErrorResponse } from "../../../Services/authentication/types";
import {
  CUSTOMER_PAYLOAD,
  CUSTOMER_RESPONSE,
} from "../../../Services/MoorManage/types";

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boatData, setBoatData] = useState<CUSTOMER_PAYLOAD[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [getCustomer] = useGetCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditMode(false);
  };

  const statCardsData = [
    [
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 43324 },
      { title: "Total Customers", percentage: 17, count: 44324 },
      { title: "Total Customers", percentage: 17, count: 58765 },
      { title: "Total Customers", percentage: 17, count: 42324 },
      { title: "Total Customers", percentage: 17, count: 46789 },
    ],

    [{ title: "Services", percentage: 25, count: 34576 }],

    [{ title: "Work Orders", percentage: 58, count: 8421 }],
  ];

  const getCustomerData = async () => {
    console.log("response customer");

    try {
      const response = await getCustomer({}).unwrap();
      console.log("Response:", response);
      setBoatData(response as CUSTOMER_PAYLOAD[]);

      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response
      ) {
        console.log("Response data:", response.data);
        setBoatData(response.data as CUSTOMER_PAYLOAD[]);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error occurred while fetching customer data:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const { message: msg } = error.data as ErrorResponse;
        console.error("Error message:", msg);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData);
    setEditMode(true);
  };

  const handleDelete = async (rowData: any) => {
    // Handle delete action here, using the data from rowData if necessary
    console.log("Delete clicked for:", rowData, rowData?.id);

    try {
      const response = await deleteCustomer({ id: rowData?.id });
      console.log("RESPONSE", response);
      getCustomerData();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const CustomerHeader = () => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-extrabold mb-2">Customers</span>
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

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <>
      <div className="flex  items-center ml-9">
        <div>
          <h1 className="mt-14 ml-12 opacity-30 text-2xl font-normal">
            MOORMANAGE/Customer
          </h1>
        </div>
        <div className="flex gap-4 mt-14 ml-[20.60rem]">
          {/* <div>
          <div className="p-input-icon-left">
            <i className="pi pi-search text-[#D2D2D2]" />
            <InputText
              placeholder="Search"
              className="h-[5vh] cursor-pointer font-bold"
            />
          </div>
        </div> */}

          <CustomModal
            label={"ADD NEW"}
            style={{
              width: "50vw",
              height: "80vh",
              backgroundColor: "black",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "1rem",
            }}
            onClick={handleButtonClick}
            visible={modalVisible || editMode}
            onHide={handleModalClose}
          >
            <AddCustomer
              customer={selectedCustomer}
              editMode={editMode}
              closeModal={handleModalClose}
              getCustomer={getCustomerData}
            />
          </CustomModal>
        </div>
      </div>

      {/* <div className="flex  mt-10 ml-12 mr-20">
        {statCardsData.map((items) => (
          <StatCard key={items[0].title} items={items} />
        ))}
      </div> */}

      <div className="flex overflow-hidden ml-12">
        <div className=" bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[28vw]  mt-10">
          <DataTable
            value={boatData}
            header={CustomerHeader}
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
            <Column
              header="ID:"
              field="customerId"
              style={{ width: "6vw" }}
            ></Column>
            <Column
              style={{ width: "6vw" }}
              field="customerName"
              header="Name:"
            ></Column>
            <Column
              style={{ width: "10vw" }}
              field="emailAddress"
              header="Email:"
            ></Column>
            <Column
              style={{ width: "5vw" }}
              field="phone"
              header="Phone:"
            ></Column>
            {/* <Column
            style={{ width: "10vw" }}
            field="address"
            header="Address"
          ></Column>
          <Column
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

export default Customer;
