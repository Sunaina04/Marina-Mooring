import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";
import { InputText } from "primereact/inputtext";
import { Button } from "@mui/material";
import ButtonComponent from "../../Common/ButtonComponent";

interface CustomerData {
  invoice: string;
  mooringid: string;
  name: string;
  technicianName: string;
  services: string;
  time: string;
  amount: string;
}

const AccountRecievable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      invoice: "#425",
      mooringid: "#6658",
      name: "John Smith",
      technicianName: "jim Carry",
      services: "Regular Services",
      time: "2hrs",
      amount: "$12",
    },

    {
      invoice: "#425",
      mooringid: "#6658",
      name: "John Smith",
      technicianName: "jim Carry",
      services: "Regular Services",
      time: "2hrs",
      amount: "$12",
    },
    {
      invoice: "#425",
      mooringid: "#6658",
      name: "John Smith",
      technicianName: "jim Carry",
      services: "Regular Services",
      time: "2hrs",
      amount: "$12",
    },
    {
      invoice: "#425",
      mooringid: "#6658",
      name: "John Smith",
      technicianName: "jim Carry",
      services: "Regular Services",
      time: "2hrs",
      amount: "$12",
    },
  ]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 ">
      <span className="text-xl font-bold">Account Recievable</span>
      <span
        style={{
          fontFamily: "Lato",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "16.8px",
          letterSpacing: "0.4837472140789032px",
          textAlign: "right",
        }}
      >
        View All
      </span>
    </div>
  );

  return (
    <>
      {" "}
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">
            Moormanage/Account Receivable
          </h1>
        </div>

        <div className="flex gap-1 ml-[18rem] text-[gray] font-extrabold mt-14">
          <div>
            <img
              src="/assets/images/download.png"
              alt=""
              className="w-5 "
              style={{ filter: "grayscale(100%)", color: "gray" }}
            />
          </div>

          <div>
            <h1>DownLoad Excel</h1>
          </div>

          <div></div>
        </div>
        <div className="items-center mr-[10rem] mt-14">
          <CustomModal
            onClick={handleButtonClick}
            visible={false}
            onHide={handleModalClose}
          >
            <AddCustomer
              customer={undefined}
              editMode={false}
              closeModal={function (): void {
                throw new Error("Function not implemented.");
              }}
              getCustomer={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </CustomModal>
        </div>
      </div>
      <div className="bg-[#F2F2F2] rounded-md border-[1px] border-[#D1D1D1] p-2 mt-12 w-[68vw] ml-20">
        <DataTable value={boatData} header={header} tableStyle={{}}>
          <Column
            header="invoice"
            field="invoice"
            style={{ width: "5rem" }}
          ></Column>
          <Column
            field="mooringid"
            header="Mooring ID"
            style={{ width: "8rem" }}
          ></Column>
          <Column
            field="name"
            header="Customer Name"
            style={{ width: "11rem" }}
          ></Column>
          <Column
            field="technicianName"
            header="Technician name"
            style={{ width: "11rem" }}
          ></Column>
          <Column
            field="services"
            header="Services"
            style={{ width: "8rem" }}
          ></Column>
          <Column field="time" header="Time" style={{ width: "5rem" }}></Column>
          <Column
            field="amount"
            header="Amount"
            style={{ width: "6rem" }}
          ></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-4">
                <span className="text-green-500 underline cursor-pointer">
                  Approve
                </span>
                <span className="text-red-500 underline cursor-pointer">
                  Deny
                </span>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default AccountRecievable;
