import React, { useState } from "react";
import { Datepicker, Input } from "@mobiscroll/react";
import { Calendar } from "primereact/calendar";
import InputComponent from "../../Common/InputComponent";
import DatePickerComponent from "../../Common/DatePickerComponent";
import TextAreaComponent from "../../Common/TextAreaComponent";
import ButtonComponent from "../../Common/ButtonComponent";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./AddCustomer.css";

const AddCustomer = () => {
  const [date, setDate] = useState(null);

  const [start, startRef] = React.useState(null);
  const [end, endRef] = React.useState(null);

  return (
    <div className="w-full h-full  ">
      <h1 className="ml-6 text-lg font-bold">Add Customer</h1>

      <div className="flex justify-around mt-5">
        <div>
          <span className="font-semibold text-sm">Mooring Name</span>
          <div className="mt-2">
            <InputComponent
              style={{
                width: "13vw",
                height: "5vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.80vw",
              }}
            />
          </div>
        </div>

        <div>
          <span className="font-semibold text-sm">Customer ID</span>
          <div className="mt-2">
            <InputComponent
              // placeholder="Enter customer ID"
              // type="text"
              style={{
                width: "13vw",
                height: "5vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.80vw",
              }}
            />
          </div>
        </div>

        <div>
          <span className="font-semibold text-sm">Owner Name</span>
          <div className="mt-2">
            <InputComponent
              // placeholder="Enter owner name"
              // type="text"
              style={{
                width: "13vw",
                height: "5vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.80vw",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 ml-7 ">
        <div className="ml-1">
          <h1 className="text-sm font-semibold">Select Date</h1>
        </div>

        <div className="flex gap-16 mt-2">
          <Datepicker select="range" startInput={start} endInput={end} />
          {/* <Input
            ref={startRef}
            // label="Start"
            placeholder="Please Select..."
          ></Input>
          <Input
            ref={endRef}
            // label="End"
            placeholder="Please Select..."
          ></Input> */}

          <Calendar
            id="from"
            value={date}
            onChange={(e: any) => setDate(e.value)}
            showIcon
          />

          <DatePickerComponent
            onChange={function (newValue: Date): void {
              throw new Error("Function not implemented.");
            }}
            showIcon={true}
            // style={{ width: "13vw", height: "5vh", borderRadius: "0.50rem", border: "1px solid gray" }}
          />
        </div>
      </div>

      <div className="">
        <div className="mt-2 ml-7">
          <h1 className="text-sm font-bold">About Mooring</h1>
        </div>

        <div className="flex justify-around ml-7 mt-8 ">
          <div>
            <span className="font-semibold text-sm">Boat Type</span>
            <div className="mt-2">
              <InputComponent
                // placeholder=""
                // type="text"
                style={{
                  width: "9vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Boat Length(m)</span>
            <div className="mt-2">
              <InputComponent
                placeholder=""
                type="number"
                style={{
                  width: "9vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Boat Width(m)</span>
            <div className="mt-2">
              <InputComponent
                placeholder=""
                type="number"
                style={{
                  width: "9vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Draft(m)</span>
            <div className="mt-2">
              <InputComponent
                placeholder=""
                type="number"
                style={{
                  width: "9vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>

          <div>
            <span className="font-semibold text-sm">Boat Weight(Kg)</span>
            <div className="mt-2">
              <InputComponent
                placeholder=""
                type="number"
                style={{
                  width: "9vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-8">
        <div className="mt-4">
          <span className="text-sm font-bold">Address</span>
        </div>

        <div className="mt-4">
          <TextAreaComponent
            onChange={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            style={{ width: "100%", borderRadius: "0.50rem" }}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4 ml-8">
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
  );
};

export default AddCustomer;
