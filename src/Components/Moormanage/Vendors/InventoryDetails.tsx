import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import CustomModal from '../../CustomComponent/CustomModal'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import AddInventory from './AddInventory'
import { Params } from '../../../Type/CommonType'
import {
  useDeleteInventoryMutation,
  useGetInventoryDetailsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { useLocation } from 'react-router-dom'
import { DeleteCustomerResponse, GetInventoryResponse } from '../../../Type/ApiTypes'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'

const InventoryDetails: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [inventoryEdit, setInventoryEdit] = useState(false)
  const [inventoryData, setInventoryData] = useState<any[]>()
  const [sectectedInventory, setSelectedInventory] = useState<any>([])
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const vendorId = queryParams.get('vendorId')
  const [getInventory] = useGetInventoryDetailsMutation()
  const [deleteInventory] = useDeleteInventoryMutation()
  const toast = useRef<Toast>(null)

  const handleEdit = (rowData: any) => {
    setEditMode(true)
    setModalVisible(true)
    setSelectedInventory(rowData)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const handleButtonClick = () => {
    setModalVisible(true)
  }
  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  const VendorInventoryColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'SKU',
        style: {
          width: '5vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'inventoryType.type',
        label: 'Type',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
        },
      },
      {
        id: 'itemName',
        label: 'Item Name',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
        },
      },
      {
        id: 'cost',
        label: 'Cost',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
        },
      },
      {
        id: 'salePrice',
        label: 'Sale Price',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
        },
      },
      {
        id: 'taxable',
        label: 'Taxable',
        style: {
          width: '9vw',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontSize: '11.18px',
          fontWeight: '700',
        },
      },
    ],
    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = useMemo(
    () => ({
      header: 'Action',
      buttons: [
        {
          color: 'green',
          label: 'Edit',
          onClick: (rowData) => {
            handleEdit(rowData)
          },
          underline: true,
        },
        {
          color: 'red',
          label: 'Delete',
          underline: true,
          onClick: (rowData) => {
            handleDelete(rowData)
          },
        },
      ],
      headerStyle: {
        backgroundColor: '#00426F',
        color: '#FFFFFF',
        borderTopRightRadius: '10px',
      },
      style: { width: '7rem', borderBottom: '1px solid #D5E1EA', fontSize: '11.18px' },
    }),
    [],
  )

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteInventory({ id: rowData?.id, vendorId: vendorId }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
        setIsLoading(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: message,
          life: 3000,
        })
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
      getInventoryHandler()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const getInventoryHandler = useCallback(async () => {
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }
      const response = await getInventory({ vendorId: vendorId, params }).unwrap()
      const { status, message, content } = response as GetInventoryResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        if (content.length > 0) {
          setInventoryData(content)
        } else {
          setInventoryData([])
        }
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }, [getInventory, searchText])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getInventoryHandler()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText])

  return (
    <>
      <Header header="MOORMANAGE/Vendor" />
      <Toast ref={toast} />

      <div className="flex justify-end">
        <div className="flex gap-4 mr-12 mt-8">
          <div>
            <div className="p-input-icon-left">
              <IoSearchSharp className="ml-2 text-blue-900" />
              <InputText
                placeholder="search sku, name, type"
                className="h-[44px] w-[237px] cursor-pointer pl-8 rounded-lg text-bold  "
              />
            </div>
          </div>

          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddInventory
                id={vendorId}
                toastRef={toast}
                editMode={editMode}
                selectedInventory={sectectedInventory}
                getInventoryHandler={getInventoryHandler}
                closeModal={handleModalClose}
              />
            }
            headerText={<h1 className="text-xl font-extrabold text-black ml-4">Add Inventory</h1>}
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
              width: '851px',
              minWidth: '851px',
              height: '400px',
              minHeight: '400px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>
      {inventoryData && (
        <div className="rounded-md border-[1px] border-gray-300 w-100% h-[110px] ml-14 mr-10 mt-5 bg-white">
          <div className="flex justify-between pr-4 pl-4  mt-5">
            <div style={{ fontSize: '14px', color: '#000000', fontWeight: '400' }}>
              <p>ID:</p>
              <p className="mt-5">{inventoryData[0]?.vendorResponseDto?.id}</p>
            </div>
            <div>
              <p>Sales Representative</p>
              <p className="mt-5">{inventoryData[0]?.vendorResponseDto?.firstName}</p>
            </div>
            <div>
              <p>Phone Number:</p>
              <p className="mt-5">{inventoryData[0]?.vendorResponseDto?.salesRepPhoneNumber}</p>
            </div>
            <div>
              <p>Email Address:</p>
              <p className="mt-5">{inventoryData[0]?.vendorResponseDto?.salesRepEmail}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <ProgressSpinner
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
          }}
          strokeWidth="4"
        />
      )}

      <div
        // style={{border:"1px solid red"}}
        className="bg-white rounded-md border-[1px] h-[600px]  border-gray-300 w-100% ml-14 mr-10 mt-8">
        <DataTableComponent
          tableStyle={{
            fontSize: '12px',
            color: '#000000',
            fontWeight: 600,
            backgroundColor: '#D9D9D9',
            cursor: 'pointer',
          }}
          columns={VendorInventoryColumns}
          actionButtons={ActionButtonColumn}
          scrollable={true}
          data={inventoryData}
          style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
          emptyMessage={
            <div className="text-center mt-40">
              <img src="/assets/images/empty.png" alt="Empty Data" className="w-28 mx-auto mb-4" />
              <p className="text-gray-500">No data available</p>
            </div>
          }
        />
      </div>
    </>
  )
}

export default InventoryDetails
