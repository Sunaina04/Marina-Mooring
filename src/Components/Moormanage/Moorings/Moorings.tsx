import CustomModal from '../../CustomComponent/CustomModal'
import AddMoorings from './AddMoorings'
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  useGetCustomersWithMooringMutation,
  useGetMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch'
import {
  CustomersWithMooringResponse,
  MooringPayload,
  MooringResponse,
  MooringResponseDtoList,
} from '../../../Type/ApiTypes'
import { FaCircle, FaEdit } from 'react-icons/fa'
import { Dialog } from 'primereact/dialog'
import { CustomerData, CustomerProps, Params } from '../../../Type/CommonType'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { Toast } from 'primereact/toast'
import { useSelector } from 'react-redux'
import { selectCustomerId } from '../../../Store/Slice/userSlice'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'
import CustomMooringPositionMap from '../../Map/CustomMooringPositionMap'

// const Moorings = () => {
//   return (
//     <>
//       <Header header={properties.MoormanageMoorings} />
//     </>
//   )
// }

const Moorings = () => {
  const userData = useSelector((state: any) => state.user?.userData)
  const role = userData?.role?.id
  const [modalVisible, setModalVisible] = useState(false)
  const [mooringData, setMooringData] = useState<MooringPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringResponseData, setMooringResponseData] = useState<any>()
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [mooringRowData, setMooringRowData] = useState()
  const [editMode, setEditMode] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [customerId, setCustomerId] = useState()
  const [rowClick, setRowClick] = useState(false)
  const [filteredMooringData, setFilteredMooringData] = useState<MooringPayload[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [selectedMooring, setSelectedMooring] = useState<MooringPayload>()
  const [customerMooringData, setCustomerMooringData] = useState<MooringResponseDtoList[]>([])

  const toast = useRef<Toast>(null)
  const [getMoorings] = useGetMooringsMutation()
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
    setEditMode(false)
  }

  const handleMooringRowClick = (rowData: any) => {
    setRowClick(true)
    setCustomerId(rowData?.customerId)
    getCustomersWithMooring(rowData?.customerId)
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
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
        id: 'mooringName',
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
        id: 'mooringName',
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
      const { status, content } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        setMooringData(content)
        setFilteredMooringData(content)
      }
    } catch (error) {
      console.error('Error fetching moorings data:', error)
    }
  }, [searchText, getMoorings])

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
      }
    } catch (error) {
      console.error('Error fetching moorings data:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getMooringsData()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [searchText])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header={properties.MoormanageMoorings} />
      <Toast ref={toast} />
      <div className="flex justify-end mr-12 ">
        <div className="flex mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddMoorings
                moorings={selectedCustomer}
                editMode={editMode}
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
              boxShadow: 'none',
              marginLeft: '8px',
            }}
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

      <div className="flex ml-12 gap-4 mt-10">
        <div>
          <div
            style={{
              width: '450px',
              height: '650px',
              top: '277px',
              left: '107px',
              gap: '0px',
              borderRadius: '5px',
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
                width: '400px',
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
            <div className="mt-2">{/* <hr style={{ border: ' 0.20px solid #D5E1EA' }} /> */}</div>

            <div className="mt-2">
              {mooringData.length > 0 ? (
                <DataTableComponent
                  data={mooringData}
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#D9D9D9',
                    cursor: 'pointer',
                  }}
                  scrollable={false}
                  columns={tableColumns}
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                  onRowClick={(row) => {
                    handleMooringRowClick(row.data)
                  }}
                />
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
        </div>

        <div
          className={`"relative mr-10" ${modalVisible} ? 'blur-screen' : ''`}
          style={{ height: '700px', width: '53vw' }}>
          <CustomMooringPositionMap
            position={[30.698, 76.657]}
            zoomLevel={10}
            style={{ height: '100%', width: '100%', display: modalVisible ? 'none' : '' }}
            // iconsByStatus={iconsByStatus}
            // @ts-expect-error
            moorings={mooringData}
          />
          <div className="absolute top-5 right-5 w-[25rem] max-w-full z-10">
            <div
              style={{
                maxWidth: '400px',
                height: '51px',
                border: '0.96 px solid #D5E1EA',
              }}
              className={`flex ${isChecked ? 'bg-[#00426F] rounded-tl-[5px] rounded-tr-[5px]' : 'bg-[#FFFFFF] rounded-xl'}  py-3 pl-4`}>
              <div className="flex ">
                <span
                  className={`flex  text-[15px] font-[700] text-[#000000] ${isChecked ? 'text-[#FFFFFF] font-[700]' : ' '} `}>
                  Customers Record
                </span>
                {isChecked ? (
                  <span>
                    <FaEdit
                      className="ml-4 mt-1"
                      style={{ color: 'white' }}
                      onClick={handleEdit}
                      data-testid="edit"
                    />
                  </span>
                ) : (
                  ''
                )}
                <div className="ml-auto">
                  <InputSwitch
                    checked={isChecked}
                    onChange={handleInputChange}
                    className="border-none ml-36 "
                    color="green"
                    style={{ cursor: rowClick ? 'pointer' : 'not-allowed' }}
                  />
                </div>
              </div>
            </div>

            {isChecked && (
              <div className="w-full">
                <div className="bg-[#FFFFFF] px-2" style={{ minHeight: '24vh' }}>
                  <div className="flex flex-wrap gap-20 text-[14px] ">
                    <div className=" mt-2 ">
                      <p className="text-[14px] font-[400]  text-[#000000]">
                        ID: {customerRecordData?.customerId}
                      </p>
                      <p className="mt-4  w-40 text-[#000000] font-[400] ">
                        Phone: {customerRecordData?.phone}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-[14px] font-[400] mt-2 text-[#000000]">
                        Name: {customerRecordData?.customerName}
                      </p>
                      <p className="text-[14px] font-[400] text-[#000000] mt-3">
                        Email: {customerRecordData?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <div className="text-[14px] font-[400] mt-3 text-[#000000]">
                    <p>
                      Address: {customerRecordData?.streetHouse} {customerRecordData?.aptSuite}
                      {', '}
                      {customerRecordData?.stateResponseDto?.name}
                      {', '}
                      {customerRecordData?.countryResponseDto?.name}
                    </p>
                  </div>
                  <div className="text-[14px] mt-4 pb-2 ">
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

                <div className="w-full">
                  <h3
                    className={`${isChecked ? 'bg-[#00426F] text-[#FFFFFF]' : ''} font-[700] text-[15px] h-12 py-3 pl-2 `}>
                    Moorings
                  </h3>

                  <div data-testid="customer-admin-users-table" className="overflow-x-auto">
                    <DataTableComponent
                      tableStyle={{
                        fontSize: '12px',
                        color: '#000000',
                        fontWeight: 600,
                        backgroundColor: '#FFFFFF',
                      }}
                      scrollable={true}
                      data={mooringResponseData}
                      columns={tableColumnsMoorings}
                    />
                  </div>

                  <Dialog
                    visible={isDialogVisible}
                    onHide={() => setIsDialogVisible(false)}
                    header={
                      <div className="flex gap-4">
                        <div className="font-bold">Mooring Information</div>
                        <div className="font-bold mt-1">
                          <FaEdit onClick={handleEdit} />
                        </div>
                      </div>
                    }>
                    <hr className="border border-black  my-0 mx-0"></hr>
                    {selectedMooring && (
                      <div className="flex flex-wrap leading-10 gap-4">
                        <div>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>ID:</span> {selectedMooring?.id}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Mooring No:</span>{' '}
                            {selectedMooring?.mooringNumber}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Boat Name:</span>{' '}
                            {selectedMooring?.boatName}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Type:</span>{' '}
                            {selectedMooring?.boatType?.boatType}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Size of Weight:</span>{' '}
                            {selectedMooring?.sizeOfWeight?.weight}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Top Chain Condition:</span>{' '}
                            {selectedMooring?.topChainCondition?.condition}
                          </p>
                          <p className="tracking-tighter">
                            <span style={{ fontWeight: 'bold' }}>Bottom Chain Condition:</span>{' '}
                            {selectedMooring?.bottomChainCondition?.condition}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Pennant Condition:</span>{' '}
                            {selectedMooring?.pennantCondition?.condition}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Water Depth:</span>{' '}
                            {selectedMooring?.waterDepth}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Harbor:</span>{' '}
                            {selectedMooring?.harbor}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>G.P.S Coordinates:</span>{' '}
                            {selectedMooring?.gpsCoordinates}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Boat Size:</span>{' '}
                            {selectedMooring?.boatSize}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Weight:</span>{' '}
                            {selectedMooring?.boatWeight}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Type of Weight:</span>{' '}
                            {selectedMooring?.typeOfWeight?.type}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Condition of Eye:</span>{' '}
                            {selectedMooring?.eyeCondition?.condition}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Shackle, Swivel Condition:</span>{' '}
                            {selectedMooring?.shackleSwivelCondition?.condition}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Dept at Mean High Water:</span>{' '}
                            {selectedMooring?.depthAtMeanHighWater}
                          </p>
                        </div>
                      </div>
                    )}
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Moorings
