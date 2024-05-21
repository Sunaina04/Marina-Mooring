import CustomModal from '../../CustomComponent/CustomModal'
import AddMoorings from './AddMoorings'
import React, { useState, useEffect, useMemo } from 'react'
import { useGetMooringsMutation } from '../../../Services/MoorManage/MoormanageApi'
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch'
import { MooringPayload, MooringResponse } from '../../../Type/ApiTypes'
import { FaCircle, FaEdit } from 'react-icons/fa'
import { Dialog } from 'primereact/dialog'
import { CustomerData, CustomerProps } from '../../../Type/CommonType'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import { properties } from '../../Utils/MeassageProperties'
import Header from '../../Layout/LayoutComponents/Header'
import { MooringsHeader } from '../../Utils/DataTableHeader'
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

  const handleInputChange = (e: InputSwitchChangeEvent) => {
    console.log(e.value)
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

  const tableColumnsStyle = {
    borderBottom: '1px solid #C0C0C0',
    fontWeight: '700',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  }

  const MooringColumns = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: tableColumnsStyle,
      },
      {
        id: 'mooringName',
        label: 'Mooring Name',
        style: tableColumnsStyle,
      },
      {
        id: 'gpsCoordinates',
        label: 'GPS Coordinates',
        style: tableColumnsStyle,
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
          fontWeight: '400',
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
          fontWeight: '400',
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
          fontWeight: '400',
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
    <>
      <Header header={properties.MoormanageMoorings} />
      <div className="flex justify-end mr-12 ">
        <div className="flex mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            children={<AddMoorings moorings={selectedCustomer} editMode={editMode} />}
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
            <div className="text-sm font-bold rounded-t-md bg-[#00426F]">
              <h1 className="p-4 text-white">Mooring</h1>
            </div>

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
          <div className="absolute top-72">
            <div className="rounded-md border-[1px] pb-1 border-gray-300 mt-16 ml-10 w-[17vw]  h-[16vh] bg-[#FFFFFF]">
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
          </div>

          <div className="absolute top-5 right-5 w-[25rem]">
            <div
              style={{
                width: '398px',
                height: '51px',
                border: '0.96 px solid #D5E1EA',
              }}
              className={`flex ${isChecked ? 'bg-[#00426F] rounded-tl-[5px] rounded-tr-[5px]' : 'bg-[#FFFFFF] rounded-xl'}  py-3 pl-4 `}>
              <div className="flex items-center fixed overflow-hidden">
                <span
                  className={`flex  text-[15px] font-[700] text-[#000000] ${isChecked ? 'text-[#FFFFFF] font-[700]' : ' '} `}>
                  Customers Record
                </span>
                {isChecked ? (
                  <span>
                    <FaEdit
                      className="ml-2"
                      style={{ color: 'white' }}
                      onClick={handleEdit}
                      data-testid="edit"
                    />
                  </span>
                ) : (
                  ''
                )}

                <InputSwitch
                  checked={isChecked}
                  onChange={handleInputChange}
                  className="border-none ml-20"
                  color="green"
                />
              </div>
            </div>

            {isChecked && (
              <div className="">
                <div className="bg-[#F2F2F2] px-2 h-36">
                  <div className="flex gap-20 text-[14px] ">
                    <div className=" mt-2 ">
                      <p className="text-[14px] font-[400]  text-[#000000]">ID:{edit.id}</p>
                      <p className="mt-4  w-40 text-[#000000] font-[400] ">Phone:{edit.phone}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-[14px] font-[400] mt-2 text-[#000000]">Name:{edit.name}</p>
                      <p className="text-[14px] font-[400] text-[#000000] mt-3">
                        Email:{edit.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-[14px] font-[400] mt-3 text-[#000000]">
                    <p>Address:{edit.address}</p>
                  </div>
                  <div className="text-[14px] mt-3">
                    <p>
                      Boatyard:
                      <span
                        style={{
                          backgroundColor: '#D5E1EA',
                          color: '#00426F',
                          fontSize: '13px',
                          padding: '5px',
                          width: '60px',
                          height: '25px',
                          borderRadius: '5px',
                        }}
                        className="ml-2">
                        Pioneer
                      </span>
                      <span
                        style={{
                          backgroundColor: '#D5E1EA',
                          color: '#00426F',
                          fontSize: '13px',
                          padding: '5px',
                          width: '60px',
                          height: '25px',
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
                          width: '60px',
                          height: '25px',
                          borderRadius: '5px',
                        }}
                        className=" ml-2">
                        Pioneer
                      </span>
                    </p>
                  </div>
                </div>

                <div className="">
                  <h3
                    className={`${isChecked ? 'bg-[#00426F] text-[#FFFFFF]' : ''} font-[700] text-[15px] h-12 py-4 pl-2 `}>
                    Moorings
                  </h3>
                  <div data-testid="customer-admin-users-table">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Moorings
