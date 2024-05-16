import { useEffect, useMemo, useState } from 'react'
import CustomModal from '../../CustomComponent/CustomModal'
import AddCustomer from './AddCustomer'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FaCircle } from 'react-icons/fa6'
import { Dialog } from 'primereact/dialog'

import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useGetMooringsMutation,
} from '../../../Services/MoorManage/MoormanageApi'
import {
  CustomerPayload,
  CustomerResponse,
  MooringPayload,
  MooringResponse,
} from '../../../Type/ApiTypes'

import InputTextWithHeader from '../../CommonComponent/Table/InputTextWithHeader'
import DataTableComponent from '../../CommonComponent/Table/DataTableComponent'
import Header from '../../Layout/LayoutComponents/Header'
const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [editMode, setEditMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(undefined)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerPayload[]>([])

  const [mooringData, setMooringData] = useState<MooringPayload[]>([])
  const [customerRowData, setCustomerRowData] = useState<MooringPayload>()
  const [dialogVisible, setDialogVisible] = useState(false)

  const [getCustomer] = useGetCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()

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
    const filteredData = customerData.filter((data) => {
      const id = typeof data.customerId === 'string' ? data.customerId.toLowerCase() : ''
      const customerName =
        typeof data.customerName === 'string' ? data.customerName.toLowerCase() : ''
      const emailAddress =
        typeof data.emailAddress === 'string' ? data.emailAddress.toLowerCase() : ''
      return (
        id.includes(query.toLowerCase()) ||
        customerName.includes(query.toLowerCase()) ||
        emailAddress.includes(query.toLowerCase())
      )
    })
    setFilteredCustomerData(filteredData)
  }

  const getCustomerData = async () => {
    try {
      const response = await getCustomer({}).unwrap()
      const { status, content } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setCustomerData(content)
        setFilteredCustomerData(content)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const handleEdit = (rowData: any) => {
    setSelectedCustomer(rowData)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    try {
      const response = await deleteCustomer({ id: rowData?.id })
      getCustomerData()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleCustomerTableRowClick = (rowData: any) => {
    setCustomerRecord(true)
    setSelectedCustomer(rowData.data)
  }

  const handleMooringTableRowClick = (rowData: any) => {
    setDialogVisible(true)
    setCustomerRowData(rowData.data)
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
  }

  const MooringTableColumn = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID:',
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

  const getMooringsData = async () => {
    try {
      const response = await getMoorings({}).unwrap()
      const { status, content } = response as MooringResponse
      if (status === 200 && Array.isArray(content)) {
        setMooringData(content)
      }
    } catch (error) {
      console.error('Error fetching moorings data:', error)
    }
  }

  useEffect(() => {
    getCustomerData()
    getMooringsData()
  }, [])

  return (
    <>
      <Header header="MOORMANAGE/Customer" />
      <div className="flex justify-end mr-12 ">
        <div className="flex mt-14 ">
          <CustomModal
            buttonText={'ADD NEW'}
            children={
              <AddCustomer
                customer={selectedCustomer}
                editMode={editMode || modalVisible}
                closeModal={handleModalClose}
                getCustomer={getCustomerData}
              />
            }
            headerText={<h1 className="text-xxl font-bold text-black ">Add Customer</h1>}
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

      <div className="flex ml-12 mt-48 gap-6 fixed">
        <div
          style={{
            width: '450px',
            height: '711px',
            top: '277px',
            left: '107px',
            gap: '0px',
            borderRadius: '10px',
            border: '1px solid #D5E1EA',
            opacity: '0px',
            backgroundColor: 'white',
          }}
          className="bg-[F2F2F2] overflow-x-hidden overflow-y-scroll ">
          <InputTextWithHeader
            headerStyle={{
              height: '55px',
              top: '294px',
              left: '124px',
              gap: '0px',
              opacity: '0px',
              color: '#FFFFFF',
              backgroundColor: '#10293A',
            }}
            header={'Customers'}
            placeholder={'Search by name, ID, mooring no, boat name, phone no.... '}
            iconStyle={{
              left: '10px',
              gap: '0px',
              opacity: '0px',
              color: '#10293A',
              fontWeight: '900',
              fontSize: '1.15rem',
              lineHeight: '16px',
              letterSpacing: '0.2px',
            }}
            inputTextStyle={{
              height: '44px',
              width: '400px',
              cursor: 'pointer',
              fontSize: '',
              color: '#D5E1EA',
              border: '1px solid #D5E1EA',
              paddingLeft: '35px',
              borderRadius: '5px',
            }}
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <div className="mt-2">
            <hr style={{ border: ' 0.20px solid #D5E1EA' }} />
          </div>

          <div className="mt-2 ">
            <DataTableComponent
              data={customerData}
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#D9D9D9',
              }}
              scrollable={false}
              columns={CustomerTableColumns}
              header={undefined}
              style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
              onRowClick={(rowData) => handleCustomerTableRowClick(rowData)}
            />
          </div>
        </div>

        {/* middle container */}
        <div className="relative w-[30vw]">
          <img
            src="/assets/images/map.png"
            className=" h-full object-cover rounded-md border-[1px] border-gray-300"
            alt="Sea Image"
          />
          <div className="absolute top-5 left-0" data-testid="timeline1">
            {/* <Timeline /> */}
          </div>
          <div className="absolute top-20 right-0" data-testid="timeline2">
            {/* <Timeline /> */}
          </div>
          {/* 
          <div className="absolute  translate-x-6 bottom-4  rounded-md border-[1px] pb-1 border-gray-300 w-[17vw]  mt-auto h-[13vh] bg-white">
            <p className="text-[0.7rem] ml-1 text-black">Status</p>
            <hr className="m-1 border-black" />
            <div className="flex justify-between">
              <div data-testid="Facircle">
                <FaCircle className="h-3 text-red-600 mt-1" />
                <FaCircle className="h-3 text-green-600 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black mt-1">Need inspection</p>
                <p className="text-[0.6rem] text-black tracking-tighter mt-[0.3rem]">
                  Gear On (in the water)
                </p>
              </div>
              <div className="ml-1">
                <FaCircle className="h-3 text-violet-600 mt-1 " />
                <FaCircle className="h-3 text-gray-500 mt-2" />
              </div>
              <div>
                <p className="text-[0.6rem] text-black tracking-tighter mt-1">
                  Gear Off (out of the water)
                </p>
                <p className="text-[0.6rem] text-black mt-[0.3rem]">Not in Use</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* last container */}

        {customerRecord && (
          <div
            style={{
              width: '450px',
              height: '711px',
              top: '277px',
              left: '107px',
              gap: '0px',
              borderRadius: '10px',
              border: '1px solid #D5E1EA',
              opacity: '0px',
              backgroundColor: 'white',
            }}
            className="w-[30vw]">
            <div className="rounded-md border">
              <div className="bg-[#10293A] rounded-r-md  rounded-l-md flex justify-between pb-2">
                <div className="text-sm font-bold rounded-t-md bg-[]">
                  <h1 className="p-4 text-white">{'Customers Record'}</h1>
                </div>
                <div className="flex">
                  <FaEdit
                    onClick={handleEdit}
                    className="mr-3 mt-3 text-[white]"
                    data-testid="FaEdit"
                  />
                  <RiDeleteBin5Fill
                    onClick={handleDelete}
                    className="text-white mr-2 mt-3"
                    data-testid="RiDeleteBin5Fill"
                  />
                </div>
              </div>

              <div className="">
                <div className="flex gap-40 p-4 ">
                  <div
                    className="right"
                    style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '16.41px',
                      color: '#000000',
                    }}>
                    <p>
                      <span className="">ID:</span>
                      {selectedCustomer.customerId}
                    </p>
                    <p className="mt-6">
                      <span className="">Phone:</span>
                      {selectedCustomer.phoneNumber}
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '16.41px',
                      color: '#000000',
                    }}
                    className="left">
                    <p>
                      <span>Name:</span>
                      {selectedCustomer.customerName}
                    </p>
                    <p className="mt-6">
                      <span className="">Email:</span>
                      {selectedCustomer.emailAddress}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="ml-4">
                    <span className="">Address:</span>
                    {selectedCustomer.Apt}
                  </p>

                  <div className="flex mt-4 ml-4 mb-3">
                    <div>
                      <h1>Boatyard:</h1>
                    </div>
                    <div className="flex gap-3">
                      <p
                        style={{
                          borderRadius: '5px',
                          fontWeight: '400',
                          fontSize: '12px',
                          color: '#10293A',
                          backgroundColor: '#D5E1EA',
                          padding: '5px',
                          marginLeft: '5px',
                        }}>
                        Pioneer
                      </p>

                      <p
                        style={{
                          borderRadius: '5px',
                          fontWeight: '400',
                          fontSize: '12px',
                          color: '#10293A',
                          backgroundColor: '#D5E1EA',
                          padding: '5px',
                        }}>
                        02Pioneer
                      </p>

                      <p
                        style={{
                          borderRadius: '5px',
                          fontWeight: '400',
                          fontSize: '12px',
                          color: '#10293A',
                          backgroundColor: '#D5E1EA',
                          padding: '5px',
                        }}>
                        03Pioneer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

            <div className="overflow-x-hidden overflow-y-scroll">
              <DataTableComponent
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 600,
                  backgroundColor: '#D9D9D9',
                }}
                onRowClick={(rowData) => {
                  handleMooringTableRowClick(rowData)
                }}
                columns={MooringTableColumn}
                data={mooringData}
              />

              {/* Dialog BOX */}
              <Dialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                header={
                  <div className="flex gap-4">
                    <div className="font-bold">Mooring Information</div>
                    <div className="font-bold mt-1">
                      <FaEdit onClick={handleEdit} />
                    </div>
                  </div>
                }>
                <hr className="border border-black  my-0 mx-0"></hr>

                <div className="flex leading-10 gap-4">
                  <div>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>ID:</span> {customerRowData?.id}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Mooring No:</span>{' '}
                      {customerRowData?.mooringNumber}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Boat Name:</span>{' '}
                      {customerRowData?.boatName}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Type:</span> {customerRowData?.boatType}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Size of Weight:</span>{' '}
                      {customerRowData?.sizeOfWeight}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Top Chain Condition:</span>{' '}
                      {customerRowData?.topChainCondition}
                    </p>
                    <p className="tracking-tighter">
                      <span style={{ fontWeight: 'bold' }}>Bottom Chain Condition:</span>{' '}
                      {customerRowData?.bottomChainCondition}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Pennant Condition:</span>{' '}
                      {customerRowData?.pennantCondition}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Water Depth:</span>{' '}
                      {customerRowData?.waterDepth}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Harbor:</span> {customerRowData?.harbor}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>G.P.S Coordinates:</span>{' '}
                      {customerRowData?.gpsCoordinates}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Boat Size:</span>{' '}
                      {customerRowData?.boatSize}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Weight:</span>{' '}
                      {customerRowData?.boatWeight}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Type of Weight:</span>{' '}
                      {customerRowData?.typeOfWeight}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Condition of Eye:</span>{' '}
                      {customerRowData?.conditionOfEye}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Shackle, Swivel Condition:</span>{' '}
                      {customerRowData?.shackleSwivelCondition}
                    </p>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>Dept at Mean High Water:</span>{' '}
                      {customerRowData?.deptAtMeanHighWater}
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Customer
