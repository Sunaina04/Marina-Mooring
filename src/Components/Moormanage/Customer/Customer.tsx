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
import { LatLngExpressionValue } from '../../../Type/Components/MapTypes'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import { Paginator } from 'primereact/paginator'

const Customer = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [editMode, setEditMode] = useState(false)
  const [editCustomerMode, setEditCustomerMode] = useState(false)
  const [editMooringMode, setEditMooringMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringData, setMooringData] = useState<MooringResponseDtoList[]>([])
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [mooringRowData, setMooringRowData] = useState<MooringPayload>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedMooring, setSelectedMooring] = useState()
  const [searchText, setSearchText] = useState('')
  const [customerId, setCustomerId] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [coordinatesArray, setCoordinatesArray] = useState<any[]>([])
  const [getCustomer] = useGetCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()
  const [getCustomerWithMooring] = useGetCustomersWithMooringMutation()
  const toast = useRef<Toast>(null)

  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageSize(event.rows)
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
    setSearchText(e.target.value)
  }

  const handleEdit = () => {
    if (customerRecord == true) {
      setSelectedCustomer(customerRecordData)
      setEditCustomerMode(true)
      setModalVisible(true)
      setEditMode(true)
    }
  }

  const handleMooringEdit = () => {
    setSelectedCustomer(customerRecordData)
    setEditMooringMode(true)
    setModalVisible(true)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    if (customerRecord == true) {
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

    setCustomerRecord(false)
  }

  const handleCustomerTableRowClick = (rowData: any) => {
    setCustomerRecord(true)
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
      },
      {
        id: 'firstName',
        label: 'Name:',
        body: firstLastName,
        style: customerTableColumnStyle,
      },

      {
        id: 'emailAddress',
        label: 'Email:',
        style: customerTableColumnStyle,
      },
      {
        id: 'phone',
        label: 'Phone:',
        style: customerTableColumnStyle,
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
        id: 'mooringId',
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
      const response = await getCustomer(params).unwrap()
      const { status, content, message } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        setCustomerData(content)
        setFilteredCustomerData(content)
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
  }, [getCustomer, searchText, selectedCustomerId])

  const parseCoordinates = (coordinates: any) => {
    if (!coordinates) return null
    const [latitude, longitude] = coordinates.split(' ').map(parseFloat)
    return isNaN(latitude) || isNaN(longitude) ? null : [latitude, longitude]
  }

  console.log('mooringData[0]?.gpsCoordinates', mooringData[0]?.gpsCoordinates)

  const [latitude, longitude] = parseCoordinates(mooringData[0]?.gpsCoordinates) || [34.089, 76.157]
  const getCustomersWithMooring = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await getCustomerWithMooring({ id: id }).unwrap()
      const { status, content, message } = response as CustomersWithMooringResponse
      if (
        status === 200 &&
        Array.isArray(content?.customerResponseDto?.mooringResponseDtoList) &&
        Array.isArray(content.boatyardNames)
      ) {
        setIsLoading(false)
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
          // console.log('coordinatesString', coordinatesString)

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

        // console.log('gpsCoordinates', gpsCoordinates)
        setCoordinatesArray(gpsCoordinates.filter((coord) => coord !== null)) // Filter out null values
      } else {
        setIsLoading(false)
        setCustomerRecord(false)
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
      const { message: msg } = error as ErrorResponse
      console.error('Error fetching moorings data:', msg)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId])

  const moorings = [
    { position: [30.698, 76.657], status: 'mooringStatus' },
    { position: [30.701, 76.66], status: 'NotInUse' },
    // Add more moorings as needed
  ]

  const iconsByStatus = {
    GearOn: GearOnIcon,
    GearOff: GearOffIcon,
    NeedInspection: NeedInspectionIcon,
    NotInUse: NotInUseIcon,
  }

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
              height: editCustomerMode ? '500px' : '630px',
              minHeight: editCustomerMode ? '500px' : '630px',
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
            className={`bg-#00426F overflow-x-hidden h-[500px] mt-[3px] ml-[15px] mr-[15px] table-container ${isLoading ? 'blur-screen' : ''}`}>
            {customerData.length === 0 ? (
              <>
                <div className="text-center mt-40">
                  <img
                    src="/assets/images/empty.png"
                    alt="Empty Data"
                    className="w-28 mx-auto mb-4"
                  />
                  <p className="text-gray-500">No data available</p>
                </div>

                <div className="card">
                  <Paginator
                    first={pageNumber}
                    rows={pageSize}
                    totalRecords={120}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                  />
                </div>
              </>
            ) : (
              <>
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
                  onSelectionChange={(e) => {
                    setSelectedProduct(e.value)
                  }}
                  selection={selectedProduct}
                  dataKey="id"
                  rowStyle={(rowData: any) => rowData}
                />
                <div className="card">
                  <Paginator
                    first={pageNumber}
                    rows={pageSize}
                    totalRecords={120}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                    // style={{marginTop:'15rem'}}
                  />
                </div>
              </>
            )}
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

        {/* <div
          className={`h-[150px] mt-[30px] mb-6 sticky ${isLoader || modalVisible ? 'blur-screen' : ''}`}
          style={{
            flexGrow: 1,
            border: '1px solid #D5E1EA',
            borderRadius: '10px',
            padding: '0px',
            marginLeft: '10px',
            marginRight: '10px',
          }}>
          <CustomDisplayPositionMap position={[latitude, longitude]} zoomLevel={10} />
        </div> */}

        {/* <div className="min-w-[20vw] min-h[50vw]"> */}
        <div
          className={`min-w-[20vw] min-h[50vw] rounded-md border-[1px] ml-5 ${modalVisible || isLoading ? 'blur-screen' : ''}`}>
          {/* <CustomDisplayPositionMap position={[latitude, longitude]} zoomLevel={10} /> */}

          <CustomMooringPositionMap
            position={[latitude, longitude]}
            zoomLevel={10}
            style={{ height: '732px' }}
            iconsByStatus={iconsByStatus}
            moorings={mooringData}
          />
        </div>
        {/* </div> */}

        {/* last container */}

        <div className="lg:flex-row ml-5 mr-6">
          {/* Left Panel - Customer Record */}
          <div className="flex-grow rounded-md border bg-white">
            <div className="bg-[#10293A] rounded-t-[10px] flex justify-between pb-2">
              <div className="text-sm font-semibold rounded-t-md bg-[]">
                <h1 className="p-4 text-white">{'Customers Record'}</h1>
              </div>
              <div className="flex">
                <FaEdit
                  onClick={handleEdit}
                  className="mr-3 mt-[19px] text-[white]"
                  data-testid="FaEdit"
                  style={{ cursor: customerRecord ? 'pointer' : 'not-allowed' }}
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-white mr-2 mt-[19px] "
                  data-testid="RiDeleteBin5Fill"
                  style={{ cursor: customerRecord ? 'pointer' : 'not-allowed' }}
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
                    <p className="mt-6">
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
                      marginLeft: '100px',
                    }}>
                    <p>
                      <span className="">Name: </span>
                      {customerRecordData?.firstName + ' ' + customerRecordData?.lastName}
                    </p>
                    <p className="mt-6">
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
                    {customerRecordData?.aptSuite +
                      ' ' +
                      customerRecordData?.streetHouse +
                      ' ' +
                      customerRecordData?.stateResponseDto?.name +
                      ' ' +
                      customerRecordData?.countryResponseDto?.name}
                  </p>

                  <div className="flex mt-5 ml-4 mb-3 overflow-x-auto">
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

            <div className="p-4">
              {mooringData.length === 0 ? (
                <div className="text-center mt-40">
                  <img
                    src="/assets/images/empty.png"
                    alt="Empty Data"
                    className="w-20 mx-auto mb-4"
                  />
                  <p className="text-gray-500">No data available</p>
                </div>
              ) : (
                <div className="overflow-auto">
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
                    rowStyle={(rowData: any) => rowData}
                  />
                </div>
              )}
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
              <span>Mooring ID: </span>
              {mooringRowData?.mooringId}
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
              {mooringRowData?.sizeOfWeight?.weight}
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
              <span>Pennant Condition: </span>
              {mooringRowData?.pennantCondition?.condition}
            </p>
            <p>
              <span>Water Depth: </span>
              {mooringRowData?.waterDepth}
            </p>
          </div>
          <div>
            <p>
              <span>Harbor: </span> {mooringRowData?.harbor}
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
