import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomModal from '../../CustomComponent/CustomModal'
import AddVendor from './AddVendor'
import { InputText } from 'primereact/inputtext'
import {
  useDeleteVendorMutation,
  useGetVendorsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { DeleteCustomerResponse, VendorPayload, VendorResponse } from '../../../Type/ApiTypes'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import Header from '../../Layout/LayoutComponents/Header'
import { IoSearchSharp } from 'react-icons/io5'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'
import { Params } from '../../../Type/CommonType'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { Paginator } from 'primereact/paginator'

const Vendors = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [vendorData, setVendorData] = useState<VendorPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const toast = useRef<Toast>(null)
  const [getVendors] = useGetVendorsMutation()
  const [deleteVendor] = useDeleteVendorMutation()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState<number>()

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(0)
    setPageNumber1(0)
    setSearchText(e.target.value)
  }

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const getVendorData = useCallback(async () => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }
      if (pageNumber) {
        params.pageNumber = pageNumber
      }
      if (pageSize) {
        params.pageSize = pageSize
      }

      await getVendors(params)
        .unwrap()
        .then(async (response: any) => {
          const { status, content, message, totalSize } = response as VendorResponse
          if (status === 200 && Array.isArray(content)) {
            setIsLoading(false)
            setVendorData(content)
            setTotalRecords(totalSize)
          } else {
            setIsLoading(false)
            toast?.current?.show({
              severity: 'error',
              summary: 'Error',
              detail: message,
              life: 3000,
            })
          }
        })
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching getBoatyardsdata:', error)
    }
  }, [getVendors, searchText, selectedCustomerId, pageSize, pageNumber])

  const handleEdit = (rowData: any) => {
    setModalVisible(true)
    setSelectedCustomer(rowData)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    setIsLoading(true)
    try {
      const response = await deleteVendor({ id: rowData?.id }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
        setIsLoading(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        })
      } else {
        setIsLoading(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
      getVendorData()
    } catch (error) {
      setIsLoading(false)
      console.error('Error deleting customer:', error)
    }
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  const columnStyle = {
    backgroundColor: '#00426F',
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: '12px',
  }

  const VendorColumns = useMemo(
    () => [
      {
        id: 'companyName',
        label: 'Company Name',
        style: {
          ...columnStyle,
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'companyPhoneNumber',
        label: 'Phone Number',
        style: columnStyle,
        className: 'phone',
      },
      {
        id: 'companyEmail',
        label: 'Email Address',
        style: columnStyle,
        className: 'email',
      },
      {
        id: 'inventoryItems',
        label: 'Inventory Items',
        style: columnStyle,
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
          onClick: (rowData) => {
            navigate(`/moormanage/inventoryDetails?vendorId=${rowData.id}`)
          },
          underline: true,
          style: {
            margin: 0,
          },
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
          onClick: (rowData) => {
            handleDelete(rowData)
          },
          underline: true,
        },
      ],
      headerStyle: {
        backgroundColor: '#00426F',
        color: '#FFFFFF',
        height: '3.50rem',
        borderTopRightRadius: '10px',
        borderBottom: '1px solid #C0C0C0',
      },
      style: {
        borderBottom: '1px solid #D5E1EA ',
        width: '14rem',
        fontWeight: 500,
      },
    }),
    [],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      getVendorData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId, pageSize, pageNumber])

  return (
    <>
      <div style={{ height: '100vh' }} className={modalVisible ? 'backdrop-blur-lg' : ''}>
        <Header header="MOORMANAGE/Vendor" />
        <Toast ref={toast} />
        <div className="flex justify-end">
          <div className="flex gap-4 mr-12 mt-6">
            <div>
              <div className="p-input-icon-left">
                <IoSearchSharp className="text-blue-900" />
                <InputText
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="h-[44px] w-[237px] cursor-pointer pl-8 rounded-lg text-bold  "
                />
              </div>
            </div>

            <CustomModal
              buttonText={'ADD NEW'}
              buttonStyle={{
                width: '121px',
                height: '44px',
                minHeight: '44px',
                backgroundColor: '#0098FF',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                borderRadius: '0.50rem',
                marginLeft: '8px',
                boxShadow: 'none',
              }}
              icon={<img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8" />}
              children={
                <AddVendor
                  vendors={selectedCustomer}
                  editMode={editMode}
                  closeModal={handleModalClose}
                  getVendor={getVendorData}
                  toastRef={toast}
                />
              }
              headerText={
                <h1 style={{ fontWeight: '500', fontSize: '24px', color: '#000000' }}>
                  Add Company
                </h1>
              }
              visible={modalVisible}
              onClick={handleButtonClick}
              onHide={handleModalClose}
              dialogStyle={{
                width: '851px',
                minWidth: '800px',
                height: '630px',
                minHeight: '630px',
                borderRadius: '1rem',
                maxHeight: '95% !important',
              }}
            />
          </div>
        </div>

        <div
          style={{
            height: '700px',
            borderRadius: '10px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            position: 'relative',
          }}
          className={`ml-[3rem] mr-[2.30rem] mt-8 `}>
          <div data-testid="customer-admin-data" className="flex flex-col h-full">
            <div className="flex-grow overflow-auto">
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: '400',
                  padding: '1rem',
                }}
                data={vendorData}
                columns={VendorColumns}
                actionButtons={ActionButtonColumn}
                style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D5E1EA' }}
                emptyMessage={
                  <div className="text-center mt-40">
                    <img
                      src="/assets/images/empty.png"
                      alt="Empty Data"
                      className="w-28 mx-auto mb-4"
                    />
                    <p className="text-gray-500 font-[600] text-lg">No data available</p>

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
                  </div>
                }
              />
            </div>
            <div className="mt-auto">
              <Paginator
                first={pageNumber1}
                rows={pageSize}
                totalRecords={totalRecords}
                rowsPerPageOptions={[5, 10, 20, 30]}
                onPageChange={onPageChange}
                style={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                  backgroundColor: 'white',
                  borderTop: '1px solid #D5E1EA',
                  padding: '0.5rem',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vendors
