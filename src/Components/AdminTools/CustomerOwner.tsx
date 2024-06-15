import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { CustomerPayload, DeleteCustomerResponse, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import { Params, Role } from '../../Type/CommonType'
import { useDeleteUserMutation, useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import './CustomerOwner.module.css'
import InputTextWithHeader from '../CommonComponent/Table/InputTextWithHeader'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomerId, setCustomerId, setCustomerName } from '../../Store/Slice/userSlice'
import { Paginator } from 'primereact/paginator'

const CustomerOwner = () => {
  const dispatch = useDispatch()
  const selectedCustomerId = useSelector(selectCustomerId)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [selectedCustomerUser, setSelectedCustomerUser] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [editCustomer, setEditCustomer] = useState(false)
  const [passWordDisplay, setPassWordDisplay] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [customerUpdated, setCustomerUpdated] = useState(false)
  const [customerAdminId, setCustomerAdminId] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchUsersText, setSearchUsersText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])
  const [selectedId, setSelectedId] = useState<any>('')
  const [selectedProduct, setSelectedProduct] = useState()
  const id = getCustomerOwnerData.map((items) => items.id)
  const [getUser] = useGetUsersMutation()
  const [deleteCustomerOwner] = useDeleteUserMutation()

  const toast = useRef<Toast>(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const onPageChange = (event: any) => {
    setPageNumber(event.page)
    setPageSize(event.rows)
  }

  const handleModalClose = () => {
    setPassWordDisplay(false)
    setModalVisible(false)
    setSelectedCustomerUser('')
    setSelectedCustomer('')
    setEditCustomer(false)
    setEditMode(false)
    setCustomerUpdated(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleUsersSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsersText(e.target.value)
  }

  const handleEditButtonClick = (rowData: any) => {
    setPassWordDisplay(true)
    setSelectedCustomer(rowData)
    setModalVisible(true)
    setEditCustomer(false)
    setEditMode(true)
  }

  const handleEditButtonUsersClick = (rowData: any) => {
    setSelectedCustomerUser(rowData)
    setPassWordDisplay(true)
    setEditCustomer(true)
    setModalVisible(true)
    // setEditMode(true)
  }

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 500,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
      {
        color: 'black',
        label: 'Disable',
        underline: true,
        fontWeight: 500,
        onClick: (rowData) => handleDeleteCustomerOwner(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #D5E1EA',
      color: '#000000',
      fontWeight: 500,
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const columnStyle = {
    borderBottom: '1px solid #D5E1EA',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 500,
  }

  const customerOwnerTableColumn = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: columnStyle,
      },
      {
        id: 'name',
        label: 'Name',
        style: columnStyle,
      },
      {
        id: 'phoneNumber',
        label: 'Phone',
        style: columnStyle,
      },
    ],
    [],
  )

  const ActionButtonUsersColumn: ActionButtonColumnProps = {
    header: 'Action',
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        fontWeight: 500,
        onClick: (rowData) => handleEditButtonUsersClick(rowData),
      },
      {
        color: 'black',
        label: 'Disable',
        underline: true,
        fontWeight: 500,
        onClick: (rowData) => handleDeleteCustomerOwnerUser(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #D5E1EA',
      color: '#000000',
      fontWeight: 500,
    },
    style: { borderBottom: '1px solid #D5E1EA' },
  }

  const customerOwnerUserTableColumnStyle = {
    borderBottom: '1px solid #D5E1EA',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontWeight: 500,
  }

  const customerOwnerUserTableColumn = useMemo(
    () => [
      { id: 'id', label: 'ID', style: customerOwnerUserTableColumnStyle },
      { id: 'name', label: 'Name', style: customerOwnerUserTableColumnStyle },
      { id: 'email', label: 'Email', style: customerOwnerUserTableColumnStyle },
      { id: 'phoneNumber', label: 'Phone', style: customerOwnerUserTableColumnStyle },
      { id: 'roleResponseDto.name', label: 'Role', style: customerOwnerUserTableColumnStyle },
    ],
    [],
  )

  const getUserHandler = useCallback(async () => {
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
      dispatch(setCustomerId(''))
      dispatch(setCustomerName(''))
      const response = await getUser(params).unwrap()
      const { status, message, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content)) {
        setIsLoading(false)
        if (content.length > 0) {
          setgetCustomerOwnerData(content)
        } else {
          setgetCustomerOwnerData([])
        }
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error)
    }
  }, [getUser, searchText, pageSize, pageNumber])

  const getCustomerAdminsUsers = useCallback(
    async (id: any) => {
      setIsLoading(true)
      try {
        let params: Params = {}
        if (searchUsersText) {
          params.searchText = searchUsersText
        }
        const response = await getUser(params).unwrap()
        const { status, message, content } = response as GetUserResponse
        if (status === 200 && Array.isArray(content)) {
          setIsLoading(false)
          if (content.length > 0) {
            setgetCustomerOwnerUserData(content)
            setSelectedRow(id)
            setCustomerAdminId(id)
          } else {
            setgetCustomerOwnerUserData([])
            setCustomerAdminId(id)
          }
        } else {
          setIsLoading(false)
          setgetCustomerOwnerUserData([])
        }
      } catch (error) {
        console.error('Error occurred while fetching customer data:', error)
      }
    },
    [getUser, searchUsersText],
  )

  const handleDeleteCustomerOwner = async (rowData: any) => {
    setIsLoading(true)
    try {
      let params: Params = {}
      if (rowData?.customerOwnerId) {
        params.customerOwnerId = rowData?.customerOwnerId
      }
      const response = await deleteCustomerOwner({
        userId: rowData?.id,
      }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
        getUserHandler()
        setIsLoading(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        })
      } else {
        setIsLoading(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
      getUserHandler()
    } catch (error) {
      setIsLoading(false)
      console.error('Error deleting customer:', error)
    }
  }

  const handleDeleteCustomerOwnerUser = async (rowData: any) => {
    setIsLoading(true)
    try {
      const response = await deleteCustomerOwner({
        userId: rowData?.id,
        customerOwnerId: rowData?.customerOwnerId,
      }).unwrap()
      const { status, message } = response as DeleteCustomerResponse
      if (status === 200) {
        getCustomerAdminsUsers(selectedCustomerId)
        setIsLoading(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
          life: 3000,
        })
      } else {
        setIsLoading(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: message,
          life: 3000,
        })
      }
      getCustomerAdminsUsers(selectedCustomerId)
    } catch (error) {
      setIsLoading(false)
      console.error('Error deleting customer:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUserHandler()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText, pageSize, pageNumber])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedCustomerId) {
        getCustomerAdminsUsers(selectedCustomerId)
      }
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchUsersText, selectedCustomerId])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Toast ref={toast} />
      <Header header="MOORMANAGE/Permission" customer={customerUpdated} />

      <div className="flex mr-12 justify-end ">
        {/* Commenting for now, will use later */}
        {/* <div className="mt-8 mr-5 relative">
          <Dropdown
            value={selectRole}
            onChange={(e) => setSelectRole(e.value)}
            options={rolesData}
            optionLabel="name"
            editable
            placeholder="Select Role"
            style={{
              width: '172px',
              height: '44px',
              minHeight: '44px',
              paddingLeft: '2rem',
              border: '1px solid #D5E1EA',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          />
          <img
            src="/assets/images/filter.svg"
            alt="filter Icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 h-4 w-4"
            style={{ cursor: 'pointer' }}
          />
        </div> */}

        <div className="mt-6">
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
            onHide={handleModalClose}
            dialogStyle={{
              width: '840px',
              minWidth: '840px',
              height: passWordDisplay ? '500px' : '600px',
              minHeight: passWordDisplay ? '500px' : '600px',
              borderRadius: '1rem',
              maxHeight: '60% !important',
            }}
            icon={
              <img src="/assets/images/Plus.png" alt="icon" className="w-3.8 h-3.8 ml-4 mb-0.5" />
            }
            children={
              <AddNewCustomer
                customerAdminId={customerAdminId ? customerAdminId : ''}
                customerData={selectedCustomerUser || selectedCustomer}
                editMode={editMode}
                editCustomerMode={editCustomer}
                getUser={getUserHandler}
                getCustomerUser={() => {
                  if (customerAdminId) {
                    getCustomerAdminsUsers(customerAdminId)
                  }
                }}
                closeModal={() => {
                  handleModalClose()
                }}
                setModalVisible={setModalVisible}
                setEditCustomer={setEditCustomer}
                setIsVisible={() => {}}
                passWordDisplay={passWordDisplay}
                customerUsers={getCustomerOwnerData}
                toastRef={toast}
                setSelectedCustomerUser={setSelectedCustomerUser}
                setSelectedCustomer={setSelectedCustomer}
                setSelectedCustomerUsers={setgetCustomerOwnerUserData}
                setIsCustomerUpdated={setCustomerUpdated}
              />
            }
            headerText={<span className="font-large text-2xl text-[#000000] ml-4">New User</span>}
            visible={modalVisible}
            onClick={() => {
              setEditMode(false)
              setModalVisible(true)
              setSelectedCustomerUser('')
              setSelectedCustomer('')
              setEditCustomer(false)
            }}
          />
        </div>
      </div>

      <div className={`flex gap-10 ml-8 mt-5 ${isLoading ? 'blur-screen' : ''}`}>
        <div
          style={{
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginLeft: '40px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomersOwner}</h1>
          </div>
          <InputTextWithHeader
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by name, ID, phone no.... "
            inputTextStyle={{
              width: '30vw',
              minWidth: '30vw',
              height: '44px',
              padding: '0 2rem 0 2.5rem',
              border: '1px solid #C5D9E0',
              fontSize: '14px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: '#FFFFFF',
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
            data-testid="customer-admin-data"
            style={{
              height: '600px',
              minHeight: 'calc(40vw - 600px)',
              overflow: 'auto',
            }}>
            {getCustomerOwnerData.length === 0 ? (
              <>
                <div className="text-center mt-40">
                  <img
                    src="/assets/images/empty.png"
                    alt="Empty Data"
                    className="w-32 mx-auto mb-4"
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
                  data={getCustomerOwnerData}
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#D9D9D9',
                    cursor: 'pointer',
                    marginLeft: '20px',
                    marginRight: '20px',
                    width: '30vw',
                    minWidth: '30vw',
                  }}
                  scrollable={true}
                  selectionMode="single"
                  onSelectionChange={(e) => {
                    setSelectedProduct(e.value)
                  }}
                  selection={selectedProduct}
                  dataKey="id"
                  rowStyle={(rowData: any) => rowData}
                  columns={customerOwnerTableColumn}
                  onRowClick={(e) => {
                    setSelectedId(e.data.id)
                    dispatch(setCustomerName(e?.data?.name))
                    dispatch(setCustomerId(e?.data?.id))
                  }}
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                  actionButtons={ActionButtonColumn}
                />
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
            )}
          </div>
        </div>

        <div
          className={`${isLoading ? 'blur-screen' : ''}`}
          style={{
            flexGrow: 1,
            borderRadius: '15px',
            border: '1px solid #D5E1EA',
            backgroundColor: '#FFFFFF',
            marginRight: '50px',
          }}>
          <div className="text-md font-semibold rounded-t-md bg-[#00426F]">
            <h1 className="p-4 text-white">{properties.CustomerOwnerUsers}</h1>
          </div>
          <InputTextWithHeader
            value={searchUsersText}
            onChange={handleUsersSearch}
            placeholder="Search by name, ID, Email, Role, phone no..."
            inputTextStyle={{
              flexGrow: 1,
              height: '44px',
              border: '1px solid #C5D9E0',
              padding: '0 2rem 0 2.5rem',
              fontSize: '14px',
              color: '#000000',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 400,
              backgroundColor: '#FFFFFF',
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
          {isLoading && (
            <ProgressSpinner
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
              }}
              strokeWidth="4"
            />
          )}
          <div
            style={{
              height: '600px',
              minHeight: 'calc(40vw - 600px)',
              overflow: 'auto',
              padding: '0 20px',
            }}
            data-testid="customer-admin-users-table">
            {getCustomerOwnerUserData.length > 0 ? (
              <>
                <DataTableComponent
                  tableStyle={{
                    fontSize: '12px',
                    color: '#000000',
                    fontWeight: 600,
                    backgroundColor: '#D9D9D9',
                    cursor: 'pointer',
                  }}
                  scrollable={true}
                  data={getCustomerOwnerUserData}
                  columns={customerOwnerUserTableColumn}
                  actionButtons={ActionButtonUsersColumn}
                  style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                />
                {/* <div className="card">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={120}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                  />
                </div> */}
              </>
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
    </div>
  )
}

export default CustomerOwner
