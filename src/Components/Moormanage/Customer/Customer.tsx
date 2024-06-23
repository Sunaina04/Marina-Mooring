import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddCustomer from './AddCustomer'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { Dialog } from 'primereact/dialog'

import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useGetCustomersWithMooringMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import {
  CustomerPayload,
  CustomerResponse,
  CustomersWithMooringResponse,
  DeleteCustomerResponse,
  ErrorResponse,
  MooringPayload,
  MooringResponseDtoList,
} from '../../../Type/ApiTypes'

import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import Header from '../../Layout/LayoutComponents/Header'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import { Params } from '../../../Type/CommonType'
import { Toast } from 'primereact/toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import CustomMooringPositionMap from '../../Map/CustomMooringPositionMap'
import { GearOffIcon, GearOnIcon, NeedInspectionIcon, NotInUseIcon } from '../../Map/DefaultIcon'
import { ProgressSpinner } from 'primereact/progressspinner'
import { LatLngExpression } from 'leaflet'
import { LatLngExpressionValue, PositionType } from '../../../Type/Components/MapTypes'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import { Paginator } from 'primereact/paginator'
import { Avatar } from 'primereact/avatar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Customer = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [editMode, setEditMode] = useState(false)
  const [editCustomerMode, setEditCustomerMode] = useState(false)
  const [editMooringMode, setEditMooringMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringData, setMooringData] = useState<MooringResponseDtoList[]>([])
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [mooringRowData, setMooringRowData] = useState<MooringPayload>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedMooring, setSelectedMooring] = useState()
  const [searchText, setSearchText] = useState('')
  const [customerId, setCustomerId] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoader, setIsLoader] = useState(false)
  const [coordinatesArray, setCoordinatesArray] = useState<any[]>([])
  const [getCustomer] = useGetCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()
  const [getCustomerWithMooring] = useGetCustomersWithMooringMutation()
  const toast = useRef<Toast>(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageNumber1, setPageNumber1] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecordsOne, setTotalRecordsOne] = useState<number>()

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

  const position: PositionType = [41.56725, 70.94045]

  const parseCoordinates = (coordinates: any) => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  const gpsCoordinatesArray = mooringData.map(
    (mooring) => parseCoordinates(mooring.gpsCoordinates) || [41.56725, 70.94045],
  )

  const calculateCenter = (coordinatesArray: any) => {
    if (coordinatesArray.length === 0) {
      return [41.56725, 70.94045] // Default coordinates if the array is empty
    }

    let totalLat = 0
    let totalLong = 0

    coordinatesArray.forEach(([lat, long]: any) => {
      totalLat += lat
      totalLong += long
    })

    const avgLat = totalLat / coordinatesArray.length
    const avgLong = totalLong / coordinatesArray.length

    return [avgLat, avgLong]
  }

  const center = calculateCenter(gpsCoordinatesArray)

  const initialPosition =
    gpsCoordinatesArray.length > 0 ? calculateCenter(gpsCoordinatesArray) : position

  const iconsByStatus = {
    GearOn: GearOnIcon,
    GearOff: GearOffIcon,
    NeedInspection: NeedInspectionIcon,
    NotInUse: NotInUseIcon,
  }

  const handleButtonClick = () => {
    setModalVisible(true)
    setEditMode(false)
    setEditCustomerMode(false)
    setEditMooringMode(false)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
    setEditCustomerMode(false)
    setEditMooringMode(false)
    setDialogVisible(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumber(0)
    setPageNumber1(0)
    setSearchText(e.target.value)
  }

  const handleEdit = () => {
    setSelectedCustomer(customerRecordData)
    setEditCustomerMode(true)
    setModalVisible(true)
    setEditMode(true)
  }

  const handleMooringEdit = () => {
    setSelectedCustomer(customerRecordData)
    setEditMooringMode(true)
    setModalVisible(true)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteCustomer({ id: customerRecordData?.id }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        })
        getCustomerData()
        setMooringData([])
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
      setCustomerRecordData('')
    } catch (error) {
      const { message: msg } = error as ErrorResponse
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: msg,
        life: 3000,
      })
    }
  }

  const handleCustomerTableRowClick = (rowData: any) => {
    setCustomerId(rowData.data.id)
    getCustomersWithMooring(rowData.data.id)
  }

  const handleMooringTableRowClick = (rowData: any) => {
    setDialogVisible(true)
    setMooringRowData(rowData.data)
  }

  const customerTableColumnStyle = {
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
    fontSize: '12px',
    color: '#000000',
  }

  const firstLastName = (data: any) => {
    return data.firstName + ' ' + data.lastName
  }

  const CustomerTableColumns = useMemo(
    () => [
      {
        id: 'customerId',
        label: 'Customer Id:',
        style: customerTableColumnStyle,
        sortable: false,
      },
      {
        id: 'customerTypeDto.type',
        label: 'Customer Type:',
        style: customerTableColumnStyle,
        sortable: true,
      },
      {
        id: 'firstName',
        label: 'Name:',
        body: firstLastName,
        style: customerTableColumnStyle,
        sortable: false,
      },

      {
        id: 'emailAddress',
        label: 'Email:',
        style: customerTableColumnStyle,
        sortable: false,
      },
      {
        id: 'phone',
        label: 'Phone:',
        style: customerTableColumnStyle,
        sortable: false,
      },
    ],
    [],
  )

  const MooringTableColumnStyle = {
    backgroundColor: '#FFFFFF',
    fontSize: '12px',
    color: '#000000',
    fontweight: '700',
  }

  const MooringTableColumn = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: MooringTableColumnStyle,
      },
      {
        id: 'mooringNumber',
        label: 'Mooring Name',
        style: MooringTableColumnStyle,
      },
      {
        id: 'gpsCoordinates',
        label: 'GPS Coordinates',
        style: MooringTableColumnStyle,
      },
    ],
    [],
  )

  const getCustomerData = useCallback(async () => {
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

      const response = await getCustomer(params).unwrap()
      const { status, content, message, totalSize } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        setCustomerData(content)
        setFilteredCustomerData(content)
        setCustomerId(content[0]?.id)
        setSelectedProduct(content[0])
        setTotalRecordsOne(totalSize)
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
    searchText,
    selectedCustomerId,
    pageSize,
    pageNumber,
    customerId,
    selectedProduct,
  ])

  const getCustomersWithMooring = async (id: number) => {
    setIsLoading(true)
    setIsLoader(true)
    try {
      let params: Params = {}
      if (pageNumberTwo) {
        params.pageNumber = pageNumberTwo
      }
      if (pageSizeTwo) {
        params.pageSize = pageSizeTwo
      }
      const response = await getCustomerWithMooring({
        id: id,
        pageNumber: pageNumberTwo,
        pageSize: pageSizeTwo,
      }).unwrap()
      const { status, content, message, totalSize } = response as CustomersWithMooringResponse
      if (
        status === 200 &&
        Array.isArray(content?.customerResponseDto?.mooringResponseDtoList) &&
        Array.isArray(content.boatyardNames)
      ) {
        setIsLoading(false)
        setIsLoader(false)
        setTotalRecordsTwo(totalSize)
        setCustomerRecordData(content?.customerResponseDto)
        setMooringData(content?.customerResponseDto?.mooringResponseDtoList)
        setBoatYardData(content?.boatyardNames)
        // const coordinatesString = customerRecordData?.mooringResponseDtoList[0]?.gpsCoordinates
        // const coordinateArray = coordinatesString?.split(' ').map(parseFloat)
        interface LatLngExpressionValue {
          lat: number
          lng: number
        }

        const gpsCoordinates = mooringData.map((item) => {
          const coordinatesString = item?.gpsCoordinates

          if (coordinatesString) {
            const coordinatesArray: number[] = coordinatesString.split(' ').map(parseFloat)

            if (coordinatesArray) {
              return {
                lat: coordinatesArray[0],
                lng: coordinatesArray[1],
              }
            } else {
              return null
            }
          } else {
            return null // or handle missing coordinates as needed
          }
        })

        setCoordinatesArray(gpsCoordinates.filter((coord) => coord !== null)) // Filter out null values
      } else {
        setIsLoading(false)
        setIsLoader(false)
        setCustomerRecordData('')
        setMooringData([])
        setBoatYardData([])
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      setIsLoading(false)
      setIsLoader(false)
      const { message: msg } = error as ErrorResponse
      console.error('Error fetching moorings data:', msg)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId, pageSize, pageNumber])

  useEffect(() => {
    if (customerId) {
      getCustomersWithMooring(customerId)
    }
  }, [pageNumberTwo, pageSizeTwo, customerId])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header="MOORMANAGE/Customer" />
      <Toast ref={toast} />

      <div className="flex justify-end mr-12 ">
        <div className="flex mt-6 ">
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
            icon={
              <img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />
            }
            children={
              <AddCustomer
                customer={selectedCustomer}
                mooringRowData={mooringRowData}
                editMode={editMode}
                editCustomerMode={editCustomerMode}
                editMooringMode={editMooringMode}
                closeModal={handleModalClose}
                getCustomer={getCustomerData}
                getCustomerRecord={() => {
                  if (customerId) {
                    getCustomersWithMooring(customerId)
                  }
                }}
                toastRef={toast}
              />
            }
            headerText={
              editMooringMode ? (
                <h1 className="text-xxl font-bold text-black ">Add Mooring</h1>
              ) : (
                <h1 className="text-xxl font-bold text-black ">Add Customer</h1>
              )
            }
            visible={modalVisible}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            dialogStyle={{
              width: '800px',
              minWidth: '800px',
              height: '600px',
              minHeight: '600px',
              borderRadius: '1rem',
              maxHeight: '95% !important',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-3">
        {/* Left Panel */}
        <div className="flex-grow bg-white rounded-xl border-[1px] border-[#D5E1EA] mb-4 ml-6 md:mb-0">
          {/* Header */}
          <div className="bg-[#10293A] rounded-tl-[10px] rounded-tr-[10px] text-white">
            <h1 className="p-4 text-xl font-extrabold">{properties.customerHeader}</h1>
          </div>

          <InputTextWithHeader
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by name, ID, phone no.... "
            inputTextStyle={{
              width: '100%',
              height: '44px',
              padding: '0 4rem 0 3rem',
              border: '1px solid #C5D9E0',
              fontSize: '16px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: 'rgb(242 242 242 / 0%)',
            }}
            borderBottom={{ border: '1px solid #D5E1EA' }}
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
            className={`bg-#00426F h-[590px] mt-[3px] ml-[15px] mr-[15px] table-container flex flex-col`}>
            <div className="flex-grow overflow-auto">
              <DataTableComponent
                data={customerData}
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  cursor: 'pointer',
                }}
                scrollable={false}
                columns={CustomerTableColumns}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                onRowClick={(rowData) => handleCustomerTableRowClick(rowData)}
                selectionMode="single"
                // sortable={true}
                onSelectionChange={(e) => {
                  setSelectedProduct(e.value)
                }}
                selection={selectedProduct}
                dataKey="id"
                rowStyle={(rowData) => rowData}
                emptyMessage={
                  <div className="flex flex-col justify-center items-center h-full">
                    <img src="/assets/images/empty.png" alt="Empty Data" className="w-28 mb-4" />
                    <p className="text-gray-500">No data available</p>
                  </div>
                }
              />
            </div>
            <div className="mt-auto">
              <Paginator
                first={pageNumber1}
                rows={pageSize}
                totalRecords={totalRecordsOne}
                rowsPerPageOptions={[5, 10, 20, 30]}
                onPageChange={onPageChange}
                style={{
                  backgroundColor: 'white',
                  borderTop: '1px solid #D5E1EA',
                  padding: '0.5rem',
                }}
              />
            </div>
          </div>
        </div>

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

        {/* middle container */}

        <div
          className={`min-w-[21vw] min-h[50vw] rounded-md border-[1px] ml-5 ${modalVisible || isLoading ? 'blur-screen' : ''}`}>
          <CustomMooringPositionMap
            position={initialPosition}
            zoomLevel={4}
            style={{ height: '730px' }}
            iconsByStatus={iconsByStatus}
            moorings={mooringData}
          />
        </div>

        {/* last container */}

        <div className="lg:flex-row ml-5 mr-6 w-[500px]">
          {/* Left Panel - Customer Record */}
          <div className="flex-grow rounded-md border bg-white">
            <div className="bg-[#10293A] rounded-t-[10px] flex justify-between pb-2">
              {/* <div className="flex items-center ml-3">
                <Avatar image={'/assets/images/user.png'} /> */}
              <div className="text-sm font-semibold rounded-t-md bg-gray-800">
                <h1 className="p-4 text-white">{'Customers Record'}</h1>
              </div>
              {/* </div> */}

              <div className="flex">
                <FaEdit
                  onClick={handleEdit}
                  className="mr-3 mt-[19px] text-[white]"
                  data-testid="FaEdit"
                  style={{ cursor: 'pointer' }}
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-white mr-2 mt-[19px] "
                  data-testid="RiDeleteBin5Fill"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>

            {customerRecordData ? (
              <div className="">
                <div className="flex gap-10 p-4 ">
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '16.41px',
                      color: '#000000',
                    }}>
                    <p>
                      <span className="">Customer Id: </span>
                      {customerRecordData?.customerId}
                    </p>
                    <p className="mt-4">
                      <span className="">Phone: </span>
                      {customerRecordData?.phone}
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '16.41px',
                      color: '#000000',
                      marginLeft: '40px',
                    }}>
                    <p>
                      <span className="">Name: </span>
                      {customerRecordData?.firstName + ' ' + customerRecordData?.lastName}
                    </p>
                    <p className="mt-4">
                      <span className="">Email: </span>
                      {customerRecordData?.emailAddress}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '16.41px',
                    color: '#000000',
                  }}>
                  <p className="ml-4">
                    <span className="address-label ">Address: </span>
                    {customerRecordData?.streetHouse +
                      ', ' +
                      customerRecordData?.aptSuite +
                      ', ' +
                      customerRecordData?.stateResponseDto?.name +
                      ', ' +
                      customerRecordData?.countryResponseDto?.name}
                  </p>
                  <p className="ml-4 mt-3">
                    <span className="address-label ">Notes: </span>
                    {customerRecordData?.note}
                  </p>

                  <div className="flex mt-2 ml-4 mb-3 overflow-x-auto">
                    <div className="mt-1">
                      <h1 className="">Boatyard: </h1>
                    </div>
                    <div className="flex gap-4 ml-2">
                      {boatYardData.map((boatyard, index) => (
                        <p
                          key={index}
                          style={{
                            borderRadius: '5px',
                            fontWeight: '400',
                            fontSize: '12px',
                            color: '#10293A',
                            backgroundColor: '#D5E1EA',
                            padding: '4px',
                          }}>
                          {boatyard}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center ">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-10 mx-auto mt-10 mb-3"
                />
                <p className="text-gray-500 mb-10">No data available</p>
              </div>
            )}
          </div>

          {isLoader && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '40%',
                left: '85%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}

          <div className="flex-grow bg-white rounded-md border">
            <div
              style={{
                backgroundColor: '#10293A',
                fontWeight: '700',
                color: 'white',
                padding: '14px',
                fontSize: '15px',
              }}>
              Moorings
            </div>

            <div
              className={`bg-#00426F overflow-x-hidden h-[450px] mt-[3px] ml-[15px] mr-[15px] table-container flex flex-col ${isLoading ? 'blur-screen' : ''}`}>
              <div className="flex-grow overflow-auto">
                <DataTableComponent
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                  scrollable
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#D9D9D9',
                    cursor: 'pointer',
                  }}
                  onRowClick={(rowData) => {
                    handleMooringTableRowClick(rowData)
                  }}
                  columns={MooringTableColumn}
                  data={mooringData}
                  selectionMode="single"
                  onSelectionChange={(e) => {
                    setSelectedMooring(e.value)
                  }}
                  selection={selectedMooring}
                  dataKey="id"
                  rowStyle={(rowData) => rowData}
                  emptyMessage={
                    <div className="flex-grow flex flex-col justify-center items-center">
                      <img src="/assets/images/empty.png" alt="Empty Data" className="w-20 mb-4" />
                      <p className="text-gray-500">No data available</p>
                    </div>
                  }
                />
              </div>
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

      {/* Dialog BOX */}
      <Dialog
        position="center"
        style={{
          width: '740px',
          minWidth: '300px',
          height: '503px',
          minHeight: '200px',
          borderRadius: '1rem',
          fontWeight: '400',
          maxHeight: '50% !important',
        }}
        draggable={false}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header={
          <div className="flex gap-4">
            <div className="font-bolder text-[black]">Mooring Information</div>
            <div className="font-bold mt-1">
              <FaEdit onClick={handleMooringEdit} color="#0098FF" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        }>
        <hr className="border border-[#000000] my-0 mx-0"></hr>

        <div
          style={{
            fontSize: '14px',
            fontWeight: '300',
            color: '#000000',
          }}
          className="flex leading-[3.50rem] gap-32 p-4">
          <div>
            <p>
              <span>ID: </span> {mooringRowData?.id}
            </p>
            <p>
              <span>Mooring Number: </span>
              {mooringRowData?.mooringNumber}
            </p>
            <p>
              <span>Boat Name: </span>
              {mooringRowData?.boatName}
            </p>
            <p>
              <span>Type: </span> {mooringRowData?.boatType?.boatType}
            </p>
            <p>
              <span>Size of Weight: </span>
              {mooringRowData?.sizeOfWeight}
            </p>
            <p>
              <span>Top Chain Condition: </span>
              {mooringRowData?.topChainCondition?.condition}
            </p>
            <p className="tracking-tighter">
              <span>Bottom Chain Condition: </span>
              {mooringRowData?.bottomChainCondition?.condition}
            </p>
            <p>
              <span>Pendant Condition: </span>
              {mooringRowData?.pendantCondition}
            </p>
          </div>
          <div>
            <p>
              <span>Harbor Area: </span> {mooringRowData?.harborOrArea}
            </p>
            <p>
              <span>G.P.S Coordinates: </span>
              {mooringRowData?.gpsCoordinates}
            </p>
            <p>
              <span>Boat Size: </span>
              {mooringRowData?.boatSize}
            </p>
            <p>
              <span>Weight: </span> {mooringRowData?.boatWeight}
            </p>
            <p>
              <span>Type of Weight: </span>
              {mooringRowData?.typeOfWeight?.type}
            </p>
            <p>
              <span>Condition of Eye: </span>
              {mooringRowData?.eyeCondition?.condition}
            </p>
            <p>
              <span>Shackle, Swivel Condition: </span>
              {mooringRowData?.shackleSwivelCondition?.condition}
            </p>
            <p>
              <span>Depth at Mean High Water: </span>
              {mooringRowData?.depthAtMeanHighWater}
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Customer
