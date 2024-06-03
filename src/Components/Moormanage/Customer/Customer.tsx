import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddCustomer from './AddCustomer'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FaCircle } from 'react-icons/fa6'
import { Dialog } from 'primereact/dialog'

import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useGetCustomersWithMooringMutation,
  useGetMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import {
  CustomerPayload,
  CustomerResponse,
  CustomersWithMooringResponse,
  DeleteCustomerResponse,
  MooringPayload,
  MooringResponse,
  MooringResponseDtoList,
} from '../../../Type/ApiTypes'

import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import Header from '../../Layout/LayoutComponents/Header'
import { CustomersHeader, TechniciansHeader } from '../../Utils/DataTableHeader'
import { customerAdmin } from '../../Utils/CustomData'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import { MetaData, Params } from '../../../Type/CommonType'
import { Toast } from 'primereact/toast'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import CustomMooringPositionMap from '../../Map/CustomMooringPositionMap'
import { GearOffIcon, GearOnIcon, NeedInspectionIcon, NotInUseIcon } from '../../Map/DefaultIcon'

// const Customer = () => {
//   return (
//     <>
//       <Header header="MOORMANAGE/Customer" />
//     </>
//   )
// }

const Customer = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [editMode, setEditMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringData, setMooringData] = useState<MooringResponseDtoList[]>([])
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [mooringRowData, setMooringRowData] = useState<MooringPayload>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [customerId, setCustomerId] = useState()
  const [coordinatesArray, setCoordinatesArray] = useState()
  const [getCustomer] = useGetCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()
  const [getCustomerWithMooring] = useGetCustomersWithMooringMutation()
  const toast = useRef<Toast>(null)

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleEdit = (rowData: any) => {
    if (customerRecord == true) {
      setSelectedCustomer(customerRecordData)
      setModalVisible(true)
      setEditMode(true)
    }
  }

  const handleDelete = async (rowData: any) => {
    if (customerRecord == true) {
      try {
        const response = await deleteCustomer({ id: customerRecordData?.id }).unwrap()
        const { status, message } = response as DeleteCustomerResponse
        console.log(response)
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
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while deleting customer',
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
    setCustomerRecordData('')
  }

  const customerTableColumnStyle = {
    backgroundColor: '#FFFFFF',
    fontWeight: '700',
    fontSize: '10px',
    color: '#000000',
  }

  const CustomerTableColumns = useMemo(
    () => [
      {
        id: 'customerId',
        label: 'ID:',
        style: customerTableColumnStyle,
      },
      {
        id: 'customerName',
        label: 'Name:',
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
    fontSize: '10px',
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
        id: 'mooringName',
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
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }

      if (selectedCustomerId) {
        params.customerOwnerId = selectedCustomerId
      }

      const response = await getCustomer(params).unwrap()
      const { status, content, message } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setCustomerData(content)
        setFilteredCustomerData(content)
      } else {
        toast?.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }, [getCustomer, searchText, selectedCustomerId])

  const getCustomersWithMooring = async (id: number) => {
    try {
      const response = await getCustomerWithMooring({ id: id }).unwrap()
      const { status, content, message } = response as CustomersWithMooringResponse
      if (
        status === 200 &&
        Array.isArray(content?.customerResponseDto?.mooringResponseDtoList) &&
        Array.isArray(content.boatyardNames)
      ) {
        setCustomerRecordData(content?.customerResponseDto)
        setMooringData(content?.customerResponseDto?.mooringResponseDtoList)
        setBoatYardData(content?.boatyardNames)
        const coordinatesString = customerRecordData?.mooringResponseDtoList[0]?.gpsCoordinates
        const coordinateArray = coordinatesString?.split(' ').map(parseFloat)
        setCoordinatesArray(coordinateArray)
      } else {
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
      console.error('Error fetching moorings data:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerData()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId])

  const moorings = [
    { position: [30.698, 76.657], status: 'NeedInspection' },
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
        <div className="flex mt-8 ">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddCustomer
                customer={selectedCustomer}
                editMode={editMode}
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
            headerText={<h1 className="text-xxl font-bold text-black ">Add Customer</h1>}
            visible={modalVisible}
            onClick={handleButtonClick}
            onHide={handleModalClose}
            dialogStyle={{
              width: '800px',
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
        className="ml-[50px] gap-[19px] mt-10 "
        style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div
          data-testid="dataTable"
          className="flex-grow  bg-[#FFFFFF] rounded-xl border-[1px] border-[#D5E1EA] w-[515px] h-[705px] mb-0 ">
          <div className="text-sm font-extrabold rounded-sm w-full bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between bg-[#10293A] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.customerHeader}</h1>
            </div>
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

          <div className="bg-#00426F overflow-x-hidden overflow-y-scroll h-[500px] mt-[3px] ml-[15px] mr-[15px] table-container  ">
            {customerData.length === 0 ? (
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-28 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            ) : (
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
              />
            )}
          </div>
        </div>

        {/* middle container */}

        <div className="min-w-[20vw]">
          {/* <img
            src="/assets/images/map.png"
            className="w-[413px] h-full object-cover rounded-md border-[1px] border-gray-300"
            alt="Sea Image"
          /> */}
          <div className="max-w-[413px] rounded-md border-[1px]">
            <CustomMooringPositionMap
              position={coordinatesArray || [30.698, 76.657]}
              zoomLevel={10}
              style={{ height: '700px' }}
              iconsByStatus={iconsByStatus}
              // @ts-expect-error
              moorings={moorings}
            />
          </div>
        </div>

        {/* last container */}

        <div
          style={{
            top: '277px',
            left: '107px',
            gap: '0px',
            width: '413px',
            borderRadius: '10px',
            border: '1px solid #D5E1EA',
            opacity: '0px',
            backgroundColor: 'white',
            flexGrow: 1,
            marginRight: '40px',
          }}>
          <div className="rounded-md border">
            <div className="bg-[#10293A] rounded-r-md  rounded-l-md flex justify-between pb-2">
              <div className="text-sm font-semibold rounded-t-md bg-[]">
                <h1 className="p-4 text-white">{'Customers Record'}</h1>
              </div>
              <div className="flex">
                <FaEdit
                  onClick={handleEdit}
                  className="mr-3 mt-3 text-[white]"
                  data-testid="FaEdit"
                  style={{ cursor: customerRecord ? 'pointer' : 'not-allowed' }}
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-white mr-2 mt-3"
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
                      <span className="">ID: </span>
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
                    }}>
                    <p>
                      <span className="">Name: </span>
                      {customerRecordData?.customerName}
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
                    {customerRecordData?.aptSuite && <span>{customerRecordData?.aptSuite} </span>}
                    {customerRecordData?.streetHouse && (
                      <span>{customerRecordData?.streetHouse} </span>
                    )}
                    {customerRecordData?.city && <span>{customerRecordData?.city}, </span>}
                    {customerRecordData?.state && <span>{customerRecordData?.state}, </span>}
                    {customerRecordData?.country && <span>{customerRecordData?.country} </span>}
                  </p>

                  <div className="flex mt-5 ml-4 mb-3">
                    <div>
                      <h1 className="">Boatyard: </h1>
                    </div>
                    <div className="flex gap-3">
                      {boatYardData.map((boatyard, index) => (
                        <p
                          key={index}
                          style={{
                            borderRadius: '5px',
                            fontWeight: '400',
                            fontSize: '12px',
                            color: '#10293A',
                            backgroundColor: '#D5E1EA',
                            padding: '5px',
                            margin: '-5px 0px 05px 5px',
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
          <div>
            <p
              style={{
                backgroundColor: '#10293A',
                fontWeight: '700',
                color: 'white',
                padding: '14px',
                fontSize: '15px',
              }}>
              Moorings
            </p>
          </div>

          <div className="overflow-x-hidden overflow-y-scroll ">
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
              <DataTableComponent
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
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
              />
            )}

            {/* Dialog BOX */}
            <Dialog
              position="center"
              style={{
                width: '740px',
                minWidth: '300px',
                height: '470px',
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
                    <FaEdit onClick={handleEdit} color="#0098FF" />
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
                    <span>Mooring No: </span>
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
                    <span>Dept at Mean High Water: </span>
                    {mooringRowData?.depthAtMeanHighWater}
                  </p>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customer
