import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { InputText } from 'primereact/inputtext'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useSelector } from 'react-redux'
import {
  CustomerPayload,
  CustomerResponse,
  DeleteUserResponse,
  ErrorResponse,
  GetUserResponse,
} from '../../Type/ApiTypes'
import { useDeleteUserMutation, useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Paginator } from 'primereact/paginator'
import { DropdownCellProps, Params, State } from '../../Type/CommonType'
import { properties } from '../Utils/MeassageProperties'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { StatesData } from '../CommonComponent/MetaDataComponent/MetaDataApi'
import { useGetCustomerMutation } from '../../Services/MoorManage/MoormanageApi'
import { selectCustomerId } from '../../Store/Slice/userSlice'
const Permission = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
 

  const [getCustomer] = useGetCustomerMutation()
  const { getStatesData } = StatesData()
  const toast = useRef<Toast>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalRecords, setTotalRecords] = useState<number>()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [dropdownValues, setDropdownValues] = useState<{ [key: string]: string }>({})
  const [savedValues, setSavedValues] = useState<{ [key: string]: string }>({})
  const [statesData, setStatesData] = useState<{ label: any; id: any }[]>([])
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [dropdownDisabled, setDropdownDisabled] = useState<{ [key: string]: boolean }>({})

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const columnStyle = {
    borderBottom: '1px solid #D5E1EA',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 700,
  }

  const DropdownCell: React.FC<DropdownCellProps & { disabled: boolean }> = ({
    value,
    onChange,
    options,
    disabled,
  }) => {
    return (
      <Dropdown
        optionLabel="label"
        value={value}
        options={options}
        disabled={disabled}
        onChange={onChange}
        style={{
          height: '32px',
          border: '1px solid #D5E1EA',
          borderRadius: '0.50rem',
          fontSize: '0.8rem',
          width: '40%',
          textAlign: 'center',
        }}
      />
    )
  }

  const firstLastName = (data: any) => {
    return data.firstName + ' ' + data.lastName
  }

  const tableColumnsPermission = useMemo(
    () => [
      {
        id: 'firstName',
        label: 'Customer Name',
        body: firstLastName,
        // style: { width: '20vw' },
        style:columnStyle
      },
      {
        id: 'QuickBookCustomerName',
        label: 'Quick Book Customer Name',
        style: columnStyle,
        // style:{width:"40vw"},
        body: (rowData: { id: string; dropdownValue: string }) => (
          <DropdownCell
            value={dropdownValues[rowData.id] || ''}
            onChange={(e) => setDropdownValues({ ...dropdownValues, [rowData.id]: e.value })}
            options={statesData}
            disabled={!!dropdownDisabled[rowData.id]}
          />
        ),
      },
      {
        id: 'Action',
        label: 'Action',
        // style:{width:"20vw"},
        style: columnStyle,
        body: (rowData: { id: string }) => (
          <span
            className={`cursor-pointer underline ${savedValues[rowData.id] ? 'black' : 'text-green-500'}`}
            onClick={() => handleSaveOrEdit(rowData)}>
            {savedValues[rowData.id] ? 'Edit' : 'Save'}
          </span>
        ),
      },
    ],
    [dropdownValues, savedValues, dropdownDisabled, statesData],
  )

  const handleSaveOrEdit = (rowData: any) => {
    if (savedValues[rowData.id]) {
      setDropdownDisabled((prevState) => ({ ...prevState, [rowData.id]: false }))
      setSavedValues((prevState) => ({ ...prevState, [rowData.id]: '' }))
    } else {
      setDropdownDisabled((prevState) => ({ ...prevState, [rowData.id]: true }))
      setSavedValues((prevState) => ({ ...prevState, [rowData.id]: dropdownValues[rowData.id] }))
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Value Saved Successfully',
        life: 3000,
      })
    }
  }

  const getCustomerData = useCallback(async () => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (pageNumber) {
        params.pageNumber = pageNumber
      }
      if (pageSize) {
        params.pageSize = pageSize
      }

      const response = await getCustomer(params).unwrap()
      const { status, content, message, totalSize } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        if (content?.length > 0) {
          setIsLoading(false)
          setCustomerData(content)
          setTotalRecords(totalSize)
        } else {
          setIsLoading(false)

          setCustomerData([])
          setTotalRecords(totalSize)
        }
      } else {
        setIsLoading(false)
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      setIsLoading(false)
      const { message: msg } = error as ErrorResponse
      console.error('Error occurred while fetching customer data:', msg)
    }
  }, [
    getCustomer,
    // searchText,
    selectedCustomerId,
    pageSize,
    pageNumber,
    // customerId,
    // selectedProduct,
    // sortable,
  ])

  const fetchDataAndUpdate = useCallback(async () => {
    const { statesData } = await getStatesData()

    if (statesData !== null) {
      const parsedData = statesData.map((item) => ({
        label: item.label,
        id: item.id,
      }))

      setStatesData(parsedData)
    }
  }, [])

  useEffect(() => {
    fetchDataAndUpdate()
  }, [fetchDataAndUpdate, dropdownValues])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [selectedCustomerId, pageSize, pageNumber])

  return (
    <div style={{ height: '100vh' }} className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORMANAGE/Permission" />
      <Toast ref={toast} />
      <div
        className={`flex gap-10 ml-6 mt-16 ${isLoading ? 'blur-screen' : ''}`}
        style={{
          paddingRight: '40px',
          paddingLeft: '25px',
        }}>
        <div
          className="bg-[#FFFFFF] border-[1px] border-gray-300  rounded-lg"
          style={{
            flexGrow: 1,
            borderRadius: '10px',
            minHeight: 'calc(40vw - 550px)',
          }}>
          <div className="text-md font-semibold rounded-t-lg bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.Users}</h1>
          </div>
          <div
            data-testid="customer-admin-data"
            className="flex flex-col  "
            style={{ height: '700px' }}>
            <div className="flex-grow overflow-auto">
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'auto',
                }}
                scrollable={true}
                data={customerData}
                columns={tableColumnsPermission}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                emptyMessage={
                  <div className="text-center mt-14">
                    <img
                      src="/assets/images/empty.png"
                      alt="Empty Data"
                      className="w-20 mx-auto mb-4"
                    />
                    <p className="text-gray-500">No data available</p>
                    {isLoading && (
                      <ProgressSpinner
                        style={{
                          position: 'absolute',
                          top: '80%',
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
    </div>
  )
}

export default Permission
