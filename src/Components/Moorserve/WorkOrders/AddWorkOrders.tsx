import React, { useState, useEffect } from "react";
import ButtonComponent from "../../Common/ButtonComponent";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { WorkOrder_PAYLOAD } from "../../../Services/MoorServe/types";

interface Props {
  workOrderData: WorkOrder_PAYLOAD;
  editMode: boolean;
}
const AddWorkOrders: React.FC<Props> = ({ workOrderData, editMode }) => {
  const [value, setValue] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [mooringId, setMooringId] = useState<string>("");
  const [boatyards, setBoatyards] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Check if workOrderData exists and is not empty to determine edit mode
    if (workOrderData && Object.keys(workOrderData).length !== 0) {
      // Prefill fields if in edit mode
      setCustomerName(workOrderData.customerName);
      setCustomerId(workOrderData.customerId);
      setMooringId(workOrderData.mooringNumber);
      setBoatyards(workOrderData.boatYard);
      setAssignedTo(workOrderData.assignedTo);
      setDueDate(workOrderData.dueDate);
      setScheduleDate(workOrderData.scheduleDate);
      setStatus(workOrderData.status);
      setValue(workOrderData.reportProblem);
    } else {
      // Clear fields if not in edit mode
      setCustomerName("");
      setCustomerId("");
      setMooringId("");
      setBoatyards("");
      setAssignedTo("");
      setDueDate("");
      setScheduleDate("");
      setStatus("");
      setValue("");
    }
  }, [workOrderData]);

  return (
    <div>
      <div className="w-full h-full">
        <h1 className="ml-5 text-lg font-bold">Work Order</h1>
        {/* Customer Name */}
        <div className="flex justify-around mt-3">
          <div>
            <span className="font-semibold text-sm">Customer Name</span>
            <div className="mt-2">
              <InputText
                value={customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerName(e.target.value)
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

          {/* Customer ID */}
          <div>
            <span className="font-semibold text-sm">Customer ID</span>
            <div className="mt-2">
              <InputText
                value={customerId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerId(e.target.value)
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

          {/* Mooring ID */}
          <div>
            <span className="font-semibold text-sm">Mooring ID</span>
            <div className="mt-2">
              <Dropdown
                value={mooringId}
                onChange={(e) => setMooringId(e.value)}
                options={[]}
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
        // Existing code...
        {/* Boatyards */}
        <div>
          <span className="font-semibold text-sm">Boatyards</span>
          <div className="mt-2">
            <InputText
              value={boatyards}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBoatyards(e.target.value)
              }
              placeholder="Street/house"
              style={{
                width: "14vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
              }}
            />
          </div>
        </div>
        {/* Assigned to */}
        <div>
          <span className="font-semibold text-sm">Assigned to</span>
          <div className="mt-2">
            <Dropdown
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.value)}
              options={[]}
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
        {/* Due Date */}
        <div className="card  justify-content-center mt-2 ">
          <span className="font-semibold text-sm">Due Date</span>
          <div className="mt-2">
            <InputText
              value={dueDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDueDate(e.target.value)
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
        {/* Schedule Date */}
        <div>
          <span className="font-semibold text-sm">Schedule Date</span>
          <div className="mt-2">
            <InputText
              value={scheduleDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setScheduleDate(e.target.value)
              }
              placeholder="Street/house"
              style={{
                width: "14vw",
                height: "4vh",
                border: "1px solid gray",
                borderRadius: "0.50rem",
              }}
            />
          </div>
        </div>
        {/* Status */}
        <div>
          <span className="font-semibold text-sm">Status</span>
          <div className="mt-2">
            <Dropdown
              value={status}
              onChange={(e) => setStatus(e.value)}
              options={[]}
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
        {/* Time (in minutes) */}
        <div className="card  ">
          <span className="font-semibold text-sm">Time(in minutes)</span>
          <div
            className="mt-2"
            style={{
              width: "8vw",
              height: "4vh",
              border: "1px solid gray",
              borderRadius: "0.50rem",
            }}
          >
            <div className="flex justify-around text-center">
              <h1 className="mt-1 p-[0.1rem] bg-slate-400 rounded-md">
                <GrFormSubtract />
              </h1>
              <p>00:25</p>
              <h1 className="mt-1 p-[0.1rem] bg-slate-400 rounded-md">
                <IoIosAdd />
              </h1>
            </div>
          </div>
        </div>
        {/* Report Problem */}
        <div className="ml-6 mt-4">
          <span className="text-sm font-bold">Report Problem</span>
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
        {/* Save and Back buttons */}
        <div className="flex gap-3 mt-4 ml-6">
          <ButtonComponent
            onClick={() => {}}
            label={"Save"}
            style={{
              width: "5vw",
              backgroundColor: "black",
              cursor: "pointer",
              fontWeight: "bolder",
              fontSize: "1vw",
              border: "1px solid gray",
              color: "white",
              borderRadius: "0.50rem",
            }}
          />
          <ButtonComponent
            onClick={() => {}}
            label={"Back"}
            text={true}
            style={{ backgroundColor: "white", color: "black", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddWorkOrders;
