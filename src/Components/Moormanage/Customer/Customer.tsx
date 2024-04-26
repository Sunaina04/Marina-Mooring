import { useEffect, useState } from 'react'
import CustomModal from '../../customComponent/CustomModal'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import AddCustomer from './AddCustomer'
import { InputText } from 'primereact/inputtext'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FaCircle } from 'react-icons/fa6'
import { Dialog } from 'primereact/dialog'
import Timeline from '../../customComponent/Timeline'
import {
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useGetMooringsMutation,
} from '../../../Services/MoorManage/moormanage'
import {
  CUSTOMER_PAYLOAD,
  CUSTOMER_RESPONSE,
  MOORING_PAYLOAD,
  MOORING_RESPONSE,
} from '../../../Services/MoorManage/types'
import { IoSearch } from 'react-icons/io5'
import DataTableSearchFieldComponent from '../../Common/ DataTableSearchFieldComponent'

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [customerData, setCustomerData] = useState<CUSTOMER_PAYLOAD[]>([])
  const [editMode, setEditMode] = useState(false)
  const [customerRecord, setCustomerRecord] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredCustomerData, setFilteredCustomerData] = useState<CUSTOMER_PAYLOAD[]>([])

  const [mooringData, setMooringData] = useState<MOORING_PAYLOAD[]>([])
  const [customerRowData, setCustomerRowData] = useState<MOORING_PAYLOAD>()
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
      const { status, content } = response as CUSTOMER_RESPONSE
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
    console.log('Delete clicked for:', rowData, rowData?.id)

    try {
      const response = await deleteCustomer({ id: rowData?.id })
      console.log('RESPONSE', response)
      getCustomerData()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const CustomersHeader = () => {
    return (
      <div className="">
        <div className="flex items-center">
          <div className="p-input-icon-left ">
            <IoSearch style={{ marginLeft: '1rem', color: '#A4A4A4' }} />
            <InputText
              placeholder="Search by name, ID,address..."
              className="h-[5vh] w-[55vh] cursor-pointer text-[0.65rem]
               text-[#A4A4A4]  border-1 border-[1px]
               border-[#9F9F9F] rounded-md pl-8" // Adjust padding to make space for the icon
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    )
  }

  const boatData= [
    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },
    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },
    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },
    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },

    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },
    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },

    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },

    {
      id: '#001',
      email: 'Jone@gmail.com',
      name: 'John Doe',
      phone: 9789756452,
    },
  ]
  const tableColumns = [
    {
      id: 'id',
      label: 'ID:',
      style: { width: '4vw', borderBottom: '1px solid #C0C0C0', backGroundColor: 'red' },
    },

    {
      id: 'name',
      label: 'Name:',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0' },
    },
    {
      id: 'email',
      label: 'Email:',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0' },
    },

    {
      id: 'phone',
      label: 'Phone:',
      style: { width: '6vw', borderBottom: '1px solid #C0C0C0' },
    },
  ]

  const getMooringsData = async () => {
    await getMoorings({})
      .unwrap()
      .then(async (response) => {
        const { status, content } = response as MOORING_RESPONSE
        if (status === 200 && Array.isArray(content)) {
          setMooringData(content)
        }
      })
  }

  useEffect(() => {
    getCustomerData()
    getMooringsData()
  }, [])

  console.log('selectedCustoer', selectedCustomer)

  // const actionButtons = [
  //   () => (
  //     <>
  //       <div className='flex gap-8'>

  //         <button  onClick={() => handleButtonClick()}>
  //           edit
  //         </button>

  //         <button onClick={() => handleButtonClick()}>
  //           delete
  //         </button>

  //       </div>

  //     </>
  //   ),

  // ];

  return (
    <>
      <div className="flex  items-center justify-between ml-3 mr-3 overflow-hidden">
        <div>
          <h1 className="mt-12 ml-8 opacity-30 text-2xl font-normal">MOORMANAGE/Customer</h1>
        </div>
        <div className="flex gap-4 mt-14 ml-[20.60rem]">
          <CustomModal
            label={'ADD NEW'}
            style={{
              width: '50vw',
              height: '80vh',
              backgroundColor: 'black',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: '1rem',
            }}
            onClick={handleButtonClick}
            visible={modalVisible || editMode}
            onHide={handleModalClose}>
            <AddCustomer
              customer={selectedCustomer}
              editMode={editMode || modalVisible}
              closeModal={handleModalClose}
              getCustomer={getCustomerData}
            />
          </CustomModal>
        </div>
      </div>

      <div className="flex ml-12 gap-4">
        <div className="bg-[F2F2F2] overflow-x-hidden overflow-y-scroll rounded-md border-[1px]  border-gray-300 w-[28vw] h-[70vh]">
          <div className="text-sm font-extrabold rounded-sm w-full  bg-[#D9D9D9]">
            <h1 className="p-4">Customers</h1>
          </div>

          <DataTableSearchFieldComponent
            data={boatData}
            tableStyle={{
              fontSize: '10px',
              color: '#000000',
              fontWeight: 600,
              backgroundColor: '#D9D9D9',
            }}
            scrollable={false}
            columns={tableColumns}
            header={CustomersHeader}
            // actionbuttons={actionButtons}
          />
        </div>

        {/* middle container */}
        <div className="relative w-[30vw]">
          <img
            src="/assets/images/Sea-img.png"
            className=" h-full object-cover rounded-md border-[1px] border-gray-300"
            alt="Sea Image"
          />

          <div className="absolute top-5 left-0" data-testid="timeline1">
            <Timeline />
          </div>
          <div className="absolute top-20 right-0" data-testid="timeline2">
            <Timeline />
          </div>

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
          </div>
        </div>

        {/* last container */}
        {selectedCustomer && customerRecord && (
          <div className="w-[30vw]">
            <div className="rounded-md border">
              <div className="bg-[#D9D9D9] flex justify-between pb-2">
                <div>
                  <p className="font-bold text-sm mt-3 ml-3">Customers Record</p>
                </div>
                <div className="flex">
                  <FaEdit onClick={handleEdit} className="mr-3 mt-3" data-testid="FaEdit" />
                  <RiDeleteBin5Fill
                    onClick={handleDelete}
                    className="text-red-500 mr-2 mt-3"
                    data-testid="RiDeleteBin5Fill"
                  />
                </div>
              </div>

              <div className="bg-[#F2F2F2] pt-2 px-3">
                <div className="flex gap-32 ">
                  <div className=" text-sm tracking-tighter">
                    <p>
                      <span className="font-bold">ID:</span>
                      {selectedCustomer.id}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span>
                      {selectedCustomer.phone}
                    </p>
                  </div>
                  <div className=" text-sm">
                    <p>
                      <span className="font-bold">Name:</span>
                      {selectedCustomer.customerName}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>
                      {selectedCustomer.email}
                    </p>
                  </div>
                </div>
                <div className="text-sm mt-2">
                  <p>
                    <span className="font-bold">Address:</span>
                    {selectedCustomer.address}
                  </p>
                </div>
                <div className="font-bold text-sm mt-2">
                  <p>
                    Boatyard:<span className="bg-[#D9D9D9] ml-2">Pioneer</span>{' '}
                    <span className="bg-[#D9D9D9] ml-2">02Pioneer</span>{' '}
                    <span className="bg-[#D9D9D9] ml-2">Pioneer</span>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '72vh' }} className="">
              <h3 className="bg-[#D9D9D9] font-bold py-2 pl-3">Moorings</h3>
              <DataTable
                tableStyle={{ minWidth: '20rem' }}
                className="bg[#F2F2F2]"
                value={mooringData}
                scrollable={true}
                selectionMode="single"
                style={{ overflow: 'scroll', maxHeight: '72vh' }}
                onRowSelect={(e) => {
                  setCustomerRowData(e.data)
                  setDialogVisible(true)
                }}>
                <Column
                  field="id"
                  header="ID"
                  headerClassName="text-sm"
                  style={{ fontSize: '0.75rem' }}
                />
                <Column field="mooringName" header="Mooring Name" style={{ fontSize: '0.75rem' }} />
                <Column
                  field="gpsCoordinates"
                  header="GPS Coordinate"
                  style={{ fontSize: '0.75rem' }}
                />
              </DataTable>
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
                {customerRowData && (
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
                        <span style={{ fontWeight: 'bold' }}>Type:</span>{' '}
                        {customerRowData?.boatType}
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
                        <span style={{ fontWeight: 'bold' }}>Harbor:</span>{' '}
                        {customerRowData?.harbor}
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
                )}
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Customer
