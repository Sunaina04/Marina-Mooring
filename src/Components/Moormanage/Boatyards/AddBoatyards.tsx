import InputComponent from "../../Common/InputComponent";
import ButtonComponent from "../../Common/ButtonComponent";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "@mui/material";


interface CustomerData {
    id: string;
    customerName: string;
    email: string;
    phone: number;
    address: string;
}

const AddBoatyards = () => {

    const [boatData, setBoatData] = useState<CustomerData[]>([
        {
            id: "01",
            customerName: "Ram",
            email: "John@gmail.com",
            phone: 1456852896,
            address: "Punjab",
        },
        {
            id: "01",
            customerName: "Ram",
            email: "John@gmail.com",
            phone: 1456852896,
            address: "Punjab",
        },
        {
            id: "01",
            customerName: "Ram",
            email: "John@gmail.com",
            phone: 1456852896,
            address: "Punjab",
        },
        {
            id: "01",
            customerName: "Ram",
            email: "John@gmail.com",
            phone: 1456852896,
            address: "Punjab",
        },
    ]);

    return (
        <>
            <div className="w-full h-full  ">
                <h1 className=" text-lg font-bold">Add Boatyard</h1>

                <div className="flex justify-around mt-3">
                    <div>
                        <span className="font-semibold text-sm">Boatyard ID</span>
                        <div className="mt-2">
                            <InputComponent
                                style={{
                                    width: "13vw",
                                    height: "4vh",
                                    border: "1px solid gray",
                                    borderRadius: "0.50rem",
                                    fontSize: "0.80vw",
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold text-sm">Mooring name</span>
                        <div className="mt-2">
                            <InputComponent
                                // placeholder="Enter customer ID"
                                // type="text"
                                style={{
                                    width: "13vw",
                                    height: "4vh",
                                    border: "1px solid gray",
                                    borderRadius: "0.50rem",
                                    fontSize: "0.80vw",
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold text-sm">Owner name</span>
                        <div className="mt-2">
                            <InputComponent
                                // placeholder="Enter customer ID"
                                // type="text"
                                style={{
                                    width: "13vw",
                                    height: "4vh",
                                    border: "1px solid gray",
                                    borderRadius: "0.50rem",
                                    fontSize: "0.80vw",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">


                    <div>
                        <div>
                            <span className="font-semibold text-sm">Email Address</span>
                        </div>

                        <div className="mt-2">
                            <InputComponent
                                // placeholder="Enter owner name"
                                // type="text"
                                style={{
                                    width: "13vw",
                                    height: "4vh",
                                    border: "1px solid gray",
                                    borderRadius: "0.50rem",
                                    fontSize: "0.80vw",
                                }}
                            />
                        </div>
                    </div>


                    <div>
                        <div>
                            <div>
                                <span className="font-semibold text-sm">Phone</span>
                            </div>
                            <div className="mt-2">
                                <InputComponent
                                    // placeholder="Enter owner name"
                                    // type="text"
                                    style={{
                                        width: "13vw",
                                        height: "4vh",
                                        border: "1px solid gray",
                                        borderRadius: "0.50rem",
                                        fontSize: "0.80vw",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>




                <div>
                    <div className="bg-[F2F2F2] rounded-md border-[1px] p-1 border-gray-300 w-[40vw] mt-10">
                        <DataTable
                            value={boatData}
                            header={"Mooring details"}
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
                                header=""
                                field="id"
                                style={{ width: "4vw" }}
                            ></Column>
                            <Column
                                style={{ width: "4vw" }}
                                field="customerName"
                                header=""
                            ></Column>
                            <Column
                                style={{ width: "10vw" }}
                                field="email"
                                header=""
                            ></Column>
                            <Column
                                style={{ width: "8vw" }}
                                field="phone"
                                header=""
                            ></Column>
                            <Column
                                style={{ width: "8vw" }}
                                field="address"
                                header=""
                            ></Column>
                            <Column
                                header=""
                                body={() => (
                                    <div className="flex gap-8">
                                        <span className="text-red-600 font-bold underline cursor-pointer">
                                            Delete
                                        </span>
                                    </div>
                                )}


                            ></Column>


                        </DataTable>


                        <ButtonComponent
                            onClick={() => {

                            }}
                            style={{
                                width: "100%",
                                height: "4vh",
                                backgroundColor: "black",
                                cursor: "pointer",
                                color: "#6B6B6B",
                                fontWeight: "bolder",
                                fontSize: "0.50rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center", 
                            }}
                            label=""
                        >
                            <img
                                src="/assets/images/plus.png"
                                alt="icon"
                                className="w-3 mr-1" 
                                style={{
                                    filter: "invert(100%)",
                                    color: "#6B6B6B",
                                    fontWeight: "bolder",
                                }}
                            />
                            ADD NEW
                        </ButtonComponent>




                    </div>

                </div>








                <div className="flex gap-3 mt-4 ml-6">
                    <ButtonComponent
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        label={"Save"}
                        style={{
                            width: "5vw",
                            backgroundColor: "black",
                            cursor: "pointer",
                            fontWeight: "bolder",
                            fontSize: "1vw",
                            border: "1px solid  gray",
                            color: "white",
                            borderRadius: "0.50rem",
                        }}
                    />
                    <ButtonComponent
                        onClick={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        label={"Back"}
                        text={true}
                        style={{ backgroundColor: "white", color: "black", border: "none" }}
                    />
                </div>
            </div>
        </>
    );
};

export default AddBoatyards;
