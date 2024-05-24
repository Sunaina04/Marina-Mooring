import { useEffect, useMemo, useRef, useState } from 'react'
import CustomModal from '../CustomComponent/CustomModal'
import DataTableComponent from '../CommonComponent/Table/DataTableComponent'
import Header from '../Layout/LayoutComponents/Header'
import { InputText } from 'primereact/inputtext'
import { ActionButtonColumnProps } from '../../Type/Components/TableTypes'
import { useSelector } from 'react-redux'
import { CustomerPayload, DeleteUserResponse, GetUserResponse } from '../../Type/ApiTypes'
import { useDeleteUserMutation, useGetUsersMutation } from '../../Services/AdminTools/AdminToolsApi'
import AddNewCustomer from './AddNewCustomer'
import { Toast } from 'primereact/toast'

const Permission = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>()
  const [searchInput, setSearchInput] = useState('')
  const userData = useSelector((state: any) => state.user?.userData)
  const customerAdminId = userData?.id
  const [getUser] = useGetUsersMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [getCustomerOwnerUserData, setgetCustomerOwnerUserData] = useState<CustomerPayload[]>([])
  const toast = useRef<Toast>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEditButtonClick = (rowData: any) => {
    setEditMode(true)
    setModalVisible(true)
    setSelectedCustomer(rowData)
  }

  const tableColumnsPermission = useMemo(
    () => [
      {
        id: 'id',
        label: 'ID',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
          borderTopLeftRadius: '10px',
        },
      },
      {
        id: 'name',
        label: 'Name',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'email',
        label: 'Email',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'phoneNumber',
        label: 'Phone',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },

      {
        id: 'roleResponseDto.name',
        label: 'Role',
        style: {
          borderBottom: '1px solid #C0C0C0',
          backgroundColor: '#00426F',
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },
    ],

    [],
  )

  const ActionButtonColumn: ActionButtonColumnProps = {
    header: 'Action',
    style: {
      fontSize: '12px',
      fontWeight: 600,
      borderBottom: '1px solid #D5E1EA',
    },
    buttons: [
      {
        color: 'black',
        label: 'Edit',
        underline: true,
        onClick: (rowData) => handleEditButtonClick(rowData),
      },
      {
        color: 'red',
        label: 'Delete',
        underline: true,

        onClick: (rowData) => handleDeleteButtonClick(rowData),
      },
    ],
    headerStyle: {
      backgroundColor: '#00426F',
      borderBottom: '1px solid #C0C0C0',
      color: '#FFFFFF',
      fontWeight: 500,
      borderTopRightRadius: '10px',
    },
  }

  const handleButtonClick = () => {
    setModalVisible(true)
    setSelectedCustomer('')
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setEditMode(false)
    setSelectedCustomer('')
  }

  const handleDeleteButtonClick = async (rowData: any) => {
    setIsLoading(true)
    try {
      const response = await deleteUser({
        userId: rowData.id,
        customerAdminId: rowData.customerAdminId,
      }).unwrap()
      const { status } = response as DeleteUserResponse
      if (status === 200) {
        setIsLoading(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Success',
          detail: 'User Deleted Successfully ',
          life: 3000,
        })
        getCustomerAdminsUsers()
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  const getCustomerAdminsUsers = async () => {
    setIsLoading(true)
    try {
      const response = await getUser({
        searchText: searchInput,
        customerAdminId: customerAdminId,
      }).unwrap()
      const { status, content } = response as GetUserResponse
      if (status === 200 && Array.isArray(content?.content)) {
        setIsLoading(false)
        setgetCustomerOwnerUserData(content?.content)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error occurred while fetching customer data:', error)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCustomerAdminsUsers()
    }, 600)
    return () => clearTimeout(timeoutId)
  }, [searchInput])

  return (
    <>
      <Header header="MOORMANAGE/Permission" />

      <div className="flex mr-12 justify-end">
        <Toast ref={toast} />
        <div className="mt-14 mr-5 relative">
          <InputText
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
            placeholder="Search by name, ID, Role, phone no..."
            style={{
              width: '378px',
              height: '44px',
              padding: '0 4rem 0 3rem',
              border: '1px solid #C5D9E0',
              fontSize: '16px',
              color: '#00426F',
              borderRadius: '4px',
              minHeight: '44px',
              fontWeight: 500,
            }}
          />
          <img
            src="/assets/images/Search.svg"
            alt="Search Icon"
            className="p-clickable"
            style={{
              position: 'absolute',
              left: '10px',
              right: '-10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '18px',
            }}
          />
        </div>

        <div className="mt-14">
          <CustomModal
            buttonText={'ADD NEW'}
            onClick={handleButtonClick}
            visible={modalVisible}
            onHide={handleModalClose}
            headerText={<h1 className="text-xl font-bold text-#000000 ml-4">New User</h1>}>
            <AddNewCustomer
              customerAdminId={customerAdminId}
              editMode={editMode}
              getUser={getCustomerAdminsUsers}
              closeModal={handleModalClose}
              setIsVisible={setModalVisible}
              setModalVisible={setModalVisible}
              customerData={selectedCustomer}
              permission={true}
              toastRef={toast}
              setSelectedCustomerUser={function (value: any): void {
                throw new Error('Function not implemented.')
              }}
              setSelectedCustomer={function (value: any): void {
                throw new Error('Function not implemented.')
              }}
            />
          </CustomModal>
        </div>
      </div>

      <div
        className={`flex gap-10 ml-8 mt-10 ${isLoading ? 'blur-screen' : ''}`}
        style={{
          paddingRight: '40px',
          paddingLeft: '25px',
        }}>
        <div
          className="bg-[#FFFFFF] border-[1px] h-[600px] border-gray-300 mb-10 rounded-lg"
          style={{
            flexGrow: 1,
            borderRadius: '10px',
          }}>
          <div data-testid="permission-users-table">
            <DataTableComponent
              tableStyle={{
                fontSize: '12px',
                color: '#000000',
                fontWeight: 600,
                backgroundColor: '#D9D9D9',
                borderRadius: '0 0 10px 10px',
                minHeight: 'calc(40vw - 600px)',
                overflow: 'auto',
              }}
              scrollable={true}
              data={getCustomerOwnerUserData}
              columns={tableColumnsPermission}
              actionButtons={ActionButtonColumn}
              style={{ borderBottom: '1px solid #D5E1EA', fontWeight: '500' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Permission
