import CustomModal from '../../CustomComponent/CustomModal'
import AddMoorings from './AddMoorings'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useGetMooringsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch'
import { MooringPayload, MooringResponse } from '../../../Type/ApiTypes'
import { FaCircle, FaEdit } from 'react-icons/fa'
import { Dialog } from 'primereact/dialog'
import { CustomerData, CustomerProps } from '../../../Type/CommonType'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { Toast } from 'primereact/toast'
import CustomDisplayPositionMap from '../../Map/CustomDisplayPositionMap'

const Moorings = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [mooringData, setMooringData] = useState<MooringPayload[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredMooringData, setFilteredMooringData] = useState<MooringPayload[]>([])
  const [edit, setEdit] = useState<CustomerProps>({
    id: '#43453',
    name: 'John Smith',
    phone: '+1 234 543 4324',
    email: 'john@gmail.com',
    address: 'Suite 333 17529 Miller Spur South Ervinstad',
  })
  const [isChecked, setIsChecked] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [selectedMooring, setSelectedMooring] = useState<MooringPayload>()
  const toast = useRef<Toast>(null)

  const handleInputChange = (e: InputSwitchChangeEvent) => {
    setIsChecked(e.value)
  }

  const [getMoorings] = useGetMooringsMutation()

  const handleButtonClick = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    const filteredData = mooringData.filter((data) => {
      const id = typeof data.id === 'number' ? data.id.toString() : ''
      const customerName =
        typeof data.customerName === 'string' ? data.customerName.toLowerCase() : ''
      const gpsCoordinates =
        typeof data.gpsCoordinates === 'string' ? data.gpsCoordinates.toLowerCase() : ''
      return (
        id.includes(query.toLowerCase()) ||
        customerName.includes(query.toLowerCase()) ||
        gpsCoordinates.includes(query.toLowerCase())
      )
    })
    setFilteredMooringData(filteredData)
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

  const tableColumnsTechnicians = useMemo(
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

  const getMooringsData = async () => {
    try {
      const response = await getMoorings({}).unwrap()
      const { status, content } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        setMooringData(content)
        setFilteredMooringData(content)
      }
    } catch (error) {
      console.error('Error fetching moorings data:', error)
    }
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
  }

  useEffect(() => {
    getMooringsData()
  }, [])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Header header={properties.MoormanageMoorings} />
      <Toast ref={toast} />
      <div className="flex justify-end mr-12 ">
        <div className="flex mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddMoorings moorings={selectedCustomer} editMode={editMode} toastRef={toast} />
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
              headerStyle={{
                height: '55px',
                top: '294px',
                left: '124px',
                gap: '0px',
                opacity: '0px',
                color: '#FFFFFF',
                backgroundColor: '#00426F',
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
                color: '#D5E1EA',
                border: '1px solid #D5E1EA',
                paddingLeft: '40px',
                borderRadius: '5px',
                marginTop:'15px'
              }}
              onChange={handleSearchChange}
              value={searchQuery}
              borderBottom={{ border: '1px solid #D5E1EA' }}
            />
            <div className="mt-2">{/* <hr style={{ border: ' 0.20px solid #D5E1EA' }} /> */}</div>

            <div className="mt-2">
              {/* {filteredMooringData.length === 0 ? (
                <DataTableComponent
                  data={filteredMooringData}
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#D9D9D9',
                  }}
                  scrollable={false}
                  columns={MooringColumns}
                  header={MooringsHeader}
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                />
              ) : ( */}
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>

        <div className="relative mr-10 min-w-[20vw] max-w-[80vw]">
          <img
            src="/assets/images/map.png"
            className="bg-no-repeat object-cover bg-auto rounded-md w-full h-full"
            alt="Sea"
          />
          {/* <div>
          <CustomDisplayPositionMap position={[78.965768, 79.8097687]}/>
         </div> */}
          {/* <div className="absolute top-72">
            <div className=""></div>
            <div className="rounded-md border-[1px] pb-1 border-gray-300 mt-16 ml-10 w-[17vw]  h-[13vh] bg-[#FFFFFF]">
              <p className="text-[0.7rem] ml-1 text-black">Status</p>
              <hr className="m-1 border-black" />
              <div className="flex">
                <div>
                  <FaCircle className="h-3 text-red-600 mt-1" data-testid="Facircle1" />
                  <FaCircle className="h-3 text-green-600 mt-2" data-testid="Facircle2" />
                </div>
                <div>
                  <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                  <p className="text-[0.6rem] text-black tracking-tighter mt-[0.3rem]">
                    Gear On (in the water)
                  </p>
                </div>
                <div className="ml-1">
                  <FaCircle className="h-3 text-violet-600 mt-1 " data-testid="Facircle3" />
                  <FaCircle className="h-3 text-gray-500 mt-2" data-testid="Facircle4" />
                </div>
                <div>
                  <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                    Gear Off (out of the water)
                  </p>
                  <p className="text-[0.6rem] text-black mt-[0.3rem]">Not in Use</p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="absolute top-5 right-5 w-[25rem] max-w-full">
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
                <div className='ml-auto'>
                <InputSwitch
                  checked={isChecked}
                  onChange={handleInputChange}
                  className="border-none ml-36 "
                  color="green"
                />
                </div>
              </div>
            </div>

            {isChecked && (
              <div className="w-full">
                <div className="bg-[#F2F2F2] px-2" style={{minHeight:'24vh'}}>
                  <div className="flex flex-wrap gap-20 text-[14px] ">
                    <div className=" mt-2 ">
                      <p className="text-[14px] font-[400]  text-[#000000]">ID:{edit.id}</p>
                      <p className="mt-4  w-40 text-[#000000] font-[400] ">Phone:{edit.phone}</p>
                    </div>
                    <div className="">
                      <p className="text-[14px] font-[400] mt-2 text-[#000000]">Name:{edit.name}</p>
                      <p className="text-[14px] font-[400] text-[#000000] mt-3">
                        Email:{edit.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-[14px] font-[400] mt-3 text-[#000000]">
                    <p>Address:{edit.address}</p>
                  </div>
                  <div className="text-[14px] mt-4 pb-2 ">
                    <p>
                      Boatyard:
                      <span
                        style={{
                          backgroundColor: '#D5E1EA',
                          color: '#00426F',
                          fontSize: '13px',
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                        className="ml-2 inline-block">
                        Pioneer
                      </span>
                      <span
                        style={{
                          backgroundColor: '#D5E1EA',
                          color: '#00426F',
                          fontSize: '13px',
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                        className=" ml-2">
                        02Pioneer
                      </span>
                      <span
                        style={{
                          backgroundColor: '#D5E1EA',
                          color: '#00426F',
                          fontSize: '13px',
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                        className=" ml-2">
                        03Pioneer
                      </span>
                    </p>
                  </div>
                </div>

                <div className='w-full'>
                  <h3
                    className={`${isChecked ? 'bg-[#00426F] text-[#FFFFFF]' : ''} font-[700] text-[15px] h-12 py-3 pl-2 `}>
                    Moorings
                  </h3>

                  <div data-testid="customer-admin-users-table" className='overflow-x-auto'>
                    <DataTableComponent
                      tableStyle={{
                        fontSize: '12px',
                        color: '#000000',
                        fontWeight: 600,
                        backgroundColor: '#D9D9D9',
                      }}
                      scrollable={true}
                      data={undefined}
                      columns={tableColumnsTechnicians}
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
                            {selectedMooring?.boatType}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Size of Weight:</span>{' '}
                            {selectedMooring?.sizeOfWeight}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Top Chain Condition:</span>{' '}
                            {selectedMooring?.topChainCondition}
                          </p>
                          <p className="tracking-tighter">
                            <span style={{ fontWeight: 'bold' }}>Bottom Chain Condition:</span>{' '}
                            {selectedMooring?.bottomChainCondition}
                          </p>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>Pennant Condition:</span>{' '}
                            {selectedMooring?.pennantCondition}
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
                            {selectedMooring?.typeOfWeight}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Condition of Eye:</span>{' '}
                            {selectedMooring?.conditionOfEye}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Shackle, Swivel Condition:</span>{' '}
                            {selectedMooring?.shackleSwivelCondition}
                          </p>

                          <p>
                            <span style={{ fontWeight: 'bold' }}>Dept at Mean High Water:</span>{' '}
                            {selectedMooring?.deptAtMeanHighWater}
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
