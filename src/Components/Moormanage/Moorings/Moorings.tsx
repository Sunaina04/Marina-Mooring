import CustomModal from '../../CustomComponent/CustomModal'
import AddMoorings from './AddMoorings'
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  useDeleteMooringsMutation,
  useGetCustomersWithMooringMutation,
  useGetMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { InputSwitchChangeEvent } from 'primereact/inputswitch'
import {
  CustomersWithMooringResponse,
  DeleteCustomerResponse,
  ErrorResponse,
  MooringPayload,
  MooringResponse,
  MooringResponseDtoList,
} from '../../../Type/ApiTypes'
import { FaEdit } from 'react-icons/fa'
import { Dialog } from 'primereact/dialog'
import { Params } from '../../../Type/CommonType'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { Toast } from 'primereact/toast'
import { useSelector } from 'react-redux'
import CustomMooringPositionMap from '../../Map/CustomMooringPositionMap'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { ProgressSpinner } from 'primereact/progressspinner'
import AddCustomer from '../Customer/AddCustomer'
import { selectCustomerId } from '../../../Store/Slice/userSlice'

const Moorings = () => {
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [mooringData, setMooringData] = useState<MooringPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringResponseData, setMooringResponseData] = useState<any>()
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [mooringRowData, setMooringRowData] = useState<MooringPayload>()
  const [mooringRecord, setMooringRecord] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedMooring, setSelectedMooring] = useState()
  const [searchText, setSearchText] = useState('')
  const [customerId, setCustomerId] = useState()
  const [mooringId, setMooringId] = useState()
  const [rowClick, setRowClick] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinatesArray, setCoordinatesArray] = useState()
  const [filteredMooringData, setFilteredMooringData] = useState<MooringPayload[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editCustomerMode, setEditCustomerMode] = useState(false)
  const [editMooringMode, setEditMooringMode] = useState(false)
  const [customerModalVisible, setCustomerModalVisible] = useState(false)
  const [customerMooringData, setCustomerMooringData] = useState<MooringResponseDtoList[]>([])

  const toast = useRef<Toast>(null)
  const [getMoorings] = useGetMooringsMutation()
  const [deleteMooring] = useDeleteMooringsMutation()
  const [getCustomerWithMooring] = useGetCustomersWithMooringMutation()

  const handleInputChange = (e: InputSwitchChangeEvent) => {
    if (rowClick) {
      setIsChecked(e.value)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setCustomerRecordData('')
    setCustomerMooringData([])
    setBoatYardData([])
    setMooringResponseData('')
  }

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setCustomerModalVisible(false)
    setDialogVisible(false)
    setEditCustomerMode(false)
    setEditMode(false)
  }

  const handleMooringRowClick = (rowData: any) => {
    setRowClick(true)
    setMooringRecord(true)
    setCustomerId(rowData?.customerId)
    setMooringId(rowData?.id)
    getCustomersWithMooring(rowData?.customerId)
  }

  const handleEdit = (rowData: any) => {
    if (mooringRecord == true) {
      setCustomerModalVisible(true)
      setSelectedCustomer(rowData)
      setEditCustomerMode(true)
      setEditMode(true)
    }
  }

  const handleDelete = async () => {
    if (mooringRecord == true) {
      try {
        const response = await deleteMooring({ id: mooringId }).unwrap()
        const { status, message } = response as DeleteCustomerResponse
        if (status === 200) {
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted successfully',
            life: 3000,
          })
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
        const { message } = error as ErrorResponse
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
    }
    setMooringRecord(false)
  }

  const handleMooringEdit = () => {
    setEditMode(true)
    setModalVisible(true)
    setSelectedCustomer(customerRecordData)
  }

  const tableColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID:',
        style: {
          width: '4vw',
          borderBottom: '1px solid #C0C0C0',
          fontWeight: '700',
          color: '#000000',
          backgroundColor: '#FFFFFF',
        },
      },
      {
        id: 'mooringId',
        label: 'Mooring Name:',
        style: {
          width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          fontWeight: '700',
          color: '#000000',
        },
      },
      {
        id: 'gpsCoordinates',
        label: 'GPS Coordinates:',
        style: {
          width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          fontWeight: '700',
          color: '#000000',
        },
      },
    ],
    [],
  )

  const tableColumnsMoorings = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID:',
        style: {
          width: '4vw',
          borderBottom: '1px solid #C0C0C0',
          fontWeight: '700',
          color: '#000000',
          fontSize: '10px',
          backgroundColor: '#FFFFFF',
        },
      },
      {
        id: 'mooringId',
        label: 'Mooring Name:',
        style: {
          width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          fontSize: '10px',
          fontWeight: '700',
          color: '#000000',
        },
      },
      {
        id: 'gpsCoordinates',
        label: 'GPS Coordinates:',
        style: {
          width: '6vw',
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#FFFFFF',
          fontSize: '10px',
          fontWeight: '700',
          color: '#000000',
        },
      },
    ],
    [],
  )

  const getMooringsData = useCallback(async () => {
    try {
      let params: Params = {}
      if (searchText) {
        params.searchText = searchText
      }
      const response = await getMoorings(params).unwrap()
      const { status, content, message } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        setMooringData(content)
        setFilteredMooringData(content)
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
      const { message } = error as ErrorResponse
      console.error('Error fetching moorings data:', error)
    }
  }, [searchText, getMoorings, selectedCustomerId])

  const getCustomersWithMooring = async (id: number) => {
    try {
      const response = await getCustomerWithMooring({ id: id }).unwrap()
      const { status, content } = response as CustomersWithMooringResponse
      if (
        status === 200 &&
        Array.isArray(content?.customerResponseDto?.mooringResponseDtoList) &&
        Array.isArray(content.boatyardNames)
      ) {
        setCustomerRecordData(content?.customerResponseDto)
        setCustomerMooringData(content?.customerResponseDto?.mooringResponseDtoList)
        setBoatYardData(content?.boatyardNames)
        setMooringResponseData(content?.customerResponseDto?.mooringResponseDtoList)
        const coordinatesString = customerRecordData?.mooringResponseDtoList[0]?.gpsCoordinates
        const coordinateArray = coordinatesString?.split(' ').map(parseFloat)
        setCoordinatesArray(coordinateArray)
      } else {
        setCustomerRecordData('')
        setMooringResponseData('')
      }
    } catch (error) {
      const { message } = error as ErrorResponse
      console.error('Error fetching moorings data:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMooringsData()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [searchText, selectedCustomerId])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header={properties.MoormanageMoorings} />
      <Toast ref={toast} />

      <div className="flex justify-end mr-12 ">
        <div className="flex mt-8">
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
              <AddMoorings
                moorings={selectedCustomer}
                mooringRowData={mooringRowData}
                editMode={editMode}
                editCustomerMode={editCustomerMode}
                toastRef={toast}
                closeModal={handleModalClose}
                getCustomer={getMooringsData}
                getCustomerRecord={() => {
                  if (customerId) {
                    getCustomersWithMooring(customerId)
                  }
                }}
              />
            }
            headerText={<h1 className="text-xxl font-bold text-black ">Add Mooring</h1>}
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
              className="flex  align-items-center justify-between bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
              style={{ color: '#FFFFFF' }}>
              <h1 className="p-4">{properties.customerMooringHeader}</h1>
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

          <div
            className={`bg-#00426F overflow-x-hidden h-[500px] mt-[3px] ml-[15px] mr-[15px] table-container ${isLoading ? 'blur-screen' : ''}`}>
            {mooringData.length === 0 ? (
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
                data={mooringData}
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                  cursor: 'pointer',
                }}
                scrollable={true}
                columns={tableColumns}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                onRowClick={(row) => {
                  handleMooringRowClick(row.data)
                }}
                selectionMode="single"
                onSelectionChange={(e) => {
                  setSelectedProduct(e.value)
                }}
                selection={selectedProduct}
                dataKey="id"
                rowStyle={(rowData: any) => rowData}
              />
            )}
          </div>
        </div>
        {isLoading && (
          <ProgressSpinner
            style={{
              position: 'absolute',
              top: '50%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
            }}
            strokeWidth="4"
          />
        )}

        {/* middle container */}

        <div className="min-w-[20vw]">
          <div
            className={`max-w-[413px] rounded-md border-[1px] ${modalVisible || isLoading ? 'blur-screen' : ''}`}>
            <CustomMooringPositionMap
              position={[30.698, 76.657]}
              zoomLevel={10}
              style={{ height: '700px' }}
              moorings={mooringData}
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
            <div className="bg-[#00426F] rounded-t-[10px] flex justify-between pb-2">
              <div className="text-sm font-semibold rounded-t-md bg-[]">
                <h1 className="p-4 text-white">{'Customers Record'}</h1>
              </div>
              <div className="flex">
                <FaEdit
                  onClick={handleEdit}
                  className="mr-3 mt-[19px] text-[white]"
                  data-testid="FaEdit"
                  style={{ cursor: mooringRecord ? 'pointer' : 'not-allowed' }}
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-white mr-2 mt-[19px] "
                  data-testid="RiDeleteBin5Fill"
                  style={{ cursor: mooringRecord ? 'pointer' : 'not-allowed' }}
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
                <p className="text-gray-500 font-bold text-lg mb-10">No data available</p>
              </div>
            )}
          </div>

          <div>
            <p
              style={{
                backgroundColor: '#00426F',
                fontWeight: '700',
                color: 'white',
                padding: '14px',
                fontSize: '15px',
              }}>
              Moorings
            </p>
          </div>

          <div className=" ">
            <div style={{ height: '400px', overflow: 'auto' }}>
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
                data={mooringResponseData}
                columns={tableColumnsMoorings}
                onRowClick={(rowData: any) => {
                  setDialogVisible(true)
                  setMooringRowData(rowData.data)
                }}
                selectionMode="single"
                onSelectionChange={(e) => {
                  setSelectedMooring(e.value)
                }}
                selection={selectedMooring}
                dataKey="id"
                rowStyle={(rowData: any) => rowData}
                emptyMessage={
                  <div className="text-center mt-40">
                    <img
                      src="/assets/images/empty.png"
                      alt="Empty Data"
                      className="w-20 mx-auto mb-4"
                    />
                    <p className="text-gray-500 text-lg">No data available</p>
                  </div>
                }
              />
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
                    <FaEdit
                      onClick={handleMooringEdit}
                      color="#0098FF"
                      style={{ cursor: 'pointer' }}
                    />
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
        </div>
      </div>

      {customerModalVisible && (
        <CustomModal
          button={true}
          children={
            <AddCustomer
              customer={customerRecordData}
              mooringRowData={mooringRowData}
              editMode={editMode}
              editCustomerMode={editCustomerMode}
              editMooringMode={false}
              closeModal={handleModalClose}
              getCustomer={getMooringsData}
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
          visible={customerModalVisible}
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
      )}
    </div>
  )
}

export default Moorings

{
  /* <div className="flex ml-12 gap-4 mt-10"> */
}
{
  /* <div>
  <div
    style={{
      width: '680px',
      height: '680px',
      top: '277px',
      left: '107px',
      gap: '0px',
      borderRadius: '10px',
      border: '1px solid #D5E1EA',
      opacity: '0px',
      backgroundColor: 'white',
    }}
    className="bg-[F2F2F2]">
    <InputTextWithHeader
      value={searchText}
      onChange={handleSearch}
      headerStyle={{
        height: '70px',
        top: '294px',
        left: '124px',
        gap: '0px',
        opacity: '0px',
        color: '#FFFFFF',
        backgroundColor: '#00426F',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      }}
      header={'Moorings'}
      placeholder={'Search by name, ID, mooring no, boat name, phone no.... '}
      iconStyle={{
        position: 'absolute',
        left: '15px',
        top: '65%',
        transform: 'translateY(-50%)',
        width: '18px',
        height: '18px',
      }}
      inputTextStyle={{
        height: '44px',
        width: '635px',
        cursor: 'pointer',
        fontSize: '',
        color: '#000000',
        border: '1px solid #D5E1EA',
        paddingLeft: '40px',
        borderRadius: '5px',
        marginTop: '15px',
      }}
      borderBottom={{ border: '1px solid #D5E1EA' }}
    />

    <div className={`mt-2 ${isLoading ? 'blur-screen' : ''}`}>
      {mooringData.length > 0 ? (
        <div className=" overflow-y-auto">
          <DataTableComponent
            data={mooringData}
            tableStyle={{
              fontSize: '12px',
              color: '#000000',
              fontWeight: 600,
              backgroundColor: '#D9D9D9',
              cursor: 'pointer',
            }}
            scrollable={true}
            columns={tableColumns}
            style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
            onRowClick={(row) => {
              handleMooringRowClick(row.data)
            }}
          />
        </div>
      ) : (
        <div className="text-center mt-40">
          <img
            src="/assets/images/empty.png"
            alt="Empty Data"
            className="w-32 mx-auto mb-4"
          />
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  </div>
</div> */
}

// {isLoading && (
//   <ProgressSpinner
//     style={{
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: '50px',
//       height: '50px',
//     }}
//     strokeWidth="4"
//   />
// )}

{
  /* <div className="">
  <div
    className={` rounded-md border-[1px] ${modalVisible || isLoading ? 'blur-screen' : ''}`}>
    <CustomMooringPositionMap
      position={[30.698, 76.657]}
      zoomLevel={10}
      style={{ height: '680px', width: '400px' }}
      moorings={mooringData}
    />
  </div>
</div> */
}

// <div
//   style={{
//     top: '277px',
//     left: '107px',
//     gap: '0px',
//     width: '413px',
//     borderRadius: '10px',
//     border: '1px solid #D5E1EA',
//     opacity: '0px',
//     backgroundColor: 'white',
//     flexGrow: 1,
//     marginRight: '40px',
//   }}>
//   <div className="rounded-md border">
//     <div className="bg-[#00426F] rounded-t-[10px] flex justify-between pb-2">
//       <div className="text-sm font-semibold rounded-t-md bg-[]">
//         <h1 className="p-4 text-white">{'Customers Record'}</h1>
//       </div>
//       <div className="flex">
//         <FaEdit
//           onClick={handleEdit}
//           className="mr-3 mt-[19px] text-[white]"
//           data-testid="FaEdit"
//           style={{ cursor: mooringRecord ? 'pointer' : 'not-allowed' }}
//         />
//         <RiDeleteBin5Fill
//           onClick={handleDelete}
//           className="text-white mr-2 mt-[19px] "
//           data-testid="RiDeleteBin5Fill"
//           style={{ cursor: mooringRecord ? 'pointer' : 'not-allowed' }}
//         />
//       </div>
//     </div>

//     {customerRecordData ? (
//       <div className="">
//         <div className="flex gap-10 p-4 ">
//           <div
//             style={{
//               fontSize: '14px',
//               fontWeight: '400',
//               lineHeight: '16.41px',
//               color: '#000000',
//             }}>
//             <p>
//               <span className="">ID: </span>
//               {customerRecordData?.customerId}
//             </p>
//             <p className="mt-6">
//               <span className="">Phone: </span>
//               {customerRecordData?.phone}
//             </p>
//           </div>

//           <div
//             style={{
//               fontSize: '14px',
//               fontWeight: '400',
//               lineHeight: '16.41px',
//               color: '#000000',
//             }}>
//             <p>
//               <span className="">Name: </span>
//               {customerRecordData?.customerName}
//             </p>
//             <p className="mt-6">
//               <span className="">Email: </span>
//               {customerRecordData?.emailAddress}
//             </p>
//           </div>
//         </div>
//         <div
//           style={{
//             fontSize: '14px',
//             fontWeight: '400',
//             lineHeight: '16.41px',
//             color: '#000000',
//           }}>
//           <p className="ml-4">
//             <span className="address-label ">Address: </span>
//             {customerRecordData?.aptSuite && <span>{customerRecordData?.aptSuite} </span>}
//             {customerRecordData?.streetHouse && (
//               <span>{customerRecordData?.streetHouse} </span>
//             )}
//             {customerRecordData?.stateResponseDto?.name && (
//               <span>{customerRecordData?.stateResponseDto?.name}, </span>
//             )}
//             {customerRecordData?.countryResponseDto?.name && (
//               <span>{customerRecordData?.countryResponseDto?.name} </span>
//             )}
//           </p>

//           <div className="flex mt-5 ml-4 mb-3 overflow-x-auto">
//             <div className="mt-1">
//               <h1 className="">Boatyard: </h1>
//             </div>
//             <div className="flex gap-4 ml-1">
//               {boatYardData.map((boatyard, index) => (
//                 <p
//                   key={index}
//                   style={{
//                     borderRadius: '5px',
//                     fontWeight: '400',
//                     fontSize: '12px',
//                     color: '#10293A',
//                     backgroundColor: '#D5E1EA',
//                     padding: '4px',
//                   }}>
//                   {boatyard}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="text-center ">
//         <img
//           src="/assets/images/empty.png"
//           alt="Empty Data"
//           className="w-10 mx-auto mt-10 mb-3"
//         />
//         <p className="text-gray-500 mb-10">No data available</p>
//       </div>
//     )}
//   </div>

//   <div>
//     <p
//       style={{
//         backgroundColor: '#00426F',
//         fontWeight: '700',
//         color: 'white',
//         padding: '14px',
//         fontSize: '15px',
//       }}>
//       Moorings
//     </p>
//   </div>

//   <div className=" ">
//     {mooringData.length === 0 ? (
//       <div className="text-center mt-40">
//         <img
//           src="/assets/images/empty.png"
//           alt="Empty Data"
//           className="w-20 mx-auto mb-4"
//         />
//         <p className="text-gray-500">No data available</p>
//       </div>
//     ) : (
//       <div style={{ height: '400px', overflow: 'auto' }}>
//         <DataTableComponent
//           style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
//           scrollable
//           tableStyle={{
//             fontSize: '12px',
//             color: '#000000',
//             fontWeight: 600,
//             backgroundColor: '#D9D9D9',
//             cursor: 'pointer',
//           }}
//           data={mooringResponseData}
//           columns={tableColumnsMoorings}
//           onRowClick={(rowData: any) => {
//             setDialogVisible(true)
//             setMooringRowData(rowData.data)
//           }}
//           emptyMessage={
//             <div className="text-center mt-40">
//               <img
//                 src="/assets/images/empty.png"
//                 alt="Empty Data"
//                 className="w-28 mx-auto mb-4"
//               />
//               <p className="text-gray-500">No data available</p>
//             </div>
//           }
//         />
//       </div>
//     )}

//     {/* Dialog BOX */}
//     <Dialog
//       position="center"
//       style={{
//         width: '740px',
//         minWidth: '300px',
//         height: '503px',
//         minHeight: '200px',
//         borderRadius: '1rem',
//         fontWeight: '400',
//         maxHeight: '50% !important',
//       }}
//       draggable={false}
//       visible={dialogVisible}
//       onHide={() => setDialogVisible(false)}
//       header={
//         <div className="flex gap-4">
//           <div className="font-bolder text-[black]">Mooring Information</div>
//           <div className="font-bold mt-1">
//             <FaEdit
//               onClick={handleMooringEdit}
//               color="#0098FF"
//               style={{ cursor: 'pointer' }}
//             />
//           </div>
//         </div>
//       }>
//       <hr className="border border-[#000000] my-0 mx-0"></hr>

//       <div
//         style={{
//           fontSize: '14px',
//           fontWeight: '300',
//           color: '#000000',
//         }}
//         className="flex leading-[3.50rem] gap-32 p-4">
//         <div>
//           <p>
//             <span>ID: </span> {mooringRowData?.id}
//           </p>
//           <p>
//             <span>Mooring ID: </span>
//             {mooringRowData?.mooringId}
//           </p>
//           <p>
//             <span>Boat Name: </span>
//             {mooringRowData?.boatName}
//           </p>
//           <p>
//             <span>Type: </span> {mooringRowData?.boatType?.boatType}
//           </p>
//           <p>
//             <span>Size of Weight: </span>
//             {mooringRowData?.sizeOfWeight?.weight}
//           </p>
//           <p>
//             <span>Top Chain Condition: </span>
//             {mooringRowData?.topChainCondition?.condition}
//           </p>
//           <p className="tracking-tighter">
//             <span>Bottom Chain Condition: </span>
//             {mooringRowData?.bottomChainCondition?.condition}
//           </p>
//           <p>
//             <span>Pennant Condition: </span>
//             {mooringRowData?.pennantCondition?.condition}
//           </p>
//           <p>
//             <span>Water Depth: </span>
//             {mooringRowData?.waterDepth}
//           </p>
//         </div>
//         <div>
//           <p>
//             <span>Harbor: </span> {mooringRowData?.harbor}
//           </p>
//           <p>
//             <span>G.P.S Coordinates: </span>
//             {mooringRowData?.gpsCoordinates}
//           </p>
//           <p>
//             <span>Boat Size: </span>
//             {mooringRowData?.boatSize}
//           </p>
//           <p>
//             <span>Weight: </span> {mooringRowData?.boatWeight}
//           </p>
//           <p>
//             <span>Type of Weight: </span>
//             {mooringRowData?.typeOfWeight?.type}
//           </p>
//           <p>
//             <span>Condition of Eye: </span>
//             {mooringRowData?.eyeCondition?.condition}
//           </p>
//           <p>
//             <span>Shackle, Swivel Condition: </span>
//             {mooringRowData?.shackleSwivelCondition?.condition}
//           </p>
//           <p>
//             <span>Depth at Mean High Water: </span>
//             {mooringRowData?.depthAtMeanHighWater}
//           </p>
//         </div>
//       </div>
//     </Dialog>
//   </div>
// </div>
// </div>
