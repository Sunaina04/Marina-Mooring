import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import CustomModal from '../CustomComponent/CustomModal'
import { PermissionData } from '../../Type/ComponentBasedType'
import { Dropdown } from 'primereact/dropdown'
import { FaFilter } from 'react-icons/fa6'
import AddCustomer from './AddNewCustomer'

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [selectRole, setSelectRole] = useState()

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
      <div className="flex justify-between ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">MOORMANAGE/permission</h1>
        </div>
        <div className="flex mr-24">
          <div className="mt-14 mr-5 relative">
          <FaFilter className='absolute z-10 top-[0.8rem] left-2 text-gray-500' />
            <Dropdown
              value={selectRole}
              onChange={(e) => setSelectRole(e.value)}
              // options={cities}
              optionLabel="name"
              placeholder="Select Role"
              className="h-[7vh] w-[12vw] border-[1px] border-gray-400 !pl-[1.3rem] !font-sm"
            />
          </div>

          <div className="mt-14">
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
