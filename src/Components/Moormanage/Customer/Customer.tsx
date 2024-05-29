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
import { Params } from '../../../Type/CommonType'
import { Toast } from 'primereact/toast'

// const Customer = () => {
//   return <></>
// }

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerPayload[]>([])
  const [editMode, setEditMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredCustomerData, setFilteredCustomerData] = useState<CustomerPayload[]>([])
  const [customerRecordData, setCustomerRecordData] = useState<any>()
  const [mooringData, setMooringData] = useState<MooringResponseDtoList[]>([])
  const [boatYardData, setBoatYardData] = useState<any[]>([])
  const [mooringRowData, setMooringRowData] = useState<MooringPayload>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

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

  const handleEdit = (rowData: any) => {
    console.log(customerRecordData)
    setSelectedCustomer(customerRecordData)
    setModalVisible(true)
    setEditMode(true)
  }

  const handleDelete = async (rowData: any) => {
    console.log(customerRecordData)
    try {
      const response = await deleteCustomer({ id: customerRecordData?.id })

      console.log(response)
      if (response) {
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        })
        getCustomerData()
      }
      setCustomerRecordData('')
    } catch (error) {
      console.error('Error deleting customer:', error)
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error deleting customer',
        life: 3000,
      })
    }
  }

  const handleCustomerTableRowClick = (rowData: any) => {
    setCustomerRecord(true)
    getCustomersWithMooring(rowData.data.id)
  }

  const handleMooringTableRowClick = (rowData: any) => {
    setDialogVisible(true)
    setMooringRowData(rowData.data)
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

      const response = await getCustomer(params).unwrap()
      const { status, content } = response as CustomerResponse
      if (status === 200 && Array.isArray(content)) {
        setCustomerData(content)
        setFilteredCustomerData(content)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }, [getCustomer, searchText])

  const getCustomersWithMooring = async (id: number) => {
    try {
      const response = await getCustomerWithMooring({ name: id }).unwrap()
      const { status, content } = response as CustomersWithMooringResponse
      if (
        status === 200 &&
        Array.isArray(content.customerResponseDto.mooringResponseDtoList) &&
        Array.isArray(content.boatyardNames)
      ) {
        setCustomerRecordData(content.customerResponseDto)
        setMooringData(content.customerResponseDto.mooringResponseDtoList)
        setBoatYardData(content.boatyardNames)
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
  }, [searchText])

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
                editMode={editMode || modalVisible}
                closeModal={handleModalClose}
                getCustomer={getCustomerData}
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
          className="flex-grow  bg-[#FFFFFF] rounded-xl border-[1px] border-[#D5E1EA] w-[515px] h-[650px] mb-0 ">
          <div className="text-sm font-extrabold rounded-sm w-full bg-[#D9D9D9]">
            <div
              className="flex  align-items-center justify-between bg-[#00426F] rounded-tl-[10px] rounded-tr-[10px]"
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
          <img
            src="/assets/images/map.png"
            className="w-[413px] h-full object-cover rounded-md border-[1px] border-gray-300"
            alt="Sea Image"
          />
          <div className="absolute top-5 left-0" data-testid="timeline1">
            {/* <Timeline /> */}
          </div>
          <div className="absolute top-20 right-0" data-testid="timeline2">
            {/* <Timeline /> */}
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
                />
                <RiDeleteBin5Fill
                  onClick={handleDelete}
                  className="text-white mr-2 mt-3"
                  data-testid="RiDeleteBin5Fill"
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
                      <span className="font-semibold">ID: </span>
                      {customerRecordData?.customerId}
                    </p>
                    <p className="mt-6">
                      <span className="font-semibold">Phone: </span>
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
                      <span className="font-semibold">Name: </span>
                      {customerRecordData?.customerName}
                    </p>
                    <p className="mt-6">
                      <span className="font-semibold">Email: </span>
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
                    <span className="address-label font-semibold">Address: </span>
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
                      <h1 className="font-semibold">Boatyard: </h1>
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
                    <span style={{ fontWeight: 'bold' }}>ID:</span> {mooringRowData?.id}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Mooring No:</span>{' '}
                    {mooringRowData?.mooringNumber}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Boat Name:</span>{' '}
                    {mooringRowData?.boatName}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Type:</span> {mooringRowData?.boatType}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Size of Weight:</span>{' '}
                    {mooringRowData?.sizeOfWeight}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Top Chain Condition:</span>{' '}
                    {mooringRowData?.topChainCondition}
                  </p>
                  <p className="tracking-tighter">
                    <span style={{ fontWeight: 'bold' }}>Bottom Chain Condition:</span>{' '}
                    {mooringRowData?.bottomChainCondition}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Pennant Condition:</span>{' '}
                    {mooringRowData?.pennantCondition}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Water Depth:</span>{' '}
                    {mooringRowData?.waterDepth}
                  </p>
                </div>
                <div>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Harbor:</span> {mooringRowData?.harbor}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>G.P.S Coordinates:</span>{' '}
                    {mooringRowData?.gpsCoordinates}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Boat Size:</span>{' '}
                    {mooringRowData?.boatSize}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Weight:</span> {mooringRowData?.boatWeight}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Type of Weight:</span>{' '}
                    {mooringRowData?.typeOfWeight}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Condition of Eye:</span>{' '}
                    {mooringRowData?.conditionOfEye}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Shackle, Swivel Condition:</span>{' '}
                    {mooringRowData?.shackleSwivelCondition}
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Dept at Mean High Water:</span>{' '}
                    {mooringRowData?.deptAtMeanHighWater}
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
