import React, { useState } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import InputComponent from "../../Common/InputComponent";
interface City {
  name: string;
  code: string;
}
const AddEstimates = () => {
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
        <h1 className="ml-5 text-lg font-bold">Estimate Form</h1>

        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Name</span>
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
            <span className="font-semibold text-sm">ID</span>
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
            <span className="font-semibold text-sm">Email Address</span>
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

        <div className="mt-3  ">
          <div className="flex justify-around mt-3">
            <div>
              <span className="font-semibold text-sm">Boat Name</span>
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
              <span className="font-semibold text-sm">Measurments</span>
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
              <span className="font-semibold text-sm">Phone no</span>
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

        <div className="">
          <div className="flex justify-around ml-1 mt-3">
            <div>
              <span className="font-semibold text-sm">Boat Type</span>
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

            <div className="ml-1">
              <div>
                <span className="font-semibold text-sm">Boat Condition</span>
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
            </div>

            <div>
              <span className="font-semibold text-sm">Weight</span>
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

        {/* <div className="">
          <div className="">
            <div className="flex gap-4 mt-3 ml-4">
              <div>
                <div>
                  <span className="font-semibold text-sm">
                    Condition of Eye
                  </span>
                </div>

                <div>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedCity(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    editable
                    placeholder="Select"
                    style={{
                      width: "13vw",
                      height: "4vh",
                      border: "1px solid gray",
                      borderRadius: "0.50rem",
                    }}
                  />
                </div>
                <div></div>
              </div>

              <div className="ml-4">
                <div>
                  <span className="font-semibold text-sm">
                    Bootom Chain Condition
                  </span>
                </div>

                <div>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedCity(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    editable
                    placeholder="Select"
                    style={{
                      width: "14vw",
                      height: "4vh",
                      border: "1px solid gray",
                      borderRadius: "0.50rem",
                    }}
                  />
                </div>
                <div></div>
              </div>

              <div className="ml-2">
                <div>
                  <span className="font-semibold text-sm">
                    Top Chain Condition
                  </span>
                </div>

                <div>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedCity(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    editable
                    placeholder="Select"
                    style={{
                      width: "13.50vw",
                      height: "4vh",
                      border: "1px solid gray",
                      borderRadius: "0.50rem",
                    }}
                  />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="">
          <div className="">
            <div className="flex justify-around mt-3">
              <div className="">
                <div>
                  <span className="font-semibold text-sm">
                    Shackle,Swivel Condition
                  </span>
                </div>

                <div>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedCity(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    editable
                    placeholder="Select"
                    style={{
                      width: "13vw",
                      height: "4vh",
                      border: "1px solid gray",
                      borderRadius: "0.50rem",
                    }}
                  />
                </div>
              </div>

              <div className="mr-28">
                <div>
                  <span className="font-semibold text-sm">
                    Pennant Condition
                  </span>
                </div>

                <div>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedCity(e.value)
                    }
                    options={cities}
                    optionLabel="name"
                    editable
                    placeholder="Select"
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
                <div>
                  <span className="font-semibold text-sm">Pin on Map</span>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="ml-6">
          <div className="mt-3">
            <span className="text-sm font-bold">Note</span>
          </div>

          <div className="mt-3">
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

export default AddEstimates;
