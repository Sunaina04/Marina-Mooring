import { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import CustomModal from '../../CustomComponent/CustomModal'
import AddVendor from './AddVendor'
import { InputText } from 'primereact/inputtext'
import {
  useDeleteVendorMutation,
  useGetVendorsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { VendorPayload, VendorResponse } from '../../../Type/ApiTypes'
import { Button } from 'primereact/button'
import DataTableSearchFieldComponent from '../../CommonComponent/DataTableSearchFieldComponent'
import { boatData } from '../../Utils/CustomData'




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
    await getVendors({})
      .unwrap()
      .then(async (response) => {
        const { status, content } = response as VendorResponse
        if (status === 200 && Array.isArray(content)) {
          setVendorData(content)
        }
      })
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





  const tableColumns= useMemo(
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

  const ActionHeader = () => {
    return (
      <div className="flex items-center">
        <div>Action</div>
      </div>
    )
  }

  const actionButtons = [
    () => (
      <>
        <div className="flex gap-5">
          <Button
            label="View Inventory"
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            // onClick={handleViewInventory}
          />
          <Button
            label="Edit"
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              color: 'green',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit}
          />
          <Button
            label="Delete"
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              color: 'red',
              cursor: 'pointer',
            }}
            // onClick={() => handleDelete(rowData)}
          />
        </div>
      </>
    ),
  ]

  return (
    <>
      <div className="flex justify-between items-center ml-2">
        <div>
          <h1 className="mt-14 ml-[7.50rem] opacity-30 text-2xl font-normal">Moormanage/Vendor</h1>
        </div>

        <div className="flex gap-4 items-center  mr-[8rem] mt-14">
          <div>
            <div className="p-input-icon-left">
              <i className="pi pi-search text-[#D2D2D2]" />
              <InputText placeholder="Search" className="h-[5vh] cursor-pointer font-bold" />
            </div>
          </div>

          <CustomModal
           header={<h1 className="text-lg font-bold text-black mt-4">Add Compony</h1>}
            onClick={handleButtonClick}
            visible={modalVisible || editMode}
            onHide={handleModalClose}
            style={{ borderRadius: '2rem' }}>
            <AddVendor
              vendors={selectedCustomer}
              editMode={editMode}
              closeModal={handleModalClose}
              getVendor={getVendorData}
            />
          </CustomModal>
        </div>
      </div>
      {/* </div> */}
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw] p-1 ml-32 mb-80">
        <DataTableSearchFieldComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
          }}
          data={boatData}
          columns={tableColumns}
          header={undefined}
          actionbuttons={actionButtons}
          actionHeader={ActionHeader}
          style={{ backgroundColor: '#F2F2F2' }}
        />
      </div>
    </>
  )
}

export default Vendors
