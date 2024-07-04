import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { ActionButtonColumnProps, TableColumnProps } from '../../Type/Components/TableTypes'
import CustomMooringPositionMap from '../Map/CustomMooringPositionMap'
import Accordion from '../CommonComponent/Accordion'
import {
  ErrorResponse,
  MooringAndWorkOrderResponse,
  MooringPayload,
  MooringResponse,
} from '../../Type/ApiTypes'
import {
  useGetAllOpenWorkOrdersAndMooringDueForServiceMutation,
  useGetMooringsDueForServiceMutation,
  useGetMooringsMutation,
} from '../../Services/MoorManage/MoormanageApi'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../Store/Slice/userSlice'
import { Toast } from 'primereact/toast'
import { PositionType } from '../../Type/Components/MapTypes'
import { GearOffIcon, GearOnIcon, NeedInspectionIcon, NotInUseIcon } from '../Map/DefaultIcon'
import DatePickerComponent from '../CommonComponent/DatePickerComponent'
import { FiMinus } from 'react-icons/fi'
import { IoAddOutline } from 'react-icons/io5'
import { Paginator } from 'primereact/paginator'
import StatCard from '../StatCard/StatCard'
import { Dialog } from 'primereact/dialog'
import AddWorkOrders from '../Moorserve/WorkOrders/AddWorkOrders'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'
import AddMoorings from '../Moormanage/Moorings/AddMoorings'
import { ProgressSpinner } from 'primereact/progressspinner'

const Dashboard = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [accordion, setAccordion] = useState('faq1')
  const [workOrderData, setWorkOrderData] = useState<any>()
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedMooring, setSelectedMooring] = useState<any>()
  const [visibleMooring, setVisibleMooring] = useState(false)
  const [editModeMooring, setEditModeMooring] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [totalMoorings, setTotalMoorings] = useState<any>()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState<number>()
  const [mooringData, setMooringData] = useState<any>()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [mooringResponseData, setMooringResponseData] = useState<any>()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [getMoorings] = useGetMooringsMutation()
  const today = new Date()
  const dateAfter7Days = new Date(today)
  dateAfter7Days.setDate(today.getDate() + 7)
  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }
  const [dates, setDates] = useState<[Date, Date]>([today, dateAfter7Days])
  const [filterDateFrom, setFilterDateFrom] = useState<any>(formatDate(today))
  const [filterDateTo, setFilterDateTo] = useState<any>(formatDate(dateAfter7Days))

  const handleDateChange = (e: { target: { value: any } }) => {
    const { value } = e.target
    setDates(value)
    if (value && value.length === 2 && value[0] && value[1]) {
      setStartDate(value[0])
      setEndDate(value[1])
    }
  }

  const [getOpenWorkOrderAndMoorings] = useGetAllOpenWorkOrdersAndMooringDueForServiceMutation()
  const toast = useRef<Toast>(null)

  const position: PositionType = [41.56725, 70.94045]

  const parseCoordinates = (coordinates: any) => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const gpsCoordinatesArray =
    mooringData &&
    mooringData?.map(
      (mooring: any) => parseCoordinates(mooring.gpsCoordinates) || [41.56725, 70.94045],
    )

  const initialPosition = gpsCoordinatesArray?.length > 0 ? gpsCoordinatesArray[0] : position

  const convertStringToArray = (str: any) => {
    return str?.split(' ').map(Number)
  }

  const coordinatesArray = convertStringToArray(mooringResponseData)

  const iconsByStatus = {
    GearOn: GearOnIcon,
    GearOff: GearOffIcon,
    NeedInspection: NeedInspectionIcon,
    NotInUse: NotInUseIcon,
  }

  const statCardsData = [
    [
      { title: 'Total Moorings', percentage: 17, count: totalMoorings },
      { title: 'Total Moorings', percentage: 17, count: totalMoorings },
      { title: 'Total Moorings', percentage: 17, count: 44324 },
      { title: 'Total Moorings', percentage: 17, count: 58765 },
      { title: 'Total Moorings', percentage: 17, count: 42324 },
      { title: 'Total Moorings', percentage: 17, count: 46789 },
    ],
  ]

  const handleToggle = (id: string) => {
    setAccordion((prevState) => (prevState === id ? '' : id))
  }

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageNumber1(event.first)
    setPageSize(event.rows)
  }

  const handleModalClose = () => {
    setVisible(false)
    setEditMode(false)
    setVisibleMooring(false)
    setEditModeMooring(false)
  }

  const handleEditMooring = (rowData: any) => {
    setSelectedMooring(rowData)
    setEditModeMooring(true)
    setVisibleMooring(true)
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
    setVisible(true)
  }

  const firstLastName = (data: any) => {
    return data.customerResponseDto.firstName + ' ' + data.customerResponseDto.lastName
  }

  const Mooringcolumns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          fontSize: '10px',
          // width: '2vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'firstName',
        label: 'Customer Name',
        body: firstLastName,
        style: {
          fontSize: '10px',
          // width: '8vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringNumber',
        label: 'Mooring Number',
        style: {
          fontSize: '10px',
          // width: '8vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },

      {
        id: 'mooringServiceDate',
        label: 'Mooring service Date',
        style: {
          fontSize: '10px',
          // width: '9vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'gpsCoordinates',
        label: 'Mooring Location ',
        style: {
          fontSize: '10px',
          // width: '10vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
      {
        id: 'mooringDueServiceStatusDto.status',
        label: 'Status',
        style: {
          fontSize: '10px',
          // width: '10vw',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          fontWeight: '700',
        },
      },
    ],
    [],
  )

  const MooringActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        underline: true,
        label: 'Edit',
        color: 'green',
        onClick: (row) => handleEditMooring(row),
      },
    ],
    headerStyle: { backgroundColor: '#FFFFFF' },
    style: {
      fontSize: '10px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontWeight: '700',
    },
  }

  const WorkOrderColumns: TableColumnProps[] = useMemo(
    () => [
      {
        id: 'id',
        label: 'Order No.',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'mooringResponseDto.mooringNumber',
        label: 'Mooring Number',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'firstName',
        label: 'Customer Name',
        body: firstLastName,
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'technicianUserResponseDto.name',
        label: 'Assigned To',
        style: { fontSize: '10px', width: '6vw', backgroundColor: '#FFFFFF', color: '#000000' },
      },
      {
        id: 'dueDate',
        label: 'Date',
        style: { fontSize: '10px', width: '5vw', backgroundColor: '#FFFFFF', color: 'black' },
      },
    ],
    [],
  )

  const WorkOrderActionButtonColumn: ActionButtonColumnProps = {
    header: '',
    buttons: [
      {
        underline: true,
        label: 'view',
        filled: true,
        onClick: (row) => handleEdit(row),
      },
    ],
    headerStyle: { backgroundColor: '#FFFFFF' },
  }

  const MooringHeader = (
    <div>
      <div className="flex justify-between gap-2 p-2 bg-white">
        <div
          style={{
            fontWeight: '700',
            fontSize: '16px',
            color: '#000000',
          }}>
          Moorings Due for Service
        </div>
        {/* <div
          style={{
            width: '80px',
            height: '16px',
            opacity: '50%',
            fontSize: '13.59px',
            fontWeight: '500',
          }}>
          View all
        </div> */}
      </div>
    </div>
  )

  const getMooringsAndWorkOrderData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getOpenWorkOrderAndMoorings({
        pageNumber: pageNumber,
        pageSize: pageSize,
        filterDateFrom: filterDateFrom,
        filterDateTo: filterDateTo,
      }).unwrap()
      const { status, content, message, totalSize } = response as MooringAndWorkOrderResponse
      if (status === 200) {
        if (content?.mooringDueServiceResponseDtoList) {
          setIsLoading(false)
          setMooringData(content?.mooringDueServiceResponseDtoList)
        } else {
          setIsLoading(false)
          setMooringData([])
        }
        if (content?.workOrderResponseDtoList) {
          setIsLoading(false)
          setWorkOrderData(content?.workOrderResponseDtoList)
          setTotalRecords(totalSize)
        } else {
          setIsLoading(false)
          setMooringData([])
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
      const { message } = error as ErrorResponse
      console.error('Error fetching moorings data:', error)
    }
  }, [
    getOpenWorkOrderAndMoorings,
    pageSize,
    pageNumber,
    filterDateFrom,
    filterDateTo,
    selectedCustomerId,
  ])

  const getMooringsData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getMoorings({}).unwrap()
      const { status, content, message, totalSize } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        if (content?.length > 0) {
          setTotalMoorings(totalSize)
        }
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      const { message } = error as ErrorResponse
      console.error('Error fetching moorings data:', error)
    }
  }, [selectedCustomerId])

  useEffect(() => {
    if (startDate && endDate) {
      setFilterDateFrom(formatDate(startDate))
      setFilterDateTo(formatDate(endDate))
    }
  }, [startDate, endDate])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMooringsAndWorkOrderData()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [pageSize, pageNumber, filterDateFrom, filterDateTo, selectedCustomerId])

  useEffect(() => {
    getMooringsData()
  }, [selectedCustomerId])

  return (
    <>
      <Header header="MOORMANAGE/DASHBOARD" />
      <Toast ref={toast} />
      <div className="mt-6">
        <div className="flex lg:flex-row justify-around md:flex-col mt-4">
          <div
            style={{
              marginLeft: '3rem',
            }}>
            <div
              data-testid="mooring-data"
              className="flex flex-col mt-[3px] ml-[15px] mr-[15px] table-container "
              style={{ height: '700px' }}>
              <div className="mb-4" style={{ overflow: 'auto' }}>
                <DataTableComponent
                  columns={Mooringcolumns}
                  // actionButtons={MooringActionButtonColumn}
                  header={MooringHeader}
                  scrollable={true}
                  tableStyle={{
                    backgroundColor: '#FFFFFF',
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  selectionMode="single"
                  onSelectionChange={(e) => {
                    setSelectedProduct(e.value)
                  }}
                  selection={selectedProduct}
                  dataKey="id"
                  onRowClick={(rowData) => {
                    setMooringResponseData(rowData?.data?.gpsCoordinates)
                  }}
                  data={mooringData}
                  emptyMessage={
                    <div className="text-center mt-2">
                      <img
                        src="/assets/images/empty.png"
                        alt="Empty Data"
                        className="w-20 mx-auto mb-2"
                      />
                      <p className="text-gray-500">No data available</p>
                    </div>
                  }
                />
              </div>

              {isLoading && (
                <ProgressSpinner
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                  }}
                  strokeWidth="4"
                />
              )}

              <CustomMooringPositionMap
                position={coordinatesArray ? coordinatesArray : initialPosition}
                zoomLevel={10}
                style={{ height: '60%', width: '100%' }}
                iconsByStatus={iconsByStatus}
                moorings={mooringData}
              />
            </div>
          </div>

          <div
            className={`md:ml-12 md:mt-3 lg:mt-0`}
            style={{
              flexGrow: 1,
              marginRight: '50px',
            }}>
            <div className="flex  flex-col wrapper ">
              <div
                className=" px-5 relative mb-4 rounded-xl bg-white border-[1px] border-[#D5E1EA] mr-8"
                style={{ width: '492.03px', maxWidth: '492.03px' }}>
                <label
                  htmlFor="faq1"
                  className="cursor-pointer flex items-center justify-between h-14"
                  onClick={() => handleToggle('faq1')}>
                  <div className="flex items-center gap-4">
                    <div>
                      <img alt="icon" src="/assets/images/Calendar.svg" style={{ width: '23px' }} />
                    </div>
                    <div>
                      <h1 className="text-[16px] font-[500] text-[#10293A] leading-[18.75px]">
                        Calendar
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {accordion === 'faq1' ? (
                        <FiMinus style={{ color: '#10293A' }} />
                      ) : (
                        <IoAddOutline style={{ color: '#10293A' }} />
                      )}
                    </div>
                  </div>
                </label>

                <div
                  className={`content mt-5 transition-all ease-in-out duration-500 ${accordion === 'faq1' ? '' : 'hidden'}`}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                      className="card flex  justify-items-center"
                      style={{
                        height: 'auto',
                        gap: '0px',
                        borderRadius: '10px',
                        border: '1.13px solid #D5E1EA',
                        backgroundColor: '#D5E1EA',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '2rem',
                      }}>
                      <Calendar
                        value={dates}
                        onChange={(e) => handleDateChange(e)}
                        selectionMode="range"
                        hideOnRangeSelection
                        inline
                      />
                    </div>{' '}
                  </div>
                </div>
              </div>
              <div
                className="tab px-5 relative mb-4 rounded-xl bg-[#FFFFFF] border-[1px] border-[#D5E1EA] mr-8"
                style={{ width: '492.03px', maxWidth: '492.03px' }}>
                <label
                  htmlFor="faq2"
                  className="cursor-pointer flex items-center justify-between h-14"
                  onClick={() => handleToggle('faq2')}>
                  <div className="flex items-center gap-4">
                    <div>
                      <img alt="icon" src="/assets/images/file.svg" style={{ width: '23px' }} />
                    </div>
                    <div style={{ flexShrink: 1 }}>
                      <h1 className="text-[16px] font-[500] text-[#10293A] leading-[18.75px]">
                        Open Work Orders
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {accordion === 'faq2' ? (
                        <FiMinus style={{ color: '#10293A' }} />
                      ) : (
                        <IoAddOutline style={{ color: '#10293A' }} />
                      )}
                    </div>
                  </div>
                </label>
                <div
                  className={`content transition-all ease-in-out duration-500 ${accordion === 'faq2' ? '' : 'hidden'}`}>
                  <div
                    className={`bg-#00426F overflow-x-hidden h-[320px] table-container flex flex-col`}>
                    <div className="flex-grow" style={{ overflow: 'auto' }}>
                      <DataTableComponent
                        data={workOrderData}
                        columns={WorkOrderColumns}
                        actionButtons={WorkOrderActionButtonColumn}
                        scrollable={true}
                        tableStyle={{ fontSize: '10px', width: '450px' }}
                        emptyMessage={
                          <div className="text-center mt-14">
                            <img
                              src="/assets/images/empty.png"
                              alt="Empty Data"
                              className="w-20 mx-auto mb-4"
                            />
                            <p className="text-gray-500">No data available</p>
                          </div>
                        }
                      />
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

              <div
                className="tab px-5 py-3 bg-white border-[1px] border-[#D5E1EA] relative mb-2 rounded-xl mr-8"
                style={{ width: '492.03px', maxWidth: '492.03px' }}>
                <label
                  htmlFor="faq3"
                  className="cursor-pointer flex items-center justify-between h-8"
                  onClick={() => handleToggle('faq3')}>
                  <div className="flex items-center gap-2">
                    <img alt="icon" src="/assets/images/Group.svg" style={{ width: '25px' }} />
                    <div className="ml-2 " style={{ flexShrink: 1 }}>
                      <h1 className="text-[#10293A] font-[500] leading-[18.75px]">
                        Total Moorings
                      </h1>
                    </div>
                  </div>

                  <div className="">
                    {accordion === 'faq3' ? (
                      <FiMinus style={{ color: '#10293A' }} />
                    ) : (
                      <IoAddOutline style={{ color: '#10293A' }} />
                    )}
                  </div>
                </label>
                <div
                  className={`content mt-5 transition-all ease-in-out duration-500 ${accordion === 'faq3' ? '' : 'hidden'}`}>
                  <div>
                    {statCardsData.map((items) => (
                      <StatCard key={items[0].title} items={items} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Dialog
              position="center"
              style={{
                width: '851px',
                height: '526px',
                borderRadius: '1rem',
              }}
              draggable={false}
              visible={visible}
              onHide={handleModalClose}
              header={<h1 className="text-xl font-extrabold text-black ml-4">Work Order</h1>}>
              <AddWorkOrders
                workOrderData={selectedCustomer}
                editModeWorkOrder={editMode}
                setVisible={setVisible}
                toastRef={toast}
                closeModal={handleModalClose}
              />
            </Dialog>

            {/* <Dialog
              position="center"
              style={{
                width: '851px',
                height: '526px',
                borderRadius: '1rem',
              }}
              draggable={false}
              visible={visibleMooring}
              onHide={handleModalClose}
              header={<h1 className="text-xl font-extrabold text-black ml-4">Work Order</h1>}>
              <AddMoorings
                moorings={selectedMooring}
                mooringRowData={selectedMooring}
                editMode={editModeMooring}
                closeModal={handleModalClose}
                getCustomer={() => {}}
              />
            </Dialog> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
