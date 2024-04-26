import React, { useState, useEffect } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import InputComponent from "../../Common/InputComponent";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { VENDOR_PAYLOAD } from "../../../Services/MoorManage/types";
import { useAddVendorsMutation } from "../../../Services/MoorManage/moormanage";
import { Button } from "primereact/button";

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

const AddVendor: React.FC<Props> = ({
  vendors,
  editMode,
  closeModal,
  getVendor,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [streetBuilding, setStreetBuilding] = useState<string>("");
  const [aptSuite, setAptSuite] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [addressZipCode, setAddressZipCode] = useState<number | undefined>(
    undefined
  );
  const [remitStreetBuilding, setRemitStreetBuilding] = useState<string>("");
  const [remitAptSuite, setRemitAptSuite] = useState<string>("");
  const [remitZipCode, setRemitZipCode] = useState<number | undefined>(
    undefined
  );
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
      setSelectedCity({ name: vendors.country, code: "" });
      setAddressZipCode(vendors.zipCode || undefined);
      setEmailAddress(vendors.companyEmail || "");
      setAccountNumber(vendors.accountNumber || "");
      setFirstName(vendors.firstName || "");
      setLastName(vendors.lastName || "");
      setSalesRepPhone(vendors.salesRepPhoneNumber || "");
      setSalesRepEmail(vendors.salesRepEmail || "");
      setNote(vendors.salesRepNote || "");
    } else {
      setCompanyName("");
      setPhone("");
      setWebsite("");
      setStreetBuilding("");
      setAptSuite("");
      setSelectedCity(null);
      setAddressZipCode(undefined);
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

  const saveVendor = async () => {
    const payload = {
      companyName: companyName,
      companyPhoneNumber: phone,
      website: website,
      street: streetBuilding,
      aptSuite: aptSuite,
      country: selectedCity?.name || "",
      zipCode: addressZipCode,
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
  };

  return (
    <>
      <div className="main">
        <h1 className="text-lg font-bold">Add Company</h1>

        {/* Company Info */}
        <div className="flex">
          <div className="flex mt-3 gap-8">
            <div>
              <span className="font-semibold text-sm">Company Name</span>
              <div className="mt-2">
                <InputComponent
                  value={companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCompanyName(e.target.value)
                  }
                  style={{
                    width: "12vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.80vw",
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <span className="font-semibold text-sm">Phone</span>
              <div className="mt-2">
                <InputComponent
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  style={{
                    width: "12vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.80vw",
                  }}
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <span className="font-semibold text-sm">Website</span>
              <div className="mt-2">
                <InputComponent
                  value={website}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWebsite(e.target.value)
                  }
                  style={{
                    width: "10vw",
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

        {/* Address */}
        <div>
          <div className="mt-3 ml-1 flex">
            <div>
              <h1 className="text-sm font-bold">Address</h1>
            </div>
            <div className="ml-[16.50rem]">
              <h1 className="text-sm font-bold">Remit Address</h1>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Street/Building"
                  value={streetBuilding}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStreetBuilding(e.target.value)
                  }
                  style={{
                    width: "10vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>

            {/* Apt/Suite */}
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Apt/Suite"
                  value={aptSuite}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAptSuite(e.target.value)
                  }
                  style={{
                    width: "10vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>

            {/* Remit Street/Building */}
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Street/Building"
                  value={remitStreetBuilding}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRemitStreetBuilding(e.target.value)
                  }
                  style={{
                    width: "10vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>

            {/* Remit Apt/Suite */}
            <div>
              <div className="mt-2">
                <InputText
                  placeholder="Apt/Suite"
                  value={remitAptSuite}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRemitAptSuite(e.target.value)
                  }
                  style={{
                    width: "10vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-5 gap-2">
            {/* Country */}
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
                  width: "10vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.40rem",
                }}
              />
            </div>

            {/* State */}
            <div>
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
                  width: "10vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.70rem",
                }}
              />
            </div>

            {/* Remit Country */}
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
                  width: "10vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.70rem",
                }}
              />
            </div>

            {/* Remit State */}
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
                  width: "10vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.70rem",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-2 gap-2">
          {/* Address Zip Code */}
          <div className="mt-2 ">
            <InputText
              type="number"
              placeholder="Zip Code"
              value={
                addressZipCode !== undefined ? addressZipCode.toString() : ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputVal = e.target.value;
                // Convert the input value back to a number before setting the state
                const newValue =
                  inputVal !== "" ? parseInt(inputVal, 10) : undefined;
                setAddressZipCode(newValue);
              }}
              style={{
                width: "10vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.70rem",
              }}
            />
          </div>

          {/* Email Address */}
          <div className="mt-2 ">
            <InputText
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailAddress(e.target.value)
              }
              style={{
                width: "10vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.70rem",
              }}
            />
          </div>

          {/* Remit Zip Code */}
          <div className="mt-2 ">
            <InputText
              placeholder="Zip Code"
              value={remitZipCode !== undefined ? remitZipCode.toString() : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputVal = e.target.value;
                // Convert the input value to a number before setting the state
                const newValue =
                  inputVal !== "" ? parseInt(inputVal, 10) : undefined;
                setRemitZipCode(newValue);
              }}
              style={{
                width: "10vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.70rem",
              }}
            />
          </div>

          {/* Remit Email Address */}
          <div className="mt-2 ">
            <InputText
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmailAddress(e.target.value)
              }
              style={{
                width: "10vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
                fontSize: "0.70rem",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="mt-2">
          <div className="ml-1">
            <span>Account Number</span>
          </div>
          <div className="mt-1">
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
                fontSize: "0.70rem",
              }}
            />
          </div>
        </div>
      </div>

      <div className="">
        <div className="mt-4 ">
          <h1 className="text-sm font-bold">Sales Representative</h1>
        </div>

        <div className="flex   mt-2 gap-2 ">
          <div className="mt-2">
            <div>
              <span>First Name</span>
            </div>
            <div className="mt-1">
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: "12vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.70rem",
                }}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <div>
                <span>Last Name</span>
              </div>
              <div className="mt-1">
                <InputText
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                  placeholder=""
                  type="text"
                  style={{
                    width: "12vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card flex justify-content-center mt-2 ">
            <div className="">
              <div>
                <span>Phone</span>
              </div>
              <div className="mt-1">
                <InputText
                  value={salesRepEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSalesRepEmail(e.target.value)
                  }
                  placeholder=""
                  type="text"
                  style={{
                    width: "12vw",
                    height: "4vh",
                    border: "1px solid gray",
                    borderRadius: "0.50rem",
                    fontSize: "0.70rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-5 gap-4">
          <div className="mt-2">
            <div>
              <span>Email</span>
            </div>
            <div className="mt-1">
              <InputText
                placeholder=""
                type="text"
                style={{
                  width: "14vw",
                  height: "4vh",
                  border: "1px solid gray",
                  borderRadius: "0.50rem",
                  fontSize: "0.70rem",
                }}
              />
            </div>
          </div>

          <div></div>

          <div className="mt-1">
            <div className="">
              <span>Note</span>
            </div>
            <div className="mt-1">
              <InputTextarea
                className="w-[25vw] h-[1vh] rounded-lg  border-[1px] border-gray-500"
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
        {/* Save Button */}
        <Button
          onClick={saveVendor}
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
        {/* Back Button */}
        <Button
          onClick={closeModal}
          label={"Back"}
          text={true}
          style={{ backgroundColor: "white", color: "black", border: "none" }}
        />
      </div>
    </>
  );
};

export default AddVendor;
