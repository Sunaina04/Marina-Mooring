import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import CustomModal from '../CustomComponent/CustomModal'
import AddPermission from './AddPermission'
import { PermissionData } from '../../Type/ComponentBasedType'
import DataTableSearchFieldComponent from '../CommonComponent/DataTableSearchFieldComponent'
import { IoSearch } from 'react-icons/io5'
import { InputText } from 'primereact/inputtext'
import { boatData } from '../Utils/CustomData'
interface TableColumn {
  id: string
  label: string
  style: React.CSSProperties
}

type TableColumns = TableColumn[]

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
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


  const CustomersHeader = () => {
    return (
      <div className="flex items-center">
        <div className="p-input-icon-left ">
          <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
          <InputText
            placeholder="Search by name, ID,phone no..."
            className="h-[5vh] w-[55vh] cursor-pointer text-[0.65rem]
               text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] rounded-md pl-8"

          />
        </div>
      </div>
    )
  }

  const TechniciansHeader = () => {
    return (
      <div className="flex items-center">
        <div className="p-input-icon-left ">
          <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
          <InputText
            placeholder="Search by name, ID,Email,Role,phone no..."
            className="h-[5vh] w-[55vh] cursor-pointer text-[0.65rem]
               text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] rounded-md pl-8"

          />
        </div>
      </div>
    )
  }


  const ActionHeader = () => {
    return (
      <div className="flex items-center">
        <div>Action</div>
      </div>
    )
  }
  const tableColumns: TableColumns = useMemo<TableColumns>(
    () => [
      {
        id: 'id',
        label: 'ID:',
        style: { width: '4vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'name',
        label: 'Name:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
     
      {
        id: 'phone',
        label: 'Phone:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
    ],
    [],
  )

  const tableColumnsTechnicians: TableColumns = useMemo<TableColumns>(
    () => [
      {
        id: 'id',
        label: 'ID:',
        style: { width: '4vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'name',
        label: 'Name:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
     
      {
        id: 'email',
        label: 'Email:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },
     
      {
        id: 'phone',
        label: 'Phone:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },


      {
        id: 'role',
        label: 'Role:',
        style: { width: '6vw', borderBottom: '1px solid #C0C0C0', backgroundColor: '#F2F2F2' },
      },


    ],
    [],
  )






  return (
    <>
      <div className="flex justify-between items-center ml-12">
        <div>
          <h1 className="mt-14 ml-8 opacity-30 text-2xl font-normal">Moormanage/Permission</h1>
        </div>

        <div className="mt-14 ml-64">
          <Button
            label={''}
            onClick={() => { }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '7vw',
              height: '5vh',
              backgroundColor: 'black',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.80vw',
              justifyContent: 'space-between',
            }}>
            <img
              src="/assets/images/more.png"
              alt="icon"
              className="p-icon w-4"
              style={{
                filter: 'invert(100%)',
                color: 'whitesmoke',
                fontWeight: 'bolder',
              }}
            />
            <span className="mr-4">Filter</span>
          </Button>
        </div>

        <div className="flex  items-center mr-[23rem] mt-14">
          <div className="">
            <CustomModal
              label={'ADD NEW'}
              style={{
                width: '50vw',
                height: '80vh',
                backgroundColor: 'black',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
              }}
              onClick={handleButtonClick}
              visible={modalVisible}
              onHide={handleModalClose}
              header="">
              <AddPermission />
            </CustomModal>
          </div>
        </div>
      </div>

      <div className='flex gap-10 ml-8'>

        <div className="bg-[F2F2F2]  rounded-md border-[1px]  border-gray-300 w-[28vw] h-[70vh]">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">Customers-admins</h1>
          </div>

          <DataTableSearchFieldComponent
            data={boatData}
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
              backgroundColor: '#D9D9D9',
            }}
            scrollable={false}
            columns={tableColumns}
            header={CustomersHeader}
          />
        </div>


        <div className="bg-[F2F2F2]  rounded-md border-[1px]  border-gray-300 w-[28vw] h-[70vh]">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">Customer-adminUsers</h1>
          </div>

          <DataTableSearchFieldComponent
            data={boatData}
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
              backgroundColor: '#D9D9D9',
            }}
            scrollable={false}
            columns={tableColumnsTechnicians}
            header={TechniciansHeader}
          />
        </div>



      </div>




    </>
  )
}

export default Permission
