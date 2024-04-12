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
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";
import { FaLocationPin } from "react-icons/fa6";
import { Avatar } from "primereact/avatar";
import Timeline from "../../customComponent/Timeline";
import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
} from "../../../Services/MoorManage/moormanage";
import { ErrorResponse } from "../../../Services/authentication/types";
import {
  CUSTOMER_PAYLOAD,
  CUSTOMER_RESPONSE,
} from "../../../Services/MoorManage/types";

interface CustomerData {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
}

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState<CUSTOMER_PAYLOAD[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCustomerData, setFilteredCustomerData] = useState<
    CUSTOMER_PAYLOAD[]
  >([]);

  const [getCustomer] = useGetCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditMode(false);
  };
  // const [clientData] = useState<CustomerData[]>([
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },

  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },

  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  //   {
  //     id: "01",
  //     name: "Ram",
  //     phoneNumber: 4564546897,
  //     email: "test@gmail.com"
  //   },
  // ]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = customerData.filter((data) => {
      // Check if data.id is a string before calling toLowerCase()
      const id =
        typeof data.customerId === "string"
          ? data.customerId.toLowerCase()
          : "";
      const customerName =
        typeof data.customerName === "string"
          ? data.customerName.toLowerCase()
          : "";
      const emailAddress =
        typeof data.emailAddress === "string"
          ? data.emailAddress.toLowerCase()
          : "";
      // Implement your custom filtering logic here
      return (
        id.includes(query.toLowerCase()) ||
        customerName.includes(query.toLowerCase()) ||
        emailAddress.includes(query.toLowerCase())
      );
    });
    setFilteredCustomerData(filteredData);
  };

  const getCustomerData = async () => {
    console.log("response customer");

    try {
      const response = await getCustomer({}).unwrap();
      console.log("Response:", response);
      setCustomerData(response as CUSTOMER_PAYLOAD[]);
      setFilteredCustomerData(response as CUSTOMER_PAYLOAD[]);

      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response
      ) {
        console.log("Response data:", response.data);
        setCustomerData(response.data as CUSTOMER_PAYLOAD[]);
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
              value={searchQuery}
              onChange={handleSearchChange}
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
      <div className="flex  items-center justify-between ml-3 mr-3">
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

      <div className="flex gap-4 ml-12 h-[110vh] mt-10" >
        <div className=" bg-[#F2F2F2] w-[30vw] rounded-md border-[1px] ">
          <DataTable
            value={filteredCustomerData}
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
            <Column header="ID:" field="id" style={{ width: "6vw" }}></Column>
            <Column
              style={{ width: "6vw" }}
              field="name"
              header="Name:"
            ></Column>
            <Column
              style={{ width: "10vw" }}
              field="email"
              header="Email:"
            ></Column>
            <Column
              style={{ width: "5vw" }}
              field="phoneNumber"
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
        <div className="relative w-[30vw]">
          <img
            src="/assets/images/Sea-img.png"
            className=" h-full object-cover rounded-md border-[1px] border-gray-300"
            alt="Sea Image"
          />

          <div className="-translate-y-[85vh] relative">
            <Timeline />
          </div>
          <div className="-translate-y-[55vh] flex justify-end relative">
            <Timeline />
          </div>

          <div className="absolute  translate-x-6 bottom-4  rounded-md border-[1px] p-1 border-gray-300 w-[17vw]  mt-auto h-[13vh] bg-white">
            <p className="text-[0.7rem] ml-1 text-black">Status</p>
            <hr className="m-1 border-black" />
            <div className="flex justify-between">
              <div>
                <FaCircle className="h-3 text-red-600 mt-1" />
                <FaCircle className="h-3 text-green-600 mt-4" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                <p className="text-[0.6rem] text-black tracking-tighter mt-[0.9rem]">
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
                <p className="text-[0.6rem] text-black mt-[0.9rem]">
                  Not in Use
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* last container */}
        <div className="w-[30vw]">
          <div className="rounded-md border">
            <div className="bg-[#D9D9D9] h-10 flex justify-between">
              <div>
                <p className="font-bold text-sm mt-3 ml-3">Customers Record</p>
              </div>
              <div className="flex">
                <FaEdit onClick={handleEdit} className="mr-3 mt-3" />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-red-500 mr-2 mt-3"
                />
              </div>
            </div>
            <div className="bg-[#F2F2F2]">
              <div className="flex ">
                <div className="mt-2 ml-3">
                  <Avatar size="xlarge" shape="circle" />
                </div>
                <div className="ml-4 mt-4">
                  <p className="text-xs font-extrabold tracking-tighter mt-2">
                    ID: <span className="font-bold"> #4645</span>
                  </p>
                  <p className="text-xs font-extrabold tracking-tighter mt-3">
                    Name:<span className="font-bold"> John Smith</span>
                  </p>
                </div>
                <div className="ml-4 mt-4">
                  <p className="text-xs font-extrabold tracking-tighter mt-2">
                    Phone:<span className="font-bold"> +1 234 543 4324</span>
                  </p>
                  <p className="text-xs font-extrabold tracking-tighter mt-3">
                    Email:<span className="font-bold"> Demo@gamil.com</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 ml-3">
                <p className="text-sm font-extrabold tracking-tighter">
                  Address:
                  <span className="font-bold">
                    Suite 333 17529 Miller Spur, South Ervinstad
                  </span>
                </p>
                <div className="flex mt-2">
                  <div>
                    <p className="text-sm font-extrabold">Boatyard:</p>
                  </div>
                  <div className="flex text-xs ml-2 font-bold">
                    <p className=" bg-gray-300 ">Pioneer</p>
                    <p className=" bg-gray-300 ml-2">02Pioneer</p>
                    <p className=" bg-gray-300 ml-2">03Pioneer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex bg-[#E9E9E9]">
              <div className="mt-3 ml-3">
                <p>Moorings:</p>
              </div>
              <div className="ml-4 mt-2">
                <div className=" rounded-md border-[1px]  border-gray-500 w-[19vw] h-[8vh] flex items-center">
                  <div>
                    <AiFillCheckCircle className="h-12 rounded-md w-6 bg-black text-white" />
                  </div>
                  <div className="flex mt-o">
                    <div>
                      <p className="text-xs tracking-tighter ml-2">
                        <span>Mooring No:</span> 54342
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-tighter ml-3">
                        <span>Boat Name:</span> Suriase
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border-[1px] border-gray-500 w-[19vw] h-[8vh] mt-2 mb-2 flex items-center ">
                  <div>
                    <AiFillCheckCircle className="h-12 rounded-md w-6 bg-black text-white" />
                  </div>
                  <div className="flex">
                    <div>
                      <p className="text-xs tracking-tighter ml-2">
                        <span>Mooring No:</span> 54342
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-tighter ml-3">
                        <span>Boat Name:</span> Suriase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className=" flex justify-between bg-[#D9D9D9] h-10">
              <div>
                <p className="font-bold text-sm mt-3 ml-3">
                  Mooring Information
                </p>
              </div>
              <div className="mt-3 mr-3">
                <FaEdit onClick={handleEdit} />
              </div>
            </div>
            <div className="flex bg-[#F2F2F2]">
              <div className="text-sm tracking-tighter ml-2 mt-2">
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
              <div className="text-sm tracking-tighter mt-2">
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
