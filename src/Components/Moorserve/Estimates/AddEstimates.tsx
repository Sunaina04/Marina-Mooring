import React, { useState } from 'react'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import InputComponent from '../../CommonComponent/InputComponent'
import { IoIosAdd } from 'react-icons/io'
import { GrFormSubtract } from 'react-icons/gr'
import { Button } from 'primereact/button'

const AddEstimates = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [mooringId, setMooringId] = useState<string>('')
  const [boatyards, setBoatyards] = useState<string>('')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [scheduleDate, setScheduleDate] = useState<string>('')
  const [workOrderStatus, setWorkOrderStatus] = useState<string>('')

  return (
    <div>
      <div>
        <div className="w-full h-full ml-4">
          {/* Customer Name */}
          <div className="flex gap-6">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Customer Name
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>

            {/* Customer ID */}
            {/* <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Customer ID
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={customerId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomerId(e.target.value)
                  }
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div> */}

            {/* Mooring ID */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Mooring ID
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={mooringId}
                  onChange={(e) => setMooringId(e.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Boatyards */}
          <div className="flex gap-6 mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Boatyard
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={boatyards}
                  onChange={(e) => setBoatyards(e.target.value)}
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>

            {/* Assigned to */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Assigned to
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.value)}
                  options={[]}
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>

            {/* Due Date */}
            <div className="">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Due Date
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                  type="text"
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Schedule Date */}
          <div className="flex gap-6 mt-3">
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Schedule Date
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <InputComponent
                  value={scheduleDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setScheduleDate(e.target.value)
                  }
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Status
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div className="mt-1">
                <Dropdown
                  value={workOrderStatus}
                  onChange={(e) => setWorkOrderStatus(e.value)}
                  options={[]}
                  optionLabel="name"
                  editable
                  style={{
                    width: '230px',
                    height: '32px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    fontSize: '0.8rem',
                  }}
                />
              </div>
            </div>

            {/* Time (in minutes) */}
            <div className="card  ">
              <span className="font-medium text-sm text-[#000000]">
                <div className="flex gap-1">
                  Time(in minutes)
                  <p className="text-red-600">*</p>
                </div>
              </span>
              <div
                className="mt-1"
                style={{
                  width: '8vw',
                  height: '32px',
                  border: '1px solid #D5E1EA',
                  borderRadius: '0.50rem',
                }}>
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
          </div>

          {/* Report Problem */}
          <div className=" mt-4 mb-20">
            <span className="font-medium text-sm text-[#000000]">
              <div className="flex gap-1">
                Report Problem
                <p className="text-red-600">*</p>
              </div>
            </span>
            <div className="mt-1">
              <div className="">
                <InputComponent
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    width: '740px',
                    height: '66px',
                    border: '1px solid #D5E1EA',
                    borderRadius: '0.50rem',
                    boxShadow: 'none',
                    paddingLeft: '0.5rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Save and Back buttons */}
          <div
            className="flex gap-6 bottom-2 absolute left-7 "
            style={{
              width: '100%',
              height: '80px',
              backgroundColor: 'white',
              padding: '0 12px',
              bottom: '0px',
            }}>
            <Button
              //  onClick={editMode ? updateWorkOrder : SaveWorkOrder}
              label={'Save'}
              style={{
                width: '89px',
                height: '42px',
                backgroundColor: '#0098FF',
                cursor: 'pointer',
                fontWeight: 'bolder',
                fontSize: '1rem',
                boxShadow: 'none',
                color: 'white',
                borderRadius: '0.50rem',
                marginTop: '10px',
              }}
            />
            <Button
              onClick={() => setModalVisible(false)}
              label={'Back'}
              text={true}
              style={{
                backgroundColor: 'white',
                color: '#000000',
                border: 'none',
                width: '89px',
                height: '42px',
                marginTop: '10px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEstimates
