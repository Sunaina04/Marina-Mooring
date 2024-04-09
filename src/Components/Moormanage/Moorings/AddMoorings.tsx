import React, { useEffect, useState } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import InputComponent from "../../Common/InputComponent";
import { useAddMooringsMutation } from "../../../Services/MoorManage/moormanage";
import { MOORING_PAYLOAD } from "../../../Services/MoorManage/types";

interface Props {
  moorings: MOORING_PAYLOAD;
  editMode: boolean;
}

interface City {
  name: string;
  code: string;
}

const AddMoorings: React.FC<Props> = ({ moorings, editMode }) => {
  const [value, setValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [saveMoorings] = useAddMooringsMutation();
 console.log("MOORINGS", moorings)
  const [formData, setFormData] = useState<any>({
    ownerName: "",
    mooringNumber: "",
    harbor: "",
    waterDepth: "",
    gpsCoordinates: "",
    boatName: "",
    boatSize: "",
    weight: "",
    sizeOfWeight: "",
    typeOfWeight: "",
    topChainCondition: "",
    conditionOfEye: "",
    bottomChainCondition: "",
    shackleSwivelCondition: "",
    pennantCondition: "",
    deptAtMeanHighWater: "",
    note: "",
  });

  useEffect(() => {
    if (editMode && moorings) {
      // Prefill fields with data from props when in edit mode
      setFormData({
        ownerName: moorings.ownerName || "",
        mooringNumber: moorings.mooringNumber || "",
        harbor: moorings.harbor || "",
        waterDepth: moorings.waterDepth || "",
        gpsCoordinates: moorings.gpsCoordinates || "",
        boatName: moorings.boatName || "",
        boatSize: moorings.boatSize || "",
        weight: moorings.weight || "",
        sizeOfWeight: moorings.sizeOfWeight || "",
        typeOfWeight: moorings.typeOfWeight || "",
        topChainCondition: moorings.topChainCondition || "",
        conditionOfEye: moorings.conditionOfEye || "",
        bottomChainCondition: moorings.bottomChainCondition || "",
        shackleSwivelCondition: moorings.shackleSwivelCondition || "",
        pennantCondition: moorings.pennantCondition || "",
        deptAtMeanHighWater: moorings.deptAtMeanHighWater || "",
        note: moorings.note || "",
      });
    }
  }, [editMode, moorings]);

  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const SaveMoorings = async () => {
    const payload = {
      ...formData,
    };
    const response = await saveMoorings(payload);
    console.log("RESPONSE", response);
  };

  return (
    <>
      <div className="w-full h-full  ">
        <h1 className="ml-5 text-lg font-bold">Add Mooring</h1>

        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Owner Name</span>
            <div className="mt-2">
              <InputComponent
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
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
            <span className="font-semibold text-sm">Mooring Number</span>
            <div className="mt-2">
              <InputComponent
                // placeholder="Enter customer ID"
                // type="text"
                value={formData.mooringNumber}
                onChange={(e) =>
                  handleInputChange("mooringNumber", e.target.value)
                }
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
            <span className="font-semibold text-sm">Harbor</span>
            <div className="mt-2">
              <InputComponent
                // placeholder="Enter owner name"
                // type="text"
                value={formData.harbor}
                onChange={(e) => handleInputChange("harbor", e.target.value)}
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
              <span className="font-semibold text-sm">Water Depth</span>
              <div className="mt-2">
                <InputComponent
                  value={formData.waterDepth}
                  onChange={(e) =>
                    handleInputChange("waterDepth", e.target.value)
                  }
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
              <span className="font-semibold text-sm">G.P.S Cordinates</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter customer ID"
                  // type="text"
                  value={formData.gpsCoordinates}
                  onChange={(e) =>
                    handleInputChange("gpsCoordinates", e.target.value)
                  }
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
              <span className="font-semibold text-sm">Boat Name</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter owner name"
                  // type="text"
                  value={formData.boatName}
                  onChange={(e) =>
                    handleInputChange("boatName", e.target.value)
                  }
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
              <span className="font-semibold text-sm">Boat Size</span>
              <div className="mt-2">
                <InputComponent
                  value={formData.boatSize}
                  onChange={(e) =>
                    handleInputChange("boatSize", e.target.value)
                  }
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
                <span className="font-semibold text-sm">Type</span>
              </div>

              <div className="mt-2">
                <Dropdown
                  value={formData.typeOfWeight}
                  onChange={(e) => handleInputChange("typeOfWeight", e.value)}
                  options={cities}
                  optionLabel="name"
                  editable
                  placeholder="Skiff"
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
              <span className="font-semibold text-sm">Weight</span>
              <div className="mt-2">
                <InputComponent
                  // placeholder="Enter owner name"
                  // type="text"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
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
          <div className="flex gap-4 mt-3 ml-4">
            <div>
              <div>
                <span className="font-semibold text-sm">Size of Weight</span>
              </div>

              <div>
                <Dropdown
                  value={formData.sizeOfWeight}
                  onChange={(e) => handleInputChange("sizeOfWeight", e.value)}
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

            <div className="ml-4">
              <div>
                <span className="font-semibold text-sm">Type of Weight</span>
              </div>

              <div>
                <Dropdown
                  value={formData.typeOfWeight}
                  onChange={(e) => handleInputChange("typeOfWeight", e.value)}
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

            <div className="ml-2">
              <div>
                <span className="font-semibold text-sm">
                  Top Chain Condition
                </span>
              </div>

              <div>
                <Dropdown
                  value={formData.topChainCondition}
                  onChange={(e) =>
                    handleInputChange("topChainCondition", e.value)
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
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex gap-4 mt-3 ml-4">
            <div>
              <div>
                <span className="font-semibold text-sm">Condition of Eye</span>
              </div>

              <div>
                <Dropdown
                  value={formData.conditionOfEye}
                  onChange={(e) => handleInputChange("conditionOfEye", e.value)}
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
                  value={formData.bottomChainCondition}
                  onChange={(e) =>
                    handleInputChange("bottomChainCondition", e.value)
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

            {/* <div className="ml-2">
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
              </div> */}
          </div>
        </div>

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

            <div className="mr-10">
              <div>
                <span className="font-semibold text-sm">Pennant Condition</span>
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

            <div></div>

            <div>
              <div>
                <span className="font-semibold text-sm">Pin on Map</span>
              </div>

              <div></div>
            </div>
          </div>
        </div>

        <div className="ml-4">
          <div className="mt-2 ml-1">
            <span className="font-semibold text-sm">
              Dept at Mean High Water
            </span>
          </div>

          <div className="mt-2 ml-1">
            <InputText
              value={formData.deptAtMeanHighWater}
              onChange={(e) =>
                handleInputChange("deptAtMeanHighWater", e.target.value)
              }
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
            onClick={SaveMoorings}
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

export default AddMoorings;
