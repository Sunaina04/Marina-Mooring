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
import { boatData } from '../../Utils/CustomData'
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
    setModalVisible(true)
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
        style: { width: '6vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'companyName',
        label: 'Company Name',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'phoneNumber',
        label: 'Phone Number',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'emailAddress',
        label: 'Email Address',
        style: { width: '12vw', backgroundColor: '#F2F2F2' },
      },
      {
        id: 'inventoryItems',
        label: 'Inventory Items',
        style: { width: '10vw', backgroundColor: '#F2F2F2' },
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
        },
        {
          color: 'green',
          label: 'Edit',
          onClick: handleEdit,
        },
        {
          color: 'red',
          label: 'Delete',
        },
      ],
      headerStyle: { backgroundColor: '#F2F2F2' },
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

          {/* <CustomModal
            header={<h1 className="text-lg font-bold text-black mt-4">Add Compony</h1>}
            onClick={handleButtonClick}
            visible={modalVisible || editMode}
            onHide={handleModalClose}
            style={{
              width: '121px',
              height: '44px',
              minHeight: '44px',
              backgroundColor: '#0098FF',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '0.50rem',
            }}>
            <AddVendor
              vendors={selectedCustomer}
              editMode={editMode}
              closeModal={handleModalClose}
              getVendor={getVendorData}
            />
          </CustomModal> */}
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
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw] p-1 ml-32 mt-14 mb-80">
        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={boatData}
          columns={tableColumns}
          header={undefined}
          actionButtons={ActionButtonColumn}
          style={{ backgroundColor: '#F2F2F2' }}
        />
      </div>
    </>
  )
}

export default Vendors
