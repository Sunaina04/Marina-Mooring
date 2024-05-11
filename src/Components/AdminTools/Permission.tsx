import { useEffect, useState } from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import CustomModal from '../CustomComponent/CustomModal'
import { PermissionData } from '../../Type/ComponentBasedType'
import AddCustomer from './AddNewCustomer'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)

  const [permissionData, setPermissionData] = useState<PermissionData[]>([
    {
      id: '01',
      email: 'Demo@gmail.com',
      name: 'John Smith',
      phone: '12375859',
      role: 'Vendor',
    },
    {
      id: '01',
      email: 'Demo@gmail.com',
      name: 'John Smith',
      phone: '12375859',
      role: 'Customer',
    },
    {
      id: '01',
      email: 'Demo@gmail.com',
      name: 'John Smith',
      phone: '12375859',
      role: 'Technician',
    },
    {
      id: '01',
      email: 'Demo@gmail.com',
      name: 'John Smith',
      phone: '12375859',
      role: 'Admin',
    },
  ])

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex justify-between items-center ml-12">
        <div className="mt-14 ml-64">
          <select
            onChange={() => {}}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '7vw',
              height: '5vh',
              backgroundColor: 'white',
              cursor: 'pointer',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '0.80vw',
              justifyContent: 'space-between',
              appearance: 'none',
              paddingLeft: '0.5rem',
            }}
            defaultValue="">
            <option value="" disabled>
              Select Role
            </option>
          </select>
        </div>

        <div className="flex  items-center mr-[23rem] mt-14">
          <div className="">
            <CustomModal
              label={'ADD NEW'}
              style={{
                width: '8vw',
                height: '7vh',
                backgroundColor: 'black',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
              }}
              onClick={handleButtonClick}
              visible={modalVisible}
              onHide={handleModalClose}
              header={<h1 className="text-xl font-bold text-black ml-4">New User</h1>}>
              <AddCustomer
                customerData={selectedCustomer}
                editMode={editMode}
                closeModal={function (): void {
                  throw new Error('Function not implemented.')
                }}
                getCustomer={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </CustomModal>
          </div>
        </div>
      </div>
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[54vw] ml-20 mt-10">
        <DataTableComponent
          tableStyle={{
            minWidth: '20rem',
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
            backgroundColor: '#D1D1D1',
          }}
          scrollable={true}
          columns={[]}
        />
      </div>
    </>
  )
}

export default Permission
