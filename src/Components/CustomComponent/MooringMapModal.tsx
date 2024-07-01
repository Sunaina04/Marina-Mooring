import React, { useState } from 'react'
import { TimeLineProps } from '../../Type/Components/MapTypes'
import { Dialog } from 'primereact/dialog'
import { FaEdit } from 'react-icons/fa'
import CustomModal from './CustomModal'
import AddCustomer from '../Moormanage/Customer/AddCustomer'

const MooringMapModal: React.FC<TimeLineProps> = ({ gpsValue, mooringId, viewEditClick }) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [customerModalVisible, setCustomerModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const viewEdit = () => {
    setDialogVisible(true)
  }

  const handleMooringEdit = () => {
    setEditMode(true)
    setCustomerModalVisible(true)
  }
  const handleModalClose = () => {
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

        {/* Dialog BOX */}
        <Dialog
          position="center"
          style={{
            width: '740px',
            minWidth: '300px',
            height: '503px',
            minHeight: '200px',
            borderRadius: '1rem',
            fontWeight: '400',
            maxHeight: '50% !important',
          }}
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          header={
            <div className="flex gap-4">
              <div className="font-bolder text-[black]">Mooring Information</div>
              <div className="font-bold mt-1">
                <FaEdit onClick={handleMooringEdit} color="#0098FF" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          }>
          <hr className="border border-[#000000] my-0 mx-0"></hr>

          <div
            style={{
              fontSize: '14px',
              fontWeight: '300',
              color: '#000000',
            }}
            className="flex leading-[3.50rem] gap-32 p-4">
            <div>
              <p>{/* <span>ID: </span> {mooringRowData?.id} */}</p>
              <p>
                <span>Mooring Number: </span>
                {/* {mooringRowData?.mooringNumber} */}
              </p>
              <p>
                <span>Boat Name: </span>
                {/* {mooringRowData?.boatName} */}
              </p>
              <p>{/* <span>Type: </span> {mooringRowData?.boatType?.boatType} */}</p>
              <p>
                <span>Size of Weight: </span>
                {/* {mooringRowData?.sizeOfWeight} */}
              </p>
              <p>
                <span>Top Chain Condition: </span>
                {/* {mooringRowData?.topChainCondition?.condition} */}
              </p>
              <p className="tracking-tighter">
                <span>Bottom Chain Condition: </span>
                {/* {mooringRowData?.bottomChainCondition?.condition} */}
              </p>
              <p>
                <span>Pendant Condition: </span>
                {/* {mooringRowData?.pendantCondition} */}
              </p>
            </div>
            <div>
              <p>{/* <span>Harbor Area: </span> {mooringRowData?.harborOrArea} */}</p>
              <p>
                <span>G.P.S Coordinates: </span>
                {/* {mooringRowData?.gpsCoordinates} */}
              </p>
              <p>
                <span>Boat Size: </span>
                {/* {mooringRowData?.boatSize} */}
              </p>
              <p>{/* <span>Weight: </span> {mooringRowData?.boatWeight}/ */}</p>
              <p>
                <span>Type of Weight: </span>
                {/* {mooringRowData?.typeOfWeight?.type} */}
              </p>
              <p>
                <span>Condition of Eye: </span>
                {/* {mooringRowData?.eyeCondition?.condition} */}
              </p>
              <p>
                <span>Shackle, Swivel Condition: </span>
                {/* {mooringRowData?.shackleSwivelCondition?.condition} */}
              </p>
              <p>
                <span>Depth at Mean High Water: </span>
                {/* {mooringRowData?.depthAtMeanHighWater} */}
              </p>
            </div>
          </div>
        </Dialog>

        {customerModalVisible && (
          <CustomModal
            button={true}
            children={
              <AddCustomer
                customer={undefined}
                mooringRowData={undefined}
                editMode={editMode}
                editCustomerMode={undefined}
                editMooringMode={false}
                closeModal={handleModalClose}
                getCustomer={function (): void {
                  throw new Error('Function not implemented.')
                }} // getCustomer={getMooringsData}
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
