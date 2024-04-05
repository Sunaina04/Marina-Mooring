import React, { useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import InputComponent from "../Common/InputComponent";
import ButtonComponent from "../Common/ButtonComponent";

interface City {
  name: string;
  code: string;
}
const AddPermission = () => {
  const [value, setValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <>
      <div className="w-full h-full  ">
        <h1 className="ml-5 text-lg font-bold">Add Permission</h1>

        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Customer Name</span>
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
            <span className="font-semibold text-sm">Customer ID</span>
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
            <span className="font-semibold text-sm">Phone</span>
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

        <div className="flex gap-8 ">
          <div>
            <div className="ml-5 ">
              <div className="mt-3">
                <span className="font-semibold text-sm ">Email Address</span>
              </div>

              <div className="mt-3">
                <InputText
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

          <div>
            <div className="">
              <div className="mt-3 ml-4">
                <span className="font-semibold text-sm">Role</span>
              </div>

              <div className="m-3">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) =>
                    setSelectedCity(e.value)
                  }
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="State"
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-4 ml-5">
            <h1 className="text-sm font-bold">Address</h1>
          </div>

          <div className="flex justify-around ml-3 mt-4 ">
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Street/house"
                  // type="text"
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Sector/Block"
                  type="text"
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                />
              </div>
            </div>

            <div className="card flex justify-content-center mt-2 ">
              <Dropdown
                value={selectedCity}
                onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="State"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
          </div>

          <div className="flex mt-5 gap-5 ml-6">
            <div className="card flex justify-content-center">
              <Dropdown
                value={selectedCity}
                onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="Country"
                className=""
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>
            <InputText
              placeholder="Pincode"
              style={{
                width: "14vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
              }}
            />
          </div>
        </div>

        <div className="ml-6">
          <div className="mt-4">
            <span className="text-sm font-bold">Note</span>
          </div>

          <div className="mt-4">
            <div className="card flex justify-content-center">
              <InputTextarea
                className="w-full h-14"
                autoResize
                value={value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setValue(e.target.value)
                }
                rows={5}
                cols={30}
              />
            </div>
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

export default AddPermission;
