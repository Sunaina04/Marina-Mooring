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

const InventoryDetails: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [inventoryEdit, setInventoryEdit] = useState(false)
  const [inventoryData, setInventoryData] = useState<any[]>()
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const vendorId = queryParams.get('vendorId')
  const [getInventory] = useGetInventoryDetailsMutation()
  const [deleteInventory] = useDeleteInventoryMutation()
  const toast = useRef<Toast>(null)

  const handleEdit = () => {
    setInventoryEdit(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const handleButtonClick = () => {
    setModalVisible(true)
  }
  const handleModalClose = () => {
    setModalVisible(false)
  }

  const VendorInventoryColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'SKU',
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
          onClick: handleEdit,
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
        // height: '3.50rem',
        borderTopRightRadius: '10px',
      },
      style: { width: '7rem', fontSize: '11.18px' },
    }),
    [],
  )

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteInventory({ id: rowData?.id, vendorId: vendorId }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
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
      } else {
        setIsLoading(false)
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
        <div className="flex gap-4 mr-12 mt-14">
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
            children={<AddInventory />}
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
      <div className="rounded-md border-[1px] border-gray-300 w-100% h-[110px] ml-14 mr-10 mt-10 bg-white">
        <div className="flex justify-around  mt-5">
          <div style={{ fontSize: '14px', color: '#000000', fontWeight: '400' }}>
            <p>ID:</p>
          </div>
          <div>
            <p>Sales Representative</p>
          </div>
          <div>
            <p>Phone Number:</p>
          </div>
          <div>
            <p>Email Address:</p>
          </div>
        </div>
      </div>

      <div className="bg-[F2F2F2] rounded-md border-[1px] border-gray-300 w-100% ml-14 mr-10 mt-20">
        <DataTableComponent
          columns={VendorInventoryColumns}
          actionButtons={ActionButtonColumn}
          scrollable={true}
          data={inventoryData}
        />
      </div>
    </>
  )
}

export default InventoryDetails
