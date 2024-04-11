import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonComponent from "../../Common/ButtonComponent";
import CustomModal from "../../customComponent/CustomModal";
import AddCustomer from "../../Moormanage/Customer/AddCustomer";
import AddEstimates from "./AddEstimates";

interface CustomerData {
  id: string;
  boatName: string;
  customerName: string;
  approved: string
}

const Estimates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boatData, setBoatData] = useState<CustomerData[]>([
    {
      id: "01",
      boatName: "Suncatcher",
      customerName: "Suncatcher",
      approved: "yes",

    },
    {
      id: "01",
      boatName: "Suncatcher",
      customerName: "Suncatcher",
      approved: "yes",

    },
    {
      id: "01",
      boatName: "Suncatcher",
      customerName: "Suncatcher",
      approved: "yes",

    },
    {
      id: "01",
      boatName: "Suncatcher",
      customerName: "Suncatcher",
      approved: "yes",

    },

  ]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-between gap-2 p-4">
      <span className="text-xl font-bold">Estimate</span>
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
          <h1 className="mt-14 ml-[7.50vw] opacity-30 text-2xl font-normal">
            MOORSERVE/Estimates
          </h1>
        </div>



        <div className="flex gap-1 ml-[25rem] text-[gray] font-extrabold mt-14">
          <div>
            <img
              src="/assets/images/download.png"
              alt=""
              className="w-5 "
              style={{ filter: "grayscale(100%)", color: "gray" }}
            />
          </div>

          <div>
            <h1>DownLoad </h1>
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
      <div className="bg-[#F2F2F2] rounded-xl border-[1px] border-[#D1D1D1] ml-40  mb-3 p-2 mt-12 w-[45vw]">
        <DataTable
          value={boatData}
          header={header}
          tableStyle={{
            fontSize: "0.80rem",
            fontWeight: "bold",
          }}
        >
          <Column
            header="ID"
            field="id"
            style={{ width: "5vw" }}
          ></Column>
          <Column field="boatName" header="Boat Name" style={{ width: "8vw" }}>

          </Column>
          <Column field="customerName" header="Customer Name" style={{ width: "9vw", }}></Column>
          <Column field="approved" header="Approved" style={{ width: "8vw" }}></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-4">
                <span className="text-black underline cursor-pointer">
                  Convert
                </span>
                <span className="text-black underline cursor-pointer">
                  Edit
                </span>

                <span className="text-red-500 underline cursor-pointer">
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

export default Estimates;
