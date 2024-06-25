import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton'
import { Calendar } from 'primereact/calendar'
import {
  CustomerPayload,
  ErrorResponse,
  GetUserResponse,
  TechnicianPayload,
  TechnicianResponse,
} from '../../../Type/ApiTypes'
import { useGetTechnicianMutation } from '../../../Services/MoorManage/MoormanageApi'
import { BillsData, NullableDateArray, Params } from '../../../Type/CommonType'
import { Button } from 'primereact/button'
import DataTableSearchFieldComponent from '../../CommonComponent/Table/DataTableComponent'
import { IoSearch } from 'react-icons/io5'
import { InputText } from 'primereact/inputtext'
import Header from '../../Layout/LayoutComponents/Header'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import { ProgressSpinner } from 'primereact/progressspinner'
import { ActionButtonColumnProps } from '../../../Type/Components/TableTypes'
import {
  useGetTechnicianDataMutation,
  useGetOpenWorkOrdersMutation,
  useGetClosedWorkOrdersMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import { Toast } from 'primereact/toast'
import { Paginator } from 'primereact/paginator'

const Technicians = () => {
  const [date, setDate] = useState<any>()
  const options: string[] = ['Open', 'Completed']
  const [value, setValue] = useState<string>(options[0])
  const [dataVisible, setDataVisible] = useState(false)
  const [filterDateFrom, setFilterDateFrom] = useState<any>()
  const [filterDateTo, setFilterDateTo] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [technicianData, setTechnicianData] = useState<TechnicianPayload[]>([])
  const [filteredTechnicianData, setFilteredTechnicianData] = useState<TechnicianPayload[]>([])
  const [getTechnicians] = useGetTechnicianDataMutation()
  const [getOpenWork] = useGetOpenWorkOrdersMutation()
  const [getWorkedClosed] = useGetClosedWorkOrdersMutation()
  const [getOpenWorkOrderData, setGetOpenWorkOrderData] = useState<CustomerPayload[]>([])
  const [searchText, setSearchText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState()
  const [technicianId, setTechnicianId] = useState()
  const toast = useRef<Toast>(null)
  const selectedCustomerId = useSelector(selectCustomerId)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState<number>()
  const [pageNumberTwo, setPageNumberTwo] = useState(0)
  const [pageNumber2, setPageNumber2] = useState(0)
  const [pageSizeTwo, setPageSizeTwo] = useState(10)
  const [totalRecordsTwo, setTotalRecordsTwo] = useState<number>()

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const onPageChangeTwo = (event: any) => {
    setPageNumberTwo(event.page)
    setPageNumber2(event.first)
    setPageSizeTwo(event.rows)
  }

  const TechnicianTableColumnStyle = {
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
    fontSize: '12px',
    color: '#000000',
  }
  const WorkOrdersColumnStyle = {
    fontSize: '10px',
    height: '12px',
    color: 'white',
    backgroundColor: '#00426F',
    marginTop: '1rem',
    border: '1px solid #00426F',
  }

  const TechnicianTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: TechnicianTableColumnStyle },
      { id: 'name', label: 'Technicians Name', style: TechnicianTableColumnStyle },
      { id: 'email', label: 'Open Work Orders', style: TechnicianTableColumnStyle },
      { id: 'closeWorkOrder', label: 'Completed Jobs', style: TechnicianTableColumnStyle },
    ],

    [],
  )

  const firstLastName = (data: any) => {
    return data?.customerResponseDto?.firstName + ' ' + data?.customerResponseDto?.lastName
  }

  const WorkOrdersColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: WorkOrdersColumnStyle },
      { id: 'mooringResponseDto.mooringNumber', label: 'Mooring', style: WorkOrdersColumnStyle },
      {
        id: 'firstName',
        label: 'Customer Name',
        body: firstLastName,
        style: WorkOrdersColumnStyle,
      },
      { id: 'dueDate', label: 'Due Date', style: WorkOrdersColumnStyle },
    ],
    [],
  )

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleDate = (date: any) => {
    console.log('date', date)

    if (date) {
      setFilterDateFrom(formatDate(date?.[0]))
      setFilterDateTo(formatDate(date?.[1]))
      console.log('here', filterDateFrom, filterDateTo)
    }
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        color: 'black',
        label: 'View',
        underline: true,
        fontWeight: 500,
        // onClick: (rowData) => handleEditButtonClick(rowData),
      },
    ],
    headerStyle: {
      fontSize: '10px',
      height: '12px',
      color: 'white',
      backgroundColor: '#00426F',
      marginTop: '1rem',
      border: '1px solid #00426F',
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleWorkOrder = (rowData: any) => {
    setTechnicianId(rowData?.id)
    setSelectedProduct(rowData)

    if (value === 'Open') {
      getOpenWorkOrder(rowData?.id)
    } else {
      getClosedWorkOrder(rowData?.id)
    }
  }

  const getTechniciansData = useCallback(async () => {
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

      const response = await getTechnicians(params).unwrap()
      const { status, content, message, totalSize } = response as TechnicianResponse
      if (status === 200 && Array.isArray(content)) {
        if (content.length > 0) {
          setIsLoading(false)
          setTechnicianData(content)
          setSelectedProduct(content[0])
          setTechnicianId(content[10]?.id)
          setFilteredTechnicianData(content)
          setTotalRecords(totalSize)
        } else {
          setIsLoading(false)
          setGetOpenWorkOrderData([])
          setTechnicianData([])
        }
      } else {
        setIsLoading(false)
        setGetOpenWorkOrderData([])
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
  }, [searchText, getTechnicians, pageSize, pageNumber])

  const getOpenWorkOrder = useCallback(
    async (id: any) => {
      setIsLoading(true)
      try {
        const response = await getOpenWork({
          technicianId: id,
          pageNumber: pageNumberTwo,
          pageSize: pageSizeTwo,
          filterDateFrom: filterDateFrom,
          filterDateTo: filterDateTo,
        }).unwrap()
        const { status, message, content, totalSize } = response as GetUserResponse
        if (status === 200 && Array.isArray(content)) {
          setIsLoading(false)
          setGetOpenWorkOrderData(content)
          setTotalRecordsTwo(totalSize)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error occurred while fetching customer data:', error)
      }
    },
    [technicianId, value, pageSizeTwo, pageNumberTwo, filterDateFrom, filterDateTo],
  )

  const getClosedWorkOrder = useCallback(
    async (id: any) => {
      setIsLoading(true)
      try {
        const response = await getWorkedClosed({
          technicianId: id,
          pageNumber: pageNumberTwo,
          pageSize: pageSizeTwo,
          filterDateFrom: filterDateFrom,
          filterDateTo: filterDateTo,
        }).unwrap()
        const { status, message, content, totalSize } = response as GetUserResponse
        if (status === 200 && Array.isArray(content)) {
          setIsLoading(false)
          setGetOpenWorkOrderData(content)
          setTotalRecordsTwo(totalSize)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error occurred while fetching customer data:', error)
      }
    },
    [technicianId, value, pageSizeTwo, pageNumberTwo, filterDateFrom, filterDateTo],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (technicianId) {
        if (value === 'Open') {
          getOpenWorkOrder(technicianId)
        } else {
          getClosedWorkOrder(technicianId)
        }
      }
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [
    selectedCustomerId,
    technicianId,
    value,
    pageSizeTwo,
    pageNumberTwo,
    filterDateFrom,
    filterDateTo,
  ])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getTechniciansData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId, pageSize, pageNumber])

  return (
    <>
      <Header header="MOORMANAGE/Technicians" />
      <Toast ref={toast} />

      <div className="mt-10">
        <div className="flex justify-end mr-[54px]">
          <div className="flex gap-4 items-center">
            <div className="">
              <p style={{ color: '#00426F' }}>Filter order by Date</p>
            </div>
            <div
              style={{
                position: 'relative',
                border: '1px solid #D5E1EA',
                borderRadius: '5px',
                display: 'inline-block',
              }}>
              <Calendar
                value={date}
                onChange={(e) => {
                  setDate(e.value)
                  handleDate(date)
                }}
                selectionMode="range"
                placeholder="from: mm/dd/yyyy to: mm/dd/yyyy"
                className="h-8"
                id="calender"
              />
              <img
                src="/assets/images/Calendar.svg"
                alt="Envelope Icon"
                className="p-clickable"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '15px',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row justify-around md:flex-col  mt-6">
          <div
            style={{
              width: '700px',
              height: '720px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D5E1EA',
              borderRadius: '5px',
              marginLeft: '3rem',
            }}>
            <InputTextWithHeader
              value={searchText}
              onChange={handleSearch}
              placeholder="Search by name, ID..."
              inputTextStyle={{
                height: '44px',
                width: '100%',
                cursor: 'pointer',
                fontSize: '',
                color: '#000000',
                border: '1px solid #D5E1EA',
                paddingLeft: '40px',
                borderRadius: '5px',
              }}
              iconStyle={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
              }}
            />

            <div
              data-testid="customer-admin-data"
              className="flex flex-col  "
              style={{ height: '630px' }}>
              <div className="flex-grow overflow-auto">
                <DataTableComponent
                  columns={TechnicianTableColumn}
                  scrollable={true}
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  onRowClick={(row) => {
                    handleWorkOrder(row.data)
                  }}
                  onSelectionChange={(e) => {
                    setSelectedProduct(e.value)
                  }}
                  selection={selectedProduct}
                  data={technicianData}
                  emptyMessage={
                    <div className="text-center mt-40 mb-10">
                      <img
                        src="/assets/images/empty.png"
                        alt="Empty Data"
                        className="w-20 mx-auto mb-4"
                      />
                      <p className="text-gray-500">No data available</p>
                    </div>
                  }
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                />
                {isLoading && (
                  <ProgressSpinner
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      transform: 'translate(-50%, -50%)',
                      width: '50px',
                      height: '50px',
                    }}
                    strokeWidth="4"
                  />
                )}
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

          <div
            className={`${isLoading ? 'blur-screen' : ''} md:ml-12 md:mt-3 lg:mt-0`}
            style={{
              flexGrow: 1,
              borderRadius: '5px',
              border: '1px solid #D5E1EA',
              backgroundColor: '#FFFFFF',
              marginRight: '50px',
              width: '700px',
              height: '720px',
            }}>
            <div className="flex justify-between mt-6  mb-3 ">
              <div className="font-bold ml-5">
                <p style={{ color: '#000000', fontSize: '18px' }}>{properties.workOrderHeader}</p>
              </div>
              <div className="mr-10">
                <div className="card flex justify-content-center ">
                  <SelectButton
                    value={value}
                    onChange={(e: SelectButtonChangeEvent) => {
                      setValue(e.value)
                    }}
                    options={options}
                  />
                </div>
              </div>
            </div>

            <div
              data-testid="customer-admin-data"
              className="flex flex-col  "
              style={{ height: '630px' }}>
              <div className="flex-grow overflow-auto">
                <DataTableComponent
                  columns={WorkOrdersColumn}
                  scrollable={true}
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  onRowClick={(row) => {
                    handleWorkOrder(row.data)
                  }}
                  onSelectionChange={(e) => {
                    setSelectedProduct(e.value)
                  }}
                  data={getOpenWorkOrderData}
                  emptyMessage={
                    <div className="text-center mt-40 mb-10">
                      <img
                        src="/assets/images/empty.png"
                        alt="Empty Data"
                        className="w-20 mx-auto mb-4"
                      />
                      <p className="text-gray-500">No data available</p>
                    </div>
                  }
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                />
                {isLoading && (
                  <ProgressSpinner
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      transform: 'translate(-50%, -50%)',
                      width: '50px',
                      height: '50px',
                    }}
                    strokeWidth="4"
                  />
                )}
              </div>
              <div className="mt-auto">
                <Paginator
                  first={pageNumber2}
                  rows={pageSizeTwo}
                  totalRecords={totalRecordsTwo}
                  rowsPerPageOptions={[5, 10, 20, 30]}
                  onPageChange={onPageChangeTwo}
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
    </>
  )
}

export default Technicians
