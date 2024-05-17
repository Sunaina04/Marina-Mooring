import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddVendor from './AddVendor'
import { InputText } from 'primereact/inputtext'
import {
  useDeleteVendorMutation,
  useGetVendorsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { VendorPayload, VendorResponse } from '../../../Type/ApiTypes'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { boatData, vendorDataa } from '../../Utils/CustomData'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'

const Vendors = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [vendorData, setVendorData] = useState<VendorPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)

  const [getVendors] = useGetVendorsMutation()
  const [deleteVendor] = useDeleteVendorMutation()

  const handleButtonClick = () => {
    // setModalVisible(true)
  }

  const getVendorData = async () => {
    try {
      const response = await getVendors({}).unwrap()
      const { status, content } = response as VendorResponse
      if (status === 200 && Array.isArray(content)) {
        setVendorData(content)
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error)
    }
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteVendor({ id: rowData?.id })
      getVendorData()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  useEffect(() => {
    getVendorData()
  }, [])

  const tableColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'companyName',
        label: 'Company Name',
        style: { width: '16vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'phoneNumber',
        label: 'Phone Number',
        style: { width: '15vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'email',
        label: 'Email Address',
        style: { width: '16vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
      {
        id: 'inventoryItems',
        label: 'Inventory Items',
        style: { width: '13vw', backgroundColor: '#00426F', color: '#FFFFFF' },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = useMemo(
    () => ({
      header: 'Action',
      buttons: [
        {
          color: 'black',
          label: 'View Inventory',
          underline: true,
        },
        {
          color: 'green',
          label: 'Edit',
          onClick: handleEdit,
          underline: true,
        },
        {
          color: 'red',
          label: 'Delete',
          underline: true,
        },
      ],
      headerStyle: {
        backgroundColor: '#00426F',
        color: '#FFFFFF',
        height: '3.50rem',
        borderTopRightRadius: '10px',
      },
      style: { borderBottom: '1px solid #D5E1EA' },
    }),
    [],
  )
  return (
    <>
      <Header header="MOORMANAGE/Vendor" />
      <div className="flex justify-end">
        <div className="flex gap-4 mr-12 mt-14">
          <div>
            <div className="p-input-icon-left">
              <IoSearchSharp className="ml-2 text-blue-900" />
              <InputText
                placeholder="Search"
                className="h-[44px] w-[237px] cursor-pointer pl-8 rounded-lg text-bold  "
              />
            </div>
          </div>

          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddVendor
                vendors={selectedCustomer}
                editMode={editMode}
                closeModal={handleModalClose}
                getVendor={getVendorData}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">New User</h1>}
            visible={modalVisible}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            buttonStyle={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '0.50rem',
              marginLeft: '8px',
            }}
            dialogStyle={{
              width: '800px',
              minWidth: '800px',
              height: '630px',
              minHeight: '630px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>
      {/* </div> */}

      <div
        style={{
          height: '657px',
          borderRadius: '10px',
          border: '1px solid #D5E1EA',
          opacity: '0px',
          backgroundColor: '#FFFFFF',
        }}
        className=" ml-[3rem] mr-[2.30rem] mt-8">
        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: '400',
          }}
          data={vendorDataa}
          columns={tableColumns}
          header={undefined}
          actionButtons={ActionButtonColumn}
          style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D5E1EA' }}
        />
      </div>
    </>
  )
}

export default Vendors
