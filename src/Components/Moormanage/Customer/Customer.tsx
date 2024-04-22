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
import { Dialog } from "primereact/dialog";
import Timeline from "../../customComponent/Timeline";
import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useGetMooringsMutation,
} from "../../../Services/MoorManage/moormanage";
import { ErrorResponse } from "../../../Services/authentication/types";
import {
  CUSTOMER_PAYLOAD,
  CUSTOMER_RESPONSE,
  MOORING_PAYLOAD,
  MOORING_RESPONSE,
} from "../../../Services/MoorManage/types";
import DatePickerComponent from "../../Common/DatePickerComponent";

interface CustomerData {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
}
interface CustomerProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
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
  // const [selectedMooring, setSelectedMooring] = useState<MOORING_PAYLOAD>();

  console.log("filterdata", filteredCustomerData);

  const [mooringData, setMooringData] = useState<MOORING_PAYLOAD[]>([]);
  const [customerRowData, setCustomerRowData] = useState<MOORING_PAYLOAD>();
  const [dialogVisible, setDialogVisible] = useState(false);

  const [getCustomer] = useGetCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [getMoorings] = useGetMooringsMutation();

  const [edited, setEdited] = useState<CustomerProps>({
    id: "#43453",
    name: "John Smith",
    phone: "+1 234 543 4324",
    email: "john@gmail.com",
    address: "Suite 333 17529 Miller Spur South Ervinstad",
  });

  const handleButtonClick = () => {
    console.log("Add New button clicked");
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditMode(false);
  };
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
    try {
      const response = await getCustomer({}).unwrap();
      console.log("Response:", response);
      if (response) {
        setCustomerData(response as CUSTOMER_PAYLOAD[]);
        setFilteredCustomerData(response as CUSTOMER_PAYLOAD[]);
      } else {
        console.error("Error: Failed to fetch customer data");
        // Set an error state or display a message to the user
      }
    } catch (error) {
      console.error("Error occurred while fetching customer data:", error);

      if (error) {
        console.error("Error message:", error);
        // Set an error state or display the error message to the user
      } else {
        console.error("Unknown error occurred");
        // Set an error state or display a generic error message to the user
      }

      // Handle uncaught runtime errors to prevent UI crash
      // For example, you can display a friendly error message to the user
      // or set an error state to conditionally render an error component
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

  const getMooringsData = async () => {
    await getMoorings({})
      .unwrap()
      .then(async (response) => {
        console.log("RESPONSE", response);
        const { status, content } = response as MOORING_RESPONSE;
        if (status === 200 && Array.isArray(content)) {
          setMooringData(content);
          // setFilteredMooringData(content); // Initialize filtered data with all data
        }
      });
  };

  useEffect(() => {
    getCustomerData();
    getMooringsData();
  }, []);

  return (
    <>
      <div className="flex  items-center justify-between ml-3 mr-3 ">
        <div>
          <h1 className="mt-14 ml-12 opacity-30 text-2xl font-normal">
            MOORMANAGE/Customer
          </h1>
        </div>
        <div className="flex gap-4 mt-14 ml-[20.60rem]">
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
              editMode={editMode || modalVisible}
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

      <div className="flex gap-4 ml-12 mt-10">
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

          <div className="-translate-y-[85vh] relative" data-testid="timeline1">
            <Timeline />
          </div>
          <div
            className="-translate-y-[55vh] flex justify-end relative"
            data-testid="timeline2"
          >
            <Timeline />
          </div>

          <div className="absolute  translate-x-6 bottom-4  rounded-md border-[1px] pb-1 border-gray-300 w-[17vw]  mt-auto h-[13vh] bg-white">
            <p className="text-[0.7rem] ml-1 text-black">Status</p>
            <hr className="m-1 border-black" />
            <div className="flex justify-between">
              <div data-testid="Facircle">
                <FaCircle className="h-3 text-red-600 mt-1" />
                <FaCircle className="h-3 text-green-600 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                <p className="text-[0.6rem] text-black tracking-tighter mt-[0.3rem]">
                  Gear On (in the water)
                </p>
              </div>
              <div className="ml-1">
                <FaCircle className="h-3 text-violet-600 mt-1 " />
                <FaCircle className="h-3 text-gray-500 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                  Gear Off (out of the water)
                </p>
                <p className="text-[0.6rem] text-black mt-[0.3rem]">
                  Not in Use
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* last container */}
        <div className="w-[30vw]">
          <div className="rounded-md border">
            <div className="bg-[#D9D9D9] flex justify-between pb-2">
              <div>
                <p className="font-bold text-sm mt-3 ml-3">Customers Record</p>
              </div>
              <div className="flex">
                <FaEdit
                  onClick={handleEdit}
                  className="mr-3 mt-3"
                  data-testid="FaEdit"
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-red-500 mr-2 mt-3"
                  data-testid="RiDeleteBin5Fill"
                />
              </div>
            </div>

            <div className="bg-[#F2F2F2] pt-2 px-3">
              <div className="flex gap-32 ">
                <div className=" text-sm tracking-tighter">
                  <p>
                    <span className="font-bold">ID:</span>
                    {edited.id}
                  </p>
                  <p>
                    <span className="font-bold">Phone:</span>
                    {edited.phone}
                  </p>
                </div>
                <div className=" text-sm">
                  <p>
                    <span className="font-bold">Name:</span>
                    {edited.name}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>
                    {edited.email}
                  </p>
                </div>
              </div>
              <div className="text-sm mt-2">
                <p>
                  <span className="font-bold">Address:</span>
                  {edited.address}
                </p>
              </div>
              <div className="font-bold text-sm mt-2">
                <p>
                  Boatyard:<span className="bg-[#D9D9D9] ml-2">Pioneer</span>{" "}
                  <span className="bg-[#D9D9D9] ml-2">02Pioneer</span>{" "}
                  <span className="bg-[#D9D9D9] ml-2">Pioneer</span>
                </p>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: "72vh" }} className="">
            <h3 className="bg-[#D9D9D9] font-bold py-2 pl-3">Moorings</h3>
            <DataTable
              tableStyle={{ minWidth: "20rem" }}
              className="bg[#F2F2F2]"
              value={mooringData}
              scrollable={true}
              selectionMode="single"
              style={{ overflow: "scroll", maxHeight: "72vh" }}
              onRowSelect={(e) => {
                setCustomerRowData(e.data);
                setDialogVisible(true);
              }}
            >
              <Column
                field="id"
                header="ID"
                headerClassName="text-sm"
                style={{ fontSize: "0.75rem" }}
              />
              <Column
                field="mooringName"
                header="Mooring Name"
                style={{ fontSize: "0.75rem" }}
              />
              <Column
                field="gpsCoordinates"
                header="GPS Coordinate"
                style={{ fontSize: "0.75rem" }}
              />
            </DataTable>
            {/* Dialog BOX */}
            <Dialog
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              header={
                <div className="flex gap-4">
                  <div className="font-bold">Mooring Information</div>
                  <div className="font-bold mt-1">
                    <FaEdit onClick={handleEdit} />
                  </div>
                </div>
              }
            >
              <hr className="border border-black  my-0 mx-0"></hr>
              {customerRowData && (
                <div className="flex leading-10 gap-4">
                  <div>
                    <p>
                      <span style={{ fontWeight: "bold" }}>ID:</span>{" "}
                      {customerRowData?.id}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Mooring No:</span>{" "}
                      {customerRowData?.mooringNumber}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Boat Name:</span>{" "}
                      {customerRowData?.boatName}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Type:</span>{" "}
                      {customerRowData?.boatType}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Size of Weight:
                      </span>{" "}
                      {customerRowData?.sizeOfWeight}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Top Chain Condition:
                      </span>{" "}
                      {customerRowData?.topChainCondition}
                    </p>
                    <p className="tracking-tighter">
                      <span style={{ fontWeight: "bold" }}>
                        Bottom Chain Condition:
                      </span>{" "}
                      {customerRowData?.bottomChainCondition}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Pennant Condition:
                      </span>{" "}
                      {customerRowData?.pennantCondition}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Water Depth:</span>{" "}
                      {customerRowData?.waterDepth}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Harbor:</span>{" "}
                      {customerRowData?.harbor}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        G.P.S Coordinates:
                      </span>{" "}
                      {customerRowData?.gpsCoordinates}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Boat Size:</span>{" "}
                      {customerRowData?.boatSize}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Weight:</span>{" "}
                      {customerRowData?.boatWeight}
                    </p>

                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Type of Weight:
                      </span>{" "}
                      {customerRowData?.typeOfWeight}
                    </p>

                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Condition of Eye:
                      </span>{" "}
                      {customerRowData?.conditionOfEye}
                    </p>

                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Shackle, Swivel Condition:
                      </span>{" "}
                      {customerRowData?.shackleSwivelCondition}
                    </p>

                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Dept at Mean High Water:
                      </span>{" "}
                      {customerRowData?.deptAtMeanHighWater}
                    </p>
                  </div>
                </div>
              )}
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
