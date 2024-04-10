import React, { useState } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import InputComponent from "../../Common/InputComponent";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
interface City {
  name: string;
  code: string;
}
const AddVendor = () => {
  const [value, setValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <>
      <div className="main">
        <h1 className=" text-lg font-bold">Add Company</h1>

        <div className="flex">
          <div className="flex mt-3 gap-8">
            <div>
              <div>
                <span className="font-semibold text-sm">Company Name</span>
                <div className="mt-2">
                  <InputComponent
                    style={{
                      width: "14vw",
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
              <span className="font-semibold text-sm">Phone</span>
              <div className="mt-2">
                <InputComponent
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.80vw",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="">
                <span className="font-semibold text-sm">Website</span>
              </div>

              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter customer ID"
                  // type="text"
                  style={{
                    width: "14vw",
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

        <div className="">
          <div className="mt-3 ml-1 flex justify-between">
            <div>
              <h1 className="text-sm font-bold">Address</h1>
            </div>
            <div className="">
              <h1 className="text-sm font-bold">Remit Address</h1>
            </div>
          </div>

          <div className="flex  justify-between mt-2  ">
            <div>
              <div className="mt-2 ">
                <InputText
                  placeholder="Street/Building"
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
                  placeholder="Apt/Suite"
                  type="text"
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                  className="mr-4"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Street/Building"
                  type="text"
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                  className="mr-4"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Apt/Suite"
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
          </div>

          <div className="flex mt-5 justify-between">
            <div className="">
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
            <div>
              <div className="ml-2">
                <Dropdown
                  value={selectedCity}
                  onChange={(e: DropdownChangeEvent) =>
                    setSelectedCity(e.value)
                  }
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="State"
                  className=""
                  style={{
                    width: "14vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                  }}
                />
              </div>
            </div>

            <div className="mr-6">
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

            <div className="">
              <Dropdown
                value={selectedCity}
                onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                editable
                placeholder="State"
                className=""
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

        <div className="flex  gap-4 mt-2 justify-between ">
          <div>
            <div className="mt-2 ">
              <InputText
                placeholder="Zip Code"
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
                placeholder="Email Address"
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
                className="mr-4"
              />
            </div>
          </div>

          <div>
            <div className="mt-2 ">
              <InputText
                placeholder="Zip Code"
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
                className="mr-4"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <InputText
                placeholder="Email Address"
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
                className="mr-4"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mt-2">
            <div className="ml-1">
              <span>Account Number</span>
            </div>

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

        <div className="">
          <div className="mt-4 ">
            <h1 className="text-sm font-bold">Sales Representative</h1>
          </div>

          <div className="flex   mt-2 gap-8 ">
            <div className="mt-2">
              <div>
                <span>First Name</span>
              </div>
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>

            <div>
              <div className="mt-2">
                <div>
                  <span>Last Name</span>
                </div>
                <InputText
                  placeholder=""
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
              <div className="">
                <div>
                  <span>Phone</span>
                </div>
                <InputText
                  placeholder=""
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
          </div>

          <div className="flex mt-5 gap-4">
            <div className="mt-2">
              <div>
                <span>Email</span>
              </div>
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                }}
              />
            </div>

            <div></div>

            <div className="mt-1">
              <div>
                <span>Note</span>
              </div>
              <InputTextarea
                className="w-[30vw] h-[1vh] rounded-lg  border-[1px] border-gray-500"
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

        <div className="card flex justify-content-center gap-3">
          <Checkbox
            onChange={(e) => setChecked(e.checked ?? false)}
            checked={checked}
          ></Checkbox>

          <div>
            <p>Primary Sales Representative</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4 ">
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

export default AddVendor;
