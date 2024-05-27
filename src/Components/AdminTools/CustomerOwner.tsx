import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import { properties } from '../Utils/MeassageProperties'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { CustomerPayload, GetUserResponse } from '../../Type/ApiTypes'
import Header from '../Layout/LayoutComponents/Header'
import { Role } from '../../Type/CommonType'
import { useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import './CustomerOwner.module.css'
import InputTextWithHeader from '../CommonComponent/Table/InputTextWithHeader'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'

const CustomerOwner = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [selectedCustomerUser, setSelectedCustomerUser] = useState<any>()
  const [editMode, setEditMode] = useState(false)
  const [editCustomer, setEditCustomer] = useState(false)
  const [isRowClick, setIsRowClick] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>()
  const [rolesData, setRolesData] = useState<Role[]>()
  const [selectRole, setSelectRole] = useState()
  const [customerAdminId, setCustomerAdminId] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchUsersText, setSearchUsersText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [getCustomerOwnerData, setgetCustomerOwnerData] = useState<CustomerPayload[]>([])
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])

  const [getUser] = useGetUsersMutation()

  const toast = useRef<Toast>(null)

  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedCustomerUser('')
    setSelectedCustomer('')
    setEditCustomer(false)
    setEditMode(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleUsersSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsersText(e.target.value)
  }

  const handleEditButtonClick = (rowData: any) => {
    setSelectedCustomer(rowData)
    setModalVisible(true)
    setEditCustomer(true)
    setEditMode(true)
  }

  const handleEditButtonUsersClick = (rowData: any) => {
    setSelectedCustomerUser(rowData)
    setEditCustomer(false)
    setModalVisible(true)
    setEditMode(true)
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
    ],
    headerStyle: {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #C0C0C0',
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
      let params = {}
      if (searchText) {
        params = { searchText } // Add searchText to params if it exists
      }
      const response = await getUser(params).unwrap()
      const { status, message, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setIsLoading(false)
        if (content?.content.length > 0) {
          setgetCustomerOwnerData(content?.content)
        } else {
          setgetCustomerOwnerData([])
        }
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
      console.error('Error occurred while fetching customer data:', error)
    }
  }, [getUser, searchText])

  const getCustomerAdminsUsers = useCallback(
    async (id: any) => {
      setIsLoading(true)
      try {
        const response = await getUser({
          customerOwnerId: id,
          searchText: searchUsersText,
        }).unwrap()
        const { status, message, content } = response as GetUserResponse
        if (status === 200 && Array.isArray(content?.content)) {
          setIsLoading(false)
          if (content?.content.length > 0) {
            setgetCustomerOwnerUserData(content?.content)
            setIsRowClick(true)
            setSelectedRow(id)
            setCustomerAdminId(id)
          } else {
            setgetCustomerOwnerUserData([])
            setCustomerAdminId(id)
            setIsRowClick(false)
          }
        } else {
          setIsRowClick(false)
          setIsLoading(false)
          toast?.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
          })
          setgetCustomerOwnerUserData([])
        }
      } catch (error) {
        console.error('Error occurred while fetching customer data:', error)
      }
    },
    [getUser, searchUsersText],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUserHandler()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchText])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (customerAdminId) {
        getCustomerAdminsUsers(customerAdminId)
      }
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchUsersText])

  return (
    <div className={modalVisible ? 'backdrop-blur-lg' : ''}>
      <Toast ref={toast} />
      <Header header="MOORMANAGE/Permission" />

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

        <div className="mt-8">
          <CustomModal
            buttonText={'ADD NEW'}
            onHide={handleModalClose}
            dialogStyle={{
              width: '840px',
              minWidth: '840px',
              height: '600px',
              minHeight: '600px',
              borderRadius: '1rem',
              maxHeight: '60% !important',
            }}
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
                customerUsers={getCustomerOwnerData}
                toastRef={toast}
                setSelectedCustomerUser={setSelectedCustomerUser}
                setSelectedCustomer={setSelectedCustomer}
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

      <div className={`flex gap-10 ml-8 mt-10 ${isLoading ? 'blur-screen' : ''}`}>
        <div
          style={{
            // flexGrow: 1,
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
            // className="custom-scrollbar"
            style={{
              height: '600px',
              minHeight: 'calc(40vw - 600px)',
              overflow: 'auto',
            }}>
            {getCustomerOwnerData.length === 0 ? (
              <div className="text-center mt-40">
                <img
                  src="/assets/images/empty.png"
                  alt="Empty Data"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-gray-500">No data available</p>
              </div>
            ) : (
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
                columns={customerOwnerTableColumn}
                onRowClick={(e) => {
                  getCustomerAdminsUsers(e.data.id)
                }}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
                actionButtons={ActionButtonColumn}
                // rowStyle={(rowData) => ({
                //   backgroundColor: selectedRow === rowData.id ? 'black' : 'red',
                // })}
              />
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
                // left: '5%',
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
              <DataTableComponent
                tableStyle={{
                  fontSize: '12px',
                  color: '#000000',
                  fontWeight: 400,
                  backgroundColor: '#FFFFFF',
                }}
                scrollable={true}
                data={getCustomerOwnerUserData}
                columns={customerOwnerUserTableColumn}
                actionButtons={ActionButtonUsersColumn}
                style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '400' }}
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
    </div>
  )
}

export default CustomerOwner
