import React, { useState, useEffect } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import InputComponent from "../../Common/InputComponent";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { VENDOR_PAYLOAD } from "../../../Services/MoorManage/types";
import { useAddVendorsMutation } from "../../../Services/MoorManage/moormanage";

interface City {
  name: string;
  code: string;
}

interface Props {
  vendors: VENDOR_PAYLOAD;
  editMode: boolean;
  closeModal: () => void;
  getVendor: () => void;
}

const AddVendor: React.FC<Props> = ({ vendors, editMode , closeModal , getVendor}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [streetBuilding, setStreetBuilding] = useState<string>("");
  const [aptSuite, setAptSuite] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [zipCode, setZipCode] = useState<number | undefined>(undefined);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [salesRepPhone, setSalesRepPhone] = useState<string>("");
  const [salesRepEmail, setSalesRepEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [addVendor] = useAddVendorsMutation();

  useEffect(() => {
    if (editMode) {
      setCompanyName(vendors.companyName || "");
      setPhone(vendors.companyPhoneNumber || "");
      setWebsite(vendors.website || "");
      setStreetBuilding(vendors.street || "");
      setAptSuite(vendors.aptSuite || "");
      setZipCode(vendors.zipCode || undefined);
      setEmailAddress(vendors.companyEmail || "");
      setAccountNumber(vendors.accountNumber || "");
      setFirstName(vendors.firstName || "");
      setLastName(vendors.lastName || "");
      setSalesRepPhone(vendors.salesRepPhoneNumber || "");
      setSalesRepEmail(vendors.salesRepEmail || "");
    } else {
      setCompanyName("");
      setPhone("");
      setWebsite("");
      setStreetBuilding("");
      setAptSuite("");
      setSelectedCity(null);
      setZipCode(undefined);
      setEmailAddress("");
      setAccountNumber("");
      setFirstName("");
      setLastName("");
      setSalesRepPhone("");
      setSalesRepEmail("");
      setNote("");
    }
  }, [editMode, vendors]);

  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const saveVendor =  async () => {
    const payload = {
      companyName: companyName,
      companyPhoneNumber: phone,
      website: website,
      street: streetBuilding,
      aptSuite: aptSuite,
      country: selectedCity?.name || "",
      zipCode: zipCode !== undefined ? zipCode.toString() : "",
      companyEmail: emailAddress,
      accountNumber: accountNumber,
      firstName: firstName,
      lastName: lastName,
      salesRepPhoneNumber: salesRepPhone,
      salesRepEmail: salesRepEmail,
      salesRepNote: note,
      primarySalesRep: true,
    };
    const response = await addVendor(payload);
    console.log("RESPONSE", response);
  }
  

  return (
    <>
      <div className="main">
        <h1 className="text-lg font-bold">Add Company</h1>

        <div className="flex">
          <div className="flex mt-3 gap-8">
            <div>
              <div>
                <span className="font-semibold text-sm">Company Name</span>
                <div className="mt-2">
                  <InputComponent
                    value={companyName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCompanyName(e.target.value)
                    }
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
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
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
                  value={website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWebsite(e.target.value)
                  }
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
                  value={streetBuilding}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStreetBuilding(e.target.value)
                  }
                  placeholder="Street/Building"
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
                  value={aptSuite}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAptSuite(e.target.value)
                  }
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
                  value={streetBuilding}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStreetBuilding(e.target.value)
                  }
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
                  value={aptSuite}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAptSuite(e.target.value)
                  }
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
                onChange={(e: DropdownChangeEvent) =>
                  setSelectedCity(e.value as City)
                }
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
                    setSelectedCity(e.value as City)
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
                onChange={(e: DropdownChangeEvent) =>
                  setSelectedCity(e.value as City)
                }
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
                onChange={(e: DropdownChangeEvent) =>
                  setSelectedCity(e.value as City)
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
        </div>

        <div className="flex  gap-4 mt-2 justify-between ">
          <div>
            <div className="mt-2 ">
              <InputText
                value={zipCode !== undefined ? zipCode.toString() : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setZipCode(parseInt(e.target.value, 10))
                }
                placeholder="Zip Code"
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
                value={emailAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailAddress(e.target.value)
                }
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
                value={zipCode !== undefined ? zipCode.toString() : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setZipCode(parseInt(e.target.value, 10))
                }
                placeholder="Zip Code"
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
                value={emailAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailAddress(e.target.value)
                }
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
              value={accountNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountNumber(e.target.value)
              }
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
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
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
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
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
                  value={salesRepPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSalesRepPhone(e.target.value)
                  }
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
                value={salesRepEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSalesRepEmail(e.target.value)
                }
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
                value={note}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNote(e.target.value)
                }
                rows={5}
                cols={30}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4 ">
          <ButtonComponent
            onClick={() => {
             saveVendor()
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
            onClick={() => {
              // Handle Back
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
