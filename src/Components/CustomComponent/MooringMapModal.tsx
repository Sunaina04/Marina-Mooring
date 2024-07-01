import React, { useState } from 'react'
import { TimeLineProps } from '../../Type/Components/MapTypes'
import { Dialog } from 'primereact/dialog'
import { FaEdit } from 'react-icons/fa'
import CustomModal from './CustomModal'
import AddCustomer from '../Moormanage/Customer/AddCustomer'
import AddMoorings from '../Moormanage/Moorings/AddMoorings'

const MooringMapModal: React.FC<TimeLineProps> = ({
  gpsValue,
  mooringId,
  viewEditClick,
  mooringData,
}) => {
  const [customerModalVisible, setCustomerModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const viewEdit = () => {
    setEditMode(true)
    setCustomerModalVisible(true)
  }

  const handleModalClose = () => {
    setEditMode(false)
    setCustomerModalVisible(false)
  }

  return (
    <>
      <div
        // style={{border:"1px solid red"}}
        className="rounded-sm flex gap-20 ">
        <div>
          <div>
            <p
              // style={{ border: "1px solid red" }}
              className="text-sm m-0 font-bold text-white">
              B45
              <br />
              Suncatcher
            </p>
          </div>
          <div>
            <p className="text-xs text-white mt-2">
              GPS Cordinates:
              <br />
              {gpsValue}
            </p>
          </div>
        </div>
        <div
          // style={{border:"1px solid green"}}
          className=" ">
          <p
            // style={{border:"1px solid red"}}
            className=" text-black cursor-pointer mt-[5rem] p-1 border rounded-sm  bg-[#B1E0FF]"
            onClick={viewEdit}>
            View/edit
          </p>
          <p
            // style={{border:"1px solid red"}}

            className="text-xs   text-white">
            ID:{mooringId}
          </p>
        </div>

        {customerModalVisible && (
          <CustomModal
            button={true}
            children={
              <AddMoorings
                moorings={mooringData}
                mooringRowData={mooringData}
                editMode={editMode}
                closeModal={handleModalClose}
                getCustomer={() => {}}
              />
            }
            headerText={<h1 className="text-xxl font-bold text-black ">Add Mooring</h1>}
            visible={customerModalVisible}
            onHide={handleModalClose}
            dialogStyle={{
              width: '800px',
              minWidth: '800px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
              overflowY: 'auto',
            }}
          />
        )}
      </div>
    </>
  )
}

export default MooringMapModal
