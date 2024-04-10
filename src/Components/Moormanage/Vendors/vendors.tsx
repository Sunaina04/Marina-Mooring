import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import AddVendor from "./AddVendor";
import { InputText } from "primereact/inputtext";
import { useGetVendorsMutation } from "../../../Services/MoorManage/moormanage";
import { VENDOR_PAYLOAD, VENDOR_RESPONSE } from "../../../Services/MoorManage/types";

const Vendor = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [vendorData, setVendorData] = useState<VENDOR_PAYLOAD[]>([]);
  const [getVendors] = useGetVendorsMutation();

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const getVendorData = async () => {
    await getVendors({})
      .unwrap()
      .then(async (response) => {
        console.log("RESPONSE", response);
        const { status, content } = response as VENDOR_RESPONSE;
        if (status === 200 && Array.isArray(content)) {
          const flattenedData = content.reduce(
            (acc, curr) => acc.concat(curr),
            []
          );
          setVendorData(flattenedData);
          console.log("RESPONSE boat data", vendorData);
        }
      });
  };

  useEffect(() => {
    getVendorData();
  }, []);

  return (
    <>
      {" "}
      {/* <div className="flex ml-12"> */}
      <div className="flex justify-between items-center ml-2">
        <div>
          <h1 className="mt-14 ml-[7.50rem] opacity-30 text-2xl font-normal">
            Moormanage/Vendor
          </h1>
        </div>

        <div className="flex gap-4 items-center  mr-[8rem] mt-14">
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
            style={{ borderRadius: "2rem" }}
          >
            <AddVendor />
          </CustomModal>
        </div>
      </div>
      {/* </div> */}
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw] p-1 ml-32 mt-10">
        <DataTable
          value={vendorData}
          header={""}
          tableStyle={{
            minWidth: "20rem",
            fontSize: "12px",
            color: "#000000",
            fontWeight: 600,
            backgroundColor: "#D1D1D1",
          }}
          size="small"
        >
          <Column header="ID" field="id" style={{ width: "8vw" }}></Column>
          <Column
            style={{ width: "11vw" }}
            field="name"
            header="Company Name"
          ></Column>
          <Column
            style={{ width: "11vw" }}
            field="phoneNumber"
            header="Phone Number"
          ></Column>

          <Column
            style={{ width: "11vw" }}
            field="email"
            header="Email Address"
          ></Column>
          <Column
            style={{ width: "11vw" }}
            field="InventoryItems"
            header="Inventory Items"
          ></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">
                  View Invetory
                </span>
                <span className="text-green-600  font-bold underline cursor-pointer">
                  Edit
                </span>

                <span className="text-red-600 font-bold underline cursor-pointer">
                  Delete
                </span>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default Vendor;
