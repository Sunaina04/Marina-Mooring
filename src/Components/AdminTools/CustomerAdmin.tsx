import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import CustomModal from '../CustomComponent/CustomModal'
import { PermissionData } from '../../Type/ComponentBasedType'
import AddCustomer from './AddCustomer'

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
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">Moormanage/Permission</h1>
        </div>

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
              <AddCustomer customerData={selectedCustomer} editMode={editMode} />
            </CustomModal>
          </div>
        </div>
      </div>
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[54vw] ml-20 mt-10">
        <DataTable
          value={permissionData}
          header={''}
          tableStyle={{
            minWidth: '20rem',
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
            backgroundColor: '#D1D1D1',
          }}
          size="small"
          scrollable={true}>
          <Column header="ID" field="id" style={{ width: '6vw' }}></Column>
          <Column style={{ width: '10vw' }} field="name" header="Name"></Column>
          <Column style={{ width: '12vw' }} field="email" header="Email"></Column>
          <Column style={{ width: '11vw' }} field="phone" header="Phone"></Column>
          <Column style={{ width: '7vw' }} field="role" header="Role"></Column>
          <Column
            header="Actions"
            body={() => (
              <div className="flex gap-5">
                <span className="text-black  font-bold underline cursor-pointer">Edit</span>
                <span className="text-red-600 font-bold underline cursor-pointer">Delete</span>
              </div>
            )}></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Permission
