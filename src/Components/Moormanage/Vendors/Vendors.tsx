import { useEffect, useState } from 'react'
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
      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-[67vw] p-1 ml-32 mt-10">
        <DataTable
          value={vendorData}
          header={''}
          tableStyle={{
            minWidth: '20rem',
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
            backgroundColor: '#D1D1D1',
          }}
          size="small">
          <Column header="ID" field="id" style={{ width: '8vw' }}></Column>
          <Column style={{ width: '11vw' }} field="companyName" header="Company Name"></Column>
          <Column
            style={{ width: '11vw' }}
            field="companyPhoneNumber"
            header="Phone Number"></Column>

          <Column style={{ width: '11vw' }} field="companyEmail" header="Email Address"></Column>
          <Column
            style={{ width: '11vw' }}
            field="InventoryItems"
            header="Inventory Items"></Column>

          <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex gap-5">
                <Button
                  label="View Inventory"
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                />
                <Button
                  label="Edit"
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: 'green',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleEdit(rowData)}
                />
                <Button
                  label="Delete"
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDelete(rowData)}
                />
              </div>
            )}></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Vendors
